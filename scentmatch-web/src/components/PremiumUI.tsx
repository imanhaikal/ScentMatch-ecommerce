"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform, useScroll, useMotionValue, useMotionTemplate } from "framer-motion";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.5 });
  const cursorY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, select, [data-cursor="hover"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-foreground"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        opacity: isHovered ? 1 : 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    />
  );
};

export const MouseSpotlight = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: useMotionTemplate`radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,0.05), transparent 40%)`
      }}
    />
  );
};

export const SplitText = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-4 -mb-4 mr-[0.3em]">
          <motion.span
            className="inline-block origin-bottom"
            initial={{ y: "120%", rotateZ: 5, opacity: 0 }}
            animate={{ y: 0, rotateZ: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
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
  return (
    <div className="relative w-full overflow-hidden bg-surface py-6 border-y border-white/5 z-20 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
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
  
  // Subtler 3D tilt
  const rotateX = useTransform(y, [0, 1], ["3deg", "-3deg"]);
  const rotateY = useTransform(x, [0, 1], ["-3deg", "3deg"]);
  
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Smoothly return to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`relative group transition-all duration-300 ease-out ${className}`}
    >
      {/* Interactive Border Glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-sm z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${useTransform(x, v => v * 100)}% ${useTransform(y, v => v * 100)}%, rgba(255,255,255,0.4), transparent 40%)`
        }}
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

export const MagneticButton = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
};
