"use client";

import { motion } from "framer-motion";
import { Heart, Instagram } from "lucide-react";
import Image from "next/image";
import { PARADE_ITEMS } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";

const CAPTIONS = [
  "Sundae o'clock ✦",
  "Fresh out the oven",
  "Gold flake everything",
  "Macaron Monday",
  "Mango season magic",
  "Behind the glass",
  "Churned at dawn",
  "The parade rolls on",
  "Berry much loved",
  "Friday shake club",
  "Slice of happiness",
  "Sweetest corner in town",
];

const HEARTS = ["1.2k", "864", "2.1k", "932", "1.5k", "774", "1.9k", "1.1k", "1.3k", "990", "1.7k", "820"];

const ITEMS = [...PARADE_ITEMS, ...PARADE_ITEMS];

export default function Moments() {
  return (
    <section
      id="moments"
      className="relative scroll-mt-20 overflow-hidden bg-maroon-deep py-20 lg:py-24"
      aria-label="Sweet moments gallery"
    >
      <div className="bg-dots-gold pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl px-4 pb-10 text-center sm:px-6 lg:px-8"
      >
        <p className="inline-flex items-center gap-2 font-display text-lg italic text-gold-light">
          <Instagram className="h-5 w-5" />
          @lafrutella.in
        </p>
        <h2 className="mt-2 font-display text-3xl font-black text-cream sm:text-4xl lg:text-5xl">
          Sweet <span className="text-gold-shimmer">Moments</span>, Daily
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-cream/60">
          Straight from the pass to your feed — the swirls, the drizzles and
          the joy they cause.
        </p>
      </motion.div>

      {/* rolling polaroid strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="fade-x marquee-pause relative overflow-hidden"
      >
        <div
          className="marquee-track gap-6 pr-6 sm:gap-8 sm:pr-8"
          style={{ ["--marquee-duration" as string]: "65s" }}
        >
          {ITEMS.map((it, i) => (
            <figure
              key={`${it.name}-${i}`}
              className={cn(
                "group w-44 shrink-0 rounded-2xl border border-gold/25 bg-maroon/50 p-3 pb-4 shadow-xl backdrop-blur-sm transition-transform duration-500 hover:scale-105 sm:w-52",
                i % 2 === 0 ? "rotate-[1.6deg]" : "-rotate-[1.6deg]"
              )}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-gold/30">
                <Image
                  src={it.img}
                  alt={it.name}
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between px-1">
                <span className="font-display text-xs font-bold text-cream/85 transition-colors group-hover:text-gold-light">
                  {CAPTIONS[i % CAPTIONS.length]}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-200/80">
                  <Heart className="h-3 w-3 fill-current" aria-hidden />
                  {HEARTS[i % HEARTS.length]}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </motion.div>

      {/* follow cta */}
      <div className="relative mt-10 text-center">
        <a
          href="#moments"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2.5 rounded-full border-2 border-gold/50 px-7 py-3 text-sm font-bold tracking-wide text-gold-light transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-maroon-deep"
        >
          <Instagram className="h-4.5 w-4.5" />
          Follow the sweetness
        </a>
      </div>
    </section>
  );
}
