"use client";
import { useContrastStore } from "@/store/contrast-store";
import { simulateColorBlindness, evaluateContrast } from "@/lib/color";
import type { ColorBlindnessMode } from "@/types";
import { cn } from "@/lib/utils";

const MODES: { value: ColorBlindnessMode; label: string; desc: string }[] = [
  { value: "normal",       label: "Normal",        desc: "Standard vision" },
  { value: "protanopia",   label: "Protanopia",    desc: "Red-blind (~1% men)" },
  { value: "deuteranopia", label: "Deuteranopia",  desc: "Green-blind (~1% men)" },
  { value: "tritanopia",   label: "Tritanopia",    desc: "Blue-blind (rare)" },
  { value: "achromatopsia",label: "Achromatopsia", desc: "No color vision" },
];

export function ColorBlindnessPanel() {
  const { foreground, background, colorBlindnessMode, setColorBlindnessMode } = useContrastStore();

  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Color Blindness Simulation</h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Preview how your colors appear to users with different vision types
        </p>
      </div>

      <div className="p-4 space-y-2">
        {MODES.map(({ value, label, desc }) => {
          const simFg = simulateColorBlindness(foreground, value);
          const simBg = simulateColorBlindness(background, value);
          const result = evaluateContrast(simFg, simBg);
          const isActive = colorBlindnessMode === value;

          return (
            <button
              key={value}
              onClick={() => setColorBlindnessMode(value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left",
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary-light)]"
                  : "border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-secondary)]"
              )}
              aria-pressed={isActive}
            >
              {/* Color preview */}
              <div className="flex-shrink-0 flex">
                <div className="w-7 h-7 rounded-lg border border-white/20" style={{ background: simBg }} />
                <div className="w-7 h-7 rounded-lg -ml-2 border border-white/20" style={{ background: simFg }} />
              </div>

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
              </div>

              {/* Ratio */}
              {result && (
                <div className="flex-shrink-0 text-right">
                  <div
                    className="text-xs font-bold"
                    style={{
                      color: result.score === "fail" ? "var(--danger)" :
                             result.score === "aa-large" ? "var(--warning)" :
                             result.score === "aaa" ? "var(--success)" : "var(--primary)",
                    }}
                  >
                    {result.ratio.toFixed(1)}:1
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {result.score === "fail" ? "Fail" : result.score.toUpperCase()}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
