"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tailwindColors = {
  slate: {
    name: "Slate",
    shades: [
      "#f8fafc",
      "#f1f5f9",
      "#e2e8f0",
      "#cbd5e1",
      "#94a3b8",
      "#64748b",
      "#475569",
      "#334155",
      "#1e293b",
      "#0f172a",
    ],
  },
  gray: {
    name: "Gray",
    shades: [
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#111827",
    ],
  },
  zinc: {
    name: "Zinc",
    shades: [
      "#fafafa",
      "#f4f4f5",
      "#e4e4e7",
      "#d4d4d8",
      "#a1a1aa",
      "#71717a",
      "#52525b",
      "#3f3f46",
      "#27272a",
      "#18181b",
    ],
  },
  red: {
    name: "Red",
    shades: [
      "#fef2f2",
      "#fee2e2",
      "#fecaca",
      "#fca5a5",
      "#f87171",
      "#ef4444",
      "#dc2626",
      "#b91c1c",
      "#991b1b",
      "#7f1d1d",
    ],
  },
  orange: {
    name: "Orange",
    shades: [
      "#fff7ed",
      "#ffedd5",
      "#fed7aa",
      "#fdba74",
      "#fb923c",
      "#f97316",
      "#ea580c",
      "#c2410c",
      "#9a3412",
      "#7c2d12",
    ],
  },
  amber: {
    name: "Amber",
    shades: [
      "#fffbeb",
      "#fef3c7",
      "#fde68a",
      "#fcd34d",
      "#fbbf24",
      "#f59e0b",
      "#d97706",
      "#b45309",
      "#92400e",
      "#78350f",
    ],
  },
  yellow: {
    name: "Yellow",
    shades: [
      "#fefce8",
      "#fef9c3",
      "#fef08a",
      "#fde047",
      "#facc15",
      "#eab308",
      "#ca8a04",
      "#a16207",
      "#854d0e",
      "#713f12",
    ],
  },
  lime: {
    name: "Lime",
    shades: [
      "#f7fee7",
      "#ecfccb",
      "#d9f99d",
      "#bef264",
      "#a3e635",
      "#84cc16",
      "#65a30d",
      "#4d7c0f",
      "#365314",
      "#1a2e05",
    ],
  },
  green: {
    name: "Green",
    shades: [
      "#f0fdf4",
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a",
      "#15803d",
      "#166534",
      "#14532d",
    ],
  },
  emerald: {
    name: "Emerald",
    shades: [
      "#ecfdf5",
      "#d1fae5",
      "#a7f3d0",
      "#6ee7b7",
      "#34d399",
      "#10b981",
      "#059669",
      "#047857",
      "#065f46",
      "#064e3b",
    ],
  },
  teal: {
    name: "Teal",
    shades: [
      "#f0fdfa",
      "#ccfbf1",
      "#99f6e4",
      "#5eead4",
      "#2dd4bf",
      "#14b8a6",
      "#0d9488",
      "#0f766e",
      "#115e59",
      "#134e4a",
    ],
  },
  cyan: {
    name: "Cyan",
    shades: [
      "#ecfeff",
      "#cffafe",
      "#a5f3fc",
      "#67e8f9",
      "#22d3ee",
      "#06b6d4",
      "#0891b2",
      "#0e7490",
      "#155e75",
      "#164e63",
    ],
  },
  sky: {
    name: "Sky",
    shades: [
      "#f0f9ff",
      "#e0f2fe",
      "#bae6fd",
      "#7dd3fc",
      "#38bdf8",
      "#0ea5e9",
      "#0284c7",
      "#0369a1",
      "#075985",
      "#0c4a6e",
    ],
  },
  blue: {
    name: "Blue",
    shades: [
      "#eff6ff",
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
  },
  indigo: {
    name: "Indigo",
    shades: [
      "#eef2ff",
      "#e0e7ff",
      "#c7d2fe",
      "#a5b4fc",
      "#818cf8",
      "#6366f1",
      "#4f46e5",
      "#4338ca",
      "#3730a3",
      "#312e81",
    ],
  },
  violet: {
    name: "Violet",
    shades: [
      "#f5f3ff",
      "#ede9fe",
      "#ddd6fe",
      "#c4b5fd",
      "#a78bfa",
      "#8b5cf6",
      "#7c3aed",
      "#6d28d9",
      "#5b21b6",
      "#4c1d95",
    ],
  },
  purple: {
    name: "Purple",
    shades: [
      "#faf5ff",
      "#f3e8ff",
      "#e9d5ff",
      "#d8b4fe",
      "#c084fc",
      "#a855f7",
      "#9333ea",
      "#7e22ce",
      "#6b21a8",
      "#581c87",
    ],
  },
  fuchsia: {
    name: "Fuchsia",
    shades: [
      "#fdf4ff",
      "#fae8ff",
      "#f5d0fe",
      "#f0abfc",
      "#e879f9",
      "#d946ef",
      "#c026d3",
      "#a21caf",
      "#86198f",
      "#701a75",
    ],
  },
  pink: {
    name: "Pink",
    shades: [
      "#fdf2f8",
      "#fce7f3",
      "#fbcfe8",
      "#f9a8d4",
      "#f472b6",
      "#ec4899",
      "#db2777",
      "#be185d",
      "#9d174d",
      "#831843",
    ],
  },
  rose: {
    name: "Rose",
    shades: [
      "#fff1f2",
      "#ffe4e6",
      "#fecdd3",
      "#fda4af",
      "#fb7185",
      "#f43f5e",
      "#e11d48",
      "#be123c",
      "#9f1239",
      "#881337",
    ],
  },
}

interface ColorPaletteProps {
  onColorSelect: (color: string) => void
}

export function ColorPalette({ onColorSelect }: ColorPaletteProps) {
  return (
    <div className="space-y-6">
      {Object.entries(tailwindColors).map(([colorKey, colorData]) => (
        <div key={colorKey} className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {colorData.name}
            </Badge>
            <div className="h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 flex-1"></div>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {colorData.shades.map((color, index) => (
              <div key={`${colorKey}-${index}`} className="group relative">
                <Button
                  variant="ghost"
                  className="h-12 w-full p-0 rounded-lg border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: color }}
                  onClick={() => onColorSelect(color)}
                  title={`${colorData.name}-${(index + 1) * 100} (${color})`}
                  aria-label={`Select ${colorData.name} shade ${(index + 1) * 100}`}
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                    {(index + 1) * 100}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
