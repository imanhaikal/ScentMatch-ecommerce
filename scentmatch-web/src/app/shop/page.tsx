"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, Filter, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton, TiltCard } from "@/components/PremiumUI";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

// --- ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSearchOpenFromNav = searchParams.get("search") === "true";

  const { addItem, openCart, items } = useCartStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Focus search input if routed via nav search icon
  useEffect(() => {
    if (isSearchOpenFromNav) {
      document.getElementById("search-input")?.focus();
    }
  }, [isSearchOpenFromNav]);

  const categories = ["All", "Extract", "Parfum", "Cologne"];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.notes.top.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.notes.heart.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.notes.base.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-background font-sans flex flex-col pt-32">
      {/* Minimalist Header / Navbar Overlay (Reusing simple layout for consistency) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 md:px-16 py-6">
        <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-none tracking-tighter uppercase text-foreground ml-[-0.05em]">
            Scentmatch
          </h2>
        </Link>
        <div className="flex items-center gap-6 z-50">
          <Link href="/" className="text-foreground hover:opacity-50 transition-opacity hidden md:block">
            <span className="text-xs uppercase tracking-widest font-sans font-medium">Home</span>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-8 md:px-16 pb-32">
        <div className="max-w-[100rem] mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* LEFT: Filters & Search (Sticky on Desktop) */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-40 lg:h-[calc(100vh-10rem)] flex flex-col gap-12 z-10">
            <div>
              <h1 className="text-5xl md:text-6xl font-cormorant font-light text-foreground leading-none mb-4">
                The Archive
              </h1>
              <p className="text-muted font-sans text-xs uppercase tracking-[0.2em] mb-12">
                Discover your signature
              </p>
            </div>

            {/* Search Input */}
            <div className="relative group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-foreground transition-colors" />
              <input 
                id="search-input"
                type="text"
                placeholder="Search by name, note..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 pb-4 pl-8 font-sans text-xs tracking-widest uppercase text-foreground placeholder:text-muted/50 focus:outline-none focus:border-foreground transition-all rounded-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter (Desktop) */}
            <div className="hidden lg:flex flex-col gap-6">
              <span className="font-cormorant text-2xl italic text-foreground border-b border-white/10 pb-4">Concentration</span>
              <div className="flex flex-col gap-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-4 ${selectedCategory === cat ? 'text-foreground' : 'text-muted hover:text-foreground/80'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${selectedCategory === cat ? 'bg-foreground scale-100' : 'bg-transparent scale-0'}`} />
                    <span className={selectedCategory === cat ? '-ml-2' : ''}>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full border-b border-white/20 pb-4 font-sans text-xs tracking-[0.2em] uppercase"
              >
                <span>Filter by Concentration</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-4 pt-6"
                  >
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left font-sans text-xs tracking-[0.2em] uppercase transition-colors ${selectedCategory === cat ? 'text-foreground' : 'text-muted'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          {/* RIGHT: Product Gallery (Asymmetrical Grid) */}
          <div className="w-full lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-50">
                <span className="font-cormorant text-4xl italic mb-4">Nothing Found</span>
                <span className="font-sans text-xs uppercase tracking-widest text-muted">Adjust your parameters</span>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
              >
                <AnimatePresence>
                  {filteredProducts.map((prod, i) => (
                    <motion.div 
                      key={prod.id}
                      variants={itemVariants}
                      layout
                      className={`relative flex flex-col ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
                    >
                      <TiltCard className="w-full rounded-none">
                        <div className="relative w-full h-[65vh] overflow-hidden bg-surface group">
                          <Link href={`/product/${prod.id}`}>
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-105 group-hover:mix-blend-normal transition-all duration-1000 ease-[0.76,0,0.24,1] cursor-pointer"
                              loading="lazy"
                            />
                          </Link>
                          
                          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                          
                          {/* Note Reveal */}
                          <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]">
                              <div className="flex justify-between border-b border-white/20 pb-2 text-[10px] font-sans tracking-[0.2em] uppercase">
                                <span className="text-muted">Top</span><span className="text-foreground">{prod.notes.top}</span>
                              </div>
                              <div className="flex justify-between border-b border-white/20 pb-2 text-[10px] font-sans tracking-[0.2em] uppercase">
                                <span className="text-muted">Heart</span><span className="text-foreground">{prod.notes.heart}</span>
                              </div>
                              <div className="flex justify-between text-[10px] font-sans tracking-[0.2em] uppercase">
                                <span className="text-muted">Base</span><span className="text-foreground">{prod.notes.base}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                      
                      <div className="pt-8 flex justify-between items-start group">
                        <Link href={`/product/${prod.id}`} className="flex-1">
                          <h3 className="text-foreground text-3xl font-cormorant mb-2 group-hover:italic transition-all duration-500 cursor-pointer pr-4">{prod.name}</h3>
                          <div className="flex gap-4 items-center cursor-pointer">
                            <p className="text-muted font-sans text-[10px] uppercase tracking-[0.2em]">{prod.artisan}</p>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <p className="text-foreground font-sans text-[10px] tracking-widest">${prod.price}</p>
                          </div>
                        </Link>
                        <MagneticButton 
                          onClick={() => {
                            addItem({ id: prod.id, name: prod.name, artisan: prod.artisan, price: prod.price, image: prod.images[0], notes: prod.notes });
                            openCart();
                          }}
                          className="w-12 h-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-500 z-10 relative"
                        >
                          <Plus className="w-4 h-4" />
                        </MagneticButton>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted font-sans text-xs uppercase tracking-widest">Loading Archive...</div>}>
      <ShopContent />
    </Suspense>
  );
}