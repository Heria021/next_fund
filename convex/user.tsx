import { query, mutation, internalMutation } from "./_generated/server";
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


export const create = internalMutation({
    args: { email: v.string() },
    handler: async (ctx, { email }) => {
        const existingUser = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), email))
            .first();

        if (existingUser) {
            return true;
        }
    console.log('...')

        await ctx.db.insert("users", { email, credits: 5 });
        return true;
    },
});