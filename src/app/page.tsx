"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/dessert/preloader";
import Navbar from "@/components/dessert/navbar";
import Hero from "@/components/dessert/hero";
import MarqueeBands from "@/components/dessert/marquee-band";
import Categories from "@/components/dessert/categories";
import Menu from "@/components/dessert/menu";
import RollingShowcase from "@/components/dessert/rolling-showcase";
import About from "@/components/dessert/about";
import Features from "@/components/dessert/features";
import Testimonials from "@/components/dessert/testimonials";
import CtaBanner from "@/components/dessert/cta";
import Footer from "@/components/dessert/footer";
import OrderModal from "@/components/dessert/order-modal";
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

      <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <MarqueeBands />
          <Categories onSelect={handleSelectCategory} />
          <Menu active={category} onChange={setCategory} />
          <RollingShowcase />
          <About />
          <Features />
          <Testimonials />
          <CtaBanner />
        </main>
        <Footer />
        <OrderModal />
      </div>
    </>
  );
}
