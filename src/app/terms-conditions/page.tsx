import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { LegalSections } from "@/components/legal/legal-sections";
import { termsConditions } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for swimming lessons and facility use at Western Swimming Pool.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        image="/images/hero-wide-pool.jpg"
        imageAlt="Wide angle of the main swimming pool"
      />
      <Breadcrumbs items={[{ label: "Terms & conditions" }]} />
      <Container className="py-16">
        <Card className="p-6 sm:p-10">
          <LegalSections sections={termsConditions} />
        </Card>
      </Container>
    </>
  );
}
