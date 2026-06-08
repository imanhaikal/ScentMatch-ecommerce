"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { SiteHeader } from "@/components/SiteHeader";
import { OptimizedProductImage } from "@/components/OptimizedProductImage";

// Dummy data
const user = {
  name: "Alexander Pierce",
  email: "alexander@example.com",
  memberSince: "2024",
  status: "Privé Member"
};

const orders = [
  {
    id: "ORD-0892",
    date: "Oct 12, 2024",
    status: "Delivered",
    total: 285,
    items: [PRODUCTS[0]], 
  },
  {
    id: "ORD-0741",
    date: "Aug 04, 2024",
    status: "Delivered",
    total: 310,
    items: [PRODUCTS[1]], 
  }
];

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
    transition: { duration: 0.8, ease: "easeOut" as const }
  },
};

export default function AccountPage() {
  const [feedback, setFeedback] = React.useState<Record<string, number>>({});

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <SiteHeader showSearch={false} />
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          {/* Header & Profile Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-16">
            <div>
              <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-2 text-foreground">
                Dossier
              </h1>
              <p className="text-muted text-xs tracking-widest uppercase">
                Prototype Account Overview
              </p>
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
                This dashboard demonstrates saved profiles, order-history UI, and post-purchase feedback without connecting to a production auth backend.
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
                <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors tracking-widest uppercase border-b border-transparent hover:border-foreground pb-1">
                  Sign Out
                </Link>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-xs text-muted tracking-widest uppercase mb-3">Saved Scent Profile</p>
                <p className="text-sm text-foreground font-light leading-relaxed">Woodland Cabin / Vintage Warm / Mysterious</p>
                <p className="text-xs text-muted mt-3 leading-relaxed">Prototype profile synced from the Scent Quiz session and used to explain match conversion tracking.</p>
              </div>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <h2 className="text-xl font-light tracking-[0.2em] uppercase mb-12 text-foreground border-b border-white/10 pb-4">
              Acquisitions
            </h2>

            <div className="space-y-12">
              {orders.map((order) => (
                <motion.div 
                  key={order.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-white/5">
                    <div className="mb-4 md:mb-0">
                      <p className="text-sm text-foreground tracking-widest uppercase mb-1">{order.id}</p>
                      <p className="text-xs text-muted">{order.date}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-foreground tracking-widest uppercase mb-1">RM{order.total}</p>
                      <p className="text-xs text-muted">{order.status}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-6 items-center">
                        <div className="w-20 h-24 bg-surface overflow-hidden relative grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                          <OptimizedProductImage src={item.images[0]} alt={item.name} className="object-cover" sizes="5rem" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground uppercase tracking-widest mb-1">{item.name}</p>
                          <p className="text-xs text-muted uppercase tracking-widest">{item.artisan}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border border-white/10 p-5">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted">14-day match feedback</p>
                    {feedback[order.id] ? (
                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Recorded {feedback[order.id]}/5 for algorithm weighting.</p>
                    ) : (
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFeedback((state) => ({ ...state, [order.id]: rating }))}
                            className="h-9 w-9 border border-white/10 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                            aria-label={`Rate ${order.id} ${rating} out of 5`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
