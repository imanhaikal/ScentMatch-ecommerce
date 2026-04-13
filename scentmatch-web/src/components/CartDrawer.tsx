"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ArrowRight, Lock } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "./PremiumUI";

export const CartDrawer = () => {
  const { isOpen, closeCart, items, updateQuantity, removeItem, total } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "processing" | "success">("cart");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCheckoutStep("cart");
        setIsCheckingOut(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (checkoutStep === "processing") return; // Prevent closing during processing
    closeCart();
  };

  const handleCheckout = () => {
    setCheckoutStep("processing");
    
    // Simulate API call and processing
    setTimeout(() => {
      setCheckoutStep("success");
      
      setTimeout(() => {
        useCartStore.getState().clearCart();
        closeCart();
      }, 2500);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-background border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-background z-20">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                  {checkoutStep === "form" ? "Secure Checkout" : checkoutStep === "cart" ? "Your Selection" : "Transaction"}
                </span>
                {checkoutStep === "form" && (
                  <span className="flex items-center gap-2 font-sans text-[8px] uppercase tracking-widest text-emerald-500">
                    <Lock className="w-3 h-3" /> Encrypted Session
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                disabled={checkoutStep === "processing"}
                className="text-foreground/50 hover:text-foreground transition-colors group disabled:opacity-0"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative custom-scrollbar">
              <AnimatePresence mode="wait">
                {/* CART VIEW */}
                {checkoutStep === "cart" && (
                  <motion.div
                    key="cart-items"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full overflow-y-auto px-8 py-8"
                  >
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                        <span className="font-cormorant text-3xl italic mb-4">Emptiness</span>
                        <span className="font-sans text-[10px] uppercase tracking-widest">No selections made</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-10">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-6 group">
                            <div className="w-24 h-32 bg-surface overflow-hidden relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex flex-col justify-between flex-1 py-1">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h4 className="font-cormorant text-2xl text-foreground group-hover:italic transition-all">{item.name}</h4>
                                  <span className="font-sans text-xs tracking-widest">RM{item.price * item.quantity}</span>
                                </div>
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted block mt-1">
                                  {item.artisan}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center gap-5 border border-white/10 rounded-none px-4 py-2">
                                  <button
                                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                                    className="text-muted hover:text-foreground transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-sans text-[10px] tracking-widest">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-muted hover:text-foreground transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted hover:text-foreground border-b border-transparent hover:border-foreground transition-all pb-[1px]"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* FORM VIEW */}
                {checkoutStep === "form" && (
                  <motion.div
                    key="checkout-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full overflow-y-auto px-8 py-8 flex flex-col gap-12"
                  >
                    <div className="space-y-8">
                      <h3 className="font-cormorant text-3xl italic border-b border-white/10 pb-4">Shipping Protocol</h3>
                      <div className="space-y-6">
                        <div className="relative group">
                          <input type="text" id="fname" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 font-sans text-xs tracking-widest uppercase placeholder:text-transparent peer focus:outline-none focus:border-foreground transition-colors" placeholder="Full Name" />
                          <label htmlFor="fname" className="absolute left-0 top-0 font-sans text-[9px] uppercase tracking-[0.2em] text-muted peer-focus:text-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs transition-all pointer-events-none">Full Name</label>
                        </div>
                        <div className="relative group">
                          <input type="email" id="email" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 font-sans text-xs tracking-widest uppercase placeholder:text-transparent peer focus:outline-none focus:border-foreground transition-colors" placeholder="Email Address" />
                          <label htmlFor="email" className="absolute left-0 top-0 font-sans text-[9px] uppercase tracking-[0.2em] text-muted peer-focus:text-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs transition-all pointer-events-none">Email Address</label>
                        </div>
                        <div className="relative group">
                          <input type="text" id="address" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 font-sans text-xs tracking-widest uppercase placeholder:text-transparent peer focus:outline-none focus:border-foreground transition-colors" placeholder="Shipping Address" />
                          <label htmlFor="address" className="absolute left-0 top-0 font-sans text-[9px] uppercase tracking-[0.2em] text-muted peer-focus:text-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs transition-all pointer-events-none">Shipping Address</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <h3 className="font-cormorant text-3xl italic border-b border-white/10 pb-4">Financial Tender</h3>
                      <div className="space-y-6">
                        <div className="relative group">
                          <input type="text" id="card" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 font-sans text-xs tracking-widest uppercase placeholder:text-transparent peer focus:outline-none focus:border-foreground transition-colors" placeholder="Card Number" />
                          <label htmlFor="card" className="absolute left-0 top-0 font-sans text-[9px] uppercase tracking-[0.2em] text-muted peer-focus:text-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs transition-all pointer-events-none">Card Number</label>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="relative group">
                            <input type="text" id="exp" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 font-sans text-xs tracking-widest uppercase placeholder:text-transparent peer focus:outline-none focus:border-foreground transition-colors" placeholder="MM/YY" />
                            <label htmlFor="exp" className="absolute left-0 top-0 font-sans text-[9px] uppercase tracking-[0.2em] text-muted peer-focus:text-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs transition-all pointer-events-none">MM/YY</label>
                          </div>
                          <div className="relative group">
                            <input type="text" id="cvc" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 font-sans text-xs tracking-widest uppercase placeholder:text-transparent peer focus:outline-none focus:border-foreground transition-colors" placeholder="CVC" />
                            <label htmlFor="cvc" className="absolute left-0 top-0 font-sans text-[9px] uppercase tracking-[0.2em] text-muted peer-focus:text-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs transition-all pointer-events-none">CVC</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OVERLAYS FOR PROCESSING AND SUCCESS */}
              <AnimatePresence>
                {checkoutStep === "processing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background z-50 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 border-t border-l border-foreground rounded-full animate-spin mb-8"
                    />
                    <h2 className="font-cormorant text-4xl text-foreground italic mb-4 animate-pulse">Authenticating</h2>
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">Encrypting transaction via secure channels</p>
                  </motion.div>
                )}
                {checkoutStep === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-foreground text-background z-50 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-background text-foreground rounded-full flex items-center justify-center mb-8"
                    >
                      <Lock className="w-8 h-8" />
                    </motion.div>
                    <h2 className="font-cormorant text-4xl italic mb-4">Transaction Complete</h2>
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-70">Welcome to the Scentmatch Collection</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {checkoutStep !== "processing" && checkoutStep !== "success" && (
              <div className="p-8 border-t border-white/5 bg-background z-20">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">Total Commitment</span>
                  <span className="font-sans text-xl tracking-widest leading-none">RM{total.toFixed(2)}</span>
                </div>
                
                {checkoutStep === "cart" ? (
                  <MagneticButton
                    onClick={() => setCheckoutStep("form")}
                    className={`w-full group relative bg-foreground text-background overflow-hidden uppercase tracking-[0.2em] py-6 font-sans text-xs font-bold flex items-center justify-center gap-4 ${items.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                    <span className="relative z-10 group-hover:text-foreground transition-colors duration-500 flex items-center justify-between w-full px-4">
                      <span>Initiate Acquisition</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </span>
                  </MagneticButton>
                ) : (
                  <div className="flex flex-col gap-4">
                    <MagneticButton
                      onClick={handleCheckout}
                      className="w-full group relative bg-foreground text-background overflow-hidden uppercase tracking-[0.2em] py-6 font-sans text-xs font-bold flex items-center justify-center gap-4"
                    >
                      <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                      <span className="relative z-10 group-hover:text-foreground transition-colors duration-500 flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 bg-background group-hover:bg-foreground rounded-full animate-pulse transition-colors" />
                        Finalize Authorization
                      </span>
                    </MagneticButton>
                    <button
                      onClick={() => setCheckoutStep("cart")}
                      className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors py-3 border border-transparent hover:border-white/10"
                    >
                      Return to Selections
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
