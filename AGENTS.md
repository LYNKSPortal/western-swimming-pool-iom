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

All editorial content (prices, lesson programmes, café menu, activities, timetable,
history, success stories, legal text) lives in strongly-typed modules under
`src/lib/data/`, so it can later be swapped for a CMS/staff dashboard without
touching components.

- `src/lib/data/timetable.ts` — public swim timetable, sourced directly from the
  live site's published weekly schedule, effective 2 Nov–22 Dec 2026. Re-verify and
  update after that date.
- Real facility photography (not AI-generated) was downloaded from the existing
  WordPress media library and lives in `public/images/`.

### Database (Neon Postgres)

The site is now backed by a dedicated Neon project (`western-swimming-pool`,
`aws-eu-central-1`), linked via `.neon` (git-ignored). `.env.local` (also
git-ignored) holds `DATABASE_URL` / `DATABASE_URL_UNPOOLED`, pulled with
`neon env pull` — re-run `neon link` / `neon env pull` if they go missing.

- `src/lib/db/schema.sql` — schema (currently just `lesson_enquiries`). Apply
  changes with `npm run db:migrate` (`scripts/migrate.mjs`, idempotent
  `create table if not exists`, uses the unpooled connection for DDL).
- `src/lib/db/client.ts` — `server-only` tagged-template `sql` client
  (`@neondatabase/serverless`, pooled connection). Never import it from a
  Client Component.
- `src/lib/db/lesson-enquiries.ts` — insert/list/update-status queries.
  `src/lib/db/types.ts` has the shared row types.

### Forms & sensitive data

- The **lesson enquiry form** (`/swimming-lessons/register`) now submits to a
  real Server Action (`src/lib/actions/lesson-enquiry.ts` →
  `submitLessonEnquiry`) that validates input and inserts a row into
  `lesson_enquiries` in Postgres, including each child's date of birth and
  self-assessed skill level (per client request — needed to route people to
  age-appropriate programmes, e.g. Adult & Child / Parent & Toddler). It still
  does **not** collect medical information online — mention anything relevant
  in the free-text message field instead; that remains sensitive and is
  deferred to a phone conversation.
- The **contact form** and **newsletter form** are unchanged: they still build
  a `mailto:` link / show an honest "not connected yet" message respectively,
  rather than silently pretending to submit to a server. Only the lesson
  enquiry form was asked to persist to the database.

### Staff admin dashboard (`/admin`)

A minimal, real (not mocked) admin area lists incoming lesson enquiries and
lets staff update their status (new/contacted/booked/archived):

- `/admin/login` — password form (`ADMIN_PASSWORD` env var, compared
  server-side only). `/admin` — the dashboard itself.
- Auth is a signed, stateless session cookie (JWT via `jose`, `HS256`,
  `SESSION_SECRET` env var, 12h expiry) — see `src/lib/auth/session.ts`,
  `src/lib/actions/admin-auth.ts` (`loginAdmin` / `logoutAdmin`).
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
- All "Book lessons" CTAs site-wide (header, homepage hero, swimming lessons pages)
  point to our own `/swimming-lessons/register` enquiry form. The external
  `westernpool.courseprogress.co.uk` portal is no longer referenced anywhere on the
  site, per client request — the internal form is now the only booking path until a
  secure backend replaces it.
- `src/components/lessons/lesson-enquiry-form.tsx` is a "smart" form driven by
  `src/lib/data/lessons.ts`: selecting a programme surfaces its real age range, pool,
  schedule and prerequisites (as a tappable checklist); each child row captures DOB
  (checked against the programme's `minAgeMonths`/`maxAgeMonths` guidance via
  `src/lib/age-utils.ts`, non-blocking) and skill level
  (`src/lib/data/skill-levels.ts`); selecting "Private Lessons" reveals a live price
  calculator (£28 for one child + £5 per extra child, up to 3) — all of it feeds into
  the emailed enquiry.

### Design system

Brand tokens (Western Red, Heritage Yellow, Pool Blue, Deep Ink, Ice Blue, Ship
Brown, Castle Grey, Landscape Green) are defined as CSS variables in
`src/app/globals.css` via Tailwind v4's `@theme`. Headings use Plus Jakarta Sans,
body text uses Inter (both via `next/font/google`).
