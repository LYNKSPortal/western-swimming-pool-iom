import "server-only";
import { sql } from "@/lib/db/client";
import type { LessonEnquiryInput, LessonEnquiryRecord } from "@/lib/db/types";

function mapRow(row: Record<string, unknown>): LessonEnquiryRecord {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    status: row.status as LessonEnquiryRecord["status"],
    parentName: row.parent_name as string,
    parentPhone: row.parent_phone as string,
    parentEmail: row.parent_email as string,
    programmeSlug: row.programme_slug as string,
    programmeName: row.programme_name as string,
    availability: (row.availability as string) ?? "",
    message: (row.message as string) ?? "",
  };
}

export async function insertLessonEnquiry(input: LessonEnquiryInput) {
  const rows = await sql`
    insert into lesson_enquiries (
      parent_name, parent_phone, parent_email,
      programme_slug, programme_name,
      availability, message
    ) values (
      ${input.parentName}, ${input.parentPhone}, ${input.parentEmail},
      ${input.programmeSlug}, ${input.programmeName},
      ${input.availability}, ${input.message}
    )
    returning id, created_at
  `;
  return { id: rows[0].id as string, createdAt: rows[0].created_at as string };
}

export async function listLessonEnquiries(): Promise<LessonEnquiryRecord[]> {
  const rows = await sql`
    select * from lesson_enquiries
    order by created_at desc
    limit 200
  `;
  return rows.map(mapRow);
}

export async function updateLessonEnquiryStatus(
  id: string,
  status: LessonEnquiryRecord["status"]
) {
  await sql`update lesson_enquiries set status = ${status} where id = ${id}`;
}
