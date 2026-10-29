"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod"
)

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { success: false, error: "Email and password are required" }
    }

    // 1. Find user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    // 2. Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return { success: false, error: "Invalid credentials" }
    }

    // 3. Create JWT
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    // 4. Set HttpOnly Cookie
    const cookieStore = await cookies()
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/login")
}
