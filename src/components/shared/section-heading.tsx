import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowVariant?: BadgeProps["variant"];
  title: string;
  description?: string;
  /**
   * "center-mobile" centers the heading on small screens and reverts to
   * left-aligned from the sm: breakpoint up.
   */
  align?: "left" | "center" | "center-mobile";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "blue",
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center" || align === "center-mobile";
  const mobileOnly = align === "center-mobile";

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        mobileOnly && "items-center text-center sm:items-start sm:text-left",
        className
      )}
    >
      {eyebrow ? (
        <Badge
          variant={eyebrowVariant}
          className={cn(
            "w-fit",
            mobileOnly
              ? "self-center sm:self-start"
              : centered
                ? "self-center"
                : "self-start"
          )}
        >
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="text-balance font-display text-3xl font-extrabold leading-tight text-deep-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
