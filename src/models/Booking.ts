import mongoose, { Schema, model, models } from "mongoose";

export enum BookingStatus {
  PENDING = "পেন্ডিং",
  APPROVED = "অনুমোদিত",
  CANCELLED = "বাতিল",
}

const BookingSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    unit: { type: Schema.Types.ObjectId, ref: "Unit", required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    totalAmount: { type: Number, required: true },
    bookingAmount: { type: Number, required: true },
    downPayment: { type: Number, required: true },
    balanceAmount: { type: Number, required: true },
    installmentCount: { type: Number, required: true },
    installmentAmount: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    documents: [{ type: String }],
    salesPerson: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Booking = models.Booking || model("Booking", BookingSchema);
