import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/shared/container";
import { footerNav, siteConfig } from "@/lib/data/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.46C16.2 4.4 15.3 4.3 14.26 4.3c-2.17 0-3.66 1.33-3.66 3.76v2.38H8.04v2.96h2.56V21h2.9Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-deep-ink text-white/80">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Western Swimming Pool home">
            <Image
              src="/images/logo.png"
              alt="Western Swimming Pool logo"
              width={56}
              height={56}
              className="size-12"
            />
            <span className="font-display text-lg font-extrabold text-white">
              Western Swimming Pool
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            {siteConfig.tagline}. Serving Peel and the west of the Isle of Man since 2003.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="https://maps.google.com/?q=Western+Swimming+Pool+Derby+Road+Peel+Isle+of+Man" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-white">
              <MapPin className="mt-0.5 size-4 shrink-0 text-pool-blue" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.town}
                <br />
                {siteConfig.address.region} {siteConfig.address.postcode}
              </span>
            </a>
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-4 text-pool-blue" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4 text-pool-blue" /> {siteConfig.email}
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <FacebookIcon className="size-4 text-pool-blue" /> Facebook
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                {group.heading}
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Western Swimming Pool. All rights reserved.</p>
          <p>Derby Road, Peel, Isle of Man, IM5 1SW</p>
        </Container>
      </div>
    </footer>
  );
}
