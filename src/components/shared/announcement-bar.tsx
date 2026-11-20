import Link from "next/link";
import { Megaphone } from "lucide-react";
import { Container } from "./container";

export function AnnouncementBar() {
  return (
    <div className="bg-deep-ink py-2 text-xs font-medium text-white sm:text-sm">
      <Container className="text-center">
        <Megaphone
          className="mr-1.5 inline-block size-3.5 -translate-y-px align-middle text-heritage-yellow"
          aria-hidden
        />
        We&apos;re closed on bank holidays, always check our{" "}
        <Link href="/timetable" className="font-semibold underline underline-offset-2 hover:text-pool-blue">
          latest timetable
        </Link>{" "}
        and social media for changes.
      </Container>
    </div>
  );
}
