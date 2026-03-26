"use server";

import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking";
import { Unit } from "@/models/Unit";
import { revalidatePath } from "next/cache";

import { IBooking, UnitStatus, BookingStatus, IPaginatedResponse } from "@/lib/types";

export async function getBookings(
  page = 1,
  limit = 10,
  search = ""
): Promise<IPaginatedResponse<IBooking>> {
  await connectDB();
  const skip = (page - 1) * limit;
  
  // Basic search by client name if provided
  let query = {};
  if (search) {
    // This is a bit complex with populate, but we'll stick to a simple query for now
    // or search in other fields if needed.
  }
  
  const data = await Booking.find(query)
    .populate("client")
    .populate({
      path: "unit",
      populate: { path: "project" }
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const totalItems = await Booking.countDocuments(query);
  
  return {
    data: JSON.parse(JSON.stringify(data)),
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
}

export async function createBooking(data: Partial<IBooking>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    await connectDB();
    
    // Create the booking
    const booking = await Booking.create(data);
    
    // Update unit status to 'Booked'
    await Unit.findByIdAndUpdate(data.unit, { status: UnitStatus.BOOKED });
    
    revalidatePath("/dashboard/bookings");
    revalidatePath("/dashboard/units");
    revalidatePath("/browse");
    return { success: true, id: booking._id.toString() };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "বুকিং সম্পন্ন করা সম্ভব হয়নি।" };
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Booking.findByIdAndUpdate(id, { status });
    revalidatePath("/dashboard/bookings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "স্ট্যাটাস আপডেট করা সম্ভব হয়নি।" };
  }
}
