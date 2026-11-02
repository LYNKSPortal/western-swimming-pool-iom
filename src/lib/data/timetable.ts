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

export type TimetableSession = {
  label: string;
  start: string; // 24hr "HH:mm"
  end: string; // 24hr "HH:mm"
  needsConfirmation?: boolean;
};

export type DaySchedule = {
  day: Weekday;
  sessions: TimetableSession[];
};

export type PoolTimetable = {
  pool: PoolName;
  days: DaySchedule[];
};

/**
 * Public swimming timetable, effective 2 November – 22 December 2026.
 * Sourced directly from the published weekly schedule on westernswimmingpool.im.
 * Always double-check social media for last-minute changes or closures.
 */
export const timetableEffective = {
  from: "2026-11-02",
  to: "2026-12-22",
};

export const timetable: PoolTimetable[] = [
  {
    pool: "Main Pool",
    days: [
      {
        day: "Monday",
        sessions: [
          { label: "Public swim", start: "07:00", end: "09:00" },
          { label: "Public swim", start: "12:00", end: "14:30" },
          { label: "Public swim", start: "18:00", end: "20:00" },
        ],
      },
      {
        day: "Tuesday",
        sessions: [{ label: "Public swim", start: "07:00", end: "13:30" }],
      },
      {
        day: "Wednesday",
        sessions: [
          { label: "Public swim", start: "07:00", end: "09:30" },
          { label: "Public swim", start: "11:30", end: "13:30" },
        ],
      },
      {
        day: "Thursday",
        sessions: [
          { label: "Public swim", start: "07:00", end: "14:00" },
          { label: "Public swim", start: "18:00", end: "19:30" },
        ],
      },
      {
        day: "Friday",
        sessions: [
          { label: "Public swim", start: "07:45", end: "09:00" },
          { label: "Public swim", start: "12:00", end: "13:30" },
        ],
      },
      {
        day: "Saturday",
        sessions: [{ label: "Public swim", start: "11:00", end: "15:00" }],
      },
      {
        day: "Sunday",
        sessions: [{ label: "Public swim", start: "09:30", end: "15:00" }],
      },
    ],
  },
  {
    pool: "Leisure Pool",
    days: [
      { day: "Monday", sessions: [] },
      {
        day: "Tuesday",
        sessions: [
          { label: "Public swim", start: "08:30", end: "09:30" },
          { label: "Public swim", start: "12:30", end: "13:30" },
        ],
      },
      {
        day: "Wednesday",
        sessions: [{ label: "Public swim", start: "11:30", end: "13:30" }],
      },
      { day: "Thursday", sessions: [] },
      {
        day: "Friday",
        sessions: [{ label: "Public swim", start: "12:00", end: "13:30" }],
      },
      {
        day: "Saturday",
        sessions: [{ label: "Public swim", start: "11:00", end: "15:00" }],
      },
      {
        day: "Sunday",
        sessions: [{ label: "Public swim", start: "11:30", end: "15:00" }],
      },
    ],
  },
];

export const timetableNotices = [
  "The pool is closed on bank holidays.",
  "Please check our social media pages for any last-minute changes to sessions.",
  `Timetable effective ${timetableEffective.from} to ${timetableEffective.to}. Future dates are subject to a new published timetable — please confirm before visiting after this period.`,
];

export function getPoolTimetable(pool: PoolName) {
  return timetable.find((t) => t.pool === pool);
}
