import {
  Smartphone,
  CircuitBoard,
  Unlock,
  Droplets,
  BatteryCharging,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, BUSINESS, whatsappLink } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Smartphone,
  CircuitBoard,
  Unlock,
  Droplets,
  BatteryCharging,
  Settings2,
};

export default function Services() {
  return (
    <section id="services" className="border-b border-border bg-bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">
            Repair Services
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Brought it in broken. Walk out fixed.
          </h2>
          <p className="mt-3 text-text-dim">
            From a cracked screen to a phone that won&apos;t switch on at
            all — here&apos;s what we handle in-house.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <a
                key={service.name}
                href={whatsappLink(
                  `Hi ${BUSINESS.name}, I need help with: ${service.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-blue-soft/60 hover:shadow-[0_8px_30px_rgba(45,91,255,0.18)] sm:p-6"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue/20 to-purple/20 text-blue-soft transition-colors group-hover:text-amber">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold sm:text-base">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-xs text-text-faint">
                    Tap to ask on WhatsApp
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
