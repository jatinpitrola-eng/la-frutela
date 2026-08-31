"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const DRIPS = [
  { left: "8%", delay: "0s", h: 26 },
  { left: "24%", delay: "0.5s", h: 18 },
  { left: "42%", delay: "1.1s", h: 30 },
  { left: "60%", delay: "0.3s", h: 20 },
  { left: "78%", delay: "0.9s", h: 26 },
  { left: "92%", delay: "1.4s", h: 16 },
];

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 7 + 3;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, 110);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onFinish, 650);
      return () => clearTimeout(t);
    }
  }, [progress, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-maroon-deep"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading La'Frutella"
    >
      {/* deep vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,29,43,0.55),transparent_70%)]" />

      {/* dripping gold */}
      <div className="absolute inset-x-0 top-0 h-10" aria-hidden>
        {DRIPS.map((d, i) => (
          <div
            key={i}
            className="animate-drip absolute top-0 w-1.5 rounded-full bg-gradient-to-b from-gold-light to-gold"
            style={{ left: d.left, height: d.h, animationDelay: d.delay }}
          />
        ))}
      </div>

      {/* rotating brand ring + logo */}
      <div className="relative h-52 w-52 sm:h-60 sm:w-60">
        <svg
          viewBox="0 0 200 200"
          className="animate-spin-slower absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <path
              id="lf-loader-circle"
              d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
            />
          </defs>
          <text className="fill-gold text-[12.5px] font-semibold uppercase" style={{ letterSpacing: "3.5px" }}>
            <textPath href="#lf-loader-circle">
              ✦ Artisan Desserts ✦ Fresh Daily ✦ Since 2015 ✦
            </textPath>
          </text>
        </svg>

        {/* halo pulses */}
        <div className="halo-ring absolute inset-6 rounded-full border-2 border-gold/60" />
        <div
          className="halo-ring absolute inset-6 rounded-full border border-gold/40"
          style={{ animationDelay: "0.7s" }}
        />
        <div
          className="halo-ring absolute inset-6 rounded-full border border-gold/30"
          style={{ animationDelay: "1.4s" }}
        />

        {/* logo */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="animate-glow absolute inset-[22%] overflow-hidden rounded-full ring-4 ring-gold/70"
        >
          <Image
            src="/images/lafrutella-logo.png"
            alt="La'Frutella logo"
            fill
            sizes="200px"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* wordmark */}
      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="mt-8 font-display text-4xl font-bold tracking-wide sm:text-5xl"
      >
        <span className="text-gold-shimmer">La&apos;Frutella</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-cream/70"
      >
        Whipping up something sweet…
      </motion.p>

      {/* progress */}
      <div className="mt-10 w-64 sm:w-80">
        <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-cream/60">
          <span>Loading sweetness</span>
          <span className="text-gold">{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
