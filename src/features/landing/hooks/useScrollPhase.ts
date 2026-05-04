import { useEffect } from "react";

export type CoreMode = "core" | "side" | "split" | "link" | "line" | "panel" | "signature";

export interface PhaseState {
  mode: CoreMode;
  progress: number; // 0..1 within current chapter
  global: number; // 0..1 across page
  pointer: { x: number; y: number };
}

export const phase: PhaseState = {
  mode: "core",
  progress: 0,
  global: 0,
  pointer: { x: 0.5, y: 0.5 },
};

export function useGlobalScrollPhase() {
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      phase.global = h > 0 ? window.scrollY / h : 0;
    };
    const onPointer = (e: PointerEvent) => {
      phase.pointer.x = e.clientX / window.innerWidth;
      phase.pointer.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
}
