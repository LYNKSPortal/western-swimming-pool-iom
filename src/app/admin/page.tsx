import type { Metadata } from "next";
import Image from "next/image";
import { Cake, Phone, Mail, Waves, Calculator } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/dal";
import { listLessonEnquiries } from "@/lib/db/lesson-enquiries";
import { skillLevelOptions } from "@/lib/data/skill-levels";
import { formatAge } from "@/lib/age-utils";
import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusSelect } from "@/components/admin/status-select";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = {
  title: "Admin · Lesson Enquiries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function skillLabel(value: string) {
  return skillLevelOptions.find((o) => o.value === value)?.label ?? value;
}

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const enquiries = await listLessonEnquiries();

  return (
    <div className="min-h-screen bg-ice-blue/30">
      <header className="border-b border-border bg-white">
        <Container className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Western Swimming Pool logo" width={40} height={40} />
            <div>
              <h1 className="font-display text-lg font-bold text-deep-ink">Lesson enquiries</h1>
              <p className="text-xs text-muted-foreground">
                {enquiries.length} total · newest first
              </p>
            </div>
          </div>
          <LogoutButton />
        </Container>
      </header>

      <Container className="flex flex-col gap-5 py-10">
        {enquiries.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">
            No enquiries yet, they&apos;ll show up here as soon as someone submits the lesson
            sign-up form.
          </Card>
        ) : (
          enquiries.map((enquiry) => (
            <Card key={enquiry.id} className="flex flex-col gap-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold text-deep-ink">
                    {enquiry.parentName}
                  </p>
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
                {enquiry.availability ? (
                  <Badge variant="outline">{enquiry.availability}</Badge>
                ) : null}
                {enquiry.isPrivateLesson && enquiry.estimatedPriceGbp !== null ? (
                  <Badge variant="yellow" className="gap-1">
                    <Calculator className="size-3" /> £{enquiry.estimatedPriceGbp.toFixed(2)}
                  </Badge>
                ) : null}
                {enquiry.eligibilityConfirmed === false ? (
                  <Badge variant="red">Eligibility not fully confirmed</Badge>
                ) : null}
              </div>

              <div className="grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
                {enquiry.children.map((child, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 rounded-xl bg-ice-blue/50 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-deep-ink">
                      {child.name || `Child ${i + 1}`}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Cake className="size-3.5" /> {child.dob}
                      {child.approxAgeMonths !== null
                        ? ` (approx. ${formatAge(child.approxAgeMonths)})`
                        : ""}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {skillLabel(child.skillLevel)}
                    </span>
                  </div>
                ))}
              </div>

              {enquiry.message ? (
                <p className="border-t border-border pt-4 text-sm text-deep-ink/80">
                  &ldquo;{enquiry.message}&rdquo;
                </p>
              ) : null}
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}
