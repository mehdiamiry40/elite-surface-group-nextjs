# Codex contribution audit — 14 August 2026

Audit of the agent-authored commits and pull requests merged into `main`, with
the focus on the most recent batch: **PRs #31–#42, merged 13–14 August 2026**
(`49a450c…66cb442`, 70 files, **+6,875 / −425**).

Audited at `66cb442`. Every check below was re-run locally against that commit
rather than taken from the PR descriptions. The fixes are in the same change as
this document; each finding records what happened to it.

## Verdict

**The recent Codex batch is sound.** Twelve PRs landed in about fourteen hours,
each with green CI before merge, and the tree at `66cb442` passes every gate the
repository defines. No shipped defect was found in the application code.

Six findings were actioned: one environmental break that was red at audit time,
one conditional runtime bug, one fragile regression test, and three smaller
corrections. One finding (F6) was **retracted** — it did not survive
verification. Two items need the repository owner and cannot be fixed from
inside the codebase.

| # | Finding | Status |
|---|---|---|
| F1 | `npm audit` fails on the pinned `nanoid` — CI red on every branch | **Fixed** |
| F2 | Upstash rate limiter never releases a blocked visitor | **Fixed** |
| F3 | Analytics test depends on browser build and click order | **Fixed** |
| F4 | A red build reached `main` and stayed three days | **Needs owner** — branch protection |
| F5 | Rate-limit key read the wrong end of the forwarded chain | **Fixed** |
| F6 | "Route-specific" sitemap dates are one release date | **Retracted** — the claim was wrong |
| F7 | Housekeeping: stale PRs, prefixes, indentation, `hasMap` | **Fixed / actioned** |

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

## Verification

Run at `66cb442` before the fixes, and again after them.

| Check | Before | After |
|---|---|---|
| `npm run typecheck` | Pass | Pass |
| `npm run lint` | Pass | Pass |
| `npm test` | Pass — 14 tests | Pass — 14 tests |
| `npm run build` | Pass | Pass |
| `npm run bundle-budget` | Pass — 19 routes | Pass — 19 routes |
| `npm run smoke` | Pass — 841 checks, 25 routes, 67 images | Pass — 841 checks |
| `npm run a11y` | Pass — 57 axe-core runs | Pass — 57 axe-core runs |
| `npm run enquiry-test` | Pass | Pass |
| `npm run analytics-test` | **Fail** (F3) | Pass — 3 of 3 runs |
| `npm audit --omit=dev --audit-level=high` | **Fail** (F1) | Pass — 0 vulnerabilities |
| Sitemap vs filesystem routes | 25/25, unknown routes 404 | 25/25 |

## Findings

### F1 — CI was red on every branch: npm advisory on pinned `nanoid` — **fixed**

`npm audit --omit=dev --audit-level=high` is step 5 of the CI workflow, so any
push or pull request failed before reaching the test suite.

```
nanoid  <3.3.18   high
GHSA-2v37-7h3g-55p8 — custom generators can loop indefinitely when size is zero
elite-surface-group-nextjs → next@16.3.0 → postcss@8.5.25 (override) → nanoid@3.3.17
```

`nanoid` was pinned at 3.3.17 by the `overrides.next.postcss` entry in
`package.json`, set on 8 August in response to the *previous* nanoid advisory.
The new advisory raises the floor to 3.3.18. Not caused by the Codex batch —
time-based drift — but it blocked everything that came after it.

**Fix:** `npm audit fix --package-lock-only`. Lockfile only: `nanoid` 3.3.17 →
3.3.18 and `js-yaml` patched, with `postcss` still pinned at 8.5.25 by the
override. `npm audit --omit=dev --audit-level=high` now reports zero
vulnerabilities and exits 0.

### F2 — Contact rate limiter never released a blocked visitor — **fixed**

`src/app/api/contact/route.ts` issued `INCR` and `EXPIRE` on every request.
`EXPIRE` was unconditional, so each attempt reset the TTL to a full ten minutes:
a visitor who tripped the limit and retried every few minutes kept pushing the
expiry forward and stayed blocked indefinitely, instead of being released ten
minutes after their *first* request. The in-memory fallback filters timestamps
against a true sliding window, so the two limiters disagreed on behaviour.

**Fix:** seed the counter with `SET key 0 EX <window> NX`, then `INCR`. The TTL
is written only when the window is not already open, and counting no longer
touches it.

Verified against a stub Upstash REST endpoint implementing `SET NX EX` / `INCR`
/ `EXPIRE` with real TTLs:

```
8 sequential submissions, limit 6 → 503 503 503 503 503 503 429 429
TTL immediately after the burst   → 600s
retry while blocked, 5s later     → 429, TTL 595s   (decays; previously reset to 600s)
```

### F3 — Analytics regression test depended on browser build and click order — **fixed**

`scripts/analytics-test.mjs` is the only automated guard on the conversion
tracking added in #35. It failed deterministically — three runs of three —
against a full Chromium build: `Expected one Email Click event, got []`.

The cause was the test, not the site. Instrumented in isolation, clicking the
`mailto:` link *first* emits `Email Click` correctly; clicking it *after* the
`tel:` click means no click event reaches the page listener at all — the
synthesized input is dropped while the renderer holds a pending
external-protocol navigation. CI's `chrome-headless-shell` build does not behave
this way, which is why the suite passed there. The third assertion had a related
weakness: it clicked the Google Maps link — a real cross-origin navigation —
then read the event queue without waiting, passing on a timing race.

