import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const products = [
  { name: "Cedar No. 7", top: "Bergamot", heart: "Cedar", base: "Oud", sales: 42, gross: 12600, commission: 0.18 },
  { name: "Rain Archive", top: "Marine", heart: "Tea", base: "Musk", sales: 18, gross: 4860, commission: 0.15 },
  { name: "Velvet Smoke", top: "Pepper", heart: "Incense", base: "Leather", sales: 27, gross: 8505, commission: 0.2 },
];

export default function VendorDashboardPage() {
  const gross = products.reduce((acc, product) => acc + product.gross, 0);
  const commission = products.reduce((acc, product) => acc + product.gross * product.commission, 0);

  return (
    <main className="min-h-screen bg-background pt-32 font-sans">
      <SiteHeader />
      <section className="mx-auto max-w-[100rem] px-8 py-24 md:px-16">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-muted">Vendor preview</p>
            <h1 className="font-cormorant text-6xl font-light italic leading-none text-foreground md:text-8xl">Atelier Dashboard</h1>
          </div>
          <Link href="/vendors/apply" className="w-fit border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground hover:border-foreground">
            Back to application
          </Link>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Metric label="Approval status" value="Curator Review" />
          <Metric label="Gross sales" value={`RM${gross.toLocaleString()}`} />
          <Metric label="Platform commission" value={`RM${Math.round(commission).toLocaleString()}`} />
          <Metric label="Pending payout" value={`RM${Math.round(gross - commission).toLocaleString()}`} />
        </div>

        <div className="overflow-hidden border border-white/10">
          <div className="grid grid-cols-6 gap-4 border-b border-white/10 bg-surface/40 p-5 text-[10px] uppercase tracking-[0.2em] text-muted">
            <span className="col-span-2">Product</span>
            <span>Top</span>
            <span>Heart</span>
            <span>Base</span>
            <span className="text-right">Net</span>
          </div>
          {products.map((product) => (
            <div key={product.name} className="grid grid-cols-1 gap-4 border-b border-white/5 p-5 text-sm text-foreground last:border-b-0 md:grid-cols-6">
              <span className="font-cormorant text-2xl italic md:col-span-2">{product.name}</span>
              <span className="text-muted">{product.top}</span>
              <span className="text-muted">{product.heart}</span>
              <span className="text-muted">{product.base}</span>
              <span className="md:text-right">RM{Math.round(product.gross * (1 - product.commission)).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <section className="mt-12 grid grid-cols-1 gap-6 border border-white/10 bg-surface/20 p-8 md:grid-cols-3">
          <h2 className="font-cormorant text-4xl italic text-foreground md:col-span-3">Product & scent mapping tool</h2>
          {["Top notes", "Heart notes", "Base notes"].map((label) => (
            <label key={label}>
              <span className="mb-3 block text-[10px] uppercase tracking-[0.25em] text-muted">{label}</span>
              <input disabled placeholder="Prototype mapping field" className="w-full border-b border-white/20 bg-transparent pb-4 text-sm text-muted outline-none" />
            </label>
          ))}
        </section>
      </section>
      <Footer />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-surface/30 p-6">
      <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-muted">{label}</p>
      <p className="font-cormorant text-3xl italic text-foreground">{value}</p>
    </div>
  );
}
