"use server";

import { insertLessonEnquiry } from "@/lib/db/lesson-enquiries";
import { getLessonBySlug } from "@/lib/data/lessons";
import { displayName, normalizePerson, type PersonDetails } from "@/lib/data/person";
import { sendLessonEnquiryNotification } from "@/lib/email/notifications";

export type SubmitLessonEnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type ChildInput = {
  name: string;
  age: string;
  skillLevel: string;
  supportNeeds?: string;
  lessonPreference?: string;
};

// Per-child details are included in the staff notification email only, not
// persisted to lesson_enquiries (no medical information is collected here,
// by design, same as the rest of this form).

export async function submitLessonEnquiry(input: {
  person: PersonDetails;
  programmeSlug: string;
  availability: string;
  message: string;
  children: ChildInput[];
}): Promise<SubmitLessonEnquiryState> {
  const person = normalizePerson(input.person);
  const parentName = displayName(person);
  const parentPhone = person.phone;
  const parentEmail = person.email;

  if (!person.firstName || !person.lastName || !parentPhone || !parentEmail) {
    return { status: "error", message: "Please fill in your name, phone number and email." };
  }
  if (!person.addressLine1 || !person.postcode) {
    return { status: "error", message: "Please fill in address line 1 and your postcode." };
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
  const children = input.children
    .map((child) => ({
      name: child.name.trim(),
      age: child.age.trim(),
      skillLevel: child.skillLevel,
      supportNeeds: (child.supportNeeds ?? "").trim(),
      lessonPreference: child.lessonPreference ?? "",
    }))
    .filter((child) => child.name.length > 0);

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
    person,
    parentName,
    parentPhone,
    parentEmail,
    programmeName: programme.name,
    availability,
    message,
    children,
  });

  return { status: "success", message: "Thanks! Your enquiry has been sent to our team." };
}
