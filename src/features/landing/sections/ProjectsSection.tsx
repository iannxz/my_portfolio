import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { phase } from "../hooks/useScrollPhase";

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => (phase.mode = "link"),
        onEnterBack: () => (phase.mode = "link"),
        onUpdate: (self) => {
          const i = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
          setActive(i);
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projetos" ref={ref} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ${projects[active].tone}`} />
        <div className="container relative z-20 max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {"Cap\u00edtulo 04 \u00b7 Projetos"}
            </div>
            <div className="flex gap-1.5">
              {projects.map((_, i) => (
                <span
                  key={i}
                  className={`h-px w-8 transition-colors ${i === active ? "bg-foreground" : "bg-border"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative h-[60vh]">
            {projects.map((p, i) => (
              <article
                key={p.title}
                className={`absolute inset-0 grid items-center gap-8 transition-all duration-700 md:grid-cols-12 ${
                  i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
                }`}
              >
                <div className="font-display text-7xl leading-none text-foreground/15 md:col-span-2 md:text-9xl">
                  {p.n}
                </div>
                <div className="md:col-span-7">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-accent">{p.subtitle}</div>
                  <h3 className="mb-6 font-display text-3xl font-medium leading-tight md:text-5xl">
                    {p.title}
                  </h3>
                  <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {p.desc}
                  </p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm transition-colors hover:border-foreground"
                  >
                    {"Ver no GitHub"} <span>{"\u2192"}</span>
                  </a>
                </div>
                <div className="hidden md:col-span-3 md:block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/60 to-transparent backdrop-blur-sm">
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {p.title}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
