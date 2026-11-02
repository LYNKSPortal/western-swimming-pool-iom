import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { LegalSections } from "@/components/legal/legal-sections";
import { cookiePolicy } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Western Swimming Pool uses cookies on this website.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie policy"
        image="/images/hero-wide-pool.jpg"
        imageAlt="Wide angle of the main swimming pool"
      />
      <Breadcrumbs items={[{ label: "Cookie policy" }]} />
      <Container className="py-16">
        <Card className="p-6 sm:p-10">
          <LegalSections sections={cookiePolicy} />
        </Card>
      </Container>
    </>
  );
}
