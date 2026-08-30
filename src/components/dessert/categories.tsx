"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { CATEGORIES, type CategoryId } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";

export default function Categories({
  onSelect,
}: {
  onSelect: (c: CategoryId) => void;
}) {
  return (
    <section
      id="treasures"
      className="relative scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Dessert collections"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-display text-lg italic text-gold-dark">
            Pick your craving
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-maroon-deep sm:text-4xl lg:text-5xl">
            Tempting Treasures of the House
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-choco/65">
            Five signature collections, one obsession — dessert perfection.
            Handcrafted fresh in our kitchen, every single day.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                "group relative overflow-hidden rounded-[1.75rem] text-left shadow-lg shadow-maroon/10 ring-1 ring-gold/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-maroon/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                i === 0 && "col-span-2 row-span-2 min-h-[320px] lg:min-h-[460px]",
                i !== 0 && "min-h-[180px] lg:min-h-[220px]"
              )}
              aria-label={`Explore ${cat.label}`}
            >
              <Image
                src={cat.img}
                alt={cat.label}
                fill
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/25 to-transparent transition-opacity duration-500 group-hover:from-maroon-deep/95" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <span className="inline-block rounded-full bg-gold/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-maroon-deep">
                  {cat.tagline}
                </span>
                <h3
                  className={cn(
                    "mt-2 font-display font-bold text-cream",
                    i === 0 ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                  )}
                >
                  {cat.label}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-gold-light opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span>Explore collection</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-maroon-deep">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
