"use client";

import { useState, ChangeEvent } from "react";
import { WallpaperPreview } from "@/components/wallpaper-preview";
import { WallpaperControls } from "@/components/wallpaper-controls";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BACKGROUNDS, FONTS, WALLPAPER_PRESETS } from "@/lib/constants";

export default function Home() {
  const [text, setText] = useState("Dream Big, Work Hard");
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [fontSize, setFontSize] = useState(48);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [downloading, setDownloading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(WALLPAPER_PRESETS[2]); // FHD by default
  const [customSize, setCustomSize] = useState({ width: 1920, height: 1080 });
  const [fontWeight, setFontWeight] = useState("font-medium");
  const [fontColor, setFontColor] = useState("#ffffff");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDownload = async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

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

    const fontFamily = selectedFont.replace('font-', '');

    img.crossOrigin = "anonymous";
    img.src = selectedBg;

    img.onload = () => {
      const size = selectedPreset.id === "custom" ? customSize : selectedPreset;
      canvas.width = size.width;
      canvas.height = size.height;

      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      ctx!.fillStyle = fontColor;
      ctx!.font = `${getFontWeight()} ${fontSize}px ${fontFamily}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      const maxWidth = canvas.width * 0.9;
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx!.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);

      const lineHeight = fontSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      const startY = (canvas.height - totalHeight) / 2;

      lines.forEach((line, index) => {
        ctx!.fillText(line, canvas.width / 2, startY + (index * lineHeight) + lineHeight / 2);
      });

      const link = document.createElement("a");
      link.download = "inspire-me.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };
  };

  const handleRandomBackground = () => {
    let newBg;
    do {
      newBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    } while (newBg === selectedBg);
    setSelectedBg(newBg);
  };

  const handleCustomBackground = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedBg(url);
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
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <WallpaperPreview
                backgroundUrl={selectedBg}
                text={text}
                fontSize={fontSize}
                selectedFont={selectedFont}
                fontWeight={fontWeight}
                fontColor={fontColor}
                selectedPreset={selectedPreset}
                customSize={customSize}
              />
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
              onRandomBackground={handleRandomBackground}
              onDownload={handleDownload}
              downloading={downloading}
              onCustomBackground={handleCustomBackground}
              selectedPreset={selectedPreset}
              onPresetChange={handlePresetChange}
              customSize={customSize}
              onCustomSizeChange={handleCustomSizeChange}
              fontWeight={fontWeight}
              onFontWeightChange={setFontWeight}
              fontColor={fontColor}
              onFontColorChange={setFontColor}
            />
          </div>
        </div>
      </div>
    </main>
  );
}