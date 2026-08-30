"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Plus, Star } from "lucide-react";
import Image from "next/image";
import {
  CATEGORIES,
  DESSERTS,
  formatINR,
  type CategoryId,
  type Dessert,
} from "@/lib/dessert-data";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import DessertModal from "./dessert-modal";

const TAG_STYLES: Record<string, string> = {
  Bestseller: "bg-maroon text-gold-light",
  New: "bg-green-700 text-cream",
  "Chef's Special": "bg-gold text-maroon-deep",
  Seasonal: "bg-berry text-cream",
};

export default function Menu({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (c: CategoryId) => void;
}) {
  const [selected, setSelected] = useState<Dessert | null>(null);
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const items = useMemo(
    () => DESSERTS.filter((d) => d.category === active),
    [active]
  );

  const quickAdd = (d: Dessert) => {
    addItem({ id: d.id, name: d.name, img: d.img, unit: d.price, qty: 1, addons: [] });
    toast({
      title: "Added to your dessert box 🎁",
      description: `1 × ${d.name} — ${formatINR(d.price)}`,
    });
  };

  return (
    <section
      id="menu"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-cream via-cream-dark/40 to-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Dessert menu"
    >
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-display text-lg italic text-gold-dark">
            Freshly churned, baked & blended
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-maroon-deep sm:text-4xl lg:text-5xl">
            The Dessert Menu
          </h2>
          <p className="mt-4 text-choco/65">
            Tap any dessert to unwrap its story ✦
          </p>
        </motion.div>

        {/* Tabs */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Menu categories"
        >
          {CATEGORIES.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(c.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  isActive
                    ? "text-cream"
                    : "border border-gold/40 bg-white/70 text-choco/70 hover:border-gold hover:text-maroon"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="lf-tab-pill"
                    className="absolute inset-0 rounded-full bg-maroon shadow-lg shadow-maroon/30"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((d) => (
              <article
                key={d.id}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-gold/25 bg-white shadow-md shadow-maroon/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-2xl hover:shadow-maroon/15"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {d.tag && (
                    <span
                      className={cn(
                        "absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-md",
                        TAG_STYLES[d.tag]
                      )}
                    >
                      {d.tag}
                    </span>
                  )}
                  <span
                    className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-sm border-[1.5px] border-green-700 bg-white/90 text-[9px] leading-none text-green-700"
                    title="100% Vegetarian"
                  >
                    ●
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold leading-snug text-maroon-deep">
                      {d.name}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-gold/15 px-2 py-1 text-xs font-bold text-gold-dark">
                      <Star className="h-3 w-3 fill-current" />
                      {d.rating}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-choco/60">
                    {d.desc}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-2xl font-black text-maroon">
                      {formatINR(d.price)}
                    </span>
                    <span className="text-xs text-choco/45">
                      · {d.reviews.toLocaleString("en-IN")} reviews
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2 pt-1">
                    <button
                      onClick={() => setSelected(d)}
                      className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-gold/50 bg-white text-xs font-bold uppercase tracking-wider text-maroon transition-all hover:border-gold hover:bg-gold/10"
                      aria-label={`View details of ${d.name}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Details
                    </button>
                    <button
                      onClick={() => quickAdd(d)}
                      className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-maroon text-xs font-bold uppercase tracking-wider text-cream shadow-md shadow-maroon/25 transition-all hover:bg-maroon-dark hover:shadow-lg"
                      aria-label={`Quick add ${d.name} to order`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <DessertModal dessert={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
