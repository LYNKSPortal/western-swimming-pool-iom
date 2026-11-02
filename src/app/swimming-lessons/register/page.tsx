import type { Metadata } from "next";
import Image from "next/image";
import { Phone, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonEnquiryForm } from "@/components/lessons/lesson-enquiry-form";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Register for Swimming Lessons",
  description:
    "Enquire about swimming lessons at Western Swimming Pool, or register directly through our online booking portal.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Sign up for lessons"
        title="Let's get your family in the water"
        description="Fill in a quick enquiry, call the team, or jump straight into our online booking portal."
        image="/images/leisure-pool-3.jpg"
        imageAlt="Western swimming pool's little pool"
      />
      <Breadcrumbs items={[{ label: "Swimming lessons", href: "/swimming-lessons" }, { label: "Register" }]} />

      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4 p-7">
            <h2 className="font-display text-xl font-bold text-deep-ink">Prefer to book online?</h2>
            <p className="text-sm text-muted-foreground">
              Our existing booking portal lets you register and manage swimming lesson places
              directly.
            </p>
            <Button asChild size="lg">
              <a href={siteConfig.bookingPortalUrl} target="_blank" rel="noopener noreferrer">
                Open booking portal <ExternalLink />
              </a>
            </Button>
          </Card>

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
