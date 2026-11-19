/**
 * Sample data for the admin "Schedule" calendar view. This is illustrative
 * only (names, class times and capacities are made up for layout purposes)
 * and is not wired to the real public timetable or any booking system.
 */

export type ScheduleColor =
  | "pink"
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "yellow";

export type ScheduleSession = {
  id: string;
  /** 0 = Monday ... 5 = Saturday */
  day: number;
  start: string; // "HH:mm"
  end: string; // "HH:mm"
  className: string;
  teacher: string;
  area: "Main Pool" | "Leisure Pool";
  color: ScheduleColor;
  capacity: { booked: number; max: number };
};

export const scheduleDayLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const sampleSchedule: ScheduleSession[] = [
  // Monday
  { id: "1", day: 0, start: "09:00", end: "09:30", className: "Pre-School", teacher: "Anna", area: "Leisure Pool", color: "blue", capacity: { booked: 6, max: 6 } },
  { id: "2", day: 0, start: "09:30", end: "10:00", className: "Parent & Toddler", teacher: "Anna", area: "Leisure Pool", color: "pink", capacity: { booked: 4, max: 8 } },
  { id: "3", day: 0, start: "17:30", end: "18:30", className: "Rookie Lifeguard", teacher: "Will", area: "Main Pool", color: "green", capacity: { booked: 10, max: 12 } },

  // Tuesday
  { id: "4", day: 1, start: "09:30", end: "10:00", className: "Parent & Toddler", teacher: "Gemma Mathieson-Nelson", area: "Leisure Pool", color: "pink", capacity: { booked: 8, max: 8 } },
  { id: "5", day: 1, start: "10:00", end: "10:30", className: "Parent & Toddler", teacher: "Gemma Mathieson-Nelson", area: "Leisure Pool", color: "pink", capacity: { booked: 4, max: 8 } },
  { id: "6", day: 1, start: "10:30", end: "11:00", className: "Pre-School", teacher: "Gemma Mathieson-Nelson", area: "Leisure Pool", color: "blue", capacity: { booked: 2, max: 6 } },
  { id: "7", day: 1, start: "11:00", end: "11:30", className: "Pre-School", teacher: "Gemma Mathieson-Nelson", area: "Leisure Pool", color: "blue", capacity: { booked: 2, max: 6 } },
  { id: "8", day: 1, start: "11:00", end: "12:00", className: "Silver Club", teacher: "Allison", area: "Main Pool", color: "orange", capacity: { booked: 20, max: 20 } },
  { id: "9", day: 1, start: "12:00", end: "12:05", className: "Pre-School", teacher: "Dawn Marshall", area: "Leisure Pool", color: "blue", capacity: { booked: 5, max: 6 } },
  { id: "10", day: 1, start: "12:05", end: "12:30", className: "Silver Club", teacher: "Heather Melvin", area: "Main Pool", color: "orange", capacity: { booked: 3, max: 20 } },
  { id: "11", day: 1, start: "12:00", end: "12:30", className: "Parent & Toddler", teacher: "Gemma Mathieson-Nelson", area: "Leisure Pool", color: "pink", capacity: { booked: 7, max: 8 } },

  // Wednesday
  { id: "12", day: 2, start: "16:30", end: "18:30", className: "Peel Swimming Club", teacher: "Breesha & Brian", area: "Main Pool", color: "purple", capacity: { booked: 18, max: 24 } },

  // Thursday
  { id: "13", day: 3, start: "09:30", end: "10:00", className: "Pre-Pre School", teacher: "Karen Morris", area: "Leisure Pool", color: "blue", capacity: { booked: 2, max: 6 } },
  { id: "14", day: 3, start: "10:00", end: "10:30", className: "Pre-School", teacher: "Karen Morris", area: "Leisure Pool", color: "purple", capacity: { booked: 2, max: 6 } },
  { id: "15", day: 3, start: "10:30", end: "11:00", className: "Parent & Toddler", teacher: "Karen Morris", area: "Leisure Pool", color: "blue", capacity: { booked: 2, max: 8 } },
  { id: "16", day: 3, start: "11:00", end: "11:30", className: "Parent & Toddler", teacher: "Karen Morris", area: "Leisure Pool", color: "orange", capacity: { booked: 20, max: 20 } },
  { id: "17", day: 3, start: "11:00", end: "11:30", className: "Silver Club", teacher: "Fay Holland", area: "Main Pool", color: "orange", capacity: { booked: 20, max: 20 } },
  { id: "18", day: 3, start: "11:30", end: "12:00", className: "Parent & Toddler", teacher: "Karen Morris", area: "Leisure Pool", color: "orange", capacity: { booked: 20, max: 20 } },
  { id: "19", day: 3, start: "12:00", end: "12:30", className: "Parent & Toddler (Advanced)", teacher: "Karen Morris", area: "Leisure Pool", color: "blue", capacity: { booked: 3, max: 8 } },

  // Friday
  { id: "20", day: 4, start: "16:00", end: "16:30", className: "Stages 1-3", teacher: "Anna", area: "Leisure Pool", color: "blue", capacity: { booked: 5, max: 8 } },
  { id: "21", day: 4, start: "16:30", end: "17:00", className: "Stages 4-6", teacher: "Will", area: "Main Pool", color: "green", capacity: { booked: 6, max: 10 } },

  // Saturday
  { id: "22", day: 5, start: "09:00", end: "09:30", className: "Pre-School", teacher: "Katie", area: "Leisure Pool", color: "pink", capacity: { booked: 4, max: 6 } },
  { id: "23", day: 5, start: "09:00", end: "09:30", className: "Stages 7-10", teacher: "Will", area: "Main Pool", color: "green", capacity: { booked: 8, max: 10 } },
  { id: "24", day: 5, start: "09:30", end: "10:00", className: "Parent & Toddler", teacher: "Anna", area: "Leisure Pool", color: "pink", capacity: { booked: 6, max: 8 } },
  { id: "25", day: 5, start: "10:00", end: "10:30", className: "Pre-School", teacher: "Katie", area: "Leisure Pool", color: "purple", capacity: { booked: 3, max: 6 } },
  { id: "26", day: 5, start: "10:30", end: "11:00", className: "Adult Coaching", teacher: "Brian", area: "Main Pool", color: "orange", capacity: { booked: 2, max: 8 } },
];
