"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + d * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const STATS = [
  { value: "60+", label: "Signature Flavors" },
  { value: "4.9★", label: "Google Rating" },
  { value: "10 Yrs", label: "Of Sweet Craft" },
];

const SPARKLES = [
  { top: "6%", left: "12%", size: "text-xl", delay: "0s" },
  { top: "18%", left: "88%", size: "text-2xl", delay: "0.6s" },
  { top: "72%", left: "4%", size: "text-lg", delay: "1.2s" },
  { top: "84%", left: "90%", size: "text-xl", delay: "0.3s" },
  { top: "44%", left: "97%", size: "text-base", delay: "1.5s" },
];

/** treats orbiting the sundae on the gold text-ring path */
const ORBITERS = [
  { img: "/images/cone.png", alt: "Orbiting soft-serve cone", pos: { top: "50%", left: "0%" }, size: 44 },
  { img: "/images/macarons.png", alt: "Orbiting French macarons", pos: { top: "0%", left: "50%" }, size: 52 },
  { img: "/images/popsicle.png", alt: "Orbiting fruit popsicle", pos: { top: "50%", left: "100%" }, size: 44 },
  { img: "/images/brownie.png", alt: "Orbiting fudgy brownie", pos: { top: "100%", left: "50%" }, size: 56 },
];

const HERO_MOTES = Array.from({ length: 9 }, (_, i) => ({
  left: `${6 + i * 11}%`,
  size: 3 + (i % 3),
  duration: `${10 + (i % 4) * 3}s`,
  delay: `${i * 1.9}s`,
}));

