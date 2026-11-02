import type { Metadata } from "next";
import Image from "next/image";
import { Wifi, Car, Baby, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MenuTabs } from "@/components/cafe/menu-tabs";

export const metadata: Metadata = {
  title: "Café West & Playground",
  description:
    "Café West at Western Swimming Pool serves all-day breakfasts, sandwiches, jacket potatoes, hot drinks and cakes, with a brilliant outdoor playground.",
};

const perks = [
  { icon: Clock, label: "Open seven days a week" },
  { icon: Wifi, label: "Free Wi-Fi in the café" },
  { icon: Car, label: "Free on-site parking" },
  { icon: Baby, label: "State-of-the-art outdoor playground" },
];

export default function CafePage() {
  return (
    <>
      <PageHero
        eyebrow="Café West"
        title="The warm, welcoming heart of the pool"
        description="From mums and tots to training groups, it's the perfect place to refuel and relax with friends — ideal for informal meetings too."
        image="/images/cafe-2.jpg"
        imageAlt="View of the café and beyond over the main pool at Western Swimming Pool"
      />
      <Breadcrumbs items={[{ label: "Café West & Playground" }]} />

      <Container className="flex flex-col gap-16 py-16">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Great food, ringside views"
              eyebrowVariant="yellow"
              title="Healthy salads, hearty breakfasts, and homemade cakes"
              description="Whether you fancy a healthy salad or a hearty all-day breakfast, our menu has plenty to tempt you, including seasonal specials and delicious homemade cakes."
            />
            <ul className="grid grid-cols-2 gap-3">
              {perks.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-xl bg-ice-blue/60 px-4 py-3 text-sm font-semibold text-deep-ink"
                >
                  <Icon className="size-4 text-western-red" /> {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)]">
            <Image
              src="/images/cafe-1.jpg"
              alt="A man sitting at a table in the corner of Café West"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Menu"
            eyebrowVariant="red"
            title="Snacks, cakes and drinks served all day"
          />
          <MenuTabs />
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)]">
            <Image
              src="/images/playground-1.jpg"
              alt="Peel pool playground with a red helicopter climbing frame and yellow castle climbing frame"
              fill
              sizes="(min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)]">
            <Image
              src="/images/playground-2.jpg"
              alt="Outdoor view of the playground with swing and climbing frames"
              fill
              sizes="(min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </section>
      </Container>
    </>
  );
}
