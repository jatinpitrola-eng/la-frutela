"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { LIVE_FEED } from "@/lib/dessert-data";

/**
 * LiveTicker — "Happening in the parlour" social-proof strip.
 * Crossfades through a feed of recent orders & enquiries.
 */
export default function LiveTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % LIVE_FEED.length),
      3600
    );
    return () => clearInterval(t);
  }, []);

  const entry = LIVE_FEED[idx];

  return (
    <section
      aria-label="Live activity from the parlour"
      className="relative z-10 overflow-hidden bg-maroon-deep text-cream"
    >
      {/* subtle texture + gold edges */}
      <div aria-hidden className="absolute inset-0 bg-dots-gold opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* live badge */}
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.22em] text-gold-light sm:text-xs">
            Live · The Parlour
          </span>
        </div>

        {/* crossfading feed */}
        <div className="relative h-6 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-x-0 truncate text-center text-xs font-medium text-cream/85 sm:text-sm"
            >
              <span className="mr-1.5">{entry.emoji}</span>
              <span className="font-bold text-gold-light">{entry.who}</span>
              <span className="mx-1.5 text-gold/60">✦</span>
              {entry.what}
              <span className="ml-2 hidden text-cream/45 sm:inline">
                · {entry.mins} min ago
              </span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* month stat */}
        <div className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-cream/60 md:flex">
          <Heart className="h-3.5 w-3.5 fill-berry text-berry" />
          6,214 orders this month
        </div>
      </div>
    </section>
  );
}
