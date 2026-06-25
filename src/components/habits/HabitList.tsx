"use client";

import { Doc, Id } from "convex/_generated/dataModel";
import { HabitCard } from "./HabitCard";
import { Plus } from "lucide-react";

interface HabitListProps {
  habits: Doc<"habits">[];
  todayStatus: Record<string, true>;
  allCheckinDates: Record<string, string[]>;
  onToggle: (habitId: Id<"habits">) => void;
  onEdit: (habit: Doc<"habits">) => void;
  onAddHabit: () => void;
}

export function HabitList({
  habits,
  todayStatus,
  allCheckinDates,
  onToggle,
  onEdit,
  onAddHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-[#8E8E93] text-sm">
          Noch keine Habits. Füge deinen ersten hinzu.
        </p>
        <button
          onClick={onAddHabit}
          className="flex items-center gap-1.5 bg-[#1C1C1E] border border-[#2C2C2E] rounded-full px-3 py-2 text-white text-sm font-medium"
        >
          <Plus size={16} />
          Hinzufügen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {habits.map((habit) => {
        const habitIdStr = habit._id as string;
        return (
          <HabitCard
            key={habit._id}
            habit={habit}
            checkinDates={allCheckinDates[habitIdStr] ?? []}
            isCompleted={!!todayStatus[habitIdStr]}
            onToggle={() => onToggle(habit._id)}
            onEdit={() => onEdit(habit)}
          />
        );
      })}
    </div>
  );
}
