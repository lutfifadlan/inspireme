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
  '#1a1a1a', '#2c3e50', '#34495e', '#16a085', '#27ae60',
  '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22',
  '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400'
];

// Predefined gradients
const GRADIENT_PRESETS = [
  {
    label: 'Sunset',
    value: {
      type: 'linear' as const,
      angle: 45,
      stops: [
        { color: '#FF512F', position: 0 },
        { color: '#DD2476', position: 100 }
      ]
    }
  },
  {
    label: 'Ocean',
    value: {
      type: 'linear' as const,
      angle: 45,
      stops: [
        { color: '#2193b0', position: 0 },
        { color: '#6dd5ed', position: 100 }
      ]
    }
  },
  {
    label: 'Forest',
    value: {
      type: 'linear' as const,
      angle: 45,
      stops: [
        { color: '#134E5E', position: 0 },
        { color: '#71B280', position: 100 }
      ]
    }
  },
  {
    label: 'Purple Haze',
    value: {
      type: 'linear' as const,
      angle: 45,
      stops: [
        { color: '#7303c0', position: 0 },
        { color: '#ec38bc', position: 50 },
        { color: '#fdeff9', position: 100 }
      ]
    }
  },
  {
    label: 'Deep Ocean',
    value: {
      type: 'linear' as const,
      angle: 45,
      stops: [
        { color: '#1CB5E0', position: 0 },
        { color: '#000851', position: 100 }
      ]
    }
  },
  {
    label: 'Cosmic',
    value: {
      type: 'radial' as const,
      stops: [
        { color: '#1f2937', position: 0 },
        { color: '#111827', position: 50 },
        { color: '#030712', position: 100 }
      ]
    }
  }
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
    onRandomize();
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
          <ScrollArea className="h-[200px] rounded-md border bg-background/50">
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
          <ScrollArea className="h-[200px] rounded-md border bg-background/50">
            <div className="grid grid-cols-5 gap-2 p-2">
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
          </ScrollArea>
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
          <div className="grid grid-cols-2 gap-2">
            {GRADIENT_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onSelectGradient(preset.value)}
                className="w-full h-12 rounded-lg overflow-hidden ring-1 ring-border/20 transition-all hover:ring-2 hover:ring-primary"
                style={{
                  background: `linear-gradient(${preset.value.angle}deg, ${preset.value.stops.map(
                    stop => `${stop.color} ${stop.position}%`
                  ).join(', ')})`
                }}
              >
                <span className="sr-only">{preset.label}</span>
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            <label className="text-sm text-muted-foreground block">Custom Gradient</label>
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