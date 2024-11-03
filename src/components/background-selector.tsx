import React from 'react';
import Image from 'next/image';
import { Check, Image as ImageIcon, Paintbrush, PaintBucket } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GradientSettings } from '@/lib/interface';
import { GradientControl } from './gradient-control';

interface BackgroundSelectorProps {
  backgrounds: string[];
  selectedBg: string;
  onSelect: (background: string) => void;
  onSelectGradient: (settings: GradientSettings) => void;
  selectedType: 'image' | 'color' | 'gradient';
  onTypeChange: (type: 'image' | 'color' | 'gradient') => void;
  onRandomize: () => void;
  bgGradientSettings: GradientSettings;
}

// Predefined solid colors
const SOLID_COLORS = [
  '#1a1a1a', // Dark black
  '#2c3e50', // Midnight blue
  '#34495e', // Wet asphalt
  '#16a085', // Green sea
  '#27ae60', // Nephritis green
  '#2980b9', // Belize hole blue
  '#8e44ad', // Wisteria purple
  '#e74c3c', // Alizarin red
  '#ecf0f1', // Clouds white
  '#95a5a6', // Concrete gray
  '#2ecc71', // Emerald green
  '#3498db', // Peter river blue
  '#9b59b6', // Amethyst purple
  '#f1c40f', // Sunflower yellow
  '#e67e22', // Carrot orange
  '#1abc9c', // Turquoise
  '#d35400', // Pumpkin orange
  '#c0392b', // Pomegranate red
  '#7f8c8d', // Asbestos gray
  '#8B4513', // Saddle brown
  '#4A90E2', // Dodger blue
  '#FF6B6B', // Pastel red
  '#48C9B0', // Medium turquoise
  '#9575CD'  // Medium purple
];

export default function BackgroundSelector({
  backgrounds,
  selectedBg,
  onSelect,
  onSelectGradient,
  selectedType,
  onTypeChange,
  onRandomize,
  bgGradientSettings
}: BackgroundSelectorProps) {
  const handleRandomize = () => {
    if (selectedType === 'color') {
      // Pick a random color from SOLID_COLORS
      const randomColor = SOLID_COLORS[Math.floor(Math.random() * SOLID_COLORS.length)];
      onSelect(randomColor);
    } else {
      onRandomize();
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={selectedType} onValueChange={(value) => onTypeChange(value as 'image' | 'color' | 'gradient')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image">
            <ImageIcon className="w-4 h-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="color">
            <Paintbrush className="w-4 h-4 mr-2" />
            Solid
          </TabsTrigger>
          <TabsTrigger value="gradient">
            <PaintBucket className="w-4 h-4 mr-2" />
            Gradient
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-4">
          <ScrollArea className="h-[300px] rounded-md border bg-background/50">
            <div className="grid grid-cols-2 gap-2 p-2">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => onSelect(bg)}
                  className={cn(
                    "relative aspect-video rounded-lg overflow-hidden ring-1 ring-border/20 transition-all hover:ring-2 hover:ring-primary",
                    selectedBg === bg && selectedType === 'image' && "ring-2 ring-primary"
                  )}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={bg}
                      alt={`Background ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={index < 4}
                    />
                  </div>
                  {selectedBg === bg && selectedType === 'image' && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="color">
            <div className="grid grid-cols-6 gap-2 p-2">
              {SOLID_COLORS.map((color, index) => (
                <button
                  key={index}
                  onClick={() => onSelect(color)}
                  className={cn(
                    "w-full aspect-square rounded-lg transition-all hover:ring-2 hover:ring-primary",
                    selectedBg === color && selectedType === 'color' && "ring-2 ring-primary"
                  )}
                  style={{ backgroundColor: color }}
                >
                  {selectedBg === color && selectedType === 'color' && (
                    <div className="flex items-center justify-center h-full">
                      <Check className="w-4 h-4 text-white drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          <div className="pt-2">
            <label className="text-sm text-muted-foreground block mb-2">Custom Color</label>
            <Input
              type="color"
              value={selectedType === 'color' ? selectedBg : '#ffffff'}
              onChange={(e) => onSelect(e.target.value)}
              className="w-full h-10 cursor-pointer"
            />
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-4">
          <div className="space-y-4">
            <GradientControl
              value={bgGradientSettings}
              onChange={onSelectGradient}
            />
          </div>
        </TabsContent>
      </Tabs>

      <Button
        onClick={handleRandomize}
        variant="outline"
        className="w-full"
      >
        Randomize {selectedType === 'image' ? 'Background' : selectedType === 'color' ? 'Color' : 'Gradient'}
      </Button>
    </div>
  );
}