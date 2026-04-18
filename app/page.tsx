import { ContrastChecker } from "@/components/contrast-checker";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero text */}
        <div className="text-center mb-10 sm:mb-14 animate-slide-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{
              background: "var(--primary-light)",
              color: "var(--primary)",
              borderColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            Free · Real-time · WCAG 2.2
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Color Contrast{" "}
            <span className="gradient-text">Checker</span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Test foreground and background color combinations against WCAG 2.2 AA and AAA standards — instantly, with color blindness simulation.
          </p>
        </div>

        <ContrastChecker />
      </main>

      <Footer />
    </div>
  );
}
