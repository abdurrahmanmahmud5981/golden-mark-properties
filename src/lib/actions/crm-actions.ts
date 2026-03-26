"use server";

import connectDB from "@/lib/db";
import { Lead } from "@/models/Lead";
import { revalidatePath } from "next/cache";

import { ILead, LeadStatus, IPaginatedResponse } from "@/lib/types";

export async function getLeads(
  page = 1,
  limit = 10,
  search = ""
): Promise<IPaginatedResponse<ILead>> {
  await connectDB();
  const skip = (page - 1) * limit;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  
  const data = await Lead.find(query)
    .populate("project")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const totalItems = await Lead.countDocuments(query);
  
  return {
    data: JSON.parse(JSON.stringify(data)),
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
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
