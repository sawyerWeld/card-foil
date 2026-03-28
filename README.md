# card-foil ✨

A lightweight library for rendering foil/holographic card effects, inspired by trading card games like Magic: The Gathering and Pokémon TCG.

No framework dependencies for the core. Optional React wrapper included.

## Features

- 🌈 **4 finish types**: foil, etched, galaxy, oil-slick
- 🎨 **Smooth mouse interactions**: tilt, specular highlights, gradient shifts
- ⚡ **Lightweight**: ~3KB gzipped
- 🔧 **Framework agnostic**: Works with vanilla JS, React, or any framework
- ♿ **Accessible**: Respects `prefers-reduced-motion`

## Installation

```bash
npm install card-foil
```

## Usage

### Vanilla JavaScript

```js
import { CardFoil } from 'card-foil';
import 'card-foil/style.css';

const cardElement = document.querySelector('.my-card');
const foil = new CardFoil(cardElement, {
  finish: 'foil',        // 'foil' | 'etched' | 'galaxy' | 'oil-slick'
  intensity: 1.0,        // 0-2, default 1.0
  tilt: true,            // Enable 3D tilt on mousemove
  specular: true,        // Enable specular highlight
  shimmer: true          // Enable shimmer animation
});

// Update dynamically
foil.setFinish('galaxy');
foil.setIntensity(1.5);

// Clean up
foil.destroy();
```

### React

```jsx
import { FoilOverlay } from 'card-foil/react';
import 'card-foil/style.css';

function MyCard() {
  return (
    <div style={{ position: 'relative', width: 300 }}>
      <img src="/card-image.jpg" alt="Card" />
      <FoilOverlay 
        finish="foil" 
        intensity={1.2} 
        tilt 
        specular 
      />
    </div>
  );
}
```

## Finish Types

- **foil** — Rainbow shimmer (gold → cyan → purple → green → orange)
- **etched** — Subtle silver/white shimmer, less saturated
- **galaxy** — Deep blue/purple cosmic shimmer
- **oil-slick** — Iridescent dark rainbow, high contrast

## Mouse Interactions

- **Tilt**: Applies `rotateX`/`rotateY` transforms (max ±15°) on mousemove
- **Specular**: White radial gradient follows mouse cursor
- **Gradient shift**: Foil gradient moves based on mouse position
- **Auto-reset**: Smoothly returns to neutral on mouseleave

## Demo

See `demo/index.html` for a live interactive demo with all finish types.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires CSS custom properties and `mix-blend-mode` support.

## License

MIT

---

Built with ✨ for card game enthusiasts.
