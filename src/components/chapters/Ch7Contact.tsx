import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import { phase } from "@/hooks/useScrollPhase";

export default function Ch7Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom bottom",
        onEnter: () => (phase.mode = "signature"),
        onEnterBack: () => (phase.mode = "signature"),
      });

      gsap.from("[data-contact-reveal]", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative overflow-hidden pt-12 pb-28 md:pt-20 md:pb-12"
    >
      <div className="container relative z-20 max-w-5xl">
        <div data-contact-reveal className="mb-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:text-[10px] md:tracking-[0.4em]">
          {"Cap\u00edtulo 07 \u00b7 Contato"}
        </div>
        <h2
          data-contact-reveal
          className="mb-8 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.05] md:text-6xl"
        >
          {"Quer conhecer melhor minha trajetória técnica? Vamos conversar."}
        </h2>
        <p
          data-contact-reveal
          className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {"Estou aberto a oportunidades, networking e conversas sobre "}
          {"desenvolvimento, tecnologia e seguran\u00e7a."}
        </p>

        <div data-contact-reveal className="flex flex-wrap gap-3 md:hidden">
          <MagneticButton href="https://www.linkedin.com/in/iannarthur/" variant="primary">
            {"LinkedIn"}
          </MagneticButton>
          <MagneticButton href="https://github.com/iannxz">
            {"GitHub"}
          </MagneticButton>
        </div>

        <div data-contact-reveal className="hidden flex-wrap gap-3 md:flex">
          <MagneticButton href="https://github.com/iannxz" variant="primary">
            {"GitHub"}
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/iannarthur/">
            {"LinkedIn"}
          </MagneticButton>
        </div>
      </div>

      <footer className="container relative z-20 mt-24 max-w-5xl border-t border-border pt-10 md:mt-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-2 font-display text-2xl">{"Iann Arthur Martaroli"}</div>
            <div className="text-sm text-muted-foreground">
              {"Desenvolvedor Front-End / Back-End \u00b7 Seguran\u00e7a aplicada"}
            </div>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/iannxz" className="transition-colors hover:text-foreground">
              {"GitHub"}
            </a>
            <a
              href="https://www.linkedin.com/in/iannarthur/"
              className="transition-colors hover:text-foreground"
            >
              {"LinkedIn"}
            </a>
          </div>
        </div>
        <div className="mt-10 text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:text-[10px] md:tracking-[0.3em]">
          {"\u00a9 2026 \u2014 Constru\u00eddo com c\u00f3digo, caf\u00e9 e cuidado."}
        </div>
      </footer>
    </section>
  );
}
