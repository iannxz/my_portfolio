import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phase } from "@/hooks/useScrollPhase";

const projects = [
  {
    n: "01",
    title: "Cyberbot",
    subtitle: "Assistente Virtual de Ciberseguran\u00e7a",
    desc: "Prot\u00f3tipo full-stack desenvolvido em equipe usando Python, Streamlit e modelos de linguagem. Foco em apoio a tarefas e estudos de ciberseguran\u00e7a, explorando automa\u00e7\u00e3o, an\u00e1lise e intera\u00e7\u00e3o com LLMs.",
    tags: ["Python", "Streamlit", "LLM", "Cybersecurity", "Full-Stack"],
    github: "https://github.com/iannxz",
    image: "/projects/ch4-cyberbot.jpg",
    tone: "from-[hsl(215_60%_20%/0.45)] to-transparent",
  },
  {
    n: "02",
    title: "Esp32 Phishing",
    subtitle: "Lab de seguran\u00e7a com ESP32",
    desc: "Projeto laboratorial com ESP32 voltado ao estudo de conceitos de seguran\u00e7a, redes e comportamento de dispositivos em ambientes controlados.",
    tags: ["ESP32", "Cybersecurity", "Redes", "Laborat\u00f3rio"],
    github: "https://github.com/iannxz/esp32-phishing",
    image: "/projects/ch4-esp32-phishing.jpg",
    tone: "from-[hsl(260_30%_22%/0.45)] to-transparent",
  },
  {
    n: "03",
    title: "Esp32 Beacon Spam",
    subtitle: "Estudo de redes wireless",
    desc: "Experimento t\u00e9cnico com ESP32 para estudo de redes wireless, sinais e comportamento de broadcast em contexto educacional.",
    tags: ["ESP32", "Wireless", "Redes", "Seguran\u00e7a"],
    github: "https://github.com/iannxz/esp32-beacon-spam",
    image: "/projects/ch4-esp32-beacon.jpg",
    tone: "from-[hsl(200_40%_20%/0.4)] to-transparent",
  },
  {
    n: "04",
    title: "Landing Page Ciberseguran\u00e7a",
    subtitle: "Front-end com tem\u00e1tica de ciberseguran\u00e7a",
    desc: "Landing page com tem\u00e1tica de ciberseguran\u00e7a, criada para praticar estrutura visual, comunica\u00e7\u00e3o e desenvolvimento front-end.",
    tags: ["Front-end", "Landing Page", "Cybersecurity", "UI"],
    github: "https://github.com/iannxz/landing_page_cyber1",
    image: "/projects/ch4-landing-cyber.jpg",
    tone: "from-[hsl(220_15%_18%/0.55)] to-transparent",
  },
  {
    n: "05",
    title: "Landing Page Feliz Natal",
    subtitle: "Front-end com temática de natal",
    desc: "Projeto visual e interativo criado para praticar criatividade, interface e experi\u00eancia de usu\u00e1rio.",
    tags: ["Front-end", "UI", "Criatividade", "Intera\u00e7\u00e3o"],
    github: "https://github.com/iannxz/feliz-natal",
    image: "/projects/ch4-feliz-natal.jpg",
    tone: "from-[hsl(180_30%_18%/0.4)] to-transparent",
  },
];

export default function Ch4Projects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});

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

  const renderProjectVisual = (project: (typeof projects)[number]) => {
    if (!project.image) {
      return <div className="absolute inset-0 grid-bg opacity-40" />;
    }

    const showImage = !missingImages[project.title];

    if (showImage) {
      return (
        <>
          <img
            src={project.image}
            alt={`Preview do projeto ${project.title}`}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() =>
              setMissingImages((current) =>
                current[project.title] ? current : { ...current, [project.title]: true },
              )
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </>
      );
    }

    return (
      <>
        <div className="absolute inset-0 grid-bg opacity-40" />
      </>
    );
  };

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
                    {renderProjectVisual(p)}
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
