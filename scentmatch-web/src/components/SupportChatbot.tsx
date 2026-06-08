"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { useCartStore } from "@/store/useCartStore";

const prompts = [
  {
    label: "Order Status",
    response: "Prototype orders appear instantly on the confirmation route. In production, Shopify sends fulfilment and delivery updates.",
  },
  {
    label: "Returns",
    response: "Sealed full-size fragrances can be returned within 14 days. Samples remain final to preserve hygiene and product integrity.",
  },
  {
    label: "Scent Quiz",
    response: "The quiz maps environment, aesthetic, and intensity answers to olfactive notes, then returns a scored fragrance profile.",
  },
  {
    label: "Vendor Application",
    response: "Artisan houses can apply through the vendor portal and map top, heart, and base notes for ScentMatch recommendations.",
  },
  {
    label: "Checkout",
    response: "This prototype offers a local checkout simulation and a Shopify handoff for secure production payments.",
  },
];

export function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState(prompts[0]);
  const cartOpen = useCartStore((state) => state.isOpen);

  if (cartOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 w-[min(22rem,calc(100vw-3rem))] border border-white/10 bg-background/95 p-5 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-muted">Concierge Bot</p>
                <h2 className="mt-2 font-cormorant text-3xl italic text-foreground">Ask the atelier</h2>
              </div>
              <button type="button" aria-label="Close concierge chat" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-5 grid grid-cols-2 gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => setActivePrompt(prompt)}
                  className={`border px-3 py-2 text-left text-[9px] uppercase tracking-[0.2em] transition-colors ${
                    activePrompt.label === prompt.label ? "border-foreground text-foreground" : "border-white/10 text-muted hover:border-white/30 hover:text-foreground"
                  }`}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            <p className="min-h-24 border border-white/5 bg-surface/60 p-4 text-xs leading-relaxed tracking-wide text-muted">
              {activePrompt.response}
            </p>
            <Link href="/contact" className="mt-5 block w-fit border-b border-white/30 pb-1 text-[10px] uppercase tracking-[0.2em] text-foreground hover:border-foreground">
              Contact human concierge
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        aria-label={open ? "Close support concierge" : "Open support concierge"}
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          if (!open) trackEvent("chatbot_opened");
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-foreground text-background shadow-2xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
