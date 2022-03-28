import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userInfo: { type: Object, required: true },
    cartInfo: { type: Object, required: true },
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);
