"use client";

import { useState } from "react";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { lessonProgrammes } from "@/lib/data/lessons";
import { siteConfig } from "@/lib/data/site";

export function LessonEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    programme: lessonProgrammes[0]?.slug ?? "",
    availability: "",
    message: "",
  });

  const programme = lessonProgrammes.find((l) => l.slug === form.programme);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Swimming lesson enquiry: ${programme?.name ?? "General"}`;
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Programme of interest: ${programme?.name ?? ""}`,
      `Preferred days/times: ${form.availability}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Card className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-start gap-3 rounded-xl bg-pool-blue/10 p-4 text-sm text-deep-ink/80">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-pool-blue-dark" />
        <p>
          To protect children&apos;s privacy, we don&apos;t collect dates of birth or medical
          information through this website yet. This short enquiry opens your email app with the
          details pre-filled — our team will follow up by phone to complete registration securely,
          or you can register directly via our{" "}
          <a
            href={siteConfig.bookingPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-western-red underline"
          >
            online booking portal
          </a>
          .
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
            placeholder="E.g. number of children, swimming experience, group or private lessons"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
        </div>

        <Button type="submit" size="lg">
          <Send /> Send enquiry by email
        </Button>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="size-3.5" /> This opens your email app with the details filled in —
          nothing is sent until you press send.
        </p>
      </form>
    </Card>
  );
}
