"use client";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--border)] backdrop-blur-xl"
      style={{ background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
            style={{ background: "var(--accent-gradient)" }}
            aria-hidden="true"
          >
            C
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Contrast<span className="gradient-text">Studio</span>
          </span>
        </div>

        {/* Center badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
          style={{ background: "var(--primary-light)", color: "var(--primary)", borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          WCAG 2.2 Compliant
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
