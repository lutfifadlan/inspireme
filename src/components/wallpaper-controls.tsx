"use client";

import { ChangeEvent, useRef, useEffect } from "react";
import { Download, RefreshCcw, Type, Image as ImageIcon, Sparkles, Monitor, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FONTS, MOTIVATIONAL_QUOTES, WALLPAPER_PRESETS, MAX_FONT_SIZE, MIN_FONT_SIZE, BACKGROUNDS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import BackgroundSelector from "./background-selector";
import { GradientSettings, TextPosition } from "@/lib/interface";
import { GradientControl } from "./gradient-control";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useScreenSize } from "@/lib/hooks/useScreenSize";

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
  backgroundType: 'image' | 'color' | 'gradient';
  onBackgroundTypeChange: (type: 'image' | 'color' | 'gradient') => void;
  bgGradientSettings: GradientSettings;
  onBgGradientChange: (settings: GradientSettings) => void;
  isMonochrome: boolean;
  onMonochromeChange: (value: boolean) => void;
  textPosition: TextPosition;
  onTextPositionChange: (position: TextPosition) => void;
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
  onPresetChange,
  customSize,
  onCustomSizeChange,
  selectedBg,
  onBackgroundChange,
  backgroundType,
  onBackgroundTypeChange,
  bgGradientSettings,
  onBgGradientChange,
  isMonochrome,
  onMonochromeChange,
  textPosition,
  onTextPositionChange,
}: WallpaperControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screenSize = useScreenSize();
  
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
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert('File size should be less than 20MB');
      return;
    }

    // Create object URL and update background
    onCustomBackground(file);
    onBackgroundTypeChange('image');

    // Clean up the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      if (selectedBg.startsWith('blob:')) {
        URL.revokeObjectURL(selectedBg);
      }
    };
  }, [selectedBg]);

  return (
    <Card className="border border-r-2 shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Customize Your Wallpaper
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible defaultValue="text" className="space-y-4">
          {/* Text Settings Section */}
          <AccordionItem value="text" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                <h3 className="font-medium">Text Settings</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 ">
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
                        <RefreshCcw className="w-3 h-3" />
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

              <div className="grid grid-cols-4 gap-4">
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

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Color Style</label>
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
                    <SelectTrigger className={`bg-background/50 ${gradientSettings.type !== 'solid' ? 'w-36' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="linear">Linear Gradient</SelectItem>
                      <SelectItem value="radial">Radial Gradient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {gradientSettings.type === 'solid' && (
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Text Color</label>
                    <Input
                      type="color"
                      value={fontColor}
                      onChange={(e) => onFontColorChange(e.target.value)}
                      className="w-full h-10 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {gradientSettings.type !== 'solid' && (
                <GradientControl
                  value={gradientSettings}
                  onChange={onGradientChange}
                />
              )}

              <div>
                <label className="text-sm text-muted-foreground block mb-2">Text Position</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Horizontal (%)</label>
                    <Slider
                      value={[textPosition.x]}
                      onValueChange={(values) => onTextPositionChange({ ...textPosition, x: values[0] })}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Vertical (%)</label>
                    <Slider
                      value={[textPosition.y]}
                      onValueChange={(values) => onTextPositionChange({ ...textPosition, y: values[0] })}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">Text Alignment</label>
                <div className="flex gap-2">
                  <Button
                    variant={textPosition.alignment === 'left' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => {
                      onTextPositionChange({ 
                        ...textPosition, 
                        x: 20,  // Move to 20% from left
                        alignment: 'left' 
                      });
                    }}
                    className="w-10 h-10"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={textPosition.alignment === 'center' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => {
                      onTextPositionChange({ 
                        ...textPosition, 
                        x: 50,  // Center horizontally
                        alignment: 'center' 
                      });
                    }}
                    className="w-10 h-10"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={textPosition.alignment === 'right' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => {
                      onTextPositionChange({ 
                        ...textPosition, 
                        x: 80,  // Move to 80% from left
                        alignment: 'right' 
                      });
                    }}
                    className="w-10 h-10"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Background Settings Section */}
          <AccordionItem value="background" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <h3 className="font-medium">Background Settings</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <BackgroundSelector
                backgrounds={BACKGROUNDS}
                selectedBg={selectedBg}
                onSelect={onBackgroundChange}
                onSelectGradient={onBgGradientChange}
                selectedType={backgroundType}
                onTypeChange={onBackgroundTypeChange}
                onRandomize={onRandomBackground}
                bgGradientSettings={bgGradientSettings}
              />

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Custom Background
              </Button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {backgroundType === 'image' && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="monochrome" className="text-sm text-muted-foreground">Monochrome Effect</Label>
                  <Switch
                    id="monochrome"
                    checked={isMonochrome}
                    onCheckedChange={onMonochromeChange}
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Size Settings Section */}
          <AccordionItem value="size" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <h3 className="font-medium">Size Settings</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Your screen size: {screenSize.width}x{screenSize.height}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onPresetChange("custom");
                      onCustomSizeChange("width", screenSize.width);
                      onCustomSizeChange("height", screenSize.height);
                    }}
                  >
                    Use Screen Size
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Width (px)</label>
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
                    <label className="text-sm text-muted-foreground block mb-2">Height (px)</label>
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
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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