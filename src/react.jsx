import { useEffect, useRef } from 'react';
import { CardFoil } from './index.js';

export function FoilOverlay({ 
  finish = 'foil', 
  intensity = 1.0, 
  tilt = true, 
  shimmer = true, 
  specular = true 
}) {
  const parentRef = useRef(null);
  const foilInstanceRef = useRef(null);

  useEffect(() => {
    if (!parentRef.current) return;

    // Get the parent element (the card container)
    const parentElement = parentRef.current.parentElement;
    if (!parentElement) return;

    // Create foil instance on parent
    foilInstanceRef.current = new CardFoil(parentElement, {
      finish,
      intensity,
      tilt,
      shimmer,
      specular,
    });

    return () => {
      if (foilInstanceRef.current) {
        foilInstanceRef.current.destroy();
      }
    };
  }, []);

  // Update finish when it changes
  useEffect(() => {
    if (foilInstanceRef.current) {
      foilInstanceRef.current.setFinish(finish);
    }
  }, [finish]);

  // Update intensity when it changes
  useEffect(() => {
    if (foilInstanceRef.current) {
      foilInstanceRef.current.setIntensity(intensity);
    }
  }, [intensity]);

  // Render nothing - the effect is applied to parent
  return <div ref={parentRef} style={{ display: 'none' }} />;
}

export default FoilOverlay;
