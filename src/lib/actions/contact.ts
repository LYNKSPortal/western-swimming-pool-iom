"use server";

import { sendContactFormNotification } from "@/lib/email/notifications";

export type SubmitContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(input: {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}): Promise<SubmitContactFormState> {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await sendContactFormNotification({
      name,
      email,
      phone: input.phone.trim(),
      type: input.type,
      message,
    });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please call us instead.",
    };
  }

  return { status: "success", message: "Thanks! Your message has been sent to our team." };
}
