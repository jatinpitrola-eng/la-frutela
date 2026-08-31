"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Tone = "gold" | "maroon" | "cream";

/**
 * Giant outlined background word that drifts slowly on scroll.
 * Sits behind a section's content — pure decoration, never interactive.
 */
export default function GhostWord({
  word,
  tone = "maroon",
  drift = 70,
  className,
  size = "text-[24vw] lg:text-[15rem]",
}: {
  word: string;
  tone?: Tone;
  drift?: number;
  className?: string;
  size?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-6 flex select-none justify-center overflow-hidden",
        className
      )}
    >
      <motion.span
        style={{ x }}
        className={cn(
          "whitespace-nowrap font-display font-black leading-none tracking-tight",
          size,
          tone === "gold" && "text-outline-gold",
          tone === "maroon" && "text-maroon/[0.05]",
          tone === "cream" && "text-outline-cream"
        )}
      >
        {word}
      </motion.span>
    </div>
  );
}
