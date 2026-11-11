import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { admissionPrices, ticketOptions } from "@/lib/data/prices";

export const metadata: Metadata = {
  title: "Admission Prices",
  description:
    "Admission prices, family tickets, 10 swim savers and the 365-day annual ticket at Western Swimming Pool, Peel.",
};

export default function AdmissionPricesPage() {
  return (
    <>
      <PageHero
        eyebrow="Admission prices"
        title="Simple, honest pricing for every swimmer"
        description="Pay as you go for a single visit, or save with a multi-swim card and our 365-day annual ticket."
        image="/images/hero-lane-dividers.jpg"
        imageAlt="Wide angled view of the main pool with lane dividers"
      />
      <Breadcrumbs items={[{ label: "Admission prices" }]} />

      <Container className="flex flex-col gap-16 py-16">
        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-bold text-deep-ink sm:text-3xl">
            Pay-as-you-go admission
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {admissionPrices.map((price) => (
              <Card key={price.label} className="flex h-full flex-col items-center gap-3 p-6 pt-7 text-center">
                <span className="font-display text-4xl font-extrabold text-western-red">
                  £{price.price.toFixed(2)}
                </span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <div className="flex flex-1 flex-col items-center gap-1">
                  <span className="font-semibold text-deep-ink">{price.label}</span>
                  <span className="min-h-[2.2em] text-xs leading-snug text-muted-foreground">
                    {price.note ?? ""}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-bold text-deep-ink sm:text-3xl">
            Tickets & multi-swim savings
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ticketOptions.map((ticket) => (
              <Card
                key={ticket.label}
                className={
                  ticket.featured
                    ? "flex flex-col gap-3 border-western-red bg-western-red p-7 text-white shadow-[var(--shadow-glow-red)]"
                    : "flex flex-col gap-3 p-7"
                }
              >
                <span
                  className={
                    ticket.featured
                      ? "font-display text-3xl font-extrabold text-white"
                      : "font-display text-3xl font-extrabold text-deep-ink"
                  }
                >
                  £{ticket.price.toFixed(2)}
                </span>
                <h3 className={ticket.featured ? "font-bold text-white" : "font-bold text-deep-ink"}>
                  {ticket.label}
                </h3>
                <p
                  className={
                    ticket.featured
                      ? "flex items-start gap-2 text-sm text-white/85"
                      : "flex items-start gap-2 text-sm text-muted-foreground"
                  }
                >
                  <Check className="mt-0.5 size-4 shrink-0" /> {ticket.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-ice-blue/60 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-xl font-bold text-deep-ink">
              Ready for a swim?
            </h3>
            <p className="text-sm text-muted-foreground">
              Check today&apos;s public swimming times before you visit.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/timetable">
              View timetable <ArrowRight />
            </Link>
          </Button>
        </section>
      </Container>
    </>
  );
}
