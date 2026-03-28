import './card-foil.css';

const GRADIENT = `repeating-linear-gradient(
  110deg,
  transparent 0%,
  rgba(255, 200, 50, 0.25) 8%,
  rgba(100, 220, 255, 0.18) 16%,
  rgba(200, 100, 255, 0.15) 24%,
  rgba(100, 255, 150, 0.18) 32%,
  rgba(255, 150, 50, 0.15) 40%,
  transparent 50%
)`;

export class CardFoil {
  constructor(el, { intensity = 1, tilt = true, specular = true } = {}) {
    this.el = el;
    this.intensity = intensity;
    this.tilt = tilt;
    this.specular = specular;

    el.style.position = 'relative';
    el.style.display = el.style.display || 'inline-block';

    // Foil gradient overlay
    this._foil = document.createElement('div');
    this._foil.className = 'cf-overlay';
    this._foil.style.opacity = intensity;
    el.appendChild(this._foil);

    // Specular highlight overlay
    if (specular) {
      this._spec = document.createElement('div');
      Object.assign(this._spec.style, {
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        mixBlendMode: 'overlay',
        opacity: '0',
        transition: 'opacity 0.2s',
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)',
      });
      el.appendChild(this._spec);
    }

    this._onMove = this._onMove.bind(this);
    this._onLeave = this._onLeave.bind(this);
    el.addEventListener('mousemove', this._onMove);
    el.addEventListener('mouseleave', this._onLeave);
  }

  _onMove(e) {
    const rect = this.el.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;   // 0-1
    const my = (e.clientY - rect.top) / rect.height;   // 0-1

    // Shift gradient position with mouse
    this._foil.style.backgroundPosition = `${mx * 100}% ${my * 100}%`;

    // Tilt
    if (this.tilt) {
      const rx = (my - 0.5) * -30;  // ±15°
      const ry = (mx - 0.5) * 30;
      this.el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      this.el.style.transition = 'transform 0.05s';
    }

    // Specular
    if (this._spec) {
      this._spec.style.opacity = '1';
      this._spec.style.background = `radial-gradient(circle at ${mx * 100}% ${my * 100}%, rgba(255,255,255,0.35) 0%, transparent 55%)`;
    }
  }

  _onLeave() {
    this._foil.style.backgroundPosition = '';
    if (this.tilt) {
      this.el.style.transform = '';
      this.el.style.transition = 'transform 0.4s ease';
    }
    if (this._spec) {
      this._spec.style.opacity = '0';
    }
  }

  setIntensity(v) {
    this.intensity = v;
    this._foil.style.opacity = v;
  }

  destroy() {
    this.el.removeEventListener('mousemove', this._onMove);
    this.el.removeEventListener('mouseleave', this._onLeave);
    this._foil.remove();
    this._spec?.remove();
  }
}

export default CardFoil;
