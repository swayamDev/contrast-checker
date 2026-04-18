"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { ContrastResult } from "@/types";
import { cn } from "@/lib/utils";

interface ContrastScoreProps {
  result: ContrastResult | null;
}

const SCORE_CONFIG = {
  fail:     { label: "Fail",      color: "#ef4444", bg: "#fee2e2", darkBg: "#2a0f0f", desc: "Does not meet any WCAG standard" },
  "aa-large":{ label: "AA Large", color: "#f59e0b", bg: "#fef3c7", darkBg: "#2a1f0a", desc: "Passes AA for large text only (≥18pt or ≥14pt bold)" },
  aa:       { label: "AA",        color: "#3b82f6", bg: "#dbeafe", darkBg: "#0f1a2a", desc: "Passes WCAG AA for normal and large text" },
  aaa:      { label: "AAA",       color: "#16a34a", bg: "#dcfce7", darkBg: "#0f2a1a", desc: "Exceeds WCAG AAA — highest accessibility standard" },
};

function WcagRow({ label, pass, desc }: { label: string; pass: boolean; desc: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--border-subtle)] last:border-0">
      <div>
        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</div>
        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</div>
      </div>
      <span
        className="ml-4 flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide"
        style={{
          background: pass ? "var(--success-light)" : "var(--danger-light)",
          color: pass ? "var(--success)" : "var(--danger)",
        }}
      >
        {pass ? "Pass" : "Fail"}
      </span>
    </div>
  );
}

export function ContrastScore({ result }: ContrastScoreProps) {
  const config = result ? SCORE_CONFIG[result.score] : null;

  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Main ratio display */}
      <div className="p-6 text-center border-b border-[var(--border)]">
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Contrast Ratio
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={result?.ratio.toFixed(2) ?? "null"}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-baseline justify-center gap-1"
          >
            <span
              className="text-6xl font-black tabular-nums"
              style={{ color: config?.color ?? "var(--text-muted)", letterSpacing: "-0.03em" }}
            >
              {result ? result.ratio.toFixed(2) : "—"}
            </span>
            <span className="text-2xl font-semibold" style={{ color: "var(--text-muted)" }}>:1</span>
          </motion.div>
        </AnimatePresence>

        {/* Score badge */}
        <AnimatePresence mode="wait">
          {config && (
            <motion.div
              key={result?.score}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="mt-3 space-y-1.5"
            >
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold"
                style={{ background: config.bg, color: config.color }}
              >
                {result?.score === "aaa" && "✦ "}
                {config.label}
              </span>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{config.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual ratio bar */}
        <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: config?.color ?? "var(--border)" }}
            initial={{ width: 0 }}
            animate={{ width: result ? `${Math.min(100, (result.ratio / 21) * 100)}%` : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          <span>1:1</span>
          <span>21:1</span>
        </div>
      </div>

      {/* WCAG breakdown */}
      <div className="p-4">
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          WCAG 2.2 Compliance
        </div>
        <WcagRow label="AA – Normal Text" pass={result?.aa.normal ?? false} desc="Minimum 4.5:1 ratio (body copy)" />
        <WcagRow label="AA – Large Text" pass={result?.aa.large ?? false} desc="Minimum 3:1 ratio (≥18pt regular / ≥14pt bold)" />
        <WcagRow label="AA – UI Components" pass={result?.aa.ui ?? false} desc="Minimum 3:1 for icons & borders" />
        <WcagRow label="AAA – Normal Text" pass={result?.aaa.normal ?? false} desc="Enhanced 7:1 ratio" />
        <WcagRow label="AAA – Large Text" pass={result?.aaa.large ?? false} desc="Enhanced 4.5:1 ratio" />
      </div>
    </div>
  );
}
