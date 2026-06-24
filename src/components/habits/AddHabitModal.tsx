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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "./EmojiPicker";
import { CATEGORY_OPTIONS } from "@/lib/constants";

const HABIT_COLORS = [
  "#3B82F6", // blue
  "#22C55E", // green
  "#F97316", // orange
  "#EF4444", // red
  "#A855F7", // purple
  "#EC4899", // pink
  "#EAB308", // yellow
  "#06B6D4", // cyan
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{habit ? "Edit habit" : "Add habit"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Habit name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">
              Habit name
            </label>
            <Input
              type="text"
              placeholder="e.g. Running"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#2C2C2E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
            {nameError && (
              <p className="text-xs text-red-500">{nameError}</p>
            )}
          </div>

          {/* Emoji picker */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">Emoji</label>
            <EmojiPicker value={emoji} onChange={setEmoji} />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Farbe</label>
            <div className="flex gap-2 flex-wrap">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
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
            <label className="text-sm font-medium text-white">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-[#2C2C2E] rounded-lg px-3 py-2 text-sm text-white bg-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <option value="">No category</option>
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
            <Button variant="ghost" onClick={onClose} disabled={saving} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full sm:w-auto bg-[#6366F1] text-white rounded-lg px-4 py-2 text-sm font-medium"
            >
              {saving && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
