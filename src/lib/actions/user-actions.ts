"use server";

import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { IUser, UserRole } from "@/lib/types";

export async function getUsers(): Promise<IUser[]> {
  await connectDB();
  return JSON.parse(JSON.stringify(await User.find().select("-password").sort({ createdAt: -1 })));
}

export async function createUser(data: Partial<IUser> & { password?: string }): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    
    if (!data.email || !data.password) throw new Error("Email and password are required");

    // Check if user exists
    const existing = await User.findOne({ email: data.email });
    if (existing) return { success: false, error: "এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হচ্ছে।" };

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    await User.create({
      ...data,
      password: hashedPassword
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ইউজার তৈরি করা সম্ভব হয়নি।" };
  }
}

export async function updateUserRole(id: string, role: UserRole): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await User.findByIdAndUpdate(id, { role });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ইউজার রোল আপডেট করা সম্ভব হয়নি।" };
  }
}

export async function deleteUser(id: string) {
  try {
    await connectDB();
    await User.findByIdAndDelete(id);
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ইউজার ডিলিট করা সম্ভব হয়নি।" };
  }
}
