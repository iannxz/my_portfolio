import { useEffect, useRef } from "react";
import { phase } from "../hooks/useScrollPhase";

interface Node {
  baseAngle: number;
  baseRadius: number;
  speed: number;
  size: number;
  cluster: number;
  x: number;
  y: number;
}

const NODE_COUNT_DESKTOP = 56;
const NODE_COUNT_MOBILE = 28;

export default function OrbitalCore() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const NODE_COUNT = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
      baseAngle: (i / NODE_COUNT) * Math.PI * 2 + Math.random() * 0.4,
      baseRadius: 60 + Math.random() * 140,
      speed: 0.05 + Math.random() * 0.12,
      size: 1 + Math.random() * 1.6,
      cluster: i % 4,
      x: 0,
      y: 0,
    }));

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    // Eased mode anchors
    const targets = { cx: 0.5, cy: 0.5, scale: 1, spread: 0, lineMix: 0, sigMix: 0 };
    const cur = { ...targets };

    const draw = () => {
      t += 0.006;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const pointerX = phase.pointer.x - 0.5;
      const pointerY = phase.pointer.y - 0.5;
      const pointerInfluence = Math.min(Math.hypot(pointerX, pointerY) * 1.6, 1);

      // mode-driven targets
      switch (phase.mode) {
        case "core":
          targets.cx = 0.5; targets.cy = 0.5; targets.scale = 1; targets.spread = 0; targets.lineMix = 0; targets.sigMix = 0; break;
        case "side":
          targets.cx = isMobile ? 0.5 : 0.78; targets.cy = 0.5; targets.scale = 0.75; targets.spread = 0.1; targets.lineMix = 0; targets.sigMix = 0; break;
        case "split":
          targets.cx = 0.5; targets.cy = 0.5; targets.scale = 1.1; targets.spread = 1; targets.lineMix = 0; targets.sigMix = 0; break;
        case "link":
          targets.cx = 0.5; targets.cy = 0.5; targets.scale = 1.3; targets.spread = 0.4; targets.lineMix = 0.3; targets.sigMix = 0; break;
        case "line":
          targets.cx = 0.08; targets.cy = 0.5; targets.scale = 1; targets.spread = 0; targets.lineMix = 1; targets.sigMix = 0; break;
        case "panel":
          targets.cx = 0.5; targets.cy = 0.5; targets.scale = 0.9; targets.spread = 0.6; targets.lineMix = 0; targets.sigMix = 0.2; break;
        case "signature":
          targets.cx = 0.5; targets.cy = 0.5; targets.scale = 1.4; targets.spread = 0.2; targets.lineMix = 0; targets.sigMix = 1; break;
      }
      for (const k of Object.keys(targets) as (keyof typeof targets)[]) {
        cur[k] += (targets[k] - cur[k]) * 0.06;
      }

      ctx.clearRect(0, 0, W, H);

      const linePointerDamp = 1 - cur.lineMix * 0.9;
      const pointerShiftX = (isMobile ? 20 : 42) * pointerX * linePointerDamp;
      const pointerShiftY = (isMobile ? 16 : 34) * pointerY * linePointerDamp;
      const cx = W * cur.cx + pointerShiftX;
      const cy = H * cur.cy + pointerShiftY;
      const baseScale = Math.min(W, H) / 600;

      // Update node positions
      const clusterOffsets: [number, number][] = [
        [-1, -1], [1, -1], [-1, 1], [1, 1],
      ];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const angle = n.baseAngle + t * n.speed;
        const r = n.baseRadius * cur.scale * (1 + pointerInfluence * 0.06) * baseScale;
        const [ox, oy] = clusterOffsets[n.cluster];
        const spreadPx = 140 * (cur.spread + pointerInfluence * 0.08) * baseScale;
        let x = cx + Math.cos(angle) * r + ox * spreadPx;
        let y = cy + Math.sin(angle) * r * 0.85 + oy * spreadPx;

        const parallax =
          (isMobile ? 10 : 22) * (0.55 + n.baseRadius / 220) * baseScale * linePointerDamp;
        x += pointerX * parallax * Math.cos(n.baseAngle * 1.4 + n.cluster);
        y += pointerY * parallax * Math.sin(n.baseAngle * 1.2 + n.cluster);

        // Line mode: collapse to vertical line
        if (cur.lineMix > 0) {
          const lineMix = Math.min(1, cur.lineMix * 1.18);
          const lineProgress = nodes.length > 1 ? i / (nodes.length - 1) : 0.5;
          const lineX = cx;
          const lineY = H * 0.08 + lineProgress * H * 0.84;
          x = x * (1 - lineMix) + lineX * lineMix;
          y = y * (1 - lineMix) + lineY * lineMix;
        }

        // Signature: arrange in flowing sin curve
        if (cur.sigMix > 0) {
          const sx = cx + (i / nodes.length - 0.5) * W * 0.7;
          const sy = cy + Math.sin((i / nodes.length) * Math.PI * 4 + t) * 30 * baseScale;
          x = x * (1 - cur.sigMix) + sx * cur.sigMix;
          y = y * (1 - cur.sigMix) + sy * cur.sigMix;
        }

        n.x = x;
        n.y = y;
      }

      // Draw connections (proximity-based)
      ctx.lineWidth = 0.6;
      const maxDist = (110 + cur.lineMix * 36) * baseScale;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35;
            ctx.strokeStyle = `hsla(215, 60%, 70%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(40, 15%, 92%, 0.85)";
        ctx.fill();
      }

      // Soft core glow
      const grad = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        220 * cur.scale * (1 + pointerInfluence * 0.08) * baseScale,
      );
      grad.addColorStop(0, "hsla(215, 60%, 65%, 0.18)");
      grad.addColorStop(1, "hsla(215, 60%, 65%, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <canvas ref={ref} className="w-full h-full" />
    </div>
  );
}
