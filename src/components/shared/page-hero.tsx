import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

type PageHeroProps = {
  eyebrow?: string;
  eyebrowVariant?: BadgeProps["variant"];
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  eyebrowVariant = "yellow",
  title,
  description,
  image,
  imageAlt,
  className,
  children,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-deep-ink", className)}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-ink via-deep-ink/70 to-deep-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-ink/80 via-transparent to-transparent" />
      </div>
      <Container className="relative flex min-h-[34vh] flex-col justify-end gap-5 py-16 sm:min-h-[40vh] sm:py-20">
        {eyebrow ? <Badge variant={eyebrowVariant} className="w-fit">{eyebrow}</Badge> : null}
        <h1 className="text-balance font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-balance text-base text-white/85 sm:text-lg">{description}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
