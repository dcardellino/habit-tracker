import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { differenceInCalendarDays, format, parseISO, subDays } from "date-fns";
import { calculateStreak } from "./streaksHelper";

export const getAll = query({
  args: {
    today: v.string(), // YYYY-MM-DD in user's local timezone
  },
  returns: v.array(
    v.object({
      habitId: v.id("habits"),
      habitName: v.string(),
      habitEmoji: v.string(),
      currentStreak: v.number(),
      bestStreak: v.number(),
      completionRate7d: v.number(),
      completionRate30d: v.number(),
      totalCheckins: v.number(),
      habitCreatedAt: v.number(),
      checkinDates: v.array(v.string()),
    }),
  ),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const habits = await ctx.db
      .query("habits")
      .withIndex("by_user_active", (q) =>
        q.eq("userId", userId).eq("isActive", true),
      )
      .take(100);

    const startDate90 = format(subDays(parseISO(args.today), 90), "yyyy-MM-dd");
    const startDate7 = format(subDays(parseISO(args.today), 6), "yyyy-MM-dd");
    const startDate30 = format(subDays(parseISO(args.today), 29), "yyyy-MM-dd");

    const allCheckins = await ctx.db
      .query("checkins")
      .withIndex("by_user_date", (q) =>
        q
          .eq("userId", userId)
          .gte("date", startDate90)
          .lte("date", args.today),
      )
      .take(10000);

    const checkinsByHabit = new Map<string, string[]>();
    for (const checkin of allCheckins) {
      const key = checkin.habitId as string;
      const existing = checkinsByHabit.get(key);
      if (existing) {
        existing.push(checkin.date);
      } else {
        checkinsByHabit.set(key, [checkin.date]);
      }
    }

    return habits.map((habit) => {
      const dates = checkinsByHabit.get(habit._id as string) ?? [];
      const { currentStreak, bestStreak } = calculateStreak(dates, args.today);

      const daysSinceCreation = differenceInCalendarDays(
        parseISO(args.today),
        new Date(habit.createdAt),
      );

      const dates7d = dates.filter((d) => d >= startDate7);
      const dates30d = dates.filter((d) => d >= startDate30);

      const completionRate7d =
        dates7d.length / Math.min(7, daysSinceCreation + 1);
      const completionRate30d =
        dates30d.length / Math.min(30, daysSinceCreation + 1);

      return {
        habitId: habit._id,
        habitName: habit.name,
        habitEmoji: habit.emoji,
        currentStreak,
        bestStreak,
        completionRate7d,
        completionRate30d,
        totalCheckins: dates.length,
        habitCreatedAt: habit.createdAt,
        checkinDates: dates,
      };
    });
  },
});
