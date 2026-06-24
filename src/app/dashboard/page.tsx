"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "convex/_generated/api";
import { format } from "date-fns";
import { HabitList } from "@/components/habits/HabitList";
import { AddHabitModal } from "@/components/habits/AddHabitModal";
import { Doc, Id } from "convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const { isAuthenticated } = useConvexAuth();

  const habits = useQuery(api.habits.listActive);
  const todayStatus = useQuery(api.checkins.getTodayStatus, { date: today });
  const allCheckinDates = useQuery(api.checkins.getAllDatesForUser);

  const setTimezone = useMutation(api.users.setTimezone);
  const removeHabit = useMutation(api.habits.remove);
  const completeCheckin = useMutation(api.checkins.complete);
  const uncompleteCheckin = useMutation(api.checkins.uncomplete);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Doc<"habits"> | null>(null);
  const [undoHabitId, setUndoHabitId] = useState<Id<"habits"> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone({ timezone }).catch(() => {});
  }, [isAuthenticated, setTimezone]);

  const isLoading =
    habits === undefined ||
    todayStatus === undefined ||
    allCheckinDates === undefined;

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

  const handleDeleteHabit = async () => {
    if (!editingHabit) return;
    try {
      await removeHabit({ id: editingHabit._id });
    } catch {
      // error toast in TASK-030
    }
    setEditingHabit(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-[34px] font-bold text-white leading-tight">Habits</h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 bg-[#1C1C1E] border border-[#2C2C2E] rounded-full px-3 py-2 text-white text-sm font-medium shrink-0"
        >
          <Plus size={16} />
          Hinzufügen
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl bg-[#1C1C1E]" />
          ))}
        </div>
      ) : (
        <HabitList
          habits={habits}
          todayStatus={todayStatus ?? {}}
          allCheckinDates={allCheckinDates ?? {}}
          onToggle={handleToggle}
          onEdit={(habit) => setEditingHabit(habit)}
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
        onDelete={handleDeleteHabit}
      />

      {/* Undo check-in dialog */}
      <Dialog
        open={!!undoHabitId}
        onOpenChange={(open) => { if (!open) setUndoHabitId(null); }}
      >
        <DialogContent className="bg-[#1C1C1E] border border-[#2C2C2E]">
          <DialogHeader>
            <DialogTitle className="text-white">Check-in rückgängig?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#8E8E93]">
            Den heutigen Check-in für dieses Habit entfernen?
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
            <button
              onClick={() => setUndoHabitId(null)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm text-[#8E8E93] hover:text-white transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleConfirmUndo}
              className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium rounded-xl px-4 py-2.5 text-sm transition-colors"
            >
              Check-in entfernen
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
