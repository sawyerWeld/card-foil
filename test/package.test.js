const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const { CardFoil } = require('../dist/index.js');

function createClassList() {
  const classes = new Set();

  return {
    add(name) {
      classes.add(name);
    },
    remove(name) {
      classes.delete(name);
    },
    toggle(name, force) {
      if (force === undefined) {
        if (classes.has(name)) {
          classes.delete(name);
        } else {
          classes.add(name);
        }
      } else if (force) {
        classes.add(name);
      } else {
        classes.delete(name);
      }

      return classes.has(name);
    },
    contains(name) {
      return classes.has(name);
    },
  };
}

function createStyle(initialStyle = {}) {
  const style = { ...initialStyle };

  style.setProperty = (name, value) => {
    style[name] = value;
  };

  return style;
}

function createNode(tagName = 'div') {
  const classList = createClassList();

  return {
    tagName: tagName.toUpperCase(),
    className: '',
    classList,
    style: createStyle(),
    children: [],
    parentElement: null,
    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    },
    remove() {
      if (!this.parentElement) {
        return;
      }

      const index = this.parentElement.children.indexOf(this);

      if (index >= 0) {
        this.parentElement.children.splice(index, 1);
      }

      this.parentElement = null;
    },
  };
}

function createHostElement({ style = {}, computedStyle = {} } = {}) {
  const host = createNode('div');
  const listeners = new Map();

  host.style = createStyle(style);
  host.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  });
  host.addEventListener = (type, handler) => {
    listeners.set(type, handler);
  };
  host.removeEventListener = (type, handler) => {
    if (listeners.get(type) === handler) {
      listeners.delete(type);
    }
  };
  host.listenerCount = () => listeners.size;
  host.computedStyle = {
    position: computedStyle.position || style.position || 'static',
    display: computedStyle.display || style.display || 'inline',
  };

  return host;
}

test.beforeEach(() => {
  global.document = {
    createElement(tagName) {
      return createNode(tagName);
    },
  };
  global.getComputedStyle = element => element.computedStyle || { position: 'static', display: 'inline' };
});

test.afterEach(() => {
  delete global.document;
  delete global.getComputedStyle;
});

test('CardFoil applies finishes, updates options, and restores inline styles on destroy', () => {
  const host = createHostElement({
    style: {
      position: 'absolute',
      display: 'block',
      transform: 'scale(1.05)',
      transition: 'opacity 0.2s ease',
    },
    computedStyle: {
      position: 'absolute',
      display: 'block',
    },
  });

  const foil = new CardFoil(host, {
    finish: 'galaxy',
    intensity: 1.5,
    tilt: true,
    specular: false,
    shimmer: false,
  });

  assert.equal(host.style.position, 'absolute');
  assert.equal(host.style.display, 'block');
  assert.equal(foil.finish, 'galaxy');
  assert.equal(foil.intensity, 1.5);
  assert.equal(foil._foil.style.opacity, '1.5');
  assert.match(foil._foil.style['--cf-gradient'], /92, 64, 255/);
  assert.equal(foil._foil.classList.contains('cf-shimmer'), false);
  assert.equal(host.classList.contains('cf-host'), true);
  assert.equal(host.listenerCount(), 2);

  foil._onMove({ clientX: 75, clientY: 25 });
  assert.match(host.style.transform, /scale\(1\.05\)/);
  assert.match(host.style.transform, /rotateX/);

  foil.setShimmer(true);
  assert.equal(foil._foil.classList.contains('cf-shimmer'), true);

  foil.setSpecular(true);
  assert.ok(foil._spec);

  foil.setTilt(false);
  assert.equal(host.style.transform, 'scale(1.05)');
  assert.equal(host.style.transition, 'opacity 0.2s ease');

  foil.destroy();

  assert.equal(host.style.position, 'absolute');
  assert.equal(host.style.display, 'block');
  assert.equal(host.style.transform, 'scale(1.05)');
  assert.equal(host.style.transition, 'opacity 0.2s ease');
  assert.equal(host.classList.contains('cf-host'), false);
  assert.equal(host.listenerCount(), 0);
  assert.equal(host.children.length, 0);
});

test('CardFoil clamps intensity and ignores unknown finish values', () => {
  const host = createHostElement();
  const foil = new CardFoil(host, { finish: 'unknown', intensity: 8 });

  assert.equal(foil.finish, 'foil');
  assert.equal(foil.intensity, 2);
  assert.equal(foil._foil.style.opacity, '2');

  foil.setFinish('etched');
  assert.equal(foil.finish, 'etched');

  foil.setFinish('not-real');
  assert.equal(foil.finish, 'etched');
});

test('build publishes declaration files for both entry points', () => {
  assert.equal(fs.existsSync(path.join(__dirname, '..', 'dist', 'index.d.ts')), true);
  assert.equal(fs.existsSync(path.join(__dirname, '..', 'dist', 'react.d.ts')), true);
  assert.equal(fs.existsSync(path.join(__dirname, '..', 'dist', 'browser.js')), true);
});

test('React bundle renders without a global React binding', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'card-foil-react-'));
  const reactDir = path.join(tempDir, 'node_modules', 'react');

  fs.mkdirSync(reactDir, { recursive: true });
  fs.writeFileSync(
    path.join(reactDir, 'index.js'),
    [
      "exports.useRef = () => ({ current: null });",
      'exports.useEffect = () => {};',
      "exports.createElement = (...args) => ({ jsx: args });",
    ].join('\n')
  );

  const output = execFileSync(
    process.execPath,
    [
      '-e',
      [
        "const { FoilOverlay } = require('./dist/react.js');",
        "const result = FoilOverlay({ className: 'marker' });",
        "if (!result || !result.jsx) throw new Error('React wrapper did not return JSX.');",
        'process.stdout.write(String(result.jsx[0]));',
      ].join('\n'),
    ],
    {
      cwd: path.join(__dirname, '..'),
      env: {
        ...process.env,
        NODE_PATH: path.join(tempDir, 'node_modules'),
      },
    }
  );

  assert.equal(output.toString(), 'span');
});
