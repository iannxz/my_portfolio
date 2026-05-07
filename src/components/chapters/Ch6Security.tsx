import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phase } from "@/hooks/useScrollPhase";

const cards = [
  "Blue Team",
  "SOC",
  "EDR/XDR",
  "Firewall",
  "SOAR",
  "Hardening",
  "Análise de vulnerabilidades",
  "Malware Analyzer",
  "JWT Attacks and Detection",
  "Obfuscated JavaScript",
  "Python para Cibersegurança",
  "Segurança em Nuvem",
];

const certs = [
  { t: "JWT Attacks and Detection", e: "LetsDefend" },
  { t: "Obfuscated JavaScript", e: "LetsDefend" },
  { t: "Malware Analyzer", e: "LetsDefend" },
  { t: "Certified Phishing Prevention Specialist", e: "Hack & Fix" },
  { t: "Programação em Python para Cibersegurança", e: "SENAI" },
  { t: "Fundamentos de Segurança em Nuvem (SC-900)", e: "Microsoft" },
  { t: "Implantação de IA em Nuvem (AI-900)", e: "Microsoft" },
  { t: "Implementação de Serviços em Nuvem (AZ-900)", e: "Microsoft" },
  { t: "Python Essentials 1", e: "Cisco" },
  { t: "Introduction to Cybersecurity", e: "Cisco" },
  { t: "Computer Hardware Basics", e: "Cisco" },
  { t: "Introdução ao Hacking e Pentest 2.0", e: "Solyd Offensive Security" },
  { t: "Design UX/UI", e: "SENAI" },
  { t: "Banco de Dados para Data Science", e: "SENAI" },
  { t: "Soluções Integradas com IoT", e: "SENAI" },
  { t: "Aplicativos Low Code (Oracle APEX)", e: "Oracle" },
  { t: "Microsoft Power BI", e: "SENAI" },
  { t: "Ética na Inteligência Artificial", e: "SENAI" },
];

export default function Ch6Security() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => (phase.mode = "panel"),
        onEnterBack: () => (phase.mode = "panel"),
      });

      gsap.from("[data-panel]", {
        opacity: 0,
        y: 60,
        stagger: 0.06,
        ease: "power3.out",
        duration: 0.9,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.6,
        },
      });

      gsap.from("[data-cert]", {
        opacity: 0,
        x: -20,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-certs-grid]",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-14 md:pt-48 md:pb-20"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container max-w-6xl relative z-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
          Capítulo 06 · Segurança aplicada
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-medium mb-8 max-w-3xl leading-tight">
          Segurança como diferencial,<br/>não como acessório.
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
          Minha atuação em cibersegurança complementa minha visão como desenvolvedor.
          Além de criar aplicações que funcionam, busco entender riscos, vulnerabilidades,
          boas práticas e decisões técnicas que tornam sistemas mais confiáveis.
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-20 leading-relaxed">
          Tenho estudado Blue Team, SOC, EDR/XDR, análise de vulnerabilidades, phishing,
          malware analysis, JWT attacks, JavaScript ofuscado, segurança em nuvem e
          Python aplicado à cibersegurança.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border mb-24">
          {cards.map((c, i) => (
            <div
              key={c}
              data-panel
              className="relative p-6 bg-card/60 backdrop-blur-sm hover:bg-card transition-colors duration-500 group min-h-[120px] flex flex-col justify-between"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-base md:text-lg leading-snug">{c}</h3>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
          Certificações & cursos
        </div>
        <div data-certs-grid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {certs.map((c) => (
            <div
              key={c.t}
              data-cert
              className="flex items-baseline gap-3 py-3 border-b border-border/60"
            >
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-foreground/90">{c.t}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">{c.e}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-2xl">
          <div className="p-5 border border-border rounded-xl bg-card/40">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Idiomas</div>
            <div className="text-sm">Português — fluente / nativo</div>
            <div className="text-sm">Inglês — básico a intermediário</div>
          </div>
          <div className="p-5 border border-border rounded-xl bg-card/40">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Destaque</div>
            <div className="text-sm leading-relaxed">
              Selecionado em concurso de inglês Microsoft × SENAI Sumaré — bolsa concedida a apenas 20 estudantes da região.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
