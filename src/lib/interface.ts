export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientSettings {
  type: 'linear' | 'radial' | 'solid';
  angle?: number;
  position?: {
    x: number;
    y: number;
  };
  stops: GradientStop[];
}
