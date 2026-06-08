"use client";

import React, { useEffect, useRef } from "react";
import { motion, useTransform, useMotionValue, useMotionTemplate, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return <>{children}</>;
};

export const MouseSpotlight = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const background = useMotionTemplate`radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,0.05), transparent 40%)`;

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
};

export const SplitText = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-4 -mb-4 mr-[0.3em]">
          <motion.span
            className="inline-block origin-bottom"
            initial={shouldReduceMotion ? false : { y: "120%", rotateZ: 5, opacity: 0 }}
            animate={{ y: 0, rotateZ: 0, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: delay + i * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const InfiniteMarquee = ({ text }: { text: string }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden bg-surface py-6 border-y border-white/5 z-20 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={shouldReduceMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-muted font-sans uppercase tracking-[0.3em] text-xs px-8 flex items-center gap-8">
            {text} <span className="w-1.5 h-1.5 rounded-full bg-surface-hover" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const shouldReduceMotion = useReducedMotion();
  
  // Subtler 3D tilt
  const rotateX = useTransform(y, [0, 1], ["3deg", "-3deg"]);
  const rotateY = useTransform(x, [0, 1], ["-3deg", "3deg"]);
  const glowX = useTransform(x, v => v * 100);
  const glowY = useTransform(y, v => v * 100);
  const glowBackground = useMotionTemplate`radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.4), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    // Smoothly return to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      className={`relative group transition-all duration-300 ease-out ${className}`}
    >
      {/* Interactive Border Glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-sm z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glowBackground }}
      />
      
      {/* Card Content Wrapper */}
      <div className="relative z-10 w-full h-full bg-background">
        {children}
      </div>
    </motion.div>
  );
};

export const Noise = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.05] mix-blend-screen"
      style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      }}
    />
  );
};

type MagneticButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
};

export const MagneticButton = ({ children, className = "", disabled, type = "button", ...buttonProps }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || disabled || !ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      disabled={disabled}
      style={{ x, y }}
      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative ${className}`}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};
