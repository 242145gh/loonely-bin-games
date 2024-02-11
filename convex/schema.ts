// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    documents: defineTable({
      fieldOne: v.string(),
      fieldTwo: v.object({
        subFieldOne: v.array(v.number()),
      }),
    }),
    // This definition matches the example query and mutation code:
    numbers: defineTable({
      value: v.number(),
    }),
    jigsaw: defineTable({
      comment: v.string(),
      name: v.string(),
      userId: v.string(),
      pictureId: v.string()
    }),
    highscore: defineTable({
      highscore: v.number(),
      name: v.string(),
      userId: v.string(),
      pictureId: v.string()
    }),
    games: defineTable({
      gamename: v.string(),
      link: v.string(),
      icon: v.string(),
    }).searchIndex("search_games", {
      searchField: "gamename",
    }),  
    blog: defineTable({
      title: v.string(),
      body: v.string(),
    }).searchIndex("search_blog", {
      searchField: "body",
    }),  
  
     
  

}
);
