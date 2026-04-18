"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowUpDown, Pipette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { hexToRgb, rgbToHsl, hslToString, rgbToString, parseColor, rgbToHex } from "@/lib/color";
import type { ActiveInput } from "@/types";

interface ColorInputProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  isActive: boolean;
  onActivate: () => void;
  simColor?: string;
  onSwap?: () => void;
  showSwap?: boolean;
}

export function ColorInput({ label, color, onChange, isActive, onActivate, simColor, onSwap, showSwap }: ColorInputProps) {
  const { copy, isCopied } = useCopy();
  const nativeRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState(color);
  const [inputFocused, setInputFocused] = useState(false);

  const displayColor = simColor || color;
  const rgb = hexToRgb(displayColor);
  const hsl = rgb ? rgbToHsl(rgb) : null;

  const handleTextChange = (val: string) => {
    setInputVal(val);
    if (parseColor(val)) {
      const rgb = parseColor(val)!;
      onChange(rgbToHex(rgb));
    }
  };

  const handleBlur = () => {
    setInputFocused(false);
    setInputVal(color);
  };

  const handleFocus = () => {
    setInputFocused(true);
    setInputVal(color);
    onActivate();
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden",
        isActive
          ? "border-[var(--primary)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_15%,transparent)]"
          : "border-[var(--border)]"
      )}
      style={{ background: "var(--surface)" }}
    >
      {/* Color swatch */}
      <div
        className="relative h-32 w-full cursor-pointer group"
        style={{ background: displayColor }}
        onClick={() => { onActivate(); nativeRef.current?.click(); }}
        role="button"
        aria-label={`Pick ${label}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && nativeRef.current?.click()}
      >
        {simColor && simColor !== color && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
            Simulated
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/30 backdrop-blur-sm text-white text-sm font-medium">
            <Pipette size={14} />
            Pick color
          </div>
        </div>
        <input
          ref={nativeRef}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={`Native color picker for ${label}`}
        />
      </div>

      {/* Info area */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {label}
          </span>
          <div className="flex gap-1">
            {showSwap && onSwap && (
              <button
                onClick={onSwap}
                aria-label="Swap colors"
                className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <ArrowUpDown size={13} />
              </button>
            )}
            <button
              onClick={() => copy(color)}
              aria-label="Copy hex color"
              className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              {isCopied(color) ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Hex input */}
        <input
          value={inputFocused ? inputVal : color}
          onChange={(e) => handleTextChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-3 py-2 rounded-xl text-sm font-mono border border-[var(--border)] bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          style={{ color: "var(--text-primary)" }}
          aria-label={`${label} color value`}
          placeholder="#000000"
          spellCheck={false}
        />

        {/* Formats */}
        {rgb && hsl && (
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "RGB", value: rgbToString(rgb) },
              { label: "HSL", value: hslToString(hsl) },
            ].map(({ label: fl, value }) => (
              <button
                key={fl}
                onClick={() => copy(value)}
                className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-[var(--bg-secondary)] transition-colors border border-transparent hover:border-[var(--border)] text-left group"
                aria-label={`Copy ${fl} value`}
              >
                <span className="font-medium" style={{ color: "var(--text-muted)" }}>{fl}</span>
                <span className="font-mono truncate ml-1 flex-1 text-right" style={{ color: "var(--text-secondary)", fontSize: "10px" }}>
                  {isCopied(value) ? "✓ copied" : value}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
