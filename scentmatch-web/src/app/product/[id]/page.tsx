"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Star, Minus } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "@/components/PremiumUI";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem, openCart, items } = useCartStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      router.push("/shop");
    }
  }, [id, router]);

  if (!product) return null;

  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = () => {
    // Add multiple quantities by calling addItem multiple times or just passing it
    // Wait, the store signature is: addItem: (item: Omit<CartItem, 'quantity'>) => void
    // And it internally increments by 1. I can just call it multiple times, or we can just add 1 and open cart.
    // Let's loop if user selected > 1
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        artisan: product.artisan,
        price: product.price,
        image: product.images[0],
        notes: product.notes
      });
    }
    openCart();
  };

  return (
    <main className="min-h-screen bg-background font-sans flex flex-col pt-32">
      {/* Header */}
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
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000"
              />
            </AnimatePresence>
          </motion.div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-32 bg-surface overflow-hidden border transition-colors duration-300 ${activeImage === idx ? 'border-foreground' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-luminosity" />
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
            <div className="space-y-4 mb-10">
              <span className="font-cormorant text-2xl italic text-foreground block mb-4">Acquisition Model</span>
              <fieldset className="flex flex-col gap-3">
                <legend className="sr-only">Choose a pricing model</legend>
                <label className="relative flex items-center justify-between p-5 border border-foreground cursor-pointer group transition-colors bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                    <span className="font-sans text-xs uppercase tracking-widest text-foreground">One-Time Acquisition</span>
                  </div>
                  <span className="font-sans text-xs tracking-widest text-foreground">RM{product.price}</span>
                  <input type="radio" name="pricingModel" value="one-time" defaultChecked className="sr-only" />
                </label>
                <label className="relative flex items-center justify-between p-5 border border-white/10 cursor-pointer group hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-transparent border border-muted group-hover:border-foreground transition-colors" />
                    <div className="flex flex-col">
                      <span className="font-sans text-xs uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">Curator's Allocation</span>
                      <span className="font-cormorant italic text-sm text-muted group-hover:text-foreground transition-colors">Replenish every 3 months</span>
                    </div>
                  </div>
                  <span className="font-sans text-xs tracking-widest text-muted group-hover:text-foreground transition-colors">RM{Math.round(product.price * 0.85)}</span>
                  <input type="radio" name="pricingModel" value="subscription" className="sr-only" />
                </label>
              </fieldset>
            </div>

            {/* Olfactive Pyramid */}
            <div className="space-y-4 mb-12">
              <span className="font-cormorant text-2xl italic text-foreground block mb-6">Olfactive Pyramid</span>
              <div className="flex justify-between border-b border-white/10 pb-4 text-xs font-sans tracking-[0.2em] uppercase">
                <span className="text-muted">Top</span><span className="text-foreground">{product.notes.top}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4 text-xs font-sans tracking-[0.2em] uppercase">
                <span className="text-muted">Heart</span><span className="text-foreground">{product.notes.heart}</span>
              </div>
              <div className="flex justify-between text-xs font-sans tracking-[0.2em] uppercase">
                <span className="text-muted">Base</span><span className="text-foreground">{product.notes.base}</span>
              </div>
            </div>

            {/* Add to Cart Action */}
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-muted">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </span>
                
                {product.stock > 0 && (
                  <div className="flex items-center gap-6 border border-white/20 rounded-full px-4 py-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted hover:text-foreground transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="font-sans text-xs tracking-widest">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-muted hover:text-foreground transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                )}
              </div>

              <MagneticButton
                onClick={handleAddToCart}
                className={`w-full max-w-full box-border group relative overflow-hidden uppercase tracking-widest py-6 px-4 font-sans text-xs font-bold flex items-center justify-center transition-colors duration-500 ${product.stock > 0 ? 'bg-foreground text-background' : 'bg-surface text-muted cursor-not-allowed'}`}
              >
                {product.stock > 0 ? (
                  <>
                    <span className="absolute inset-0 w-full h-full bg-white/20 origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100" />
                    <span className="relative z-10 flex items-center gap-4">Add to Collection <Plus className="w-4 h-4" /></span>
                  </>
                ) : (
                  <span className="relative z-10">Archive Unavailable</span>
                )}
              </MagneticButton>
            </div>
          </motion.div>
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
                    <p className="font-cormorant text-2xl text-foreground/80 leading-relaxed italic">"{review.text}"</p>
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