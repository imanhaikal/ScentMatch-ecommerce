import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Prototype Scope",
    copy: "ScentMatch is presented as an e-commerce prototype. Product browsing, scent matching, cart pricing, vendor onboarding, and checkout confirmation demonstrate the intended commerce journey.",
  },
  {
    title: "Shopify Checkout Handoff",
    copy: "Secure production payment authorization is delegated to Shopify checkout. The local checkout route is a simulation for evaluation and does not collect real card or banking credentials.",
  },
  {
    title: "Returns And Support",
    copy: "Return eligibility follows the sealed-product policy described on the returns page. The concierge chatbot and contact form are prototype support channels for demo use.",
  },
  {
    title: "Vendor Marketplace",
    copy: "Artisan onboarding, scent mapping, and commission tracking are prototype previews of the B2B aggregator model and do not create binding seller agreements.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 font-sans">
      <SiteHeader showSearch={false} />
      <section className="mx-auto max-w-4xl px-8 py-24 md:px-16">
        <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted">Legal dossier</p>
        <h1 className="mb-20 text-center font-cormorant text-6xl font-light italic text-foreground md:text-8xl">Terms</h1>
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-white/10 pb-10 last:border-b-0">
              <h2 className="mb-4 font-cormorant text-3xl italic text-foreground">{section.title}</h2>
              <p className="text-sm leading-relaxed tracking-wide text-muted">{section.copy}</p>
            </section>
          ))}
        </div>
        <Link href="/contact" className="mt-12 block w-fit border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
          Contact concierge
        </Link>
      </section>
      <Footer />
    </main>
  );
}
