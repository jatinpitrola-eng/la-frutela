/**
 * Jank-proof smooth scrolling: time-based rAF animation with easeInOutCubic.
 * Unlike native scroll-behavior:smooth, the easing math is driven by elapsed
 * time — so even if frames drop while lazy images decode, the scroll always
 * lands exactly on target in a fixed, predictable duration.
 */
export function smoothScrollTo(id: string, duration = 950, offset = 78) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const start = performance.now();
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + (targetY - startY) * ease(p));
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      // keep the URL hash tidy without triggering a native jump
      window.history.replaceState(null, "", `#${id}`);
    }
  };
  requestAnimationFrame(step);
}
