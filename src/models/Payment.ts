import mongoose, { Schema, model, models } from "mongoose";

export enum PaymentMethod {
  CASH = "নগদ",
  BANK = "ব্যাংক",
  CHEQUE = "চেক",
  ONLINE = "অনলাইন",
}

export enum PaymentType {
  BOOKING = "বুকিং",
  DOWN_PAYMENT = "ডাউন পেমেন্ট",
  INSTALLMENT = "কিস্তি",
  AD_HOC = "অন্যান্য",
}

const PaymentSchema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CASH,
    },
    paymentType: {
      type: String,
      enum: Object.values(PaymentType),
      required: true,
    },
    receiptNumber: { type: String, required: true, unique: true },
    transactionId: String,
    note: String,
    receivedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Payment = models.Payment || model("Payment", PaymentSchema);
