import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"

// 1. Load env FIRST
dotenv.config({ path: ".env.local" })

async function seed() {
  console.log(
    "Using DATABASE_URL:",
    process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@")
  )

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing from .env.local")
    process.exit(1)
  }

  // 2. Dynamically import db AFTER env is loaded
  const { db } = await import("../db")
  const { users } = await import("../db/schema")

  const email = "admin@siloamchurch.org"
  const password = "admin123"
  const name = "Church Admin"

  console.log("Hashing password...")
  const passwordHash = await bcrypt.hash(password, 10)

  console.log("Inserting admin user...")
  try {
    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role: "admin",
    })
    console.log(`✅ Admin created successfully!`)
    console.log(`   Email:    ${email}`)
    console.log(`   Password: ${password}`)
  } catch (error: any) {
    if (error.code === "23505") {
      console.log("⚠️ Admin user already exists. Skipping.")
    } else {
      console.error("❌ Failed:", error.message)
    }
  }
  process.exit(0)
}

seed()
