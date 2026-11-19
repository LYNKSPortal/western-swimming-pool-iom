"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { setLessonEnquiryStatus } from "@/lib/actions/admin-lesson-enquiries";
import type { LessonEnquiryRecord } from "@/lib/db/types";
import { cn } from "@/lib/utils";

const statusOptions: LessonEnquiryRecord["status"][] = [
  "new",
  "contacted",
  "booked",
  "archived",
];

const statusStyles: Record<LessonEnquiryRecord["status"], string> = {
  new: "bg-western-red/10 text-western-red",
  contacted: "bg-heritage-yellow/25 text-deep-ink",
  booked: "bg-landscape-green/15 text-landscape-green",
  archived: "bg-castle-grey/20 text-deep-ink/60",
};

export function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: LessonEnquiryRecord["status"];
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative">
      <select
        value={status}
        disabled={isPending}
        onChange={(e) =>
          startTransition(() => {
            void setLessonEnquiryStatus(id, e.target.value as LessonEnquiryRecord["status"]);
          })
        }
        className={cn(
          "rounded-full border-0 py-1 pl-3 pr-7 text-xs font-bold capitalize focus-visible:outline-none",
          statusStyles[status]
        )}
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {isPending ? (
        <Loader2 className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2 animate-spin" />
      ) : null}
    </div>
  );
}
