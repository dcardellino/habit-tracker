import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTimezone = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    return user?.timezone ?? null;
  },
});

export const setTimezone = mutation({
  args: { timezone: v.string() },
  handler: async (ctx, { timezone }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return; // User record not yet created, skip
    }
    if (!user.timezone) {
      await ctx.db.patch(userId, { timezone });
    }
  },
});
