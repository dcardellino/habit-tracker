"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DashboardPage() {
  const setTimezone = useMutation(api.users.setTimezone);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone({ timezone }).catch(() => {
      // Timezone capture is best-effort — ignore errors
    });
  }, [setTimezone]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Dashboard</h1>
      <p className="text-[#475569]">Your habits will appear here.</p>
    </div>
  );
}
