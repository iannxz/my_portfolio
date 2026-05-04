import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileVisual from "@/components/ProfileVisual";
import { phase } from "@/hooks/useScrollPhase";

const lines = [
  "Estudante de Análise e Desenvolvimento de Sistemas e Técnico em Desenvolvimento de Sistemas.",
  "Atuação prática em cibersegurança no Grupo NC.",
  "Blue Team, EDR/XDR, SOAR, Firewall e hardening de endpoints.",
  "Desenvolvimento, lógica e visão de segurança em uma só base.",
];

const shortPhrases = [
  "Desenvolvimento com base sólida.",
  "Segurança aplicada na prática.",
  "Experiência em ambiente corporativo.",
  "Projetos reais, estudo contínuo, evolução técnica.",
];

export default function Ch2About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-about-line]");

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => (phase.mode = "side"),
        onEnterBack: () => (phase.mode = "side"),
      });

      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: `top+=${i * 12}% top`,
              end: `top+=${i * 12 + 10}% top`,
              scrub: true,
            },
          },
        );
      });

      // Parallax leve na foto + mask reveal
      gsap.fromTo(
        "[data-about-photo]",
        { y: 80, opacity: 0, clipPath: "inset(20% 0 20% 0 round 24px)" },
        {
          y: -40,
          opacity: 1,
          clipPath: "inset(0% 0 0% 0 round 24px)",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
                Capítulo 02 · Sobre
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-medium mb-10 leading-tight">
                Quem está<br/>por trás do código.
              </h2>
              <div className="space-y-5 max-w-xl mb-10">
                {lines.map((l, i) => (
                  <p
                    key={i}
                    data-about-line
                    className="text-lg md:text-xl text-foreground/90 leading-relaxed"
                  >
                    {l}
                  </p>
                ))}
              </div>
              <div className="space-y-2 max-w-xl border-l border-border pl-5">
                {shortPhrases.map((p, i) => (
                  <p
                    key={i}
                    data-about-line
                    className="text-sm tracking-wide text-accent/90"
                  >
                    — {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div data-about-photo>
                <ProfileVisual variant="about" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
