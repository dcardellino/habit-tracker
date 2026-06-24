"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    setIsLoading(true);
    try {
      await signIn("password", { email, password, flow: "signUp" });
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      if (
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("exists") ||
        message.toLowerCase().includes("duplicate")
      ) {
        setError("Ein Account mit dieser E-Mail existiert bereits.");
      } else {
        setError("Ein Account mit dieser E-Mail existiert bereits.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Ritual</h1>
        <p className="text-sm text-[#8E8E93]">Erstelle deinen Account</p>
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
            placeholder="Mind. 8 Zeichen"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
            className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-[#636366] focus:outline-none focus:border-[#6366F1] transition-colors"
          />
        </div>

        {error && <p className="text-sm text-[#DC2626]">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 text-white font-medium rounded-xl py-2.5 text-sm transition-colors mt-2"
        >
          {isLoading ? "Account wird erstellt…" : "Account erstellen"}
        </button>

        <p className="text-sm text-[#8E8E93] text-center">
          Bereits ein Account?{" "}
          <Link href="/signin" className="text-[#6366F1] hover:underline">
            Anmelden
          </Link>
        </p>
      </form>
    </div>
  );
}
