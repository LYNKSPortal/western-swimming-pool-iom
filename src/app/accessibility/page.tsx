import type { Metadata } from "next";
import Image from "next/image";
import { Car, DoorOpen, Waves, Bath, LifeBuoy, Accessibility as AccessibilityIcon, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility and disability access information for Western Swimming Pool, Peel, parking, entrances, changing rooms, hoist and wheelchair provision.",
};

const points = [
  { icon: Car, label: "Dedicated parking bays for customers with a disability" },
  { icon: DoorOpen, label: "Wide access front entrance doors" },
  { icon: Waves, label: "Easy access to the pool and café areas" },
  { icon: Bath, label: "Adapted changing rooms and showers" },
  { icon: LifeBuoy, label: "Pool hoist for wheelchair users" },
  { icon: AccessibilityIcon, label: "Wheelchair provision" },
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Everyone in the community deserves to get in the water"
        description="We're committed to making sure everyone in the community can access our facilities, activities and equipment."
        image="/images/accessible-changing.jpg"
        imageAlt="Accessible changing room and shower facilities"
      />
      <Breadcrumbs items={[{ label: "Accessibility" }]} />

      <Container className="flex flex-col gap-14 py-16">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="We offer"
              eyebrowVariant="green"
              title="Facilities designed for access and dignity"
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {points.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm font-semibold text-deep-ink shadow-[var(--shadow-soft)]">
                  <Icon className="mt-0.5 size-5 shrink-0 text-western-red" /> {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)]">
            <Image
              src="/images/accessible-hoist.jpg"
              alt="Disabled hoist at the side of the main swimming pool"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-2xl bg-ice-blue/60 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-deep-ink">
              Want to know more about accessing our facilities?
            </h2>
            <p className="text-sm text-muted-foreground">
              Get in touch with the team and we&apos;ll be very happy to help.
            </p>
          </div>
          <Button asChild size="lg">
            <a href={siteConfig.phoneHref}>
              <Phone /> {siteConfig.phone}
            </a>
          </Button>
        </section>
      </Container>
    </>
  );
}
