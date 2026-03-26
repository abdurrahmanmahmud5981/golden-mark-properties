"use server";

import connectDB from "@/lib/db";
import { Lead } from "@/models/Lead";
import { revalidatePath } from "next/cache";
import { ILead, IPaginatedResponse } from "@/lib/types";

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

export async function submitLead(formData: FormData) {
  try {
    await connectDB();
    
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const projectName = formData.get("projectName") as string;
    const message = formData.get("message") as string;

    if (!name || !phone) {
      return { success: false, error: "নাম এবং ফোন নাম্বার আবশ্যক।" };
    }

    await Lead.create({
      name,
      phone,
      email,
      message: `${projectName ? `আগ্রহী প্রজেক্ট: ${projectName}. ` : ""}${message || ""}`,
      source: "ওয়েবসাইট",
    });

    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error: "সার্ভারে সমস্যা হয়েছে।" };
  }
}
