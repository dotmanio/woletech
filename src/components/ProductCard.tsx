import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { whatsappLink, productWhatsappMessage } from "@/lib/constants";
import ProductImage from "./ProductImage";

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-blue-soft/50 hover:shadow-[0_10px_36px_rgba(45,91,255,0.16)]">
      <div className="relative aspect-square w-full overflow-hidden border-b border-border bg-bg-soft">
        <ProductImage src={product.image_url} alt={product.name} category={product.category} />

        <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 text-[11px] font-medium text-text-dim backdrop-blur-sm">
          {product.category}
        </span>

        {!product.in_stock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-[11px] font-semibold text-white">
            Sold Out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-sm font-semibold leading-snug sm:text-base">
            {product.name}
          </h3>
          {product.condition && (
            <span className="mt-1 inline-block text-xs text-text-faint">
              {product.condition}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="lcd text-base font-bold text-amber sm:text-lg">
            {formatNaira(product.price)}
          </span>
        </div>

        <a
          href={whatsappLink(productWhatsappMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!product.in_stock}
          className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-transform ${
            product.in_stock
              ? "bg-green text-[#062315] hover:scale-[1.02]"
              : "pointer-events-none bg-surface-hi text-text-faint"
          }`}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {product.in_stock ? "Buy on WhatsApp" : "Currently unavailable"}
        </a>
      </div>
    </div>
  );
}
