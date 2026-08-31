"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/store";

const EMOJIS = ["🍓", "🥭", "🍇", "🍨", "🎂", "🧁", "✨", "🍩", "🍊", "🫐"];

interface Piece {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  dur: number;
  size: number;
  spin: number;
}

/**
 * FruitRain — the celebration moment. When an order succeeds,
 * the whole screen rains fruit & sprinkles for ~5 seconds.
 * Purely decorative, respects prefers-reduced-motion.
 */
export default function FruitRain() {
  const celebrating = useCart((s) => s.celebrating);
  const setCelebrating = useCart((s) => s.setCelebrating);

  useEffect(() => {
    if (!celebrating) return;

    // respect users who prefer reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCelebrating(false);
      return;
    }

    const t = setTimeout(() => setCelebrating(false), 5200);
    return () => clearTimeout(t);
  }, [celebrating, setCelebrating]);

  const pieces = useMemo<Piece[]>(() => {
    if (!celebrating) return [];
    return Array.from({ length: 46 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 96,
      delay: Math.random() * 0.9,
      dur: 2.9 + Math.random() * 1.9,
      size: 18 + Math.random() * 20,
      spin: Math.random() * 320 - 160,
    }));
  }, [celebrating]);

  if (!celebrating) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 select-none"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          initial={{ y: "-8vh", rotate: 0, opacity: 0 }}
          animate={{ y: "112vh", rotate: p.spin, opacity: [0, 1, 1, 0.85] }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
