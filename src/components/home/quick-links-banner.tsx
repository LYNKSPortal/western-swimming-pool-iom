import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { quickLinks } from "@/lib/data/site";

export function QuickLinksBanner() {
  return (
    <section className="relative z-10 bg-deep-ink py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl sm:px-8 lg:px-10">
        <Reveal>
          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-0 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
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
      </div>
    </section>
  );
}
