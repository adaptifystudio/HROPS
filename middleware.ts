// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // block access to all other /admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
