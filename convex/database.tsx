import { query } from "./_generated/server";

export const getAllInvestorsAndMentors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("investorsAndMentors").collect();
  },
});