"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PARADE_ITEMS } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";

function Row({
  reverse,
  duration,
}: {
  reverse?: boolean;
  duration: string;
}) {
  const items = [...PARADE_ITEMS, ...PARADE_ITEMS];
  return (
    <div className="fade-x marquee-pause overflow-hidden py-4">
      <div
        className={cn("marquee-track gap-6 pr-6 sm:gap-8 sm:pr-8", reverse && "marquee-reverse")}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {items.map((it, i) => (
          <figure
            key={`${it.name}-${i}`}
            className="group w-32 shrink-0 sm:w-40"
          >
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-full ring-4 transition-all duration-500 group-hover:scale-105 group-hover:ring-gold-light",
                i % 2 === 0
                  ? "ring-gold/60 shadow-[0_0_40px_-8px_rgba(217,164,65,0.55)]"
                  : "ring-cream/25 shadow-[0_0_40px_-8px_rgba(251,243,228,0.35)]"
              )}
            >
              <Image
                src={it.img}
                alt={it.name}
                fill
                sizes="(max-width: 640px) 128px, 160px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-maroon-deep/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <figcaption className="mt-3 text-center font-display text-sm font-bold tracking-wide text-cream/85 transition-colors group-hover:text-gold-light">
              {it.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function RollingShowcase() {
  return (
    <section
      id="parade"
      className="relative scroll-mt-20 overflow-hidden bg-maroon-deep py-20 lg:py-28"
      aria-label="The dessert parade"
    >
      <div className="bg-dots-gold pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[720px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl px-4 pb-8 text-center sm:px-6 lg:px-8"
      >
        <p className="font-display text-lg italic text-gold-light">
          Rolling in fresh, twice a day
        </p>
        <h2 className="mt-2 font-display text-3xl font-black text-cream sm:text-4xl lg:text-5xl">
          The <span className="text-gold-shimmer">Dessert Parade</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/65">
          Our signature creations, marching straight from our kitchen to your
          heart. Hover to make them pause for you — they love attention.
        </p>
        <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative mt-6 space-y-2"
      >
        <Row duration="58s" />
        <Row reverse duration="70s" />
      </motion.div>
    </section>
  );
}
