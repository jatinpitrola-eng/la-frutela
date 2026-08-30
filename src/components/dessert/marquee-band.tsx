"use client";

import Image from "next/image";
import { MARQUEE_FLAVORS, PARADE_ITEMS } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";

function Band({
  variant,
  rotate,
  tiltX,
  duration,
}: {
  variant: "maroon" | "gold";
  rotate: string;
  tiltX: string;
  duration: string;
}) {
  const items = [...MARQUEE_FLAVORS, ...MARQUEE_FLAVORS];
  return (
    <div className="-ml-[5%] w-[110%]" style={{ transform: `perspective(1100px) ${tiltX} ${rotate}` }}>
      <div
        className={cn(
          "overflow-hidden border-y py-3.5 shadow-2xl backdrop-blur-[1px]",
          variant === "maroon"
            ? "border-gold/40 bg-maroon text-gold-light shadow-maroon/40"
            : "border-maroon/30 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-maroon-deep shadow-gold/30"
        )}
      >
        <div
          className="marquee-track items-center gap-0"
          style={{ ["--marquee-duration" as string]: duration }}
        >
          {items.map((f, i) => {
            const treat = PARADE_ITEMS[i % PARADE_ITEMS.length];
            return (
              <span
                key={`${f}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] sm:text-base"
              >
                <span className="px-5">{f}</span>
                <Image
                  src={treat.img}
                  alt=""
                  aria-hidden
                  width={72}
                  height={72}
                  className={cn(
                    "h-7 w-7 rounded-full object-cover ring-2",
                    variant === "maroon" ? "ring-gold/60" : "ring-maroon/40"
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "px-4 text-lg",
                    variant === "maroon" ? "text-gold" : "text-maroon-deep"
                  )}
                >
                  ✦
                </span>
              </span>
            );
          })}
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
      <Band variant="maroon" tiltX="rotateX(12deg)" rotate="rotate(-1.4deg)" duration="38s" />
      <div className="-mt-7">
        <Band variant="gold" tiltX="rotateX(-9deg)" rotate="rotate(1deg)" duration="46s" />
      </div>
    </section>
  );
}
