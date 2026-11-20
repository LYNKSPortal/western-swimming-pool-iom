import type { Metadata } from "next";
import Image from "next/image";
import { requireAdminSession } from "@/lib/auth/dal";
import { listLessonEnquiries } from "@/lib/db/lesson-enquiries";
import { listTimetableSessions } from "@/lib/db/timetable";
import { Container } from "@/components/shared/container";
import { LogoutButton } from "@/components/admin/logout-button";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { TimetableEditor } from "@/components/admin/timetable-editor";
import { EnquiriesList } from "@/components/admin/enquiries-list";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const [enquiries, timetableSessions] = await Promise.all([
    listLessonEnquiries(),
    listTimetableSessions(),
  ]);

  return (
    <div className="min-h-screen bg-ice-blue/30">
      <header className="border-b border-border bg-white">
        <Container className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Western Swimming Pool logo" width={40} height={40} />
            <div>
              <h1 className="font-display text-lg font-bold text-deep-ink">Staff dashboard</h1>
              <p className="text-xs text-muted-foreground">
                {timetableSessions.length} timetable sessions &middot; {enquiries.length} website{" "}
                {enquiries.length === 1 ? "sign-up" : "sign-ups"}
              </p>
            </div>
          </div>
          <LogoutButton />
        </Container>
      </header>

      <Container className="flex flex-col gap-6 py-10">
        <AdminTabs
          timetableTab={<TimetableEditor sessions={timetableSessions} />}
          signupsTab={<EnquiriesList enquiries={enquiries} />}
        />
      </Container>
    </div>
  );
}
