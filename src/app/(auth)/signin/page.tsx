"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      router.push("/dashboard");
    } catch {
      setError("Incorrect email or password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Ritual</h1>
        <p className="text-sm text-[#8E8E93]">Melde dich in deinem Account an</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[#8E8E93]">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="du@beispiel.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-[#636366] focus:outline-none focus:border-[#6366F1] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-[#8E8E93]">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-[#636366] focus:outline-none focus:border-[#6366F1] transition-colors"
          />
        </div>

        {error && <p className="text-sm text-[#DC2626]">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 text-white font-medium rounded-xl py-2.5 text-sm transition-colors mt-2"
        >
          {isLoading ? "Anmelden…" : "Anmelden"}
        </button>

        <p className="text-sm text-[#8E8E93] text-center">
          Noch kein Account?{" "}
          <Link href="/signup" className="text-[#6366F1] hover:underline">
            Registrieren
          </Link>
        </p>
      </form>
    </div>
  );
}
