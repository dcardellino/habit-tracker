"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const { signOut } = useAuthActions();
  const pathname = usePathname();

  return (
    <>
      {/* Top nav — hidden on mobile (sm:flex) */}
      <header className="hidden sm:flex h-14 items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
        <span className="text-base font-semibold text-[#0F172A]">Ritual</span>
        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "bg-[#F1F5F9] text-[#0F172A]"
                : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/stats"
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === "/stats"
                ? "bg-[#F1F5F9] text-[#0F172A]"
                : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
            }`}
          >
            Stats
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
          className="text-[#475569] text-sm"
        >
          Sign out
        </Button>
      </header>

      {/* Bottom tab bar — visible on mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 sm:hidden flex border-t border-[#E2E8F0] bg-white z-50">
        <Link
          href="/dashboard"
          className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
            pathname === "/dashboard"
              ? "text-[#6366F1]"
              : "text-[#475569]"
          }`}
        >
          <span className="text-lg mb-0.5">📋</span>
          Dashboard
        </Link>
        <Link
          href="/stats"
          className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors ${
            pathname === "/stats"
              ? "text-[#6366F1]"
              : "text-[#475569]"
          }`}
        >
          <span className="text-lg mb-0.5">📊</span>
          Stats
        </Link>
        <button
          onClick={() => signOut()}
          className="flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium text-[#475569]"
        >
          <span className="text-lg mb-0.5">👤</span>
          Sign out
        </button>
      </nav>
    </>
  );
}
