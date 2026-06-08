"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { PROTOTYPE_ORDER_STORAGE_KEY, type PrototypeOrderSummary } from "@/lib/checkout/order";
import { trackEvent } from "@/lib/analytics";

function readStoredOrder(): PrototypeOrderSummary | null {
  if (typeof window === "undefined") return null;

  const rawOrder = window.sessionStorage.getItem(PROTOTYPE_ORDER_STORAGE_KEY);
  if (!rawOrder) return null;

  try {
    return JSON.parse(rawOrder) as PrototypeOrderSummary;
  } catch {
    return null;
  }
}

export default function CheckoutSuccessPage() {
  const [order] = useState<PrototypeOrderSummary | null>(readStoredOrder);

  useEffect(() => {
    if (!order) return;

    trackEvent("purchase_simulated", { order_reference: order.reference, value: order.pricing.total });
  }, [order]);

  return (
    <main className="min-h-screen bg-background pt-32 font-sans">
      <SiteHeader showSearch={false} />
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="mx-auto max-w-5xl px-8 pb-32 pt-16 md:px-16"
      >
        <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted">Order confirmation</p>
        <h1 className="mb-10 text-center font-cormorant text-6xl font-light italic leading-none text-foreground md:text-8xl">Acquisition Recorded</h1>
        <div className="border border-white/10 bg-surface/40 p-8 md:p-12">
          <div className="mb-10 flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-muted">Reference</p>
              <p className="font-cormorant text-4xl italic text-foreground">{order?.reference ?? "SM-DEMO-PENDING"}</p>
            </div>
            <div className="md:text-right">
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-muted">Status</p>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Prototype confirmation issued</p>
            </div>
          </div>

          {order ? (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <section>
                <h2 className="mb-5 font-cormorant text-3xl italic text-foreground">Delivery Dossier</h2>
                <p className="text-sm leading-relaxed tracking-wide text-muted">
                  {order.shipping.name}<br />
                  {order.customerEmail}<br />
                  {order.shipping.address}, {order.shipping.city} {order.shipping.postcode}<br />
                  {order.shipping.country}
                </p>
              </section>
              <section>
                <h2 className="mb-5 font-cormorant text-3xl italic text-foreground">Summary</h2>
                <div className="space-y-3 text-xs uppercase tracking-[0.2em] text-muted">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-6">
                      <span>{item.name} x {item.quantity}</span>
                      <span>RM{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-white/10 pt-4 text-foreground">
                    <span>Total</span>
                    <span>RM{order.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <p className="text-center text-sm leading-relaxed tracking-wide text-muted">
              No local order was found in this browser session. This route remains available as the demo confirmation destination after checkout simulation.
            </p>
          )}

          <p className="mt-10 border-t border-white/10 pt-8 text-xs leading-relaxed tracking-wide text-muted">
            Payment credentials are never stored in ScentMatch. Production authorization is completed through Shopify checkout; this local confirmation exists for prototype evaluation and demo continuity.
          </p>
          <Link href="/shop" className="mt-8 block w-fit border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
            Return to collection
          </Link>
        </div>
      </motion.section>
      <Footer />
    </main>
  );
}
