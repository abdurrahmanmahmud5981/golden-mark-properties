"use server";

import connectDB from "@/lib/db";
import { Payment } from "@/models/Payment";
import { Booking } from "@/models/Booking";
import { revalidatePath } from "next/cache";

import { IPayment } from "@/lib/types";

export async function getPayments(): Promise<IPayment[]> {
  await connectDB();
  return JSON.parse(JSON.stringify(
    await Payment.find()
      .populate("client")
      .populate({
        path: "booking",
        populate: { path: "unit" }
      })
      .sort({ createdAt: -1 })
  ));
}

export async function createPayment(data: Partial<IPayment>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    
    // Create payment record
    await Payment.create(data);
    
    revalidatePath("/dashboard/payments");
    revalidatePath("/dashboard/bookings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "পেমেন্ট রেকর্ড করা সম্ভব হয়নি।" };
  }
}

export async function deletePayment(id: string) {
  try {
    await connectDB();
    await Payment.findByIdAndDelete(id);
    revalidatePath("/dashboard/payments");
    return { success: true };
  } catch (error) {
    return { success: false, error: "পেমেন্ট ডিলিট করা সম্ভব হয়নি।" };
  }
}
