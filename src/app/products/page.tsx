import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCatalog from "@/components/ProductCatalog";

export const metadata = {
  title: "Shop — Woletech Gadgets",
  description: "Browse phones, laptops, speakers, accessories, and consoles in stock at Woletech Gadgets, Ikorodu.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="circuit-bg border-b border-border py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber">
              Full Catalog
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Browse what&apos;s in stock
            </h1>
            <p className="mt-3 max-w-xl text-text-dim">
              Tap any item to message us on WhatsApp directly — mention the
              product name and we&apos;ll confirm availability and pricing.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ProductCatalog />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
