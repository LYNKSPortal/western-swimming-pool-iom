export type PoolName = "Main Pool" | "Leisure Pool";

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Weekday = (typeof weekdays)[number];

/** Flat, client-safe shape for a single timetable session, however it was sourced. */
export type TimetableSession = {
  id: string;
  pool: PoolName;
  day: Weekday;
  label: string;
  start: string;
  end: string;
};

export const timetableNotices = [
  "The pool is closed on bank holidays.",
  "Please check our social media pages for any last-minute changes to sessions.",
];
