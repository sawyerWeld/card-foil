import './card-foil.css';

export class CardFoil {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      finish: 'foil',
      intensity: 1.0,
      tilt: true,
      shimmer: true,
      specular: true,
      ...options
    };

    this.overlay = null;
    this.boundHandlers = {
      mouseMove: this.handleMouseMove.bind(this),
      mouseLeave: this.handleMouseLeave.bind(this),
    };

    this.init();
  }

  init() {
    // Create overlay element
    this.overlay = document.createElement('div');
    this.overlay.className = `card-foil-overlay finish-${this.options.finish}`;
    
    if (this.options.specular) {
      this.overlay.classList.add('specular');
    }

    this.overlay.style.setProperty('--foil-intensity', this.options.intensity);

    // Ensure parent has relative positioning
    const parentPosition = window.getComputedStyle(this.element).position;
    if (parentPosition === 'static') {
      this.element.style.position = 'relative';
    }

    // Add tilt class to parent if enabled
    if (this.options.tilt) {
      this.element.classList.add('card-foil-tilt');
    }

    // Append overlay
    this.element.appendChild(this.overlay);

    // Attach event listeners
    this.element.addEventListener('mousemove', this.boundHandlers.mouseMove);
    this.element.addEventListener('mouseleave', this.boundHandlers.mouseLeave);
  }

  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    // Update CSS custom properties
    this.overlay.style.setProperty('--mx', x);
    this.overlay.style.setProperty('--my', y);

    // Tilt effect (centered around 0.5)
    if (this.options.tilt) {
      const tiltX = (x - 0.5) * 2; // -1 to 1
      const tiltY = (y - 0.5) * -2; // -1 to 1 (inverted for natural feel)
      
      this.element.style.setProperty('--tilt-x', tiltX);
      this.element.style.setProperty('--tilt-y', tiltY);
      this.element.classList.add('tilting');
    }
  }

  handleMouseLeave() {
    // Reset to center
    this.overlay.style.setProperty('--mx', 0.5);
    this.overlay.style.setProperty('--my', 0.5);

    if (this.options.tilt) {
      this.element.style.setProperty('--tilt-x', 0);
      this.element.style.setProperty('--tilt-y', 0);
      this.element.classList.remove('tilting');
    }
  }

  setFinish(finish) {
    this.overlay.className = `card-foil-overlay finish-${finish}`;
    if (this.options.specular) {
      this.overlay.classList.add('specular');
    }
    this.options.finish = finish;
  }

  setIntensity(intensity) {
    this.options.intensity = intensity;
    this.overlay.style.setProperty('--foil-intensity', intensity);
  }

  destroy() {
    // Remove event listeners
    this.element.removeEventListener('mousemove', this.boundHandlers.mouseMove);
    this.element.removeEventListener('mouseleave', this.boundHandlers.mouseLeave);

    // Remove overlay
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }

    // Remove tilt class
    this.element.classList.remove('card-foil-tilt', 'tilting');
  }
}

export default CardFoil;
