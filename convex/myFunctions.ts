import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const listNumbers = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const numbers = await ctx.db
      .query("numbers")
      // Ordered by _creationTime, return most recent
      .order("desc")
      .take(args.count);
    return {
      viewer: (await ctx.auth.getUserIdentity())?.name ?? null,
      numbers: numbers.toReversed().map((number) => number.value),
    };
  },
});

// You can write data to the database via a mutation:
export const addNumber = mutation({
  // Validators for arguments.
  args: {
    value: v.number(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
   
    const id = await ctx.db.insert("numbers", { value: args.value });

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const myAction = action({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    //// Use the browser-like `fetch` API to send HTTP requests.
    //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    // const response = await ctx.fetch("https://api.thirdpartyservice.com");
    // const data = await response.json();

    //// Query data by running Convex queries.
    const data = await ctx.runQuery(api.myFunctions.listNumbers, {
      count: 10,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.myFunctions.addNumber, {
      value: args.first,
    });
  },
});


export const addComment = mutation({
  args: {
  
    comment: v.string(),

  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const id = await ctx.db.insert("jigsaw", {
      comment: args.comment,
      name: identity.name!,
      userId: identity.subject,
      pictureId: identity.pictureUrl!,
    });

    console.log("comment added:", id);
  },
});

export const allComments = query(async (ctx) => {
  return await ctx.db.query("jigsaw").order("desc").collect();
});

export const addHighScore = mutation({
  args: {
      highscore: v.number(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called Highscore without authentication!");
    }

    const id = await ctx.db.insert("highscore", {
      highscore: args.highscore,
      name: identity.name! || "Anon",
      userId: identity.subject || "Anon",
      pictureId: identity.pictureUrl! || "Anon"
    });

    console.log("highscore added:", id);
  },
});

export const getHighScores = query(async (ctx) => {
  return await ctx.db.query("highscore").collect();
});

export const commandSearch = query({
  args: {
    gamename: v.string(),
    
  },

  handler: async (ctx, args) => {
    
    return await ctx.db
    .query("games")
    .withSearchIndex("search_games", (q) =>
      q.search("gamename", args.gamename)
    ).take(10);
     
  }
});

export const blogSearch = query({
  args: {
    body: v.string(),
    
  },

  handler: async (ctx, args) => {
    
    return await ctx.db
    .query("blog")
    .withSearchIndex("search_blog", (q) =>
      q.search("body", args.body)
    ).take(10);
     
  }
});


export const getBlog = query({
  args: {
    _id: v.string(),
    
  },

  handler: async (ctx, args) => {
    
    return await ctx.db
    .query("blog")
    .filter((q) => q.eq(q.field("_id"), args._id))
    .collect();
     
  }
});
