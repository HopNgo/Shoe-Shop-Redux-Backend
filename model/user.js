import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: Object, default: null },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
