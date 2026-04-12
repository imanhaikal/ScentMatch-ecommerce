"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/PremiumUI";

export const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground pt-32 pb-12 px-8 md:px-16 overflow-hidden border-t border-white/5 z-20">
      <div className="max-w-[100rem] mx-auto flex flex-col h-full">
        {/* Top asymmetrical grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 mb-32">
          
          <div className="md:col-span-5 md:col-start-2">
            <span className="text-muted font-sans uppercase tracking-[0.3em] text-[10px] block mb-8">
              The Digital Sommelier
            </span>
            <p className="text-foreground font-cormorant text-3xl md:text-5xl font-light leading-tight max-w-md italic">
              Olfactive curation for the uncompromising soul.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex flex-col md:items-end md:text-right">
            <span className="text-muted font-sans uppercase tracking-[0.3em] text-[10px] block mb-8">
              Index
            </span>
            <nav className="flex flex-col gap-4">
              {["Collection", "Artisans", "Journal", "Algorithm"].map((item) => (
                <MagneticButton key={item} className="w-fit md:w-full md:justify-end">
                  <a href={`#${item.toLowerCase()}`} className="text-foreground font-sans text-xs uppercase tracking-[0.2em] hover:italic hover:text-muted transition-all duration-500 flex items-center gap-2">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </MagneticButton>
              ))}
            </nav>
          </div>
        </div>

        {/* Massive Typography & Bottom Bar */}
        <div className="mt-auto flex flex-col w-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-full flex justify-between items-end border-b border-white/10 pb-8 mb-8"
          >
            <h2 className="text-[12vw] md:text-[14vw] font-cormorant font-bold leading-none tracking-tighter uppercase text-foreground ml-[-0.05em]">
              Scentmatch
            </h2>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-muted font-sans text-[10px] uppercase tracking-[0.2em]">
            <span>© {new Date().getFullYear()} Scentmatch Inc.</span>
            
            <div className="flex gap-8">
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
