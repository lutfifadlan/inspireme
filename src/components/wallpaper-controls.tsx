"use client";

import { ChangeEvent, useRef } from "react";
import { Download, RefreshCcw, Upload, Type, Image as ImageIcon, Sparkles, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FONTS, MOTIVATIONAL_QUOTES, WALLPAPER_PRESETS, MAX_FONT_SIZE, MIN_FONT_SIZE, BACKGROUNDS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundSelector from "./background-selector";
import { GradientSettings } from "@/lib/interface";
import { GRADIENT_PRESETS } from "@/lib/constants";

interface WallpaperControlsProps {
  text: string;
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  selectedFont: string;
  onFontChange: (value: string) => void;
  fontWeight: string;
  onFontWeightChange: (value: string) => void;
  fontColor: string;
  onFontColorChange: (value: string) => void;
  gradientSettings: GradientSettings;
  onGradientChange: (settings: GradientSettings) => void;
  onRandomBackground: () => void;
  onDownload: () => void;
  downloading: boolean;
  onCustomBackground: (file: File) => void;
  selectedPreset: typeof WALLPAPER_PRESETS[0];
  onPresetChange: (presetId: string) => void;
  customSize: { width: number; height: number };
  onCustomSizeChange: (dimension: "width" | "height", value: number) => void;
  selectedBg: string;
  onBackgroundChange: (bg: string) => void;
}

export function WallpaperControls({
  text,
  onTextChange,
  fontSize,
  onFontSizeChange,
  selectedFont,
  onFontChange,
  fontWeight,
  onFontWeightChange,
  fontColor,
  onFontColorChange,
  gradientSettings,
  onGradientChange,
  onRandomBackground,
  onDownload,
  downloading,
  onCustomBackground,
  selectedPreset,
  onPresetChange,
  customSize,
  onCustomSizeChange,
  selectedBg,
  onBackgroundChange,
}: WallpaperControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const FONT_WEIGHTS = [
    { value: "font-thin", label: "Thin" },
    { value: "font-light", label: "Light" },
    { value: "font-normal", label: "Regular" },
    { value: "font-medium", label: "Medium" },
    { value: "font-semibold", label: "Semibold" },
    { value: "font-bold", label: "Bold" },
    { value: "font-extrabold", label: "Extra Bold" },
    { value: "font-black", label: "Black" },
  ];

  const handleRandomQuote = () => {
    const availableQuotes = MOTIVATIONAL_QUOTES.filter(quote => quote !== text);
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const event = {
      target: { value: availableQuotes[randomIndex] }
    } as ChangeEvent<HTMLInputElement>;
    onTextChange(event);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onCustomBackground(file);
    }
  };

  return (
    <Card className="border border-r-2 shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Customize Your Wallpaper
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Settings Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <h3 className="font-medium">Text Settings</h3>
          </div>
          <Separator className="bg-border/60" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-muted-foreground">Your Text</label>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      onClick={handleRandomQuote}
                      variant="outline"
                      size="sm"
                      className="h-8"
                    >
                      <RefreshCcw className="w-3 h-3 mr-2" />
                      Random Quote
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm text-muted-foreground">
                      Click to generate a random motivational quote from our curated collection.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Input
                value={text}
                onChange={onTextChange}
                className="font-medium bg-background/50"
                placeholder="Enter your motivational text"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Font Size</label>
              <Slider
                value={[fontSize]}
                onValueChange={(values) => onFontSizeChange(values[0])}
                min={MIN_FONT_SIZE}
                max={MAX_FONT_SIZE}
                step={1}
                className="py-4"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Font Family</label>
                <Select value={selectedFont} onValueChange={onFontChange}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span className={font.value}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">Font Weight</label>
                <Select value={fontWeight} onValueChange={onFontWeightChange}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_WEIGHTS.map((weight) => (
                      <SelectItem key={weight.value} value={weight.value}>
                        <span className={weight.value}>{weight.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {gradientSettings.type === 'solid' && (
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Font Color</label>
                  <div className="bg-background/50 rounded-md">
                    <Input
                      type="color"
                      value={fontColor}
                      onChange={(e) => onFontColorChange(e.target.value)}
                      className="w-full cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Gradient Settings */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Text Style</label>
                <Select
                  value={gradientSettings.type}
                  onValueChange={(type) => onGradientChange({ 
                    ...gradientSettings, 
                    type: type as 'solid' | 'linear' | 'radial',
                    stops: gradientSettings.stops.length === 0 ? [
                      { color: fontColor, position: 0 },
                      { color: fontColor, position: 100 }
                    ] : gradientSettings.stops
                  })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid Color</SelectItem>
                    <SelectItem value="linear">Linear Gradient</SelectItem>
                    <SelectItem value="radial">Radial Gradient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {gradientSettings.type !== 'solid' && (
                <>
                  {gradientSettings.type === 'linear' && (
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">Gradient Angle</label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[gradientSettings.angle || 0]}
                          onValueChange={(values) => onGradientChange({ 
                            ...gradientSettings, 
                            angle: values[0] 
                          })}
                          min={0}
                          max={360}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {gradientSettings.angle}°
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Color Stops</label>
                    {gradientSettings.stops.map((stop, index) => (
                      <div key={index} className="flex gap-2 mb-2 items-center">
                        <Input
                          type="color"
                          value={stop.color}
                          onChange={(e) => {
                            const newStops = [...gradientSettings.stops];
                            newStops[index] = { ...stop, color: e.target.value };
                            onGradientChange({ ...gradientSettings, stops: newStops });
                          }}
                          className="w-16 p-1 h-8"
                        />
                        <Slider
                          value={[stop.position]}
                          onValueChange={(values) => {
                            const newStops = [...gradientSettings.stops];
                            newStops[index] = { ...stop, position: values[0] };
                            onGradientChange({ ...gradientSettings, stops: newStops });
                          }}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {stop.position}%
                        </span>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onGradientChange({
                          ...gradientSettings,
                          stops: [...gradientSettings.stops, { color: "#ffffff", position: 100 }]
                        })}
                        disabled={gradientSettings.stops.length >= 5}
                      >
                        Add Stop
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onGradientChange({
                          ...gradientSettings,
                          stops: gradientSettings.stops.slice(0, -1)
                        })}
                        disabled={gradientSettings.stops.length <= 2}
                      >
                        Remove Stop
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Gradient Presets</label>
                    <div className="grid grid-cols-2 gap-2">
                      {GRADIENT_PRESETS.map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full h-12"
                          onClick={() => onGradientChange(preset.value)}
                        >
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{
                              background: `linear-gradient(${preset.value.angle}deg, ${preset.value.stops.map(
                                stop => `${stop.color} ${stop.position}%`
                              ).join(', ')})`
                            }}
                          />
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Background Settings Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <h3 className="font-medium">Background Settings</h3>
          </div>
          <Separator className="bg-border/60" />

          <BackgroundSelector
            backgrounds={BACKGROUNDS}
            selectedBg={selectedBg}
            onSelect={onBackgroundChange}
          />

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onRandomBackground}
              variant="outline"
              className="w-full bg-background/50 hover:bg-background/80"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Random
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full bg-background/50 hover:bg-background/80"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Size Settings Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <h3 className="font-medium">Size Settings</h3>
          </div>
          <Separator className="bg-border/60" />
          <Tabs defaultValue="desktop" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="desktop">
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="desktop" className="space-y-4">
              <Select
                value={selectedPreset.id}
                onValueChange={onPresetChange}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {WALLPAPER_PRESETS.filter(p => !p.id.includes("iphone") && !p.id.includes("ipad")).map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.label} ({preset.width}x{preset.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="mobile" className="space-y-4">
              <Select
                value={selectedPreset.id}
                onValueChange={onPresetChange}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {WALLPAPER_PRESETS.filter(p => p.id.includes("iphone") || p.id.includes("ipad")).map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.label} ({preset.width}x{preset.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>

          {selectedPreset.id === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Width</label>
                <Input
                  type="number"
                  value={customSize.width}
                  onChange={(e) => onCustomSizeChange("width", parseInt(e.target.value))}
                  className="bg-background/50"
                  min={100}
                  max={7680}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Height</label>
                <Input
                  type="number"
                  value={customSize.height}
                  onChange={(e) => onCustomSizeChange("height", parseInt(e.target.value))}
                  className="bg-background/50"
                  min={100}
                  max={4320}
                />
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-border/60" />

        {/* Download Button */}
        <Button
          onClick={onDownload}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          disabled={downloading}
        >
          <Download className="w-4 h-4 mr-2" />
          {downloading ? "Downloading..." : "Download Wallpaper"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default WallpaperControls;