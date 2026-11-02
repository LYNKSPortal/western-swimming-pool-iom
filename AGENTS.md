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

### Forms & sensitive data

Per project requirements, no backend/database is wired up yet. The contact form,
lesson enquiry form and newsletter signup are intentionally honest about this:

- Contact & lesson enquiry forms build a `mailto:` link (opens the visitor's email
  client) rather than silently pretending to submit to a server.
- The lesson enquiry form deliberately does **not** collect a child's date of birth
  or medical information online — those are sensitive and must wait for an approved,
  secure backend, privacy notice and retention policy. Visitors are directed to call
  or use the existing booking portal (https://westernpool.courseprogress.co.uk/)
  instead.
- The newsletter form shows an honest "not connected yet" message rather than a fake
  success state.

### Design system

Brand tokens (Western Red, Heritage Yellow, Pool Blue, Deep Ink, Ice Blue, Ship
Brown, Castle Grey, Landscape Green) are defined as CSS variables in
`src/app/globals.css` via Tailwind v4's `@theme`. Headings use Plus Jakarta Sans,
body text uses Inter (both via `next/font/google`).
