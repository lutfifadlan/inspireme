"use client";

import { useState, ChangeEvent } from "react";
import { WallpaperPreview } from "@/components/wallpaper-preview";
import { WallpaperControls } from "@/components/wallpaper-controls";
import { ThemeToggle } from "@/components/theme-toggle";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BACKGROUNDS, FONTS, WALLPAPER_PRESETS } from "@/lib/constants";

export default function Home() {
  const [text, setText] = useState("Dream Big, Work Hard");
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [fontSize, setFontSize] = useState([48]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [downloading, setDownloading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(WALLPAPER_PRESETS[2]); // FHD by default
  const [customSize, setCustomSize] = useState({ width: 1920, height: 1080 });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDownload = async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.src = selectedBg;

    img.onload = () => {
      const size = selectedPreset.id === "custom" ? customSize : selectedPreset;
      canvas.width = size.width;
      canvas.height = size.height;

      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      ctx!.fillStyle = "white";
      ctx!.font = `${fontSize}px ${selectedFont.replace("font-", "")}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(text, canvas.width / 2, canvas.height / 2);

      const link = document.createElement("a");
      link.download = "motivation-wallpaper.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };
  };

  const handleRandomBackground = () => {
    const newBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
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
      <ThemeToggle />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Motivation Wallpaper Generator
            </h1>
            <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
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
                fontSize={fontSize[0]}
                selectedFont={selectedFont}
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
            />
          </div>
        </div>
      </div>
    </main>
  );
}