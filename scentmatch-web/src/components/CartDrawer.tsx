"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "./PremiumUI";

export const CartDrawer = () => {
  const { isOpen, closeCart, items, updateQuantity, removeItem, total } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // If we close the drawer, reset checkout state after a delay
  const handleClose = () => {
    closeCart();
    setTimeout(() => setIsCheckingOut(false), 500);
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
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-background border-l border-white/5 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                {isCheckingOut ? "Secure Checkout" : "Your Selection"}
              </span>
              <button
                onClick={handleClose}
                className="text-foreground/50 hover:text-foreground transition-colors group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6 relative custom-scrollbar">
              <AnimatePresence mode="wait">
                {!isCheckingOut ? (
                  <motion.div
                    key="cart-items"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-8 h-full"
                  >
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                        <span className="font-cormorant text-2xl italic mb-4">Emptiness</span>
                        <span className="font-sans text-[10px] uppercase tracking-widest">No selections made</span>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div key={item.id} className="flex gap-6 group">
                          <div className="w-20 h-28 bg-surface overflow-hidden relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-col justify-between flex-1 py-1">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-cormorant text-xl text-foreground group-hover:italic transition-all">{item.name}</h4>
                                <span className="font-sans text-xs tracking-widest">RM{item.price * item.quantity}</span>
                              </div>
                              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted block mt-1">
                                {item.artisan}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-4 border border-white/10 rounded-full px-3 py-1">
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
                      ))
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="checkout-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-8"
                  >
                    <div className="space-y-6">
                      <h3 className="font-cormorant text-2xl italic">Shipping Information</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-transparent border-b border-white/20 pb-3 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full bg-transparent border-b border-white/20 pb-3 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Shipping Address"
                          className="w-full bg-transparent border-b border-white/20 pb-3 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-6 mt-4">
                      <h3 className="font-cormorant text-2xl italic">Payment Method</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full bg-transparent border-b border-white/20 pb-3 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full bg-transparent border-b border-white/20 pb-3 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="w-full bg-transparent border-b border-white/20 pb-3 font-sans text-xs tracking-widest uppercase placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-background z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">Subtotal</span>
                <span className="font-sans text-sm tracking-widest">RM{total.toFixed(2)}</span>
              </div>
              
              {!isCheckingOut ? (
                <MagneticButton
                  onClick={() => setIsCheckingOut(true)}
                  className={`w-full group relative bg-foreground text-background overflow-hidden uppercase tracking-[0.2em] py-5 font-sans text-xs font-bold flex items-center justify-center gap-4 ${items.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                  <span className="relative z-10 group-hover:text-foreground transition-colors duration-500 flex items-center justify-between w-full px-4">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </MagneticButton>
              ) : (
                <div className="flex flex-col gap-4">
                  <MagneticButton
                    onClick={() => {
                      alert("Order placed successfully!");
                      closeCart();
                      useCartStore.getState().clearCart();
                    }}
                    className="w-full group relative bg-foreground text-background overflow-hidden uppercase tracking-[0.2em] py-5 font-sans text-xs font-bold flex items-center justify-center gap-4"
                  >
                    <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                    <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">
                      Confirm Purchase
                    </span>
                  </MagneticButton>
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="font-sans text-[9px] uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors py-2"
                  >
                    Return to Cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
