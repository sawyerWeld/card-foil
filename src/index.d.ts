export type CardFoilFinish = 'foil' | 'etched' | 'galaxy' | 'oil-slick';

export interface CardFoilOptions {
  finish?: CardFoilFinish;
  intensity?: number;
  tilt?: boolean;
  specular?: boolean;
  shimmer?: boolean;
}

export declare class CardFoil {
  constructor(el: HTMLElement, options?: CardFoilOptions);
  el: HTMLElement;
  finish: CardFoilFinish;
  intensity: number;
  tilt: boolean;
  specular: boolean;
  shimmer: boolean;
  setFinish(finish: CardFoilFinish): this;
  setIntensity(value: number): this;
  setTilt(enabled: boolean): this;
  setSpecular(enabled: boolean): this;
  setShimmer(enabled: boolean): this;
  destroy(): void;
}

export default CardFoil;
