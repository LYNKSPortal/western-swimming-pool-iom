import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { otherActivities } from "@/lib/data/activities";

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
            description="Aquafit, Silver Club, Peel Swimming Club, synchronised swimming, indoor kayaking — plus support and coaching for people of all ages with special needs."
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)]">
            <Image
              src="/images/kayaking-3.jpg"
              alt="A group of three people in kayaks taking part in a kayaking session at the swimming pool"
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

        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((activity, i) => (
            <Reveal key={activity.slug} delay={i * 0.06}>
              <Card className="flex h-full flex-col gap-3 p-6">
                <h3 className="font-display text-xl font-bold text-deep-ink">{activity.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{activity.summary}</p>
                {activity.schedule ? (
                  <p className="text-xs font-bold uppercase tracking-wide text-western-red">
                    {activity.schedule}
                  </p>
                ) : null}
              </Card>
            </Reveal>
          ))}
          <Reveal delay={0.18} className="sm:col-span-2">
            <Card className="flex flex-col gap-2 border-dashed p-6">
              <h3 className="font-display text-lg font-bold text-deep-ink">
                Indoor kayaking & synchronised swimming
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We also run indoor kayaking sessions and synchronised swimming — a brilliant way to
                try something new in the water. Get in touch for current availability.
              </p>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
