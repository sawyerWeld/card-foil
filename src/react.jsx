import { useEffect, useRef } from 'react';
import { CardFoil } from './index.js';

export function FoilOverlay({ intensity = 1, tilt = true, specular = true, style, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;
    const foil = new CardFoil(parent, { intensity, tilt, specular });
    return () => foil.destroy();
  }, [intensity, tilt, specular]);

  // Render nothing — CardFoil injects its own DOM nodes on the parent
  return <span ref={ref} style={{ display: 'none' }} />;
}

export default FoilOverlay;
