import { useEffect, useState } from "react";

const chapters = ["Hero", "Sobre", "Skills", "Projetos", "Trajetória", "Segurança", "Contato"];

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
            key={c}
            className={`transition-colors ${i === active ? "text-foreground" : ""}`}
          >
            {String(i + 1).padStart(2, "0")} · {c}
          </span>
        ))}
      </div>
    </div>
  );
}
