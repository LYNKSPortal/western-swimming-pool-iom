import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { admissionPrices, ticketOptions } from "@/lib/data/prices";

export function PricingSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Admission & membership"
          eyebrowVariant="yellow"
          align="center"
          title="Great value, for however often you swim"
          description="Pay as you go, save with a 10-swim card, or dive in all year with our annual ticket."
          className="mx-auto"
        />

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {admissionPrices.map((price, i) => (
            <Reveal key={price.label} delay={i * 0.04} className="h-full">
              <Card className="flex h-full flex-col items-center gap-3 p-5 pt-6 text-center">
                <span className="font-display text-3xl font-extrabold text-western-red">
                  £{price.price.toFixed(2)}
                </span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <div className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-sm font-semibold text-deep-ink">{price.label}</span>
                  <span className="min-h-[2.2em] text-xs leading-snug text-muted-foreground">
                    {price.note ?? ""}
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ticketOptions.map((ticket, i) => (
            <Reveal key={ticket.label} delay={i * 0.05}>
              <Card
                className={
                  ticket.featured
                    ? "flex h-full flex-col gap-3 border-western-red bg-western-red p-6 text-white shadow-[var(--shadow-glow-red)]"
                    : "flex h-full flex-col gap-3 p-6"
                }
              >
                <span
                  className={
                    ticket.featured
                      ? "font-display text-2xl font-extrabold text-white"
                      : "font-display text-2xl font-extrabold text-deep-ink"
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
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/admission-prices">
              Full pricing details <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
