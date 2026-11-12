"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Waves, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUpcomingSessions, formatTime, type UpcomingSession } from "@/lib/timetable-utils";

export function UpcomingSessions() {
  const [sessions, setSessions] = useState<UpcomingSession[] | null>(null);

  useEffect(() => {
    // Computed on the client (not during render/SSR) because it depends on
    // the visitor's current date/time and must not cause a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessions(getUpcomingSessions(4));
  }, []);

  return (
    <section className="aquatic-gradient py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Public swimming"
            eyebrowVariant="blue"
            title="Next public swim sessions"
            description="A live look at the soonest sessions across our Main Pool and Leisure Pool. Always closed on bank holidays, check social media for last-minute changes."
          />
          <Button asChild variant="outline">
            <Link href="/timetable">
              Full timetable <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(sessions ?? Array.from({ length: 4 })).map((session, index) => (
            <Card
              key={session ? `${session.pool}-${session.day}-${session.start}` : index}
              className="flex flex-col gap-4 p-6 hover:shadow-[var(--shadow-lifted)]"
            >
              {session ? (
                <>
                  <div className="flex items-center justify-between">
                    <Badge variant={session.pool === "Main Pool" ? "red" : "blue"}>
                      {session.pool}
                    </Badge>
                    {session.isToday ? <Badge variant="yellow">Today</Badge> : null}
                  </div>
                  <div className="flex items-center gap-2 text-deep-ink">
                    <Waves className="size-5 text-pool-blue-dark" />
                    <span className="font-display text-lg font-bold">{session.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    <span>
                      {session.isToday ? "Today" : session.day}, {formatTime(session.start)} &ndash;{" "}
                      {formatTime(session.end)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-24 animate-pulse flex-col gap-3">
                  <div className="h-4 w-20 rounded-full bg-ice-blue" />
                  <div className="h-5 w-32 rounded-full bg-ice-blue" />
                  <div className="h-4 w-28 rounded-full bg-ice-blue" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
