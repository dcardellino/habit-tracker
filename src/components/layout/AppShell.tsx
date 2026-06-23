import { NavBar } from "./NavBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-20 sm:pb-6">
        {children}
      </main>
    </div>
  );
}