export default function Hero() {
  /* ── mouse parallax depth field ── */
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(ny, { stiffness: 55, damping: 18, mass: 0.6 });

  const wmX = useTransform(sx, (v) => v * -16);
  const ringX = useTransform(sx, (v) => v * 9);
  const ringY = useTransform(sy, (v) => v * 7);
  const discX = useTransform(sx, (v) => v * 20);
  const discY = useTransform(sy, (v) => v * 15);
  const discRX = useTransform(sy, (v) => v * -7);
  const discRY = useTransform(sx, (v) => v * 8);
  const treatX = useTransform(sx, (v) => v * -30);
  const treatY = useTransform(sy, (v) => v * -24);
  const sparkX = useTransform(sx, (v) => v * 12);
  const sparkY = useTransform(sy, (v) => v * 9);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetMouse = () => {
    nx.set(0);
    ny.set(0);
  };

  return (
    <section
      id="home"
      className="bg-dots relative overflow-hidden pt-[72px]"
      aria-label="Hero"
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
    >
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[460px] w-[460px] rounded-full bg-maroon/10 blur-3xl" />

      {/* rising gold motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {HERO_MOTES.map((m, i) => (
          <span
            key={i}
            className="gold-mote"
            style={{
              left: m.left,
              width: m.size,
              height: m.size,
              animationDuration: m.duration,
              animationDelay: m.delay,
              ["--mote-opacity" as string]: 0.5,
            }}
          />
        ))}
      </div>

      {/* giant watermark (drifts against the mouse) */}
      <motion.span
        aria-hidden
        style={{ x: wmX }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[18vw] font-black leading-none text-maroon/[0.045]"
      >
        La&apos;Frutella
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pb-28 lg:pt-16">
        {/* ── Copy ── */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-maroon shadow-sm sm:text-sm">
              <Sparkles className="h-4 w-4 text-gold-dark" />
              Rated 4.9★ by 25,000+ dessert lovers
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 font-display text-lg italic text-gold-dark"
          >
            Welcome to La&apos;Frutella
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-2 font-display text-[2.65rem] font-black leading-[1.06] text-maroon-deep sm:text-6xl lg:text-[4.2rem]"
          >
            Desserts So Good,
            <span className="text-gold-shimmer block">They Feel Like Magic.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-choco/75 sm:text-lg lg:mx-0"
          >
            From silky small-batch gelatos to molten chocolate cakes and
            spoon-thick royal shakes — every La&apos;Frutella creation is
            handcrafted fresh daily with real fruits, Belgian couverture and a
            generous sprinkle of love.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("menu");
              }}
              className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-maroon px-8 text-base font-bold tracking-wide text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-1 hover:bg-maroon-dark hover:shadow-2xl hover:shadow-maroon/40 sm:w-auto"
            >
              Explore the Menu
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("story");
              }}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-maroon/25 bg-white/60 px-8 text-base font-bold tracking-wide text-maroon transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold/10 sm:w-auto"
            >
              Our Sweet Story
            </a>
          </motion.div>

          {/* trust row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <div className="flex -space-x-3" aria-hidden>
              {["PS", "RM", "AI", "DK"].map((n, i) => (
                <span
                  key={n}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-cream text-[11px] font-bold text-cream"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#6e1d2b" : "#a97b24",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center justify-center gap-1 text-gold-dark lg:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1.5 font-bold text-maroon">4.9</span>
              </div>
              <p className="mt-0.5 font-medium text-choco/60">
                Loved by 25,000+ sweet tooths across India
              </p>
            </div>
          </motion.div>

          {/* stats */}
          <motion.dl
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-10 flex items-center justify-center divide-x divide-gold/40 lg:justify-start"
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-5 text-center first:pl-0 lg:text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-black text-maroon sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-choco/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── 3D Visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto aspect-square w-[300px] sm:w-[400px] lg:w-[500px]"
        >
          {/* glow */}
          <div className="absolute inset-[8%] rounded-full bg-gold/30 blur-3xl" aria-hidden />

          {/* rotating text ring + orbiters (parallax layer A) */}
          <motion.div
            style={{ x: ringX, y: ringY }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 200 200"
              className="animate-spin-slower absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <path
                  id="lf-hero-circle"
                  d="M100,100 m-95,0 a95,95 0 1,1 190,0 a95,95 0 1,1 -190,0"
                />
              </defs>
              <text
                className="fill-gold-dark text-[10.5px] font-bold uppercase"
                style={{ letterSpacing: "4px" }}
              >
                <textPath href="#lf-hero-circle">
                  ✦ La&apos;Frutella ✦ Artisan Dessert Bar ✦ Est. 2015 ✦ Made With Love
                </textPath>
              </text>
            </svg>

            {/* orbiting mini desserts — ring spins, each treat counter-spins to stay upright */}
            <div className="animate-spin-slower absolute inset-0" aria-hidden>
              {ORBITERS.map((o) => (
                <div
                  key={o.alt}
                  className="absolute"
                  style={{
                    top: o.pos.top,
                    left: o.pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="animate-spin-rev overflow-hidden rounded-full shadow-lg ring-2 ring-gold-light/80"
                    style={{ width: o.size, height: o.size }}
                  >
                    <Image
                      src={o.img}
                      alt={o.alt}
                      width={o.size * 2}
                      height={o.size * 2}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* sundae disc (parallax layer B — tilts in 3D) */}
          <motion.div
            style={{
              x: discX,
              y: discY,
              rotateX: discRX,
              rotateY: discRY,
              transformPerspective: 900,
            }}
            className="absolute inset-[13%]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full ring-8 ring-gold/50 shadow-[0_40px_80px_-20px_rgba(66,12,22,0.45)]">
              <Image
                src="/images/hero-sundae.png"
                alt="La'Frutella signature triple-scoop artisan ice cream sundae with Belgian chocolate drizzle and gold flakes"
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-maroon-deep/15 to-transparent" />
            </div>
          </motion.div>

          {/* floating treats (parallax layer C — deepest, drifts against mouse) */}
          <motion.div style={{ x: treatX, y: treatY }} className="absolute inset-0">
            <div className="animate-float absolute -left-3 top-8 h-20 w-20 overflow-hidden rounded-full shadow-xl ring-4 ring-cream sm:-left-8 sm:h-24 sm:w-24">
              <Image
                src="/images/macarons.png"
                alt="Floating French macarons"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="animate-float-delayed absolute -right-2 bottom-10 h-24 w-24 overflow-hidden rounded-full shadow-xl ring-4 ring-cream sm:-right-8 sm:h-28 sm:w-28">
              <Image
                src="/images/donut.png"
                alt="Floating glazed donuts"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div
              className="animate-float absolute -top-2 right-10 h-16 w-16 overflow-hidden rounded-full shadow-lg ring-4 ring-cream"
              style={{ animationDelay: "0.8s" }}
            >
              <Image
                src="/images/popsicle.png"
                alt="Floating fruit popsicles"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* 100% veg pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute bottom-2 left-0 flex items-center gap-1.5 rounded-full border border-gold/40 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-maroon shadow-lg sm:bottom-6 sm:left-2"
          >
            <span className="grid h-4 w-4 place-items-center rounded border-2 border-green-700 text-[9px] text-green-700">
              ●
            </span>
            100% Veg Friendly
          </motion.div>

          {/* sparkles (parallax layer D) */}
          <motion.div
            style={{ x: sparkX, y: sparkY }}
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            {SPARKLES.map((s, i) => (
              <span
                key={i}
                className={`animate-twinkle absolute text-gold ${s.size}`}
                style={{ top: s.top, left: s.left, animationDelay: s.delay }}
              >
                ✦
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
