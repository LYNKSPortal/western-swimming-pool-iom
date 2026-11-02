import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 ease-[var(--ease-swim)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-western-red text-white shadow-[var(--shadow-glow-red)] hover:bg-western-red-dark hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-deep-ink text-white hover:bg-deep-ink/90 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-deep-ink/15 bg-white/80 text-deep-ink backdrop-blur hover:border-pool-blue hover:bg-ice-blue hover:-translate-y-0.5",
        ghost: "text-deep-ink hover:bg-ice-blue",
        accent:
          "bg-heritage-yellow text-deep-ink hover:bg-heritage-yellow/90 hover:-translate-y-0.5 shadow-soft",
        link: "text-western-red underline-offset-4 hover:underline",
        "outline-light":
          "border-2 border-white/60 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
