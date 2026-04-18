"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useContrastStore } from "@/store/contrast-store";
import { useContrast } from "@/hooks/use-contrast";
import { ColorInput } from "./color-input";
import { ContrastScore } from "./contrast-score";
import { LivePreview } from "./live-preview";
import { ColorBlindnessPanel } from "./color-blindness-panel";
import { SavedPalettes } from "./saved-palettes";
import { QuickActions } from "./quick-actions";
import { ColorPaletteGrid } from "./color-palette-grid";
import { cn } from "@/lib/utils";

type Section = "palette" | "blindness" | "saved";

function Accordion({ id, label, open, onToggle, children }: {
  id: Section; label: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: "var(--surface)" }}>
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-sm font-semibold hover:bg-[var(--bg-secondary)] transition-colors"
        style={{ color: "var(--text-primary)" }}
        aria-expanded={open}
        aria-controls={`section-${id}`}
      >
        {label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`section-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border)] p-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContrastChecker() {
  const { foreground, background, activeInput, setForeground, setBackground, setActiveInput, swapColors } = useContrastStore();
  const { result, simFg, simBg } = useContrast();
  const [openSection, setOpenSection] = useState<Section | null>(null);

  const toggle = (s: Section) => setOpenSection(prev => prev === s ? null : s);

  return (
    <div className="space-y-6">
      {/* Hero preview strip */}
      <motion.div
        className="rounded-3xl overflow-hidden border border-[var(--border)] relative"
        style={{ background: "var(--surface)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="flex items-center justify-center px-8 py-10 min-h-32 transition-colors duration-200"
          style={{ background: simBg }}
        >
          <div className="text-center space-y-1">
            <p
              className="text-4xl font-black tracking-tight leading-none transition-colors duration-200"
              style={{ color: simFg, fontFamily: "var(--font-sans)" }}
            >
              Aa
            </p>
            <p
              className="text-base font-medium transition-colors duration-200"
              style={{ color: simFg }}
            >
              {result ? `${result.ratio.toFixed(2)}:1 · ${result.score === "fail" ? "Fail" : result.score.toUpperCase()}` : "—"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Color inputs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <ColorInput
              label="Foreground"
              color={foreground}
              onChange={setForeground}
              isActive={activeInput === "foreground"}
              onActivate={() => setActiveInput("foreground")}
              simColor={simFg !== foreground ? simFg : undefined}
              onSwap={swapColors}
              showSwap
            />
            <ColorInput
              label="Background"
              color={background}
              onChange={setBackground}
              isActive={activeInput === "background"}
              onActivate={() => setActiveInput("background")}
              simColor={simBg !== background ? simBg : undefined}
            />
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-[var(--border)] p-4" style={{ background: "var(--surface)" }}>
            <QuickActions />
          </div>

          {/* Accordion sections */}
          <Accordion id="palette" label="🎨 Tailwind Color Palette" open={openSection === "palette"} onToggle={() => toggle("palette")}>
            <ColorPaletteGrid />
          </Accordion>

          <Accordion id="blindness" label="👁 Color Blindness Simulation" open={openSection === "blindness"} onToggle={() => toggle("blindness")}>
            <ColorBlindnessPanel />
          </Accordion>

          <Accordion id="saved" label="🔖 Saved Palettes" open={openSection === "saved"} onToggle={() => toggle("saved")}>
            <SavedPalettes />
          </Accordion>

          {/* Live preview */}
          <LivePreview />
        </div>

        {/* Right column: sticky score */}
        <div className="space-y-4">
          <div className="lg:sticky lg:top-20">
            <ContrastScore result={result} />
          </div>
        </div>
      </div>
    </div>
  );
}
