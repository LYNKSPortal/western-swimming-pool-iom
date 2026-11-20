#!/usr/bin/env node
// One-time seed of timetable_sessions from the previously-static public
// timetable data. Safe to re-run: it clears and re-inserts every row.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnvLocal() {
  try {
    const content = readFileSync(path.join(root, ".env.local"), "utf8");
    for (const line of content.split("\n")) {
      const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^"(.*)"$/, "$1");
    }
  } catch {
    // rely on already-exported env vars
  }
}

loadEnvLocal();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(connectionString);

// day_of_week: 0 = Monday ... 6 = Sunday
const sessions = [
  // Main Pool
  { pool: "Main Pool", day: 0, start: "07:00", end: "09:00" },
  { pool: "Main Pool", day: 0, start: "12:00", end: "14:30" },
  { pool: "Main Pool", day: 0, start: "18:00", end: "20:00" },
  { pool: "Main Pool", day: 1, start: "07:00", end: "13:30" },
  { pool: "Main Pool", day: 2, start: "07:00", end: "09:30" },
  { pool: "Main Pool", day: 2, start: "11:30", end: "13:30" },
  { pool: "Main Pool", day: 3, start: "07:00", end: "14:00" },
  { pool: "Main Pool", day: 3, start: "18:00", end: "19:30" },
  { pool: "Main Pool", day: 4, start: "07:45", end: "09:00" },
  { pool: "Main Pool", day: 4, start: "12:00", end: "13:30" },
  { pool: "Main Pool", day: 5, start: "11:00", end: "15:00" },
  { pool: "Main Pool", day: 6, start: "09:30", end: "15:00" },

  // Leisure Pool
  { pool: "Leisure Pool", day: 1, start: "08:30", end: "09:30" },
  { pool: "Leisure Pool", day: 1, start: "12:30", end: "13:30" },
  { pool: "Leisure Pool", day: 2, start: "11:30", end: "13:30" },
  { pool: "Leisure Pool", day: 4, start: "12:00", end: "13:30" },
  { pool: "Leisure Pool", day: 5, start: "11:00", end: "15:00" },
  { pool: "Leisure Pool", day: 6, start: "11:30", end: "15:00" },
];

await sql`delete from timetable_sessions`;

for (const [index, s] of sessions.entries()) {
  await sql`
    insert into timetable_sessions (pool, day_of_week, label, start_time, end_time, sort_order)
    values (${s.pool}, ${s.day}, 'Public swim', ${s.start}, ${s.end}, ${index})
  `;
}

console.log(`Seeded ${sessions.length} timetable sessions.`);
