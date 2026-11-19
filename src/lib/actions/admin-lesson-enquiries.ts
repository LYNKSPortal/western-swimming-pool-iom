"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/dal";
import { updateLessonEnquiryStatus } from "@/lib/db/lesson-enquiries";
import type { LessonEnquiryRecord } from "@/lib/db/types";

export async function setLessonEnquiryStatus(id: string, status: LessonEnquiryRecord["status"]) {
  await requireAdminSession();
  await updateLessonEnquiryStatus(id, status);
  revalidatePath("/admin");
}
