"use client";

import { motion } from "framer-motion";
import { Check, PartyPopper, Phone } from "lucide-react";
import { CELEBRATIONS, formatINR } from "@/lib/dessert-data";
import { useToast } from "@/hooks/use-toast";
import GhostWord from "./ghost-word";
import { cn } from "@/lib/utils";

/**
 * Celebrations — party & catering packages.
 * Birthday / Wedding / Corporate tiers with enquiry actions.
 */
export default function Celebrations() {
  const { toast } = useToast();

  const enquire = (name: string, from: number) => {
    toast({
      title: `${name} enquiry noted 🎉`,
      description: `Our celebration chef will call you within 2 hours. Packages from ${formatINR(from)} — or dial +91 98765 43210 now.`,
    });
  };

  return (
    <section
      id="celebrate"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Celebration and party packages"
    >
      <GhostWord word="PARTY" tone="maroon" drift={85} />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

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
            <PartyPopper className="h-4 w-4 text-gold-dark" />
            Celebrations, Catered
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-maroon-deep sm:text-4xl lg:text-5xl">
            Your party, <span className="text-gold-shimmer">patisserie-grade</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-choco/65">
            1,900+ celebrations sweetened since 2015 — birthdays, weddings,
            boardrooms. You bring the people, we bring the gold.
          </p>
        </motion.div>

        {/* packages */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {CELEBRATIONS.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-[2.25rem] border-2 p-7 transition-all duration-300 sm:p-8",
                c.featured
                  ? "border-gold bg-maroon-deep text-cream shadow-2xl shadow-maroon/40 lg:-translate-y-3"
                  : "border-gold/30 bg-white/85 text-choco hover:-translate-y-1.5 hover:border-gold hover:shadow-2xl hover:shadow-maroon/15"
              )}
            >
              {c.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-maroon-deep shadow-lg shadow-gold/40">
                  ★ Most Loved
                </span>
              )}

              <span
                className={cn(
                  "grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-sm ring-1",
                  c.featured
                    ? "bg-white/10 ring-gold/40"
                    : "bg-cream ring-gold/25"
                )}
              >
                {c.emoji}
              </span>

              <h3
                className={cn(
                  "mt-4 font-display text-2xl font-black",
                  c.featured ? "text-gold-light" : "text-maroon-deep"
                )}
              >
                {c.name}
              </h3>
              <p
                className={cn(
                  "mt-1.5 text-sm leading-relaxed",
                  c.featured ? "text-cream/70" : "text-choco/60"
                )}
              >
                {c.blurb}
              </p>

              <p className="mt-4 flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    c.featured ? "text-gold/80" : "text-choco/45"
                  )}
                >
                  from
                </span>
                <span
                  className={cn(
                    "font-display text-3xl font-black",
                    c.featured ? "text-gold-shimmer" : "text-maroon"
                  )}
                >
                  {formatINR(c.from)}
                </span>
              </p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                        c.featured
                          ? "bg-gold text-maroon-deep"
                          : "bg-gold/20 text-gold-dark"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={c.featured ? "text-cream/85" : "text-choco/75"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2.5">
                <button
                  onClick={() => enquire(c.name, c.from)}
                  className={cn(
                    "h-12 flex-1 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5",
                    c.featured
                      ? "bg-gold text-maroon-deep shadow-lg shadow-gold/30 hover:shadow-xl"
                      : "bg-maroon text-cream shadow-lg shadow-maroon/25 hover:bg-maroon-dark"
                  )}
                >
                  Enquire Now
                </button>
                <a
                  href="tel:+919876543210"
                  aria-label={`Call us about ${c.name}`}
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-full border transition-all hover:-translate-y-0.5",
                    c.featured
                      ? "border-gold/50 text-gold-light hover:bg-gold hover:text-maroon-deep"
                      : "border-gold/40 text-maroon hover:bg-gold/15"
                  )}
                >
                  <Phone className="h-4.5 w-4.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-center text-xs font-semibold text-choco/50"
        >
          ✦ Every package includes a free tasting-box before you commit ✦
        </motion.p>
      </div>
    </section>
  );
}
