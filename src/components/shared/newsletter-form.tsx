"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-pool-blue/30 bg-pool-blue/10 p-4 text-sm text-white">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-pool-blue" />
        <p>
          Thanks for your interest! Our newsletter sign-up isn&apos;t connected yet — please check
          back soon, or follow us on Facebook for updates in the meantime.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <Input
          required
          name="firstName"
          placeholder="First name"
          aria-label="First name"
          className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
        />
        <Input
          required
          name="lastName"
          placeholder="Last name"
          aria-label="Last name"
          className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
        />
      </div>
      <Input
        required
        type="email"
        name="email"
        placeholder="Email address"
        aria-label="Email address"
        className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
      />
      <Button type="submit" variant="accent" size="md" className="w-full">
        Sign up <ArrowRight />
      </Button>
    </form>
  );
}
