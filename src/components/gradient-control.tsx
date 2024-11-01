import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { GradientSettings } from '@/lib/interface';
import { GRADIENT_PRESETS } from '@/lib/constants';
interface GradientControlProps {
  value: GradientSettings;
  onChange: (settings: GradientSettings) => void;
}

export function GradientControl({ value, onChange }: GradientControlProps) {
  return (
    <div className="space-y-4">
      {value.type !== 'solid' && (
        <>
          {value.type === 'linear' && (
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Gradient Angle</label>
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

          <div>
            <label className="text-sm text-muted-foreground block mb-2">Color Stops</label>
            {value.stops.map((stop, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
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
                <span className="text-sm text-muted-foreground w-8">
                  {stop.position}%
                </span>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
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

          <div>
            <label className="text-sm text-muted-foreground block mb-2">Gradient Presets</label>
            <div className="grid grid-cols-6 gap-2">
              {GRADIENT_PRESETS.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline" 
                  className="w-12 h-12 p-0"
                  onClick={() => onChange(preset.value)}
                >
                  <div
                    className="w-full h-full rounded-sm"
                    style={{
                      background: `linear-gradient(${preset.value.angle}deg, ${preset.value.stops.map(
                        stop => `${stop.color} ${stop.position}%`
                      ).join(', ')})`
                    }}
                  />
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}