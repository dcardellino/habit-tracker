"use client";

import { useEffect } from "react";

export default function StatsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">Failed to load statistics.</p>
      <button
        onClick={reset}
        className="text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
