"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/products", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-purple shadow-[0_0_20px_rgba(45,91,255,0.45)] transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 text-white" fill="white" strokeWidth={1} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {BUSINESS.name.split(" ")[0]}
            <span className="text-amber">{BUSINESS.name.split(" ").slice(1).join(" ") ? " " + BUSINESS.name.split(" ").slice(1).join(" ") : ""}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-dim transition-colors hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/products"
            className="rounded-full bg-gradient-to-r from-blue to-purple px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(45,91,255,0.35)] transition-transform hover:scale-[1.03]"
          >
            Browse Stock
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-bg-soft px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-text-dim hover:bg-surface hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gradient-to-r from-blue to-purple px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Browse Stock
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
