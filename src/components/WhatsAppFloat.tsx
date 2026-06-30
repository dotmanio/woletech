"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(`Hi ${BUSINESS.name}, I'd like to ask about your products/services.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 sm:bottom-7 sm:right-7"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green shadow-[0_4px_24px_rgba(45,219,143,0.5)] sm:h-16 sm:w-16">
        <span className="pulse-ring absolute inset-0 rounded-full" />
        <MessageCircle className="h-7 w-7 text-[#062315]" strokeWidth={2.2} fill="#062315" />
      </span>
      <span className="hidden rounded-full bg-surface-hi px-4 py-2 text-sm font-semibold text-text shadow-lg group-hover:sm:inline-block sm:hidden">
        Chat on WhatsApp
      </span>
    </a>
  );
}
