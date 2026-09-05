# Elite Surface Group

The [elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/) website, built
with Next.js 16 (App Router) and React 19.

## Local development

```bash
nvm install       # Node 22.23.2 with its bundled npm 10.9.8
nvm use
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
derive the rest. Srcset widths cap at 1920px — the photographs are not 4K
masters, and larger variants only delay LCP. After replacing a hero, banner
or other photograph referenced from `src/content/`, run
`npm run generate-lcp-blur` so the tiny placeholder stays in sync.

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

Set the values separately for each Vercel environment. Production should use
the live Resend key and enquiry inbox; Preview should use a separate Resend key
and a test recipient so a branch deployment cannot send test leads to the live
mailbox. Preview may also omit delivery credentials entirely: the build warns
and succeeds, while its contact endpoint remains visibly unavailable rather
than sending or capturing a lead. Keep the Vercel project runtime on Node
`22.x`: Vercel manages its
patches, while `.nvmrc` pins CI and local development to `22.23.2` and the
repository declares the bundled npm `10.9.8`.

**The sender is the part that catches people out.** Resend delivers only from a
domain you have verified with it by adding its DNS records, so
`CONTACT_FROM_EMAIL` has to be an address on `elitesurfacegroup.com.au` (or
another verified domain). A Gmail address cannot be a sender — `gmail.com` is
not a domain anyone outside Google can verify. The built-in default is
therefore the business domain, not the public Gmail inbox. `npm run prebuild`
uses the same sender validator as the runtime and treats a malformed or
public-mailbox `CONTACT_FROM_EMAIL` as unconfigured delivery.

The recipient is more forgiving: it defaults to `business.email`, and a
`CONTACT_TO_EMAIL` still pointing at the retired `@elitesurfacegroup.com.au`
mailbox is ignored rather than obeyed, so a stale deployment variable cannot
quietly swallow leads.

**Without `RESEND_API_KEY` nothing is emailed.** On Vercel and `npm run start`
the endpoint answers 503 and gives the visitor explicit call and email links
without discarding the form contents. During `npm run dev` only, the same
missing key captures the enquiry in the server log and the form still shows
success, so the quote flow can be tested without secrets.

`npm run prebuild` warns during local development and fails production-mode
builds when delivery is unconfigured. `REQUIRE_CONTACT_DELIVERY=1` applies the
same rule in another environment. Production has no configuration bypass: fix
the delivery settings before deploying.

The optional Upstash configuration also provides an encrypted durable outbox.
Set all four values together or leave all four unset:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `CONTACT_OUTBOX_ENCRYPTION_KEY` — standard base64 for exactly 32 random bytes
- `CRON_SECRET` — at least 32 characters; authenticates
  `/api/internal/contact-retry/`

When configured, the validated, normalized enquiry is encrypted with
AES-256-GCM before it is written, a stable submission ID protects Resend
retries from duplicates, and
retryable failures may return `202` only after durable storage succeeds. The
worker stops after six attempts or 23 hours, whichever comes first, so it never
automatically retries beyond Resend's 24-hour idempotency window. `vercel.json`
invokes the authenticated retry endpoint every five minutes in Production,
using the existing `CRON_SECRET`. Each invocation considers up to 30 records in
concurrent batches of three within an 18-second selection budget. Expired or
already-settled queue members are safely removed without resending them.
`contact-retry.yml` remains an authenticated manual fallback.

`CONTACT_MONITOR_TOKEN` optionally enables
`POST /api/internal/contact-monitor/`. Supply it as an Authorization Bearer
token. The endpoint accepts no recipient or enquiry input and sends a fixed,
PII-free probe only to Resend's `delivered+elite-surface-monitor@resend.dev`
test address with the `synthetic-monitor` category tag. The probe passes through
the encrypted outbox and its signed delivery callback. Vercel invokes the GET
variant twice daily using `CRON_SECRET`; `scripts/synthetic-monitor.mjs` waits
for the exact probe's verified delivery outcome.

`GET /api/internal/contact-status/` uses the monitor or cron bearer and exposes
only queue/worker/delivery aggregates and incident acknowledgement metadata.
It returns 503 for stale workers, overdue delivery, missing records or unresolved
failures. `CONTACT_ALERT_TO_EMAIL` selects one explicitly approved operator
address for dedicated, customer-data-free failure messages. It has no default.
The alert cron checks every five minutes; repeated identical notifications
share one Resend idempotency key per hour. The independent GitHub watchdog reads
status without sending mail. See `OPS.md` for provider-outage limitations,
cutover scope, acknowledgement and incident response.

`RESEND_WEBHOOK_SECRET` verifies signed delivery, delay, failure, bounce,
complaint and suppression events at `POST /api/webhooks/resend/`. Register the
production endpoint in Resend and keep its signing secret Production-only. See
[`OPS.md`](OPS.md) for activation, monitoring, retention and incident steps.

## Checks

```bash
npm run typecheck   # tsc
npm run lint        # eslint
npm run build       # production build (runs the env check first)
npm test            # unit tests
npm run check       # typecheck, lint, unit tests, build and bundle budget
npm run contact-redis-test # isolated real Redis expiry/concurrency tests

