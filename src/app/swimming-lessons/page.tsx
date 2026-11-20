import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonFinder } from "@/components/lessons/lesson-finder";
import { lessonProgrammes, progressionPathway } from "@/lib/data/lessons";
import { successStories } from "@/lib/data/stories";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Swimming Lessons",
  description:
    "Swimming lessons at Western Swimming Pool, Peel, from four months old through Aquanatal, pre-school, junior stages, lifesaving and adult coaching.",
};

const sorted = [...lessonProgrammes].sort((a, b) => a.order - b.order);

export default function SwimmingLessonsPage() {
  return (
    <>
      <PageHero
        eyebrow="Swimming lessons"
        title="From babies to teens and beyond"
        description="Our friendly, well-equipped pool is the perfect place for any swimmer's journey, and you couldn't be in safer hands than those of our professional teachers and coaches."
        image="/images/hero-wide-pool.jpg"
        imageAlt="Wide angled view of the main pool"
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="lg" variant="primary">
            <Link href="/swimming-lessons/register">Sign up to lessons</Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <a href={siteConfig.bookingPortalUrl} target="_blank" rel="noopener noreferrer">
              Book online
            </a>
          </Button>
        </div>
      </PageHero>
      <Breadcrumbs items={[{ label: "Swimming lessons" }]} />

      <Container className="flex flex-col gap-20 py-16">
        <section className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Our junior swim scheme"
              eyebrowVariant="red"
              title="One of the most varied learn-to-swim programmes in the Isle of Man"
              description="From four months old right through to young adult. Whether your child wants to swim for fun or for the Olympic team, it's a great springboard. We also offer adult lessons and coaching for everyone from beginners to budding triathletes."
            />
            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-ice-blue/60 p-5">
              {progressionPathway.map((stage, index) => (
                <span key={stage} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-deep-ink shadow-sm">
                    {stage}
                  </span>
                  {index < progressionPathway.length - 1 ? (
                    <ArrowRightCircle className="size-4 text-pool-blue-dark" />
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          <LessonFinder />
        </section>

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Programmes"
            eyebrowVariant="blue"
            title="Every stage of the swimming journey"
            align="center-mobile"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((lesson) => (
              <Link key={lesson.slug} href={`/swimming-lessons/${lesson.slug}`} className="group block h-full">
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
                    <h3 className="font-display text-lg font-bold text-deep-ink">{lesson.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{lesson.summary}</p>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-semibold text-western-red">
                      Details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8 rounded-[var(--radius-2xl)] bg-ice-blue/50 p-8 sm:p-12">
          <SectionHeading
            eyebrow="Community stories"
            eyebrowVariant="yellow"
            title="Anna and Will's swimming journeys"
            description="Two of our favourite stories of swimmers who learned here, and came back to teach."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {successStories.map((story) => (
              <Card key={story.slug} className="flex flex-col gap-4 overflow-hidden sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-48 sm:shrink-0">
                  <Image src={story.image} alt={story.imageAlt} fill sizes="200px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2 p-6 pl-0 sm:pl-0">
                  <h3 className="font-display text-xl font-bold text-deep-ink">{story.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-western-red">{story.role}</p>
                  {story.story.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-deep-ink">Ready to get started?</h3>
            <p className="text-sm text-muted-foreground">
              Send us an enquiry and we&apos;ll help you find the right lesson.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/swimming-lessons/register">
              Enquire now <ArrowRight />
            </Link>
          </Button>
        </section>
      </Container>
    </>
  );
}
