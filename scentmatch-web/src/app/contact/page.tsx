"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { MagneticButton } from "@/components/PremiumUI";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function ContactPage() {
  const { openCart, items } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  
  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-32 w-full max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="w-full flex flex-col md:flex-row gap-20"
        >
          <div className="w-full md:w-1/2">
            <span className="text-muted font-sans text-[10px] uppercase tracking-[0.3em] mb-6 block">Correspondence</span>
            <h1 className="text-5xl md:text-7xl font-cormorant font-light text-foreground leading-none italic mb-12">
              Reach Out
            </h1>
            <p className="text-muted font-sans text-sm tracking-wide leading-relaxed max-w-sm mb-16">
              For curator allocations, bespoke matching, or general inquiries. Our concierge is available to guide your olfactive journey.
            </p>

            <div className="space-y-8 font-sans text-xs uppercase tracking-[0.2em]">
              <div>
                <span className="block text-muted mb-2">Concierge</span>
                <span className="text-foreground block">concierge@scentmatch.com</span>
              </div>
              <div>
                <span className="block text-muted mb-2">Press</span>
                <span className="text-foreground block">press@scentmatch.com</span>
              </div>
              <div>
                <span className="block text-muted mb-2">Atelier</span>
                <span className="text-foreground normal-case tracking-normal">
                  Kuala Lumpur, MY<br />
                  (By Appointment Only)
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 bg-surface border border-white/5"
              >
                <h3 className="font-cormorant text-3xl italic text-foreground mb-4">Received</h3>
                <p className="text-muted font-sans text-xs tracking-widest uppercase">Our concierge will contact you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <input 
                  type="text" 
                  required
                  placeholder="Name" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors rounded-none"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors rounded-none"
                />
                <div className="relative">
                  <textarea 
                    required
                    placeholder="Message" 
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-4 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors resize-none rounded-none"
                  ></textarea>
                </div>
                
                <MagneticButton className="w-full group relative bg-foreground text-background overflow-hidden uppercase tracking-[0.2em] py-5 font-sans text-xs font-bold flex items-center justify-center mt-4">
                  <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                  <span className="relative z-10 group-hover:text-foreground transition-colors duration-500 w-full px-4 text-center">
                    Transmit
                  </span>
                </MagneticButton>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}