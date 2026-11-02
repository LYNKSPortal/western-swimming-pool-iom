import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Waves, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { quickLinks, siteConfig } from "@/lib/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-deep-ink">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-main-pool.jpg"
          alt="Wide angled view of the Main pool at Western Swimming Pool in Peel"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-ink via-deep-ink/60 to-deep-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-ink/85 via-deep-ink/20 to-transparent" />
        <div className="animate-wave absolute -bottom-10 left-0 h-32 w-[140%] bg-[radial-gradient(ellipse_at_center,_rgba(114,184,245,0.35),_transparent_70%)]" />
      </div>

      <Container className="relative flex min-h-[86vh] flex-col justify-end gap-10 pb-16 pt-40 sm:min-h-[92vh] sm:pb-20">
        <Reveal className="flex max-w-3xl flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-heritage-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deep-ink">
            Derby Road, Peel, Isle of Man
          </span>
          <h1 className="text-balance font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Your pool. Your community.
            <span className="text-pool-blue"> Your next adventure.</span>
          </h1>
          <p className="max-w-xl text-balance text-lg text-white/85 sm:text-xl">
            {siteConfig.tagline}. Swim, learn, train and relax at the heart of Peel &mdash;
            with a 25m six-lane main pool, a family leisure pool, swimming lessons for every
            age, and Café West for when you&apos;re done.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" variant="primary">
              <a href={siteConfig.bookingPortalUrl} target="_blank" rel="noopener noreferrer">
                <Waves /> Book swimming lessons
              </a>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/timetable">
                <CalendarDays /> View timetable
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-1 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                <span className="flex items-center justify-between font-display text-sm font-bold text-white">
                  {link.label}
                  <ArrowRight className="size-4 text-pool-blue opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="text-xs leading-relaxed text-white/65">{link.description}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
