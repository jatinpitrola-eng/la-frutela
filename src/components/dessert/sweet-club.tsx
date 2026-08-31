"use client";

import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { CLUB_TIERS, formatINR } from "@/lib/dessert-data";
import { useToast } from "@/hooks/use-toast";
import GhostWord from "./ghost-word";
import { cn } from "@/lib/utils";

const MOTES = Array.from({ length: 8 }, (_, i) => ({
  left: `${6 + ((i * 12.4 + (i % 3) * 7) % 88)}%`,
  width: 3 + (i % 3),
  height: 3 + (i % 3),
  duration: `${10 + (i % 4) * 3}s`,
  delay: `${(i * 1.9) % 11}s`,
}));

/**
 * SweetClub — the dark, gold-lit loyalty section.
 * Three tiers: Sprinkle (free), Sundae (featured), Royal Gold.
 */
export default function SweetClub() {
  const { toast } = useToast();

  const join = (name: string, price: number) => {
    toast({
      title: price === 0 ? "Welcome to the Sprinkles ✨" : `${name} membership awaits 👑`,
      description:
        price === 0
          ? "You're in! Every order now earns Scoop Points — just give your phone number at the counter."
          : `Show your phone number at the counter to activate ${name} — ${formatINR(price)}/yr. First month's sundae is on us.`,
    });
  };

  return (
    <section
      id="club"
      aria-label="Sweet Club loyalty program"
      className="relative scroll-mt-20 overflow-hidden bg-maroon-deep px-4 py-20 text-cream sm:px-6 lg:px-8 lg:py-28"
    >
      {/* dark-section atmosphere */}
      <GhostWord word="ROYALTY" tone="cream" drift={75} />
      <div aria-hidden className="absolute inset-0 bg-dots-gold opacity-30" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="gold-mote"
            style={{
              left: m.left,
              width: m.width,
              height: m.height,
              animationDuration: m.duration,
              animationDelay: m.delay,
              ["--mote-opacity" as string]: 0.5,
            }}
          />
        ))}
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
            <Crown className="h-4 w-4 text-gold" />
            The Sweet Club
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Loyalty, served{" "}
            <span className="text-gold-shimmer">golden</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/65">
            8,300 members earn Scoop Points on every spoonful. Pick your crown —
            the gelato tastes better on this side of the rope.
          </p>
        </motion.div>

        {/* tiers */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {CLUB_TIERS.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-[2.25rem] border-2 p-7 transition-all duration-300 sm:p-8",
                t.featured
                  ? "border-gold bg-gradient-to-br from-gold to-gold-dark text-maroon-deep shadow-2xl shadow-gold/25 lg:-translate-y-3"
                  : "border-gold/25 bg-white/[0.05] text-cream hover:-translate-y-1.5 hover:border-gold/60"
              )}
            >
              {t.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-maroon px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-gold-light shadow-lg">
                  ★ Best Value
                </span>
              )}

              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-sm ring-1",
                    t.featured
                      ? "bg-white/25 ring-white/40"
                      : "bg-white/5 ring-gold/30"
                  )}
                >
                  {t.emoji}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]",
                    t.featured
                      ? "bg-maroon text-gold-light"
                      : "border border-gold/30 text-gold-light"
                  )}
                >
                  {t.tag}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-black">
                {t.name}
              </h3>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-black">
                  {t.price === 0 ? "Free" : formatINR(t.price)}
                </span>
                {t.price > 0 && (
                  <span
                    className={cn(
                      "text-xs font-bold",
                      t.featured ? "text-maroon/70" : "text-cream/50"
                    )}
                  >
                    /year
                  </span>
                )}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                        t.featured
                          ? "bg-maroon text-gold-light"
                          : "bg-gold/20 text-gold"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={t.featured ? "text-maroon-deep/85" : "text-cream/80"}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => join(t.name, t.price)}
                className={cn(
                  "mt-6 h-12 w-full rounded-full text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5",
                  t.featured
                    ? "bg-maroon text-gold-light shadow-lg shadow-maroon/40 hover:shadow-xl"
                    : "border-2 border-gold/50 text-gold-light hover:border-gold hover:bg-gold hover:text-maroon-deep"
                )}
              >
                {t.price === 0 ? "Join Free" : `Join ${t.name}`}
              </button>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-center text-xs font-semibold text-cream/45"
        >
          ✦ Points never expire · redeem 100 points = one free gelato scoop ✦
        </motion.p>
      </div>
    </section>
  );
}
