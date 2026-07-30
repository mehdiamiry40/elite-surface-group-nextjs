# Elite Surface Group

The [elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/) website, built
with Next.js 16 (App Router) and React 19.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

There is no CMS. All copy, imagery and navigation live in two typed modules:

| File | Holds |
| --- | --- |
| `src/content/site.ts` | Business details, navigation, services, homepage sections, projects, testimonials, page metadata |
| `src/content/legal.ts` | Privacy policy and terms of service |

Change the text there and the change flows to every page that uses it. Phone
numbers in particular are defined **once** — `business.phone` (E.164, used for
every `tel:` href) and `business.phoneDisplay` (the human-readable form). Never
hand-write a `tel:` link; the smoke suite fails the build if you do.

Images live in `public/images/` as WebP. `next/image` handles resizing and
format negotiation, so add the largest version you have and let the optimiser
derive the rest.

## Project layout

```
src/app/            routes (one directory per page; [service] covers the four service pages)
src/app/api/contact route handler for enquiry submissions
src/components/     UI components and hooks
src/content/        all site copy
public/images/      WebP imagery
scripts/            env check and smoke suite
```

## Contact-form delivery

Enquiries are emailed through [Resend](https://resend.com). Copy
`.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — a sender on a domain verified with Resend
- `CONTACT_TO_EMAIL` — where enquiries should land

Set the same three in the Vercel project settings.

**Without them nothing is delivered.** The endpoint answers 503 and falls back
to opening the visitor's mail client, which silently loses the enquiry for
anyone without a configured mail app. `npm run prebuild` therefore fails a
production build when they are missing — override deliberately with
`ALLOW_UNCONFIGURED_CONTACT=1` if you really mean to.

## Checks

```bash
npm run typecheck   # tsc
npm run lint        # eslint
npm run build       # production build (runs the env check first)
npm run check       # all three

npm run start &     # smoke needs a live server
npm run smoke       # 175 checks
```

The smoke suite asserts what is easy to regress: every route returns 200, each
page has exactly one `<h1>`, a meta description and a canonical link, every
`tel:` link is the correct number, no page references `wp-content` or a
third-party font, every image declares `alt`, security headers are present,
images are immutably cached and served as `image/webp`, retired WordPress URLs
still redirect, no orphaned images ship, and the contact endpoint rejects bad
input without redirecting.

Point it at a deployment with `SMOKE_BASE_URL=https://… npm run smoke`.

## Migration notes

This replaced a WordPress/Elementor site. `docs/MIGRATION-AUDIT.md` records the
audit of the first migration pass and which findings this rebuild resolved.

Two things were deliberately left alone and still need a human decision:

- **The legal pages cite UK law** (Data Protection Act 1998; "the laws of
  England, Northern Ireland, Scotland and Wales") on an Australian business.
  Preserved verbatim — rewriting legal text is not a developer's call.
- **Social links point at Facebook and Instagram home pages**, not real
  profiles; that is what the WordPress site linked to.
