import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { phase } from "@/hooks/useScrollPhase";

const groups = [
  { title: "Desenvolvimento", items: ["HTML", "CSS", "JavaScript", "Python", "Streamlit", "React", "Claude Code", "TypeScript"] },
  { title: "Cibersegurança", items: ["Blue Team", "SOC", "EDR/XDR", "SOAR", "Firewall", "Hardening", "Análise de Vulnerabilidades"] },
  { title: "Cloud & Dados", items: ["Azure (AZ-900)", "AI-900", "SC-900", "Power BI", "MySQL", "Oracle APEX"] },
  { title: "Estudos & Labs", items: ["LLMs", "IoT (ESP32)", "Pentest", "Incident Response", "Malware Analysis", "CTFs"] },
];

export default function Ch3Skills() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => (phase.mode = "split"),
        onEnterBack: () => (phase.mode = "split"),
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-skill-card]");

      if (isMobile) {
        cards.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          });
        });

        return;
      }

      cards.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: ref.current,
              start: `top+=${i * 22}% top`,
              end: `top+=${i * 22 + 20}% top`,
              scrub: true,
            },
          },
        );
        gsap.to(el, {
          opacity: 0.25,
          scale: 0.94,
          scrollTrigger: {
            trigger: ref.current,
            start: `top+=${(i + 1) * 22}% top`,
            end: `top+=${(i + 1) * 22 + 25}% top`,
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={ref} id="skills" className="relative" style={isMobile ? undefined : { height: "260vh" }}>
      <div className={isMobile ? "py-24" : "sticky top-0 h-screen flex items-center overflow-hidden"}>
        <div className="container max-w-6xl">
          <div className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground mb-6 md:text-[10px] md:tracking-[0.4em]">
            Capítulo 03 · Sistema
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-medium mb-10 md:mb-16 max-w-2xl leading-tight">
            Skills como módulos<br/>de um mesmo sistema.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {groups.map((g, i) => (
              <div
                key={g.title}
                data-skill-card
                className="relative p-6 border border-border rounded-2xl bg-card/40 backdrop-blur-sm md:p-8"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="font-display text-2xl font-medium">{g.title}</h3>
                  <span className="text-[11px] tracking-[0.22em] text-muted-foreground md:text-[10px] md:tracking-[0.3em]">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="px-3 py-1.5 text-xs tracking-wide border border-border rounded-full text-foreground/80 bg-background/40"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
