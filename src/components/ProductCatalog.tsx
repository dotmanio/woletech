"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, PackageSearch, WifiOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductCatalog({
  limit,
  showFilters = true,
}: {
  limit?: number;
  showFilters?: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "unconfigured">(
    "loading"
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        if (!cancelled) setStatus("unconfigured");
        return;
      }

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (cancelled) return;
        if (error) {
          setStatus("error");
          return;
        }
        setProducts((data ?? []) as Product[]);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return limit ? list.slice(0, limit) : list;
  }, [products, activeCategory, query, limit]);

  if (status === "unconfigured") {
    return (
      <EmptyState
        icon={<WifiOff className="h-7 w-7" />}
        title="Catalog not connected yet"
        body="This shop's product database hasn't been linked yet. Once a Supabase project is connected (see the project README), products will appear here automatically."
      />
    );
  }

  if (status === "error") {
    return (
      <EmptyState
        icon={<WifiOff className="h-7 w-7" />}
        title="Couldn't load products right now"
        body="Please check your connection and refresh the page. If this keeps happening, contact the site owner."
      />
    );
  }

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All"
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            />
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-border bg-surface py-2.5 pl-9 pr-4 text-sm text-text placeholder:text-text-faint focus:border-blue-soft"
            />
          </div>
        </div>
      )}

      {status === "loading" && <SkeletonGrid />}

      {status === "ready" && filtered.length === 0 && (
        <EmptyState
          icon={<PackageSearch className="h-7 w-7" />}
          title="No products match"
          body="Try a different category or search term — or check back soon, new stock is added regularly."
        />
      )}

      {status === "ready" && filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
        active
          ? "border-transparent bg-gradient-to-r from-blue to-purple text-white"
          : "border-border bg-surface text-text-dim hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4.2] animate-pulse rounded-2xl border border-border bg-surface"
        />
      ))}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-hi text-text-faint">
        {icon}
      </span>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-text-dim">{body}</p>
    </div>
  );
}
