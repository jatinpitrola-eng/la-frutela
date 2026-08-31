"use client";

import { motion } from "framer-motion";
import { Flame, Layers, Sprout, Sparkles, type LucideIcon } from "lucide-react";
import { CRAFT_STEPS } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";
import GhostWord from "./ghost-word";

const ICONS: Record<string, LucideIcon> = {
  sprout: Sprout,
  flame: Flame,
  layers: Layers,
  sparkles: Sparkles,
};

export default function Craft() {
  return (
    <section
      id="craft"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="How our desserts are crafted"
    >
      <GhostWord word="CRAFTED" tone="maroon" drift={80} />
      <div className="pointer-events-none absolute -left-24 bottom-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-display text-lg italic text-gold-dark">
            No machines, no mass production
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-maroon-deep sm:text-4xl lg:text-5xl">
            From Dawn to <span className="text-gold-shimmer">Gold</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-choco/65">
            Four unhurried steps stand between the morning market and your
            spoon. Here&apos;s how the magic actually happens.
          </p>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* timeline */}
        <div className="relative mt-14">
          {/* spine */}
          <div
            aria-hidden
            className="absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/20 via-gold to-gold/20 lg:left-1/2"
          />

          <ol className="space-y-10 lg:space-y-14">
            {CRAFT_STEPS.map((step, i) => {
              const Icon = ICONS[step.icon] ?? Sparkles;
              const left = i % 2 === 0;
              return (
                <li key={step.n} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                    className={cn(
                      "flex items-start gap-5 lg:w-[calc(50%-3rem)]",
                      left
                        ? "lg:mr-auto lg:flex-row-reverse lg:text-right"
                        : "lg:ml-auto lg:flex-row"
                    )}
                  >
                    {/* node */}
                    <span
                      className="relative z-10 grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 border-gold bg-white shadow-lg shadow-gold/25 lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6 text-gold-dark" />
                      <span className="halo-ring absolute inset-0 rounded-full border-2 border-gold/60" />
                    </span>

                    {/* card */}
                    <div
                      className={cn(
                        "shine-sweep group relative flex-1 overflow-hidden rounded-3xl border border-gold/25 bg-white p-6 shadow-md shadow-maroon/5 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/15 sm:p-7"
                      )}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-7xl font-black text-maroon/[0.06]"
                      >
                        {step.n}
                      </span>
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gold-dark">
                        Step {step.n}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-bold text-maroon-deep sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-choco/65">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
