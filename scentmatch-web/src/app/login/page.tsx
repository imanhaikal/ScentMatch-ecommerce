"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(payload.error ?? "Unable to sign in.");

      const nextPath = new URLSearchParams(window.location.search).get("next") || "/account";
      router.push(nextPath.startsWith("/") ? nextPath : "/account");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-6 relative overflow-hidden pt-32 pb-12">
      <SiteHeader showSearch={false} />
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10 my-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4 text-foreground">
            Sign In
          </h1>
          <p className="text-muted text-sm tracking-widest uppercase">
            Access your saved scent profile and acquisitions
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-12">
          <div className="relative group">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
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
              name="password"
              autoComplete="current-password"
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
            {error ? (
              <p ref={errorRef} tabIndex={-1} className="border border-red-500/30 bg-red-500/10 p-4 text-xs uppercase tracking-[0.2em] text-red-200">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground text-background py-5 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Signing In" : "Sign In"}
            </button>

            <div className="flex items-center justify-center space-x-4 pt-4">
              <div className="h-[1px] bg-white/10 w-full" />
              <span className="text-xs tracking-widest uppercase text-muted whitespace-nowrap px-2">Or continue with</span>
              <div className="h-[1px] bg-white/10 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                aria-label="Continue with Google"
                disabled
                className="flex items-center justify-center space-x-3 w-full border border-white/20 bg-transparent py-4 text-xs tracking-widest uppercase text-muted opacity-60 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                aria-label="Continue with Facebook"
                disabled
                className="flex items-center justify-center space-x-3 w-full border border-white/20 bg-transparent py-4 text-xs tracking-widest uppercase text-muted opacity-60 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4 text-xs tracking-widest uppercase text-muted pt-4">
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
