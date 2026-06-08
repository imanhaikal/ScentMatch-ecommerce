"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { OptimizedProductImage } from "@/components/OptimizedProductImage";
import { useAccountSession } from "@/hooks/useAccountSession";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function AccountPage() {
  const router = useRouter();
  const { account, status, error, refresh } = useAccountSession();
  const [feedbackOverrides, setFeedbackOverrides] = useState<Record<string, number>>({});
  const [pendingFeedback, setPendingFeedback] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const user = account?.user;
  const orders = account?.orders ?? [];
  const scentProfile = account?.scentProfile;

  useEffect(() => {
    if (status === "guest") router.replace("/login?next=/account");
  }, [router, status]);

  const handleFeedback = async (reference: string, rating: number) => {
    setPendingFeedback(reference);
    setFeedbackError(null);
    setFeedbackOverrides((state) => ({ ...state, [reference]: rating }));

    try {
      const response = await fetch(`/api/account/orders/${encodeURIComponent(reference)}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(payload.error ?? "Unable to record feedback.");

      await refresh();
    } catch (feedbackFailure) {
      setFeedbackOverrides((state) => {
        const nextState = { ...state };
        delete nextState[reference];
        return nextState;
      });
      setFeedbackError(feedbackFailure instanceof Error ? feedbackFailure.message : "Unable to record feedback.");
    } finally {
      setPendingFeedback(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/account/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (status === "loading" || status === "guest") {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <SiteHeader showSearch={false} />
        <div className="mx-auto max-w-3xl border border-white/10 bg-surface/30 p-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">Loading account dossier</p>
        </div>
      </main>
    );
  }

  if (status === "error" || !user) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <SiteHeader showSearch={false} />
        <div className="mx-auto max-w-3xl border border-red-500/30 bg-red-500/10 p-10 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-red-200">{error ?? "Unable to load account."}</p>
          <Link href="/login?next=/account" className="border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
            Sign in again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <SiteHeader showSearch={false} />
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-16">
            <div>
              <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-2 text-foreground">Dossier</h1>
              <p className="text-muted text-xs tracking-widest uppercase">Account Overview</p>
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
                Your saved profile, authenticated order history, and post-purchase feedback are connected to your ScentMatch account.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-xs text-muted tracking-widest uppercase mb-1">Client</p>
                <p className="text-lg text-foreground font-light">{user.name}</p>
                <p className="text-sm text-muted">{user.email}</p>
              </div>

              <div>
                <p className="text-xs text-muted tracking-widest uppercase mb-1">Status</p>
                <p className="text-sm text-foreground uppercase tracking-widest">{user.status}</p>
                <p className="text-xs text-muted mt-1">Since {user.memberSince}</p>
              </div>

              <div className="pt-8 border-t border-white/10">
                <button type="button" onClick={handleLogout} className="text-xs text-muted hover:text-foreground transition-colors tracking-widest uppercase border-b border-transparent hover:border-foreground pb-1">
                  Sign Out
                </button>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-xs text-muted tracking-widest uppercase mb-3">Saved Scent Profile</p>
                {scentProfile ? (
                  <>
                    <p className="text-sm text-foreground font-light leading-relaxed">{scentProfile.summary}</p>
                    <p className="text-xs text-muted mt-3 leading-relaxed">
                      {scentProfile.topMatch ? `Top match: ${scentProfile.topMatch.name} at ${scentProfile.topMatch.score}% affinity.` : "No top match was stored for this profile."}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted mt-3 leading-relaxed">Take the Scent Quiz while signed in to save your profile here.</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-8">
            <h2 className="text-xl font-light tracking-[0.2em] uppercase mb-12 text-foreground border-b border-white/10 pb-4">Acquisitions</h2>

            {feedbackError ? <p className="mb-8 border border-red-500/30 bg-red-500/10 p-4 text-xs uppercase tracking-[0.2em] text-red-200">{feedbackError}</p> : null}

            {orders.length === 0 ? (
              <div className="border border-white/10 bg-surface/30 p-8">
                <p className="mb-6 text-sm leading-relaxed tracking-wide text-muted">Authenticated checkout confirmations will appear here after purchase simulation.</p>
                <Link href="/shop" className="border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
                  Browse collection
                </Link>
              </div>
            ) : (
              <div className="space-y-12">
                {orders.map((order) => {
                  const recordedRating = feedbackOverrides[order.reference] ?? order.feedback?.rating;

                  return (
                    <motion.div key={order.reference} variants={itemVariants} className="group">
                      <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-white/5">
                        <div className="mb-4 md:mb-0">
                          <p className="text-sm text-foreground tracking-widest uppercase mb-1">{order.reference}</p>
                          <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString("en-MY", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-sm text-foreground tracking-widest uppercase mb-1">RM{order.pricing.total.toFixed(2)}</p>
                          <p className="text-xs text-muted">Confirmation issued</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {order.items.map((item) => (
                          <div key={`${order.reference}-${item.id}`} className="flex gap-6 items-center">
                            <div className="w-20 h-24 bg-surface overflow-hidden relative grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                              <OptimizedProductImage src={item.image} alt={item.name} className="object-cover" sizes="5rem" />
                            </div>
                            <div>
                              <p className="text-sm text-foreground uppercase tracking-widest mb-1">{item.name}</p>
                              <p className="text-xs text-muted uppercase tracking-widest">{item.artisan} x {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 border border-white/10 p-5">
                        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted">14-day match feedback</p>
                        {recordedRating ? (
                          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Recorded {recordedRating}/5 for algorithm weighting.</p>
                        ) : (
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => void handleFeedback(order.reference, rating)}
                                disabled={pendingFeedback === order.reference}
                                className="h-9 w-9 border border-white/10 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground disabled:cursor-wait disabled:opacity-50"
                                aria-label={`Rate ${order.reference} ${rating} out of 5`}
                              >
                                {rating}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
