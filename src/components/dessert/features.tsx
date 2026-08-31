"use client";

import { motion } from "framer-motion";
import { ChefHat, Clock, PartyPopper, Sprout } from "lucide-react";
import TiltCard from "./tilt-card";
import GhostWord from "./ghost-word";

const FEATURES = [
  {
    icon: ChefHat,
    title: "Master Chocolatiers",
    text: "Trained in Belgium & Italy, crafting dessert couture since 2015.",
  },
  {
    icon: Sprout,
    title: "Real Fruit Only",
    text: "Farm-fresh fruits blended straight in — never syrups, never shortcuts.",
  },
  {
    icon: Clock,
    title: "Fresh Before Sunrise",
    text: "Every bake, churn and swirl happens fresh each morning. No leftovers, ever.",
  },
  {
    icon: PartyPopper,
    title: "Celebration Ready",
    text: "Custom cakes & party hampers for your sweetest moments, big or tiny.",
  },
];

export default function Features() {
  return (
    <section
      aria-label="Why La'Frutella"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-dark/50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <GhostWord word="PROMISE" tone="maroon" drift={65} />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <TiltCard key={f.title} max={8} lift={6} innerClassName="h-full" className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="shine-sweep group relative h-full overflow-hidden rounded-[1.75rem] border border-gold/25 bg-white p-6 shadow-md shadow-maroon/5 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/20"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-maroon-deep shadow-lg shadow-gold/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <f.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-maroon-deep">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-choco/60">{f.text}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
