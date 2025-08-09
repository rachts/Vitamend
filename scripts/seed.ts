import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import bcrypt from "bcryptjs"

async function seed() {
  await dbConnect()

  try {
    // Create admin user
    const adminExists = await User.findOne({ email: "admin@vitamend.com" })

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 12)

      await User.create({
        name: "Admin User",
        email: "admin@vitamend.com",
        password: hashedPassword,
        role: "admin",
        credits: 1000,
      })

      console.log("Admin user created successfully")
    }

    // Create sample donor
    const donorExists = await User.findOne({ email: "donor@example.com" })

    if (!donorExists) {
      const hashedPassword = await bcrypt.hash("donor123", 12)

      await User.create({
        name: "Sample Donor",
        email: "donor@example.com",
        password: hashedPassword,
        role: "donor",
        credits: 100,
      })

      console.log("Sample donor created successfully")
    }

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

seed()
