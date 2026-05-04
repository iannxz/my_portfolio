import { useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function MagneticButton({ children, href, onClick, variant = "ghost", className }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const styles = cn(
    "group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300",
    "border rounded-full backdrop-blur-sm will-change-transform",
    variant === "primary"
      ? "bg-foreground text-background border-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground"
      : "bg-background/30 text-foreground border-border hover:border-foreground/60",
    className,
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );

  if (href) {
    const setAnchorRef = (node: HTMLAnchorElement | null) => {
      ref.current = node;
    };

    return (
      <a
        ref={setAnchorRef}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={styles}
      >
        {content}
      </a>
    );
  }
  const setButtonRef = (node: HTMLButtonElement | null) => {
    ref.current = node;
  };

  return (
    <button ref={setButtonRef} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className={styles}>
      {content}
    </button>
  );
}
