"use server";

import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking";
import { Unit } from "@/models/Unit";
import { revalidatePath } from "next/cache";

import { IBooking, UnitStatus, BookingStatus } from "@/lib/types";

export async function getBookings(): Promise<IBooking[]> {
  await connectDB();
  return JSON.parse(JSON.stringify(
    await Booking.find()
      .populate("client")
      .populate({
        path: "unit",
        populate: { path: "project" }
      })
      .sort({ createdAt: -1 })
  ));
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
