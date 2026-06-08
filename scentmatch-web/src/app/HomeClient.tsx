"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, X, ArrowUpRight, Plus } from "lucide-react";
import { MagneticButton, SplitText, InfiniteMarquee, TiltCard } from "@/components/PremiumUI";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ScentProduct } from "@/lib/shopify/types";
import { SiteHeader } from "@/components/SiteHeader";
import { trackEvent } from "@/lib/analytics";
import type { ScentMatchResult } from "@/lib/scentmatch/matcher";

const QUIZ_STORAGE_KEY = "scentmatch:quiz:v1";

// -- ANIMATION VARIANTS --
const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as const }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// -- COMPONENTS --

// Primary Button
const PrimaryButton = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <MagneticButton onClick={onClick} className={`group relative bg-foreground text-background overflow-hidden uppercase tracking-widest px-10 py-5 font-sans text-xs font-bold flex items-center justify-center gap-4 ${className}`}>
    <span className="absolute inset-0 w-full h-full bg-surface origin-bottom scale-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:scale-y-100"></span>
    <span className="relative z-10 group-hover:text-foreground transition-colors duration-500 flex items-center gap-4">
      {children}
    </span>
  </MagneticButton>
);

// Hero Section
const Hero = ({ onQuizStart }: { onQuizStart: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen flex flex-col justify-end pb-24 px-8 md:px-16 overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-background/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-20" />
        <motion.img
          style={{ y, scale }}
          src="/hero-bg2.jpg"
          alt="ScentMatch Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-90 origin-bottom z-0"
          fetchPriority="high"
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-30 w-full max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-start"
        >
          <motion.div variants={revealVariants} className="overflow-hidden mb-6">
            <span className="text-muted font-sans uppercase tracking-[0.3em] text-[10px] font-semibold">
              The Digital Sommelier
            </span>
          </motion.div>
          
          <div className="mb-8 flex flex-col">
            <h1 className="font-sans text-6xl md:text-[8vw] font-bold text-foreground tracking-tighter leading-[0.9] uppercase overflow-hidden">
              <SplitText text="Eliminate The" />
            </h1>
            <h1 className="font-sans text-6xl md:text-[8vw] font-bold text-foreground tracking-tighter leading-[0.9] uppercase overflow-hidden mt-2">
              <SplitText text="Blind-Buy Gamble" delay={0.2} />
            </h1>
          </div>

          <motion.div variants={revealVariants} className="mb-12 max-w-lg">
            <p className="text-muted font-sans text-sm md:text-base leading-relaxed tracking-wide">
              Discover fragrances matched to your precise psychological profile and aesthetic preferences using our highly accurate algorithm. An olfactive journey tailored to your soul.
            </p>
          </motion.div>

          <motion.div variants={revealVariants}>
            <PrimaryButton onClick={onQuizStart}>
              Take the Scent Quiz <ArrowUpRight className="w-4 h-4" />
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Scent Quiz State Machine
const QUIZ_STEPS = [
  {
    id: "environment",
    question: "Which environment centers your being?",
    options: ["Woodland Cabin", "Ocean Breeze", "Midnight Library", "Botanical Garden"],
  },
  {
    id: "aesthetic",
    question: "Select your daily aesthetic.",
    options: ["Minimalist & Sharp", "Vintage & Warm", "Avant-Garde", "Classic Elegance"],
  },
  {
    id: "intensity",
    question: "How do you want to be perceived?",
    options: ["Mysterious", "Approachable", "Commanding", "Ethereal"],
  }
];

const ScentQuiz = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ScentMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawState = window.sessionStorage.getItem(QUIZ_STORAGE_KEY);
      if (!rawState) return;
      const parsed = JSON.parse(rawState) as { step?: number; answers?: Record<string, string>; result?: ScentMatchResult };
      if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < QUIZ_STEPS.length) setStep(parsed.step);
      if (parsed.answers && typeof parsed.answers === "object") setAnswers(parsed.answers);
      if (parsed.result?.matches) setResult(parsed.result);
    } catch {
      window.sessionStorage.removeItem(QUIZ_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({ step, answers, result }));
  }, [step, answers, result]);

  const handleSelect = async (option: string) => {
    const nextAnswers = { ...answers, [QUIZ_STEPS[step].id]: option };
    setAnswers(nextAnswers);
    trackEvent("quiz_step_answered", { step: QUIZ_STEPS[step].id, answer: option });

    if (step < QUIZ_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setAnalyzing(true);
      setError(null);
      try {
        const response = await fetch("/api/scentmatch/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: nextAnswers }),
        });
        const payload = (await response.json()) as ScentMatchResult & { error?: string };

        if (!response.ok || !payload.matches) {
          throw new Error(payload.error ?? "Unable to calculate scent profile.");
        }

        setResult(payload);
        trackEvent(payload.result === "match" ? "quiz_completed" : "quiz_zero_match", {
          match_count: payload.matches.length,
          top_score: payload.matches[0]?.score ?? 0,
        });
      } catch (quizError) {
        setError(quizError instanceof Error ? quizError.message : "Unable to calculate scent profile.");
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
    window.sessionStorage.removeItem(QUIZ_STORAGE_KEY);
  };

  const topMatch = result?.matches[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-3xl"
    >
      <MagneticButton onClick={onClose} className="absolute top-8 right-8 text-foreground opacity-50 hover:opacity-100 transition-opacity">
        <X size={28} strokeWidth={1} />
      </MagneticButton>

      <div className="w-full max-w-4xl px-8 md:px-16 relative" aria-live="polite">
        <AnimatePresence mode="wait">
          {!analyzing && !result && !error && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col"
            >
              <span className="text-muted font-sans uppercase tracking-[0.3em] mb-12 text-[10px] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-muted"></span> Phase {step + 1} of {QUIZ_STEPS.length}
              </span>
              <h2 className="text-4xl md:text-6xl font-cormorant font-light text-foreground mb-20 leading-tight">
                {QUIZ_STEPS[step].question}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-hover p-px w-full">
                {QUIZ_STEPS[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="bg-background text-foreground p-12 text-lg md:text-2xl font-cormorant font-light transition-all duration-700 ease-[0.76,0,0.24,1] flex items-center justify-between group hover:bg-foreground hover:text-background relative overflow-hidden"
                  >
                    <span className="relative z-10">{opt}</span>
                    <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-[0.76,0,0.24,1] relative z-10" strokeWidth={1} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {analyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 border border-white/80 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-4 border border-white/30 border-t-transparent border-r-transparent border-l-transparent rounded-full"
                />
                <Sparkles className="w-6 h-6 text-foreground opacity-50" strokeWidth={1} />
              </div>
              <h2 className="text-2xl font-cormorant text-foreground tracking-[0.2em] uppercase italic">Synthesizing Profile</h2>
              <p className="text-muted font-sans mt-6 max-w-sm text-xs uppercase tracking-widest">Cross-referencing algorithmic match against 400+ artisan notes...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-5xl md:text-7xl font-cormorant text-foreground mb-8 italic">Curator Offline</h2>
              <p className="text-muted font-sans text-sm tracking-wide max-w-lg leading-relaxed mb-12">{error} Explore the archive while our concierge refines your profile.</p>
              <PrimaryButton onClick={onClose}>Discover Collection</PrimaryButton>
            </motion.div>
          )}

          {result?.result === "match" && topMatch && (
            <motion.div
              key="match"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-center flex flex-col items-center"
            >
              <span className="text-muted font-sans uppercase tracking-[0.3em] mb-6 text-[10px]">{topMatch.score}% Match Accuracy Found</span>
              <h2 className="text-5xl md:text-7xl font-cormorant text-foreground mb-16 italic">Your Signature Profile</h2>
              
              <div className="relative p-[1px] w-full max-w-2xl bg-gradient-to-b from-white/20 to-transparent mb-12">
                <div className="bg-background p-12 flex flex-col md:flex-row items-center gap-12 text-left">
                  <div className="w-40 h-56 relative overflow-hidden bg-surface">
                    <img src={topMatch.images[0]} className="w-full h-full object-cover scale-110" alt={topMatch.name} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-cormorant text-foreground mb-2">{topMatch.name}</h3>
                    <p className="text-muted font-sans text-xs uppercase tracking-[0.2em] mb-8">Artisan: {topMatch.artisan}</p>
                    <div className="space-y-4 font-sans text-[10px] text-muted uppercase tracking-[0.2em]">
                      <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-foreground">Top</span><span>{topMatch.notes.top}</span></div>
                      <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-foreground">Heart</span><span>{topMatch.notes.heart}</span></div>
                      <div className="flex justify-between"><span className="text-foreground">Base</span><span>{topMatch.notes.base}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <PrimaryButton onClick={onClose}>Discover Collection</PrimaryButton>
                <MagneticButton onClick={handleRestart} className="text-foreground font-sans text-xs uppercase tracking-[0.2em] border-b border-foreground pb-1">Restart Profile</MagneticButton>
              </div>
            </motion.div>
          )}

          {result?.result === "zero" && (
            <motion.div
              key="zero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-5xl md:text-7xl font-cormorant text-foreground mb-8 italic">Curated Discoveries</h2>
              <p className="text-muted font-sans text-sm tracking-wide max-w-lg leading-relaxed mb-16">
                Your profile is exceptionally unique. While our artisans refine your bespoke match, explore these universal signatures crafted for the avant-garde.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mb-12">
                {result.matches.slice(0, 2).map((match) => (
                  <Link href={`/product/${match.handle}`} key={match.id} className="group cursor-pointer">
                    <div className="h-64 bg-surface w-full mb-6 overflow-hidden relative">
                      <img src={match.images[0]} alt={match.name} className="h-full w-full object-cover opacity-70 mix-blend-luminosity transition-all duration-700 group-hover:scale-105 group-hover:mix-blend-normal" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-foreground font-cormorant text-3xl mb-2 group-hover:italic transition-all">{match.name}</h4>
                      <p className="text-muted font-sans text-[10px] uppercase tracking-[0.2em]">{match.reasons[0]}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex gap-6">
                <MagneticButton onClick={onClose} className="text-foreground font-sans text-xs uppercase tracking-[0.2em] border-b border-foreground pb-1">Return</MagneticButton>
                <MagneticButton onClick={handleRestart} className="text-muted hover:text-foreground font-sans text-xs uppercase tracking-[0.2em] border-b border-white/20 pb-1">Restart</MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Asymmetrical Product Cards Section
const ProductSection = ({ products }: { products: ScentProduct[] }) => {
  const { addItem } = useCartStore();
  const router = useRouter();

  const featuredProducts = products.slice(0, 3).map((p, i) => ({
    ...p,
    offset: i === 0 ? "md:mt-0" : i === 1 ? "md:mt-32" : "md:mt-16",
    height: i === 0 ? "h-[70vh]" : i === 1 ? "h-[85vh]" : "h-[65vh]"
  }));

  return (
    <section className="bg-background py-40 px-8 md:px-16 relative z-10">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
          <div className="max-w-xl">
            <span className="text-muted font-sans uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Collection</span>
            <h2 className="text-5xl md:text-7xl font-cormorant font-light text-foreground leading-none">
              Featured Extracts
            </h2>
          </div>
          <MagneticButton onClick={() => router.push("/shop")} className="text-foreground text-xs uppercase tracking-[0.2em] border-b border-white/30 hover:border-foreground pb-1 transition-colors">
            View the Gallery
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {featuredProducts.map((prod) => {
            const canPurchase = prod.stock > 0 && Boolean(prod.variantId);

            return (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className={`relative flex flex-col ${prod.offset}`}
            >
              <TiltCard className="w-full rounded-none">
                <div className={`relative w-full ${prod.height} overflow-hidden bg-surface group`}>
                  <Link href={`/product/${prod.handle}`}>
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-105 group-hover:mix-blend-normal transition-all duration-1000 ease-[0.76,0,0.24,1] cursor-pointer"
                      loading="lazy"
                    />
                  </Link>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-1000" />
                  
                  {/* Hover Reveal Details */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]">
                      <div className="flex justify-between border-b border-white/20 pb-2 text-[10px] font-sans tracking-[0.2em] uppercase">
                        <span className="text-muted">Top</span><span className="text-foreground">{prod.notes.top}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/20 pb-2 text-[10px] font-sans tracking-[0.2em] uppercase">
                        <span className="text-muted">Heart</span><span className="text-foreground">{prod.notes.heart}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-sans tracking-[0.2em] uppercase">
                        <span className="text-muted">Base</span><span className="text-foreground">{prod.notes.base}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
              
              <div className="pt-8 flex justify-between items-start group">
                <Link href={`/product/${prod.handle}`}>
                  <div>
                    <h3 className="text-foreground text-3xl font-cormorant mb-2 group-hover:italic transition-all duration-500 cursor-pointer">{prod.name}</h3>
                    <div className="flex gap-4 items-center cursor-pointer">
                      <p className="text-muted font-sans text-[10px] uppercase tracking-[0.2em]">{prod.artisan}</p>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <p className="text-foreground font-sans text-[10px] tracking-widest">RM{prod.price} MYR</p>
                    </div>
                  </div>
                </Link>
                <MagneticButton
                  onClick={() => {
                    if (!canPurchase) return;
                    addItem({ id: prod.id, variantId: prod.variantId, name: prod.name, artisan: prod.artisan, price: prod.price, image: prod.images[0], notes: prod.notes });
                    trackEvent("add_to_cart", { product_id: prod.id, product_name: prod.name, source: "home" });
                    useCartStore.getState().openCart();
                  }}
                  disabled={!canPurchase}
                  className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-foreground transition-colors duration-500 z-10 relative ${canPurchase ? "hover:bg-foreground hover:text-background" : "opacity-30 cursor-not-allowed"}`}
                >
                  <Plus className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Main Page Assembly
export default function HomeClient({ products }: { products: ScentProduct[] }) {
  const [quizOpen, setQuizOpen] = useState(false);

  const openQuiz = () => {
    setQuizOpen(true);
    trackEvent("quiz_started");
  };

  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteHeader transparentUntilScroll />
      <Hero onQuizStart={openQuiz} />
      <InfiniteMarquee text="The Digital Sommelier • Find Your Scent" />
      <ProductSection products={products} />
      
      <Footer />

      <AnimatePresence>
        {quizOpen && <ScentQuiz onClose={() => setQuizOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
