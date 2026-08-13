# Full-scale audit and improvement roadmap

Audited branch `cursor/website-full-audit-9762` on 31 July 2026, and compared
against the live site
[https://elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/).

This follows [`POST-MERGE-AUDIT.md`](./POST-MERGE-AUDIT.md). That document
records the post-merge defects and the remediations already on this branch.
This document answers: **what still needs attention, and what should be
improved next for growth, trust, performance, and operations.**

## Remediation update

Code-controlled residual findings and roadmap quick/medium items from this
document were implemented on the same branch. Post-fix verification:

| Check | Result |
| --- | --- |
| `npm run check` | Pass (typecheck, lint, unit tests, build, bundle budget) |
| Smoke (`localhost`) | **458 / 458** |
| Axe interactive suite | **34 / 34** |
| `npm audit --omit=dev` | **0** |
| First-load JS (home) | ~559 KiB uncompressed (under 575 KiB budget) |

### Fixed in code

- legacy `testi-bg` redirect targets an existing image; smoke validates every
  legacy redirect and final target
- service pages emit a single LCP image preload; unused `quality` props removed
- quote CTAs are progressive links to `/contact-us/#contact` with JS enhance
- CTA bands include Call + Quote actions
- service FAQs with visible markup + `FAQPage` schema; claims qualified;
  contextual related links
- contact API: loopback origin equivalence for local smoke, structured logs,
  redacted provider errors, optional Upstash shared rate limit
- content split into narrow modules; client islands import smaller surfaces;
  `CtaBand` isolated from carousel-bearing sections
- project case-study routes `/projects/[slug]/` and locations hub + Adelaide
  page; sitemap/smoke/a11y updated
- contact-security unit tests and CI bundle budget gate

### Still owner / external

Resend mailbox verification, apex primary domain, legal entity/ABN/licence
review, real social URLs, and provisioning Upstash (optional env vars are
wired). CSP `'unsafe-inline'` remains required by the current Next inline
bootstrap/JSON-LD approach. Dev-only ESLint advisories remain upstream.

## Executive verdict

On this branch the site is in strong shape as a static Adelaide trade marketing
site. **Production may still be behind until this branch is merged and
deployed** — re-probe `www` redirect, sitemap dates, and 404 canonical after
release.

---

## Production vs branch gap

| Item | Live production | This branch |
| --- | --- | --- |
| `www` → apex | `200` duplicate host | Permanent redirect in `next.config.ts` |
| Sitemap `lastmod` | Old dates (e.g. 2026-04 / 2026-02) | Single content release date `2026-07-31` |
| 404 canonical | Homepage canonical present | No homepage canonical on not-found |
| Contact API | Older response shape (`415` for form-urlencoded + JSON intent probe) | Progressive POST + JSON paths hardened |
| Claims / testimonials | Softer than original WP; still pre-final polish | Softened copy; unverified testimonials unpublished |

**Action:** merge PR #4, confirm Vercel production deploy, then re-probe the
table above.

---

## Residual defects (code)

### P1 — Legacy asset redirect ends in 404

`src/content/legacy-assets.json` maps
`/wp-content/uploads/2026/01/testi-bg.png` → `/images/testi-bg.webp`, but
`public/images/testi-bg.webp` does not exist. Local follow ends `308` then
`404`. Smoke only samples the first eight legacy redirects, so this slipped
through.

**Fix:** remove the mapping or point it at an existing asset; assert every
legacy redirect target resolves in smoke.

### P1 — Duplicate high-priority image preload on service pages

`PageBanner` and the service intro image both set `priority` for the same
asset (`src/components/PageBanner.tsx`, `src/app/[service]/page.tsx`,
`src/content/site.ts` banner/image pairing). Rendered `/render/` HTML emits two
`rel="preload" as="image"` hints for `/images/render.webp`.

**Fix:** keep priority only on the true LCP (banner); drop it from the intro
image.

### P1 — Client bundle still ships broad site content

Home first-load JS is ~555 KiB uncompressed. Client islands (`Header`, `Hero`,
`ContactSection`, quote dialog) import from the large `src/content/site.ts`,
including unpublished testimonial drafts in compiled chunks.
`sections.tsx` imports client components at module scope, so routes that only
need a CTA band still pull client references.

**Fix direction:** split content modules; server-render shells with minimal
props into small client islands; separate server-only section helpers from
client-backed ones; add a bundle budget check on
`.next/diagnostics/route-bundle-stats.json`.

### P2 — Image `quality` props are ineffective

Components request qualities 72–82, but Next 16 defaults allow only `75`
(`images.qualities` unset in `next.config.ts`). Output URLs all use `q=75`.

**Fix:** remove unused `quality` props, or explicitly configure
`images.qualities` if multiple values are intentional.

### P2 — Quote CTAs are JavaScript-only

`QuoteButton` opens a client-only dialog (`ssr: false`). Without JS, “Get a
Free Quote” does nothing. The contact-page form already progressive-enhances.

**Fix:** make quote CTAs links to `/contact-us/#contact` by default; enhance to
modal when hydrated.

### P2 — Contact origin allowlist is strict on loopback hosts

With `NEXT_PUBLIC_SITE_URL` set to production, smoke against
`http://127.0.0.1:3000` fails origin checks (`403`), while
`http://localhost:3000` passes. CI uses localhost, so GitHub Actions stays
green; local agents using `127.0.0.1` see false failures.

**Fix:** document `SMOKE_BASE_URL=http://localhost:3000`, and/or treat
`localhost` / `127.0.0.1` as equivalent loopback origins in non-production.

### P2 — Provider error logging may echo PII

Resend error `message` strings are logged as-is. Provider text can include
email addresses even though the app avoids logging submitted fields.

**Fix:** log structured `providerStatus` / codes; redact email-like substrings.

### P3 — CSP still allows `'unsafe-inline'` for scripts/styles

Documented and acceptable for a no-third-party marketing site; weaker
defense-in-depth if an injection bug appears later. Consider nonces/hashes for
JSON-LD and CSP reporting when convenient.

### P3 — Dev dependency advisories

Runtime audit is clean. Full audit reports high-severity `brace-expansion` via
ESLint / `eslint-config-next`. Track upstream; avoid force-upgrades that break
Next’s ESLint peer range.

---

## Owner actions (not code-only)

These remain the highest-impact blockers for a trustworthy live lead funnel:

1. **Resend delivery** — set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`,
   `CONTACT_TO_EMAIL` in Vercel Production; send a real test enquiry; confirm
   mailbox receipt (not only provider HTTP acceptance). Verify SPF/DKIM/DMARC
   for the sending domain.
2. **Primary domain** — after deploy, confirm apex is Vercel primary and that
   `www` permanently redirects (app config + DNS/domain settings).
3. **Business identity** — publish verified ABN, licence/registration, and
   insurance/warranty policy only after confirmation; then restore stronger
   claims carefully.
4. **Legal review** — qualified Australian review of privacy/terms; add legal
   entity name, privacy contact, and retention periods.
5. **Social profiles** — add real Facebook/Instagram URLs to `business.social`
   when they exist; then expose `sameAs` in Organization JSON-LD.
6. **Shared abuse controls** — if spam becomes material, add Upstash Redis (or
   equivalent) rate limiting and/or Vercel BotID / Turnstile.

---

## Improvement roadmap

### Quick wins (small code or content edits)

| # | Suggestion | Why | Where |
| --- | --- | --- | --- |
| Q1 | Fix legacy `testi-bg` mapping + full redirect smoke | Stops permanent redirect → 404 | `legacy-assets.json`, `smoke-test.mjs` |
| Q2 | Single LCP priority image on service pages | Cleaner preload / LCP bandwidth | `PageBanner.tsx`, `[service]/page.tsx` |
| Q3 | Standardise or remove dead `quality` props | Avoid misleading image config | Image components, `next.config.ts` |
| Q4 | Quote CTA → `/contact-us/#contact` with JS enhance | Works without JavaScript | `QuoteButton.tsx` |
| Q5 | Dual CTA: Call + Quote on service CTA bands | Phone is a primary conversion path for trades | `sections.tsx` `CtaBand` |
| Q6 | Service FAQs + visible FAQPage schema | Captures long-tail local queries | `site.ts`, `[service]/page.tsx`, `JsonLd.tsx` |
| Q7 | Qualify remaining performance claims | Reduces overclaim risk | `site.ts` (e.g. cracking, fire, “built to last”) |
| Q8 | Redact provider errors; structured contact logs | Safer ops visibility | `api/contact/route.ts` |

### Medium (content architecture and conversion)

| # | Suggestion | Why | Where |
| --- | --- | --- | --- |
| M1 | Split `site.ts` + shrink client islands | Cuts JS; safer content growth | `src/content/*`, Header/Hero/Contact |
| M2 | Project case-study routes `/projects/[slug]/` | Indexable proof with suburb + service | New app routes + content |
| M3 | Local pages only with unique proof | Adelaide / suburb intent without doorway spam | `/locations/…` hub + few strong pages |
| M4 | Contextual internal links in body copy | Passes relevance beyond nav cards | Service/about copy |
| M5 | Route-specific OG images for top services | Better share/search previews | `public/images`, page metadata |
| M6 | Shared rate limit + bot friction | Hardens public contact under load | Contact API + Marketplace Redis/BotID |
| M7 | Contact route-handler tests + Resend mock | Protects validation/rate-limit contracts | New unit/integration tests |
| M8 | Bundle budget in CI | Prevents silent JS growth | `.github/workflows/ci.yml` |

### Strategic (growth and authority)

| # | Suggestion | Why |
| --- | --- | --- |
| S1 | Verified E-E-A-T on About (team, credentials, process) | Local trust for Adelaide homeowners/builders |
| S2 | Google Business Profile + NAP consistency | Local pack visibility; schema only if address is public |
| S3 | Permissioned review program; keep inherited drafts unpublished | Safe social proof; Review schema only when genuine |
| S4 | Lightweight, source-backed resources | **In progress** — resource hub plus Adelaide render-cracking and coastal cladding-maintenance guides published with Article schema; keep future expansion tied to measured demand |
| S5 | Post-deploy synthetic lead + bounce/complaint webhooks | Proves the funnel still delivers |
| S6 | Privacy-safe analytics with matching legal disclosure | **Complete** — Vercel Web Analytics measures page views and non-personal conversion events |
| S7 | Keep Cache Components/PPR off until a CMS/feed exists | Current static SSG is already ideal |

Suggested content URLs (only create when copy/proof is ready):

- `/locations/adelaide/`
- `/projects/[slug]/` case studies
- `/resources/render-cracking-adelaide/` (published)
- `/resources/cladding-maintenance-coastal-adelaide/` (published)
- `/resources/hebel-vs-brick-adelaide-builds/` (only after measuring demand)

Schema opportunities once visible on-page: `FAQPage`, richer `Service` /
`Offer`, `ContactPoint`, `Article`/`BlogPosting`, case-study `CreativeWork`.
Avoid `AggregateRating` unless backed by a compliant external review source.

---

## Security and privacy posture (current)

**Already solid on this branch:** streaming body cap, content-type gate, origin /
`Sec-Fetch-Site` checks, honeypot, service and source-path allowlists,
control-character scrubbing, HTML escaping, Resend timeout + idempotency key,
production build fail-closed without delivery env (with emergency override),
non-PII correlation logging, comprehensive security headers, no third-party
browser scripts.

**Still best-effort:** in-memory rate limit per instance; honeypot-only bot
resistance; delivery health not proven by CI; legal copy needs entity-specific
review.

---

## Performance posture (current)

Strengths: static generation, self-hosted `next/font`, local `next/image`, lazy
below-fold backgrounds, deferred inactive hero slides, high fetch priority on
true hero LCP, lazy-mounted quote dialog, footer `prefetch={false}` where
appropriate.

Main leftover wins: remove duplicate service preloads, shrink client content
imports, optionally trim to one display font family later, add Lighthouse CI or
bundle budgets so regressions are caught.

Do **not** enable Cache Components solely for novelty — revisit when CMS or
personalization arrives.

---

## Recommended sequence

1. **Merge and deploy** this branch; re-verify production table above.
2. **Owner:** configure and mailbox-test Resend; confirm apex primary domain.
3. **Code quick wins:** Q1–Q4 (redirect, preload, quality, quote link).
4. **Trust/conversion:** Q5–Q7 + owner identity/legal items.
5. **Architecture:** M1 + M7 + M8 before large content expansion.
6. **Growth:** M2–M5 and strategic local/blog work with real project proof.

---

## Verification notes for this pass

- Local server on `localhost:3001`: smoke **208/208**, a11y **28/28**.
- Smoke against `127.0.0.1` failed origin checks when
  `NEXT_PUBLIC_SITE_URL=https://elitesurfacegroup.com.au` was set — treated as
  residual tooling quirk, not a production visitor bug.
- Production contact was probed only with invalid payloads; no live valid
  enquiry was submitted.
- Artifacts: `/opt/cursor/artifacts/prod-probes.txt`,
  `/opt/cursor/artifacts/local-residual.txt`.
