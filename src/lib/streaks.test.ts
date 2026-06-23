import { describe, expect, it } from "vitest";
import { calculateStreak } from "./streaks";

const TODAY = "2024-03-15";

describe("calculateStreak", () => {
  // Case 1: Empty checkinDates
  it("returns 0/0 for empty input", () => {
    expect(calculateStreak([], TODAY)).toEqual({
      currentStreak: 0,
      bestStreak: 0,
    });
  });

  // Case 2: Single check-in on today
  it("returns 1/1 for a single check-in on today", () => {
    expect(calculateStreak([TODAY], TODAY)).toEqual({
      currentStreak: 1,
      bestStreak: 1,
    });
  });

  // Case 3: Single check-in on yesterday
  it("returns 1/1 for a single check-in on yesterday", () => {
    expect(calculateStreak(["2024-03-14"], TODAY)).toEqual({
      currentStreak: 1,
      bestStreak: 1,
    });
  });

  // Case 4: Single check-in 2 days ago
  it("returns 0/1 for a single check-in 2 days ago", () => {
    expect(calculateStreak(["2024-03-13"], TODAY)).toEqual({
      currentStreak: 0,
      bestStreak: 1,
    });
  });

  // Case 5: Active streak — 3 consecutive days ending today
  it("returns 3/3 for 3 consecutive days ending today", () => {
    const dates = ["2024-03-13", "2024-03-14", "2024-03-15"];
    expect(calculateStreak(dates, TODAY)).toEqual({
      currentStreak: 3,
      bestStreak: 3,
    });
  });

  // Case 6: Broken streak — 3 days, then a gap, then today
  it("returns currentStreak=1 bestStreak=3 for broken streak ending today", () => {
    // 3-day run: Mar 10-12, gap on Mar 13-14, then today Mar 15
    const dates = ["2024-03-10", "2024-03-11", "2024-03-12", "2024-03-15"];
    expect(calculateStreak(dates, TODAY)).toEqual({
      currentStreak: 1,
      bestStreak: 3,
    });
  });

  // Case 7: Long streak with gap — 5 days, gap, then 2 days ending today
  it("returns currentStreak=2 bestStreak=5 for 5-day run then gap then 2-day run ending today", () => {
    // 5-day run: Mar 1-5, gap, 2-day run: Mar 14-15
    const dates = [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
      "2024-03-14",
      "2024-03-15",
    ];
    expect(calculateStreak(dates, TODAY)).toEqual({
      currentStreak: 2,
      bestStreak: 5,
    });
  });

  // Case 8: Duplicate dates in input
  it("handles duplicate dates correctly", () => {
    const dates = [
      "2024-03-13",
      "2024-03-14",
      "2024-03-15",
      "2024-03-13",
      "2024-03-14",
    ];
    expect(calculateStreak(dates, TODAY)).toEqual({
      currentStreak: 3,
      bestStreak: 3,
    });
  });

  // Case 9: Best streak in past, current streak from yesterday
  it("handles best streak in past with current streak anchored on yesterday", () => {
    // 5-day run ended long ago, and yesterday is checked in (not today)
    const dates = [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
      "2024-03-13",
      "2024-03-14",
    ];
    // today = 2024-03-15, yesterday = 2024-03-14 (checked in), 2024-03-13 also checked in
    expect(calculateStreak(dates, TODAY)).toEqual({
      currentStreak: 2,
      bestStreak: 5,
    });
  });
});
