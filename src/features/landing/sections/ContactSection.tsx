import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import { profile, socialLinks } from "../data/profile";
import { phase } from "../hooks/useScrollPhase";

export default function ContactSection() {
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
      className="relative overflow-hidden pt-12 pb-10 md:pt-20 md:pb-12"
    >
      <div className="container relative z-20 max-w-5xl">
        <div data-contact-reveal className="mb-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          {"Cap\u00edtulo 07 \u00b7 Contato"}
        </div>
        <h2
          data-contact-reveal
          className="mb-8 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.05] md:text-6xl"
        >
          {"Vamos construir algo funcional, seguro e bem feito?"}
        </h2>
        <p
          data-contact-reveal
          className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {"Estou aberto a oportunidades, projetos, networking e conversas sobre "}
          {"desenvolvimento, tecnologia e seguran\u00e7a."}
        </p>

        <div data-contact-reveal className="flex flex-wrap gap-3">
          <MagneticButton href={socialLinks.github} variant="primary">
            {"GitHub"}
          </MagneticButton>
          <MagneticButton href={socialLinks.linkedin}>
            {"LinkedIn"}
          </MagneticButton>
        </div>
      </div>

      <footer className="container relative z-20 mt-24 max-w-5xl border-t border-border pt-10 md:mt-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-2 font-display text-2xl">{profile.name}</div>
            <div className="text-sm text-muted-foreground">
              {profile.role}
            </div>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href={socialLinks.github} className="transition-colors hover:text-foreground">
              {"GitHub"}
            </a>
            <a
              href={socialLinks.linkedin}
              className="transition-colors hover:text-foreground"
            >
              {"LinkedIn"}
            </a>
          </div>
        </div>
        <div className="mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {"\u00a9 2026 \u2014 Constru\u00eddo com c\u00f3digo, caf\u00e9 e cuidado."}
        </div>
      </footer>
    </section>
  );
}
