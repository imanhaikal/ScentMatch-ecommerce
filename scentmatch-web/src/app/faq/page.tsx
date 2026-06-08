"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background font-sans flex flex-col pt-32">
      <SiteHeader />

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
