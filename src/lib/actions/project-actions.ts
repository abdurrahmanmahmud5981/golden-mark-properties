"use server";

import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { revalidatePath } from "next/cache";

import { IProject, IPaginatedResponse } from "@/lib/types";

export async function getProjects(
  page = 1,
  limit = 10,
  search = ""
): Promise<IPaginatedResponse<IProject>> {
  await connectDB();
  const skip = (page - 1) * limit;
  const query = search ? { title: { $regex: search, $options: "i" } } : {};
  
  const data = await Project.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const totalItems = await Project.countDocuments(query);
  
  return {
    data: JSON.parse(JSON.stringify(data)),
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
}

export async function getProjectById(id: string): Promise<IProject | null> {
  try {
    await connectDB();
    const data = await Project.findById(id);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    console.error("Error fetching project by id:", error);
    return null;
  }
}

export async function createProject(data: Partial<IProject>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    if (!data.title) throw new Error("Title is required");
    const slug = data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    await Project.create({ ...data, slug });
    revalidatePath("/dashboard/projects");
    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "প্রজেক্ট তৈরি করা সম্ভব হয়নি।" };
  }
}

export async function updateProject(id: string, data: Partial<IProject>): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDB();
    await Project.findByIdAndUpdate(id, data);
    revalidatePath("/dashboard/projects");
    revalidatePath(`/projects/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "প্রজেক্ট আপডেট করা সম্ভব হয়নি।" };
  }
}

export async function deleteProject(id: string) {
  try {
    await connectDB();
    await Project.findByIdAndDelete(id);
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: "প্রজেক্ট ডিলিট করা সম্ভব হয়নি।" };
  }
}
