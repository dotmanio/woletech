"use client";

import { useState, type FormEvent } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES, CONDITIONS } from "@/lib/constants";
import type { Product } from "@/lib/types";
import ProductImage from "@/components/ProductImage";

export default function ProductFormModal({
  product,
  onClose,
  onSaved,
}: {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(product);
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [category, setCategory] = useState(product?.category ?? CATEGORIES[0]);
  const [condition, setCondition] = useState(product?.condition ?? CONDITIONS[0]);
  const [description, setDescription] = useState(product?.description ?? "");
  const [inStock, setInStock] = useState(product?.in_stock ?? true);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError("Image upload failed: " + uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const priceNum = Number(price);
    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (!price || Number.isNaN(priceNum) || priceNum < 0) {
      setError("Enter a valid price.");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      name: name.trim(),
      price: priceNum,
      category,
      condition: condition || null,
      description: description.trim() || null,
      in_stock: inStock,
      image_url: imageUrl || null,
    };

    const { error: saveError } = isEdit
      ? await supabase.from("products").update(payload).eq("id", product!.id)
      : await supabase.from("products").insert(payload);

    setSaving(false);

    if (saveError) {
      setError("Could not save: " + saveError.message);
      return;
    }

    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-surface p-6 sm:rounded-3xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-text-faint hover:bg-surface-hi hover:text-text"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-dim">
              Product Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-bg-soft">
                <ProductImage src={imageUrl || null} alt="Preview" category={category} />
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-bg-soft px-4 py-2.5 text-xs font-medium text-text-dim hover:text-text">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading ? "Uploading…" : "Upload photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
              </label>
            </div>
          </div>

          <Field label="Product Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. iPhone 13 Pro 256GB"
              className="input"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (₦)">
              <input
                type="number"
                min="0"
                step="100"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="450000"
                className="input"
                required
              />
            </Field>
            <Field label="Condition">
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="input"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Description (optional)">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Storage size, color, any notes worth mentioning…"
              className="input resize-none"
            />
          </Field>

          <label className="flex items-center gap-2.5 text-sm text-text-dim">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-blue"
            />
            Available / in stock
          </label>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-border py-3 text-sm font-semibold text-text-dim hover:text-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 rounded-full bg-gradient-to-r from-blue to-purple py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--bg-soft);
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          color: var(--text);
        }
        .input:focus {
          border-color: var(--blue-soft);
          outline: none;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-dim">{label}</label>
      {children}
    </div>
  );
}
