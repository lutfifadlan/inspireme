import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface BackgroundSelectorProps {
  backgrounds: string[];
  selectedBg: string;
  onSelect: (background: string) => void;
}

export default function BackgroundSelector({ 
  backgrounds, 
  selectedBg, 
  onSelect 
}: BackgroundSelectorProps) {
  return (
    <ScrollArea className="h-[150px] rounded-md border bg-background/50">
      <div className="grid grid-cols-2 gap-2 p-2">
        {backgrounds.map((bg, index) => (
          <button
            key={index}
            onClick={() => onSelect(bg)}
            className={cn(
              "relative aspect-video rounded-lg overflow-hidden ring-1 ring-border/20 transition-all hover:ring-2 hover:ring-primary",
              selectedBg === bg && "ring-2 ring-primary"
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={bg}
                alt={`Background ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 4} // Load first 4 images immediately
              />
            </div>
            {selectedBg === bg && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-white drop-shadow-md" />
              </div>
            )}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}