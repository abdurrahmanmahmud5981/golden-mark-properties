import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Which roles can access which route prefixes
const ROUTE_ROLES: Record<string, string[]> = {
  "/dashboard/users":    ["সুপার অ্যাডমিন"],
  "/dashboard/leads":    ["সুপার অ্যাডমিন", "সেলস এক্সিকিউটিভ"],
  "/dashboard/payments": ["সুপার অ্যাডমিন", "ফাইন্যান্স"],
  "/dashboard/reports":  ["সুপার অ্যাডমিন", "ফাইন্যান্স", "প্রজেক্ট ম্যানেজার"],
  "/dashboard/bookings": ["সুপার অ্যাডমিন", "সেলস এক্সিকিউটিভ", "ফাইন্যান্স"],
  "/dashboard/units":    ["সুপার অ্যাডমিন", "সেলস এক্সিকিউটিভ", "প্রজেক্ট ম্যানেজার"],
  "/dashboard/projects": ["সুপার অ্যাডমিন", "সেলস এক্সিকিউটিভ", "ফাইন্যান্স", "প্রজেক্ট ম্যানেজার"],
  "/dashboard/clients":  ["সুপার অ্যাডমিন", "সেলস এক্সিকিউটিভ", "ফাইন্যান্স"],
  "/dashboard":          ["সুপার অ্যাডমিন", "সেলস এক্সিকিউটিভ", "ফাইন্যান্স", "প্রজেক্ট ম্যানেজার"],
};

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.role as string | undefined;

  // Find the most specific matching route rule
  const matchedRoute = Object.keys(ROUTE_ROLES)
    .filter((route) => pathname.startsWith(route))
    .sort((a, b) => b.length - a.length)[0]; // longest match wins

  if (matchedRoute) {
    const allowedRoles = ROUTE_ROLES[matchedRoute];
    if (role && !allowedRoles.includes(role)) {
      // Role not permitted → redirect to main dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
