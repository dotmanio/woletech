import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="bg-bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-bg-soft">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber">
                Get In Touch
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Come see us, call, or chat right now.
              </h2>
              <p className="mt-3 max-w-md text-text-dim">
                Fastest way to reach us is WhatsApp — message us your device
                model or what you&apos;re looking for and we&apos;ll respond
                quickly.
              </p>

              <div className="mt-7 flex flex-col gap-4">
                <ContactRow icon={<MapPin className="h-4 w-4" />} text={BUSINESS.address} />
                <ContactRow icon={<Phone className="h-4 w-4" />} text={`${BUSINESS.phone1} · ${BUSINESS.phone2}`} />
                <ContactRow icon={<Mail className="h-4 w-4" />} text={BUSINESS.email} />
              </div>
            </div>

            <a
              href={whatsappLink(`Hi ${BUSINESS.name}, I'd like to get in touch.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-green px-7 py-4 text-sm font-bold text-[#062315] shadow-[0_0_30px_rgba(45,219,143,0.35)] transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-5 w-5" />
              Message Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-text-dim">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-amber">
        {icon}
      </span>
      {text}
    </div>
  );
}
