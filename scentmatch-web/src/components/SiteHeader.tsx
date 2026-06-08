"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "@/components/PremiumUI";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/shop" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
  { name: "Returns", path: "/returns" },
  { name: "Vendor", path: "/vendors/apply" },
  { name: "Account", path: "/login" },
];

interface SiteHeaderProps {
  transparentUntilScroll?: boolean;
  showSearch?: boolean;
}

export function SiteHeader({ transparentUntilScroll = false, showSearch = true }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { openCart, items } = useCartStore();
  const [scrolled, setScrolled] = useState(!transparentUntilScroll);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (!transparentUntilScroll) return;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentUntilScroll]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const headerChrome = scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent border-b border-transparent";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 flex items-center justify-between px-8 md:px-16 py-6 ${headerChrome}`}>
      <Link href="/" className="flex items-center gap-2 cursor-pointer z-50" onClick={() => setMenuOpen(false)}>
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-none tracking-tighter uppercase text-foreground ml-[-0.05em]">
          Scentmatch
        </h2>
      </Link>

      <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2" aria-label="Primary navigation">
        {navLinks.slice(1, 6).map((item) => {
          const active = pathname === item.path;

          return (
            <Link key={item.name} href={item.path} className={active ? "text-foreground" : "text-foreground/80"}>
              <MagneticButton className="text-xs uppercase tracking-widest font-sans font-medium group">
                <span className="relative overflow-hidden flex flex-col">
                  <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[0.76,0,0.24,1]">{item.name}</span>
                  <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 ease-[0.76,0,0.24,1]">{item.name}</span>
                </span>
              </MagneticButton>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-5 z-50">
        {showSearch ? (
          <button
            type="button"
            onClick={() => router.push("/shop?search=true")}
            aria-label="Search collection"
            className="text-foreground hover:opacity-50 transition-opacity flex items-center gap-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
          >
            <Search className="w-4 h-4" />
          </button>
        ) : null}
        <Link href="/login" className="text-foreground hover:opacity-50 transition-opacity hidden md:block">
          <span className="text-xs uppercase tracking-widest font-sans font-medium">Account</span>
        </Link>
        <button
          type="button"
          onClick={openCart}
          className="text-foreground hover:opacity-50 transition-opacity flex items-center gap-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
        >
          <span className="text-xs uppercase tracking-widest font-sans font-medium">Cart</span>
          {totalItems > 0 ? (
            <span className="bg-foreground text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close mobile navigation" : "Open mobile navigation"}
          aria-expanded={menuOpen}
          className="text-foreground hover:opacity-50 transition-opacity ml-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl px-8 py-32 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-6">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-end justify-between border-b border-white/10 pb-4 text-foreground"
                    >
                      <span className="font-cormorant text-5xl italic">{item.name}</span>
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">0{index + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                Mobile journey: quiz, collection, cart, support, and artisan portal.
              </p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
