import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import VolunteerApplication from "@/models/VolunteerApplication"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, phone, city, roles, notes } = body || {}

    if (!fullName || !email || !phone || !city) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()
    const doc = await VolunteerApplication.create({
      fullName,
      email,
      phone,
      city,
      roles: Array.isArray(roles) ? roles : [],
      notes,
    })

    return NextResponse.json({ success: true, applicationId: doc._id })
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Failed to submit application" }, { status: 500 })
  }
}
