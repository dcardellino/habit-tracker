"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { format } from "date-fns";
import { calculateStreak } from "@/lib/streaks";
import { HabitList } from "@/components/habits/HabitList";
import { AddHabitModal } from "@/components/habits/AddHabitModal";
import { Doc, Id } from "convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const today = format(new Date(), "yyyy-MM-dd");

  // Convex queries
  const habits = useQuery(api.habits.listActive);
  const todayStatus = useQuery(api.checkins.getTodayStatus, { date: today });
  const allCheckinDates = useQuery(api.checkins.getAllDatesForUser);

  // Convex mutations
  const setTimezone = useMutation(api.users.setTimezone);
  const removeHabit = useMutation(api.habits.remove);
  const completeCheckin = useMutation(api.checkins.complete);
  const uncompleteCheckin = useMutation(api.checkins.uncomplete);

  // TASK-020 state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Doc<"habits"> | null>(null);
  const [confirmDeleteHabit, setConfirmDeleteHabit] =
    useState<Doc<"habits"> | null>(null);

  // TASK-021 state
  const [undoHabitId, setUndoHabitId] = useState<Id<"habits"> | null>(null);

  // Capture timezone on first sign-in (kept from Phase 0)
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone({ timezone }).catch(() => {
      // Timezone capture is best-effort — ignore errors
    });
  }, [setTimezone]);

  // Loading state: show 3 skeleton cards
  const isLoading =
    habits === undefined ||
    todayStatus === undefined ||
    allCheckinDates === undefined;

  // Compute streaks per habit from full check-in history
  const streaks: Record<string, { currentStreak: number; bestStreak: number }> =
    {};
  if (habits && allCheckinDates) {
    for (const habit of habits) {
      const habitIdStr = habit._id as string;
      const dates = allCheckinDates[habitIdStr] ?? [];
      streaks[habitIdStr] = calculateStreak(dates, today);
    }
  }

  // TASK-021: toggle check-in
  const handleToggle = async (habitId: Id<"habits">) => {
    const isCompleted = todayStatus?.[habitId as string];

    if (!isCompleted) {
      try {
        await completeCheckin({ habitId, date: today });
      } catch {
        // error toast in TASK-030
      }
    } else {
      setUndoHabitId(habitId);
    }
  };

  const handleConfirmUndo = async () => {
    if (!undoHabitId) return;
    try {
      await uncompleteCheckin({ habitId: undoHabitId, date: today });
    } catch {
      // error toast in TASK-030
    }
    setUndoHabitId(null);
  };

  // TASK-020: delete habit
  const handleConfirmDelete = async () => {
    if (!confirmDeleteHabit) return;
    try {
      await removeHabit({ id: confirmDeleteHabit._id });
    } catch {
      // error toast in TASK-030
    }
    setConfirmDeleteHabit(null);
  };

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-[#0F172A]">Today</h1>
        <Button onClick={() => setAddModalOpen(true)} size="sm">
          <Plus size={16} className="mr-1" /> Add habit
        </Button>
      </div>

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <HabitList
          habits={habits}
          todayStatus={todayStatus ?? {}}
          streaks={streaks}
          onToggle={handleToggle}
          onEdit={(habit) => setEditingHabit(habit)}
          onDelete={(habit) => setConfirmDeleteHabit(habit)}
          onAddHabit={() => setAddModalOpen(true)}
        />
      )}

      {/* Add habit modal */}
      <AddHabitModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

      {/* Edit habit modal */}
      <AddHabitModal
        open={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        habit={editingHabit}
      />

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!confirmDeleteHabit}
        onOpenChange={(open) => {
          if (!open) setConfirmDeleteHabit(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete habit?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#64748B]">
            This will delete &ldquo;{confirmDeleteHabit?.name}&rdquo; and all
            its history. This cannot be undone.
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
            <Button
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => setConfirmDeleteHabit(null)}
            >
              Cancel
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Undo check-in dialog */}
      <Dialog
        open={!!undoHabitId}
        onOpenChange={(open) => {
          if (!open) setUndoHabitId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Undo check-in?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#64748B]">
            Remove today&apos;s check-in for this habit?
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
            <Button variant="ghost" className="w-full sm:w-auto" onClick={() => setUndoHabitId(null)}>
              Cancel
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleConfirmUndo}>Remove check-in</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
