# Elite Surface Group

The [elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/) website, built
with Next.js 16 (App Router) and React 19.

## Local development

```bash
npm ci
npx playwright install chromium
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

`public/images/og/` holds the 1200×630 share cards used for link previews on
social platforms and in chat apps — the 1.91:1 ratio those scrapers crop to.
Each is the page's photo behind a dark scrim, with the logo, the page headline
and the phone number. Pages select one with `ogCard(name, alt)` from
`src/lib/seo.ts`, where `name` is the route slug or page key. If you rename a
route or change a `bannerTitle`, regenerate the matching card so the preview and
the page still say the same thing.

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
- `CONTACT_FROM_EMAIL` — sender, on a domain verified with Resend (optional;
  defaults to `Elite Surface Group <info@elitesurfacegroup.com.au>`)
- `CONTACT_TO_EMAIL` — enquiry inbox (optional; `elite.surfacegroup@gmail.com`
  by default)

Set the same values in the Vercel project settings.

**The sender is the part that catches people out.** Resend delivers only from a
domain you have verified with it by adding its DNS records, so
`CONTACT_FROM_EMAIL` has to be an address on `elitesurfacegroup.com.au` (or
another verified domain). A Gmail address cannot be a sender — `gmail.com` is
not a domain anyone outside Google can verify. The built-in default is
therefore the business domain, not the public Gmail inbox. `npm run prebuild`
treats a Gmail `CONTACT_FROM_EMAIL` as unconfigured delivery.

The recipient is more forgiving: it defaults to `business.email`, and a
`CONTACT_TO_EMAIL` still pointing at the retired `@elitesurfacegroup.com.au`
mailbox is ignored rather than obeyed, so a stale deployment variable cannot
quietly swallow leads.

**Without `RESEND_API_KEY` nothing is emailed.** On Vercel and `npm run start`
the endpoint answers 503 and gives the visitor explicit call and email links
without discarding the form contents. During `npm run dev` only, the same
missing key captures the enquiry in the server log and the form still shows
success, so the quote flow can be tested without secrets.

`npm run prebuild` warns during local development and fails Vercel Production
builds when delivery is unconfigured. `REQUIRE_CONTACT_DELIVERY=1` applies the
same rule in another environment. `ALLOW_UNCONFIGURED_CONTACT=1` is an
emergency-only override.

## Checks

```bash
npm run typecheck   # tsc
npm run lint        # eslint
npm run build       # production build (runs the env check first)
npm test            # unit tests
npm run check       # typecheck, lint, unit tests, build and bundle budget

npm run start &     # smoke / a11y need a live server
npm run smoke       # route, SEO, header and contact checks
npm run a11y        # axe-core across routes and interactive UI states
```

`npm run a11y` downloads its own Chromium. Where one is already provisioned
(CI images, sandboxes), point at it with
`PLAYWRIGHT_CHROMIUM_PATH=/path/to/chrome npm run a11y` instead.

The smoke suite asserts what is easy to regress: every route returns 200, each
page has exactly one `<h1>`, a meta description, canonical and Open Graph tags,
every `tel:` link is the correct number, no page references `wp-content` or a
third-party font, every image declares `alt`, security headers are present,
images are cached and served as `image/webp`, retired WordPress junk returns
404, no orphaned images ship, and both JavaScript and progressive form paths
reject bad input safely.

Point either suite at a deployment with `SMOKE_BASE_URL=https://…`.

```bash
npm run link-check   # every external source the guides cite still resolves
```

The resource guides are built on primary manufacturer and South Australian
government documents, and those documents move. `link-check` fetches each cited
URL and fails only on a definite 404 or 410 — hosts that block automated
clients, rate-limit or time out are reported and skipped, because failing on
them would train everyone to ignore the check. Redirects are reported too: not
a failure, but a permanent move is worth writing into the citation while it is
known.

It runs weekly rather than per pull request (`.github/workflows/link-check.yml`,
also runnable on demand from the Actions tab). Reaching 40-odd third-party hosts
on every pull request would let one unrelated outage block unrelated work.

## Contributing

Branches use one prefix per source, so history stays attributable at a glance:

| Prefix | Source |
| --- | --- |
| `agent/` | Any coding agent (Codex, Claude Code, Cursor) |
| `dependabot/` | Dependabot |
| anything else | A person, named for the work |

Pull requests describe what changed and why, and list the checks that were
actually run. Only claim a result that someone else can reproduce from the
branch: `npm run check`, smoke and axe counts, and bundle-budget output all
qualify. Numbers that leave no trace — ad-hoc Lighthouse runs, "independent
reviews" — either land as a committed artifact or stay out of the description.

Nothing merges into `main` red, including a merge by the repository owner —
enforce it with a branch-protection rule requiring the `verify` check, rather
than by remembering to wait. A pull request merged before CI reports is a
pull request nobody checked.

## Audits

| Document | Covers |
| --- | --- |
| [`docs/CODEX-CONTRIBUTION-AUDIT.md`](docs/CODEX-CONTRIBUTION-AUDIT.md) | Independent verification pass over the agent-authored PRs merged through 14 August, with findings and fixes |
| [`docs/IMPROVEMENT-ROADMAP.md`](docs/IMPROVEMENT-ROADMAP.md) | Current full-scale audit, residual findings, and prioritized improvement suggestions |
| [`docs/POST-MERGE-AUDIT.md`](docs/POST-MERGE-AUDIT.md) | Post-merge audit and remediation record for the prior fix wave |
| [`docs/FULL-SCALE-AUDIT.md`](docs/FULL-SCALE-AUDIT.md) | Pre-merge audit and resolution history |
| [`docs/MIGRATION-AUDIT.md`](docs/MIGRATION-AUDIT.md) | Historical audit of the first WordPress-mirror pass and what the rebuild resolved |

Open items that still need a human decision outside the codebase:

- **Resend delivery** — verify `elitesurfacegroup.com.au` in the Resend
  dashboard (add its DNS records), then set `RESEND_API_KEY` in Vercel.
  `CONTACT_FROM_EMAIL` defaults to `info@elitesurfacegroup.com.au` on that
  domain; do not set it to Gmail. Enquiries land in
  `elite.surfacegroup@gmail.com`; confirm provider acceptance and mailbox
  receipt with a real submission.
- **Optional shared rate limit** — set `UPSTASH_REDIS_REST_URL` and
  `UPSTASH_REDIS_REST_TOKEN` if a hard global contact quota is required.
- **Social profiles** — add real Facebook / Instagram URLs to `business.social`
  in `src/content/business.ts` when they exist (icons stay hidden while empty).
- **Legal review** — privacy and terms are now Australian-oriented and match
  the live site, but a qualified review is still wise before relying on them
  for anything beyond ordinary website enquiries.
- **Business credentials** — publish contractor licence, insurance and warranty
  details only after the owner supplies current evidence.
