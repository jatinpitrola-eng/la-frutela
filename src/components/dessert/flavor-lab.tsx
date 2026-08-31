"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dices, FlaskConical, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/store";
import { formatINR, LAB_BASES, LAB_SAUCES, LAB_TOPPINGS } from "@/lib/dessert-data";
import { cn } from "@/lib/utils";
import GhostWord from "./ghost-word";

const TOPPING_SLOTS = [
  { top: "6%", left: "10%", rotate: -14 },
  { top: "2%", left: "58%", rotate: 12 },
  { top: "42%", left: "72%", rotate: 8 },
  { top: "52%", left: "-2%", rotate: -10 },
  { top: "78%", left: "34%", rotate: 6 },
  { top: "24%", left: "36%", rotate: -6 },
];

export default function FlavorLab() {
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const [baseId, setBaseId] = useState(LAB_BASES[0].id);
  const [sauceId, setSauceId] = useState(LAB_SAUCES[0].id);
  const [toppings, setToppings] = useState<string[]>(["macaron"]);

  const base = useMemo(
    () => LAB_BASES.find((b) => b.id === baseId) ?? LAB_BASES[0],
    [baseId]
  );
  const sauce = useMemo(
    () => LAB_SAUCES.find((s) => s.id === sauceId) ?? LAB_SAUCES[0],
    [sauceId]
  );
  const chosen = useMemo(
    () => toppings.map((t) => LAB_TOPPINGS.find((x) => x.id === t)!).filter(Boolean),
    [toppings]
  );
  const total =
    base.price + sauce.price + chosen.reduce((n, t) => n + t.price, 0);
  const creationName = `The ${base.short} ${sauce.short} ${
    chosen.length >= 2 ? "Crown" : chosen.length === 1 ? chosen[0].name.split(" ")[0] : "Ritual"
  }`;

  const toggleTopping = (id: string) => {
    setToppings((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 3) {
        toast({
          title: "Three toppings max — chef insists on balance ✦",
        });
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const surprise = () => {
    const pick = <T,>(arr: readonly T[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    setBaseId(pick(LAB_BASES).id);
    setSauceId(pick(LAB_SAUCES).id);
    setToppings(
      [...LAB_TOPPINGS].sort(() => Math.random() - 0.5).slice(0, 1 + Math.floor(Math.random() * 3)).map((t) => t.id)
    );
    toast({
      title: "Surprise mix spun by the chef ✦",
      description: "Tweak it or add it straight to your box.",
    });
  };

  const addCreation = () => {
    addItem({
      id: `lab-${baseId}-${sauceId}-${[...toppings].sort().join("-") || "plain"}`,
      name: creationName,
      img: base.img,
      unit: total,
      qty: 1,
      addons: [],
    });
    toast({
      title: "Your creation joined the box 🎉",
      description: `1 × ${creationName} — ${formatINR(total)}`,
    });
  };

  return (
    <section
      id="lab"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-cream via-cream-dark/60 to-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Flavor lab — build your own sundae"
    >
      <GhostWord word="CREATE" tone="gold" drift={90} />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 font-display text-lg italic text-gold-dark">
            <FlaskConical className="h-5 w-5" />
            Only here. Only yours.
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-maroon-deep sm:text-4xl lg:text-5xl">
            The <span className="text-gold-shimmer">Flavor Lab</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-choco/65">
            Compose your own sundae — pick a churned base, a drowning sauce and
            up to three toppings. Name it, price it, box it.
          </p>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* ── configurator ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
          >
            {/* Step 1 — base */}
            <fieldset>
              <legend className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-maroon">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-maroon font-display text-xs text-cream">
                  1
                </span>
                Pick your base
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {LAB_BASES.map((b) => {
                  const active = b.id === baseId;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBaseId(b.id)}
                      aria-pressed={active}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl border-2 p-2.5 text-left transition-all duration-300",
                        active
                          ? "border-gold bg-white shadow-xl shadow-gold/25"
                          : "border-gold/25 bg-white/60 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
                      )}
                    >
                      <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl">
                        <Image
                          src={b.img}
                          alt={b.name}
                          fill
                          sizes="(max-width: 640px) 45vw, 140px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <p className="mt-2 text-xs font-bold leading-tight text-maroon-deep">
                        {b.name}
                      </p>
                      <p className="text-[10px] text-choco/55">
                        {b.note} · {formatINR(b.price)}
                      </p>
                      {active && (
                        <motion.span
                          layoutId="lab-base-check"
                          className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-maroon text-[10px] text-cream shadow"
                        >
                          ✦
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 2 — sauce */}
            <fieldset className="mt-8">
              <legend className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-maroon">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-maroon font-display text-xs text-cream">
                  2
                </span>
                Drown it in sauce
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {LAB_SAUCES.map((s) => {
                  const active = s.id === sauceId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSauceId(s.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:text-sm",
                        active
                          ? "border-gold bg-maroon text-cream shadow-lg shadow-maroon/25"
                          : "border-gold/30 bg-white/70 text-choco hover:-translate-y-0.5 hover:border-gold/70"
                      )}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-2 ring-white/70"
                        style={{ background: s.color }}
                        aria-hidden
                      />
                      {s.name}
                      <span className={cn("font-semibold", active ? "text-gold-light" : "text-gold-dark")}>
                        +{formatINR(s.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 3 — toppings */}
            <fieldset className="mt-8">
              <legend className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-maroon">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-maroon font-display text-xs text-cream">
                  3
                </span>
                Crown it · up to 3 toppings
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold-dark normal-case tracking-normal">
                  {toppings.length}/3 chosen
                </span>
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {LAB_TOPPINGS.map((t) => {
                  const active = toppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopping(t.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border-2 p-2.5 text-left transition-all duration-300",
                        active
                          ? "border-gold bg-white shadow-lg shadow-gold/20"
                          : "border-gold/25 bg-white/60 hover:-translate-y-0.5 hover:border-gold/60"
                      )}
                    >
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
                        <Image src={t.img} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold leading-tight text-maroon-deep">
                          {t.name}
                        </span>
                        <span className="text-[10px] font-semibold text-gold-dark">
                          +{formatINR(t.price)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* actions */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={addCreation}
                className="inline-flex h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full bg-maroon px-7 text-base font-bold tracking-wide text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-1 hover:bg-maroon-dark hover:shadow-2xl"
              >
                <ShoppingBag className="h-5 w-5" />
                Add My Creation · {formatINR(total)}
              </button>
              <button
                onClick={surprise}
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full border-2 border-gold/60 bg-gold/10 px-6 text-base font-bold tracking-wide text-maroon transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold/20"
              >
                <Dices className="h-5 w-5" />
                Surprise Me
              </button>
            </div>
          </motion.div>

          {/* ── live preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-gold/30 bg-white/80 p-6 shadow-2xl shadow-maroon/10 backdrop-blur sm:p-8">
              <div className="bg-dots-gold pointer-events-none absolute inset-0 opacity-50" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/25 blur-2xl" />

              <p className="relative text-center text-[11px] font-black uppercase tracking-[0.25em] text-gold-dark">
                Live Preview · Sundae Composer
              </p>

              {/* bowl */}
              <div className="relative mx-auto mt-6 aspect-square w-[78%]">
                <div className="absolute inset-[6%] rounded-full bg-gold/30 blur-2xl" aria-hidden />
                <div className="animate-float absolute inset-0 overflow-hidden rounded-full ring-8 ring-gold/50 shadow-[0_30px_60px_-18px_rgba(66,12,22,0.4)]">
                  {/* base */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={base.id}
                      initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1.06, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={base.img}
                        alt={base.name}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* sauce pool */}
                  <AnimatePresence>
                    <motion.div
                      key={sauce.id}
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: 0.85, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{ type: "spring", stiffness: 160, damping: 16 }}
                      className="animate-wobble absolute inset-[16%] mix-blend-multiply"
                      style={{ background: `radial-gradient(circle at 42% 38%, ${sauce.color}, ${sauce.color}cc 45%, transparent 72%)` }}
                      aria-hidden
                    />
                  </AnimatePresence>

                  {/* toppings */}
                  {chosen.map((t, i) => (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0, y: -40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0, y: -30 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="absolute"
                      style={{
                        top: TOPPING_SLOTS[i % TOPPING_SLOTS.length].top,
                        left: TOPPING_SLOTS[i % TOPPING_SLOTS.length].left,
                        rotate: TOPPING_SLOTS[i % TOPPING_SLOTS.length].rotate,
                      }}
                    >
                      <span className="block h-14 w-14 overflow-hidden rounded-full shadow-lg ring-4 ring-cream sm:h-16 sm:w-16">
                        <Image src={t.img} alt={t.name} width={128} height={128} className="h-full w-full object-cover" />
                      </span>
                    </motion.div>
                  ))}

                  {/* sparkles */}
                  <span className="animate-twinkle absolute right-6 top-8 text-lg text-gold" aria-hidden>✦</span>
                  <span className="animate-twinkle absolute bottom-10 left-6 text-sm text-gold" style={{ animationDelay: "0.8s" }} aria-hidden>✦</span>
                </div>
              </div>

              {/* name + price */}
              <div className="relative mt-6 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={creationName}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-xl font-black text-maroon-deep sm:text-2xl"
                  >
                    {creationName}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-choco/60">
                  <span className="rounded-full bg-maroon/5 px-2.5 py-1">{base.name}</span>+
                  <span className="rounded-full bg-maroon/5 px-2.5 py-1">{sauce.name}</span>
                  {chosen.length > 0 && (
                    <>
                      +
                      <span className="rounded-full bg-maroon/5 px-2.5 py-1">
                        {chosen.length} topping{chosen.length > 1 ? "s" : ""}
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-4 font-display text-3xl font-black text-gold-dark">
                  {formatINR(total)}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-choco/45">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  Churned fresh on order
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
