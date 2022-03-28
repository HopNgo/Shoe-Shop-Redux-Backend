import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    productSlug: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    userId: { type: String, required: true },
    parentId: { type: String },
  },
  { timestamps: true }
);

export const commentModel = mongoose.model("comment", commentSchema);
