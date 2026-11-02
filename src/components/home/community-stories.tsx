import Image from "next/image";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { successStories } from "@/lib/data/stories";

export function CommunityStories() {
  return (
    <section className="bg-ice-blue/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Community stories"
          eyebrowVariant="blue"
          align="center"
          title="They learned to swim here. Now they teach here."
          description="Some of our favourite stories start as a nervous first lesson and end up behind the whistle."
          className="mx-auto"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {successStories.map((story, i) => (
            <Reveal key={story.slug} delay={i * 0.08}>
              <Card className="grid h-full grid-cols-[auto_1fr] gap-5 p-6 sm:grid-cols-1">
                <div className="relative size-24 overflow-hidden rounded-2xl sm:size-full sm:aspect-[16/9]">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 640px) 45vw, 96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-bold text-deep-ink">{story.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-western-red">
                    {story.role}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{story.story[0]}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
