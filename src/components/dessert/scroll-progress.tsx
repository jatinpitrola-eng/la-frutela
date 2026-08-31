"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim gold reading-progress ribbon pinned to the very top. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-[0_0_14px_rgba(217,164,65,0.75)]"
    />
  );
}
