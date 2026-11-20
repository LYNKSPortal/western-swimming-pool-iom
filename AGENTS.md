<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Western Swimming Pool — project notes

Rebuild of https://westernswimmingpool.im/ using Next.js 16 (App Router, Turbopack),
React 19, TypeScript, Tailwind CSS v4, shadcn-style UI primitives, lucide-react and
the `motion` animation library.

### Verification commands

- `npm run dev` — local dev server
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npx tsc --noEmit` — strict TypeScript check
- `npm run build` — production build (Turbopack); all routes currently prerender as
  static content (`○`) except the dynamic lesson programme pages, which use
  `generateStaticParams` (`●`).

### Content & data

Most editorial content (prices, lesson programmes, café menu, activities,
history, success stories, legal text) lives in strongly-typed modules under
`src/lib/data/`. The **public swimming timetable is the one exception**: it's
now database-backed and editable from `/admin` (see below), not static data.

- Real facility photography (not AI-generated) was downloaded from the existing
  WordPress media library and lives in `public/images/`.

### Architecture pivot: third-party system handles bookings

Per a later client decision, **a third-party system (the existing
`westernpool.courseprogress.co.uk` booking portal) now handles all swimming
lesson bookings and ongoing customer management** — this app does not try to
replace it. Concretely:

- `siteConfig.bookingPortalUrl` (`src/lib/data/site.ts`) points to
  `https://westernpool.courseprogress.co.uk/onlinejoining/home`. It's linked
  from the Swimming Lessons page hero ("Book online") and the register page
  ("Ready to book now?" card).
- The website still keeps its own lightweight **sign-up form**
  (`/swimming-lessons/register`) for brand-new interest coming through the
  site — name, phone, email, programme, availability, message. No child DOB,
  skill level, eligibility checklist or price calculator (that more complex
  version was built and then deliberately removed/simplified). Submissions go
  to our own Postgres database so staff can see them in `/admin` and follow
  up; they do **not** go to the third-party system.
- The admin dashboard's job is narrower than it first was: **adjusting the
  live public timetable**, plus viewing those website sign-ups. It is not a
  general lesson-booking/CRM tool — that's the third-party system's job.

### Database (Neon Postgres)

The site is backed by a dedicated Neon project (`western-swimming-pool`,
`aws-eu-central-1`), linked via `.neon` (git-ignored). `.env.local` (also
git-ignored) holds `DATABASE_URL` / `DATABASE_URL_UNPOOLED`, pulled with
`neon env pull` — re-run `neon link` / `neon env pull` if they go missing.

- `src/lib/db/schema.sql` — schema: `lesson_enquiries` (simple website
  sign-ups) and `timetable_sessions` (the live public timetable, admin-
  editable). Apply changes with `npm run db:migrate`
  (`scripts/migrate.mjs`, idempotent `create table if not exists` /
  `alter table ... drop column if exists`, uses the unpooled connection for
  DDL).
- `npm run db:seed-timetable` (`scripts/seed-timetable.mjs`) is a one-time
  seed that populated `timetable_sessions` from the previously-static
  timetable data. Safe to re-run (it clears and re-inserts every row) but
  shouldn't normally need to be, since the admin editor is now the source of
  truth.
- `src/lib/db/client.ts` — `server-only` tagged-template `sql` client
  (`@neondatabase/serverless`, pooled connection). Never import it from a
  Client Component.
- `src/lib/db/lesson-enquiries.ts` — insert/list/update-status queries for
  website sign-ups. `src/lib/db/timetable.ts` — list/create/update/delete
  queries for timetable sessions. `src/lib/db/types.ts` has the shared
  enquiry row type; `src/lib/data/timetable.ts` has the shared
  `PoolName`/`Weekday`/`TimetableSession` types used by both the DB layer and
  client components.

### Forms & sensitive data

- The **sign-up form** (`/swimming-lessons/register`) submits to a Server
  Action (`src/lib/actions/lesson-enquiry.ts` → `submitLessonEnquiry`) that
  validates input and inserts a row into `lesson_enquiries`. It deliberately
  does **not** collect a child's date of birth, skill level, or medical
  information online — mention anything relevant in the free-text message
  field instead, staff follow up by phone.
- The **contact form** and **newsletter form** are unchanged: they still build
  a `mailto:` link / show an honest "not connected yet" message respectively,
  rather than silently pretending to submit to a server.

### Public timetable is now live/DB-backed, not static

`/timetable`, the homepage "Next public swim sessions" section, and the admin
editor all read from `timetable_sessions` via `src/lib/db/timetable.ts`
(`listTimetableSessions`). Both `/` and `/timetable` are `force-dynamic` so
admin edits show up immediately, no redeploy needed.

- `src/lib/timetable-utils.ts` (`getUpcomingSessions`, `formatTime`) is now a
  pure function that takes a flat `TimetableSession[]` as a parameter instead
  of importing static data, so both the DB-backed server fetch and any future
  data source can use it.
- `src/components/timetable/timetable-interactive.tsx` and
  `src/components/home/upcoming-sessions.tsx` (both Client Components) now
  receive `sessions` as a prop from their parent Server Component rather than
  importing data directly, since they can't query the database themselves.

### Staff admin dashboard (`/admin`)

Two tabs:

- **Timetable** (`src/components/admin/timetable-editor.tsx`) — the primary
  purpose of the dashboard now. Add/edit/delete public swim sessions per
  pool/day; changes write straight to `timetable_sessions` and
  `revalidatePath` the public pages immediately. Server actions in
  `src/lib/actions/admin-timetable.ts`.
- **Website sign-ups** (`src/components/admin/enquiries-list.tsx`) — the
  simple lesson sign-up submissions described above, with a status dropdown
  (new/contacted/booked/archived).

Auth (unchanged from before):

- `/admin/login` — password form (`ADMIN_PASSWORD` env var, compared
  server-side only). Signed, stateless session cookie (JWT via `jose`,
  `HS256`, `SESSION_SECRET` env var, 12h expiry) — see
  `src/lib/auth/session.ts`, `src/lib/actions/admin-auth.ts`
  (`loginAdmin`/`logoutAdmin`).
- `src/proxy.ts` does an **optimistic** redirect to `/admin/login` when the
  session cookie is absent (matcher: `/admin/:path*`). The real check lives in
  the Data Access Layer, `src/lib/auth/dal.ts` (`verifySession` /
  `requireAdminSession`), called from every protected page/action — per
  Next.js's own guidance that Proxy/Middleware should never be the only line
  of defense.
- `src/components/layout/site-chrome.tsx` hides the public header/footer/
  announcement bar on `/admin/*` routes (checked client-side via `usePathname`,
  since the public chrome lives in the shared root layout).
- `/admin` is disallowed in `robots.ts` and omitted from `sitemap.ts`.
- This is intentionally a single shared-password tool, good enough for one or
  two staff members. If multiple named accounts, password reset, or an audit
  log are ever needed, replace it with Neon Auth (Managed Better Auth) via the
  `neon-auth` skill rather than extending this by hand.
- Required env vars (see `.env.example`): `ADMIN_PASSWORD`, `SESSION_SECRET`.

### Design system

Brand tokens (Western Red, Heritage Yellow, Pool Blue, Deep Ink, Ice Blue, Ship
Brown, Castle Grey, Landscape Green) are defined as CSS variables in
`src/app/globals.css` via Tailwind v4's `@theme`. Headings use Plus Jakarta Sans,
body text uses Inter (both via `next/font/google`).
