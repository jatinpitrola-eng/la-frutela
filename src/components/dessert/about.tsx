"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import GhostWord from "./ghost-word";

const PROMISES = [
  "Real fruits, never syrups",
  "Small-batch Belgian gelato",
  "Zero artificial colours or preservatives",
  "Baked fresh before sunrise, every day",
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-3xl font-black text-maroon sm:text-4xl">
      {val.toLocaleString("en-IN")}
      <span className="text-gold-dark">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section
      id="story"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Our story"
    >
      <GhostWord word="STORY" tone="maroon" drift={75} />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div
            className="absolute -inset-3 -rotate-2 rounded-[2.5rem] border-2 border-gold/50"
            aria-hidden
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-maroon/20">
            <Image
              src="/images/about-shop.png"
              alt="Inside the warm, elegant La'Frutella dessert bar with golden lighting and marble counters"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/25 to-transparent" />
          </div>
          <div className="animate-float absolute -bottom-6 -right-2 rounded-3xl border border-gold/40 bg-white/95 px-6 py-4 shadow-xl backdrop-blur sm:right-8">
            <p className="font-display text-3xl font-black text-maroon">10+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-choco/55">
              Years of Sweetness
            </p>
          </div>
        </motion.div>

        {/* copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="font-display text-lg italic text-gold-dark">
            Est. 2015 — a tiny kitchen, a big dream
          </p>
          <h2 className="mt-2 font-display text-3xl font-black leading-tight text-maroon-deep sm:text-4xl lg:text-5xl">
            Our Sweet Story
          </h2>
          <p className="mt-5 leading-relaxed text-choco/70">
            Born in a small Jaipur kitchen in 2015, La&apos;Frutella began with
            one belief — dessert should feel like a celebration, not just a
            course. Our founder trained under master gelatieri in Bologna and
            chocolatiers in Bruges, then came home to swirl those skills into
            every scoop, slice and shake we serve.
          </p>
          <p className="mt-4 leading-relaxed text-choco/70">
            Today, over 120 signature creations later, nothing has changed
            about how we work: real fruit, Belgian couverture, and recipes
            never rushed. Because magic can&apos;t be mass-produced.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-choco/80">
                <BadgeCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-dark" />
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-7 font-display text-xl italic text-maroon">
            — Chef Mariana D&apos;Souza, Founder
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gold/30 pt-7">
            <div>
              <Counter to={120} suffix="+" />
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-choco/55">
                Creations
              </p>
            </div>
            <div>
              <Counter to={25} suffix="k+" />
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-choco/55">
                Happy Guests
              </p>
            </div>
            <div>
              <Counter to={4} suffix="" />
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-choco/55">
                Cities & Growing
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
