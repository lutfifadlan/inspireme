import React from 'react';
import { WALLPAPER_PRESETS } from "@/lib/constants";
import { GradientSettings } from '@/lib/interface';

interface WallpaperPreviewProps {
  backgroundUrl: string;
  backgroundType: 'image' | 'color' | 'gradient';
  bgGradientSettings: GradientSettings;
  text: string;
  fontSize: number;
  selectedFont: string;
  fontWeight: string;
  fontColor: string;
  gradientSettings: GradientSettings;
  selectedPreset: typeof WALLPAPER_PRESETS[0];
  customSize?: { width: number; height: number };
}

export function WallpaperPreview({
  backgroundUrl,
  backgroundType,
  bgGradientSettings,
  text,
  fontSize,
  selectedFont,
  fontWeight,
  fontColor,
  gradientSettings,
}: WallpaperPreviewProps) {
  // Create background style
  const getBackgroundStyle = () => {
    if (backgroundType === 'image') {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (backgroundType === 'color') {
      return { backgroundColor: backgroundUrl };
    } else {
      const { type, angle, stops } = bgGradientSettings;
      if (type === 'linear') {
        const gradient = `linear-gradient(${angle}deg, ${stops.map(stop => 
          `${stop.color} ${stop.position}%`
        ).join(', ')})`;
        return { backgroundImage: gradient };
      } else {
        const gradient = `radial-gradient(circle, ${stops.map(stop => 
          `${stop.color} ${stop.position}%`
        ).join(', ')})`;
        return { backgroundImage: gradient };
      }
    }
  };

  // Create text style
  const getTextStyle = () => {
    const baseStyle = {
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight.replace('font-', ''),
      maxWidth: '80%',
      textAlign: 'center' as const,
      wordBreak: 'break-word' as const,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    };

    if (gradientSettings.type === 'solid') {
      return {
        ...baseStyle,
        color: fontColor,
      };
    } else {
      const { type, angle, stops } = gradientSettings;
      const gradient = type === 'linear'
        ? `linear-gradient(${angle}deg, ${stops.map(stop => 
            `${stop.color} ${stop.position}%`
          ).join(', ')})`
        : `radial-gradient(circle, ${stops.map(stop => 
            `${stop.color} ${stop.position}%`
          ).join(', ')})`;

      return {
        ...baseStyle,
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/20">
      <div
        className="absolute inset-0 w-full h-full"
        style={getBackgroundStyle()}
      />
      <div className="relative w-full h-full flex items-center justify-center">
        <p
          className={`${selectedFont} transition-all duration-200`}
          style={getTextStyle()}
        >
          {text}
        </p>
      </div>
    </div>
  );
}