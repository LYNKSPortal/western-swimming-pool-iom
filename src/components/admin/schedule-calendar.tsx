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

const START_HOUR = 8;
const END_HOUR = 19;
const ROW_HEIGHT = 60; // px per 30 minutes
const MIN_BLOCK_HEIGHT = 60; // enough room for time/capacity + class name + teacher
const TOTAL_ROWS = (END_HOUR - START_HOUR) * 2;

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

/** Greedy lane assignment so overlapping sessions sit side-by-side instead of stacking. */
function assignLanes(sessions: ScheduleSession[]) {
  const sorted = [...sessions].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  const lanes: ScheduleSession[][] = [];
  const laneOf = new Map<string, number>();

  for (const session of sorted) {
    let placed = false;
    for (let i = 0; i < lanes.length; i++) {
      const lane = lanes[i];
      const last = lane[lane.length - 1];
      if (toMinutes(last.end) <= toMinutes(session.start)) {
        lane.push(session);
        laneOf.set(session.id, i);
        placed = true;
        break;
      }
    }
    if (!placed) {
      lanes.push([session]);
      laneOf.set(session.id, lanes.length - 1);
    }
  }
  return { laneCount: lanes.length || 1, laneOf };
}

const HEADER_LINE_HEIGHT = 16;
const TEXT_LINE_HEIGHT = 15;
const BLOCK_VERTICAL_PADDING = 12; // py-1.5 top + bottom
const BLOCK_GAP = 3; // gap-0.5 between stacked lines

function SessionBlock({
  session,
  lane,
  laneCount,
  showTeachers,
  showAreas,
}: {
  session: ScheduleSession;
  lane: number;
  laneCount: number;
  showTeachers: boolean;
  showAreas: boolean;
}) {
  const top = ((toMinutes(session.start) - START_HOUR * 60) / 30) * ROW_HEIGHT;
  const durationHeight = ((toMinutes(session.end) - toMinutes(session.start)) / 30) * ROW_HEIGHT;
  const isFull = session.capacity.booked >= session.capacity.max;
  const width = 100 / laneCount;

  // Detail line combines teacher + area so toggling both on only ever adds
  // one extra line, not two, and the block always has room for its text.
  const detailParts = [showTeachers ? session.teacher : null, showAreas ? session.area : null].filter(
    Boolean
  );
  const hasDetailLine = detailParts.length > 0;
  const classNameLines = session.className.length > 16 ? 2 : 1;
  const lineCount = 1 + classNameLines + (hasDetailLine ? 1 : 0);
  const contentHeight =
    HEADER_LINE_HEIGHT +
    classNameLines * TEXT_LINE_HEIGHT +
    (hasDetailLine ? TEXT_LINE_HEIGHT : 0) +
    BLOCK_VERTICAL_PADDING +
    (lineCount - 1) * BLOCK_GAP;

  const height = Math.max(durationHeight, MIN_BLOCK_HEIGHT, contentHeight);

  return (
    <div
      className={cn(
        "absolute flex flex-col gap-0.5 overflow-hidden rounded-lg border px-2 py-1.5 text-[11px] leading-snug shadow-sm",
        colorStyles[session.color]
      )}
      style={{
        top,
        height,
        left: `${lane * width}%`,
        width: `calc(${width}% - 4px)`,
      }}
      title={`${session.className}, ${session.teacher}, ${session.area}`}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="font-bold">{session.start}</span>
        {isFull ? (
          <span className="rounded bg-western-red px-1 text-[9px] font-bold text-white">FULL</span>
        ) : (
          <span className="text-[10px] font-semibold opacity-70">
            {session.capacity.booked}/{session.capacity.max}
          </span>
        )}
      </div>
      <span className="line-clamp-2 font-semibold">{session.className}</span>
      {hasDetailLine ? (
        <span className="truncate text-[10px] opacity-75">{detailParts.join(" · ")}</span>
      ) : null}
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

  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
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
        Sample data shown for layout purposes only, not a live class schedule.
      </p>

      {/* Grid */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <div className="flex min-w-[720px]">
          {/* Time gutter */}
          <div className="w-16 shrink-0 border-r border-border">
            <div className="h-10 border-b border-border" />
            {hours.map((h) => (
              <div
                key={h}
                className="relative text-right text-[11px] text-muted-foreground"
                style={{ height: ROW_HEIGHT * 2 }}
              >
                <span className="absolute -top-2 right-2">{String(h).padStart(2, "0")}:00</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {daysToShow.map((d) => {
            const daySessions = filtered.filter((s) => s.day === d);
            const { laneOf, laneCount } = assignLanes(daySessions);
            const colDate = new Date(weekStart);
            colDate.setDate(colDate.getDate() + d);

            return (
              <div key={d} className="relative flex-1 border-r border-border last:border-r-0">
                <div className="flex h-10 flex-col items-center justify-center border-b border-border bg-ice-blue/40">
                  <span className="text-xs font-bold text-deep-ink">{scheduleDayLabels[d]}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {colDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <div className="relative" style={{ height: ROW_HEIGHT * TOTAL_ROWS }}>
                  {Array.from({ length: TOTAL_ROWS }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute inset-x-0 border-b border-dashed border-border/60",
                        i % 2 === 1 && "border-border/30"
                      )}
                      style={{ top: i * ROW_HEIGHT, height: ROW_HEIGHT }}
                    />
                  ))}
                  {daySessions.map((session) => (
                    <SessionBlock
                      key={session.id}
                      session={session}
                      lane={laneOf.get(session.id) ?? 0}
                      laneCount={laneCount}
                      showTeachers={showTeachers}
                      showAreas={showAreas || showSessionSpace}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
