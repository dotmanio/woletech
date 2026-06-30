"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Zap, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { BUSINESS } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email or password is incorrect. Please try again.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="circuit-bg absolute inset-0 -z-10" />
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-purple shadow-[0_0_24px_rgba(45,91,255,0.4)]">
            <Zap className="h-6 w-6 text-white" fill="white" strokeWidth={1} />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold">
            {BUSINESS.name} Admin
          </h1>
          <p className="mt-1 text-sm text-text-dim">
            Log in to manage your product stock
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-dim">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-soft px-3.5 py-2.5 text-sm text-text focus:border-blue-soft"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-text-dim">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-soft px-3.5 py-2.5 text-sm text-text focus:border-blue-soft"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-purple px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
