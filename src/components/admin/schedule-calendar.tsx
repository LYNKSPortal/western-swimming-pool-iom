"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sampleSchedule,
  scheduleDayLabels,
  type ScheduleColor,
  type ScheduleSession,
} from "@/lib/data/admin-sample-schedule";

const colorStyles: Record<ScheduleColor, string> = {
  pink: "bg-pink-100 border-pink-300 text-pink-900",
  blue: "bg-pool-blue/20 border-pool-blue/50 text-deep-ink",
  orange: "bg-orange-100 border-orange-300 text-orange-900",
  green: "bg-landscape-green/15 border-landscape-green/40 text-landscape-green",
  purple: "bg-purple-100 border-purple-300 text-purple-900",
  yellow: "bg-heritage-yellow/25 border-heritage-yellow/60 text-deep-ink",
};

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // shift Sunday back to previous Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isoWeekNumber(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function formatRange(weekStart: Date) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 5);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const yearOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `${weekStart.toLocaleDateString("en-GB", opts)} – ${weekEnd.toLocaleDateString(
    "en-GB",
    yearOpts
  )} (Week ${isoWeekNumber(weekStart)})`;
}

/**
 * Greedy lane assignment so overlapping sessions sit side-by-side instead of
 * on top of one another, then returns each lane as its own chronological
 * list. Cards within a lane are rendered in normal document flow (stacked
 * top-to-bottom, each sized to its own content) rather than absolutely
 * positioned against a fixed-height time grid — that's what guarantees a
 * card can never clip its own text or overlap its neighbour, no matter how
 * much text it has or how short its time slot is.
 */
function assignLanes(sessions: ScheduleSession[]) {
  const sorted = [...sessions].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  const lanes: ScheduleSession[][] = [];

  for (const session of sorted) {
    let placed = false;
    for (const lane of lanes) {
      const last = lane[lane.length - 1];
      if (toMinutes(last.end) <= toMinutes(session.start)) {
        lane.push(session);
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([session]);
  }
  return lanes;
}

function SessionCard({
  session,
  showTeachers,
  showAreas,
}: {
  session: ScheduleSession;
  showTeachers: boolean;
  showAreas: boolean;
}) {
  const isFull = session.capacity.booked >= session.capacity.max;

  // Detail line combines teacher + area so toggling both on only ever adds
  // one extra line, not two.
  const detailParts = [showTeachers ? session.teacher : null, showAreas ? session.area : null].filter(
    Boolean
  );
  const hasDetailLine = detailParts.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-lg border px-2 py-1.5 text-[11px] leading-snug shadow-sm",
        colorStyles[session.color]
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="font-bold">
          {session.start}–{session.end}
        </span>
        {isFull ? (
          <span className="shrink-0 rounded bg-western-red px-1 text-[9px] font-bold text-white">
            FULL
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-semibold opacity-70">
            {session.capacity.booked}/{session.capacity.max}
          </span>
        )}
      </div>
      <span className="font-semibold break-words">{session.className}</span>
      {hasDetailLine ? (
        <span className="break-words text-[10px] opacity-75">{detailParts.join(" · ")}</span>
      ) : null}
    </div>
  );
}

function DayColumn({
  day,
  date,
  sessions,
  showTeachers,
  showAreas,
}: {
  day: number;
  date: Date;
  sessions: ScheduleSession[];
  showTeachers: boolean;
  showAreas: boolean;
}) {
  const lanes = useMemo(() => assignLanes(sessions), [sessions]);

  return (
    <div className="flex w-full flex-col border-b border-border last:border-b-0 lg:min-w-[160px] lg:flex-1 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="flex flex-row items-center justify-between gap-2 border-b border-border bg-ice-blue/40 px-3 py-2 lg:flex-col lg:justify-center lg:gap-0.5">
        <span className="text-xs font-bold text-deep-ink">{scheduleDayLabels[day]}</span>
        <span className="text-[10px] text-muted-foreground">
          {date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </span>
      </div>

      {lanes.length === 0 ? (
        <div className="flex-1 p-3 text-center text-[11px] text-muted-foreground">No sessions</div>
      ) : (
        <div className="flex flex-1 gap-1.5 p-1.5">
          {lanes.map((lane, laneIndex) => (
            <div key={laneIndex} className="flex flex-1 flex-col gap-1.5">
              {lane.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  showTeachers={showTeachers}
                  showAreas={showAreas}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ScheduleCalendar() {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [view, setView] = useState<"week" | "day">("week");
  const [dayIndex, setDayIndex] = useState(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 6 ? today - 1 : 0;
  });
  const [showTeachers, setShowTeachers] = useState(true);
  const [showAreas, setShowAreas] = useState(false);
  const [showSessionSpace, setShowSessionSpace] = useState(false);
  const [courseFilter, setCourseFilter] = useState("All courses");

  const courseOptions = useMemo(
    () => ["All courses", ...Array.from(new Set(sampleSchedule.map((s) => s.className)))],
    []
  );

  const filtered = useMemo(
    () =>
      courseFilter === "All courses"
        ? sampleSchedule
        : sampleSchedule.filter((s) => s.className === courseFilter),
    [courseFilter]
  );

  const daysToShow = view === "week" ? [0, 1, 2, 3, 4, 5] : [dayIndex];

  function shiftWeek(delta: number) {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + delta * 7);
    setWeekStart(next);
  }

  function shiftDay(delta: number) {
    setDayIndex((d) => Math.min(5, Math.max(0, d + delta)));
  }

  function goToday() {
    setWeekStart(getMonday(new Date()));
    const today = new Date().getDay();
    setDayIndex(today >= 1 && today <= 6 ? today - 1 : 0);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToday}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-deep-ink hover:bg-ice-blue"
          >
            Today
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => (view === "week" ? shiftWeek(-1) : shiftDay(-1))}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white hover:bg-ice-blue"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => (view === "week" ? shiftWeek(1) : shiftDay(1))}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-white hover:bg-ice-blue"
          >
            <ChevronRight className="size-4" />
          </button>
          <span className="flex items-center gap-2 pl-2 font-display text-sm font-bold text-deep-ink">
            <CalendarDays className="size-4 text-pool-blue-dark" />
            {view === "week"
              ? formatRange(weekStart)
              : `${scheduleDayLabels[dayIndex]}, ${formatRange(weekStart).split(" – ")[0]}`}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-ice-blue p-1">
          {(["week", "day"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-colors",
                view === v ? "bg-deep-ink text-white" : "text-deep-ink/60 hover:text-deep-ink"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles + filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-4">
          {[
            { label: "Show teachers", checked: showTeachers, set: setShowTeachers },
            { label: "Show areas", checked: showAreas, set: setShowAreas },
            { label: "Show session space", checked: showSessionSpace, set: setShowSessionSpace },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 font-medium text-deep-ink/80">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="size-4 rounded border-border accent-western-red"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="h-10 rounded-xl border border-border bg-white px-3 text-sm font-medium text-deep-ink"
        >
          {courseOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-muted-foreground">
        Sample data shown for layout purposes only, not a live class schedule. Sessions are listed
        in time order per day; cards size to fit their content so nothing is ever cut off.
      </p>

      {/* Grid: stacked full-width days on mobile/tablet, side-by-side columns from lg up */}
      <div className="overflow-x-hidden overflow-y-hidden rounded-md border border-border bg-white lg:overflow-x-auto">
        <div className="flex flex-col lg:min-w-[900px] lg:flex-row lg:items-stretch">
          {daysToShow.map((d) => {
            const colDate = new Date(weekStart);
            colDate.setDate(colDate.getDate() + d);
            return (
              <DayColumn
                key={d}
                day={d}
                date={colDate}
                sessions={filtered.filter((s) => s.day === d)}
                showTeachers={showTeachers}
                showAreas={showAreas || showSessionSpace}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
