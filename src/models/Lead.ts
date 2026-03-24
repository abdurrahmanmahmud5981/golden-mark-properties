import mongoose, { Schema, model, models } from "mongoose";

export enum LeadStatus {
  NEW = "নতুন",
  CONTACTED = "যোগাযোগ করা হয়েছে",
  INTERESTED = "আগ্রহী",
  NOT_INTERESTED = "আগ্রহী নয়",
  CONVERTED = "কনভোর্টেড",
}

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    message: String,
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    source: { type: String, default: "ওয়েবসাইট" }, // Website, Manual, etc.
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    followUpDate: Date,
    notes: String,
  },
  { timestamps: true }
);

export const Lead = models.Lead || model("Lead", LeadSchema);
