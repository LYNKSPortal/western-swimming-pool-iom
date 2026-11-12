"use client";

import { useMemo, useState } from "react";
import {
  Mail,
  Send,
  ShieldCheck,
  Clock,
  Waves,
  CheckCircle2,
  Circle,
  Calculator,
  Cake,
  AlertCircle,
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
import { skillLevelOptions, type SkillLevel } from "@/lib/data/skill-levels";
import { siteConfig } from "@/lib/data/site";
import { ageInMonths, formatAge } from "@/lib/age-utils";

const PRIVATE_LESSON_SLUG = "private-lessons";
const PRIVATE_LESSON_BASE_PRICE = 28;
const PRIVATE_LESSON_EXTRA_CHILD_PRICE = 5;
const PRIVATE_LESSON_MAX_CHILDREN = 3;
const MAX_CHILD_ROWS = 6;

function calculatePrivateLessonPrice(childCount: number) {
  const extraChildren = Math.max(0, Math.min(childCount, PRIVATE_LESSON_MAX_CHILDREN) - 1);
  return PRIVATE_LESSON_BASE_PRICE + extraChildren * PRIVATE_LESSON_EXTRA_CHILD_PRICE;
}

type ChildDetails = {
  name: string;
  dob: string;
  skillLevel: SkillLevel;
};

function emptyChild(): ChildDetails {
  return { name: "", dob: "", skillLevel: "not-sure" };
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
  const [children, setChildren] = useState<ChildDetails[]>([emptyChild()]);
  const [confirmedPrerequisites, setConfirmedPrerequisites] = useState<Record<string, boolean>>({});

  const programme = lessonProgrammes.find((l) => l.slug === form.programme);
  const isPrivateLessons = form.programme === PRIVATE_LESSON_SLUG;

  const privateLessonPrice = useMemo(
    () => calculatePrivateLessonPrice(children.length),
    [children.length]
  );

  const prerequisites = programme?.prerequisites ?? [];
  const allPrerequisitesConfirmed =
    prerequisites.length === 0 || prerequisites.every((req) => confirmedPrerequisites[req]);

  function toggleProgramme(slug: string) {
    setForm((f) => ({ ...f, programme: slug }));
    setConfirmedPrerequisites({});
  }

  function togglePrerequisite(req: string) {
    setConfirmedPrerequisites((prev) => ({ ...prev, [req]: !prev[req] }));
  }

  function addChild() {
    setChildren((prev) => (prev.length < MAX_CHILD_ROWS ? [...prev, emptyChild()] : prev));
  }

  function removeChild(index: number) {
    setChildren((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }

  function updateChild(index: number, patch: Partial<ChildDetails>) {
    setChildren((prev) => prev.map((child, i) => (i === index ? { ...child, ...patch } : child)));
  }

  function ageFeedback(dob: string) {
    if (!programme || !dob) return null;
    const months = ageInMonths(dob);
    if (months === null) return null;

    const { minAgeMonths, maxAgeMonths } = programme;
    if (minAgeMonths === undefined && maxAgeMonths === undefined) {
      return { months, withinRange: null as boolean | null };
    }
    const withinRange =
      (minAgeMonths === undefined || months >= minAgeMonths) &&
      (maxAgeMonths === undefined || months <= maxAgeMonths);
    return { months, withinRange };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Swimming lesson enquiry: ${programme?.name ?? "General"}`;
    const bodyLines = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Programme of interest: ${programme?.name ?? ""}`,
      "",
      "Children:",
      ...children.map((child, i) => {
        const months = child.dob ? ageInMonths(child.dob) : null;
        const skill = skillLevelOptions.find((s) => s.value === child.skillLevel)?.label ?? "";
        return `  ${i + 1}. ${child.name || "(name not given)"} — DOB: ${
          child.dob || "not given"
        }${months !== null ? ` (approx. ${formatAge(months)} old)` : ""} — Skill level: ${skill}`;
      }),
    ];

    if (isPrivateLessons) {
      bodyLines.push(
        "",
        `Estimated private lesson price: £${privateLessonPrice.toFixed(2)} (30 min session, ${
          children.length
        } ${children.length === 1 ? "child" : "children"})`
      );
    }

    if (prerequisites.length > 0) {
      bodyLines.push(
        "",
        `Eligibility confirmed: ${allPrerequisitesConfirmed ? "Yes" : "Not fully confirmed — please discuss"}`
      );
    }

    bodyLines.push("", `Preferred days/times: ${form.availability}`, "", form.message);

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  }

  return (
    <Card className="flex flex-col gap-8 p-6 sm:p-9">
      <div className="flex items-start gap-3 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-pool-blue-dark" />
        <p>
          We ask for each child&apos;s date of birth and approximate skill level so we can suggest
          the right programme. We don&apos;t collect medical information online — mention anything
          relevant in your message and we&apos;ll discuss it by phone. Sending this opens your email
          app with everything pre-filled; nothing goes anywhere until you press send.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Your details */}
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-deep-ink/60">
            Your details
          </h2>
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
        </div>

        {/* Programme */}
        <div className="flex flex-col gap-5 border-t border-border pt-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-deep-ink/60">
            Programme
          </h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="programme">Programme of interest</Label>
            <Select
              id="programme"
              value={form.programme}
              onChange={(e) => toggleProgramme(e.target.value)}
            >
              {lessonProgrammes.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.name}
                </option>
              ))}
            </Select>
          </div>

          {programme ? (
            <div className="flex flex-col gap-3 rounded-2xl bg-ice-blue/40 p-5">
              <div className="flex flex-wrap items-center gap-2">
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

              {prerequisites.length > 0 ? (
                <div className="flex flex-col gap-2 pt-1">
                  <p className="text-xs font-semibold text-deep-ink/60">
                    Check your swimmer meets these before applying
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {prerequisites.map((req) => {
                      const checked = !!confirmedPrerequisites[req];
                      return (
                        <li key={req}>
                          <button
                            type="button"
                            onClick={() => togglePrerequisite(req)}
                            aria-pressed={checked}
                            className="flex w-full items-center gap-2 rounded-lg bg-white px-3 py-2 text-left text-sm font-medium text-deep-ink shadow-sm transition-colors hover:bg-pool-blue/10"
                          >
                            {checked ? (
                              <CheckCircle2 className="size-4 shrink-0 text-landscape-green" />
                            ) : (
                              <Circle className="size-4 shrink-0 text-muted-foreground" />
                            )}
                            {req}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Children */}
        <div className="flex flex-col gap-5 border-t border-border pt-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-deep-ink/60">
            Children
          </h2>

          <div className="flex flex-col gap-6">
            {children.map((child, index) => {
              const feedback = ageFeedback(child.dob);
              return (
                <div key={index} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-deep-ink">Child {index + 1}</p>
                    {children.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-western-red"
                      >
                        <X className="size-3.5" /> Remove
                      </button>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`child-name-${index}`}>Child&apos;s name (optional)</Label>
                      <Input
                        id={`child-name-${index}`}
                        value={child.name}
                        onChange={(e) => updateChild(index, { name: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`child-dob-${index}`}>
                        <span className="flex items-center gap-1.5">
                          <Cake className="size-3.5 text-pool-blue-dark" /> Date of birth
                        </span>
                      </Label>
                      <Input
                        id={`child-dob-${index}`}
                        type="date"
                        required
                        max={new Date().toISOString().split("T")[0]}
                        value={child.dob}
                        onChange={(e) => updateChild(index, { dob: e.target.value })}
                      />
                      {feedback ? (
                        <p className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                          Approx. age: {formatAge(feedback.months)}
                          {feedback.withinRange === true ? (
                            <span className="flex items-center gap-1 font-semibold text-landscape-green">
                              <CheckCircle2 className="size-3.5" /> within typical range
                            </span>
                          ) : feedback.withinRange === false ? (
                            <span className="flex items-center gap-1 font-semibold text-western-red">
                              <AlertCircle className="size-3.5" /> outside typical range — we&apos;ll help
                              find the right fit
                            </span>
                          ) : null}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor={`child-skill-${index}`}>Skill level (self-assessed)</Label>
                      <Select
                        id={`child-skill-${index}`}
                        value={child.skillLevel}
                        onChange={(e) =>
                          updateChild(index, { skillLevel: e.target.value as SkillLevel })
                        }
                      >
                        {skillLevelOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {index < children.length - 1 ? <div className="border-t border-border" /> : null}
                </div>
              );
            })}
          </div>

          {children.length < MAX_CHILD_ROWS ? (
            <Button type="button" variant="outline" size="sm" className="w-fit" onClick={addChild}>
              <Plus /> Add another child
            </Button>
          ) : (
            <p className="flex items-start gap-2 rounded-lg bg-heritage-yellow/15 p-3 text-xs text-deep-ink">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-western-red" /> For larger groups,
              please call us on {siteConfig.phone} so we can talk it through directly.
            </p>
          )}
        </div>

        {/* Scheduling & notes */}
        <div className="flex flex-col gap-5 border-t border-border pt-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-deep-ink/60">
            Scheduling &amp; notes
          </h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="availability">Preferred days / times</Label>
            <Input
              id="availability"
              placeholder="e.g. weekday evenings, Saturday mornings"
              value={form.availability}
              onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
            />
          </div>

          {isPrivateLessons ? (
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-western-red/5 p-5">
              <div className="flex items-start gap-2">
                <Calculator className="mt-0.5 size-5 shrink-0 text-western-red" />
                <div>
                  <p className="text-sm font-semibold text-deep-ink">Estimated price</p>
                  <p className="text-xs text-muted-foreground">
                    £28 for one child, 30-minute session; +£5 per additional child, up to{" "}
                    {PRIVATE_LESSON_MAX_CHILDREN}.
                  </p>
                </div>
              </div>
              <span className="font-display text-2xl font-extrabold text-western-red">
                £{privateLessonPrice.toFixed(2)}
              </span>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Anything else we should know?</Label>
            <Textarea
              id="message"
              placeholder="E.g. swimming experience, group or private lessons, access or medical needs"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
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
