"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [hexValue, setHexValue] = useState(color);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, l: 0 });

  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  // Convert RGB to HSL
  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Update all values when color changes
  useEffect(() => {
    if (color.startsWith("#")) {
      setHexValue(color);
      const rgb = hexToRgb(color);
      setRgbValues(rgb);
      setHslValues(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }
  }, [color]);

  const handleHexChange = (hex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setHexValue(hex);
      onChange(hex);
    } else {
      setHexValue(hex);
    }
  };

  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgbValues, [component]: value };
    setRgbValues(newRgb);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexValue(hex);
    onChange(hex);
  };

  const handleHslChange = (component: "h" | "s" | "l", value: number) => {
    const newHsl = { ...hslValues, [component]: value };
    setHslValues(newHsl);
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgbValues(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexValue(hex);
    onChange(hex);
  };

  const presetColors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffa500",
    "#800080",
    "#008000",
    "#ffc0cb",
    "#a52a2a",
    "#808080",
    "#000080",
  ];

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-inner"
          style={{ backgroundColor: hexValue }}
        />
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            Current Color
          </p>
          <p className="font-mono text-lg font-semibold">{hexValue}</p>
        </div>
      </div>

      <Tabs defaultValue="hex" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hex">HEX</TabsTrigger>
          <TabsTrigger value="rgb">RGB</TabsTrigger>
          <TabsTrigger value="hsl">HSL</TabsTrigger>
        </TabsList>

        <TabsContent value="hex" className="space-y-4">
          <div>
            <Label htmlFor="hex-input">Hex Value</Label>
            <Input
              id="hex-input"
              value={hexValue}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="font-mono"
            />
          </div>
        </TabsContent>

        <TabsContent value="rgb" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label>Red: {rgbValues.r}</Label>
              <Slider
                value={[rgbValues.r]}
                onValueChange={(value) => handleRgbChange("r", value[0])}
                max={255}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Green: {rgbValues.g}</Label>
              <Slider
                value={[rgbValues.g]}
                onValueChange={(value) => handleRgbChange("g", value[0])}
                max={255}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Blue: {rgbValues.b}</Label>
              <Slider
                value={[rgbValues.b]}
                onValueChange={(value) => handleRgbChange("b", value[0])}
                max={255}
                step={1}
                className="mt-2"
              />
            </div>
            <div className="pt-2">
              <Input
                value={`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`}
                readOnly
                className="font-mono text-sm"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hsl" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label>Hue: {hslValues.h}°</Label>
              <Slider
                value={[hslValues.h]}
                onValueChange={(value) => handleHslChange("h", value[0])}
                max={360}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Saturation: {hslValues.s}%</Label>
              <Slider
                value={[hslValues.s]}
                onValueChange={(value) => handleHslChange("s", value[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Lightness: {hslValues.l}%</Label>
              <Slider
                value={[hslValues.l]}
                onValueChange={(value) => handleHslChange("l", value[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
            <div className="pt-2">
              <Input
                value={`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`}
                readOnly
                className="font-mono text-sm"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preset Colors */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Quick Colors</Label>
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((presetColor) => (
            <Button
              key={presetColor}
              variant="ghost"
              className="h-10 w-10 p-0 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: presetColor }}
              onClick={() => onChange(presetColor)}
              title={presetColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
