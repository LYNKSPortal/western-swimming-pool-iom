import "server-only";
import { sql } from "@/lib/db/client";
import { weekdays, type PoolName, type TimetableSession } from "@/lib/data/timetable";

export type TimetableSessionRecord = TimetableSession & {
  sortOrder: number;
};

function mapRow(row: Record<string, unknown>): TimetableSessionRecord {
  return {
    id: row.id as string,
    pool: row.pool as PoolName,
    day: weekdays[Number(row.day_of_week)],
    label: row.label as string,
    start: row.start_time as string,
    end: row.end_time as string,
    sortOrder: Number(row.sort_order),
  };
}

export async function listTimetableSessions(): Promise<TimetableSessionRecord[]> {
  const rows = await sql`
    select * from timetable_sessions
    order by pool, day_of_week, sort_order, start_time
  `;
  return rows.map(mapRow);
}

export async function createTimetableSession(input: {
  pool: PoolName;
  day: (typeof weekdays)[number];
  label: string;
  start: string;
  end: string;
}) {
  const dayOfWeek = weekdays.indexOf(input.day);
  const rows = await sql`
    insert into timetable_sessions (pool, day_of_week, label, start_time, end_time, sort_order)
    values (
      ${input.pool}, ${dayOfWeek}, ${input.label}, ${input.start}, ${input.end},
      coalesce(
        (select max(sort_order) + 1 from timetable_sessions
         where pool = ${input.pool} and day_of_week = ${dayOfWeek}),
        0
      )
    )
    returning id
  `;
  return rows[0].id as string;
}

export async function updateTimetableSession(
  id: string,
  input: { label: string; start: string; end: string }
) {
  await sql`
    update timetable_sessions
    set label = ${input.label}, start_time = ${input.start}, end_time = ${input.end}, updated_at = now()
    where id = ${id}
  `;
}

export async function deleteTimetableSession(id: string) {
  await sql`delete from timetable_sessions where id = ${id}`;
}
