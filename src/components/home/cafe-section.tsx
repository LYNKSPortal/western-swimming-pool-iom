import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wifi, Car, Baby } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function CafeSection() {
  return (
    <section className="relative overflow-hidden bg-deep-ink py-20 text-white sm:py-28">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/cafe-3.jpg"
          alt="View of Café West overlooking the main pool at Western Swimming Pool"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-deep-ink via-deep-ink/85 to-deep-ink/40" />

      <Container className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-heritage-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deep-ink">
            Café West & Playground
          </span>
          <h2 className="text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Refuel, relax and let the kids run wild
          </h2>
          <p className="max-w-lg text-balance text-base text-white/80 sm:text-lg">
            Café West is the warm and welcoming heart of the pool, all-day breakfasts, sandwiches,
            jacket potatoes, hot drinks and homemade cakes with ringside views over the Main Pool.
            Outside, our state-of-the-art playground keeps little ones entertained for hours.
          </p>
          <div className="flex flex-col gap-3 text-sm font-semibold text-white/85 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <span className="flex items-center gap-2"><Wifi className="size-4 text-pool-blue" /> Free Wi-Fi</span>
            <span className="flex items-center gap-2"><Car className="size-4 text-pool-blue" /> Free parking</span>
            <span className="flex items-center gap-2"><Baby className="size-4 text-pool-blue" /> Outdoor playground</span>
          </div>
          <Button asChild variant="accent" size="lg" className="w-fit">
            <Link href="/cafe-and-playground">
              View the menu <ArrowRight />
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)]">
            <Image
              src="/images/cafe-1.jpg"
              alt="A man sitting at a table in the corner of Café West at the Western Swimming Pool"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)]">
            <Image
              src="/images/playground-1.jpg"
              alt="Peel pool playground with a red helicopter climbing frame and yellow castle climbing frame"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)]">
            <Image
              src="/images/cafe-cakes.jpg"
              alt="Bowl of fruit with cakes behind in Café West"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
