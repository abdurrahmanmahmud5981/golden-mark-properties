"use server";

import connectDB from "@/lib/db";
import { Lead } from "@/models/Lead";
import { revalidatePath } from "next/cache";

import { ILead, LeadStatus } from "@/lib/types";

export async function getLeads(): Promise<ILead[]> {
  await connectDB();
  return JSON.parse(JSON.stringify(await Lead.find().sort({ createdAt: -1 })));
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Lead.findByIdAndUpdate(id, { status });
    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "লিড আপডেট করা সম্ভব হয়নি।" };
  }
}

export async function deleteLead(id: string) {
  try {
    await connectDB();
    await Lead.findByIdAndDelete(id);
    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "লিড ডিলিট করা সম্ভব হয়নি।" };
  }
}
