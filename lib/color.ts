import type { RGB, HSL, ContrastResult, ColorBlindnessMode } from "@/types";

export function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean;
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rs = r / 255, gs = g / 255, bs = b / 255;
  const max = Math.max(rs, gs, bs), min = Math.min(rs, gs, bs);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rs: h = ((gs - bs) / d + (gs < bs ? 6 : 0)) / 6; break;
      case gs: h = ((bs - rs) / d + 2) / 6; break;
      case bs: h = ((rs - gs) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  return {
    r: Math.round(hue2rgb(p, q, hn + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1/3) * 255),
  };
}

export function parseColor(color: string): RGB | null {
  color = color.trim();
  if (color.startsWith("#")) return hexToRgb(color);
  const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbMatch) return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
  const hslMatch = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i);
  if (hslMatch) return hslToRgb({ h: +hslMatch[1], s: +hslMatch[2], l: +hslMatch[3] });
  return null;
}

export function getLuminance({ r, g, b }: RGB): number {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);
  if (!rgb1 || !rgb2) return null;
  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function evaluateContrast(color1: string, color2: string): ContrastResult | null {
  const ratio = getContrastRatio(color1, color2);
  if (ratio === null) return null;
  const score =
    ratio >= 7 ? "aaa" :
    ratio >= 4.5 ? "aa" :
    ratio >= 3 ? "aa-large" : "fail";
  return {
    ratio,
    aa: { normal: ratio >= 4.5, large: ratio >= 3, ui: ratio >= 3 },
    aaa: { normal: ratio >= 7, large: ratio >= 4.5 },
    score,
  };
}

export function rgbToString({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function hslToString({ h, s, l }: HSL): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function getColorFormats(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const hsl = rgbToHsl(rgb);
  return {
    hex,
    rgb: rgbToString(rgb),
    hsl: hslToString(hsl),
  };
}

// Color blindness simulation matrices
const CB_MATRICES: Record<ColorBlindnessMode, number[]> = {
  normal: [1,0,0,0,1,0,0,0,1],
  protanopia: [0.567,0.433,0,0.558,0.442,0,0,0.242,0.758],
  deuteranopia: [0.625,0.375,0,0.7,0.3,0,0,0.3,0.7],
  tritanopia: [0.95,0.05,0,0,0.433,0.567,0,0.475,0.525],
  achromatopsia: [0.299,0.587,0.114,0.299,0.587,0.114,0.299,0.587,0.114],
};

export function simulateColorBlindness(hex: string, mode: ColorBlindnessMode): string {
  if (mode === "normal") return hex;
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const m = CB_MATRICES[mode];
  return rgbToHex({
    r: Math.round(Math.min(255, Math.max(0, m[0]*rgb.r + m[1]*rgb.g + m[2]*rgb.b))),
    g: Math.round(Math.min(255, Math.max(0, m[3]*rgb.r + m[4]*rgb.g + m[5]*rgb.b))),
    b: Math.round(Math.min(255, Math.max(0, m[6]*rgb.r + m[7]*rgb.g + m[8]*rgb.b))),
  });
}

export function generateRandomPair(): { fg: string; bg: string } {
  const hue = Math.floor(Math.random() * 360);
  const bg = hslToRgb({ h: hue, s: 10 + Math.floor(Math.random() * 20), l: 90 + Math.floor(Math.random() * 8) });
  const fg = hslToRgb({ h: hue, s: 40 + Math.floor(Math.random() * 40), l: 10 + Math.floor(Math.random() * 20) });
  return { fg: rgbToHex(fg), bg: rgbToHex(bg) };
}

export function isValidColor(color: string): boolean {
  return parseColor(color) !== null;
}

export function suggestAccessibleColor(baseHex: string, targetRatio: number, darkBg: boolean): string {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return darkBg ? "#ffffff" : "#000000";
  const hsl = rgbToHsl(rgb);
  // Adjust lightness to achieve target ratio
  let lo = darkBg ? 50 : 0;
  let hi = darkBg ? 100 : 50;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    const candidate = rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: mid }));
    const ratio = getContrastRatio(candidate, baseHex) || 0;
    if (ratio < targetRatio) {
      darkBg ? (lo = mid) : (hi = mid);
    } else {
      darkBg ? (hi = mid) : (lo = mid);
    }
  }
  return rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: (lo + hi) / 2 }));
}
