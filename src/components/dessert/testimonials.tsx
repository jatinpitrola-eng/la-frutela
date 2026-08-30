"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya Sharma",
    role: "Food Blogger · @plateandpalette",
    text: "The molten choco fudge literally made me close my eyes mid-bite. La'Frutella isn't dessert — it's a feeling you want to relive every week.",
    initials: "PS",
  },
  {
    name: "Rahul Mehta",
    role: "Regular since 2019",
    text: "Ordered the Nutella Kiss shake on a whim. Now my Fridays are legally incomplete without it. Dangerous levels of delicious.",
    initials: "RM",
  },
  {
    name: "Ananya Iyer",
    role: "Birthday cake, order #4821",
    text: "They made my daughter's birthday cake look like a jewellery box — gold flakes and all. Pure edible art, and it tasted even better.",
    initials: "AI",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Customer reviews"
    >
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-display text-lg italic text-gold-dark">
            Sweet words from sweeter people
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-maroon-deep sm:text-4xl lg:text-5xl">
            Loved, Scoop by Scoop
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/80 px-5 py-2 shadow-sm">
            <span className="flex text-gold-dark">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-bold text-maroon">4.9 / 5</span>
            <span className="text-xs text-choco/55">
              · 6,200+ verified reviews
            </span>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="relative flex flex-col rounded-[1.75rem] border border-gold/25 bg-white p-7 shadow-lg shadow-maroon/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/20"
            >
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-gold/30"
                aria-hidden
              />
              <div className="flex gap-1 text-gold-dark" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-choco/75">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-gold/40 pt-5">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold text-cream"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg,#6e1d2b,#8a2b3c)"
                        : "linear-gradient(135deg,#a97b24,#d9a441)",
                  }}
                >
                  {r.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-maroon-deep">{r.name}</p>
                  <p className="text-xs text-choco/50">{r.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
