# Codex contribution audit — 14 August 2026

Audit of the agent-authored commits and pull requests merged into `main`, with
the focus on the most recent batch: **PRs #31–#42, merged 13–14 August 2026**
(`49a450c…66cb442`, 70 files, **+6,875 / −425**).

Audited at `66cb442`. Every check below was re-run locally against that commit
rather than taken from the PR descriptions.

## Verdict

**The recent Codex batch is sound.** Twelve PRs landed in about fourteen hours,
each with green CI before merge, and the tree at `66cb442` passes every gate the
repository defines. No shipped defect was found in the application code.

The problems worth acting on are one **environmental break that is red right
now** (an npm advisory published after the batch landed), one **conditional
runtime bug** in the contact rate limiter, one **fragile regression test**, and
a set of **process gaps** that let a red build reach `main` earlier in the month.

## Attribution

Agent work is identifiable only by branch prefix; no commit trailer records the
tool. Of 42 pull requests to date:

| Prefix | PRs | Notes |
|---|---|---|
| `codex/*` | 4 | #31, #40, #41, #42 |
| `agent/*` | 21 | #8, #11, #14–#16, #18, #22–#28, #32–#39 (+ #26 still open) |
| `cursor/*` | 5 | #3–#7 |
| `claude/*` | 4 | #1, #2, #19, #29 |
| `dependabot/*` | 6 | #9, #10, #12, #13, #17, #30 |
| `redesign/*` | 2 | #20, #21 |

`codex/*` and `agent/*` carry the same PR-body template and the same commit
style, so both are treated as Codex here: **25 PRs, 24 merged**.

## Verification run at `66cb442`

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm test` | Pass — 14 tests, 7 suites |
| `npm run build` | Pass |
| `npm run bundle-budget` | Pass — 19 routes, all under 575,000 bytes |
| `npm run smoke` | Pass — **841 checks** across 25 routes, 67 images |
| `npm run a11y` | Pass — **57 axe-core runs**, desktop + mobile + interactive states |
| `npm run enquiry-test` | Pass |
| `npm run analytics-test` | **Fail** — see F3 (environment-dependent, not a site defect) |
| `npm audit --omit=dev --audit-level=high` | **Fail** — see F1 |
| Sitemap vs filesystem routes | 25/25 match, all trailing-slash, no orphans |
| `/not-a-real-page/`, `/resources/not-real/` | 404 (`dynamicParams = false`) |

## Findings

### F1 — CI on `main` is red today: npm advisory on pinned `nanoid` (high)

`npm audit --omit=dev --audit-level=high` exits 1, which is step 5 of the CI
workflow, so **the next push or PR fails before it reaches the test suite**.

```
nanoid  <3.3.18   high
GHSA-2v37-7h3g-55p8 — custom generators can loop indefinitely when size is zero
elite-surface-group-nextjs → next@16.3.0 → postcss@8.5.25 (override) → nanoid@3.3.17
```

`nanoid` is pinned at 3.3.17 by the `overrides.next.postcss` entry in
`package.json`, set on 8 August in response to the *previous* nanoid advisory.
The new advisory raises the floor to 3.3.18. This is not caused by the Codex
batch — it is time-based drift — but it blocks everything that comes next.

Verified fix (tested on an isolated copy of `package.json` + `package-lock.json`):

```
npm audit fix --package-lock-only   # nanoid 3.3.17 → 3.3.18, js-yaml patched
                                    # postcss stays at the pinned 8.5.25
                                    # re-audit: found 0 vulnerabilities
```

Lockfile-only; no source change and no override change required.

### F2 — Contact rate limiter never releases a blocked client (Upstash path)

`src/app/api/contact/route.ts:204` issues `INCR` and `EXPIRE` on every request:

```ts
body: JSON.stringify([
  ["INCR", key],
  ["EXPIRE", key, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)],
]),
```

`EXPIRE` is unconditional, so each attempt resets the TTL to a full ten minutes.
A visitor who trips the limit and retries every few minutes keeps pushing the
expiry forward and stays blocked indefinitely, instead of being released ten
minutes after their *first* request. The in-memory fallback
(`memoryRateLimit`) does not have this problem — it filters timestamps against a
true sliding window — so the two limiters disagree on behaviour.

Only active when `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are set;
harmless otherwise. Fix: set the TTL only when the counter is new (`SET key 1 NX
EX <window>` + `INCR`, or `EXPIRE key <window> NX`).

