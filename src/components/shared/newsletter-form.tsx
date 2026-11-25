"use client";

import { useState, useTransition } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { titleOptions } from "@/lib/data/person";
import { submitNewsletterSignup } from "@/lib/actions/newsletter";

export function NewsletterForm() {
  const [form, setForm] = useState({
    title: titleOptions[0],
    firstName: "",
    lastName: "",
    preferredName: "",
    email: "",
  });
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ status: "success" | "error"; message: string } | null>(
    null
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await submitNewsletterSignup(form);
      if (response.status === "success") {
        setResult({ status: "success", message: response.message ?? "" });
      } else {
        setResult({
          status: "error",
          message: response.message ?? "Something went wrong, please try again.",
        });
      }
    });
  }

  if (result?.status === "success") {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-pool-blue/30 bg-pool-blue/10 p-4 text-sm text-white">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-pool-blue" />
        <p>{result.message}</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-[1fr_2fr] gap-2">
        <Select
          name="title"
          aria-label="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="border-white/15 bg-white/10 text-white"
        >
          {titleOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Input
          name="preferredName"
          placeholder="Preferred name"
          aria-label="Preferred name"
          value={form.preferredName}
          onChange={(e) => setForm((f) => ({ ...f, preferredName: e.target.value }))}
          className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          required
          name="firstName"
          placeholder="First name"
          aria-label="First name"
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
        />
        <Input
          required
          name="lastName"
          placeholder="Last name"
          aria-label="Last name"
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
        />
      </div>
      <Input
        required
        type="email"
        name="email"
        placeholder="Email address"
        aria-label="Email address"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
      />
      {result?.status === "error" ? (
        <div className="flex items-start gap-2 rounded-xl bg-western-red/10 p-3 text-xs text-white">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
          <p>{result.message}</p>
        </div>
      ) : null}
      <Button type="submit" variant="accent" size="md" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Sign up <ArrowRight />
          </>
        )}
      </Button>
    </form>
  );
}
