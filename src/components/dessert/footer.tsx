"use client";

import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const EXPLORE = [
  { href: "#home", label: "Home" },
  { href: "#treasures", label: "Collections" },
  { href: "#menu", label: "Menu" },
  { href: "#lab", label: "Flavor Lab" },
  { href: "#parade", label: "Dessert Parade" },
  { href: "#story", label: "Our Story" },
  { href: "#craft", label: "The Craft" },
  { href: "#moments", label: "Sweet Moments" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-auto scroll-mt-20 bg-maroon-deep text-cream/75"
      aria-label="Footer"
    >
      {/* ornamental top edge */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-10 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(217,164,65,0.12),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 gap-3 bg-maroon-deep px-4 text-sm text-gold">
        <span>✦</span><span className="text-gold-light">✦</span><span>✦</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="relative block h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold">
              <Image
                src="/images/lafrutella-logo.png"
                alt="La'Frutella logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="font-display text-2xl font-bold text-cream">
              La<span className="text-gold">&apos;</span>Frutella
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/60">
            Artisan dessert bar handcrafting gelatos, cakes, shakes & French
            bakes with real fruit and Belgian couverture — since 2015.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#home"
                aria-label={`La'Frutella on ${s.label}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-light transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-maroon-deep"
              >
                <s.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer navigation">
          <h3 className="font-display text-lg font-bold text-gold-light">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(l.href.slice(1));
                  }}
                  className="inline-block text-cream/60 transition-all hover:translate-x-1 hover:text-gold-light"
                >
                  ✦ {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit */}
        <div>
          <h3 className="font-display text-lg font-bold text-gold-light">
            Visit the Parlour
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
              <span>
                21, Rose Arcade, MG Road,
                <br />
                Jaipur 302001, Rajasthan
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
              <span>
                Mon – Thu · 11:00 AM – 11:00 PM
                <br />
                Fri – Sun · 11:00 AM – 11:30 PM
              </span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg font-bold text-gold-light">
            Talk Sweetness
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-cream/60 transition-colors hover:text-gold-light"
              >
                <Phone className="h-4.5 w-4.5 shrink-0 text-gold" />
                +91 98765 43210
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@lafrutella.in"
                className="flex items-center gap-3 text-cream/60 transition-colors hover:text-gold-light"
              >
                <Mail className="h-4.5 w-4.5 shrink-0 text-gold" />
                hello@lafrutella.in
              </a>
            </li>
          </ul>
          <div className="mt-5 rounded-2xl border border-gold/30 bg-maroon/40 p-4">
            <p className="text-xs leading-relaxed text-cream/65">
              🎂 Planning a celebration? Custom cakes & party hampers need just
              24 hours notice — call us and we&apos;ll make it magical.
            </p>
          </div>
        </div>
      </div>

      {/* giant brand watermark */}
      <div aria-hidden className="pointer-events-none relative select-none overflow-hidden">
        <p className="text-outline-cream -mb-[0.23em] whitespace-nowrap text-center font-display text-[13.5vw] font-black leading-none tracking-tight lg:text-[11rem]">
          LA&apos;FRUTELLA
        </p>
      </div>

      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} La&apos;Frutella. All rights reserved.</p>
          <p className="font-medium">
            Crafted with <span className="text-gold">♥</span> & sprinkles in India
          </p>
        </div>
      </div>
    </footer>
  );
}
