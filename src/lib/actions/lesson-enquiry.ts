"use server";

import { insertLessonEnquiry } from "@/lib/db/lesson-enquiries";
import { getLessonBySlug } from "@/lib/data/lessons";
import { sendLessonEnquiryNotification } from "@/lib/email/notifications";

export type SubmitLessonEnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitLessonEnquiry(input: {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  programmeSlug: string;
  availability: string;
  message: string;
}): Promise<SubmitLessonEnquiryState> {
  const parentName = input.parentName.trim();
  const parentPhone = input.parentPhone.trim();
  const parentEmail = input.parentEmail.trim();

  if (!parentName || !parentPhone || !parentEmail) {
    return { status: "error", message: "Please fill in your name, phone number and email." };
  }
  if (!isValidEmail(parentEmail)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const programme = getLessonBySlug(input.programmeSlug);
  if (!programme) {
    return { status: "error", message: "Please choose a valid programme." };
  }

  const availability = input.availability.trim();
  const message = input.message.trim();

  try {
    await insertLessonEnquiry({
      parentName,
      parentPhone,
      parentEmail,
      programmeSlug: programme.slug,
      programmeName: programme.name,
      availability,
      message,
    });
  } catch (error) {
    console.error("Failed to save lesson enquiry", error);
    return {
      status: "error",
      message: "Something went wrong saving your enquiry. Please call us instead.",
    };
  }

  await sendLessonEnquiryNotification({
    parentName,
    parentPhone,
    parentEmail,
    programmeName: programme.name,
    availability,
    message,
  });

  return { status: "success", message: "Thanks! Your enquiry has been sent to our team." };
}
