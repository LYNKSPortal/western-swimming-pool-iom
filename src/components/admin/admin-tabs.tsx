"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminTabs({
  scheduleTab,
  enquiriesTab,
}: {
  scheduleTab: ReactNode;
  enquiriesTab: ReactNode;
}) {
  return (
    <Tabs defaultValue="schedule">
      <TabsList>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="enquiries">Lesson enquiries</TabsTrigger>
      </TabsList>
      <TabsContent value="schedule">{scheduleTab}</TabsContent>
      <TabsContent value="enquiries">{enquiriesTab}</TabsContent>
    </Tabs>
  );
}
