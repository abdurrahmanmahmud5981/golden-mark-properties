"use server";

import connectDB from "@/lib/db";
import { Unit } from "@/models/Unit";
import { revalidatePath } from "next/cache";

import { IUnit, IPaginatedResponse } from "@/lib/types";

import { Project } from "@/models/Project";

export async function getUnits(
  projectId?: string,
  page = 1,
  limit = 10,
  search = "",
  sort = "newest",
  minPrice?: number,
  maxPrice?: number,
  status?: string
): Promise<IPaginatedResponse<IUnit>> {
  await connectDB();
  const skip = (page - 1) * limit;
  
  // Build query
  const query: any = {};
  console.log("getUnits params:", { search, sort, minPrice, maxPrice, status });
  
  if (projectId) {
    query.project = projectId;
  }
  
  if (status && status !== "all") {
    query.status = status;
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  // Handle Search (Project title or location)
  if (search) {
    const projects = await Project.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ]
    }).select("_id");
    
    const projectIds = projects.map(p => p._id);
    query.project = { $in: projectIds };
  }

  // Handle Sort
  let sortOption: any = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  else if (sort === "price_desc") sortOption = { price: -1 };
  else if (sort === "newest") sortOption = { createdAt: -1 };
  else if (sort === "oldest") sortOption = { createdAt: 1 };

  const data = await Unit.find(query)
    .populate("project")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
    
  const totalItems = await Unit.countDocuments(query);
  
  return {
    data: JSON.parse(JSON.stringify(data)),
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
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
