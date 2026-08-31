"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/dessert/preloader";
import Navbar from "@/components/dessert/navbar";
import Hero from "@/components/dessert/hero";
import MarqueeBands from "@/components/dessert/marquee-band";
import Categories from "@/components/dessert/categories";
import Menu from "@/components/dessert/menu";
import FlavorLab from "@/components/dessert/flavor-lab";
import RollingShowcase from "@/components/dessert/rolling-showcase";
import About from "@/components/dessert/about";
import Craft from "@/components/dessert/craft";
import Features from "@/components/dessert/features";
import Moments from "@/components/dessert/moments";
import Spotlight from "@/components/dessert/spotlight";
import Testimonials from "@/components/dessert/testimonials";
import Faq from "@/components/dessert/faq";
import CtaBanner from "@/components/dessert/cta";
import Footer from "@/components/dessert/footer";
import OrderModal from "@/components/dessert/order-modal";
import AmbientBackground from "@/components/dessert/ambient-background";
import ScrollProgress from "@/components/dessert/scroll-progress";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import type { CategoryId } from "@/lib/dessert-data";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryId>("icecream");

  const handleSelectCategory = (c: CategoryId) => {
    setCategory(c);
    requestAnimationFrame(() => smoothScrollTo("menu"));
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <AmbientBackground />
      <ScrollProgress />

      {/* bg-background lives on <body>; wrapper stays transparent so the ambient layer breathes through */}
      <div className="relative z-10 flex min-h-screen flex-col font-body text-foreground">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <MarqueeBands />
          <Categories onSelect={handleSelectCategory} />
          <Menu active={category} onChange={setCategory} />
          <FlavorLab />
          <RollingShowcase />
          <About />
          <Craft />
          <Features />
          <Spotlight />
          <Moments />
          <Testimonials />
          <Faq />
          <CtaBanner />
        </main>
        <Footer />
        <OrderModal />
      </div>
    </>
  );
}
