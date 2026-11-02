import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/data/site";

export function ContactSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Container className="grid gap-10 overflow-hidden rounded-[var(--radius-2xl)] bg-deep-ink lg:grid-cols-2">
        <Reveal className="relative order-2 min-h-[280px] lg:order-1">
          <Image
            src="/images/outside-playground.jpg"
            alt="Wide angle view of the outside of the pool from the playground"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="order-1 flex flex-col justify-center gap-6 p-8 text-white sm:p-12 lg:order-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-heritage-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deep-ink">
            Find us
          </span>
          <h2 className="text-balance font-display text-3xl font-extrabold sm:text-4xl">
            Visit Western Swimming Pool
          </h2>
          <div className="flex flex-col gap-3 text-white/85">
            <span className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-pool-blue" />
              {siteConfig.address.line1}, {siteConfig.address.town}, {siteConfig.address.region}{" "}
              {siteConfig.address.postcode}
            </span>
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 hover:text-white">
              <Phone className="size-5 shrink-0 text-pool-blue" /> {siteConfig.phone}
            </a>
            <span className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-pool-blue" />
              Opening times vary daily — see the full timetable for session times.
            </span>
          </div>
          <Button asChild size="lg" variant="accent" className="w-fit">
            <Link href="/contact">
              Get in touch <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
