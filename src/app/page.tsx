"use client";

import { useState, ChangeEvent } from "react";
import { WallpaperPreview } from "@/components/wallpaper-preview";
import { WallpaperControls } from "@/components/wallpaper-controls";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BACKGROUNDS, FONTS, WALLPAPER_PRESETS, GRADIENT_PRESETS } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { GradientSettings } from "@/lib/interface";
import { CANVAS_FONT_MAPPING } from '@/lib/fonts';

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl transition-all duration-300">
      <Loader2 className="w-8 h-8 text-white animate-spin mb-3" />
      <span className="text-white font-medium">{message}</span>
    </div>
  );
};

// Helper function to get font weight value
const getFontWeight = (fontWeight: string): string => {
  // First remove the 'font-' prefix if it exists
  const weight = fontWeight.replace('font-', '');
  
  // Map text weights to numeric values
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

  // Return the numeric weight or default to '400'
  return weightMap[weight.toLowerCase()] || '400';
};

// Update the loadFontWithWeight function
const loadFontWithWeight = async (fontName: string, weight: string, fontSize: number): Promise<void> => {
  try {
    // Create a test string with the desired font
    const testString = `${weight} ${fontSize}px "${fontName}"`;
    
    // Try to load the exact weight
    await document.fonts.load(testString);
    
    // If the exact weight fails, try loading available weights
    if (!document.fonts.check(testString)) {
      console.warn('Exact font weight not available:', testString);
      
      // Try loading with system font as fallback
      const fallbackString = `${weight} ${fontSize}px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      await document.fonts.load(fallbackString);
    }
  } catch (e) {
    console.warn('Failed to load font:', e);
  }
};

export default function Home() {
  // Text and Font States
  const [text, setText] = useState("Dream Big, Work Hard");
  const [fontSize, setFontSize] = useState(50);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [fontWeight, setFontWeight] = useState("font-medium");
  const [fontColor, setFontColor] = useState("#ffffff");
  
  // Gradient State
  const [gradientSettings, setGradientSettings] = useState<GradientSettings>({
    type: 'solid',
    stops: [
      { color: "#ffffff", position: 0 },
      { color: "#ffffff", position: 100 }
    ],
    angle: 45
  });

  // Background States
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [backgroundType, setBackgroundType] = useState<'image' | 'color' | 'gradient'>('image');
  const [bgGradientSettings, setBgGradientSettings] = useState<GradientSettings>(GRADIENT_PRESETS[0].value);
  const [randomizing, setRandomizing] = useState(false);
  
  // Size States
  const [selectedPreset, setSelectedPreset] = useState(WALLPAPER_PRESETS[2]); // FHD by default
  const [customSize, setCustomSize] = useState({ width: 1920, height: 1080 });
  
  // Download State
  const [downloading, setDownloading] = useState(false);

  // Monochrome State
  const [isMonochrome, setIsMonochrome] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleRandomBackground = async () => {
    setRandomizing(true);
    
    try {
      if (backgroundType === 'image') {
        const availableBackgrounds = BACKGROUNDS.filter(bg => bg !== selectedBg);
        const randomBg = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
        
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = randomBg;
          setTimeout(() => reject(new Error('Image loading timeout')), 10000);
        });
        
        setSelectedBg(randomBg);
      } else if (backgroundType === 'color') {
        const colors = ['#1a1a1a', '#2c3e50', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setSelectedBg(randomColor);
      } else {
        const randomGradient = GRADIENT_PRESETS[Math.floor(Math.random() * GRADIENT_PRESETS.length)];
        setBgGradientSettings(randomGradient.value);
      }
    } catch (error) {
      console.error('Error loading random background:', error);
    } finally {
      setRandomizing(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setDownloading(false);
      return;
    }

    const size = selectedPreset.id === "custom" ? customSize : selectedPreset;
    canvas.width = size.width;
    canvas.height = size.height;

    try {
      // Draw background
      if (backgroundType === 'image') {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = selectedBg;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          setTimeout(() => reject(new Error('Image loading timeout')), 10000);
        });
        
        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Add overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (backgroundType === 'color') {
        ctx.fillStyle = selectedBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Draw gradient background
        const { type, angle, stops } = bgGradientSettings;
        let gradient;
        
        if (type === 'linear') {
          const angleRad = (angle || 0) * Math.PI / 180;
          const x1 = canvas.width / 2 - Math.cos(angleRad) * canvas.width;
          const y1 = canvas.height / 2 - Math.sin(angleRad) * canvas.height;
          const x2 = canvas.width / 2 + Math.cos(angleRad) * canvas.width;
          const y2 = canvas.height / 2 + Math.sin(angleRad) * canvas.height;
          gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        } else {
          gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
          );
        }

        stops.forEach(stop => {
          gradient.addColorStop(stop.position / 100, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Set up text rendering with proper font loading
      const weight = getFontWeight(fontWeight);
      const fontName = CANVAS_FONT_MAPPING[selectedFont as keyof typeof CANVAS_FONT_MAPPING] || 'Arial';
      
      // Load the font
      await loadFontWithWeight(fontName, weight, fontSize);
      
      // Set the font with CSS-style weight
      ctx.font = `${weight} ${fontSize}px "${fontName}", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      
      // Force font settings
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Ensure the font is applied
      ctx.save();
      ctx.font = ctx.font; // Re-apply font to force update
      
      // Calculate text wrapping
      const maxWidth = canvas.width * 0.8;
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

      // Calculate line height and starting Y position outside the loops
      const lineHeight = fontSize * 1.4;
      const totalHeight = lines.length * lineHeight;
      const startY = (canvas.height - totalHeight) / 2 + (lineHeight / 2);

      if (gradientSettings.type === 'solid') {
        ctx.fillStyle = fontColor;
        
        // Add text shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = fontSize / 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = fontSize / 16;

        // Draw each line
        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            canvas.width / 2,
            startY + (index * lineHeight)
          );
        });
      } else {
        // For gradient text
        const { type, angle = 45, stops } = gradientSettings; // Provide default angle
        
        lines.forEach((line, index) => {
          const lineY = startY + (index * lineHeight);
          const textWidth = ctx.measureText(line).width;
          let textGradient: CanvasGradient;
          
          if (type === 'linear') {
            const angleRad = (angle * Math.PI) / 180;
            textGradient = ctx.createLinearGradient(
              canvas.width / 2 - Math.cos(angleRad) * (textWidth / 2),
              lineY - Math.sin(angleRad) * (fontSize / 2),
              canvas.width / 2 + Math.cos(angleRad) * (textWidth / 2),
              lineY + Math.sin(angleRad) * (fontSize / 2)
            );
          } else {
            textGradient = ctx.createRadialGradient(
              canvas.width / 2, lineY, 0,
              canvas.width / 2, lineY, textWidth / 2
            );
          }

          stops.forEach(stop => {
            textGradient.addColorStop(stop.position / 100, stop.color);
          });

          // Add text shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = fontSize / 8;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = fontSize / 16;

          // Draw text with gradient
          ctx.fillStyle = textGradient;
          ctx.fillText(line, canvas.width / 2, lineY);
        });
      }

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Download the image
      const link = document.createElement("a");
      link.download = "inspire-me.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error('Error during wallpaper generation:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleCustomBackground = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedBg(url);
    setBackgroundType('image');
  };

  const handlePresetChange = (presetId: string) => {
    const preset = WALLPAPER_PRESETS.find((p) => p.id === presetId)!;
    setSelectedPreset(preset);
    if (preset.id === "custom") {
      setCustomSize({ width: 1920, height: 1080 });
    }
  };

  const handleCustomSizeChange = (dimension: "width" | "height", value: number) => {
    setCustomSize((prev) => ({ ...prev, [dimension]: value }));
  };

  return (
    <main className="min-h-screen bg-background/95 transition-colors duration-300 relative">
      <GridPattern strokeDasharray={"4 2"} />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center space-y-4 mt-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-black/90 to-primary/60 bg-clip-text text-transparent dark:from-primary/80 dark:to-secondary/80">
              Motivational Wallpaper Generator
            </h1>
            <p className="text-muted-foreground text-lg mx-auto">
              Create beautiful wallpapers with inspiring quotes that will keep you motivated throughout your day.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-8 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <WallpaperPreview
                backgroundUrl={selectedBg}
                backgroundType={backgroundType}
                bgGradientSettings={bgGradientSettings}
                text={text}
                fontSize={fontSize}
                selectedFont={selectedFont}
                fontWeight={fontWeight}
                fontColor={fontColor}
                gradientSettings={gradientSettings}
                selectedPreset={selectedPreset}
                customSize={customSize}
                isMonochrome={isMonochrome}
              />
              {randomizing && <LoadingOverlay message="Loading new background..." />}
              {downloading && <LoadingOverlay message="Generating wallpaper..." />}
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-4">
            <WallpaperControls
              text={text}
              onTextChange={handleTextChange}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              selectedFont={selectedFont}
              onFontChange={setSelectedFont}
              fontWeight={fontWeight}
              onFontWeightChange={setFontWeight}
              fontColor={fontColor}
              onFontColorChange={setFontColor}
              gradientSettings={gradientSettings}
              onGradientChange={setGradientSettings}
              onRandomBackground={handleRandomBackground}
              onDownload={handleDownload}
              downloading={downloading}
              onCustomBackground={handleCustomBackground}
              selectedPreset={selectedPreset}
              onPresetChange={handlePresetChange}
              customSize={customSize}
              onCustomSizeChange={handleCustomSizeChange}
              selectedBg={selectedBg}
              onBackgroundChange={setSelectedBg}
              backgroundType={backgroundType}
              onBackgroundTypeChange={setBackgroundType}
              bgGradientSettings={bgGradientSettings}
              onBgGradientChange={setBgGradientSettings}
              isMonochrome={isMonochrome}
              onMonochromeChange={setIsMonochrome}
            />
          </div>
        </div>
      </div>
    </main>
  );
}