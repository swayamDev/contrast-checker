import { useMemo } from "react";
import { useContrastStore } from "@/store/contrast-store";
import { evaluateContrast, simulateColorBlindness, getColorFormats } from "@/lib/color";

export function useContrast() {
  const { foreground, background, colorBlindnessMode } = useContrastStore();

  const simFg = useMemo(() =>
    simulateColorBlindness(foreground, colorBlindnessMode),
    [foreground, colorBlindnessMode]
  );

  const simBg = useMemo(() =>
    simulateColorBlindness(background, colorBlindnessMode),
    [background, colorBlindnessMode]
  );

  const result = useMemo(() =>
    evaluateContrast(simFg, simBg),
    [simFg, simBg]
  );

  const fgFormats = useMemo(() => getColorFormats(foreground), [foreground]);
  const bgFormats = useMemo(() => getColorFormats(background), [background]);

  return { result, simFg, simBg, fgFormats, bgFormats };
}
