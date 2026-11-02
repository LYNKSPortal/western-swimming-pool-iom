import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, CheckCircle2, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getLessonBySlug, lessonProgrammes } from "@/lib/data/lessons";

export function generateStaticParams() {
  return lessonProgrammes.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/swimming-lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};
  return {
    title: lesson.name,
    description: lesson.summary,
  };
}

export default async function LessonProgrammePage({
  params,
}: PageProps<"/swimming-lessons/[slug]">) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const otherLessons = lessonProgrammes
    .filter((l) => l.slug !== lesson.slug)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-deep-ink">
        <div className="absolute inset-0">
          <Image
            src={lesson.image}
            alt={lesson.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-ink via-deep-ink/70 to-deep-ink/30" />
        </div>
        <Container className="relative flex min-h-[40vh] flex-col justify-end gap-4 py-16 sm:py-20">
          <Badge variant="yellow">{lesson.audience}</Badge>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">{lesson.name}</h1>
          <p className="max-w-2xl text-balance text-base text-white/85 sm:text-lg">{lesson.summary}</p>
        </Container>
      </section>
      <Breadcrumbs items={[{ label: "Swimming lessons", href: "/swimming-lessons" }, { label: lesson.name }]} />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-8">
          {lesson.description.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}

          <div className="grid gap-3 sm:grid-cols-2">
            {lesson.highlights.map((point) => (
              <div key={point} className="flex items-start gap-2 rounded-xl bg-ice-blue/60 px-4 py-3 text-sm font-semibold text-deep-ink">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-landscape-green" /> {point}
              </div>
            ))}
          </div>

          {lesson.prerequisites ? (
            <Card className="flex flex-col gap-3 border-western-red/20 bg-western-red/5 p-6">
              <h2 className="font-display text-lg font-bold text-deep-ink">To take part</h2>
              <ul className="flex flex-col gap-1.5 text-sm text-deep-ink/80">
                {lesson.prerequisites.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-western-red" /> {item}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={lesson.cta?.href ?? "/swimming-lessons/register"}>
                {lesson.cta?.label ?? "Enquire about this programme"} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/swimming-lessons">Back to all programmes</Link>
            </Button>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-deep-ink">
              <Users className="size-4 text-pool-blue-dark" /> Age range
            </div>
            <p className="text-sm text-muted-foreground">{lesson.ageRange}</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-deep-ink">
              <Calendar className="size-4 text-pool-blue-dark" /> Pool
            </div>
            <p className="text-sm text-muted-foreground">{lesson.pool}</p>
            {lesson.schedule ? (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-deep-ink">
                  <Calendar className="size-4 text-pool-blue-dark" /> Schedule
                </div>
                <p className="text-sm text-muted-foreground">{lesson.schedule}</p>
              </>
            ) : null}
          </Card>

          <Card className="flex flex-col gap-3 p-6">
            <h2 className="font-display text-base font-bold text-deep-ink">Explore more</h2>
            {otherLessons.map((l) => (
              <Link
                key={l.slug}
                href={`/swimming-lessons/${l.slug}`}
                className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-deep-ink hover:bg-ice-blue"
              >
                {l.name} <ArrowRight className="size-4 text-western-red" />
              </Link>
            ))}
          </Card>
        </aside>
      </Container>
    </>
  );
}
