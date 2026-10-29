import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod"
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("admin_session")
      return response
    }
  }

  // If logged in, prevent visiting /login again
  if (pathname === "/login" && request.cookies.has("admin_session")) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
