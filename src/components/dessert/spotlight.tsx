"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { DESSERTS, formatINR } from "@/lib/dessert-data";
import GhostWord from "./ghost-word";

const NOTES = ["Alphonso Mango", "Kesar Saffron", "24k Gold Flake", "Vanilla Cream"];

export default function Spotlight() {
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const star = DESSERTS.find((d) => d.id === "mango-tango")!;
  const { id, name, price, img, rating, reviews, longDesc } = star;

  const add = () => {
    addItem({ id, name, img, unit: price, qty: 1, addons: [] });
    toast({
      title: "Dessert of the Month reserved 🥭",
      description: `1 × ${name} — ${formatINR(price)}`,
    });
  };

  return (
    <section
      id="spotlight"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Dessert of the month"
    >
      <GhostWord word="LIMITED" tone="maroon" drift={85} />
      <div className="pointer-events-none absolute -left-28 top-1/3 h-80 w-80 rounded-full bg-berry/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            className="absolute -inset-3 rotate-2 rounded-[2.5rem] border-2 border-gold/50"
            aria-hidden
          />
          <div className="animate-float relative aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl shadow-maroon/25 ring-8 ring-cream">
            <Image
              src={img}
              alt={`${name} — dessert of the month`}
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/25 to-transparent" />
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.35 }}
            className="absolute -right-3 -top-4 rounded-full bg-maroon px-5 py-2.5 text-center shadow-xl shadow-maroon/40 sm:-right-6"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gold-light">
              Dessert of the
            </p>
            <p className="font-display text-sm font-black text-cream">Month ✦</p>
          </motion.div>
        </motion.div>

        {/* copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-maroon shadow-sm">
            <CalendarHeart className="h-4 w-4 text-gold-dark" />
            Limited · Mango Season Only
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-maroon-deep sm:text-4xl lg:text-5xl">
            This Month&apos;s <span className="text-gold-shimmer">Obsession</span>
          </h2>
          <p className="mt-2 font-display text-2xl font-bold italic text-gold-dark">
            {name}
          </p>
          <p className="mt-4 leading-relaxed text-choco/70">{longDesc}</p>

          {/* flavor notes */}
          <div className="mt-5 flex flex-wrap gap-2">
            {NOTES.map((n) => (
              <span
                key={n}
                className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-bold text-maroon"
              >
                ✦ {n}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="flex text-gold-dark" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="font-bold text-maroon">{rating}</span>
            <span className="text-choco/55">· {reviews.toLocaleString("en-IN")} reviews this season</span>
          </div>

          <div className="mt-7 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
            <button
              onClick={add}
              className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-maroon px-8 text-base font-bold tracking-wide text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-1 hover:bg-maroon-dark hover:shadow-2xl"
            >
              <Plus className="h-5 w-5" />
              Reserve Yours · {formatINR(price)}
            </button>
            <p className="text-center text-xs font-semibold text-choco/55 sm:text-left">
              Until Alphonso season ends —<br className="hidden sm:block" /> then it&apos;s gone for a year.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
