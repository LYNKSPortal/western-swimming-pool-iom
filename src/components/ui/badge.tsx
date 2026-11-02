import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        red: "bg-western-red/10 text-western-red",
        yellow: "bg-heritage-yellow/30 text-deep-ink",
        blue: "bg-pool-blue/15 text-pool-blue-dark",
        green: "bg-landscape-green/15 text-landscape-green",
        ink: "bg-deep-ink text-white",
        outline: "border border-deep-ink/15 text-deep-ink",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
