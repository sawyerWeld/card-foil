# card-foil

A lightweight library for rendering foil/holographic card effects, inspired by trading card games like Magic: The Gathering and Pokemon TCG.

No framework dependencies for the core. Optional React wrapper included.

## Features

- **4 finish palettes**: foil, etched, galaxy, oil-slick
- **Optional shimmer animation**: idle foil sweep that can be toggled independently
- **Smooth mouse interactions**: tilt, specular highlights, gradient shifts
- **Lightweight**: ~3KB gzipped
- **Framework agnostic**: Works with vanilla JS, React, or any framework
- **Accessible**: Respects `prefers-reduced-motion`

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
  finish: 'foil',
  intensity: 1.0,
  tilt: true,
  specular: true,
  shimmer: true
});

// Update dynamically
foil.setFinish('galaxy');
foil.setIntensity(1.5);
foil.setTilt(false);
foil.setSpecular(false);
foil.setShimmer(false);

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
      <FoilOverlay finish="foil" intensity={1.2} tilt specular shimmer />
    </div>
  );
}
```

`FoilOverlay` enhances its parent element, so render it inside the card wrapper you want to shimmer.

## API

### `new CardFoil(element, options?)`

- `finish`: `'foil' | 'etched' | 'galaxy' | 'oil-slick'`
- `intensity`: number from `0` to `2`
- `tilt`: boolean, enables 3D tilt on pointer move
- `specular`: boolean, enables the white highlight layer
- `shimmer`: boolean, enables the idle background sweep animation when motion is allowed

### Instance methods

- `setFinish(finish)`
- `setIntensity(value)`
- `setTilt(enabled)`
- `setSpecular(enabled)`
- `setShimmer(enabled)`
- `destroy()`

## Finish Vs. Shimmer

`finish` controls the color palette and overall foil look.

`shimmer` does not change the finish. It only turns the idle animation on or off. When `shimmer` is `false`, the foil still responds to mouse movement, tilt, and specular highlights; it just stays still when the card is at rest.

The shimmer animation is also automatically disabled when the OS or browser is set to `prefers-reduced-motion: reduce`. On this machine, for example, macOS `reduceMotion` is enabled, so shimmer stays static even when the toggle is on.

## Finish Types

- **foil** - Rainbow shimmer (gold -> cyan -> purple -> green -> orange)
- **etched** - Subtle silver/white shimmer, less saturated
- **galaxy** - Deep blue/purple cosmic shimmer
- **oil-slick** - Iridescent dark rainbow, high contrast

## Mouse Interactions

- **Tilt**: Applies `rotateX`/`rotateY` transforms (max +/-15deg) on mousemove
- **Specular**: White radial gradient follows mouse cursor
- **Gradient shift**: Foil gradient moves based on mouse position
- **Auto-reset**: Smoothly returns to neutral on mouseleave

## Demo

See the live demo at [sawyerwelden.com/card-foil](https://sawyerwelden.com/card-foil/) for all four finish palettes plus the shimmer toggle.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires CSS custom properties and `mix-blend-mode` support.

## TypeScript

The package ships declaration files for both `card-foil` and `card-foil/react`.

## License

MIT

---

Built for card game enthusiasts.
