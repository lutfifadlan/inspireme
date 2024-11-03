import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { GradientSettings } from '@/lib/interface';
import { GRADIENT_PRESETS } from '@/lib/constants';
import { Check, Minus, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GradientControlProps {
  value: GradientSettings;
  onChange: (settings: GradientSettings) => void;
}

export function GradientControl({ value, onChange }: GradientControlProps) {
  return (
    <div className="space-y-4">
      {value.type !== 'solid' && (
        <>
          <div className="flex gap-2 p-1">
            <Button
              variant={value.type === 'linear' ? 'default' : 'outline'}
              className={cn(
                'flex-1 gap-2',
                value.type === 'linear' && 'ring-2 ring-primary'
              )}
              onClick={() => onChange({
                ...value,
                type: 'linear',
                angle: value.angle || 45,
                position: undefined
              })}
            >
              <Minus className="w-4 h-4" />
              Linear
            </Button>
            <Button
              variant={value.type === 'radial' ? 'default' : 'outline'}
              className={cn(
                'flex-1 gap-2',
                value.type === 'radial' && 'ring-2 ring-primary'
              )}
              onClick={() => onChange({
                ...value,
                type: 'radial',
                position: value.position || { x: 50, y: 50 },
                angle: undefined
              })}
            >
              <Circle className="w-4 h-4" />
              Radial
            </Button>
          </div>

          <div className="grid grid-cols-6 gap-2 p-2 bg-muted/50 rounded-lg">
            {GRADIENT_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onChange({
                  ...preset.value,
                  type: value.type,
                  ...(value.type === 'linear' ? { angle: preset.value.angle } : { position: preset.value.position })
                })}
                className={cn(
                  "w-full aspect-square rounded-lg transition-all hover:ring-2 hover:ring-primary relative overflow-hidden",
                  JSON.stringify(value.stops) === JSON.stringify(preset.value.stops) && "ring-2 ring-primary"
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: value.type === 'linear' 
                      ? `linear-gradient(${preset.value.angle}deg, ${preset.value.stops.map(
                          stop => `${stop.color} ${stop.position}%`
                        ).join(', ')})`
                      : `radial-gradient(circle at ${preset.value.position?.x ?? 50}% ${preset.value.position?.y ?? 50}%, ${preset.value.stops.map(
                          stop => `${stop.color} ${stop.position}%`
                        ).join(', ')})`
                  }}
                />
                {JSON.stringify(value.stops) === JSON.stringify(preset.value.stops) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Check className="w-4 h-4 text-white drop-shadow-md" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {value.type === 'linear' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Angle</label>
                <span className="text-sm text-muted-foreground">{value.angle}°</span>
              </div>
              <Slider
                value={[value.angle || 0]}
                onValueChange={(values) => onChange({ ...value, angle: values[0] })}
                min={0}
                max={360}
                step={1}
                className="py-4"
              />
            </div>
          )}

          {value.type === 'radial' && (
            <div className="space-y-4">
              <div className="relative w-32 mx-auto aspect-square rounded-lg border bg-muted/50 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${value.position?.x ?? 50}% ${value.position?.y ?? 50}%, ${value.stops.map(
                      stop => `${stop.color} ${stop.position}%`
                    ).join(', ')})`
                  }}
                />
                <div
                  className="absolute w-3 h-3 rounded-full bg-primary border-2 border-white shadow-lg cursor-move"
                  style={{
                    left: `calc(${value.position?.x ?? 50}% - 6px)`,
                    top: `calc(${value.position?.y ?? 50}% - 6px)`,
                  }}
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (!rect) return;

                    const handleMouseMove = (e: MouseEvent) => {
                      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                      onChange({
                        ...value,
                        position: { x, y }
                      });
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <label className="text-sm text-muted-foreground block">Color Stops</label>
            {value.stops.map((stop, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  type="color"
                  value={stop.color}
                  onChange={(e) => {
                    const newStops = [...value.stops];
                    newStops[index] = { ...stop, color: e.target.value };
                    onChange({ ...value, stops: newStops });
                  }}
                  className="w-16 p-1 h-8"
                />
                <Slider
                  value={[stop.position]}
                  onValueChange={(values) => {
                    const newStops = [...value.stops];
                    newStops[index] = { ...stop, position: values[0] };
                    onChange({ ...value, stops: newStops });
                  }}
                  min={0}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {stop.position}%
                </span>
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange({
                  ...value,
                  stops: [...value.stops, { color: "#ffffff", position: 100 }]
                })}
                disabled={value.stops.length >= 5}
              >
                Add Stop
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onChange({
                  ...value,
                  stops: value.stops.slice(0, -1)
                })}
                disabled={value.stops.length <= 2}
              >
                Remove Stop
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}