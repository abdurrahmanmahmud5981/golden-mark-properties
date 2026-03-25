"use server";

import connectDB from "@/lib/db";
import { Client } from "@/models/Client";
import { revalidatePath } from "next/cache";

import { IClient } from "@/lib/types";

export async function getClients(): Promise<IClient[]> {
  await connectDB();
  return JSON.parse(JSON.stringify(await Client.find().sort({ createdAt: -1 })));
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
