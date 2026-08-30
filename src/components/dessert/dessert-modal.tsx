"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Flame, Minus, Plus, Star, Users } from "lucide-react";
import Image from "next/image";
import {
  ADDONS,
  CATEGORIES,
  formatINR,
  type Dessert,
} from "@/lib/dessert-data";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/* Inner panel keyed by dessert id — state resets naturally on remount */
function DessertDetails({ dessert, onClose }: { dessert: Dessert; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const chosenAddons = ADDONS.filter((a) => picked.includes(a.id));
  const unit = dessert.price + chosenAddons.reduce((n, a) => n + a.price, 0);
  const total = unit * qty;
  const categoryLabel = CATEGORIES.find((c) => c.id === dessert.category)?.label;

  const add = () => {
    addItem({
      id: dessert.id,
      name: dessert.name,
      img: dessert.img,
      unit,
      qty,
      addons: chosenAddons,
    });
    onClose();
    toast({
      title: "Added to your dessert box 🎁",
      description: `${qty} × ${dessert.name}${picked.length ? ` + ${picked.length} add-on${picked.length > 1 ? "s" : ""}` : ""} — ${formatINR(total)}`,
    });
  };

  return (
    <div className="grid md:grid-cols-2">
      {/* Visual */}
      <div className="relative h-60 md:h-auto md:min-h-[520px]">
        <Image
          src={dessert.img}
          alt={dessert.name}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/40 via-transparent to-transparent md:bg-gradient-to-r" />
        {dessert.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-maroon-deep shadow-lg">
            {dessert.tag}
          </span>
        )}
        <span
          className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-md border-2 border-green-700 bg-white/95 text-[11px] leading-none text-green-700 shadow"
          title="100% Vegetarian"
        >
          ●
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gold-dark">
              {categoryLabel}
            </p>
            <DialogTitle className="mt-1 font-display text-2xl font-black text-maroon-deep sm:text-[1.7rem]">
              {dessert.name}
            </DialogTitle>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 text-choco/60 transition-colors hover:border-maroon hover:text-maroon"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="flex items-center gap-1 text-gold-dark">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(dessert.rating) ? "fill-current" : "opacity-30"
                )}
              />
            ))}
            <span className="ml-1 text-sm font-bold text-maroon">{dessert.rating}</span>
          </span>
          <span className="text-xs text-choco/50">
            ({dessert.reviews.toLocaleString("en-IN")} reviews)
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-choco/70">{dessert.longDesc}</p>

        {/* info chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { icon: Flame, text: dessert.calories },
            { icon: Users, text: dessert.servings },
            { icon: Clock, text: dessert.prep },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-maroon"
            >
              <Icon className="h-3.5 w-3.5 text-gold-dark" />
              {text}
            </span>
          ))}
        </div>

        {/* add-ons */}
        <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-choco/55">
          Make it extra ✦
        </p>
        <div className="mt-2.5 grid gap-2">
          {ADDONS.map((a) => {
            const on = picked.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() =>
                  setPicked((p) => (on ? p.filter((x) => x !== a.id) : [...p, a.id]))
                }
                aria-pressed={on}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all",
                  on
                    ? "border-gold bg-gold/15 text-maroon"
                    : "border-border bg-white text-choco/70 hover:border-gold/60"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-md border-2 transition-colors",
                      on
                        ? "border-gold-dark bg-gold text-maroon-deep"
                        : "border-choco/30 bg-white"
                    )}
                  >
                    {on && <Check className="h-3.5 w-3.5" />}
                  </span>
                  {a.label}
                </span>
                <span className="text-xs font-bold text-gold-dark">
                  +{formatINR(a.price)}
                </span>
              </button>
            );
          })}
        </div>

        {/* qty + total */}
        <div className="mt-6 flex items-center justify-between border-t border-dashed border-gold/40 pt-5">
          <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-white px-2 py-1.5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-8 w-8 place-items-center rounded-full bg-cream text-maroon transition-colors hover:bg-gold/30 disabled:opacity-40"
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-display text-lg font-black text-maroon">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="grid h-8 w-8 place-items-center rounded-full bg-maroon text-cream transition-colors hover:bg-maroon-dark"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-choco/50">
              Total
            </p>
            <motion.p
              key={total}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="font-display text-2xl font-black text-maroon"
            >
              {formatINR(total)}
            </motion.p>
          </div>
        </div>

        <button
          onClick={add}
          className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-maroon to-maroon-light text-base font-bold tracking-wide text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-maroon/40"
        >
          <Plus className="h-5 w-5" />
          Add to Dessert Box
        </button>
      </div>
    </div>
  );
}

export default function DessertModal({
  dessert,
  onClose,
}: {
  dessert: Dessert | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!dessert} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="fancy-scroll max-h-[92vh] gap-0 overflow-y-auto rounded-[2rem] border-gold/40 p-0 sm:max-w-3xl"
      >
        {dessert && (
          <DessertDetails key={dessert.id} dessert={dessert} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
