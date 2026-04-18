"use client";
import { Shuffle, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { useContrastStore } from "@/store/contrast-store";
import { generateRandomPair } from "@/lib/color";

const PRESET_PAIRS = [
  { label: "Classic", fg: "#1a1917", bg: "#f8f8f6" },
  { label: "Ocean", fg: "#0c4a6e", bg: "#e0f2fe" },
  { label: "Forest", fg: "#14532d", bg: "#f0fdf4" },
  { label: "Dusk", fg: "#faf5ff", bg: "#581c87" },
  { label: "Ember", fg: "#431407", bg: "#fff7ed" },
  { label: "Midnight", fg: "#e0e7ff", bg: "#1e1b4b" },
  { label: "Rose", fg: "#881337", bg: "#fff1f2" },
  { label: "Slate", fg: "#f8fafc", bg: "#0f172a" },
];

export function QuickActions() {
  const { setForeground, setBackground, swapColors } = useContrastStore();

  const handleRandom = () => {
    const { fg, bg } = generateRandomPair();
    setForeground(fg);
    setBackground(bg);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={handleRandom}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--accent-gradient)", color: "white" }}
          aria-label="Generate random accessible color pair"
        >
          <Shuffle size={15} />
          Random Pair
        </button>
        <button
          onClick={swapColors}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-[var(--bg-secondary)] active:scale-95"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          aria-label="Swap foreground and background colors"
        >
          <ArrowLeftRight size={15} />
          Swap
        </button>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
          Preset Pairs
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {PRESET_PAIRS.map(({ label, fg, bg }) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.93 }}
              onClick={() => { setForeground(fg); setBackground(bg); }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-all group"
              style={{ background: "var(--surface)" }}
              aria-label={`Load ${label} preset`}
            >
              <div
                className="w-full h-7 rounded-lg overflow-hidden flex"
              >
                <div className="flex-1" style={{ background: bg }} />
                <div className="flex-1" style={{ background: fg }} />
              </div>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
