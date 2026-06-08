"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "./PremiumUI";
import { calculateCartPricing } from "@/lib/cart/pricing";
import { trackEvent } from "@/lib/analytics";
import { OptimizedProductImage } from "@/components/OptimizedProductImage";

const PROMO_STORAGE_KEY = "scentmatch:promo:v1";
const SHOPIFY_DEMO_ERROR = "Shopify checkout needs live demo products and Storefront API configuration. Use the local checkout simulation for this prototype cart.";
const FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

export const CartDrawer = () => {
  const router = useRouter();
  const { isOpen, closeCart, items, updateQuantity, removeItem, setShopifyCart } = useCartStore();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "processing">("cart");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [activePromo, setActivePromo] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const pricing = calculateCartPricing(items, activePromo);
  const canUseShopifyCheckout = items.length > 0 && items.every((item) => item.variantId.startsWith("gid://shopify/ProductVariant/"));

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCheckoutStep("cart");
        setCheckoutError(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
      return;
    }

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (checkoutStep !== "processing") closeCart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [checkoutStep, closeCart, isOpen]);

  const handleClose = () => {
    if (checkoutStep === "processing") return; // Prevent closing during processing
    closeCart();
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => element.offsetParent !== null,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!canUseShopifyCheckout) {
      setCheckoutError("Shopify checkout requires live Shopify variant IDs. Use the local checkout simulation for fallback demo products.");
      return;
    }

    setCheckoutStep("processing");
    setCheckoutError(null);
    trackEvent("shopify_checkout_started", { value: pricing.total, items: items.length });

    try {
      const response = await fetch("/api/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
        }),
      });
      const payload = (await response.json()) as { cart?: { id: string; checkoutUrl: string }; error?: string };

      if (!response.ok || !payload.cart) {
        throw new Error(payload.error || SHOPIFY_DEMO_ERROR);
      }

      setShopifyCart(payload.cart);
      trackEvent("shopify_checkout_created", { value: pricing.total, items: items.length });
      window.location.href = payload.cart.checkoutUrl;
    } catch (error) {
      const message = error instanceof Error ? error.message : SHOPIFY_DEMO_ERROR;
      setCheckoutError(message.includes("SHOPIFY_") || message.includes("Shopify Storefront") ? SHOPIFY_DEMO_ERROR : message);
      setCheckoutStep("cart");
    }
  };

  const handleApplyPromo = () => {
    setActivePromo(promoInput);
    const nextPricing = calculateCartPricing(items, promoInput);

    if (nextPricing.promo.isApplied) {
      window.sessionStorage.setItem(PROMO_STORAGE_KEY, nextPricing.promo.code);
      trackEvent("promo_applied", { code: nextPricing.promo.code, discount: nextPricing.discount });
    } else {
      window.sessionStorage.removeItem(PROMO_STORAGE_KEY);
    }
  };

  const handlePrototypeCheckout = () => {
    if (items.length === 0) return;

    if (pricing.promo.isApplied) {
      window.sessionStorage.setItem(PROMO_STORAGE_KEY, pricing.promo.code);
    }

    trackEvent("checkout_started", { checkout_type: "local_simulation", value: pricing.total, items: items.length });
    closeCart();
    router.push("/checkout");
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
            className="fixed top-0 right-0 h-dvh w-full md:w-[480px] bg-background border-l border-white/10 z-[101] flex flex-col shadow-2xl overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            onKeyDown={handleDialogKeyDown}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-background z-20">
              <div className="flex flex-col gap-1">
                <span id="cart-drawer-title" className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                  {checkoutStep === "cart" ? "Your Selection" : "Shopify Checkout"}
                </span>
                <span className="flex items-center gap-2 font-sans text-[8px] uppercase tracking-widest text-emerald-500">
                  Secure payment handled by Shopify
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close cart"
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
                    className="h-full overflow-y-auto px-8 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))]"
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
                              <OptimizedProductImage
                                src={item.image}
                                alt={item.name}
                                className="object-cover mix-blend-luminosity opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100"
                                sizes="6rem"
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
                                    aria-label={`Decrease quantity for ${item.name}`}
                                    className="text-muted hover:text-foreground transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-sans text-[10px] tracking-widest">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    aria-label={`Increase quantity for ${item.name}`}
                                    className="text-muted hover:text-foreground transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  aria-label={`Remove ${item.name} from cart`}
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
              </AnimatePresence>

              {/* CHECKOUT HANDOFF OVERLAY */}
              <AnimatePresence>
                {checkoutStep === "processing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background z-50 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 border-t border-l border-foreground rounded-full motion-safe:animate-spin mb-8"
                    />
                    <h2 className="font-cormorant text-4xl text-foreground italic mb-4 animate-pulse">Opening Checkout</h2>
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">Creating a secure Shopify checkout session</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {checkoutStep !== "processing" && (
              <div className="p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] border-t border-white/5 bg-background z-20">
                {checkoutError && (
                  <div className="mb-6 border border-red-500/30 bg-red-500/10 p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-red-200">
                    {checkoutError}
                  </div>
                )}

                <div className="mb-6 border border-white/10 p-4">
                  <label htmlFor="promo-code" className="mb-3 block font-sans text-[9px] uppercase tracking-[0.3em] text-muted">
                    Prototype promo code
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="promo-code"
                      name="promoCode"
                      value={promoInput}
                      onChange={(event) => setPromoInput(event.target.value)}
                      placeholder="SCENT20"
                      className="min-w-0 flex-1 rounded-none border-b border-white/20 bg-transparent pb-2 font-sans text-xs uppercase tracking-[0.2em] text-foreground outline-none placeholder:text-muted/40 focus:border-foreground"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="border border-white/10 px-4 py-2 font-sans text-[9px] uppercase tracking-[0.2em] text-foreground hover:border-foreground"
                    >
                      Apply
                    </button>
                  </div>
                  <p className={`mt-3 font-sans text-[9px] uppercase tracking-[0.18em] ${pricing.promo.isApplied ? "text-emerald-300" : "text-muted"}`}>
                    {pricing.promo.message}
                  </p>
                </div>

                <div className="mb-6 space-y-3 font-sans text-[10px] uppercase tracking-[0.25em]">
                  <div className="flex justify-between text-muted"><span>Subtotal</span><span>RM{pricing.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-muted"><span>Promo</span><span>-RM{pricing.discount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-muted"><span>Estimated tax</span><span>RM{pricing.tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-muted"><span>Shipping</span><span>{pricing.shipping === 0 ? "Included" : `RM${pricing.shipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-4 text-foreground">
                    <span>Estimated Total</span><span>RM{pricing.total.toFixed(2)}</span>
                  </div>
                  <p className="pt-1 text-[8px] leading-relaxed text-muted">Final taxes, discounts, and payment authorization are confirmed by Shopify checkout in production.</p>
                </div>

                <MagneticButton
                  onClick={handlePrototypeCheckout}
                  disabled={items.length === 0}
                  className={`mb-4 w-full group relative bg-foreground text-background overflow-hidden uppercase tracking-[0.2em] py-6 font-sans text-xs font-bold flex items-center justify-center gap-4 ${items.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                  <span className="relative z-10 group-hover:text-foreground transition-colors duration-500 flex items-center justify-between w-full px-4">
                    <span>Continue to Checkout Simulation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </MagneticButton>
                 
                <MagneticButton
                  onClick={handleCheckout}
                  className={`w-full group relative border border-white/20 text-foreground overflow-hidden uppercase tracking-[0.2em] py-5 font-sans text-[10px] font-bold flex items-center justify-center gap-4 ${!canUseShopifyCheckout ? 'opacity-50' : ''}`}
                >
                  <span className="absolute inset-0 w-full h-full bg-foreground origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
                  <span className="relative z-10 group-hover:text-background transition-colors duration-500 flex items-center justify-between w-full px-4">
                    <span>{canUseShopifyCheckout ? "Proceed to Shopify Checkout" : "Shopify handoff requires live variants"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </MagneticButton>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
