export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientSettings {
  type: 'solid' | 'linear' | 'radial';
  stops: GradientStop[];
  angle?: number;
}
