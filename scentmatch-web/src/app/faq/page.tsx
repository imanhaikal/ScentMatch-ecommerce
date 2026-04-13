"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const FAQ_DATA = [
  {
    question: "What is your olfactive matching algorithm?",
    answer: "Our proprietary algorithm cross-references your psychological profile against 400+ artisan notes, ensuring a 94% accuracy rate in finding your signature scent."
  },
  {
    question: "Do you offer physical samples?",
    answer: "We offer the Curator's Allocation, a curated selection of 2ml extracts, prior to any full-size acquisition. True understanding requires time on the skin."
  },
  {
    question: "Are the formulations vegan and cruelty-free?",
    answer: "Uncompromisingly so. Every extract is ethically sourced, eschewing animal-derived musks in favor of avant-garde botanical alternatives."
  },
  {
    question: "How should I store my extracts?",
    answer: "Away from direct light and volatile temperatures. We recommend a cool, dark environment to preserve the integrity of the top notes."
  }
];

export default function FAQPage() {
  const { openCart, items } = useCartStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-background font-sans flex flex-col pt-32">
      {/* Minimalist Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 md:px-16 py-6">
        <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-none tracking-tighter uppercase text-foreground ml-[-0.05em]">
            Scentmatch
          </h2>
        </Link>
        <div className="flex items-center gap-6 z-50">
          <Link href="/shop" className="text-foreground hover:opacity-50 transition-opacity hidden md:block">
            <span className="text-xs uppercase tracking-widest font-sans font-medium">Shop</span>
          </Link>
          <Link href="/login" className="text-foreground hover:opacity-50 transition-opacity hidden md:block">
            <span className="text-xs uppercase tracking-widest font-sans font-medium">Account</span>
          </Link>
          <button 
            onClick={openCart}
            className="text-foreground hover:opacity-50 transition-opacity flex items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest font-sans font-medium">Cart</span>
            {totalCartItems > 0 && (
              <span className="bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 pb-32 w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="w-full"
        >
          <div className="text-center mb-24">
            <span className="text-muted font-sans text-[10px] uppercase tracking-[0.3em] mb-6 block">Inquiries</span>
            <h1 className="text-5xl md:text-7xl font-cormorant font-light text-foreground leading-none italic">
              Frequently Asked
            </h1>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border-b border-white/10">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between py-8 group text-left"
                  >
                    <span className="font-cormorant text-2xl md:text-3xl text-foreground group-hover:italic transition-all duration-500 pr-8">
                      {faq.question}
                    </span>
                    <span className="text-muted group-hover:text-foreground transition-colors shrink-0">
                      {isOpen ? <Minus strokeWidth={1} /> : <Plus strokeWidth={1} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 font-sans text-sm md:text-base text-muted tracking-wide leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}