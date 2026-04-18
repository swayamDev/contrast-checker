export interface RGB { r: number; g: number; b: number; }
export interface HSL { h: number; s: number; l: number; }

export interface ContrastResult {
  ratio: number;
  aa: { normal: boolean; large: boolean; ui: boolean };
  aaa: { normal: boolean; large: boolean };
  score: "fail" | "aa-large" | "aa" | "aaa";
}

export type ColorBlindnessMode =
  | "normal"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export interface SavedPalette {
  id: string;
  name: string;
  foreground: string;
  background: string;
  ratio: number;
  createdAt: number;
}

export interface ColorFormat { hex: string; rgb: string; hsl: string; }

export type ActiveInput = "foreground" | "background";
