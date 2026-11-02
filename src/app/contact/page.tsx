import type { Metadata } from "next";
import { MapPin, Phone, Mail, Car } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Western Swimming Pool in Peel, Isle of Man — address, phone number, location map and enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="We want you to get the best from our pool and from us. We're here to help with any questions, suggestions or special requirements."
        image="/images/outside-playground.jpg"
        imageAlt="Wide angle view of the outside of the pool from the playground"
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4 p-7">
            <h2 className="font-display text-xl font-bold text-deep-ink">Visit us</h2>
            <a
              href="https://maps.google.com/?q=Western+Swimming+Pool+Derby+Road+Peel+Isle+of+Man"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-deep-ink hover:text-western-red"
            >
              <MapPin className="mt-0.5 size-5 shrink-0 text-western-red" />
              {siteConfig.address.line1}, {siteConfig.address.town}
              <br />
              {siteConfig.address.region} {siteConfig.address.postcode}
            </a>
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-sm text-deep-ink hover:text-western-red">
              <Phone className="size-5 text-western-red" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm text-deep-ink hover:text-western-red">
              <Mail className="size-5 text-western-red" /> {siteConfig.email}
            </a>
            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <Car className="mt-0.5 size-5 shrink-0 text-pool-blue-dark" />
              Free on-site parking, just off the A1 coast road into Peel.
            </p>
          </Card>

          <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Map showing the location of Western Swimming Pool, Derby Road, Peel"
              src="https://www.google.com/maps?q=Western+Swimming+Pool+Derby+Road+Peel+Isle+of+Man&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <Card className="p-7 sm:p-9">
          <h2 className="mb-6 font-display text-xl font-bold text-deep-ink">
            Fill in the form and we&apos;ll be in touch
          </h2>
          <ContactForm />
        </Card>
      </Container>
    </>
  );
}
