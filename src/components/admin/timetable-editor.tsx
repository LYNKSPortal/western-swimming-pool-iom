"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { weekdays, type PoolName, type Weekday } from "@/lib/data/timetable";
import { formatTime } from "@/lib/timetable-utils";
import type { TimetableSessionRecord } from "@/lib/db/timetable";
import {
  addTimetableSession,
  editTimetableSession,
  removeTimetableSession,
} from "@/lib/actions/admin-timetable";

const pools: PoolName[] = ["Main Pool", "Leisure Pool"];

function EditRow({
  session,
  onSaved,
  onCancel,
}: {
  session: TimetableSessionRecord;
  onSaved: (updated: TimetableSessionRecord) => void;
  onCancel: () => void;
}) {
  const [start, setStart] = useState(session.start);
  const [end, setEnd] = useState(session.end);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function save() {
    setError(null);
    startTransition(async () => {
      try {
        await editTimetableSession(session.id, { start, end });
        onSaved({ ...session, start, end });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not save this session.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="h-9 w-28"
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="h-9 w-28"
        />
        <Button type="button" size="sm" variant="primary" onClick={save} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : <Check />}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancel} disabled={isPending}>
          <X />
        </Button>
      </div>
      {error ? <p className="text-xs text-western-red">{error}</p> : null}
    </div>
  );
}

function AddSessionForm({
  pool,
  day,
  onAdded,
}: {
  pool: PoolName;
  day: Weekday;
  onAdded: (session: TimetableSessionRecord) => void;
}) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!open) {
    return (
      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus /> Add session
      </Button>
    );
  }

  function save() {
    setError(null);
    startTransition(async () => {
      try {
        const id = await addTimetableSession({ pool, day, start, end });
        onAdded({ id, pool, day, label: "Public swim", start, end, sortOrder: 0 });
        setOpen(false);
        setStart("09:00");
        setEnd("10:00");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not add this session.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="h-9 w-28"
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="h-9 w-28"
        />
        <Button type="button" size="sm" variant="primary" onClick={save} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : <Check />} Add
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setOpen(false)}>
          <X />
        </Button>
      </div>
      {error ? <p className="text-xs text-western-red">{error}</p> : null}
    </div>
  );
}

function DaySection({
  pool,
  day,
  sessions,
  onChange,
}: {
  pool: PoolName;
  day: Weekday;
  sessions: TimetableSessionRecord[];
  onChange: (next: TimetableSessionRecord[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    setDeletingId(id);
    startTransition(async () => {
      try {
        await removeTimetableSession(id);
        onChange(sessions.filter((s) => s.id !== id));
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-b-0">
      <p className="text-sm font-bold text-deep-ink">{day}</p>
      <div className="flex flex-col gap-2">
        {sessions.length === 0 ? (
          <p className="text-xs text-muted-foreground">No sessions</p>
        ) : (
          sessions.map((session) =>
            editingId === session.id ? (
              <EditRow
                key={session.id}
                session={session}
                onSaved={(updated) => {
                  onChange(sessions.map((s) => (s.id === updated.id ? updated : s)));
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={session.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-ice-blue/40 px-3 py-2 text-sm"
              >
                <span className="font-semibold text-deep-ink">
                  {formatTime(session.start)} &ndash; {formatTime(session.end)}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingId(session.id)}
                    className="flex size-7 items-center justify-center rounded-full text-deep-ink/60 hover:bg-white hover:text-pool-blue-dark"
                    aria-label="Edit session"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(session.id)}
                    disabled={deletingId === session.id}
                    className="flex size-7 items-center justify-center rounded-full text-deep-ink/60 hover:bg-white hover:text-western-red"
                    aria-label="Delete session"
                  >
                    {deletingId === session.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
      <AddSessionForm
        pool={pool}
        day={day}
        onAdded={(session) => onChange([...sessions, session])}
      />
    </div>
  );
}

export function TimetableEditor({ sessions: initial }: { sessions: TimetableSessionRecord[] }) {
  const [sessions, setSessions] = useState(initial);

  return (
    <Card className="p-6 sm:p-8">
      <p className="mb-6 text-sm text-muted-foreground">
        Add, edit or remove public swim sessions. Changes update the live timetable on the website
        immediately.
      </p>
      <Tabs defaultValue="Main Pool">
        <TabsList>
          {pools.map((pool) => (
            <TabsTrigger key={pool} value={pool}>
              {pool}
            </TabsTrigger>
          ))}
        </TabsList>
        {pools.map((pool) => (
          <TabsContent key={pool} value={pool}>
            <div className="flex flex-col">
              {weekdays.map((day) => (
                <DaySection
                  key={day}
                  pool={pool}
                  day={day}
                  sessions={sessions.filter((s) => s.pool === pool && s.day === day)}
                  onChange={(daySessions) =>
                    setSessions((prev) => [
                      ...prev.filter((s) => !(s.pool === pool && s.day === day)),
                      ...daySessions,
                    ])
                  }
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
