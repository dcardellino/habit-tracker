"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmojiPicker } from "./EmojiPicker";
import { CATEGORY_OPTIONS } from "@/lib/constants";

const HABIT_COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F97316",
  "#EF4444",
  "#A855F7",
  "#EC4899",
  "#EAB308",
  "#06B6D4",
];

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
  habit?: Doc<"habits"> | null;
}

export function AddHabitModal({ open, onClose, habit }: AddHabitModalProps) {
  const [name, setName] = useState(habit?.name ?? "");
  const [emoji, setEmoji] = useState(habit?.emoji ?? "✨");
  const [category, setCategory] = useState(habit?.category ?? "");
  const [color, setColor] = useState(habit?.color ?? "#3B82F6");
  const [nameError, setNameError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const createHabit = useMutation(api.habits.create);
  const updateHabit = useMutation(api.habits.update);

  useEffect(() => {
    if (open) {
      setName(habit?.name ?? "");
      setEmoji(habit?.emoji ?? "✨");
      setCategory(habit?.category ?? "");
      setColor(habit?.color ?? "#3B82F6");
      setNameError("");
      setSaveError("");
    }
  }, [open, habit]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setNameError("Habit name is required");
      return;
    }
    setNameError("");
    setSaveError("");
    setSaving(true);
    try {
      if (habit) {
        await updateHabit({
          id: habit._id,
          name: name.trim(),
          emoji,
          category: category || undefined,
          color,
        });
      } else {
        await createHabit({
          name: name.trim(),
          emoji,
          category: category || undefined,
          color,
        });
      }
      onClose();
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="bg-[#1C1C1E] border border-[#2C2C2E] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {habit ? "Habit bearbeiten" : "Habit hinzufügen"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Habit name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#8E8E93]">
              Name
            </label>
            <input
              type="text"
              placeholder="z.B. Laufen"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-[#636366] focus:outline-none focus:border-[#6366F1] transition-colors"
            />
            {nameError && (
              <p className="text-xs text-red-500">{nameError}</p>
            )}
          </div>

          {/* Emoji picker */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#8E8E93]">Emoji</label>
            <EmojiPicker value={emoji} onChange={setEmoji} />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#8E8E93]">Farbe</label>
            <div className="flex gap-2 flex-wrap">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: c }}
                  aria-label={`Farbe ${c} auswählen`}
                >
                  {color === c && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#8E8E93]">
              Kategorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors"
            >
              <option value="">Keine Kategorie</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Save error */}
          {saveError && (
            <p className="text-xs text-red-500">{saveError}</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-[#8E8E93] hover:text-white transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 text-white font-medium rounded-xl px-4 py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Speichern
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
