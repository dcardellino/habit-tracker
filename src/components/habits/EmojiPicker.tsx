"use client";

import { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    if (!open) return;

    function handleMouseDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Pick an emoji"
        aria-expanded={open}
        className={cn(
          "w-12 h-12 flex items-center justify-center",
          "border border-[#E2E8F0] rounded-lg",
          "hover:bg-[#F1F5F9] transition-colors duration-150"
        )}
      >
        <span className="text-2xl leading-none">{value || "😀"}</span>
      </button>

      {/* Floating emoji picker panel */}
      {open && (
        <div className="absolute z-50 mt-2">
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native: string }) => {
              onChange(emoji.native);
              setOpen(false);
            }}
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}
    </div>
  );
}
