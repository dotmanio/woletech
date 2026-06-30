import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Smartphone } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/constants";
import { categoryVisual } from "@/lib/categoryVisuals";

export default function Hero() {
  return (
    <section className="circuit-bg relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        {/* Copy */}
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            Ikorodu, Lagos — Open for repairs &amp; sales
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {BUSINESS.tagline.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="bg-gradient-to-r from-blue-soft via-purple to-amber bg-clip-text text-transparent">
              {BUSINESS.tagline.split(" ").slice(-2).join(" ")}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-dim sm:text-lg">
            Screen cracked? Battery dying? Need a new phone or laptop?{" "}
            {BUSINESS.name} repairs, swaps, and sells phones, laptops,
            speakers, accessories, and consoles — fast, reliable, and right
            here in Ikorodu.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            
              href={whatsappLink(`Hi ${BUSINESS.name}, I'd like to chat about a repair or a product.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-purple px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(45,91,255,0.4)] transition-transform hover:scale-[1.02]"
            >
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text transition-colors hover:bg-surface-hi"
            >
              Browse Available Stock
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            <Stat icon={<ShieldCheck className="h-4 w-4" />} label="Trusted repairs" />
            <Stat icon={<Clock className="h-4 w-4" />} label="Quick turnaround" />
            <Stat icon={<Smartphone className="h-4 w-4" />} label="All brands" />
          </div>
        </div>

        {/* Visual */}
        <div className="reveal relative" style={{ animationDelay: "120ms" }}>
          <div className="relative mx-auto aspect-square max-w-md rounded-[2rem] border border-border bg-surface/60 p-6 shadow-[0_0_60px_rgba(45,91,255,0.12)] backdrop-blur-sm sm:p-10">
            <div className="grid h-full grid-cols-2 gap-4">
              <DeviceTile label="Phones" delay="0ms" />
              <DeviceTile label="Laptops" delay="80ms" />
              <DeviceTile label="Speakers" delay="160ms" />
              <DeviceTile label="Accessories" delay="240ms" />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-surface-hi px-4 py-3 text-xs font-medium text-text-dim shadow-xl sm:-left-8">
            <span className="lcd text-amber">5+</span> categories of gadgets
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-amber">
        {icon}
      </span>
      <span className="text-xs font-medium text-text-dim">{label}</span>
    </div>
  );
}

function DeviceTile({ label, delay }: { label: string; delay: string }) {
  const { icon: Icon, gradient } = categoryVisual(label);
  return (
    <div
      className={`reveal flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-gradient-to-br ${gradient} text-center transition-transform hover:scale-[1.03]`}
      style={{ animationDelay: delay }}
    >
      <Icon className="h-7 w-7 text-text" strokeWidth={1.5} />
      <span className="font-display text-sm font-semibold text-text">
        {label}
      </span>
    </div>
  );
}
