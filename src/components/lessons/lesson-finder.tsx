"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  lessonProgrammes,
  type AgeGroupTag,
  type GoalTag,
} from "@/lib/data/lessons";

const ageGroupOptions: { value: AgeGroupTag | "any"; label: string }[] = [
  { value: "any", label: "Any age" },
  { value: "baby", label: "Baby (4 months+)" },
  { value: "preschool", label: "Pre-school" },
  { value: "junior", label: "Junior / school age" },
  { value: "teen", label: "Teen" },
  { value: "adult", label: "Adult" },
];

const goalOptions: { value: GoalTag | "any"; label: string }[] = [
  { value: "any", label: "Any goal" },
  { value: "learn-to-swim", label: "Learn to swim" },
  { value: "confidence", label: "Build water confidence" },
  { value: "technique", label: "Improve technique" },
  { value: "competitive", label: "Competitive swimming" },
  { value: "lifesaving", label: "Lifesaving skills" },
  { value: "fitness", label: "General fitness" },
  { value: "support-needs", label: "Additional support needs" },
  { value: "relaxation", label: "Relaxation (e.g. Aquanatal)" },
];

export function LessonFinder() {
  const [age, setAge] = useState<AgeGroupTag | "any">("any");
  const [goal, setGoal] = useState<GoalTag | "any">("any");

  const results = useMemo(() => {
    return lessonProgrammes
      .filter((lesson) => age === "any" || lesson.ageGroups.includes(age))
      .filter((lesson) => goal === "any" || lesson.goals.includes(goal))
      .sort((a, b) => a.order - b.order);
  }, [age, goal]);

  return (
    <Card className="flex flex-col gap-6 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-1 size-5 shrink-0 text-heritage-yellow" />
        <div>
          <h3 className="font-display text-xl font-bold text-deep-ink">Lesson finder</h3>
          <p className="text-sm text-muted-foreground">
            Tell us roughly who&apos;s swimming and what they want to get out of it, and we&apos;ll
            suggest programmes worth exploring. This is just a starting point, our teachers decide
            official stage placement in person.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-deep-ink">
          Age group
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as AgeGroupTag | "any")}
            className="h-12 rounded-xl border border-border bg-white px-4 text-sm font-medium text-deep-ink focus-visible:border-pool-blue"
          >
            {ageGroupOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-deep-ink">
          Main goal
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as GoalTag | "any")}
            className="h-12 rounded-xl border border-border bg-white px-4 text-sm font-medium text-deep-ink focus-visible:border-pool-blue"
          >
            {goalOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        {results.length > 0 ? (
          results.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/swimming-lessons/${lesson.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-ice-blue/40 px-5 py-4 transition-colors hover:border-pool-blue hover:bg-ice-blue"
            >
              <div>
                <p className="font-display font-bold text-deep-ink">{lesson.name}</p>
                <p className="text-xs text-muted-foreground">{lesson.ageRange}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-western-red transition-transform group-hover:translate-x-1" />
            </Link>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
            We couldn&apos;t find an exact match, give us a call on 01624 842525 and we&apos;ll help
            you find the right fit.
          </p>
        )}
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-pool-blue/10 p-4 text-xs text-deep-ink/80">
        <Info className="mt-0.5 size-4 shrink-0 text-pool-blue-dark" />
        <p>
          This tool suggests programmes to explore, it does not assess swimming ability or assign
          official Swim England stages. Our teachers confirm the right starting point in person.
        </p>
      </div>

      <Button asChild variant="primary" size="lg">
        <Link href="/swimming-lessons/register">
          Enquire about lessons <ArrowRight />
        </Link>
      </Button>
    </Card>
  );
}
