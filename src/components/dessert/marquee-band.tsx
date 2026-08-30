"use client";

import { MARQUEE_FLAVORS } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";

function Band({
  variant,
  rotate,
  duration,
}: {
  variant: "maroon" | "gold";
  rotate: string;
  duration: string;
}) {
  const items = [...MARQUEE_FLAVORS, ...MARQUEE_FLAVORS];
  return (
    <div className={cn("w-[110%] -ml-[5%]", rotate)}>
      <div
        className={cn(
          "overflow-hidden py-3.5 shadow-lg",
          variant === "maroon"
            ? "bg-maroon text-gold-light"
            : "bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-maroon-deep"
        )}
      >
        <div
          className="marquee-track items-center gap-0"
          style={{ ["--marquee-duration" as string]: duration }}
        >
          {items.map((f, i) => (
            <span
              key={`${f}-${i}`}
              className="flex items-center whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] sm:text-base"
            >
              <span className="px-5">{f}</span>
              <span
                aria-hidden
                className={cn(
                  "text-lg",
                  variant === "maroon" ? "text-gold" : "text-maroon-deep"
                )}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarqueeBands() {
  return (
    <section
      aria-label="Rolling dessert flavors"
      className="relative z-10 -my-4 overflow-hidden py-10"
    >
      <Band variant="maroon" rotate="-rotate-[1.4deg]" duration="38s" />
      <div className="-mt-7">
        <Band variant="gold" rotate="rotate-[1deg]" duration="46s" />
      </div>
    </section>
  );
}
