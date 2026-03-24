import mongoose, { Schema, model, models } from "mongoose";

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    fatherName: String,
    motherName: String,
    phone: { type: String, required: true, unique: true },
    email: String,
    nid: String,
    address: String,
    permanentAddress: String,
    image: String,
    nomineeName: String,
    nomineeRelation: String,
    nomineePhone: String,
  },
  { timestamps: true }
);

export const Client = models.Client || model("Client", ClientSchema);
