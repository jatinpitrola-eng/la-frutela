"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IceCreamCone, Menu, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#treasures", label: "Collections" },
  { href: "#menu", label: "Menu" },
  { href: "#lab", label: "Flavor Lab" },
  { href: "#story", label: "Our Story" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setOrderOpen = useCart((s) => s.setOrderOpen);
  const count = items.reduce((n, i) => n + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/30 bg-cream/90 shadow-[0_8px_30px_rgba(66,12,22,0.08)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("home");
          }}
          className="group flex items-center gap-3"
        >
          <span className="relative block h-11 w-11 overflow-hidden rounded-full ring-2 ring-gold transition-transform duration-500 group-hover:rotate-[360deg]">
            <Image
              src="/images/lafrutella-logo.png"
              alt="La'Frutella"
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <span className="font-display text-xl font-bold tracking-wide text-maroon sm:text-2xl">
            La<span className="text-gold-dark">&apos;</span>Frutella
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(l.href.slice(1));
                }}
                className="group relative text-sm font-semibold tracking-wide text-choco/80 transition-colors hover:text-maroon"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-gold-dark to-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setOrderOpen(true)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-white/70 text-maroon transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-lg hover:shadow-gold/25"
            aria-label={`Open your dessert box (${count} items)`}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-maroon px-1 text-[10px] font-bold text-cream ring-2 ring-cream">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setOrderOpen(true)}
            className="hidden h-11 items-center gap-2 rounded-full bg-maroon px-5 text-sm font-bold tracking-wide text-cream shadow-lg shadow-maroon/30 transition-all hover:-translate-y-0.5 hover:bg-maroon-dark hover:shadow-xl hover:shadow-maroon/40 sm:flex"
          >
            <IceCreamCone className="h-4 w-4" />
            Order Now
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-white/70 text-maroon lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-b border-gold/30 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      smoothScrollTo(l.href.slice(1));
                    }}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-choco transition-colors hover:bg-gold/15 hover:text-maroon"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setOrderOpen(true);
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-maroon text-sm font-bold text-cream shadow-lg shadow-maroon/30"
                >
                  <IceCreamCone className="h-4 w-4" />
                  Order Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
