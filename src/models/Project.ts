import mongoose, { Schema, model, models } from "mongoose";
import { ProjectStatus } from "@/lib/types";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.ONGOING,
    },
    images: [{ type: String }],
    features: [{ type: String }],
    mapLink: String,
    mapEmbedUrl: String,
    videoLink: String,
    totalUnits: Number,
    address: String,
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema);
