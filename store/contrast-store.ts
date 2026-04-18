import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ColorBlindnessMode, SavedPalette, ActiveInput } from "@/types";
import { generateId } from "@/lib/utils";

interface ContrastState {
  foreground: string;
  background: string;
  activeInput: ActiveInput;
  colorBlindnessMode: ColorBlindnessMode;
  fontSize: number;
  fontWeight: number;
  savedPalettes: SavedPalette[];
  setForeground: (color: string) => void;
  setBackground: (color: string) => void;
  setActiveInput: (input: ActiveInput) => void;
  setColorBlindnessMode: (mode: ColorBlindnessMode) => void;
  setFontSize: (size: number) => void;
  setFontWeight: (weight: number) => void;
  swapColors: () => void;
  savePalette: (name: string, ratio: number) => void;
  deletePalette: (id: string) => void;
  loadPalette: (palette: SavedPalette) => void;
}

export const useContrastStore = create<ContrastState>()(
  persist(
    (set, get) => ({
      foreground: "#1a1917",
      background: "#f8f8f6",
      activeInput: "foreground",
      colorBlindnessMode: "normal",
      fontSize: 16,
      fontWeight: 400,
      savedPalettes: [],

      setForeground: (color) => set({ foreground: color }),
      setBackground: (color) => set({ background: color }),
      setActiveInput: (input) => set({ activeInput: input }),
      setColorBlindnessMode: (mode) => set({ colorBlindnessMode: mode }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontWeight: (weight) => set({ fontWeight: weight }),

      swapColors: () => {
        const { foreground, background } = get();
        set({ foreground: background, background: foreground });
      },

      savePalette: (name, ratio) => {
        const { foreground, background, savedPalettes } = get();
        const newPalette: SavedPalette = {
          id: generateId(),
          name,
          foreground,
          background,
          ratio,
          createdAt: Date.now(),
        };
        set({ savedPalettes: [newPalette, ...savedPalettes].slice(0, 20) });
      },

      deletePalette: (id) => {
        set({ savedPalettes: get().savedPalettes.filter(p => p.id !== id) });
      },

      loadPalette: (palette) => {
        set({ foreground: palette.foreground, background: palette.background });
      },
    }),
    {
      name: "contrast-studio",
      partialize: (state) => ({
        foreground: state.foreground,
        background: state.background,
        savedPalettes: state.savedPalettes,
        colorBlindnessMode: state.colorBlindnessMode,
      }),
    }
  )
);
