"use server";

import connectDB from "@/lib/db";
import { Client } from "@/models/Client";
import { revalidatePath } from "next/cache";

import { IClient, IPaginatedResponse } from "@/lib/types";

export async function getClients(
  page = 1,
  limit = 10,
  search = ""
): Promise<IPaginatedResponse<IClient>> {
  await connectDB();
  const skip = (page - 1) * limit;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  
  const data = await Client.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const totalItems = await Client.countDocuments(query);
  
  return {
    data: JSON.parse(JSON.stringify(data)),
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
}

export async function createClient(data: Partial<IClient>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Client.create(data);
    revalidatePath("/dashboard/clients");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ক্লায়েন্ট তৈরি করা সম্ভব হয়নি।" };
  }
}

export async function updateClient(id: string, data: Partial<IClient>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Client.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/clients");
    return { success: true };
  } catch (error) {
    return { success: false, error: "ক্লায়েন্ট আপডেট করা সম্ভব হয়নি।" };
  }
}
