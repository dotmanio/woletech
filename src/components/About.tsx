import { CATEGORIES, BUSINESS } from "@/lib/constants";
import { categoryVisual } from "@/lib/categoryVisuals";

export default function About() {
  return (
    <section id="about" className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber">
              Dealer In All Kinds Of
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Repairs, swaps, and genuine gadgets — all under one roof.
            </h2>
            <p className="mt-4 text-text-dim">
              {BUSINESS.name} has built a reputation in Ikorodu for honest
              pricing and dependable work. Whether your device needs fixing,
              you want to swap it for something newer, or you&apos;re
              shopping for your next phone, laptop, or accessory — we&apos;ve
              got you.
            </p>
          </div>

          <div
            className="reveal grid grid-cols-2 gap-3 sm:gap-4"
            style={{ animationDelay: "100ms" }}
          >
            {CATEGORIES.map((cat) => {
              const { icon: Icon, gradient } = categoryVisual(cat);
              return (
                <div
                  key={cat}
                  className={`flex flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br ${gradient} p-5`}
                >
                  <Icon className="h-6 w-6 text-text" strokeWidth={1.6} />
                  <span className="font-display text-sm font-semibold">
                    {cat}
                  </span>
                </div>
              );
            })}
            <div className="flex flex-col justify-center gap-1 rounded-2xl border border-dashed border-border p-5">
              <span className="font-display text-sm font-semibold text-amber">
                + Trade-ins
              </span>
              <span className="text-xs text-text-faint">
                Swap your old device for something new
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
