import './card-foil.css';

const FINISH_GRADIENTS = {
  foil: `repeating-linear-gradient(
    110deg,
    transparent 0%,
    rgba(255, 200, 50, 0.25) 8%,
    rgba(100, 220, 255, 0.18) 16%,
    rgba(200, 100, 255, 0.15) 24%,
    rgba(100, 255, 150, 0.18) 32%,
    rgba(255, 150, 50, 0.15) 40%,
    transparent 50%
  )`,
  etched: `repeating-linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 10%,
    rgba(210, 220, 235, 0.18) 20%,
    rgba(170, 185, 205, 0.16) 30%,
    rgba(255, 255, 255, 0.12) 40%,
    transparent 52%
  )`,
  galaxy: `repeating-linear-gradient(
    105deg,
    transparent 0%,
    rgba(92, 64, 255, 0.26) 10%,
    rgba(67, 196, 255, 0.2) 18%,
    rgba(232, 100, 255, 0.18) 28%,
    rgba(54, 78, 184, 0.24) 38%,
    transparent 52%
  )`,
  'oil-slick': `repeating-linear-gradient(
    112deg,
    rgba(10, 10, 10, 0.04) 0%,
    rgba(255, 112, 67, 0.22) 10%,
    rgba(255, 214, 102, 0.16) 18%,
    rgba(67, 233, 123, 0.18) 28%,
    rgba(68, 160, 255, 0.2) 36%,
    rgba(170, 72, 255, 0.22) 44%,
    rgba(10, 10, 10, 0.04) 56%
  )`,
};

const MAX_INTENSITY = 2;
const MAX_TILT_DEGREES = 15;

function clampIntensity(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 1;
  }

  return Math.min(Math.max(numericValue, 0), MAX_INTENSITY);
}

function getComputedStyleSafe(el) {
  if (typeof getComputedStyle === 'function') {
    return getComputedStyle(el);
  }

  return null;
}

export class CardFoil {
  constructor(
    el,
    {
      finish = 'foil',
      intensity = 1,
      tilt = true,
      specular = true,
      shimmer = true,
    } = {}
  ) {
    if (!el) {
      throw new TypeError('CardFoil requires a target element.');
    }

    if (typeof document === 'undefined') {
      throw new Error('CardFoil can only run in a browser-like environment.');
    }

    this.el = el;
    this.finish = 'foil';
    this.intensity = 1;
    this.tilt = true;
    this.specular = true;
    this.shimmer = true;
    this._initialStyle = {
      position: el.style.position,
      display: el.style.display,
      transform: el.style.transform,
      transition: el.style.transition,
    };
    this._addedHostClass = false;

    const computedStyle = getComputedStyleSafe(el);

    if (!computedStyle || computedStyle.position === 'static') {
      el.style.position = 'relative';
    }

    if (!computedStyle || computedStyle.display === 'inline') {
      el.style.display = 'inline-block';
    }

    if (el.classList) {
      el.classList.add('cf-host');
      this._addedHostClass = true;
    }

    this._foil = document.createElement('div');
    this._foil.className = 'cf-overlay';
    el.appendChild(this._foil);

    this._spec = null;

    this._onMove = this._onMove.bind(this);
    this._onLeave = this._onLeave.bind(this);
    el.addEventListener('mousemove', this._onMove);
    el.addEventListener('mouseleave', this._onLeave);

    this.setFinish(finish);
    this.setIntensity(intensity);
    this.setTilt(tilt);
    this.setSpecular(specular);
    this.setShimmer(shimmer);
  }

  _ensureSpecular() {
    if (this._spec) {
      return this._spec;
    }

    this._spec = document.createElement('div');
    this._spec.className = 'cf-specular';
    this.el.appendChild(this._spec);

    return this._spec;
  }

  _getBaseTransform() {
    return this._initialStyle.transform || '';
  }

  _applyTilt(mx, my) {
    const rx = (my - 0.5) * -(MAX_TILT_DEGREES * 2);
    const ry = (mx - 0.5) * (MAX_TILT_DEGREES * 2);
    const tiltTransform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    const baseTransform = this._getBaseTransform();

    this.el.style.transform = baseTransform
      ? `${baseTransform} ${tiltTransform}`
      : tiltTransform;
    this.el.style.transition = 'transform 0.05s linear';
  }

  _onMove(e) {
    const rect = this.el.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;

    this._foil.style.backgroundPosition = `${mx * 100}% ${my * 100}%`;

    if (this.tilt) {
      this._applyTilt(mx, my);
    }

    if (this.specular) {
      const specularOverlay = this._ensureSpecular();
      specularOverlay.style.opacity = '1';
      specularOverlay.style.background = `radial-gradient(circle at ${mx * 100}% ${my * 100}%, rgba(255,255,255,0.35) 0%, transparent 55%)`;
    }
  }

  _onLeave() {
    this._foil.style.backgroundPosition = '';

    if (this.tilt) {
      this.el.style.transform = this._getBaseTransform();
      this.el.style.transition = 'transform 0.4s ease';
    }

    if (this._spec) {
      this._spec.style.opacity = '0';
    }
  }

  setFinish(finish) {
    const nextFinish = FINISH_GRADIENTS[finish] ? finish : this.finish;
    this.finish = nextFinish;
    this._foil.style.setProperty('--cf-gradient', FINISH_GRADIENTS[nextFinish]);
    return this;
  }

  setIntensity(v) {
    this.intensity = clampIntensity(v);
    this._foil.style.opacity = String(this.intensity);
    return this;
  }

  setTilt(enabled) {
    this.tilt = Boolean(enabled);

    if (!this.tilt) {
      this.el.style.transform = this._getBaseTransform();
      this.el.style.transition = this._initialStyle.transition;
    }

    return this;
  }

  setSpecular(enabled) {
    this.specular = Boolean(enabled);

    if (!this.specular && this._spec) {
      this._spec.style.opacity = '0';
    }

    if (this.specular) {
      this._ensureSpecular();
    }

    return this;
  }

  setShimmer(enabled) {
    this.shimmer = Boolean(enabled);
    this._foil.classList.toggle('cf-shimmer', this.shimmer);
    return this;
  }

  destroy() {
    this.el.removeEventListener('mousemove', this._onMove);
    this.el.removeEventListener('mouseleave', this._onLeave);

    this._foil.remove();
    this._spec?.remove();

    if (this._addedHostClass && this.el.classList) {
      this.el.classList.remove('cf-host');
    }

    this.el.style.position = this._initialStyle.position;
    this.el.style.display = this._initialStyle.display;
    this.el.style.transform = this._initialStyle.transform;
    this.el.style.transition = this._initialStyle.transition;
  }
}

export default CardFoil;
