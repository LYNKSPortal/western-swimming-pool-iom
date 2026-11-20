-- Western Swimming Pool database schema.
-- Run with: npm run db:migrate

create extension if not exists pgcrypto;

-- Simple "sign up / enquire" submissions from the public website. Actual
-- lesson bookings and ongoing customer management live in a third-party
-- system; this table only captures new interest coming through our site so
-- staff can follow up from the admin dashboard.
create table if not exists lesson_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'archived')),

  parent_name text not null,
  parent_phone text not null,
  parent_email text not null,

  programme_slug text not null,
  programme_name text not null,

  availability text,
  message text
);

-- Drop columns from the earlier, more complex version of this form
-- (children, DOB, skill level, private-lesson pricing) now that lesson
-- bookings are handled by the third-party system.
alter table lesson_enquiries drop column if exists is_private_lesson;
alter table lesson_enquiries drop column if exists estimated_price_gbp;
alter table lesson_enquiries drop column if exists eligibility_confirmed;
alter table lesson_enquiries drop column if exists children;

create index if not exists lesson_enquiries_created_at_idx on lesson_enquiries (created_at desc);
create index if not exists lesson_enquiries_status_idx on lesson_enquiries (status);

-- Public swimming timetable, editable from /admin. day_of_week: 0 = Monday
-- ... 6 = Sunday. start_time/end_time are "HH:MM" 24-hour strings.
create table if not exists timetable_sessions (
  id uuid primary key default gen_random_uuid(),
  pool text not null check (pool in ('Main Pool', 'Leisure Pool')),
  day_of_week smallint not null check (day_of_week between 0 and 6),
  label text not null default 'Public swim',
  start_time text not null,
  end_time text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists timetable_sessions_pool_day_idx on timetable_sessions (pool, day_of_week);
