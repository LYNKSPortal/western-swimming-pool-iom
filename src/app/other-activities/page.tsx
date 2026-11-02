import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { otherActivities } from "@/lib/data/activities";

export const metadata: Metadata = {
  title: "Other Activities",
  description:
    "Aquafit, Silver Club, Peel Swimming Club, indoor kayaking and synchronised swimming at Western Swimming Pool, Peel.",
};

export default function OtherActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Other activities"
        title="Whatever your age, ability and water goals"
        description="There's something for you in our exciting range of pool-based activities — plus support and coaching for people of all ages with special needs."
        image="/images/kayaking-3.jpg"
        imageAlt="A group of three people in kayaks taking part in a kayaking session"
      />
      <Breadcrumbs items={[{ label: "Other activities" }]} />

      <Container className="flex flex-col gap-16 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {otherActivities.map((activity) => (
            <Card key={activity.slug} className="flex flex-col overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src={activity.image}
                  alt={activity.imageAlt}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-7">
                <h2 className="font-display text-2xl font-bold text-deep-ink">{activity.name}</h2>
                {activity.description.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                <div className="mt-auto flex flex-col gap-2 pt-3 text-sm">
                  {activity.schedule ? (
                    <span className="flex items-center gap-2 font-semibold text-western-red">
                      <Calendar className="size-4" /> {activity.schedule}
                    </span>
                  ) : null}
                  {activity.instructors ? (
                    <span className="flex items-center gap-2 text-deep-ink/80">
                      <Users className="size-4 text-pool-blue-dark" /> Led by{" "}
                      {activity.instructors.join(", ")}
                    </span>
                  ) : null}
                  {activity.prerequisites ? (
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {activity.prerequisites.map((req) => (
                        <li
                          key={req}
                          className="rounded-full bg-ice-blue px-3 py-1 text-xs font-semibold text-deep-ink"
                        >
                          {req}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <section className="flex flex-col items-start gap-6 rounded-[var(--radius-2xl)] bg-ice-blue/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <SectionHeading
            eyebrow="Special needs support"
            eyebrowVariant="green"
            title="Tailored coaching for people of all ages"
            description="Our experienced teachers will tailor sessions to you, whatever your needs — get in touch to find out more."
          />
          <Button asChild size="lg">
            <Link href="/contact">
              Contact the team <ArrowRight />
            </Link>
          </Button>
        </section>
      </Container>
    </>
  );
}