### F3 — The analytics regression test is browser-build dependent and order-sensitive

`scripts/analytics-test.mjs` is the only automated guard on the conversion
tracking added in #35. It fails deterministically (3/3 runs) against the
Chromium build in this environment:

```
Error: Expected one Email Click event, got []
```

Root cause is the test, not the site. Instrumented in isolation:

- clicking the `mailto:` link **first** emits `Email Click` correctly;
- clicking it **after** the `tel:` click, no `click` event reaches the page's
  listener at all — the synthesized input is swallowed while the renderer holds
  a pending external-protocol navigation. CI's `chrome-headless-shell` build
  does not exhibit this; a full Chromium build does.

The third assertion has a related weakness: it clicks the Google Maps directions
link — a real cross-origin navigation — then reads `window.__analyticsTestEvents`
without waiting. It passes on a timing race; when navigation wins, the queue is
gone and the check fails for the wrong reason.

Suggested: assert each event on a fresh page load, or call `preventDefault()` on
the anchors under test so no navigation is ever started.

### F4 — Process: a red build reached `main` and stayed there for three days

PR #28 (`agent/improve-website-copy`, 10 August) was **merged 18 seconds after it
was opened**, before CI could report. Both the PR run and the resulting `main`
run failed:

```
✗ /services/ title is within the search snippet budget — 68 characters:
  Cladding, Render, Hebel &amp; Walling Adelaide — Elite Surface Group
```

`main` had no further pushes until 13 August, so it sat red for three days. The
title was fixed in #31.

By contrast the 13–14 August batch was disciplined: every one of #31–#42 was
merged **after** its CI run completed green, typically 15–60 seconds later. The
gap is enforcement, not intent — required status checks on `main` would have
made #28 impossible.

### F5 — Rate-limit key trusts client-settable headers

`clientKey()` reads `x-real-ip` first, then the **last** hop of
`x-vercel-forwarded-for`. On Vercel both are platform-set, so this is correct in
production. Anywhere else — self-hosted `next start`, a preview proxy that does
not overwrite them — the limiter key is fully attacker-controlled and the limit
is bypassed by rotating a header. The smoke suite relies on exactly this
spoofability (`"x-real-ip": "198.51.100.10"`), which is a reasonable local trick
but confirms the exposure. The file's own comment documents the limiter as
best-effort, so treat this as a deployment constraint to record rather than a
bug: the contact endpoint's protection against Resend spend is only as good as
the proxy in front of it.

Note also that the last hop of a forwarded-for chain is the nearest proxy, not
the client; the first entry is the client. With Vercel's single-value header the
distinction does not currently bite.

### F6 — "Route-specific" sitemap dates are effectively one release date

#39 states it moved to per-route `lastModified`. `src/content/routes.ts` does
give guides their own `modified` date, but 24 of 25 routes resolve to the same
`RELEASE_DATES.verifiedContentRelease` (`2026-08-13`), which is what the file's
own comment warns against:

> Dates belong to individual route content; do not replace them with build time
> or one site-wide release date.

Hard-coded constants also go stale silently — nothing fails when a page's copy
changes and its date does not. Low SEO impact (search engines treat `lastmod` as
a hint), but the claim in the PR body overstates what shipped.

### F7 — Housekeeping

- **Stale open PRs.** #26 (hero colour, draft) and #29 (1,431-line content
  rewrite, draft) are both `mergeable_state: dirty` and superseded by merged
  work — #26 by #27, #29 by the #31–#39 content batch. Close them or rebase.
- **#30 (Dependabot, axe-core) is red only because of its stale base** — it
  branched from `main` while the `/services/` title failure was live. A rebase
  clears it; F1 must land first.
