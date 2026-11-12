import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonEnquiryForm } from "@/components/lessons/lesson-enquiry-form";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Book Swimming Lessons",
  description:
    "Book or enquire about swimming lessons at Western Swimming Pool using our interactive programme-aware enquiry form.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Book swimming lessons"
        title="Let's get your family in the water"
        description="Pick a programme and fill in a quick enquiry — our form shows the age range, eligibility and pricing as you go. Our team will call you back to confirm and complete registration."
        image="/images/leisure-pool-3.jpg"
        imageAlt="Western swimming pool's little pool"
      />
      <Breadcrumbs items={[{ label: "Swimming lessons", href: "/swimming-lessons" }, { label: "Book lessons" }]} />

      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4 p-7">
            <h2 className="font-display text-xl font-bold text-deep-ink">Prefer to call?</h2>
            <p className="text-sm text-muted-foreground">
              Speak to the team directly — we can talk through programmes, availability and any
              medical or access needs in confidence.
            </p>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.phoneHref}>
                <Phone /> {siteConfig.phone}
              </a>
            </Button>
          </Card>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)]">
            <Image
              src="/images/accessible-hoist.jpg"
              alt="Accessible pool hoist at Western Swimming Pool"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <LessonEnquiryForm />
      </Container>
    </>
  );
}
