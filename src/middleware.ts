import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRaw = request.cookies.get("user")?.value ?? " ";
  let user;

  // Try parsing the user cookie
  try {
    user = JSON.parse(userRaw);
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    user = null;
  }

  // Allow access to `/` and `/logout` without checks
  if (pathname === "/" || pathname === "/logout") {
    return NextResponse.next();
  }

  // Require accessToken for all other paths
  if (!userRaw) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  // Role-based path checks
  if (user?.role === "admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/logout", request.url));
    }
  } else if (user?.role === "manager") {
    if (!pathname.startsWith("/manager")) {
      return NextResponse.redirect(new URL("/logout", request.url));
    }
  } else if (user?.role === "store") {
    if (!pathname.startsWith("/store")) {
      return NextResponse.redirect(new URL("/logout", request.url));
    }
  } else if (user?.role === "staff") {
    if (!pathname.startsWith("/staff")) {
      return NextResponse.redirect(new URL("/logout", request.url));
    }
  } else {
    // Redirect to /logout if the role is unknown or invalid
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/logout",
    "/admin/:path*",
    "/manager/:path*",
    "/store/:path*",
    "/staff/:path*",
  ],
};
