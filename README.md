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

**Without them nothing is delivered.** The endpoint answers 503 and gives the
visitor explicit call and email links without discarding the form contents.

`npm run prebuild` warns during local development and fails Vercel Production
builds when delivery is unconfigured. `REQUIRE_CONTACT_DELIVERY=1` applies the
same rule in another environment. `ALLOW_UNCONFIGURED_CONTACT=1` is an
emergency-only override.

## Checks

```bash
npm run typecheck   # tsc
npm run lint        # eslint
npm run build       # production build (runs the env check first)
npm run check       # all three

npm run start &     # smoke / a11y need a live server
npm run smoke       # route, SEO, header and contact checks
npm run a11y        # axe-core across routes and interactive UI states
```

The smoke suite asserts what is easy to regress: every route returns 200, each
page has exactly one `<h1>`, a meta description, canonical and Open Graph tags,
every `tel:` link is the correct number, no page references `wp-content` or a
third-party font, every image declares `alt`, security headers are present,
images are cached and served as `image/webp`, retired WordPress junk returns
404, no orphaned images ship, and both JavaScript and progressive form paths
reject bad input safely.

Point either suite at a deployment with `SMOKE_BASE_URL=https://…`.

## Audits

| Document | Covers |
| --- | --- |
| [`docs/IMPROVEMENT-ROADMAP.md`](docs/IMPROVEMENT-ROADMAP.md) | Current full-scale audit, residual findings, and prioritized improvement suggestions |
| [`docs/POST-MERGE-AUDIT.md`](docs/POST-MERGE-AUDIT.md) | Post-merge audit and remediation record for the prior fix wave |
| [`docs/FULL-SCALE-AUDIT.md`](docs/FULL-SCALE-AUDIT.md) | Pre-merge audit and resolution history |
| [`docs/MIGRATION-AUDIT.md`](docs/MIGRATION-AUDIT.md) | Historical audit of the first WordPress-mirror pass and what the rebuild resolved |

Open items that still need a human decision outside the codebase:

- **Resend delivery** — set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and
  `CONTACT_TO_EMAIL` in Vercel, then confirm provider acceptance and mailbox
  receipt.
- **Optional shared rate limit** — set `UPSTASH_REDIS_REST_URL` and
  `UPSTASH_REDIS_REST_TOKEN` if a hard global contact quota is required.
- **Social profiles** — add real Facebook / Instagram URLs to `business.social`
  in `src/content/business.ts` when they exist (icons stay hidden while empty).
- **Legal review** — privacy and terms are now Australian-oriented and match
  the live site, but a qualified review is still wise before relying on them
  for anything beyond ordinary website enquiries.
- **Business identity** — publish verified ABN, contractor licence, insurance
  and warranty details before restoring any stronger claims or testimonials.
