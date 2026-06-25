"use client";

import { Check, Settings } from "lucide-react";
import { type Id } from "../../../convex/_generated/dataModel";
import { HabitMiniGrid } from "./HabitMiniGrid";

const DEFAULT_COLOR = "#3B82F6";

interface HabitCardProps {
  habit: {
    _id: Id<"habits">;
    name: string;
    emoji: string;
    createdAt: number;
    color?: string;
  };
  isCompleted: boolean;
  checkinDates: string[];
  onToggle: () => void;
  onEdit: () => void;
}

export function HabitCard({
  habit,
  isCompleted,
  checkinDates,
  onToggle,
  onEdit,
}: HabitCardProps) {
  const color = habit.color ?? DEFAULT_COLOR;

  return (
    <div className="flex gap-3 bg-[#1C1C1E] rounded-2xl p-4 w-full">
      {/* Left section: header + grid */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Header: emoji + name */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl leading-none shrink-0">{habit.emoji}</span>
          <h3 className="text-base font-semibold text-white truncate">
            {habit.name}
          </h3>
        </div>

        {/* Contribution grid */}
        <HabitMiniGrid
          checkinDates={checkinDates}
          habitCreatedAt={habit.createdAt}
          color={color}
        />
      </div>

      {/* Right section: settings pill + check-in pill */}
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={onEdit}
          aria-label="Habit bearbeiten"
          className="w-14 rounded-2xl bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors"
        >
          <Settings size={18} />
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
          className="w-14 rounded-2xl flex items-center justify-center transition-opacity duration-150"
          style={{ backgroundColor: color, opacity: isCompleted ? 1 : 0.5 }}
        >
          <Check size={20} color="white" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
