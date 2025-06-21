"use client";

import { ColorContrastChecker } from "@/components/color-contrast-checker";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubStats } from "@/components/github-stats";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Logo & title */}
            <div className="flex items-center space-x-3 overflow-hidden min-w-0">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Contrast Studio logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold truncate bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Contrast Studio
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                  WCAG 2.1 Compliance Checker
                </p>
              </div>
            </div>

            {/* GitHub stats + theme toggle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-end">
              <GitHubStats />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Perfect Color Contrast
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ensure your designs are accessible to everyone with our advanced
            color contrast analyzer.
          </p>
        </div>

        {/* Checker component */}
        <ColorContrastChecker />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
