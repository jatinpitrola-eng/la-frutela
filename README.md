# La'Frutella — Artisan Dessert Bar 🍨

> *Desserts so good, they feel like magic.*

The official web experience for **La'Frutella** — a premium artisan dessert bar
handcrafting small-batch gelatos, molten cakes, royal thick shakes, Belgian
waffles and French patisserie bites since 2015.

**🔗 Live:** https://la-frutela.vercel.app

---

## ✨ Experience Highlights

- **Cinematic preloader** — maroon-and-gold loader with dripping chocolate-gold,
  halo pulses, rotating brand ring and a progress counter.
- **Ambient background system** — drifting aurora orbs, cinematic film grain,
  rising gold motes and a soft vignette behind the whole site.
- **3D everywhere** — mouse-parallax hero (the sundae tilts in true 3D),
  an orbiting dessert ring, perspective-tilt cards on hover, and
  conveyor-style rolling flavor ribbons.
- **Rolling desserts** — dual crossing marquee bands and the counter-rolling
  *Dessert Parade* with a giant outlined watermark hall.
- **Interactive menu** — 5 collections × 4 desserts, animated tab pill,
  detail modals with add-ons & live pricing, quick-add to cart.
- **Full ordering flow** — dessert box cart, pickup/delivery toggle with
  validation, order confirmation codes (`LF-####`), toast feedback.
- **Luxury details** — gold scroll-progress ribbon, mouse-follow aura,
  shine sweeps, count-up stats, reduced-motion support.

## 🛠 Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router) · React 19 · TypeScript 5 |
| Styling | Tailwind CSS 4 · shadcn/ui · custom maroon/gold design tokens |
| Motion | Framer Motion · CSS keyframe systems |
| State | Zustand (cart) |
| Data | Prisma + SQLite locally · graceful in-memory fallback on serverless |
| Type | Playfair Display + Outfit |

## 🚀 Getting Started

```bash
bun install
bun run db:push      # set up the local SQLite database
bun run dev          # http://localhost:3000
```

Lint & type-check:

```bash
bun run lint
bunx tsc --noEmit
```

## 📁 Structure

```
src/
├── app/
│   ├── page.tsx              # single-route masterpiece composition
│   ├── layout.tsx            # fonts, SEO, JSON-LD structured data
│   └── api/orders/route.ts   # order intake (Prisma ↔ memory fallback)
├── components/dessert/       # preloader, hero, marquees, menu, modals…
└── lib/                      # design data, cart store, smooth scroll
public/images/                # 24 branded 3D dessert renders
```

---

Crafted with ♥ & sprinkles in India.
