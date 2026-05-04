import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { milestones } from "../data/timeline";
import { phase } from "../hooks/useScrollPhase";

export default function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => (phase.mode = "line"),
        onEnterBack: () => (phase.mode = "line"),
      });

      gsap.to("[data-timeline-line]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      const items = gsap.utils.toArray<HTMLElement>("[data-milestone]");
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      items.forEach((el, i) => {
        revealTimeline.fromTo(
          el,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, ease: "none", duration: 1 },
          i,
        );
      });
    }, ref);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-0"
      style={isMobile ? undefined : { minHeight: `${milestones.length * 72}vh` }}
    >
      <div className={isMobile ? "" : "sticky top-0 flex min-h-screen items-center"}>
        <div className="container max-w-5xl py-4 md:py-10">
          <div className="mb-12 md:mb-14">
            <div className="mb-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {"Cap\u00edtulo 05 \u00b7 Trajet\u00f3ria"}
            </div>
            <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight md:text-5xl">
              {"Uma linha que se desenha"}
              <br />
              {"conforme o tempo avan\u00e7a."}
            </h2>
          </div>

          <div className="relative mx-auto max-w-3xl pl-8 md:pl-16">
            <div className="pointer-events-none absolute inset-y-0 left-[9px] w-px bg-border md:left-[25px]" />
            <div
              data-timeline-line
              className="pointer-events-none absolute inset-y-0 left-[9px] w-px origin-top bg-foreground md:left-[25px]"
              style={{ transform: "scaleY(0)" }}
            />
            <div className="space-y-6 pb-2 pr-2 md:space-y-7">
              {milestones.map((m, i) => (
                <div key={i} data-milestone className="relative">
                  <span className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-foreground md:-left-[43px]" />
                  <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-accent">{m.year}</div>
                  <div className="mb-1 font-display text-xl md:text-2xl">{m.title}</div>
                  <div className="max-w-xl text-sm text-muted-foreground">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
