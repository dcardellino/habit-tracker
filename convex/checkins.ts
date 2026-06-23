import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

/**
 * getTodayStatus — query
 * Returns a map of habitId -> true for habits that have a check-in on the specified date.
 * Args: { date: string } — ISO date string "YYYY-MM-DD" in user's local timezone
 */
export const getTodayStatus = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const checkins = await ctx.db
      .query("checkins")
      .withIndex("by_user_date", (q) => q.eq("userId", userId).eq("date", args.date))
      .take(100);

    const todayStatus: Record<string, true> = {};
    for (const checkin of checkins) {
      todayStatus[checkin.habitId] = true;
    }

    return todayStatus;
  },
});

/**
 * complete — mutation
 * Creates a check-in for a habit on a specific date.
 * MUST be idempotent — returns early if check-in already exists.
 * Args: { habitId: Id<"habits">, date: string }
 * Returns: the new checkin _id (or null if already existed)
 */
export const complete = mutation({
  args: {
    habitId: v.id("habits"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify the habit exists and belongs to this user
    const habit = await ctx.db.get(args.habitId);
    if (!habit || habit.userId !== userId) {
      throw new Error("Habit not found");
    }

    // Check if a check-in already exists for this habit+date
    const existing = await ctx.db
      .query("checkins")
      .withIndex("by_habit_date", (q) =>
        q.eq("habitId", args.habitId).eq("date", args.date)
      )
      .unique();

    if (existing) {
      // Already checked in — return null (idempotent)
      return null;
    }

    // Insert new check-in
    const checkinId = await ctx.db.insert("checkins", {
      userId,
      habitId: args.habitId,
      date: args.date,
      completedAt: Date.now(),
    });

    return checkinId;
  },
});

/**
 * uncomplete — mutation
 * Deletes a check-in for a habit on a specific date.
 * Idempotent — returns without error if not found.
 * Only deletes if the check-in belongs to the authenticated user (ownership check).
 * Args: { habitId: Id<"habits">, date: string }
 */
export const uncomplete = mutation({
  args: {
    habitId: v.id("habits"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Find the check-in for this habit+date
    const checkin = await ctx.db
      .query("checkins")
      .withIndex("by_habit_date", (q) =>
        q.eq("habitId", args.habitId).eq("date", args.date)
      )
      .unique();

    if (!checkin) {
      // Not found — idempotent, just return
      return;
    }

    // Ownership check: only delete if this check-in belongs to the user
    if (checkin.userId !== userId) {
      throw new Error("Not authorized to delete this check-in");
    }

    // Delete the check-in
    await ctx.db.delete(checkin._id);
  },
});

/**
 * getAllDatesForUser — query
 * Returns all check-in dates grouped by habitId for the authenticated user.
 * Used for efficient streak calculation without N+1 queries.
 * Returns: Record<habitId, string[]>
 */
export const getAllDatesForUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return {};

    const checkins = await ctx.db
      .query("checkins")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .take(10000);

    const byHabit: Record<string, string[]> = {};
    for (const checkin of checkins) {
      const key = checkin.habitId as string;
      if (!byHabit[key]) byHabit[key] = [];
      byHabit[key].push(checkin.date);
    }
    return byHabit;
  },
});

/**
 * getRange — query
 * Returns all check-ins for a habit within a date range.
 * Args: { habitId: Id<"habits">, startDate: string, endDate: string }
 * Returns: array of checkin documents
 */
export const getRange = query({
  args: {
    habitId: v.id("habits"),
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const checkins = await ctx.db
      .query("checkins")
      .withIndex("by_habit_date", (q) =>
        q
          .eq("habitId", args.habitId)
          .gte("date", args.startDate)
          .lte("date", args.endDate)
      )
      .take(400);

    return checkins;
  },
});
