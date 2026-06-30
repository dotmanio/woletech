import Link from "next/link";
import { Zap } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue to-purple">
            <Zap className="h-4 w-4 text-white" fill="white" strokeWidth={1} />
          </span>
          <span className="font-display text-sm font-semibold">
            {BUSINESS.name}
          </span>
        </div>

        <p className="text-xs text-text-faint">
          © {new Date().getFullYear()} {BUSINESS.name}. {BUSINESS.tagline}.
        </p>

        <Link
          href="/admin/login"
          className="text-xs text-text-faint underline-offset-4 hover:text-text-dim hover:underline"
        >
          Staff login
        </Link>
      </div>
    </footer>
  );
}
