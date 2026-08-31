"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Plus, RefreshCcw, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { DESSERTS, QUIZ_QUESTIONS, formatINR } from "@/lib/dessert-data";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import GhostWord from "./ghost-word";
import { cn } from "@/lib/utils";

const BURST_COLORS = ["#d9a441", "#c4405e", "#6e1d2b", "#f0cd8c", "#a97b24"];

type Scores = Record<string, number>;

/**
 * FlavorFinder — the 3-question soul-dessert quiz.
 * Every answer drops points on the menu; the highest scorer
 * is revealed as the visitor's "soul dessert".
 */
export default function FlavorFinder() {
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [pressed, setPressed] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [runId, setRunId] = useState(0);

  const total = QUIZ_QUESTIONS.length;
  const winner = useMemo(() => {
    let bestId = DESSERTS[0].id;
    let bestScore = -1;
    for (const d of DESSERTS) {
      const s = scores[d.id] ?? 0;
      if (s > bestScore) {
        bestScore = s;
        bestId = d.id;
      }
    }
    return DESSERTS.find((d) => d.id === bestId)!;
  }, [scores]);

  const pick = (optIdx: number) => {
    if (pressed !== null) return;
    setPressed(optIdx);

    setTimeout(() => {
      const option = QUIZ_QUESTIONS[step].options[optIdx];
      setScores((prev) => {
        const next: Scores = { ...prev };
        for (const [id, pts] of Object.entries(option.scores)) {
          next[id] = (next[id] ?? 0) + pts;
        }
        return next;
      });
      setPressed(null);
      if (step === total - 1) {
        setDone(true);
      } else {
        setStep((s) => s + 1);
      }
    }, 300);
  };

  const retake = () => {
    setScores({});
    setStep(0);
    setDone(false);
    setRunId((r) => r + 1);
  };

  const addWinner = () => {
    addItem({ id: winner.id, name: winner.name, img: winner.img, unit: winner.price, qty: 1, addons: [] });
    toast({
      title: "Soul dessert secured ✨",
      description: `1 × ${winner.name} — ${formatINR(winner.price)}`,
    });
  };

  const progress = done ? 100 : ((step + 0.5) / total) * 100;

  return (
    <section
      id="quiz"
      className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-label="Flavor finder quiz"
    >
      <GhostWord word="FIND YOURS" tone="gold" drift={90} />
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-maroon shadow-sm">
            <Sparkles className="h-4 w-4 text-gold-dark" />
            Flavor Finder · 60 seconds
          </p>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-maroon-deep sm:text-4xl lg:text-5xl">
            Three questions to your{" "}
            <span className="text-gold-shimmer">soul dessert</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-choco/65">
            Our chefs built a tiny taste-matcher. Answer honestly — it has
            matched <span className="font-bold text-maroon">12,400+</span> sweet
            tooths this year ✦
          </p>
        </motion.div>

        {/* quiz card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mt-10 overflow-hidden rounded-[2.5rem] border-2 border-gold/40 bg-white/85 p-6 shadow-2xl shadow-maroon/10 backdrop-blur sm:p-10"
        >
          {/* progress */}
          <div className="mb-7">
            <div className="mb-2 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.18em]">
              <span className="text-gold-dark">
                {done ? "Match found" : `Question ${step + 1} of ${total}`}
              </span>
              {!done && step > 0 && (
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-1 text-choco/50 transition-colors hover:text-maroon"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              )}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gold/15">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-berry"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-center font-display text-2xl font-black text-maroon-deep sm:text-3xl">
                  {QUIZ_QUESTIONS[step].q}
                </h3>
                <p className="mt-1.5 text-center text-sm text-choco/55">
                  {QUIZ_QUESTIONS[step].sub}
                </p>

                <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                  {QUIZ_QUESTIONS[step].options.map((o, i) => (
                    <button
                      key={o.label}
                      onClick={() => pick(i)}
                      aria-pressed={pressed === i}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border-2 bg-cream/60 p-4 text-left transition-all duration-200",
                        pressed === i
                          ? "scale-[0.98] border-maroon bg-gold/15 shadow-inner"
                          : "border-gold/25 hover:-translate-y-0.5 hover:border-gold hover:shadow-lg hover:shadow-gold/15"
                      )}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-2xl shadow-sm ring-1 ring-gold/30">
                        {o.emoji}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-maroon-deep">
                          {o.label}
                        </span>
                        <span className="block truncate text-xs text-choco/55">
                          {o.sub}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`result-${runId}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative text-center"
              >
                {/* gold confetti burst */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  {BURST_COLORS.flatMap((c, ci) =>
                    Array.from({ length: 4 }, (_, i) => {
                      const angle = (ci * 4 + i) * (Math.PI / 8) + runId;
                      const dist = 90 + ((ci * 7 + i * 13) % 60);
                      return (
                        <motion.span
                          key={`${ci}-${i}`}
                          className="absolute left-1/2 top-10 h-2 w-2 rounded-full"
                          style={{ backgroundColor: c }}
                          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                          animate={{
                            x: Math.cos(angle) * dist,
                            y: Math.sin(angle) * dist,
                            scale: [0, 1.25, 0.5],
                            opacity: [1, 1, 0],
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      );
                    })
                  )}
                </div>

                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gold-dark">
                  ✦ Your soul dessert ✦
                </p>

                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.15 }}
                  className="animate-float relative mx-auto mt-5 h-32 w-32 overflow-hidden rounded-[1.75rem] shadow-xl shadow-maroon/25 ring-4 ring-gold"
                >
                  <Image
                    src={winner.img}
                    alt={winner.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </motion.div>

                <h3 className="mt-5 font-display text-3xl font-black text-maroon-deep sm:text-4xl">
                  {winner.name}
                </h3>
                {winner.tag && (
                  <span className="mt-2 inline-block rounded-full bg-maroon px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-gold-light">
                    {winner.tag}
                  </span>
                )}
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-choco/65">
                  {winner.desc}
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                  <span className="flex text-gold-dark" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </span>
                  <span className="font-bold text-maroon">{winner.rating}</span>
                  <span className="text-choco/50">
                    · {formatINR(winner.price)}
                  </span>
                </div>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    onClick={addWinner}
                    className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-maroon px-8 font-bold text-cream shadow-xl shadow-maroon/30 transition-all hover:-translate-y-1 hover:bg-maroon-dark sm:w-auto"
                  >
                    <Plus className="h-5 w-5" />
                    Add to Dessert Box
                  </button>
                  <button
                    onClick={() => smoothScrollTo("menu")}
                    className="inline-flex h-[52px] items-center justify-center rounded-full border-2 border-gold/60 bg-white px-7 font-bold text-maroon transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold/10"
                  >
                    Explore in Menu
                  </button>
                </div>
                <button
                  onClick={retake}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-choco/45 transition-colors hover:text-maroon"
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Retake the quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
