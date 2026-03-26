"use server";

import connectDB from "@/lib/db";
import { Payment } from "@/models/Payment";
import { Booking } from "@/models/Booking";
import { revalidatePath } from "next/cache";

import { IPayment, IPaginatedResponse } from "@/lib/types";

export async function getPayments(
  page = 1,
  limit = 10,
  search = ""
): Promise<IPaginatedResponse<IPayment>> {
  await connectDB();
  const skip = (page - 1) * limit;
  
  // Basic query, could be extended if search is provided
  let query = {};
  
  const data = await Payment.find(query)
    .populate({
      path: "booking",
      populate: [
        { path: "unit", populate: { path: "project" } },
        { path: "client" }
      ]
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const totalItems = await Payment.countDocuments(query);
  
  return {
    data: JSON.parse(JSON.stringify(data)),
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
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
