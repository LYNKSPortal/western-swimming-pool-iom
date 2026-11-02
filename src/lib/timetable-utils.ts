import { timetable, weekdays, type PoolName, type Weekday } from "@/lib/data/timetable";

export type UpcomingSession = {
  pool: PoolName;
  day: Weekday;
  label: string;
  start: string;
  end: string;
  isToday: boolean;
  daysAway: number;
};

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Returns the next N upcoming public swim sessions across both pools,
 * relative to the given date (defaults to now). Pure function so it can be
 * safely called from a Client Component using the browser's current time.
 */
export function getUpcomingSessions(limit = 4, now: Date = new Date()): UpcomingSession[] {
  const jsDay = now.getDay(); // 0 = Sunday
  const todayIndex = (jsDay + 6) % 7; // convert so Monday = 0
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const all: UpcomingSession[] = [];

  for (let offset = 0; offset < 8; offset++) {
    const dayIndex = (todayIndex + offset) % 7;
    const day = weekdays[dayIndex];

    for (const poolTimetable of timetable) {
      const daySchedule = poolTimetable.days.find((d) => d.day === day);
      if (!daySchedule) continue;

      for (const session of daySchedule.sessions) {
        if (offset === 0 && toMinutes(session.end) <= nowMinutes) continue;
        all.push({
          pool: poolTimetable.pool,
          day,
          label: session.label,
          start: session.start,
          end: session.end,
          isToday: offset === 0,
          daysAway: offset,
        });
      }
    }
  }

  all.sort((a, b) => {
    if (a.daysAway !== b.daysAway) return a.daysAway - b.daysAway;
    return toMinutes(a.start) - toMinutes(b.start);
  });

  return all.slice(0, limit);
}

export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${m.toString().padStart(2, "0")}${period}`;
}
