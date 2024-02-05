import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  jigsaw: defineTable({
    comment: v.string(),
    name: v.string(),
    userId: v.string(),
    pictureId: v.string()
  }),
});