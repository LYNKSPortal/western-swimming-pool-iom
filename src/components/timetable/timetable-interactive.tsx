"use client";

import { useMemo, useState } from "react";
import { Waves, Clock, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { timetable, weekdays, type PoolName, type Weekday } from "@/lib/data/timetable";
import { formatTime } from "@/lib/timetable-utils";

function useTodayIndex() {
  return useMemo(() => {
    const jsDay = new Date().getDay();
    return (jsDay + 6) % 7;
  }, []);
}

function PoolSchedule({ pool }: { pool: PoolName }) {
  const todayIndex = useTodayIndex();
  const [activeDay, setActiveDay] = useState<Weekday>(weekdays[todayIndex]);
  const poolTimetable = timetable.find((t) => t.pool === pool);
  const daySchedule = poolTimetable?.days.find((d) => d.day === activeDay);

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label={`Choose a day for the ${pool}`}
        className="flex flex-wrap gap-2"
      >
        {weekdays.map((day, index) => {
          const active = day === activeDay;
          const isToday = index === todayIndex;
          return (
            <button
              key={day}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveDay(day)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-deep-ink text-white shadow-[var(--shadow-soft)]"
                  : "bg-ice-blue text-deep-ink/70 hover:bg-pool-blue/20"
              }`}
            >
              {day.slice(0, 3)}
              {isToday ? (
                <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-western-red ring-2 ring-white" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {daySchedule && daySchedule.sessions.length > 0 ? (
          daySchedule.sessions.map((session, i) => (
            <Card key={i} className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <Badge variant={pool === "Main Pool" ? "red" : "blue"}>{pool}</Badge>
                {session.needsConfirmation ? (
                  <Badge variant="outline" className="gap-1">
                    <AlertTriangle className="size-3" /> Confirm
                  </Badge>
                ) : null}
              </div>
              <div className="flex items-center gap-2 font-display text-lg font-bold text-deep-ink">
                <Waves className="size-5 text-pool-blue-dark" /> {session.label}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                {formatTime(session.start)} &ndash; {formatTime(session.end)}
              </div>
            </Card>
          ))
        ) : (
          <Card className="col-span-full flex flex-col items-center gap-2 border-dashed p-10 text-center">
            <p className="font-display text-lg font-bold text-deep-ink">
              No public sessions in the {pool} on {activeDay}
            </p>
            <p className="text-sm text-muted-foreground">
              Check the other pool tab, or see another day.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export function TimetableInteractive() {
  return (
    <Tabs defaultValue="Main Pool">
      <TabsList>
        <TabsTrigger value="Main Pool">Main Pool</TabsTrigger>
        <TabsTrigger value="Leisure Pool">Leisure Pool</TabsTrigger>
      </TabsList>
      <TabsContent value="Main Pool">
        <PoolSchedule pool="Main Pool" />
      </TabsContent>
      <TabsContent value="Leisure Pool">
        <PoolSchedule pool="Leisure Pool" />
      </TabsContent>
    </Tabs>
  );
}
