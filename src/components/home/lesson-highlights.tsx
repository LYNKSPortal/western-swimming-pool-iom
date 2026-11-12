import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { lessonProgrammes } from "@/lib/data/lessons";

const featured = lessonProgrammes.filter((l) =>
  ["adult-and-child", "pre-school", "stages-1-3", "stages-7-10", "rookie-lifeguard", "adult-coaching"].includes(
    l.slug
  )
);

export function LessonHighlights() {
  return (
    <section className="bg-ice-blue/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Swimming lessons"
            eyebrowVariant="red"
            title="One of the Isle of Man's most varied learn-to-swim programmes"
            description="From four months old right through to young adult, and adult lessons and coaching for everyone from beginners to budding triathletes."
          />
          <Button asChild variant="primary">
            <Link href="/swimming-lessons">
              Explore all programmes <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((lesson, i) => (
            <Reveal key={lesson.slug} delay={i * 0.05}>
              <Link href={`/swimming-lessons/${lesson.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[var(--shadow-lifted)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={lesson.image}
                      alt={lesson.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <span className="text-xs font-bold uppercase tracking-wide text-pool-blue-dark">
                      {lesson.ageRange}
                    </span>
                    <h3 className="font-display text-xl font-bold text-deep-ink">{lesson.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{lesson.summary}</p>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-semibold text-western-red">
                      Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
