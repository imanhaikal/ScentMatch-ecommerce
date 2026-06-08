"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { calculateCartPricing } from "@/lib/cart/pricing";
import { createPrototypeOrder, PROTOTYPE_ORDER_STORAGE_KEY } from "@/lib/checkout/order";
import { trackEvent } from "@/lib/analytics";
import { useCartStore } from "@/store/useCartStore";

const PROMO_STORAGE_KEY = "scentmatch:promo:v1";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("Card ending 4242");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const promoCode = useSyncExternalStore(
    () => () => undefined,
    () => window.sessionStorage.getItem(PROMO_STORAGE_KEY) ?? "",
    () => "",
  );
  const pricing = calculateCartPricing(items, promoCode);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const order = createPrototypeOrder({
        items,
        promoCode,
        billingSameAsShipping,
        paymentMethod,
        shipping: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          address: String(formData.get("address") ?? ""),
          city: String(formData.get("city") ?? ""),
          postcode: String(formData.get("postcode") ?? ""),
          country: String(formData.get("country") ?? ""),
        },
      });

      window.sessionStorage.setItem(PROTOTYPE_ORDER_STORAGE_KEY, JSON.stringify(order));
      trackEvent("checkout_started", { order_reference: order.reference, value: order.pricing.total });
      clearCart();
      router.push("/checkout/success");
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to create prototype order.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background font-sans pt-32">
      <SiteHeader showSearch={false} />
      <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-16 px-8 pb-32 pt-12 md:px-16 lg:grid-cols-12">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:col-span-7"
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-muted">Secure prototype flow</p>
          <h1 className="mb-12 font-cormorant text-6xl font-light italic leading-none text-foreground md:text-8xl">Checkout Simulation</h1>

          {items.length === 0 ? (
            <div className="border border-white/10 bg-surface/40 p-10">
              <h2 className="mb-4 font-cormorant text-4xl italic text-foreground">No active cart</h2>
              <p className="mb-8 max-w-lg text-sm leading-relaxed tracking-wide text-muted">
                Add a fragrance before creating a local order confirmation. The success route remains available for demo playback after checkout.
              </p>
              <Link href="/shop" className="border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
                Return to collection
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <CheckoutPanel eyebrow="Step 01" title="Shipping dossier">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CheckoutInput name="name" label="Full name" autoComplete="name" />
                  <CheckoutInput name="email" label="Email" type="email" autoComplete="email" />
                  <CheckoutInput name="address" label="Address" autoComplete="street-address" className="md:col-span-2" />
                  <CheckoutInput name="city" label="City" autoComplete="address-level2" />
                  <CheckoutInput name="postcode" label="Postcode" autoComplete="postal-code" />
                  <CheckoutInput name="country" label="Country" autoComplete="country-name" defaultValue="Malaysia" />
                </div>
              </CheckoutPanel>

              <CheckoutPanel eyebrow="Step 02" title="Billing alignment">
                <label className="flex items-center justify-between gap-6 border border-white/10 p-5 text-xs uppercase tracking-[0.2em] text-foreground">
                  Billing address matches shipping dossier
                  <input
                    type="checkbox"
                    name="billingSameAsShipping"
                    checked={billingSameAsShipping}
                    onChange={(event) => setBillingSameAsShipping(event.target.checked)}
                    className="h-4 w-4 accent-white"
                  />
                </label>
                {!billingSameAsShipping ? <CheckoutInput name="billingAddress" label="Billing address" autoComplete="billing street-address" required={false} /> : null}
              </CheckoutPanel>

              <CheckoutPanel eyebrow="Step 03" title="Payment simulation">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {["Card ending 4242", "FPX Online Banking", "Shopify payment handoff"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      aria-pressed={paymentMethod === method}
                      className={`border p-5 text-left text-[10px] uppercase tracking-[0.2em] transition-colors ${paymentMethod === method ? "border-foreground text-foreground" : "border-white/10 text-muted hover:border-white/30 hover:text-foreground"}`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
                <p className="text-xs leading-relaxed tracking-wide text-muted">
                  No payment credentials are collected in this prototype. Production payment authorization remains delegated to Shopify checkout.
                </p>
              </CheckoutPanel>

              {error ? <p ref={errorRef} tabIndex={-1} className="border border-red-500/30 bg-red-500/10 p-4 text-xs uppercase tracking-[0.2em] text-red-200">{error}</p> : null}

              <button type="submit" disabled={isSubmitting} className="group flex w-full items-center justify-between bg-foreground px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] text-background disabled:cursor-wait disabled:opacity-70">
                {isSubmitting ? "Creating confirmation" : "Create local confirmation"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </button>
            </form>
          )}
        </motion.section>

        <aside className="lg:col-span-5">
          <div className="sticky top-32 border border-white/10 bg-surface/40 p-8">
            <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-muted">Order calculation</p>
            <div className="mb-8 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-6 border-b border-white/5 pb-4">
                  <div>
                    <p className="font-cormorant text-2xl italic text-foreground">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{item.artisan} x {item.quantity}</p>
                  </div>
                  <p className="text-xs tracking-widest text-foreground">RM{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <PriceRows pricing={pricing} />
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}

function CheckoutPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border border-white/10 bg-background/60 p-6 md:p-8">
      <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
      <h2 className="mb-8 font-cormorant text-4xl italic text-foreground">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function CheckoutInput({ name, label, type = "text", defaultValue = "", className = "", required = true, autoComplete }: { name: string; label: string; type?: string; defaultValue?: string; className?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-3 block text-[10px] uppercase tracking-[0.25em] text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="w-full rounded-none border-b border-white/20 bg-transparent pb-4 text-sm tracking-wide text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}

function PriceRows({ pricing }: { pricing: ReturnType<typeof calculateCartPricing> }) {
  const rows = [
    ["Subtotal", pricing.subtotal],
    ["Promo", -pricing.discount],
    ["Estimated tax", pricing.tax],
    ["Shipping", pricing.shipping],
  ] as const;

  return (
    <div className="space-y-3 text-xs uppercase tracking-[0.2em]">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between text-muted">
          <span>{label}</span>
          <span>{value < 0 ? "-" : ""}RM{Math.abs(value).toFixed(2)}</span>
        </div>
      ))}
      <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-foreground">
        <span>Total</span>
        <span>RM{pricing.total.toFixed(2)}</span>
      </div>
      <p className="pt-4 text-[9px] leading-relaxed tracking-[0.2em] text-muted">{pricing.promo.message}</p>
    </div>
  );
}
