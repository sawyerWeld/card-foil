import type { HTMLAttributes, ReactElement } from 'react';
import type { CardFoilFinish } from './index';

export interface FoilOverlayProps extends HTMLAttributes<HTMLSpanElement> {
  finish?: CardFoilFinish;
  intensity?: number;
  tilt?: boolean;
  specular?: boolean;
  shimmer?: boolean;
}

export declare function FoilOverlay(props: FoilOverlayProps): ReactElement;

export default FoilOverlay;
