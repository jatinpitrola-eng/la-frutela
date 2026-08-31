"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import {
  DESSERTS,
  SEASONS,
  formatINR,
  seasonForMonth,
} from "@/lib/dessert-data";
import { cn } from "@/lib/utils";
import GhostWord from "./ghost-word";

/**
 * SeasonCalendar — the fruit season wheel. Four season cards,
 * the current one highlighted "In season now", each linked to
 * the dessert it powers on the menu.
 */
export default function SeasonCalendar() {
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const current = seasonForMonth(new Date().getMonth());
  const [sel, setSel] = useState(current);

  const season = SEASONS[sel];
  const dessert = DESSERTS.find((d) => d.id === season.dessertId)!;

  const add = () => {
    addItem({ id: dessert.id, name: dessert.name, img: dessert.img, unit: dessert.price, qty: 1, addons: [] });
    toast({
      title: "Season star reserved ✦",
      description: `1 × ${dessert.name} — ${formatINR(dessert.price)}`,
    });
  };

  return (
    <section
      id="seasons"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Fruit season calendar"
    >
      <GhostWord word="SEASONS" tone="gold" drift={80} />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-berry/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-maroon shadow-sm">
            <CalendarDays className="h-4 w-4 text-gold-dark" />
            The Fruit Calendar
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-maroon-deep sm:text-4xl lg:text-5xl">
            We churn what <span className="text-gold-shimmer">nature ripens</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-choco/65">
            No frozen pulp, no shortcuts. The menu follows the mandi — here is
            exactly what the season is pouring into our kitchen right now.
          </p>
        </motion.div>

        {/* season cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SEASONS.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setSel(i)}
              aria-pressed={sel === i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className={cn(
                "relative rounded-[2rem] border-2 p-6 text-left transition-all duration-300",
                sel === i
                  ? "-translate-y-1.5 border-gold bg-white shadow-2xl shadow-gold/25"
                  : "border-gold/25 bg-white/60 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl"
              )}
            >
              {i === current && (
                <span className="absolute -top-3 right-4 rounded-full bg-maroon px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-gold-light shadow-lg shadow-maroon/30">
                  In season now ✦
                </span>
              )}
              <span
                className={cn(
                  "grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-sm ring-1 transition-colors",
                  sel === i ? "bg-gold/20 ring-gold/50" : "bg-cream ring-gold/20"
                )}
              >
                {s.emoji}
              </span>
              <h3 className="mt-4 font-display text-xl font-black text-maroon-deep">
                {s.name}
              </h3>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gold-dark">
                {s.months}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-choco/70">
                {s.fruits.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        {/* season detail panel */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid items-center gap-6 rounded-[2rem] border border-gold/30 bg-white/80 p-6 shadow-lg shadow-maroon/5 sm:p-8 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="font-display text-xl font-bold italic leading-relaxed text-maroon-deep/85 sm:text-2xl">
                  “{season.note}”
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-md ring-2 ring-gold">
                    <Image
                      src={dessert.img}
                      alt={dessert.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark">
                      Season star
                    </p>
                    <p className="truncate font-display text-lg font-black text-maroon-deep">
                      {dessert.name}
                    </p>
                    <p className="text-sm font-bold text-choco/60">
                      {formatINR(dessert.price)} · ★ {dessert.rating}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={add}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-maroon px-8 font-bold text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-1 hover:bg-maroon-dark"
              >
                <Plus className="h-5 w-5" />
                Taste the Season
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
