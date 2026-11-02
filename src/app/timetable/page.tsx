import type { Metadata } from "next";
import { AlertTriangle, Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { TimetableInteractive } from "@/components/timetable/timetable-interactive";
import { timetable, timetableEffective, timetableNotices, weekdays } from "@/lib/data/timetable";
import { formatTime } from "@/lib/timetable-utils";

export const metadata: Metadata = {
  title: "Swimming Timetable",
  description:
    "Public swimming timetable for the Main Pool and Leisure Pool at Western Swimming Pool, Peel, Isle of Man.",
};

export default function TimetablePage() {
  return (
    <>
      <PageHero
        eyebrow="Timetable"
        title="Public swimming timetable"
        description={`Effective ${timetableEffective.from} to ${timetableEffective.to}. Choose a pool and a day to see session times.`}
        image="/images/hero-wide-pool.jpg"
        imageAlt="Wide angle of the main swimming pool"
      />
      <Breadcrumbs items={[{ label: "Timetable" }]} />

      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col gap-3 rounded-2xl border border-heritage-yellow/50 bg-heritage-yellow/15 p-5 text-sm text-deep-ink sm:flex-row sm:items-start">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-western-red" />
          <ul className="flex flex-col gap-1.5">
            {timetableNotices.map((notice) => (
              <li key={notice}>{notice}</li>
            ))}
          </ul>
        </div>

        <TimetableInteractive />

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-bold text-deep-ink">
            Full week at a glance
          </h2>
          <div className="flex flex-col gap-10 overflow-x-auto">
            {timetable.map((poolTimetable) => (
              <div key={poolTimetable.pool} className="min-w-[720px]">
                <h3 className="mb-3 font-display text-lg font-bold text-pool-blue-dark">
                  {poolTimetable.pool}
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekdays.map((day) => {
                    const schedule = poolTimetable.days.find((d) => d.day === day);
                    return (
                      <div key={day} className="flex flex-col gap-2 rounded-xl bg-ice-blue/60 p-3">
                        <span className="text-xs font-bold uppercase tracking-wide text-deep-ink/70">
                          {day.slice(0, 3)}
                        </span>
                        {schedule && schedule.sessions.length > 0 ? (
                          schedule.sessions.map((session, i) => (
                            <span key={i} className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-deep-ink shadow-sm">
                              {formatTime(session.start)}&ndash;{formatTime(session.end)}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">Closed</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-5 shrink-0 text-pool-blue-dark" />
          <p>
            Timetables are updated regularly for school holidays, half-terms and special events —
            this page reflects the most recently published schedule. If anything looks unclear or
            out of date, please call us on 01624 842525 to confirm before you travel.
          </p>
        </div>
      </Container>
    </>
  );
}
