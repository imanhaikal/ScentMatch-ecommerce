"use client";

import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function ReturnsPage() {
  const { openCart, items } = useCartStore();
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
      <div className="flex-1 flex flex-col px-8 md:px-16 py-32 w-full max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="w-full flex flex-col"
        >
          <span className="text-muted font-sans text-[10px] uppercase tracking-[0.3em] mb-6 block text-center">Policy</span>
          <h1 className="text-5xl md:text-7xl font-cormorant font-light text-foreground leading-none italic mb-20 text-center">
            Acquisition Reversal
          </h1>

          <div className="space-y-16">
            <section>
              <h2 className="font-cormorant text-3xl italic text-foreground mb-6">The 14-Day Window</h2>
              <p className="text-muted font-sans text-sm md:text-base tracking-wide leading-relaxed">
                Due to the intimate and highly volatile nature of olfactive extracts, full-size acquisitions may only be returned within 14 days of receipt, provided the atomizer remains unprimed and the seal unbroken. 
                Any evidence of atomization instantly voids the reversal protocol.
              </p>
            </section>

            <section>
              <h2 className="font-cormorant text-3xl italic text-foreground mb-6">Curator Allocations</h2>
              <p className="text-muted font-sans text-sm md:text-base tracking-wide leading-relaxed">
                Our 2ml curator samples exist specifically to eliminate the blind-buy gamble. Consequently, all sample acquisitions are strictly final. We encourage deliberate consideration and patience when evaluating these on the skin.
              </p>
            </section>

            <section>
              <h2 className="font-cormorant text-3xl italic text-foreground mb-6">Initiating a Return</h2>
              <ol className="list-decimal list-inside space-y-4 text-muted font-sans text-sm md:text-base tracking-wide leading-relaxed pl-4 marker:text-foreground/50">
                <li>Contact our concierge with your acquisition dossier (order number).</li>
                <li>Receive an encrypted return authorization cipher.</li>
                <li>Package the extract securely to prevent thermal and kinetic shock.</li>
                <li>Dispatch via tracked courier to our atelier.</li>
              </ol>
            </section>
            
            <section className="pt-8 border-t border-white/5">
              <p className="text-muted font-sans text-[10px] uppercase tracking-widest text-center">
                For anomalies regarding compromised flacons upon arrival, immediately alert concierge within 48 hours.
              </p>
            </section>
          </div>

        </motion.div>
      </div>

      <Footer />
    </main>
  );
}