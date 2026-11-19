import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

/**
 * Optimistic check only: redirects to /admin/login if the session cookie is
 * missing. The real verification (signature + expiry) happens in the DAL
 * (`src/lib/auth/dal.ts`) on every protected page and action, per Next.js's
 * authentication guidance that Proxy shouldn't be the only line of defense.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
