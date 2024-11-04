import React, { useState } from 'react';
import { WALLPAPER_PRESETS } from "@/lib/constants";
import { GradientSettings, TextPosition } from '@/lib/interface';
import { cn } from "@/lib/utils";
import { FullSizePreview } from './full-size-preview';

export interface WallpaperPreviewProps {
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
  forceActualSize?: boolean;
  textPosition: TextPosition;
}

// Separate the preview content into its own component to avoid duplication
export function WallpaperPreviewContent({
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
  forceActualSize,
  isFullSize,
  textPosition,
}: WallpaperPreviewProps & { isFullSize?: boolean }) {
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
      textAlign: textPosition.alignment as 'left' | 'center' | 'right',
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
    if (selectedPreset.id === "custom" && customSize) {
      return `${customSize.width} / ${customSize.height}`;
    }
    return `${selectedPreset.width} / ${selectedPreset.height}`;
  };

  const containerStyle = {
    aspectRatio: getAspectRatio(),
    ...(forceActualSize && selectedPreset.id === "custom" && customSize ? {
      width: `${customSize.width}px`,
      height: `${customSize.height}px`
    } : {
      ...(!isFullSize && {
        maxWidth: '600px',
        width: '100%',
      })
    })
  };

  const getTextContainerStyle = () => {
    const alignmentOffset = textPosition.alignment === 'left' ? 0 
      : textPosition.alignment === 'right' ? -100 
      : -50;
    
    const verticalOffset = textPosition.verticalAlignment === 'top' ? 0
      : textPosition.verticalAlignment === 'bottom' ? -100
      : -50;

    return {
      position: 'absolute' as const,
      left: `${textPosition.x}%`,
      top: `${textPosition.y}%`,
      transform: `translate(${alignmentOffset}%, ${verticalOffset}%)`,
      width: '100%',
      display: 'flex',
      justifyContent: textPosition.alignment === 'left' ? 'flex-start' 
        : textPosition.alignment === 'right' ? 'flex-end' 
        : 'center',
      alignItems: textPosition.verticalAlignment === 'top' ? 'flex-start'
        : textPosition.verticalAlignment === 'bottom' ? 'flex-end'
        : 'center',
      padding: '0 10%', // Add padding to prevent text from touching edges
    };
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden shadow-2xl",
        !isFullSize && "rounded-xl ring-1 ring-border/20"
      )}
      style={containerStyle}
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
      <div className="relative w-full h-full">
        <div style={getTextContainerStyle()}>
          <p
            className={`${selectedFont} transition-all duration-200`}
            style={getTextStyle()}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WallpaperPreview(props: WallpaperPreviewProps) {
  const [showFullSize, setShowFullSize] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div 
          onClick={() => setShowFullSize(true)}
          className="cursor-pointer hover:opacity-90 transition-opacity max-w-full flex justify-center"
        >
          <WallpaperPreviewContent {...props} />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Click preview to see actual wallpaper size
        </p>
      </div>
      
      <FullSizePreview 
        {...props}
        isOpen={showFullSize}
        onClose={() => setShowFullSize(false)}
      />
    </>
  );
}