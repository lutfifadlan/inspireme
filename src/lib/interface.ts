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

export interface BackgroundSettings {
  isMonochrome?: boolean;
  // ... any other existing properties
}

export interface TextPosition {
  x: number;
  y: number;
  verticalAlignment: 'top' | 'center' | 'bottom';
}
