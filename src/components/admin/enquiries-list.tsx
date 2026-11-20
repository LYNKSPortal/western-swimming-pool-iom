import { Phone, Mail, Waves } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusSelect } from "@/components/admin/status-select";
import type { LessonEnquiryRecord } from "@/lib/db/types";

export function EnquiriesList({ enquiries }: { enquiries: LessonEnquiryRecord[] }) {
  if (enquiries.length === 0) {
    return (
      <Card className="p-10 text-center text-muted-foreground">
        No sign-ups yet, they&apos;ll show up here as soon as someone submits the form on the
        website.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {enquiries.map((enquiry) => (
        <Card key={enquiry.id} className="flex flex-col gap-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg font-bold text-deep-ink">{enquiry.parentName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(enquiry.createdAt).toLocaleString("en-GB")}
              </p>
            </div>
            <StatusSelect id={enquiry.id} status={enquiry.status} />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-deep-ink/80">
            <a
              href={`tel:${enquiry.parentPhone}`}
              className="flex items-center gap-1.5 hover:text-western-red"
            >
              <Phone className="size-4 text-pool-blue-dark" /> {enquiry.parentPhone}
            </a>
            <a
              href={`mailto:${enquiry.parentEmail}`}
              className="flex items-center gap-1.5 hover:text-western-red"
            >
              <Mail className="size-4 text-pool-blue-dark" /> {enquiry.parentEmail}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blue" className="gap-1">
              <Waves className="size-3" /> {enquiry.programmeName}
            </Badge>
            {enquiry.availability ? <Badge variant="outline">{enquiry.availability}</Badge> : null}
          </div>

          {enquiry.message ? (
            <p className="border-t border-border pt-4 text-sm text-deep-ink/80">
              &ldquo;{enquiry.message}&rdquo;
            </p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
