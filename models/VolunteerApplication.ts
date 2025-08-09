import mongoose, { Schema, type Model } from "mongoose"

export interface VolunteerApplicationDoc extends mongoose.Document {
  fullName: string
  email: string
  phone: string
  city: string
  roles: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const VolunteerApplicationSchema = new Schema<VolunteerApplicationDoc>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    roles: { type: [String], default: [] },
    notes: { type: String },
  },
  { timestamps: true }
)

export default (mongoose.models.VolunteerApplication as Model<VolunteerApplicationDoc>) ||
  mongoose.model<VolunteerApplicationDoc>("VolunteerApplication", VolunteerApplicationSchema)
