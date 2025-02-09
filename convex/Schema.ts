import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  investorsAndMentors: defineTable({
    name: v.string(),
    category: v.string(),
    type: v.union(v.literal("Investor"), v.literal("Mentor")),
  }).index("byCategory", ["category"]),

  users: defineTable({
    email: v.string(),
    credits: v.number(),
  }).index("byEmail", ["email"]),
});