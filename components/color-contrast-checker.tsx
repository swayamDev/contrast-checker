"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/color-picker";
import { ColorPalette } from "@/components/color-palette";
import { Palette, Copy, Check, Shuffle, Eye, Type, Zap } from "lucide-react";

interface ContrastResult {
  ratio: number;
  aa: { normal: boolean; large: boolean };
  aaa: { normal: boolean; large: boolean };
}

const GOOGLE_FONTS = [
  { name: "Inter", value: "Inter" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Source Sans Pro", value: "Source Sans Pro" },
  { name: "Raleway", value: "Raleway" },
  { name: "Poppins", value: "Poppins" },
  { name: "Nunito", value: "Nunito" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Merriweather", value: "Merriweather" },
  { name: "Crimson Text", value: "Crimson Text" },
];

export function ColorContrastChecker() {
  const [foregroundColor, setForegroundColor] = useState("#1a202c");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(
    null
  );
  const [showPalette, setShowPalette] = useState(false);
  const [activeInput, setActiveInput] = useState<"foreground" | "background">(
    "foreground"
  );
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Load Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${GOOGLE_FONTS.map(
      (font) => `family=${font.value.replace(" ", "+")}:wght@400;600;700`
    ).join("&")}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          Number.parseInt(result[1], 16),
          Number.parseInt(result[2], 16),
          Number.parseInt(result[3], 16),
        ]
      : null;
  };

  // Parse RGB string
  const parseRgb = (rgb: string): [number, number, number] | null => {
    const match = rgb.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/);
    return match
      ? [
          Number.parseInt(match[1]),
          Number.parseInt(match[2]),
          Number.parseInt(match[3]),
        ]
      : null;
  };

  // Parse HSL string
  const parseHsl = (hsl: string): [number, number, number] | null => {
    const match = hsl.match(/hsl$$(\d+),\s*(\d+)%,\s*(\d+)%$$/);
    if (!match) return null;

    const h = Number.parseInt(match[1]) / 360;
    const s = Number.parseInt(match[2]) / 100;
    const l = Number.parseInt(match[3]) / 100;

    const hslToRgb = (
      h: number,
      s: number,
      l: number
    ): [number, number, number] => {
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

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };

    return hslToRgb(h, s, l);
  };

  // Convert color to RGB array
  const parseColor = (color: string): [number, number, number] | null => {
    if (color.startsWith("#")) {
      return hexToRgb(color);
    } else if (color.startsWith("rgb")) {
      return parseRgb(color);
    } else if (color.startsWith("hsl")) {
      return parseHsl(color);
    }
    return null;
  };

  // Calculate relative luminance
  const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const calculateContrastRatio = useCallback(
    (color1: string, color2: string): ContrastResult | null => {
      const rgb1 = parseColor(color1);
      const rgb2 = parseColor(color2);

      if (!rgb1 || !rgb2) return null;

      const l1 = getRelativeLuminance(...rgb1);
      const l2 = getRelativeLuminance(...rgb2);

      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      const ratio = (lighter + 0.05) / (darker + 0.05);

      return {
        ratio,
        aa: {
          normal: ratio >= 4.5,
          large: ratio >= 3,
        },
        aaa: {
          normal: ratio >= 7,
          large: ratio >= 4.5,
        },
      };
    },
    []
  );

  useEffect(() => {
    const result = calculateContrastRatio(foregroundColor, backgroundColor);
    setContrastResult(result);
  }, [foregroundColor, backgroundColor, calculateContrastRatio]);

  const handleColorSelect = (color: string) => {
    if (activeInput === "foreground") {
      setForegroundColor(color);
    } else {
      setBackgroundColor(color);
    }
    setShowPalette(false);
    setShowColorPicker(false);
  };

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  const generateRandomColors = () => {
    const randomHex = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setForegroundColor(randomHex());
    setBackgroundColor(randomHex());
  };

  const getContrastLevel = (ratio: number) => {
    if (ratio >= 7) return { level: "AAA", color: "bg-green-800" };
    if (ratio >= 4.5) return { level: "AA", color: "bg-blue-500" };
    if (ratio >= 3) return { level: "AA Large", color: "bg-amber-500" };
    return { level: "Fail", color: "bg-red-500" };
  };

  const contrastLevel = contrastResult
    ? getContrastLevel(contrastResult.ratio)
    : null;

  return (
    <div className="space-y-8">
      {/* Main Color Selection */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Foreground Color */}
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: foregroundColor }}
                ></div>
                Foreground Color
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyColor(foregroundColor)}
                className="h-8 w-8 p-0"
                aria-label="Copy foreground color"
              >
                {copiedColor === foregroundColor ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="w-full h-32 rounded-xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50 flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: foregroundColor }}
              onClick={() => {
                setActiveInput("foreground");
                setShowColorPicker(true);
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              <div className="text-center z-10">
                <Palette className="h-6 w-6 mx-auto mb-2 text-white/70" />
                <span className="text-sm text-white/70 font-medium">
                  Click to pick color
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="foreground" className="text-sm font-medium">
                Color Value
              </Label>
              <Input
                id="foreground"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                placeholder="#000000, rgb(0,0,0), hsl(0,0%,0%)"
                className="font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveInput("foreground");
                  setShowPalette(!showPalette);
                }}
                className="flex-1"
                aria-label="Toggle palette for foreground color"
              >
                <Palette className="h-4 w-4 mr-2" />
                Palette
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveInput("foreground");
                  setShowColorPicker(!showColorPicker);
                }}
                className="flex-1"
                aria-label="Toggle color picker for foreground color"
              >
                <Eye className="h-4 w-4 mr-2" />
                Picker
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Background Color */}
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: backgroundColor }}
                ></div>
                Background Color
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyColor(backgroundColor)}
                className="h-8 w-8 p-0"
                aria-label="Copy background color"
              >
                {copiedColor === backgroundColor ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="w-full h-32 rounded-xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50 flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: backgroundColor }}
              onClick={() => {
                setActiveInput("background");
                setShowColorPicker(true);
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              <div className="text-center z-10">
                <Palette className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                <span className="text-sm text-gray-700 font-medium">
                  Click to pick color
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="background" className="text-sm font-medium">
                Color Value
              </Label>
              <Input
                id="background"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="#ffffff, rgb(255,255,255), hsl(0,0%,100%)"
                className="font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveInput("background");
                  setShowPalette(!showPalette);
                }}
                className="flex-1"
                aria-label="Toggle palette for background color"
              >
                <Palette className="h-4 w-4 mr-2" />
                Palette
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveInput("background");
                  setShowColorPicker(!showColorPicker);
                }}
                className="flex-1"
                aria-label="Toggle color picker for background color"
              >
                <Eye className="h-4 w-4 mr-2" />
                Picker
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center">
        <Button
          onClick={generateRandomColors}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
          aria-label="Generate random colors"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Generate Random Colors
        </Button>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Advanced Color Picker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ColorPicker
              color={
                activeInput === "foreground" ? foregroundColor : backgroundColor
              }
              onChange={handleColorSelect}
            />
          </CardContent>
        </Card>
      )}

      {/* Color Palette */}
      {showPalette && (
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Tailwind Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ColorPalette onColorSelect={handleColorSelect} />
          </CardContent>
        </Card>
      )}

      {/* Contrast Results */}
      {contrastResult && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contrast Ratio Display */}
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {contrastResult.ratio.toFixed(2)}
                  </div>
                  <div className="text-lg text-slate-600 dark:text-slate-400">
                    :1
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Contrast Ratio
                  </p>
                  {contrastLevel && (
                    <Badge
                      className={`${contrastLevel.color} text-white border-0`}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      {contrastLevel.level}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WCAG Compliance */}
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">WCAG Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm mb-2">WCAG AA</h3>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        contrastResult.aa.normal ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      Normal: {contrastResult.aa.normal ? "Pass" : "Fail"}
                    </Badge>
                    <Badge
                      variant={
                        contrastResult.aa.large ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      Large: {contrastResult.aa.large ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">WCAG AAA</h4>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        contrastResult.aaa.normal ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      Normal: {contrastResult.aaa.normal ? "Pass" : "Fail"}
                    </Badge>
                    <Badge
                      variant={
                        contrastResult.aaa.large ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      Large: {contrastResult.aaa.large ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Font Selection */}
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Type className="h-5 w-5" />
                Font Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="font-select" className="text-sm font-medium">
                    Google Font
                  </Label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger
                      id="font-select"
                      className="w-full"
                      aria-label="Google Font Selector"
                    >
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {GOOGLE_FONTS.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Text Preview */}
      {contrastResult && (
        <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-white/20 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Live Text Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Text Preview</TabsTrigger>
                <TabsTrigger value="samples">Sample Content</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="space-y-6">
                <div
                  className="p-8 rounded-xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50"
                  style={{
                    backgroundColor: backgroundColor,
                    color: foregroundColor,
                    fontFamily: selectedFont,
                  }}
                >
                  <div className="space-y-6">
                    <div>
                      <p
                        className="text-sm text-opacity-70 mb-2"
                        style={{ color: foregroundColor }}
                      >
                        Normal Text (16px)
                      </p>
                      <p className="text-base leading-relaxed">
                        The quick brown fox jumps over the lazy dog. This is
                        normal body text that should be easily readable.
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm text-opacity-70 mb-2"
                        style={{ color: foregroundColor }}
                      >
                        Large Text (24px)
                      </p>
                      <p className="text-2xl font-semibold leading-relaxed">
                        Large heading text for better readability
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm text-opacity-70 mb-2"
                        style={{ color: foregroundColor }}
                      >
                        Small Text (14px)
                      </p>
                      <p className="text-sm leading-relaxed">
                        Small text like captions, footnotes, or secondary
                        information.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="samples" className="space-y-6">
                <div
                  className="p-8 rounded-xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50"
                  style={{
                    backgroundColor: backgroundColor,
                    color: foregroundColor,
                    fontFamily: selectedFont,
                  }}
                >
                  <div className="space-y-8">
                    <article className="space-y-4">
                      <h1 className="text-3xl font-bold">Article Headline</h1>
                      <p
                        className="text-lg text-opacity-80"
                        style={{ color: foregroundColor }}
                      >
                        Subtitle or lead paragraph with important information
                      </p>
                      <p className="text-base leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris.
                      </p>
                      <p
                        className="text-sm text-opacity-70"
                        style={{ color: foregroundColor }}
                      >
                        Published on March 15, 2024 • 5 min read
                      </p>
                    </article>

                    <div
                      className="border-t border-opacity-20 pt-6"
                      style={{ borderColor: foregroundColor }}
                    >
                      <h2 className="text-xl font-semibold mb-3">
                        Navigation Menu
                      </h2>
                      <nav className="flex gap-6">
                        <a href="#" className="text-base hover:underline">
                          Home
                        </a>
                        <a href="#" className="text-base hover:underline">
                          About
                        </a>
                        <a href="#" className="text-base hover:underline">
                          Services
                        </a>
                        <a href="#" className="text-base hover:underline">
                          Contact
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
