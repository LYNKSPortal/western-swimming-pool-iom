"use server";

import { displayName, normalizePerson, type PersonDetails } from "@/lib/data/person";
import { sendContactFormNotification } from "@/lib/email/notifications";

export type SubmitContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(input: {
  person: PersonDetails;
  type: string;
  message: string;
}): Promise<SubmitContactFormState> {
  const person = normalizePerson(input.person);
  const message = input.message.trim();

  if (!person.firstName || !person.lastName || !person.email || !person.phone) {
    return {
      status: "error",
      message: "Please fill in your name, email and telephone number.",
    };
  }
  if (!person.addressLine1 || !person.postcode) {
    return { status: "error", message: "Please fill in address line 1 and your postcode." };
  }
  if (!isValidEmail(person.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message) {
    return { status: "error", message: "Please include a message." };
  }

  try {
    await sendContactFormNotification({
      person,
      name: displayName(person),
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
