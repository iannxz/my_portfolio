import { brand } from "../data/profile";

export default function BrandHeader() {
  return (
    <header className="fixed left-6 top-6 z-40 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
      {brand.initials} <span className="text-foreground/60">/</span> {brand.context}
    </header>
  );
}
