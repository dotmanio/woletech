"use client";

import { useState } from "react";
import { categoryVisual } from "@/lib/categoryVisuals";

export default function ProductImage({
  src,
  alt,
  category,
}: {
  src: string | null;
  alt: string;
  category: string;
}) {
  const [errored, setErrored] = useState(false);
  const { icon: Icon, gradient } = categoryVisual(category);

  if (!src || errored) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradient} text-text-faint`}
      >
        <Icon className="h-9 w-9 opacity-70" strokeWidth={1.4} />
        <span className="text-[11px] font-medium tracking-wide">
          Photo coming soon
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- image host is dynamic per-deployment Supabase project, so next/image remotePatterns can't be pre-configured
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );
}
