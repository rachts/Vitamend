import mongoose, { Schema, type Model } from "mongoose"

export interface DonationDoc extends mongoose.Document {
  name: string // normalized medicine name
  brand?: string
  expiryDate: Date
  quantity: number
  conditionNotes?: string
  pickupAddress?: string
  images?: string[]
  status: "submitted" | "pending" | "verified" | "distributed" | "rejected"
  userId?: string
  createdAt: Date
  updatedAt: Date
}

const DonationSchema = new Schema<DonationDoc>(
  {
    name: { type: String, required: true, index: true },
    brand: String,
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, required: true, min: 1 },
    conditionNotes: String,
    pickupAddress: String,
    images: { type: [String], default: [] },
    status: { type: String, enum: ["submitted", "pending", "verified", "distributed", "rejected"], default: "submitted" },
    userId: { type: String, index: true },
  },
  { timestamps: true }
)

export default (mongoose.models.Donation as Model<DonationDoc>) ||
  mongoose.model<DonationDoc>("Donation", DonationSchema)
