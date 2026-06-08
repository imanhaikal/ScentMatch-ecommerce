"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Star, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "@/components/PremiumUI";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import type { ScentProduct } from "@/lib/shopify/types";
import { SiteHeader } from "@/components/SiteHeader";
import { trackEvent } from "@/lib/analytics";
import { OptimizedProductImage } from "@/components/OptimizedProductImage";

export default function ProductDetailClient({ product, recommendations }: { product: ScentProduct; recommendations: ScentProduct[] }) {
  const router = useRouter();
  const { addItem, openCart } = useCartStore();
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pricingModel, setPricingModel] = useState<"one-time" | "subscription">("one-time");
  const canPurchase = product.stock > 0 && Boolean(product.variantId);
  const selectedPrice = pricingModel === "subscription" ? Math.round(product.price * 0.85) : product.price;

  const handleAddToCart = () => {
    if (!canPurchase) return;

    // Add multiple quantities by calling addItem multiple times or just passing it
    // Wait, the store signature is: addItem: (item: Omit<CartItem, 'quantity'>) => void
    // And it internally increments by 1. I can just call it multiple times, or we can just add 1 and open cart.
    // Let's loop if user selected > 1
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: pricingModel === "subscription" ? `${product.id}:subscription` : product.id,
        variantId: product.variantId,
        name: pricingModel === "subscription" ? `${product.name} (Curator's Allocation)` : product.name,
        artisan: product.artisan,
        price: selectedPrice,
        image: product.images[0],
        notes: product.notes
      });
    }
    trackEvent("add_to_cart", { product_id: product.id, product_name: product.name, source: "product", pricing_model: pricingModel, quantity });
    openCart();
  };

  return (
    <main className="min-h-screen bg-background font-sans flex flex-col pt-32">
      <SiteHeader />

      {/* Product Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[100rem] mx-auto w-full px-8 md:px-16 gap-16 lg:gap-24 mb-32">
        
        {/* LEFT: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <button onClick={() => router.back()} className="text-muted hover:text-foreground flex items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] mb-4 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Archive
          </button>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-[60vh] md:h-[80vh] bg-surface relative overflow-hidden group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <OptimizedProductImage
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="object-cover mix-blend-luminosity opacity-90 transition-transform duration-1000 group-hover:scale-105 group-hover:mix-blend-normal"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  preload={activeImage === 0}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Show ${product.name} image ${idx + 1}`}
                  aria-pressed={activeImage === idx}
                  className={`relative w-24 h-32 bg-surface overflow-hidden border transition-colors duration-300 ${activeImage === idx ? 'border-foreground' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <OptimizedProductImage src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="object-cover mix-blend-luminosity" sizes="6rem" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details (Sticky on desktop) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-32 self-start flex flex-col gap-12 lg:pl-12 min-w-0 pb-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-full flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-muted font-sans text-xs uppercase tracking-[0.3em] mb-4">{product.artisan}</p>
                <h1 className="text-5xl md:text-7xl font-cormorant font-light text-foreground leading-none mb-2">{product.name}</h1>
                <p className="text-muted font-sans text-[10px] uppercase tracking-[0.2em]">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-sans tracking-widest">RM{product.price} MYR</p>
                <p className="text-muted font-sans text-[9px] uppercase tracking-[0.2em] mt-2">Or 4 installments of RM{Math.round(product.price / 4)}</p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10 my-8" />

            <h2 className="font-cormorant text-3xl md:text-4xl italic text-foreground mb-6 uppercase tracking-wider">{product.name}</h2>

            <p className="text-muted font-sans text-sm md:text-base leading-relaxed tracking-wide mb-10 max-w-lg">
              {product.description}
            </p>

            {/* Pricing Model Selection */}
            <div className="space-y-6 mb-12">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted block border-b border-white/10 pb-4">Acquisition Model</span>
              <fieldset className="flex flex-col gap-4">
                <legend className="sr-only">Choose a pricing model</legend>
                <label className={`relative flex items-center justify-between p-6 border cursor-pointer group transition-all duration-500 bg-transparent hover:border-foreground ${pricingModel === "one-time" ? "border-foreground" : "border-white/20"}`}>
                  <div className="flex items-center gap-6">
                    <div className="w-1.5 h-1.5 bg-foreground group-hover:scale-150 transition-transform duration-500" />
                    <span className="font-sans text-xs uppercase tracking-widest text-foreground group-hover:translate-x-2 transition-transform duration-500">One-Time Acquisition</span>
                  </div>
                  <span className="font-sans text-xs tracking-widest text-foreground">RM{product.price}</span>
                  <input type="radio" name="pricingModel" value="one-time" checked={pricingModel === "one-time"} onChange={() => setPricingModel("one-time")} className="sr-only" />
                  <div className={`absolute inset-0 border border-foreground pointer-events-none transition-opacity ${pricingModel === "one-time" ? "opacity-100" : "opacity-0"}`} />
                </label>
                <label className={`relative flex items-center justify-between p-6 border cursor-pointer group transition-all duration-500 bg-transparent hover:border-white/40 ${pricingModel === "subscription" ? "border-foreground opacity-100" : "border-white/5 opacity-50 hover:opacity-100 grayscale hover:grayscale-0"}`}>
                  <div className="flex items-center gap-6">
                    <div className="w-1.5 h-1.5 bg-transparent border border-muted group-hover:bg-muted transition-colors duration-500" />
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-xs uppercase tracking-widest text-foreground group-hover:translate-x-2 transition-transform duration-500">Curator&apos;s Allocation</span>
                      <span className="font-cormorant italic text-sm text-muted group-hover:translate-x-2 transition-transform duration-500">Replenish every 3 months</span>
                    </div>
                  </div>
                  <span className="font-sans text-xs tracking-widest text-foreground">RM{Math.round(product.price * 0.85)}</span>
                  <input type="radio" name="pricingModel" value="subscription" checked={pricingModel === "subscription"} onChange={() => setPricingModel("subscription")} className="sr-only" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-white/40 pointer-events-none transition-colors" />
                </label>
              </fieldset>
            </div>

            {/* Olfactive Pyramid */}
            <div className="space-y-4 mb-12">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted block border-b border-white/10 pb-4 mb-6">Olfactive Architecture</span>
              <div className="flex justify-between items-end border-b border-white/5 pb-4 group hover:border-white/30 transition-colors duration-500">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-muted group-hover:text-foreground transition-colors">Top Notes</span>
                <span className="text-sm font-cormorant italic text-foreground text-right w-2/3 group-hover:-translate-x-2 transition-transform duration-500">{product.notes.top}</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-4 group hover:border-white/30 transition-colors duration-500">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-muted group-hover:text-foreground transition-colors">Heart Notes</span>
                <span className="text-sm font-cormorant italic text-foreground text-right w-2/3 group-hover:-translate-x-2 transition-transform duration-500">{product.notes.heart}</span>
              </div>
              <div className="flex justify-between items-end border-b border-transparent pb-4 group hover:border-white/30 transition-colors duration-500">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-muted group-hover:text-foreground transition-colors">Base Notes</span>
                <span className="text-sm font-cormorant italic text-foreground text-right w-2/3 group-hover:-translate-x-2 transition-transform duration-500">{product.notes.base}</span>
              </div>
            </div>

            {/* Add to Cart Action */}
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-muted">
                  {canPurchase ? `${product.stock} in stock` : "Unavailable for checkout"}
                </span>
                
                {canPurchase && (
                  <div className="flex items-center gap-6 border border-white/20 rounded-full px-4 py-2">
                    <button type="button" aria-label={`Decrease quantity for ${product.name}`} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted hover:text-foreground transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="font-sans text-xs tracking-widest" aria-live="polite">{quantity}</span>
                    <button type="button" aria-label={`Increase quantity for ${product.name}`} onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-muted hover:text-foreground transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                )}
              </div>

              <MagneticButton
                onClick={handleAddToCart}
                disabled={!canPurchase}
                className={`w-full max-w-full box-border group relative overflow-hidden uppercase tracking-widest py-6 px-4 font-sans text-xs font-bold flex items-center justify-center transition-colors duration-500 ${canPurchase ? 'bg-foreground text-background' : 'bg-surface text-muted cursor-not-allowed'}`}
              >
                {canPurchase ? (
                  <>
                    <span className="absolute inset-0 w-full h-full bg-white/20 origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100" />
                    <span className="relative z-10 flex items-center gap-4">Add to Collection <Plus className="w-4 h-4" /></span>
                  </>
                ) : (
                  <span className="relative z-10">Configure Shopify Variant</span>
                )}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      <div className="w-full border-t border-white/5 py-32 px-8 md:px-16">
        <div className="max-w-[100rem] mx-auto flex flex-col items-center">
          <span className="text-muted font-sans text-[10px] uppercase tracking-[0.3em] mb-4 block text-center">Complementary Selection</span>
          <h2 className="text-4xl md:text-5xl font-cormorant font-light text-foreground leading-none mb-16 italic text-center">
            Frequently Bought Together
          </h2>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {recommendations.map((rec) => (
              <div key={rec.id} className="group flex flex-col">
                <Link href={`/product/${rec.handle}`} className="block relative overflow-hidden bg-surface aspect-[3/4] mb-6">
                  <OptimizedProductImage src={rec.images[0]} alt={rec.name} className="object-cover mix-blend-luminosity opacity-80 transition-transform duration-1000 group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
                </Link>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-muted font-sans text-[9px] uppercase tracking-[0.2em] mb-2 block">{rec.artisan}</span>
                    <Link href={`/product/${rec.handle}`} className="text-xl md:text-2xl font-cormorant text-foreground italic hover:opacity-70 transition-opacity">
                      {rec.name}
                    </Link>
                  </div>
                  <span className="font-sans text-xs tracking-widest text-foreground">RM{rec.price}</span>
                </div>
                <Link href={`/product/${rec.handle}`} className="mt-6 border-b border-white/20 pb-2 text-[10px] font-sans uppercase tracking-[0.2em] text-muted hover:text-foreground hover:border-foreground transition-colors w-fit">
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full bg-surface-hover border-t border-white/5 py-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-muted font-sans text-[10px] uppercase tracking-[0.3em] mb-4 block">Testimonials</span>
          <h2 className="text-5xl font-cormorant font-light text-foreground leading-none mb-16 italic">
            Curator Reviews
          </h2>

          <div className="w-full flex flex-col gap-12">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="border-b border-white/10 pb-12 last:border-0 last:pb-0 flex flex-col md:flex-row gap-8 md:gap-16">
                  <div className="w-full md:w-1/3 flex flex-col gap-2">
                    <span className="font-sans text-sm tracking-[0.2em] uppercase text-foreground">{review.author}</span>
                    <span className="font-sans text-[10px] text-muted tracking-widest">{review.date}</span>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-foreground text-foreground' : 'text-white/20'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <p className="font-cormorant text-2xl text-foreground/80 leading-relaxed italic">&quot;{review.text}&quot;</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full text-muted font-sans text-xs uppercase tracking-widest py-12 border-y border-white/5">
                No reviews recorded for this extract yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
