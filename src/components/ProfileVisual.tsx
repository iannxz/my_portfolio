import { useState } from "react";

// =============================================================
// Para trocar a foto: substitua o arquivo em `public/profile.jpg`
// ou altere a constante abaixo apontando para outro caminho.
// =============================================================
export const profileImage = "/profile.jpg";
export const profileAlt = "Foto de Iann Arthur Martaroli";

interface ProfileVisualProps {
  variant?: "hero" | "about";
  className?: string;
}

export default function ProfileVisual({ variant = "hero", className = "" }: ProfileVisualProps) {
  const [errored, setErrored] = useState(false);

  const sizeClasses =
    variant === "hero"
      ? "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44"
      : "w-full aspect-[4/5] max-w-[320px]";

  const radius = variant === "hero" ? "rounded-full" : "rounded-3xl";

  return (
    <div className={`relative ${sizeClasses} ${className}`}>
      {/* orbital rings — integra com o core técnico */}
      {variant === "hero" && (
        <>
          <div className="absolute -inset-4 rounded-full border border-foreground/10 animate-[spin_28s_linear_infinite]" />
          <div className="absolute -inset-8 rounded-full border border-foreground/[0.06]" />
          <div className="absolute -inset-2 rounded-full bg-[var(--gradient-core)] blur-xl opacity-70" />
        </>
      )}
      {variant === "about" && (
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-foreground/15 via-transparent to-accent/20 blur-md opacity-70" />
      )}

      <div
        className={`relative ${radius} overflow-hidden border border-foreground/15 bg-card/60 backdrop-blur-sm w-full h-full shadow-[0_20px_60px_-20px_hsl(220_30%_0%/0.7)]`}
      >
        {!errored ? (
          <img
            src={profileImage}
            alt={profileAlt}
            onError={() => setErrored(true)}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-card to-background">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <span className="font-display text-3xl md:text-4xl tracking-[0.2em] text-foreground/80 relative">
              IAM
            </span>
          </div>
        )}
        {/* leve overlay para integrar com o fundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
