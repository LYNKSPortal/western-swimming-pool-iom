"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, CalendarDays, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { primaryNav, siteConfig } from "@/lib/data/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled || open
          ? "bg-white/95 shadow-[var(--shadow-soft)] backdrop-blur-lg"
          : "bg-white"
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Western Swimming Pool home">
            <Image
              src="/images/logo.png"
              alt="Western Swimming Pool logo featuring a Viking ship and Peel Castle"
              width={56}
              height={56}
              className="size-12 sm:size-14"
              priority
            />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-extrabold text-deep-ink">
                Western Swimming Pool
              </span>
              <span className="text-xs font-medium text-pool-blue-dark">
                Fun and fitness at the heart of the community
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="outline" size="sm">
              <Link href="/timetable">
                <CalendarDays /> View timetable
              </Link>
            </Button>
            <Button asChild variant="primary" size="sm">
              <a href={siteConfig.bookingPortalUrl} target="_blank" rel="noopener noreferrer">
                <Waves /> Book lessons
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-border text-deep-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <nav aria-label="Primary" className="hidden bg-western-red lg:block">
        <Container>
          <div className="flex items-center justify-center gap-1">
            {primaryNav.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white",
                    active && "text-white"
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-heritage-yellow" />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </Container>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3.5 text-base font-semibold text-deep-ink hover:bg-ice-blue hover:text-western-red"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/timetable">
                    <CalendarDays /> View timetable
                  </Link>
                </Button>
                <Button asChild variant="primary" size="lg" className="w-full">
                  <a href={siteConfig.bookingPortalUrl} target="_blank" rel="noopener noreferrer">
                    <Waves /> Book swimming lessons
                  </a>
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
