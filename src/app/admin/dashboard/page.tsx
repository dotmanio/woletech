"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2, PackageSearch } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductFormModal from "@/components/admin/ProductFormModal";
import ProductImage from "@/components/ProductImage";

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts((data ?? []) as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      loadProducts();
    });
  }, [loadProducts]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setModalOpen(true);
  }

  function handleSaved() {
    setModalOpen(false);
    setEditing(null);
    loadProducts();
  }

  async function handleDelete(product: Product) {
    setDeletingId(product.id);
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", product.id);
    setDeletingId(null);
    setConfirmDelete(null);
    loadProducts();
  }

  async function toggleStock(product: Product) {
    const supabase = createClient();
    await supabase
      .from("products")
      .update({ in_stock: !product.in_stock })
      .eq("id", product.id);
    loadProducts();
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <AdminHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Manage Stock</h1>
            <p className="mt-1 text-sm text-text-dim">
              {products.length} product{products.length === 1 ? "" : "s"} listed
              · changes appear on the live site instantly
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue to-purple px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(45,91,255,0.35)] hover:scale-[1.02] transition-transform"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-faint">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-hi text-text-faint">
              <PackageSearch className="h-7 w-7" />
            </span>
            <h3 className="font-display text-base font-semibold">No products yet</h3>
            <p className="max-w-sm text-sm text-text-dim">
              Add your first item — it&apos;ll show up on the live site right away.
            </p>
            <button
              onClick={openAdd}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue to-purple px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="divide-y divide-border">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 bg-surface p-4 sm:flex-row sm:items-center sm:p-5"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-bg-soft">
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      category={product.category}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-sm font-semibold sm:text-base">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-faint">
                      {product.category}
                      {product.condition ? ` · ${product.condition}` : ""}
                    </p>
                  </div>

                  <span className="lcd shrink-0 text-sm font-bold text-amber sm:text-base">
                    {formatNaira(product.price)}
                  </span>

                  <button
                    onClick={() => toggleStock(product)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      product.in_stock
                        ? "bg-green/15 text-green"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {product.in_stock ? "In stock" : "Sold out"}
                  </button>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="rounded-full border border-border p-2.5 text-text-dim hover:text-text"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(product)}
                      className="rounded-full border border-border p-2.5 text-text-dim hover:border-red-500/40 hover:text-red-400"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {modalOpen && (
        <ProductFormModal
          product={editing}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center">
            <h3 className="font-display text-base font-semibold">
              Delete &quot;{confirmDelete.name}&quot;?
            </h3>
            <p className="mt-2 text-sm text-text-dim">
              This can&apos;t be undone. The product will be removed from the
              live site immediately.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-text-dim hover:text-text"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={deletingId === confirmDelete.id}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {deletingId === confirmDelete.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
