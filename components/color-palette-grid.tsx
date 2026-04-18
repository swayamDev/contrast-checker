"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useContrastStore } from "@/store/contrast-store";

const TAILWIND_PALETTE: Record<string, string[]> = {
  Slate:  ["#f8fafc","#f1f5f9","#e2e8f0","#cbd5e1","#94a3b8","#64748b","#475569","#334155","#1e293b","#0f172a"],
  Gray:   ["#f9fafb","#f3f4f6","#e5e7eb","#d1d5db","#9ca3af","#6b7280","#4b5563","#374151","#1f2937","#111827"],
  Red:    ["#fef2f2","#fee2e2","#fecaca","#fca5a5","#f87171","#ef4444","#dc2626","#b91c1c","#991b1b","#7f1d1d"],
  Orange: ["#fff7ed","#ffedd5","#fed7aa","#fdba74","#fb923c","#f97316","#ea580c","#c2410c","#9a3412","#7c2d12"],
  Amber:  ["#fffbeb","#fef3c7","#fde68a","#fcd34d","#fbbf24","#f59e0b","#d97706","#b45309","#92400e","#78350f"],
  Yellow: ["#fefce8","#fef9c3","#fef08a","#fde047","#facc15","#eab308","#ca8a04","#a16207","#854d0e","#713f12"],
  Green:  ["#f0fdf4","#dcfce7","#bbf7d0","#86efac","#4ade80","#22c55e","#16a34a","#15803d","#166534","#14532d"],
  Teal:   ["#f0fdfa","#ccfbf1","#99f6e4","#5eead4","#2dd4bf","#14b8a6","#0d9488","#0f766e","#115e59","#134e4a"],
  Blue:   ["#eff6ff","#dbeafe","#bfdbfe","#93c5fd","#60a5fa","#3b82f6","#2563eb","#1d4ed8","#1e40af","#1e3a8a"],
  Indigo: ["#eef2ff","#e0e7ff","#c7d2fe","#a5b4fc","#818cf8","#6366f1","#4f46e5","#4338ca","#3730a3","#312e81"],
  Violet: ["#f5f3ff","#ede9fe","#ddd6fe","#c4b5fd","#a78bfa","#8b5cf6","#7c3aed","#6d28d9","#5b21b6","#4c1d95"],
  Pink:   ["#fdf2f8","#fce7f3","#fbcfe8","#f9a8d4","#f472b6","#ec4899","#db2777","#be185d","#9d174d","#831843"],
};

const LIGHTNESS_LABELS = ["50","100","200","300","400","500","600","700","800","900"];

interface ColorPaletteGridProps {
  onSelect?: (color: string) => void;
}

export function ColorPaletteGrid({ onSelect }: ColorPaletteGridProps) {
  const { activeInput, setForeground, setBackground } = useContrastStore();
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    if (onSelect) { onSelect(color); return; }
    if (activeInput === "foreground") setForeground(color);
    else setBackground(color);
  };

  return (
    <div className="space-y-1.5">
      {/* Header row */}
      <div className="grid" style={{ gridTemplateColumns: "80px repeat(10, 1fr)" }}>
        <div />
        {LIGHTNESS_LABELS.map((l) => (
          <div key={l} className="text-center text-xs" style={{ color: "var(--text-muted)" }}>{l}</div>
        ))}
      </div>

      {/* Color rows */}
      {Object.entries(TAILWIND_PALETTE).map(([name, shades]) => (
        <div key={name} className="grid items-center" style={{ gridTemplateColumns: "80px repeat(10, 1fr)", gap: "2px" }}>
          <div className="text-xs font-medium pr-2" style={{ color: "var(--text-secondary)" }}>{name}</div>
          {shades.map((color, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(color)}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(null)}
              whileHover={{ scale: 1.25, zIndex: 10 }}
              whileTap={{ scale: 0.9 }}
              className="aspect-square rounded-md relative"
              style={{ background: color }}
              aria-label={`${name} ${LIGHTNESS_LABELS[i]}: ${color}`}
              title={`${color}`}
            />
          ))}
        </div>
      ))}

      {/* Hovered preview */}
      {hoveredColor && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-mono"
          style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}
        >
          <div className="w-5 h-5 rounded-md border border-[var(--border)]" style={{ background: hoveredColor }} />
          {hoveredColor}
        </div>
      )}
    </div>
  );
}
