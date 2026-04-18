export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white text-xs font-black"
            style={{ background: "var(--accent-gradient)" }}
          >
            C
          </div>
          <span className="text-sm font-semibold gradient-text">ContrastStudio</span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Built for designers and developers who care about accessibility.
          WCAG 2.2 · Free · Open Source
        </p>
        <div className="flex gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
          <span>AA: 4.5:1</span>
          <span>·</span>
          <span>AAA: 7:1</span>
          <span>·</span>
          <span>Large: 3:1</span>
        </div>
      </div>
    </footer>
  );
}
