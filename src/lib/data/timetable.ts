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

export type TimetableNotice = {
  text: string;
  href?: string;
};

export const timetableNotices: TimetableNotice[] = [
  { text: "This timetable is valid 02/11/2026–22/12/2026." },
  { text: "The pool is closed on bank holidays." },
  { text: "All times are subject to change at management's discretion." },
  { text: "The Main Pool has 6 lanes." },
  { text: "The Leisure Pool is warmer and suitable for babies and small children." },
  {
    text: "Please check our social media pages for any last-minute changes to sessions.",
    href: "https://www.facebook.com/WesternSwimmingPool",
  },
];
