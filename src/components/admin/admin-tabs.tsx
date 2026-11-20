"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminTabs({
  timetableTab,
  signupsTab,
}: {
  timetableTab: ReactNode;
  signupsTab: ReactNode;
}) {
  return (
    <Tabs defaultValue="timetable">
      <TabsList>
        <TabsTrigger value="timetable">Timetable</TabsTrigger>
        <TabsTrigger value="signups">Website sign-ups</TabsTrigger>
      </TabsList>
      <TabsContent value="timetable">{timetableTab}</TabsContent>
      <TabsContent value="signups">{signupsTab}</TabsContent>
    </Tabs>
  );
}
