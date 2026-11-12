import type { Metadata } from "next";
import Image from "next/image";
import { Ruler, Users, Accessibility, Waves } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { historyTimeline } from "@/lib/data/history";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The history, facilities and community mission of Western Swimming Pool in Peel, Isle of Man, open since 2003.",
};

const facilityPoints = [
  {
    icon: Ruler,
    title: "Our pools",
    text: "The Main Pool is 25 metres long and six lanes wide, giving plenty of scope to divide it for different groups and activities. The Leisure Pool is specially designed for families with young children and groups of little ones starting out on their swimming journey.",
  },
  {
    icon: Waves,
    title: "Equipment & changing",
    text: "From rubber ducks to pull buoys, there's something for everyone in our range of swimming equipment. The changing area houses showers, toilets and more than enough lockers and cubicles for everyone, plus a dedicated seating area for spectators poolside.",
  },
  {
    icon: Accessibility,
    title: "Support for special needs",
    text: "Our support for people with special needs includes discounted entry, accessible changing rooms, shower seats and a hoist to help with getting in and out of the pool. Carers are very welcome, and our lifeguards and pool helpers are always on hand to help.",
  },
  {
    icon: Users,
    title: "Our community",
    text: "We're proud to be at the heart of Peel's community, from new parents in the water for the first time, to teenagers training for competition, to Silver Club members staying active in later life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Fun and fitness at the heart of the community"
        description="With soaring wooden ceilings and big windows that let the light flood in, our pool is a really happy space to spend time in."
        image="/images/pool-ceiling.jpg"
        imageAlt="Wide angle view of Peel's main swimming pool showing the vaulted wooden ceiling and all lanes"
      />
      <Breadcrumbs items={[{ label: "About us" }]} />

      <Container className="flex flex-col gap-20 py-16">
        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Pools & facilities"
            eyebrowVariant="blue"
            title="A happy space, built for the whole community"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {facilityPoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-soft)]">
                <Icon className="size-6 text-western-red" />
                <h3 className="font-display text-lg font-bold text-deep-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Our history"
            eyebrowVariant="yellow"
            title="Pools in Peel: a potted history"
            description="From a Victorian seawater lido to today's modern facility, swimming has been part of life in Peel for well over a century."
          />

          <ol className="relative flex flex-col gap-10 border-l-2 border-dashed border-pool-blue/40 pl-8">
            {historyTimeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute -left-[2.45rem] flex size-6 items-center justify-center rounded-full bg-western-red text-[10px] font-bold text-white ring-4 ring-white">
                  •
                </span>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                  <span className="shrink-0 font-display text-2xl font-extrabold text-pool-blue-dark sm:w-32">
                    {entry.year}
                  </span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="font-display text-xl font-bold text-deep-ink">{entry.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
                    {entry.image ? (
                      <div className="relative mt-1 aspect-[16/9] w-full max-w-md overflow-hidden rounded-2xl">
                        <Image
                          src={entry.image}
                          alt={entry.imageAlt ?? entry.title}
                          fill
                          sizes="400px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </>
  );
}
