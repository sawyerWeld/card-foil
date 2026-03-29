import React, { useEffect, useRef } from 'react';
import { CardFoil } from './index.js';

export function FoilOverlay({
  finish = 'foil',
  intensity = 1,
  tilt = true,
  specular = true,
  shimmer = true,
  style,
  className,
  ...props
}) {
  const markerRef = useRef(null);
  const foilRef = useRef(null);

  useEffect(() => {
    if (!markerRef.current) {
      return undefined;
    }

    const parent = markerRef.current.parentElement;

    if (!parent) {
      return undefined;
    }

    foilRef.current = new CardFoil(parent, {
      finish,
      intensity,
      tilt,
      specular,
      shimmer,
    });

    return () => {
      foilRef.current?.destroy();
      foilRef.current = null;
    };
  }, []);

  useEffect(() => {
    foilRef.current?.setFinish(finish);
  }, [finish]);

  useEffect(() => {
    foilRef.current?.setIntensity(intensity);
  }, [intensity]);

  useEffect(() => {
    foilRef.current?.setTilt(tilt);
  }, [tilt]);

  useEffect(() => {
    foilRef.current?.setSpecular(specular);
  }, [specular]);

  useEffect(() => {
    foilRef.current?.setShimmer(shimmer);
  }, [shimmer]);

  return (
    <span
      {...props}
      ref={markerRef}
      aria-hidden="true"
      className={className}
      style={{ ...style, display: 'none' }}
    />
  );
}

export default FoilOverlay;
