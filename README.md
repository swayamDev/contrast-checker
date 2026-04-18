# Contrast Studio

A **production-grade, WCAG 2.2 compliant** Color Contrast Checker built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.

![Contrast Studio](https://img.shields.io/badge/WCAG-2.2-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### Core
- **Real-time contrast ratio** calculation (WCAG 2.2 algorithm)
- **WCAG AA / AAA pass-fail** for normal text, large text, and UI components
- Foreground & background **color pickers** (native + hex/rgb/hsl text input)
- Instant feedback with no button clicks required

### Advanced
- **Color blindness simulation** — Protanopia, Deuteranopia, Tritanopia, Achromatopsia
- **Live text preview** with adjustable font size (10–48px) and weight
- **Three preview modes** — Text, UI Elements, Article layout
- **Tailwind CSS palette grid** — all 12 color families × 10 shades
- **Saved palettes** — bookmark up to 20 combinations (localStorage)
- **Copy HEX / RGB / HSL** with one click
- **Preset color pairs** — 8 curated accessible combinations
- **Random accessible pair** generator
- **Swap colors** with one click

### UX & Accessibility
- Instant keyboard navigation throughout
- Proper ARIA labels and roles on all interactive elements
- Screen-reader friendly with semantic HTML
- Focus states visible at all times
- Mobile-first responsive design

---

## 🏗️ Architecture

```
contrast-studio/
├── app/
│   ├── globals.css        # CSS variables + design tokens (Tailwind v4)
│   ├── layout.tsx         # Root layout + ThemeProvider
│   └── page.tsx           # Home page (Server Component)
├── components/
│   ├── contrast-checker.tsx    # Main orchestrator
│   ├── color-input.tsx         # Color swatch + text input + copy
│   ├── contrast-score.tsx      # Ratio display + WCAG table
│   ├── live-preview.tsx        # Text/UI/Article preview canvas
│   ├── color-blindness-panel.tsx # Simulation mode selector
│   ├── color-palette-grid.tsx  # Tailwind palette grid
│   ├── saved-palettes.tsx      # Bookmark + list saved pairs
│   ├── quick-actions.tsx       # Random, Swap, Presets
│   ├── header.tsx              # Sticky header
│   ├── footer.tsx              # Footer
│   ├── theme-provider.tsx      # next-themes wrapper
│   └── theme-toggle.tsx        # Light/dark toggle
├── hooks/
│   ├── use-contrast.ts    # Memoized contrast + simulation
│   └── use-copy.ts        # Clipboard copy with feedback
├── lib/
│   ├── color.ts           # All color math (WCAG, conversion, simulation)
│   └── utils.ts           # cn(), clipboard, helpers
├── store/
│   └── contrast-store.ts  # Zustand store (persisted)
└── types/
    └── index.ts           # Shared TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-handle/contrast-studio.git
cd contrast-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (CSS-first, no config file) |
| Animations | Framer Motion |
| State | Zustand with localStorage persistence |
| Theming | next-themes (system default) |
| Icons | Lucide React |
| Fonts | DM Sans + DM Mono (Google Fonts) |

---

## ☁️ Deployment (Vercel)

```bash
npm i -g vercel
vercel --prod
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) — zero configuration required.

### Environment Variables
None required. The app runs fully client-side for all interactive features.

---

## 🎨 Design System

The design uses CSS custom properties (`--variable`) defined in `globals.css` for both light and dark mode. Key tokens:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f8f8f6` | `#0f0f0e` |
| `--surface` | `#ffffff` | `#1c1c1a` |
| `--primary` | `#3B5BFF` | `#5b7bff` |
| `--text-primary` | `#1a1917` | `#f0efe9` |
| `--success` | `#16a34a` | `#22c55e` |
| `--danger` | `#dc2626` | `#ef4444` |

---

## 📐 WCAG 2.2 Reference

| Level | Normal Text | Large Text | UI Components |
|---|---|---|---|
| AA | 4.5:1 | 3:1 | 3:1 |
| AAA | 7:1 | 4.5:1 | — |

Large text = 18pt+ regular, or 14pt+ bold.

---

## 📄 License

MIT — free to use, modify, and distribute.
