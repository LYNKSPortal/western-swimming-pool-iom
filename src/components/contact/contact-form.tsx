"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";
import { emptyPerson, type PersonDetails } from "@/lib/data/person";
import { PersonDetailsFields } from "@/components/shared/person-details-fields";
import { submitContactForm } from "@/lib/actions/contact";

const enquiryTypes = ["General enquiry", "Report a problem", "Private / party hire"];

export function ContactForm() {
  const [person, setPerson] = useState<PersonDetails>(emptyPerson());
  const [form, setForm] = useState({
    type: enquiryTypes[0],
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ status: "success" | "error"; message: string } | null>(
    null
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await submitContactForm({ person, ...form });
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
      <div className="flex items-start gap-2 rounded-xl border border-pool-blue/30 bg-pool-blue/10 p-4 text-sm text-deep-ink">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-pool-blue-dark" />
        <p>{result.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PersonDetailsFields
        value={person}
        onChange={(patch) => setPerson((p) => ({ ...p, ...patch }))}
        idPrefix="c"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="c-type">What&apos;s this about?</Label>
        <Select
          id="c-type"
          value={form.type}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
        >
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="c-message">Your message</Label>
        <Textarea
          id="c-message"
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      {result?.status === "error" ? (
        <div className="flex items-start gap-2 rounded-xl bg-western-red/10 p-4 text-sm text-western-red">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>
            {result.message} You can also call us on{" "}
            <a href={siteConfig.phoneHref} className="font-semibold underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send /> Send message
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        By filling out this form you agree to our{" "}
        <Link href="/terms-conditions" className="font-semibold text-western-red hover:underline">
          terms &amp; conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="font-semibold text-western-red hover:underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
