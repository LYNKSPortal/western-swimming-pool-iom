"use server";

import { sendNewsletterSignupNotification } from "@/lib/email/notifications";

export type SubmitNewsletterSignupState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitNewsletterSignup(input: {
  title: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
}): Promise<SubmitNewsletterSignupState> {
  const title = input.title;
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const preferredName = input.preferredName.trim();
  const email = input.email.trim();

  if (!firstName || !lastName || !email) {
    return { status: "error", message: "Please fill in your name and email." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await sendNewsletterSignupNotification({ title, firstName, lastName, preferredName, email });
  } catch (error) {
    console.error("Failed to send newsletter signup email", error);
    return { status: "error", message: "Something went wrong, please try again." };
  }

  return { status: "success", message: "Thanks for signing up! We'll be in touch soon." };
}
