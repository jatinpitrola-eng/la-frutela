"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import {
  DESSERTS,
  PAIRS,
  PAIR_DISCOUNT,
  formatINR,
} from "@/lib/dessert-data";
import GhostWord from "./ghost-word";

/**
 * PerfectPairs — chef-curated dessert duets.
 * Two menu legends bundled on one tray, always ₹50 kinder
 * than ordering them apart.
 */
export default function PerfectPairs() {
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const addPair = (pairId: string) => {
    const p = PAIRS.find((x) => x.id === pairId)!;
    const a = DESSERTS.find((d) => d.id === p.a)!;
    const b = DESSERTS.find((d) => d.id === p.b)!;
    const bundle = a.price + b.price - PAIR_DISCOUNT;

    addItem({
      id: p.id,
      name: `${p.name} — Duet (${a.name.split(" ").slice(0, 2).join(" ")} + ${b.name.split(" ").slice(0, 2).join(" ")})`,
      img: a.img,
      unit: bundle,
      qty: 1,
      addons: [],
    });
    toast({
      title: "Duet added to your tray 🎼",
      description: `${p.name} · ${a.name} + ${b.name} — saved ${formatINR(PAIR_DISCOUNT)}`,
    });
  };

  return (
    <section
      id="pairs"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      aria-label="Perfect dessert pairs"
    >
      <GhostWord word="PAIRINGS" tone="maroon" drift={70} />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

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
            🎼 Chef&apos;s Duets
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-maroon-deep sm:text-4xl lg:text-5xl">
            Perfect <span className="text-gold-shimmer">Pairs</span>, Curated
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-choco/65">
            Two legends, one tray — and always{" "}
            <span className="font-bold text-maroon">{formatINR(PAIR_DISCOUNT)}</span>{" "}
            kinder than ordering them apart.
          </p>
        </motion.div>

        {/* pair cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PAIRS.map((p, i) => {
            const a = DESSERTS.find((d) => d.id === p.a)!;
            const b = DESSERTS.find((d) => d.id === p.b)!;
            const bundle = a.price + b.price - PAIR_DISCOUNT;

            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="shine-sweep flex flex-col rounded-[2rem] border border-gold/30 bg-white/80 p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-2xl hover:shadow-maroon/15"
              >
                {/* duet visuals */}
                <div className="flex items-center justify-center pt-1">
                  <span className="relative z-10 block h-20 w-20 overflow-hidden rounded-full shadow-lg ring-4 ring-gold/50">
                    <Image src={a.img} alt={a.name} fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="z-20 -ml-3 grid h-8 w-8 place-items-center rounded-full bg-maroon text-xs font-black text-gold-light shadow-md">
                    ✕
                  </span>
                  <span className="relative -ml-3 mt-6 block h-20 w-20 rotate-6 overflow-hidden rounded-full shadow-lg ring-4 ring-berry/40">
                    <Image src={b.img} alt={b.name} fill sizes="80px" className="object-cover" />
                  </span>
                </div>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-choco/50">
                  {a.name} ✕ {b.name}
                </p>
                <h3 className="mt-1 font-display text-xl font-black text-maroon-deep">
                  {p.name}
                </h3>
                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-choco/65">
                  {p.note}
                </p>

                <div className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-sm text-choco/40 line-through">
                    {formatINR(a.price + b.price)}
                  </span>
                  <span className="text-xl font-black text-maroon">
                    {formatINR(bundle)}
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-green-700">
                    Save {formatINR(PAIR_DISCOUNT)}
                  </span>
                </div>

                <button
                  onClick={() => addPair(p.id)}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-maroon text-sm font-bold text-cream shadow-lg shadow-maroon/25 transition-all hover:-translate-y-0.5 hover:bg-maroon-dark"
                >
                  <Plus className="h-4 w-4" />
                  Add the Pair
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
