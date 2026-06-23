"use client";

import { Doc, Id } from "convex/_generated/dataModel";
import { HabitCard } from "./HabitCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HabitListProps {
  habits: Doc<"habits">[];
  todayStatus: Record<string, true>;
  streaks: Record<string, { currentStreak: number; bestStreak: number }>;
  onToggle: (habitId: Id<"habits">) => void;
  onEdit: (habit: Doc<"habits">) => void;
  onDelete: (habit: Doc<"habits">) => void;
  onAddHabit: () => void;
}

export function HabitList({
  habits,
  todayStatus,
  streaks,
  onToggle,
  onEdit,
  onDelete,
  onAddHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-[#64748B] text-sm">
          No habits yet. Add your first one.
        </p>
        <Button size="sm" onClick={onAddHabit}>
          <Plus size={16} className="mr-1" /> Add habit
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {habits.map((habit) => {
        const habitIdStr = habit._id as string;
        const streakData = streaks[habitIdStr] ?? {
          currentStreak: 0,
          bestStreak: 0,
        };
        return (
          <HabitCard
            key={habit._id}
            habit={habit}
            streak={streakData.currentStreak}
            isCompleted={!!todayStatus[habitIdStr]}
            onToggle={() => onToggle(habit._id)}
            onEdit={() => onEdit(habit)}
            onDelete={() => onDelete(habit)}
          />
        );
      })}
    </div>
  );
}
