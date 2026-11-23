"use client";

import { useState, useTransition } from "react";
import {
  ShieldCheck,
  Clock,
  Waves,
  Loader2,
  PartyPopper,
  Phone,
  AlertCircle,
  Send,
  Plus,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { lessonProgrammes } from "@/lib/data/lessons";
import { siteConfig } from "@/lib/data/site";
import { skillLevelOptions } from "@/lib/data/skill-levels";
import { submitLessonEnquiry, type ChildInput } from "@/lib/actions/lesson-enquiry";

function emptyChild(): ChildInput {
  return { name: "", age: "", skillLevel: skillLevelOptions[0].value };
}

export function LessonEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    programme: lessonProgrammes[0]?.slug ?? "",
    availability: "",
    message: "",
  });
  const [children, setChildren] = useState<ChildInput[]>([emptyChild()]);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ status: "success" | "error"; message: string } | null>(
    null
  );

  const programme = lessonProgrammes.find((l) => l.slug === form.programme);

  function updateChild(index: number, patch: Partial<ChildInput>) {
    setChildren((prev) => prev.map((child, i) => (i === index ? { ...child, ...patch } : child)));
  }

  function addChild() {
    setChildren((prev) => [...prev, emptyChild()]);
  }

  function removeChild(index: number) {
    setChildren((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    const payload = {
      parentName: form.name,
      parentPhone: form.phone,
      parentEmail: form.email,
      programmeSlug: form.programme,
      availability: form.availability,
      message: form.message,
      children,
    };

    startTransition(async () => {
      const response = await submitLessonEnquiry(payload);
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
      <Card className="flex flex-col items-center gap-4 p-10 text-center">
        <PartyPopper className="size-10 text-western-red" />
        <h2 className="font-display text-2xl font-bold text-deep-ink">Thanks for signing up!</h2>
        <p className="max-w-md text-sm text-muted-foreground">{result.message}</p>
        <p className="text-sm text-muted-foreground">
          Our team will be in touch soon. In a hurry? Call us on{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-western-red">
            {siteConfig.phone}
          </a>
          .
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-start gap-3 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-pool-blue-dark" />
        <p>
          This short form lets our team know you&apos;re interested, we&apos;ll call you back to
          talk through availability and get you booked in. We don&apos;t collect medical
          information online; mention anything relevant in your message and we&apos;ll discuss it
          by phone.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Your full name</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Contact number</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Your email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="programme">Programme of interest</Label>
          <Select
            id="programme"
            value={form.programme}
            onChange={(e) => setForm((f) => ({ ...f, programme: e.target.value }))}
          >
            {lessonProgrammes.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </Select>
        </div>

        {programme ? (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-ice-blue/40 p-4">
            <Badge variant="blue">{programme.ageRange}</Badge>
            <Badge variant="outline" className="gap-1">
              <Waves className="size-3" /> {programme.pool}
            </Badge>
            {programme.schedule ? (
              <Badge variant="yellow" className="gap-1">
                <Clock className="size-3" /> {programme.schedule}
              </Badge>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Child&apos;s details</Label>
            <Button type="button" size="sm" variant="outline" onClick={addChild}>
              <Plus className="size-3.5" /> Add another child
            </Button>
          </div>
          {children.map((child, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl border border-border bg-ice-blue/30 p-4 sm:grid-cols-[1.4fr_0.8fr_1fr_auto]"
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`child-name-${index}`} className="text-xs">
                  Name
                </Label>
                <Input
                  id={`child-name-${index}`}
                  required
                  value={child.name}
                  onChange={(e) => updateChild(index, { name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`child-age-${index}`} className="text-xs">
                  Age
                </Label>
                <Input
                  id={`child-age-${index}`}
                  inputMode="numeric"
                  placeholder="e.g. 7"
                  value={child.age}
                  onChange={(e) => updateChild(index, { age: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`child-skill-${index}`} className="text-xs">
                  Swimming ability
                </Label>
                <Select
                  id={`child-skill-${index}`}
                  value={child.skillLevel}
                  onChange={(e) => updateChild(index, { skillLevel: e.target.value })}
                >
                  {skillLevelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex items-end justify-end">
                {children.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeChild(index)}
                    aria-label="Remove child"
                    className="flex size-9 items-center justify-center rounded-full text-deep-ink/50 hover:bg-white hover:text-western-red"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="availability">Preferred days / times</Label>
          <Input
            id="availability"
            placeholder="e.g. weekday evenings, Saturday mornings"
            value={form.availability}
            onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Anything else we should know?</Label>
          <Textarea
            id="message"
            placeholder="E.g. number of children, swimming experience, access or medical needs"
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
              <Send /> Sign up
            </>
          )}
        </Button>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="size-3.5" /> Prefer to talk it through first? Call us on{" "}
          {siteConfig.phone}.
        </p>
      </form>
    </Card>
  );
}
