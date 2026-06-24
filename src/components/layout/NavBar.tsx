"use client";

import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { Settings, BarChart2 } from "lucide-react";

export function NavBar() {
  const { signOut } = useAuthActions();

  return (
    <header className="flex items-center justify-between px-4 py-3">
      {/* Left pill: Settings + Stats navigation */}
      <div className="flex items-center gap-1 bg-[#1C1C1E] border border-[#2C2C2E] rounded-full px-3 py-2">
        <span
          aria-label="Settings"
          className="flex items-center justify-center text-[#636366] cursor-default"
        >
          <Settings size={18} />
        </span>
        <div className="w-px h-4 bg-[#2C2C2E] mx-1" />
        <Link
          href="/stats"
          aria-label="Statistics"
          className="flex items-center justify-center text-white"
        >
          <BarChart2 size={18} />
        </Link>
      </div>

      {/* Right: sign out */}
      <button
        onClick={() => signOut()}
        className="text-[#8E8E93] text-xs font-medium"
      >
        Abmelden
      </button>
    </header>
  );
}
