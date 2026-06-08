import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Quiz Preferences",
    copy: "The scent quiz stores temporary answers in sessionStorage so an interrupted browser session can recover the profile. The prototype does not send those preferences to a customer account backend.",
  },
  {
    title: "Cart And Checkout Data",
    copy: "Cart items are held in local application state. The checkout simulation writes a temporary order summary to sessionStorage for the confirmation page and avoids collecting real payment credentials.",
  },
  {
    title: "Analytics",
    copy: "When a valid GA4 measurement ID is configured, ScentMatch emits funnel events for quiz usage, product discovery, cart actions, checkout simulation, and vendor applications.",
  },
  {
    title: "Shopify Handoff",
    copy: "Production checkout is delegated to Shopify, whose privacy and payment processing policies govern payment authorization after handoff.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-32 font-sans">
      <SiteHeader showSearch={false} />
      <section className="mx-auto max-w-4xl px-8 py-24 md:px-16">
        <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted">Data handling</p>
        <h1 className="mb-20 text-center font-cormorant text-6xl font-light italic text-foreground md:text-8xl">Privacy</h1>
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-white/10 pb-10 last:border-b-0">
              <h2 className="mb-4 font-cormorant text-3xl italic text-foreground">{section.title}</h2>
              <p className="text-sm leading-relaxed tracking-wide text-muted">{section.copy}</p>
            </section>
          ))}
        </div>
        <Link href="/terms" className="mt-12 block w-fit border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
          Read terms
        </Link>
      </section>
      <Footer />
    </main>
  );
}
