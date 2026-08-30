"use client";

/**
 * AmbientBackground — the cinematic atmosphere layer.
 * Sits fixed behind all transparent sections: slow-drifting aurora orbs,
 * cinematic film grain, rising gold motes and a soft vignette.
 */

const ORBS = [
  {
    cls: "-left-[12%] -top-[14%] h-[52vw] w-[52vw] bg-gold/20",
    anim: "lf-drift-a 30s ease-in-out infinite",
  },
  {
    cls: "-right-[16%] top-[18%] h-[46vw] w-[46vw] bg-maroon/15",
    anim: "lf-drift-b 36s ease-in-out infinite",
  },
  {
    cls: "left-[16%] bottom-[-20%] h-[50vw] w-[50vw] bg-berry/10",
    anim: "lf-drift-c 32s ease-in-out infinite",
  },
  {
    cls: "right-[6%] bottom-[4%] h-[30vw] w-[30vw] bg-gold-light/15",
    anim: "lf-drift-b 26s ease-in-out infinite",
  },
  {
    cls: "left-[44%] top-[42%] h-[22vw] w-[22vw] bg-gold/10",
    anim: "lf-drift-a 24s ease-in-out infinite",
  },
];

const MOTES = Array.from({ length: 16 }, (_, i) => {
  const left = 4 + ((i * 6.1 + (i % 3) * 9) % 92);
  const size = 3 + (i % 4);
  return {
    left: `${left}%`,
    width: size,
    height: size,
    duration: `${9 + (i % 5) * 2.6}s`,
    delay: `${(i * 1.7) % 12}s`,
    opacity: 0.35 + (i % 3) * 0.18,
  };
});

export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* drifting aurora orbs */}
      {ORBS.map((o, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${o.cls}`}
          style={{ animation: o.anim }}
        />
      ))}

      {/* rising gold motes */}
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="gold-mote"
          style={{
            left: m.left,
            width: m.width,
            height: m.height,
            animationDuration: m.duration,
            animationDelay: m.delay,
            ["--mote-opacity" as string]: m.opacity,
          }}
        />
      ))}

      {/* cinematic grain */}
      <div className="lf-grain absolute inset-0 opacity-[0.05] mix-blend-multiply" />

      {/* soft vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_55%,rgba(66,12,22,0.06)_100%)]" />
    </div>
  );
}
