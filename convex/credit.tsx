import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const fetch = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

export const increment = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();
  
      if (user) {
        await ctx.db.patch(user._id, { credits: 5 });
      }
    },
  });

  export const decrement = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();
  
      if (user && user.credits > 0) {
        await ctx.db.patch(user._id, { credits: user.credits - 1 });
      }
    },
  });