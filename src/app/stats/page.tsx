"use client";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/stats/StatsCard";

export default function StatsPage() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");

  const stats = useQuery(api.stats.getAll, { timezone, today });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Stats</h1>

      {stats === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : stats.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No habits yet. Head to the dashboard to add your first.</p>
          <Link href="/dashboard" className="text-primary hover:underline mt-2 inline-block">
            Go to dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {stats.map((s) => (
            <StatsCard
              key={s.habitId}
              habitId={s.habitId}
              habitName={s.habitName}
              habitEmoji={s.habitEmoji}
              currentStreak={s.currentStreak}
              bestStreak={s.bestStreak}
              completionRate7d={s.completionRate7d}
              completionRate30d={s.completionRate30d}
              totalCheckins={s.totalCheckins}
              habitCreatedAt={s.habitCreatedAt}
              checkinDates={s.checkinDates}
              userTimezone={timezone}
            />
          ))}
        </div>
      )}
    </div>
  );
}