- **Branch prefixes are inconsistent** — `codex/*` and `agent/*` for the same
  tool makes attribution and filtering unreliable. Pick one.
- **Unverifiable claims in PR bodies.** Several PRs cite Lighthouse runs
  ("93–95 performance") and "three independent technical, editorial and
  safety/privacy audits". Nothing in the repository records these, and they
  cannot be reproduced after the fact. Attach artifacts or drop the claim.
- **Indentation left stale in `scripts/smoke-test.mjs`.** #41 wrapped a large
  block in `if (isLoopbackSmoke) {` without re-indenting its body; the block now
  reads as if it were top-level.
- **`hasMap` holds a directions URL** (`layout.tsx`), not a map page. Harmless,
  slightly off-spec.
- **One guide's image provenance is vague.** Four of five resource guides label
  their hero precisely ("AI-generated illustration only…"). The Hebel-panels
  guide says "Illustrative wall-system image", which does not say whether the
  photo is an Elite Surface Group project.

### Owner decision, not a defect

The site now publishes a full street address — **22 Robin St, Salisbury East SA
5109** — in the footer, the `PostalAddress` schema, and a Google Maps directions
link (#33). If that is a residential address, confirm this is intended before it
is indexed further; a service-area business can publish a suburb and service
radius without a street address.

## What held up well

Worth recording, because the batch got a lot right:

- **Truthfulness improved.** #34/#39 replaced invented case-study narrative
  ("Adelaide metro", fabricated challenge/outcome text) with descriptions of what
  is actually visible in each photograph, and removed unsupported locality
  labels. AI-generated imagery is disclosed in the visible caption, not just alt
  text.
- **The published ABN passes its checksum.** `35 691 074 567` → weighted sum
  534, mod 89 = 0. Valid.
- **Privacy tracked the code.** #35 added analytics and #40 added three enquiry
  fields; `src/content/legal.ts` was updated in the same PRs to name Vercel Web
  Analytics, the new fields, and what is explicitly *not* sent to analytics.
- **Content is not thin or duplicated.** The five guides run 1,726–2,532 words;
  pairwise sentence overlap is ≤ 0.06 Jaccard, and the only sentences common to
  all five are header, footer and form chrome.
- **Structural consistency is enforced, not assumed.** `src/content/routes.ts`
  makes one list drive the sitemap *and* the enquiry `sourcePath` allowlist, so a
  new page cannot be indexable while logging enquiries as "unknown".
- **No code smells in +6,875 lines** — no `any`, `@ts-ignore`, `eslint-disable`,
  stray `console.log` or `TODO` in the diff.
- **Contact endpoint hardening is careful**: bounded body reader, honeypot,
  origin + `sec-fetch-site` checks, allowlisted select values, HTML escaping,
  redacted provider logging, idempotency key, and analytics failures that cannot
  turn a delivered enquiry into a visitor-facing error.

## Not verified

- **External citations.** The five guides cite 42 unique authoritative URLs
  (hebel.com.au, ncc.abcb.gov.au, plan.sa.gov.au, dulux.com.au, safework.sa.gov.au
  and others). This environment's egress policy blocks all of them, so neither
  liveness nor content accuracy could be confirmed. A link check belongs in CI.
- **Factual accuracy of the guides' technical and regulatory claims** — reviewing
  the NCC/SA planning statements against the primary sources requires the same
  blocked access.
- **Lighthouse numbers** quoted in the PR bodies.
- **Production configuration** — whether `RESEND_API_KEY`, `CONTACT_*` and the
  Upstash variables are actually set on Vercel.

## Recommended order

1. `npm audit fix --package-lock-only` — unblocks CI (F1).
2. Enable branch protection on `main`: require the `verify` check, no merge on
   red (F4).
3. Fix the Upstash TTL reset (F2).
4. Make `analytics-test.mjs` navigation-proof (F3).
5. Rebase #30; close or rebase #26 and #29 (F7).
6. Add an external link check to the smoke suite so the guides' citations cannot
   rot unnoticed.
