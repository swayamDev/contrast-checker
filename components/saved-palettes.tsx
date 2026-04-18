"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, BookmarkPlus, X } from "lucide-react";
import { useContrastStore } from "@/store/contrast-store";
import { useContrast } from "@/hooks/use-contrast";
import type { SavedPalette } from "@/types";

const SCORE_COLORS: Record<string, string> = {
  fail: "#ef4444", "aa-large": "#f59e0b", aa: "#3b82f6", aaa: "#16a34a",
};

function PaletteCard({ palette, onLoad, onDelete }: {
  palette: SavedPalette;
  onLoad: (p: SavedPalette) => void;
  onDelete: (id: string) => void;
}) {
  const score = palette.ratio >= 7 ? "aaa" : palette.ratio >= 4.5 ? "aa" : palette.ratio >= 3 ? "aa-large" : "fail";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-all cursor-pointer"
      style={{ background: "var(--surface-raised)" }}
      onClick={() => onLoad(palette)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onLoad(palette)}
      aria-label={`Load palette: ${palette.name}`}
    >
      {/* Swatches */}
      <div className="flex flex-shrink-0">
        <div className="w-8 h-8 rounded-lg border border-white/20" style={{ background: palette.background }} />
        <div className="w-8 h-8 rounded-lg -ml-2 border border-white/20" style={{ background: palette.foreground }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{palette.name}</div>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          <span style={{ color: SCORE_COLORS[score], fontWeight: 600 }}>{palette.ratio.toFixed(2)}:1</span>
          {" · "}
          {score.toUpperCase()}
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(palette.id); }}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--danger-light)] transition-all"
        style={{ color: "var(--text-muted)" }}
        aria-label={`Delete palette: ${palette.name}`}
      >
        <Trash2 size={13} />
      </button>
    </motion.div>
  );
}

export function SavedPalettes() {
  const { savedPalettes, savePalette, deletePalette, loadPalette } = useContrastStore();
  const { result } = useContrast();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!name.trim() || !result) return;
    savePalette(name.trim(), result.ratio);
    setName("");
    setSaving(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Saved Palettes</h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {savedPalettes.length} saved · up to 20
          </p>
        </div>
        <button
          onClick={() => setSaving(true)}
          disabled={!result}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors disabled:opacity-40"
          style={{ background: "var(--primary-light)", color: "var(--primary)" }}
          aria-label="Save current palette"
        >
          <BookmarkPlus size={13} />
          Save
        </button>
      </div>

      {/* Save form */}
      <AnimatePresence>
        {saving && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-[var(--border)]"
          >
            <div className="p-4 flex gap-2">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setSaving(false); }}
                placeholder="Palette name…"
                className="flex-1 px-3 py-2 rounded-xl border border-[var(--border)] text-sm bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--primary)]"
                style={{ color: "var(--text-primary)" }}
                aria-label="Palette name"
              />
              <button
                onClick={handleSave}
                disabled={!name.trim()}
                className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40 transition-colors"
                style={{ background: "var(--primary)", color: "white" }}
              >
                Save
              </button>
              <button
                onClick={() => setSaving(false)}
                className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
                style={{ color: "var(--text-muted)" }}
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="p-3 space-y-1.5 max-h-72 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {savedPalettes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No saved palettes yet</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Save a combination you like</p>
            </motion.div>
          ) : (
            savedPalettes.map((p) => (
              <PaletteCard
                key={p.id}
                palette={p}
                onLoad={loadPalette}
                onDelete={deletePalette}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
