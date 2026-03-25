import mongoose, { Schema, model, models } from "mongoose";
import { UnitStatus } from "@/lib/types";

const UnitSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    unitNumber: { type: String, required: true },
    floor: { type: String, required: true },
    size: { type: String, required: true }, // e.g., "১২৫০ বর্গফুট"
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(UnitStatus),
      default: UnitStatus.AVAILABLE,
    },
    facing: String, // e.g., "দক্ষিণমুখী"
    bedRooms: Number,
    bathRooms: Number,
    balconies: Number,
    floorPlan: String, // Image URL
  },
  { timestamps: true }
);

export const Unit = models.Unit || model("Unit", UnitSchema);
