"use server";

import connectDB from "@/lib/db";
import { Unit } from "@/models/Unit";
import { revalidatePath } from "next/cache";

import { IUnit } from "@/lib/types";

export async function getUnits(projectId?: string): Promise<IUnit[]> {
  await connectDB();
  const query = projectId ? { project: projectId } : {};
  return JSON.parse(JSON.stringify(await Unit.find(query).populate("project").sort({ unitNumber: 1 })));
}

export async function createUnit(data: Partial<IUnit>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Unit.create(data);
    revalidatePath("/dashboard/units");
    revalidatePath("/browse");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ইউনিট তৈরি করা সম্ভব হয়নি।" };
  }
}

export async function updateUnit(id: string, data: Partial<IUnit>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Unit.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/units");
    revalidatePath("/browse");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ইউনিট আপডেট করা সম্ভব হয়নি।" };
  }
}

export async function deleteUnit(id: string) {
  try {
    await connectDB();
    await Unit.findByIdAndDelete(id);
    revalidatePath("/dashboard/units");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ইউনিট ডিলিট করা সম্ভব হয়নি।" };
  }
}
