import { NextResponse, type NextRequest } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Donation from "@/models/Donation"

// GET latest donations (limit 20)
export async function GET() {
  try {
    await dbConnect()
    const items = await Donation.find().sort({ createdAt: -1 }).limit(20)
    return NextResponse.json({ items })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Failed to fetch donations" }, { status: 500 })
  }
}

// Accept JSON or multipart/form-data for POST
export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const contentType = req.headers.get("content-type") || ""

    let payload: any = {}
    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData()
      payload = {
        name: String(fd.get("medicineName") || ""),
        brand: String(fd.get("brand") || ""),
        expiryDate: new Date(String(fd.get("expiryDate") || "")),
        quantity: Number(fd.get("quantity") || 1),
        conditionNotes: String(fd.get("conditionNotes") || ""),
        pickupAddress: String(fd.get("pickupAddress") || ""),
        // You can optionally upload images to Vercel Blob from client; store URLs here if provided
        images: [],
        status: "submitted",
      }
    } else {
      const body = await req.json()
      payload = {
        name: String(body.medicineName || body.name || ""),
        brand: body.brand || "",
        expiryDate: new Date(body.expiryDate),
        quantity: Number(body.quantity || 1),
        conditionNotes: body.conditionNotes || "",
        pickupAddress: body.pickupAddress || "",
        images: Array.isArray(body.images) ? body.images : [],
        status: "submitted",
        userId: body.userId,
      }
    }

    if (!payload.name || !payload.expiryDate || !payload.quantity) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const created = await Donation.create(payload)
    return NextResponse.json({ success: true, donationId: created._id })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Failed to submit donation" }, { status: 500 })
  }
}
