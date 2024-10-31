import React, { useEffect, useRef } from 'react';
import { WALLPAPER_PRESETS } from "@/lib/constants";
import { GradientSettings } from '@/lib/interface';

interface WallpaperPreviewProps {
  backgroundUrl: string;
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
  text,
  fontSize,
  selectedFont,
  fontWeight,
  fontColor,
  gradientSettings,
  selectedPreset,
  customSize,
}: WallpaperPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getFontWeight = () => {
    const weightMap: { [key: string]: string } = {
      'font-thin': '100',
      'font-light': '300',
      'font-normal': '400',
      'font-medium': '500',
      'font-semibold': '600',
      'font-bold': '700',
      'font-extrabold': '800',
      'font-black': '900'
    };
    return weightMap[fontWeight] || '400';
  };

  const createGradient = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!gradientSettings || gradientSettings.type === 'solid') {
      return fontColor;
    }

    let gradient;
    if (gradientSettings.type === 'linear') {
      const angle = (gradientSettings.angle || 0) * Math.PI / 180;
      const x1 = width / 2 - Math.cos(angle) * width;
      const y1 = height / 2 - Math.sin(angle) * height;
      const x2 = width / 2 + Math.cos(angle) * width;
      const y2 = height / 2 + Math.sin(angle) * height;
      gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    } else {
      gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 2
      );
    }

    gradientSettings.stops.forEach(stop => {
      gradient.addColorStop(stop.position / 100, stop.color);
    });

    return gradient;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundUrl;

    img.onload = () => {
      const size = selectedPreset.id === "custom" ? customSize : selectedPreset;
      if (!size) return;

      const containerWidth = canvas.offsetWidth;
      const scale = containerWidth / size.width;
      canvas.width = size.width * scale;
      canvas.height = size.height * scale;

      const scaledFontSize = fontSize * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontFamily = selectedFont.replace('font-', '');
      ctx.font = `${getFontWeight()} ${scaledFontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = createGradient(ctx, canvas.width, canvas.height);

      const maxWidth = canvas.width * 0.9;
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);

      const lineHeight = scaledFontSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      const startY = (canvas.height - totalHeight) / 2;

      lines.forEach((line, index) => {
        ctx.fillText(
          line,
          canvas.width / 2,
          startY + (index * lineHeight) + lineHeight / 2
        );
      });
    };
  }, [backgroundUrl, text, fontSize, selectedFont, fontWeight, fontColor, gradientSettings, selectedPreset, customSize]);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/20">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}