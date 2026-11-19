"use server";

import { insertLessonEnquiry } from "@/lib/db/lesson-enquiries";
import { getLessonBySlug } from "@/lib/data/lessons";
import type { LessonEnquiryChild } from "@/lib/db/types";

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
  eligibilityConfirmed: boolean | null;
  children: LessonEnquiryChild[];
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

  const children = input.children
    .filter((child) => child.dob)
    .map((child) => ({
      name: child.name.trim(),
      dob: child.dob,
      skillLevel: child.skillLevel,
      approxAgeMonths: child.approxAgeMonths,
    }));

  if (children.length === 0) {
    return { status: "error", message: "Please add at least one child with a date of birth." };
  }

  const isPrivateLesson = programme.slug === "private-lessons";
  const estimatedPriceGbp = isPrivateLesson
    ? 28 + Math.max(0, Math.min(children.length, 3) - 1) * 5
    : null;

  try {
    await insertLessonEnquiry({
      parentName,
      parentPhone,
      parentEmail,
      programmeSlug: programme.slug,
      programmeName: programme.name,
      availability: input.availability.trim(),
      message: input.message.trim(),
      isPrivateLesson,
      estimatedPriceGbp,
      eligibilityConfirmed: input.eligibilityConfirmed,
      children,
    });
  } catch (error) {
    console.error("Failed to save lesson enquiry", error);
    return {
      status: "error",
      message: "Something went wrong saving your enquiry. Please call us instead.",
    };
  }

  return { status: "success", message: "Thanks! Your enquiry has been sent to our team." };
}