npm run start &     # smoke / a11y need a live server
npm run smoke       # route, SEO, header and contact checks
npm run a11y        # axe-core across routes and interactive UI states
```

The Redis suite starts its own temporary Unix-socket server with persistence
disabled and never loads production credentials. Install `redis-server`, or
set `REDIS_SERVER=/path/to/redis-server`. CI installs the runtime explicitly.

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

Vercel Production also requires the exact commit's full `verify` check before
assigning custom domains. Keep this check name stable and Production behavior
Blocking; native lint/type checks are additional blocking controls. The full
verification job explicitly fails if its prerequisite security workflow fails,
so a skipped dependency cannot accidentally satisfy the release gate.

The security workflow runs pinned Gitleaks and Semgrep with local rules, verifies
benign scanner fixtures, and checks dependency advisories daily. Code is not
uploaded to a hosted scanner. GitHub vulnerability alerts/security updates are
separate enabled controls; paid code/secret-scanning features are not required
for these CI checks. See `SECURITY.md` for scope and response responsibilities.

## Audits

| Document | Covers |
| --- | --- |
| [`docs/CODEX-CONTRIBUTION-AUDIT.md`](docs/CODEX-CONTRIBUTION-AUDIT.md) | Independent verification pass over the agent-authored PRs merged through 14 August, with findings and fixes |
| [`docs/IMPROVEMENT-ROADMAP.md`](docs/IMPROVEMENT-ROADMAP.md) | Current full-scale audit, residual findings, and prioritized improvement suggestions |
| [`docs/POST-MERGE-AUDIT.md`](docs/POST-MERGE-AUDIT.md) | Post-merge audit and remediation record for the prior fix wave |
| [`docs/FULL-SCALE-AUDIT.md`](docs/FULL-SCALE-AUDIT.md) | Pre-merge audit and resolution history |
| [`docs/MIGRATION-AUDIT.md`](docs/MIGRATION-AUDIT.md) | Historical audit of the first WordPress-mirror pass and what the rebuild resolved |

Open items that still need a human decision outside the codebase:

- **Operator alerts** — confirm one recipient for `CONTACT_ALERT_TO_EMAIL`,
  its responsible operator and backup, and verify a controlled notification.
- **Mailbox and historical reconciliation** — the Resend/Upstash/webhook setup
  was activated on 2 September. Provider delivery is not Inbox/Spam placement
  or human follow-up. Confirm the sales mailbox and outstanding pre-cutover
  outcomes as described in `OPS.md`.
- **Social profiles and project evidence** — keep published profile URLs
  current and supply verifiable installation/photo rights and case-study facts
  before adding more specific claims.
- **Legal review** — privacy and terms are now Australian-oriented and match
  the live site, but a qualified review is still wise before relying on them
  for anything beyond ordinary website enquiries.
- **Business credentials** — publish contractor licence, insurance and warranty
  details only after the owner supplies current evidence.
