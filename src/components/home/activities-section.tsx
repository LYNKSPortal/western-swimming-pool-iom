import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartPulse, Trophy, Waves, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { otherActivities } from "@/lib/data/activities";

const activityIcons: Record<string, LucideIcon> = {
  aquafit: Waves,
  "silver-club": HeartPulse,
  "peel-swimming-club": Trophy,
};

const featured = otherActivities.filter((a) =>
  ["aquafit", "silver-club", "peel-swimming-club"].includes(a.slug)
);

export function ActivitiesSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Other activities"
            eyebrowVariant="green"
            title="Public swimming, with plenty more besides"
            description="Aquafit, Silver Club and Peel Swimming Club, plus support and coaching for people of all ages with special needs."
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)]">
            <Image
              src="/images/pool-ceiling.jpg"
              alt="Wide angle view of Peel's main swimming pool showing the vaulted wooden ceiling and lanes"
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/other-activities">
              See all activities <ArrowRight />
            </Link>
          </Button>
        </Reveal>

        <Card className="flex flex-col divide-y divide-border overflow-hidden p-0">
          {featured.map((activity, i) => {
            const Icon = activityIcons[activity.slug] ?? Waves;
            return (
              <Reveal
                key={activity.slug}
                delay={i * 0.06}
                className="flex items-start gap-4 p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-landscape-green/10 text-landscape-green">
                  <Icon className="size-6" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-lg font-bold text-deep-ink">{activity.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{activity.summary}</p>
                  {activity.schedule ? (
                    <p className="text-xs font-bold uppercase tracking-wide text-western-red">
                      {activity.schedule}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </Card>
      </Container>
    </section>
  );
}
