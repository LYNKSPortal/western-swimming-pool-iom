import Image from "next/image";
import {
  Ruler,
  Users,
  ShowerHead,
  Lock,
  Armchair,
  Car,
  Accessibility,
  LifeBuoy,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const facilities = [
  { icon: Ruler, label: "25m, six-lane Main Pool" },
  { icon: Users, label: "Family-friendly Leisure Pool" },
  { icon: ShowerHead, label: "Changing rooms & showers" },
  { icon: Lock, label: "Lockers for all visitors" },
  { icon: Armchair, label: "Poolside spectator seating" },
  { icon: Car, label: "Free on-site parking" },
  { icon: Accessibility, label: "Accessible changing & pool hoist" },
  { icon: LifeBuoy, label: "Flotation aids & assistance" },
];

export function FacilitiesIntro() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-lifted)] lg:order-1">
          <Image
            src="/images/pool-ceiling.jpg"
            alt="Wide angle view of Peel's main swimming pool showing the vaulted wooden ceiling and lanes"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <Reveal>
            <SectionHeading
              eyebrow="A happy space to spend time in"
              eyebrowVariant="yellow"
              title="Soaring ceilings, big windows and two beautiful pools"
              description="With soaring wooden ceilings and big windows that let the light flood in, our pool is a really happy space to spend time in. The Main Pool is 25 metres long and six lanes wide, giving plenty of scope to divide it for different groups and activities. The Leisure Pool is specially designed for families with young children and little ones starting out on their swimming journey."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-3">
              {facilities.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-ice-blue/60 px-4 py-3 text-sm font-semibold text-deep-ink"
                >
                  <Icon className="size-5 shrink-0 text-western-red" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
