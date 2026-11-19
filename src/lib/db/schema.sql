-- Western Swimming Pool database schema.
-- Run with: npm run db:migrate

create extension if not exists pgcrypto;

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
  message text,

  is_private_lesson boolean not null default false,
  estimated_price_gbp numeric(6, 2),
  eligibility_confirmed boolean,

  -- Array of { name, dob, skillLevel, approxAgeMonths }
  children jsonb not null default '[]'::jsonb
);

create index if not exists lesson_enquiries_created_at_idx on lesson_enquiries (created_at desc);
create index if not exists lesson_enquiries_status_idx on lesson_enquiries (status);
