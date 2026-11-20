"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/dal";
import {
  createTimetableSession,
  deleteTimetableSession,
  updateTimetableSession,
} from "@/lib/db/timetable";
import type { PoolName, Weekday } from "@/lib/data/timetable";

function revalidatePublicPages() {
  revalidatePath("/admin");
  revalidatePath("/timetable");
  revalidatePath("/");
}

export async function addTimetableSession(input: {
  pool: PoolName;
  day: Weekday;
  start: string;
  end: string;
}) {
  await requireAdminSession();

  if (!input.start || !input.end || input.start >= input.end) {
    throw new Error("Please provide a valid start time before the end time.");
  }

  const id = await createTimetableSession({
    pool: input.pool,
    day: input.day,
    label: "Public swim",
    start: input.start,
    end: input.end,
  });
  revalidatePublicPages();
  return id;
}

export async function editTimetableSession(
  id: string,
  input: { start: string; end: string }
) {
  await requireAdminSession();

  if (!input.start || !input.end || input.start >= input.end) {
    throw new Error("Please provide a valid start time before the end time.");
  }

  await updateTimetableSession(id, { label: "Public swim", start: input.start, end: input.end });
  revalidatePublicPages();
}

export async function removeTimetableSession(id: string) {
  await requireAdminSession();
  await deleteTimetableSession(id);
  revalidatePublicPages();
}
