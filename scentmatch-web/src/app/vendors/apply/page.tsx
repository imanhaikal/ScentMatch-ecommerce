"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";

const fields = [
  ["brandName", "Brand name"],
  ["founder", "Founder"],
  ["email", "Email"],
  ["location", "Atelier location"],
  ["capacity", "Monthly production capacity"],
  ["concentration", "Primary concentration"],
  ["signatureNotes", "Signature notes"],
] as const;

export default function VendorApplyPage() {
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(fields.map(([name]) => [name, String(formData.get(name) ?? "")]));
    trackEvent("vendor_application_started", { brand_name: payload.brandName });

    const response = await fetch("/api/vendor/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { reference?: string; error?: string };

    if (!response.ok || !data.reference) {
      setError(data.error ?? "Unable to submit application.");
      return;
    }

    setReference(data.reference);
    setError(null);
    trackEvent("vendor_application_submitted", { reference: data.reference });
  };

  return (
    <main className="min-h-screen bg-background pt-32 font-sans">
      <SiteHeader />
      <section className="mx-auto grid max-w-[100rem] grid-cols-1 gap-16 px-8 py-24 md:px-16 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-muted">B2B atelier portal</p>
          <h1 className="mb-10 font-cormorant text-6xl font-light italic leading-none text-foreground md:text-8xl">Join the Archive</h1>
          <p className="mb-12 max-w-lg text-sm leading-relaxed tracking-wide text-muted">
            ScentMatch aggregates local perfumers through a curated Shopify storefront and a prototype vendor portal. Approved artisans map top, heart, and base notes so the ScentMatch engine can recommend their work with measurable fit.
          </p>
          <div className="grid grid-cols-1 gap-4 text-xs uppercase tracking-[0.2em] text-muted">
            {["15-20% transparent platform commission", "Scent mapping for algorithmic discovery", "Dashboard preview for sales and payout tracking"].map((item) => (
              <div key={item} className="border border-white/10 p-5">{item}</div>
            ))}
          </div>
        </motion.div>
        <div className="lg:col-span-7">
          {reference ? (
            <div className="border border-white/10 bg-surface/40 p-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted">Application received</p>
              <h2 className="mb-6 font-cormorant text-5xl italic text-foreground">{reference}</h2>
              <p className="mb-8 text-sm leading-relaxed tracking-wide text-muted">
                The curator team will review production capacity, note mapping quality, and brand fit. Use the dashboard preview to demonstrate commission and scent-mapping logic.
              </p>
              <Link href="/vendor/dashboard" className="inline-flex items-center gap-3 border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
                Open dashboard preview <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 border border-white/10 bg-surface/30 p-8 md:grid-cols-2">
              {fields.map(([name, label]) => (
                <label key={name} className={name === "signatureNotes" ? "md:col-span-2" : ""}>
                  <span className="mb-3 block text-[10px] uppercase tracking-[0.25em] text-muted">{label}</span>
                  <input
                    name={name}
                    type={name === "email" ? "email" : "text"}
                    required
                    className="w-full rounded-none border-b border-white/20 bg-transparent pb-4 text-sm text-foreground outline-none focus:border-foreground"
                  />
                </label>
              ))}
              {error ? <p className="md:col-span-2 text-xs uppercase tracking-[0.2em] text-red-200">{error}</p> : null}
              <button type="submit" className="md:col-span-2 flex items-center justify-between bg-foreground px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] text-background">
                Submit artisan application <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
