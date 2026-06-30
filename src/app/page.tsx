import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ProductCatalog from "@/components/ProductCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="reveal">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber">
                  Fresh Stock
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  What&apos;s available right now
                </h2>
              </div>
              <Link
                href="/products"
                className="reveal inline-flex items-center gap-1.5 text-sm font-semibold text-blue-soft hover:text-amber"
              >
                View full catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ProductCatalog limit={8} showFilters={false} />
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
