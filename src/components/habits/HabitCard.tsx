"use client";

import { Check, MoreHorizontal } from "lucide-react";
import { type Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: {
    _id: Id<"habits">;
    name: string;
    emoji: string;
  };
  streak: number;
  isCompleted: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitCard({
  habit,
  streak,
  isCompleted,
  onToggle,
  onEdit,
  onDelete,
}: HabitCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] w-full">
      <div className="flex items-center gap-3">
        {/* Left: emoji + name */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl leading-none shrink-0">{habit.emoji}</span>
          <h3 className="text-base font-semibold text-[#0F172A] truncate">
            {habit.name}
          </h3>
        </div>

        {/* Right: streak badge + check button + menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Streak badge */}
          <span
            className={cn(
              "text-sm font-mono font-medium",
              streak > 0 ? "text-[#16A34A]" : "text-[#64748B]"
            )}
          >
            🔥 {streak}
          </span>

          {/* Check button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-150",
              isCompleted ? "bg-[#16A34A]" : "bg-[#F1F5F9]"
            )}
          >
            {isCompleted && <Check size={18} color="white" strokeWidth={2.5} />}
          </button>

          {/* Three-dot menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Habit options"
              className="flex items-center justify-center w-11 h-11 rounded-md text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors duration-150"
            >
              <MoreHorizontal size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={onDelete}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
