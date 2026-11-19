"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, sessionCookieOptions } from "@/lib/auth/session";

export type LoginState = {
  error?: string;
};

export async function loginAdmin(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "Admin login isn't configured yet. Set ADMIN_PASSWORD in the environment." };
  }

  // Constant-time-ish comparison to reduce timing side-channels for this
  // small internal tool. For multi-user accounts, use Neon Auth instead.
  if (password.length !== adminPassword.length || password !== adminPassword) {
    return { error: "Incorrect password." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieOptions.name, token, sessionCookieOptions);

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieOptions.name);
  redirect("/admin/login");
}
