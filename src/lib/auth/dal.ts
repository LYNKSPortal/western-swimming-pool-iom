import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

/**
 * Verifies the admin session cookie for the current request. Memoized per
 * render pass with React's `cache`. This is the single source of truth for
 * admin authorization, call it from every admin page/action, not just the
 * shared layout. See Next.js's Data Access Layer guidance.
 */
export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  if (!payload) {
    return { isAuthenticated: false as const };
  }
  return { isAuthenticated: true as const };
});

/** Redirects to the admin login page if the current request isn't authenticated. */
export async function requireAdminSession() {
  const session = await verifySession();
  if (!session.isAuthenticated) {
    redirect("/admin/login");
  }
}
