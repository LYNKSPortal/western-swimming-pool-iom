import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

const points = [
  "Dedicated parking bays for customers with a disability",
  "Wide access front entrance doors",
  "Easy access to the pool and café areas",
  "Adapted changing rooms and showers",
  "Pool hoist for wheelchair users",
  "Wheelchair provision",
];

export function AccessibilitySection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Accessibility"
            eyebrowVariant="green"
            title="Everyone in the community deserves to get in the water"
            description="We're committed to making sure everyone can access our facilities, activities and equipment — with discounted entry for disabled swimmers and their carer."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm font-medium text-deep-ink">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-landscape-green" />
                {point}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/accessibility">
              Accessibility information <ArrowRight />
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)]">
          <Image
            src="/images/accessible-hoist.jpg"
            alt="Accessible pool hoist at the side of the main swimming pool"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
