import {
  differenceInCalendarDays,
  format,
  parseISO,
  subDays,
} from "date-fns";

export function calculateStreak(
  checkinDates: string[], // array of "YYYY-MM-DD" strings (already in user's local timezone)
  today: string, // "YYYY-MM-DD" string in user's local timezone
): { currentStreak: number; bestStreak: number } {
  if (checkinDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  // Deduplicate and sort ascending
  const unique = Array.from(new Set(checkinDates)).sort();

  // --- Best streak ---
  let bestStreak = 1;
  let runLength = 1;
  for (let i = 1; i < unique.length; i++) {
    const diff = differenceInCalendarDays(
      parseISO(unique[i]),
      parseISO(unique[i - 1]),
    );
    if (diff === 1) {
      runLength++;
      if (runLength > bestStreak) {
        bestStreak = runLength;
      }
    } else {
      runLength = 1;
    }
  }

  // --- Current streak ---
  const dateSet = new Set(unique);
  const todayDate = parseISO(today);
  const yesterdayStr = format(subDays(todayDate, 1), "yyyy-MM-dd");

  // Determine the anchor: today if checked in, yesterday if checked in, else 0
  let anchor: string | null = null;
  if (dateSet.has(today)) {
    anchor = today;
  } else if (dateSet.has(yesterdayStr)) {
    anchor = yesterdayStr;
  }

  let currentStreak = 0;
  if (anchor !== null) {
    currentStreak = 1;
    let cursor = parseISO(anchor);
    // Walk backwards day by day
    while (true) {
      cursor = subDays(cursor, 1);
      const cursorStr = format(cursor, "yyyy-MM-dd");
      if (dateSet.has(cursorStr)) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, bestStreak };
}
