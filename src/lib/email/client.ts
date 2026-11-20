import "server-only";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set. Add it to .env.local.");
}
if (!process.env.RESEND_FROM_EMAIL) {
  throw new Error("RESEND_FROM_EMAIL is not set. Add it to .env.local.");
}
if (!process.env.NOTIFICATIONS_EMAIL) {
  throw new Error("NOTIFICATIONS_EMAIL is not set. Add it to .env.local.");
}

/**
 * Shared Resend client, used to send staff notification emails for the
 * contact form, newsletter signup, and lesson enquiry form. Do not import
 * this file from a Client Component.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailFrom = process.env.RESEND_FROM_EMAIL;
export const notificationsEmail = process.env.NOTIFICATIONS_EMAIL;
