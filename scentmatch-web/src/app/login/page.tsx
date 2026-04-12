"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login: redirect to account page
    router.push("/account");
  };

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center px-6 relative overflow-hidden pt-24 pb-12">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4 text-foreground">
            Sign In
          </h1>
          <p className="text-muted text-sm tracking-widest uppercase">
            Access your olfactory portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-12">
          <div className="relative group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="block w-full bg-transparent border-b border-white/20 py-4 text-foreground text-lg focus:outline-none focus:border-white/80 transition-colors peer"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-4 text-muted text-lg transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white/80 peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/80 peer-valid:tracking-widest peer-valid:uppercase pointer-events-none"
            >
              Email Address
            </label>
          </div>

          <div className="relative group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="block w-full bg-transparent border-b border-white/20 py-4 text-foreground text-lg focus:outline-none focus:border-white/80 transition-colors peer"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-4 text-muted text-lg transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white/80 peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/80 peer-valid:tracking-widest peer-valid:uppercase pointer-events-none"
            >
              Password
            </label>
          </div>

          <div className="pt-4 space-y-6">
            <button
              type="submit"
              className="w-full bg-foreground text-background py-5 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
            >
              Authenticate
            </button>

            <div className="flex flex-col items-center space-y-4 text-xs tracking-widest uppercase text-muted mt-8">
              <Link href="/signup" className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1">
                Create an Account
              </Link>
              <Link href="/shop" className="hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1">
                Continue as Guest
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
