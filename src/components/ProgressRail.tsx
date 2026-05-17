import { useEffect, useState } from "react";

const chapters = [
  { desktop: "Hero", short: "Início", href: "#inicio" },
  { desktop: "Sobre", short: "Sobre", href: "#sobre" },
  { desktop: "Skills", short: "Skills", href: "#skills" },
  { desktop: "Projetos", short: "Projetos", href: "#projetos" },
  { desktop: "Trajetória", short: "Trajeto", href: "#trajetoria" },
  { desktop: "Segurança", short: "Seg.", href: "#seguranca" },
  { desktop: "Contato", short: "Contato", href: "#contato" },
];

export default function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setProgress(p);
      setActive(Math.min(chapters.length - 1, Math.floor(p * chapters.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3">
        <div className="relative w-px h-48 bg-border overflow-hidden">
          <div
            className="absolute top-0 left-0 w-px bg-foreground transition-[height] duration-150"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <div className="flex flex-col gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {chapters.map((c, i) => (
            <span
              key={c.desktop}
              className={`transition-colors ${i === active ? "text-foreground" : ""}`}
            >
              {String(i + 1).padStart(2, "0")} · {c.desktop}
            </span>
          ))}
        </div>
      </div>

      <nav
        aria-label="Navegação por seções"
        className="fixed inset-x-3 bottom-3 z-50 md:hidden"
      >
        <div className="flex gap-2 overflow-x-auto rounded-full border border-border bg-background/88 px-2 py-2 shadow-[0_18px_50px_-24px_hsl(220_30%_0%/0.9)] backdrop-blur-md">
          {chapters.map((c, i) => (
            <a
              key={c.href}
              href={c.href}
              aria-current={i === active ? "true" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                i === active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.short}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
