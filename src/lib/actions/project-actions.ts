"use server";

import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { revalidatePath } from "next/cache";

import { IProject } from "@/lib/types";

export async function getProjects(): Promise<IProject[]> {
  await connectDB();
  return JSON.parse(JSON.stringify(await Project.find().sort({ createdAt: -1 })));
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
