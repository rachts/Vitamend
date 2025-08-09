import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { handleApiError } from "@/lib/api-error"
import dbConnect from "@/lib/dbConnect"
import Donation from "@/models/Donation"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is an NGO partner
    if (session.user.role !== "ngo_partner") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await dbConnect()

    // Get verified medicines that are available for distribution
    const donations = await Donation.find({
      status: "verified",
      isReserved: { $ne: true },
    }).populate("userId", "name")

    // Transform to the format needed by the frontend
    const medicines = donations.flatMap((donation) =>
      donation.medicines.map((medicine) => ({
        id: `${donation._id}-${medicine._id}`,
        name: medicine.name,
        quantity: medicine.quantity,
        expiryDate: medicine.expiryDate,
        location: donation.pickupAddress || "Central Warehouse",
        donorId: donation.userId?._id || donation.userId,
      })),
    )

    return NextResponse.json({ medicines })
  } catch (error) {
    return handleApiError(error)
  }
}
