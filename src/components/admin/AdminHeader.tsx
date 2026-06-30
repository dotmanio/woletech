"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { BUSINESS } from "@/lib/constants";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-purple">
            <Zap className="h-4 w-4 text-white" fill="white" strokeWidth={1} />
          </span>
          <span className="font-display text-base font-bold">
            {BUSINESS.name} <span className="text-text-faint font-normal">· Admin</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-text-dim hover:text-text sm:inline-flex"
          >
            View site <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-text-dim hover:border-red-500/40 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
