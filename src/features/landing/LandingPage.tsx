import { useEffect } from "react";
import BrandHeader from "./components/BrandHeader";
import OrbitalCore from "./components/OrbitalCore";
import ProgressRail from "./components/ProgressRail";
import { landingMeta } from "./data/profile";
import { useLenis } from "./hooks/useLenis";
import { useGlobalScrollPhase } from "./hooks/useScrollPhase";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import SecuritySection from "./sections/SecuritySection";
import SkillsSection from "./sections/SkillsSection";
import TimelineSection from "./sections/TimelineSection";

const LandingPage = () => {
  useLenis();
  useGlobalScrollPhase();

  useEffect(() => {
    document.title = landingMeta.title;
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", landingMeta.description);
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
      <BrandHeader />

      {/* Chapters */}
      <div className="relative z-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <SecuritySection />
        <ContactSection />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </main>
  );
};

export default LandingPage;
