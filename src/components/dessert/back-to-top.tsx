"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop — floating gold-ringed button that appears after
 * the first screens and glides the visitor back to the hero.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border-2 border-gold bg-maroon text-cream shadow-xl shadow-maroon/35 transition-all hover:-translate-y-1 hover:bg-maroon-dark hover:shadow-2xl sm:bottom-7 sm:right-7"
        >
          <ArrowUp className="h-5 w-5" />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/30 [animation-duration:2.6s]"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