**Fix:** cancel the default action for anchors in the capture phase before the
assertions run. No navigation is ever started, so neither failure mode is
reachable, and the site's own delegated click listener still runs untouched.
Three consecutive passes on the build that previously failed three of three.

### F4 — A red build reached `main` and stayed there for three days — **needs owner**

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
gap is enforcement, not intent.

**Not fixable from the codebase.** Requires a branch-protection rule on `main`
requiring the `verify` check — GitHub repository settings, not a file. The
expectation is now written into `README.md` under *Contributing*.

### F5 — Rate-limit key read the wrong end of the forwarded chain — **fixed**

`clientKey()` read `x-real-ip` first, then the **last** hop of
`x-vercel-forwarded-for`. In a forwarded chain the client is the *first* entry;
the last is the nearest proxy. With Vercel's single-value header the distinction
does not currently bite, but it would silently bucket every visitor together
behind any proxy that appends.

**Fix:** read the first entry of `x-vercel-forwarded-for`, falling back to
`x-real-ip`, and document the deployment constraint in place — on Vercel both
headers are platform-set and unforgeable, but behind any other proxy (or none) a
client can rotate them for a fresh bucket, which makes the limiter a speed bump
rather than a control. The smoke suite relies on exactly that spoofability
locally, which is a reasonable test trick and also the proof of the exposure.

### F6 — "Route-specific" sitemap dates — **retracted**

The original finding claimed that #39's route-specific `lastModified` was
effectively one site-wide release date, since 24 of 25 routes resolve to the same
constant, and that nothing enforced the invariant. Verification refuted both
halves:

- **The dates are accurate.** The `2026-08-14` timestamps that suggested drift
  are Adelaide-local (UTC+9:30/10:30) renderings of commits that are **13 August
  in UTC**. The entire content batch genuinely landed on one release day, so one
  shared date is the truthful value, not a placeholder.
- **The invariant is already enforced.** The smoke suite checks that every URL
  carries a `lastmod`, that each is a valid ISO date, that none is in the future,
  that more than one distinct date exists, and it pins two specific routes by
  value.

The only change kept is a comment in `src/content/routes.ts`: the previous
wording forbade "one site-wide release date", which reads as a prohibition the
code appears to violate. It now states the actual rule — dates are editorial,
never derived from build time or file mtimes, and several routes sharing a date
is correct when their content really did land together.

### F7 — Housekeeping — **fixed / actioned**

- **`hasMap` pointed at a directions URL** rather than a map of the place.
  `business.address.mapUrl` now holds a Maps *search* URL for the address and
  feeds `hasMap`; `directionsUrl` stays as the visitor-facing "get directions"
  link. The smoke assertion was updated with it.
- **Stale indentation in `scripts/smoke-test.mjs`.** #41 wrapped a 128-line
  block in `if (isLoopbackSmoke) {` and indented only the first line of the
  body. Re-indented against the pre-#41 formatting; exactly one line differed,
  confirming nothing else moved.
- **Branch prefixes and PR claims** are now documented in `README.md` under
  *Contributing*: one prefix per source (`agent/` for any coding agent), and
  results in a PR description must be reproducible from the branch. Several PRs
  cited Lighthouse runs and "three independent audits" that nothing in the
  repository records.
- **Stale open PRs.** #26 (hero colour) and #29 (1,431-line content rewrite) were
  both conflicting drafts superseded by merged work — #26 by #27, #29 by the
  #31–#39 batch — and have been closed with an explanation.
- **Dependabot #30** is red only because it branched from `main` while the
  `/services/` title failure was live. It needs a rebase once F1 is on `main`;
  until then a rebase would simply hit the audit failure instead.
- **One guide's image provenance is still vague.** Four of five resource guides
  label their hero precisely ("AI-generated illustration only…"). The
  Hebel-panels guide says "Illustrative wall-system image", which does not say
  whether the photograph is an Elite Surface Group project. Only the owner knows
  the provenance, so the caption is unchanged.

### Owner decision, not a defect

The site publishes a full street address — **22 Robin St, Salisbury East SA
5109** — in the footer, the `PostalAddress` schema, and a Google Maps link (#33).
If that is a residential address, confirm this is intended before it is indexed
further; a service-area business can publish a suburb and service radius without
a street address.

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
  and others). The audit environment's egress policy blocks all of them, so
  neither liveness nor content accuracy could be confirmed. A link check belongs
  in CI.
- **Factual accuracy of the guides' technical and regulatory claims** — reviewing
  the NCC/SA planning statements against the primary sources requires the same
  blocked access.
- **Lighthouse numbers** quoted in the PR bodies.
- **Production configuration** — whether `RESEND_API_KEY`, `CONTACT_*` and the
  Upstash variables are actually set on Vercel.

## Still open

1. **Branch protection on `main`** requiring `verify` (F4) — owner action.
2. **Rebase Dependabot #30** once F1 is on `main`.
3. **Confirm the street address** is intended for publication.
4. **Clarify the Hebel-panels guide image caption** once its provenance is known.
5. **Add an external link check** to the smoke suite so the guides' citations
   cannot rot unnoticed.
