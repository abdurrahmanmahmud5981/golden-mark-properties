import mongoose, { Schema, model, models } from "mongoose";

export enum UserRole {
  SUPER_ADMIN = "সুপার অ্যাডমিন",
  SALES_EXECUTIVE = "সেলস এক্সিকিউটিভ",
  FINANCE = "ফাইন্যান্স",
  PROJECT_MANAGER = "প্রজেক্ট ম্যানেজার",
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.SALES_EXECUTIVE,
    },
    image: String,
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
