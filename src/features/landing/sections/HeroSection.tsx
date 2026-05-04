import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import ProfileVisual from "../components/ProfileVisual";
import { profile, socialLinks } from "../data/profile";
import { phase } from "../hooks/useScrollPhase";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-word]", {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.2,
      });
      gsap.from("[data-hero-line]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.7,
      });
      gsap.from("[data-hero-meta]", { opacity: 0, y: 12, duration: 0.8, delay: 1.1, stagger: 0.1 });
      gsap.from("[data-hero-photo]", {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.3,
      });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => (phase.mode = "core"),
        onEnterBack: () => (phase.mode = "core"),
        onUpdate: (self) => {
          gsap.set("[data-hero-content]", { opacity: 1 - self.progress * 1.2, y: -self.progress * 60 });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div data-hero-content className="relative z-20 text-center px-6 max-w-5xl">
        <div data-hero-meta className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-8">
          Portfólio · 2026
        </div>

        <div data-hero-photo className="flex justify-center mb-8">
          <ProfileVisual variant="hero" />
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-medium leading-[0.95] mb-6">
          {profile.name.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-3">
              <span data-hero-word className="inline-block">{w}</span>
            </span>
          ))}
        </h1>

        <p data-hero-line className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-6">
          Desenvolvedor · Cibersegurança
        </p>

        <p className="font-display text-lg md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
          <span data-hero-line className="block">Código que funciona.</span>
          <span data-hero-line className="block text-foreground">Segurança que faz sentido.</span>
        </p>

        <p data-hero-line className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Crio interfaces, sistemas e soluções digitais com foco em clareza,
          organização, performance e segurança aplicada.
        </p>

        <div data-hero-meta className="flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href="#projetos" variant="primary">Ver projetos</MagneticButton>
          <MagneticButton href={socialLinks.github}>GitHub</MagneticButton>
          <MagneticButton href="#contato">Contato</MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>Role para conhecer</span>
        <span className="block w-px h-10 bg-gradient-to-b from-foreground/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
