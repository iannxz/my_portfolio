import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useGlobalScrollPhase } from "@/hooks/useScrollPhase";
import OrbitalCore from "@/components/OrbitalCore";
import ProgressRail from "@/components/ProgressRail";
import Ch1Hero from "@/components/chapters/Ch1Hero";
import Ch2About from "@/components/chapters/Ch2About";
import Ch3Skills from "@/components/chapters/Ch3Skills";
import Ch4Projects from "@/components/chapters/Ch4Projects";
import Ch5Timeline from "@/components/chapters/Ch5Timeline";
import Ch6Security from "@/components/chapters/Ch6Security";
import Ch7Contact from "@/components/chapters/Ch7Contact";

const Index = () => {
  useLenis();
  useGlobalScrollPhase();

  useEffect(() => {
    document.title = "Iann Arthur Martaroli | Portfolio";
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute(
      "content",
      "Portf\u00f3lio profissional de Iann Arthur Martaroli, desenvolvedor com atua\u00e7\u00e3o em ciberseguran\u00e7a.",
    );
    document.head.appendChild(meta);
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      {/* Background layers */}
      <div className="fixed inset-0 z-0 grid-bg opacity-40 pointer-events-none" />
      <div className="fixed inset-0 z-0 noise opacity-[0.05] pointer-events-none mix-blend-overlay" />

      {/* Sticky orbital core */}
      <OrbitalCore />

      {/* Side rail */}
      <ProgressRail />

      {/* Top brand */}
      <header className="fixed left-6 top-6 z-40 text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:text-[10px] md:tracking-[0.4em]">
        IAM <span className="text-foreground/60">/</span> portfolio
      </header>

      {/* Chapters */}
      <div className="relative z-20">
        <Ch1Hero />
        <Ch2About />
        <Ch3Skills />
        <Ch4Projects />
        <Ch5Timeline />
        <Ch6Security />
        <Ch7Contact />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </main>
  );
};

export default Index;
