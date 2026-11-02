import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-deep-ink shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-pool-blue disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
