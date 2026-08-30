"use client";

import { motion } from "framer-motion";
import { IceCreamCone, Phone } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/store";

export default function CtaBanner() {
  const setOrderOpen = useCart((s) => s.setOrderOpen);

  return (
    <section
      aria-label="Order now call to action"
      className="px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-maroon-deep px-6 py-14 text-center shadow-2xl shadow-maroon/30 sm:px-12 lg:py-20"
      >
        <div className="bg-dots-gold pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-maroon-light/40 blur-3xl" />

        {/* floating treats */}
        <div className="animate-float absolute left-8 top-8 hidden h-20 w-20 overflow-hidden rounded-full opacity-90 ring-4 ring-gold/40 lg:block">
          <Image src="/images/cupcake.png" alt="" fill sizes="80px" className="object-cover" />
        </div>
        <div className="animate-float-delayed absolute bottom-10 right-10 hidden h-24 w-24 overflow-hidden rounded-full opacity-90 ring-4 ring-gold/40 lg:block">
          <Image src="/images/cheesecake.png" alt="" fill sizes="96px" className="object-cover" />
        </div>

        <div className="relative">
          <p className="font-display text-lg italic text-gold-light">
            Still reading? Your sweet tooth is showing.
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-black leading-tight text-cream sm:text-4xl lg:text-5xl">
            Craving Something{" "}
            <span className="text-gold-shimmer">Sweet Right Now?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/70">
            Order in two taps — pickup from the parlour or get it delivered
            still warm. First-timers get a free macaron on us ✦
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <button
              onClick={() => setOrderOpen(true)}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-9 text-base font-black tracking-wide text-maroon-deep shadow-xl shadow-gold/25 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/40 sm:w-auto"
            >
              <IceCreamCone className="h-5 w-5" />
              Order Now — It&apos;s Scoop o&apos;clock
            </button>
            <a
              href="tel:+919876543210"
              className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-cream/30 px-8 text-base font-bold tracking-wide text-cream transition-all hover:-translate-y-1 hover:border-gold hover:text-gold-light sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
