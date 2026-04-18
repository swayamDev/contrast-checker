"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useContrastStore } from "@/store/contrast-store";
import { useContrast } from "@/hooks/use-contrast";

const FONT_WEIGHTS = [
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "SemiBold", value: 600 },
  { label: "Bold", value: 700 },
];

const PREVIEW_TABS = ["Text", "UI", "Article"] as const;
type PreviewTab = (typeof PREVIEW_TABS)[number];

export function LivePreview() {
  const { fontSize, fontWeight, setFontSize, setFontWeight } = useContrastStore();
  const { simFg, simBg } = useContrast();
  const [activeTab, setActiveTab] = useState<PreviewTab>("Text");

  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Live Preview</h3>
          <div className="flex rounded-lg overflow-hidden border border-[var(--border)]">
            {PREVIEW_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: activeTab === tab ? "var(--primary)" : "transparent",
                  color: activeTab === tab ? "white" : "var(--text-secondary)",
                }}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min={10}
              max={48}
              value={fontSize}
              onChange={(e) => setFontSize(+e.target.value)}
              className="w-full"
              aria-label="Font size"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
              Weight
            </label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(+e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border border-[var(--border)] text-xs bg-[var(--bg-secondary)]"
              style={{ color: "var(--text-primary)" }}
              aria-label="Font weight"
            >
              {FONT_WEIGHTS.map((w) => (
                <option key={w.value} value={w.value}>{w.label} ({w.value})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Preview canvas */}
      <motion.div
        key={`${simFg}-${simBg}`}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="p-6 min-h-48"
        style={{ background: simBg, color: simFg }}
      >
        {activeTab === "Text" && (
          <div className="space-y-4">
            <p style={{ fontSize: `${fontSize}px`, fontWeight, color: simFg, lineHeight: 1.5 }}>
              The quick brown fox jumps over the lazy dog.
            </p>
            <p style={{ fontSize: `${Math.max(10, fontSize - 4)}px`, fontWeight: 400, color: simFg, lineHeight: 1.6, opacity: 0.85 }}>
              Body text: Accessibility ensures that all users, regardless of disability, can perceive and interact with digital content effectively.
            </p>
            <p style={{ fontSize: `${Math.max(8, fontSize - 6)}px`, fontWeight: 400, color: simFg, lineHeight: 1.5, opacity: 0.7 }}>
              Small caption — Published Apr 18, 2025 · 5 min read
            </p>
          </div>
        )}

        {activeTab === "UI" && (
          <div className="space-y-4">
            {/* Button */}
            <div className="flex flex-wrap gap-3">
              <button
                style={{ background: simFg, color: simBg, fontSize: "14px", fontWeight: 600, padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "default" }}
              >
                Primary Action
              </button>
              <button
                style={{ background: "transparent", color: simFg, fontSize: "14px", fontWeight: 500, padding: "8px 20px", borderRadius: "8px", border: `1.5px solid ${simFg}`, cursor: "default" }}
              >
                Secondary
              </button>
            </div>
            {/* Input */}
            <input
              readOnly
              value="Sample input field"
              style={{ background: "transparent", color: simFg, border: `1.5px solid ${simFg}`, borderRadius: "8px", padding: "8px 12px", fontSize: "14px", width: "100%", outline: "none" }}
            />
            {/* Nav links */}
            <nav className="flex gap-5" style={{ borderTop: `1px solid ${simFg}`, paddingTop: "16px" }}>
              {["Home", "About", "Products", "Contact"].map(l => (
                <span key={l} style={{ color: simFg, fontSize: "14px", fontWeight: 500, textDecoration: "underline", cursor: "default" }}>{l}</span>
              ))}
            </nav>
          </div>
        )}

        {activeTab === "Article" && (
          <article className="space-y-3">
            <h1 style={{ fontSize: `${Math.min(48, fontSize * 1.6)}px`, fontWeight: 700, color: simFg, lineHeight: 1.2 }}>
              Designing for All
            </h1>
            <p style={{ fontSize: `${Math.min(24, fontSize * 1.1)}px`, fontWeight: 400, color: simFg, opacity: 0.75, lineHeight: 1.4 }}>
              How inclusive design improves experiences for everyone
            </p>
            <p style={{ fontSize: `${fontSize}px`, fontWeight, color: simFg, lineHeight: 1.7, opacity: 0.9 }}>
              Accessible design isn't a constraint — it's a creative challenge that yields better products for all users. When we design with contrast ratios, keyboard navigation, and screen readers in mind, we build digital experiences that stand the test of time.
            </p>
            <div style={{ fontSize: "12px", color: simFg, opacity: 0.55, marginTop: "8px" }}>
              Written by Design Team · April 18, 2025
            </div>
          </article>
        )}
      </motion.div>
    </div>
  );
}
