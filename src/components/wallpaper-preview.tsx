import React, { useEffect, useRef } from 'react';
import { WALLPAPER_PRESETS } from "@/lib/constants";

interface WallpaperPreviewProps {
  backgroundUrl: string;
  text: string;
  fontSize: number;
  selectedFont: string;
  fontWeight: string;
  fontColor: string;
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

      // Set canvas size based on the aspect ratio
      const containerWidth = canvas.offsetWidth;
      const scale = containerWidth / size.width;
      canvas.width = size.width * scale;
      canvas.height = size.height * scale;

      // Scale everything proportionally
      const scaledFontSize = fontSize * scale;

      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Add overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Configure text settings
      const fontFamily = selectedFont.replace('font-', '');
      ctx.fillStyle = fontColor;
      ctx.font = `${getFontWeight()} ${scaledFontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Handle text wrapping
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

      // Draw text
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
  }, [backgroundUrl, text, fontSize, selectedFont, fontWeight, fontColor, selectedPreset, customSize]);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/20">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}