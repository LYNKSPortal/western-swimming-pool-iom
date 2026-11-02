import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { LegalSections } from "@/components/legal/legal-sections";
import { privacyPolicy } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Western Swimming Pool collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        image="/images/hero-wide-pool.jpg"
        imageAlt="Wide angle of the main swimming pool"
      />
      <Breadcrumbs items={[{ label: "Privacy policy" }]} />
      <Container className="py-16">
        <Card className="p-6 sm:p-10">
          <LegalSections sections={privacyPolicy} />
        </Card>
      </Container>
    </>
  );
}
