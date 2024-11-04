import React from 'react';
import { WALLPAPER_PRESETS } from "@/lib/constants";
import { GradientSettings } from '@/lib/interface';
import { cn } from "@/lib/utils";

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
  isMonochrome: boolean;
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
  selectedPreset,
  customSize,
  isMonochrome,
}: WallpaperPreviewProps) {
  // Create background style
  const getBackgroundStyle = () => {
    if (backgroundType === 'image') {
      return {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (backgroundType === 'color') {
      return { backgroundColor: backgroundUrl };
    } else if (backgroundType === 'gradient') {
      const { type, stops, angle, position } = bgGradientSettings;
      const stopsString = stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
      
      if (type === 'linear') {
        return { background: `linear-gradient(${angle}deg, ${stopsString})` };
      } else if (type === 'radial') {
        return { background: `radial-gradient(circle at ${position?.x ?? 50}% ${position?.y ?? 50}%, ${stopsString})` };
      }
    }
    return {};
  };

  // Create text style with proper gradient handling
  const getTextStyle = () => {
    const getFontWeight = (weight: string) => {
      const numericWeight = weight.replace('font-', '');
      const weightMap: Record<string, string> = {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900'
      };
      return weightMap[numericWeight.toLowerCase()] || '400';
    };

    const baseStyle = {
      fontSize: `${fontSize}px`,
      fontWeight: getFontWeight(fontWeight),
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
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: fontColor, // Fallback color
      };
    }
  };

  // Calculate aspect ratio based on selected preset or custom size
  const getAspectRatio = () => {
    if (!selectedPreset) return '16 / 9'; // Default fallback
    const size = selectedPreset.id === "custom" && customSize 
      ? customSize 
      : selectedPreset;
    return `${size.width} / ${size.height}`;
  };

  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/20"
      style={{ aspectRatio: getAspectRatio() }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity",
          isMonochrome && "grayscale"
        )}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          ...getBackgroundStyle(),
        }}
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