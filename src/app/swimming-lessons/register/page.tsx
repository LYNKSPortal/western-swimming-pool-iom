import type { Metadata } from "next";
import { Phone, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonEnquiryForm } from "@/components/lessons/lesson-enquiry-form";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Sign Up to Swimming Lessons",
  description:
    "Sign up for swimming lessons at Western Swimming Pool, or book directly through our online booking portal.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Sign up to lessons"
        title="Let's get your family in the water"
        description="Let us know you're interested and we'll call you back, or book directly online if you're ready to go."
        image="/images/leisure-pool-3.jpg"
        imageAlt="Western swimming pool's little pool"
      />
      <Breadcrumbs items={[{ label: "Swimming lessons", href: "/swimming-lessons" }, { label: "Sign up" }]} />

      <Container className="flex flex-col gap-10 py-16">
        <div className="mx-auto w-full max-w-3xl">
          <LessonEnquiryForm />
        </div>

        <div className="mx-auto grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          <Card className="flex flex-col gap-4 p-7">
            <h2 className="font-display text-xl font-bold text-deep-ink">Ready to book now?</h2>
            <p className="text-sm text-muted-foreground">
              Existing and new customers can book lessons directly through our online booking
              portal.
            </p>
            <Button asChild size="lg" className="mt-auto w-fit">
              <a href={siteConfig.bookingPortalUrl} target="_blank" rel="noopener noreferrer">
                Book online <ExternalLink />
              </a>
            </Button>
          </Card>

          <Card className="flex flex-col gap-4 p-7">
            <h2 className="font-display text-xl font-bold text-deep-ink">Prefer to call?</h2>
            <p className="text-sm text-muted-foreground">
              Speak to the team directly, we can talk through programmes, availability and any
              medical or access needs in confidence.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-auto w-fit">
              <a href={siteConfig.phoneHref}>
                <Phone /> {siteConfig.phone}
              </a>
            </Button>
          </Card>
        </div>
      </Container>
    </>
  );
}
