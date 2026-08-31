"use client";

import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/dessert-data";
import GhostWord from "./ghost-word";

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Frequently asked questions"
    >
      <GhostWord word="ASK US" tone="maroon" drift={70} />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 font-display text-lg italic text-gold-dark">
            <MessageCircleHeart className="h-5 w-5" />
            Everything you&apos;re wondering
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-maroon-deep sm:text-4xl lg:text-5xl">
            Sweet <span className="text-gold-shimmer">Questions</span>, Answered
          </h2>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 rounded-[2rem] border border-gold/30 bg-white/80 p-4 shadow-xl shadow-maroon/10 backdrop-blur sm:p-6"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className={i === FAQS.length - 1 ? "border-b-0" : "border-gold/25"}
              >
                <AccordionTrigger className="gap-4 rounded-xl px-3 py-4 text-left font-display text-base font-bold text-maroon-deep transition-colors hover:bg-gold/10 hover:no-underline hover:text-maroon sm:text-lg">
                  <span className="flex items-center gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/20 font-body text-xs font-black text-gold-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-4 pl-[3.25rem] text-sm leading-relaxed text-choco/70 sm:pl-[3.75rem] sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <p className="mt-6 text-center text-sm text-choco/55">
          Still curious?{" "}
          <a
            href="mailto:hello@lafrutella.in"
            className="font-bold text-maroon underline decoration-gold/60 decoration-2 underline-offset-4 transition-colors hover:text-gold-dark"
          >
            hello@lafrutella.in
          </a>{" "}
          — we reply faster than gelato melts.
        </p>
      </div>
    </section>
  );
}
