import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

/**
 * listActive — query
 * Returns all active habits for the authenticated user.
 */
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const habits = await ctx.db
      .query("habits")
      .withIndex("by_user_active", (q) => q.eq("userId", userId).eq("isActive", true))
      .order("asc")
      .take(100);

    return habits;
  },
});

/**
 * create — mutation
 * Creates a new habit for the authenticated user.
 */
export const create = mutation({
  args: {
    name: v.string(),
    emoji: v.string(),
    color: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const habitId = await ctx.db.insert("habits", {
      userId,
      name: args.name,
      emoji: args.emoji,
      color: args.color,
      category: args.category,
      isActive: true,
      createdAt: Date.now(),
    });

    return habitId;
  },
});

/**
 * update — mutation
 * Updates an existing habit (name, emoji, color, category).
 * Verifies ownership before updating.
 */
export const update = mutation({
  args: {
    id: v.id("habits"),
    name: v.string(),
    emoji: v.string(),
    color: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const habit = await ctx.db.get(args.id);
    if (!habit) {
      throw new Error("Habit not found");
    }
    if (habit.userId !== userId) {
      throw new Error("Not authorized to update this habit");
    }

    await ctx.db.patch(args.id, {
      name: args.name,
      emoji: args.emoji,
      color: args.color,
      category: args.category,
    });
  },
});

/**
 * archive — mutation
 * Archives a habit by setting isActive to false.
 * Verifies ownership before archiving.
 */
export const archive = mutation({
  args: {
    id: v.id("habits"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const habit = await ctx.db.get(args.id);
    if (!habit) {
      throw new Error("Habit not found");
    }
    if (habit.userId !== userId) {
      throw new Error("Not authorized to archive this habit");
    }

    await ctx.db.patch(args.id, { isActive: false });
  },
});

/**
 * remove — mutation
 * Deletes a habit and all its associated checkins.
 * Uses batched deletion to handle large checkin sets efficiently.
 * Verifies ownership before deleting.
 */
export const remove = mutation({
  args: {
    id: v.id("habits"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const habit = await ctx.db.get(args.id);
    if (!habit) {
      throw new Error("Habit not found");
    }
    if (habit.userId !== userId) {
      throw new Error("Not authorized to remove this habit");
    }

    // Delete all checkins for this habit in batches
    while (true) {
      const batch = await ctx.db
        .query("checkins")
        .withIndex("by_habit", (q) => q.eq("habitId", args.id))
        .take(100);

      if (batch.length === 0) break;

      await Promise.all(batch.map((checkin) => ctx.db.delete(checkin._id)));
    }

    // Delete the habit itself
    await ctx.db.delete(args.id);
  },
});
