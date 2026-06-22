import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // users — created by Convex Auth, extended with profile data
  users: defineTable({
    name: v.optional(v.string()),        // Display name
    email: v.optional(v.string()),       // From auth provider
    timezone: v.optional(v.string()),    // IANA timezone string, e.g. "Europe/Berlin"
    createdAt: v.number(),               // Unix timestamp ms
  }).index("by_email", ["email"]),

  // habits — user-created recurring activities to track
  habits: defineTable({
    userId: v.id("users"),               // Owner
    name: v.string(),                    // "Running", "Reading", etc.
    emoji: v.string(),                   // Single emoji character: "🏃"
    category: v.optional(v.string()),    // "fitness", "learning", "mindfulness", etc.
    isActive: v.boolean(),               // false = archived, hidden from dashboard
    createdAt: v.number(),               // Unix timestamp ms
    sortOrder: v.optional(v.number()),   // For user-defined ordering
  })
    .index("by_user", ["userId"])
    .index("by_user_active", ["userId", "isActive"]),

  // checkins — one record per habit per day when marked complete
  checkins: defineTable({
    userId: v.id("users"),               // Owner (denormalized for query performance)
    habitId: v.id("habits"),             // Which habit
    date: v.string(),                    // ISO date string "YYYY-MM-DD" in user's local timezone
    completedAt: v.number(),             // Unix timestamp ms (UTC)
  })
    .index("by_habit", ["habitId"])
    .index("by_user_date", ["userId", "date"])
    .index("by_habit_date", ["habitId", "date"]),

});
