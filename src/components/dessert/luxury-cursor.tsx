"use client";

import { useEffect, useRef } from "react";

/**
 * LuxuryCursor — a soft golden aura + trailing ring + precise dot that
 * follow the mouse (desktop pointers only). The native cursor stays
 * visible for usability; this is a purely decorative accent.
 */
export default function LuxuryCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!layer || !glow || !ring || !dot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glowPos = { ...target };
    const ringPos = { ...target };
    let ringScale = 1;
    let targetScale = 1;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        layer.style.opacity = "1";
      }
      const el = e.target as HTMLElement | null;
      targetScale = el?.closest("a,button,[role='button'],input,textarea,select,label,[data-luxury-hover]")
        ? 1.7
        : 1;
    };

    const onLeave = () => {
      shown = false;
      layer.style.opacity = "0";
    };

    const tick = () => {
      glowPos.x += (target.x - glowPos.x) * 0.06;
      glowPos.y += (target.y - glowPos.y) * 0.06;
      ringPos.x += (target.x - ringPos.x) * 0.22;
      ringPos.y += (target.y - ringPos.y) * 0.22;
      ringScale += (targetScale - ringScale) * 0.16;

      glow.style.transform = `translate3d(${glowPos.x - 140}px, ${glowPos.y - 140}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x - 17}px, ${ringPos.y - 17}px, 0) scale(${ringScale.toFixed(3)})`;
      dot.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="lf-cursor-layer pointer-events-none fixed inset-0 z-[65] opacity-0 transition-opacity duration-500"
    >
      {/* golden aura */}
      <div
        ref={glowRef}
        className="absolute h-[280px] w-[280px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(217,164,65,0.16) 0%, rgba(217,164,65,0.07) 40%, transparent 70%)",
        }}
      />
      {/* trailing ring */}
      <div
        ref={ringRef}
        className="absolute h-[34px] w-[34px] rounded-full border border-gold/60 will-change-transform"
        style={{ boxShadow: "0 0 14px rgba(217,164,65,0.35)" }}
      />
      {/* precise dot */}
      <span
        ref={dotRef}
        className="absolute block h-1.5 w-1.5 rounded-full bg-maroon will-change-transform"
      />
    </div>
  );
}
