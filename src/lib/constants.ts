// ─────────────────────────────────────────────────────────────────────────
// Edit this file to update business info site-wide (name, contact, services)
// ─────────────────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: "Woletech Gadgets",
  tagline: "We Fix Your Digital World",
  whatsappNumber: "2347018046411", // primary number used for the WhatsApp button (intl format, no +)
  phone1: "07018046411",
  phone2: "08163458582",
  email: "woletechgsm@gmail.com",
  address: "Mase Bus Stop, Gberigbe Road, Ikorodu, Lagos State",
  mapsQuery: "Mase Bus Stop, Gberigbe Road, Ikorodu, Lagos State",
};

export const SERVICES = [
  { name: "Screen Repair", icon: "Smartphone" },
  { name: "Board Repair", icon: "CircuitBoard" },
  { name: "iPhone Unlock", icon: "Unlock" },
  { name: "Water Damage", icon: "Droplets" },
  { name: "Battery Replacement", icon: "BatteryCharging" },
  { name: "Software Problem", icon: "Settings2" },
] as const;

export const CATEGORIES = [
  "Phones",
  "Laptops",
  "Speakers",
  "Accessories",
  "Games & Console",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = ["New", "UK Used", "Nigerian Used"] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappMessage(productName: string) {
  return `Hi Woletech Gadgets, I'm interested in: ${productName}. Is it still available?`;
}
