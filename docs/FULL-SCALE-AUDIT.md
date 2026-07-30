# Full-scale audit — elitesurfacegroup.com.au

Audited commit `9df6f03` on `main` (post-launch fixes #2).  
Next.js 16.2.12 / React 19.2.8 / Node 22.  
Live domain: [https://elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/).

This is a fresh audit of the **component rebuild now in production**, not a
re-run of the superseded WordPress-mirror audit in
[`MIGRATION-AUDIT.md`](./MIGRATION-AUDIT.md). Every finding below was verified
by running the code or probing the live site.

### Verification performed

| Check | Result |
| --- | --- |
| `npm run check` (typecheck + lint + build) | Pass |
| `npm run smoke` against `localhost:3000` | **175 / 175** pass |
| `SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run smoke` | **175 / 175** pass |
| axe-core on 11 routes × 1440×900 and 390×844 | **0 violations**, 0 undersized tap targets (&lt;24×24) |
| Live `POST /api/contact/` with valid JSON | **503** — Resend not configured |
| Live security headers | CSP, nosniff, Referrer-Policy, X-Frame-Options, HSTS, Permissions-Policy all present |
| `npm audit` | 9 high — all in the ESLint toolchain (devDependency), not runtime |

---

## Verdict

The site is a **solid, shippable Next.js rebuild**. The architecture finding from
the migration audit is closed: content lives in typed modules, pages are real
React components, imagery is WebP through `next/image`, fonts are self-hosted,
security headers are on, and the smoke suite guards the regressions that matter
(phone numbers, one `<h1>`, meta descriptions, redirects, headers, contact
input rejection).

Accessibility against axe-core is clean at both desktop and mobile viewports
after the post-launch contrast / tap-target / markup pass.

What is **not** fine is the primary conversion path on the live domain:
**enquiry delivery is not configured**. A real submission returns `503` and a
`mailto:` fallback. For any visitor without a mail client (most mobile browsers)
the lead is lost, and the UI still reports success. Everything else in this
report is secondary to fixing that.

---

## Critical — fix before relying on the site for leads

### 1. Contact form cannot deliver email in production

**Severity: Critical · Business**

Verified live:

```
POST https://elitesurfacegroup.com.au/api/contact/
→ 503
{"message":"Your email app has been opened so you can send the enquiry directly.",
 "mailto":"mailto:info%40elitesurfacegroup.com.au?..."}
```

`RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and/or `CONTACT_TO_EMAIL` are unset (or
invalid) on the Vercel project. `scripts/check-env.mjs` only **warns** unless
`REQUIRE_CONTACT_DELIVERY=1`, so production deploys succeed while the form is
dead.

The client treats the 503+`mailto` path as success
(`useEnquiryForm.ts` sets `state: "success"`), so the visitor is told the
enquiry was handled even when nothing reached the business.

**Do this now**

1. Set the three Resend env vars in the Vercel project (Production + Preview).
2. Verify with a real submission that the endpoint returns `200` and the email
   arrives.
3. Set `REQUIRE_CONTACT_DELIVERY=1` so a future missing/rotated key fails the
   build instead of shipping a silent dead form.
4. Until step 1–2 are done, treat the site as **not lead-ready**.

> Note: `docs/MIGRATION-AUDIT.md` Resolution table marks finding #2 as
> “Fixed — `prebuild` fails production builds without Resend vars”. That is no
> longer true after the warn-instead-of-fail change. This audit supersedes that
> status for the live site.

---

## High

### 2. Legal pages cite UK law for an Australian business

**Severity: High · Compliance**

`src/content/legal.ts` is published as-is from the WordPress site and states:

- Privacy: governed by the **Data Protection Act 1998**, registration with the
  **Data Protection Registrar**
- Terms: disputes subject to the laws of **England, Northern Ireland, Scotland
  and Wales**

Elite Surface Group operates in South Australia. Publishing UK privacy statute
and UK governing law on an AU business site is a compliance risk, not a copy
nit. The file itself already flags this; it still needs a qualified person to
replace both documents with Australian Privacy Principles / Australian Consumer
Law equivalents.

Also false on the live site (see #3).

### 3. Legal copy describes Google Analytics, cookies and consent boxes that do not exist

**Severity: High · Compliance / Trust**

Terms claim the site “uses cookies to monitor browsing preferences and visitors
via Google Analytics.” The application loads **no analytics, no cookie banner,
and no third-party scripts** (CSP is `'self'`-only; confirmed in HTML and
headers).

Privacy policy tells visitors to “tick the relevant box situated on the form”
to opt out of marketing. The enquiry forms have no such checkbox.

Either install what the policy describes, or rewrite the policy to match the
product. Shipping the mismatch is worse than either choice alone.

### 4. Failed deliveries look like successes to the visitor

**Severity: High · Conversion**

When the API returns 503/502 with a `mailto:` payload,
`useEnquiryForm` opens the mail client and shows a green success state. On
devices where `mailto:` does nothing, the visitor walks away believing the
message was sent.

Even after Resend is configured, the same path runs on Resend outages (502)
with no server-side log of the failure (`route.ts` swallows the error and
`result.error` without `console.error`).

**Fix direction**

- Treat mailto fallback as `state: "error"` (or a distinct warning), with an
  explicit “call us / email us” CTA.
- Log Resend failures server-side (without unnecessary PII — see #11).
- Consider a visible “delivery unavailable — please call” banner when the
  endpoint is known misconfigured.

---

## Medium

### 5. Social links point at Facebook and Instagram home pages

**Severity: Medium · Brand / Trust**

```ts
social: {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
}
```

Verified in production HTML. Footer icons send visitors to the platforms, not
to Elite Surface Group. Either wire real profile URLs or remove the icons until
they exist.

### 6. Rate limiter is still best-effort on serverless

**Severity: Medium · Abuse**

Documented in code and still accurate:

- Process-local `Map` — ceiling is `6 × instances`, resets on cold start
- Trusts the first `x-forwarded-for` entry (client-spoofable)
- When the map is full of still-active keys, `evictStaleBuckets` removes
  nothing and new keys continue to be inserted — the 5,000-key cap is soft
- No CAPTCHA or durable anti-abuse layer

Verified locally: after prior probes filled the bucket, further POSTs returned
`429`. Cross-origin posts correctly return `403`.

Acceptable as a blunt instrument; not a production abuse control. Move to
Upstash / Vercel KV (or equivalent) and prefer the platform IP, or document the
limit as best-effort in the README (code comment alone is easy to miss).

### 7. Body-size limit trusts `Content-Length`

**Severity: Medium · Hardening**

```ts
const contentLength = Number(request.headers.get("content-length") ?? "0");
if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) …
```

Omitting or understating `Content-Length` bypasses the 16 KiB guard. After
`request.json()`, check `JSON.stringify(body).length` (or read the raw body
once and measure) before processing.

### 8. `service` is free-form at the API

**Severity: Medium · Data quality**

The UI offers a fixed list (`Cladding`, `Render`, `Hebel`, `Walling`) but the
API accepts any string up to 80 characters. Validate against the allowlist from
`services` so lead categorisation cannot be polluted.

Related UX issue: every form defaults to **Cladding**
(`defaultValue={serviceOptions[0]}`), including on `/render/`, `/hebel/` and
`/walling/`. Prefill from the current service page.

### 9. CTA band always sells cladding

**Severity: Medium · Conversion / Consistency**

`CtaBand` hard-codes “External Cladding Services in Adelaide” on every page that
embeds it — including Hebel, walling, render, contact and legal-adjacent flows.
Use a generic closing CTA, or vary the title by route/service.

### 10. Open Graph / Twitter cards have no image; `og:url` sticks to the homepage

**Severity: Medium · SEO / Sharing**

Verified on `/` and `/about/`:

- `twitter:card` is `summary_large_image` but there is **no** `og:image` or
  `twitter:image`
- Root layout sets `openGraph.url` to the homepage; child pages inherit it, so
  `/about/` advertises `og:url=https://elitesurfacegroup.com.au/` while its
  canonical correctly points at `/about/`

Add a default OG image (and per-page overrides for services/projects), and set
`openGraph.url` per route to match the canonical.

### 11. Missing-config logs include the visitor’s email

**Severity: Medium · Privacy**

```ts
console.error("…", { from: email, page: sourcePath || "unknown" });
```

When delivery is broken, every failed enquiry writes the visitor’s email into
server logs. Log a redacted hash or omit the address; keep `sourcePath` and a
request id.

### 12. Immutable caching on non-content-addressed filenames

**Severity: Medium · Ops**

`/images/*` is served with `Cache-Control: public, max-age=31536000, immutable`
(verified live on `/images/cladding.webp`). Filenames are semantic
(`cladding.webp`), not hashed. Replacing a file in place without renaming it
will leave browsers and CDNs on the old bytes for up to a year.

Either fingerprint filenames on change, or drop `immutable` and use a shorter
`max-age` plus revalidation.

### 13. Sitemap and breadcrumb URLs omit trailing slashes

**Severity: Medium · SEO hygiene**

The app uses `trailingSlash: true`. Canonicals correctly end in `/`
(`https://elitesurfacegroup.com.au/about/`), but:

- `sitemap.xml` emits `https://elitesurfacegroup.com.au/about` (no slash)
- `BreadcrumbSchema` / `ServiceSchema` `item` / `url` values also omit the slash

Search engines usually consolidate these, but the sitemap should list the final
URLs. Append `/` (except for `/`) in `sitemap.ts` and `JsonLd.tsx`.

### 14. Self-served 5★ review schema

**Severity: Medium · SEO policy**

`ReviewSchema` publishes `aggregateRating: 5` with `reviewCount` equal to the
five on-site testimonials, attached to `HomeAndConstructionBusiness`. Google’s
guidelines generally do not award review rich results for self-serving
LocalBusiness/Organization reviews. At best this is ignored; at worst it risks
a manual action if the testimonials are not clearly third-party.

Keep the visible testimonials; consider dropping or scoping the JSON-LD until
reviews come from a verifiable source (Google Business Profile, etc.).

---

## Low

### 15. Hero slide controls use an incomplete tabs pattern

Dots are `role="tablist"` / `role="tab"` with `aria-current` but without
`aria-selected`, `aria-controls`, tab panels, or arrow-key behaviour. axe did
not flag this under the ruleset used, but it is still incorrect ARIA. Prefer
plain buttons (“Show slide 2 of 3”) or implement the full tabs pattern.

Hover pauses autoplay; keyboard focus does not, and there is no explicit
pause control.

### 16. Mobile drawer is not a modal dialog

Escape closes it and body scroll locks, but there is no focus trap, no
`aria-modal`, and no focus restoration. Opening the quote dialog while the
drawer is still open can leave two overlays active with competing scroll-lock
cleanup.

### 17. Desktop services submenu lacks popup semantics

The toggle exposes `aria-expanded` but not `aria-haspopup` / controls linkage.
No outside-click or Escape handler on desktop (mouseleave closes it).

### 18. Footer link hover fails WCAG AA for normal text

| Pair | Ratio | AA normal text (4.5:1) |
| --- | --- | --- |
| `--orange-ink` on white | 4.90:1 | Pass |
| `--orange-ink` on `--tint` | 4.57:1 | Pass |
| Body `#6b7075` on white | 5.00:1 | Pass |
| Footer default ~70% white on `--ink` | ~8.3:1 | Pass |
| **Footer hover `--orange-ink` on `--ink`** | **3.58:1** | **Fail** |

Use a lighter orange (or white) for hover on the dark footer.

### 19. 404 inherits homepage canonical / social tags

The 404 correctly sends `robots: noindex` and branded chrome, but still inherits
the homepage `<title>` pattern, description, and `rel=canonical` to `/`. Add
explicit `notFound` metadata (title “Page not found”, no canonical or
canonical self, noindex already present via Next).

### 20. Organisation schema has no street address or geo

Schema includes region `SA` / country `AU`, phone, email and hours, but no
`streetAddress`, postcode or `geo`. Fine if the business is mobile-only; otherwise
add the real service address used on Google Business Profile for consistency.

### 21. DevDependency advisories in ESLint toolchain

`npm audit` reports 9 high-severity issues, all via `brace-expansion` →
`minimatch` → ESLint packages. These are **not** in the production server
bundle. Track an `eslint` / `eslint-config-next` bump when compatible; do not
force `eslint@10` blindly (`npm audit fix --force` proposes a breaking change).

### 22. Migration-audit resolution table is stale on contact delivery

As noted under #1, `MIGRATION-AUDIT.md` still claims production builds fail
without Resend vars. Update that row to “Partly fixed — warns by default;
`REQUIRE_CONTACT_DELIVERY=1` makes it fatal” so the historical doc does not
contradict the live README.

### 23. No interactive / accessibility regression suite in CI

The smoke suite is excellent for rendered invariants (175 checks) but does not
exercise the drawer, quote dialog, hero, carousel, lightbox, or form success
path. axe was clean in this audit; wire a Playwright + axe job so it stays that
way. No unit test runner exists.

---

## What is in good shape

Called out so the prioritised plan does not bury the wins.

- **Architecture** — typed content modules, App Router pages, no HTML mirror,
  no Elementor CSS, no third-party browser scripts
- **Phone numbers** — single `business.phone` constant; smoke suite enforces
  every `tel:` href
- **Security headers** — present and correct on production (measured, not
  inferred from a protected preview)
- **Asset pipeline** — WebP sources, `next/image` AVIF/WebP output, immutable
  cache headers on `/images/*`, legacy WordPress upload URLs 301
- **Accessibility baseline** — 0 axe violations and 0 &lt;24px targets across 11
  routes at two viewports after the post-launch pass; skip link, focus-visible,
  reduced-motion, dialog focus trap on the quote modal
- **SEO basics** — unique titles/descriptions, canonicals, sitemap, robots,
  organisation / breadcrumb / service schema, retired WP routes redirected and
  de-indexed
- **Contact endpoint hardening** — JSON-only, origin / `Sec-Fetch-Site` checks,
  honeypot, field length limits, HTML escaping in the email body
- **Tooling** — `npm run check` green; smoke green locally and against production

### Transfer sizes (local `next start`, cold, Playwright)

These are full-page sums (HTML + CSS + JS + fonts + images) without Vercel’s
edge compression, so they read higher than the earlier CDN-oriented migration
figures. Useful as a relative baseline:

| Route | 1440×900 | 390×844 |
| --- | --- | --- |
| `/` | 1.49 MB / 66 req | 1.15 MB / 29 req |
| `/about/` | 1.16 MB / 61 req | 0.90 MB / 28 req |
| `/cladding/` | 1.02 MB / 59 req | 0.86 MB / 30 req |
| `/projects/` | 1.06 MB / 63 req | 0.97 MB / 30 req |
| `/contact-us/` | 1.04 MB / 56 req | 0.81 MB / 23 req |

Production HTML alone compresses to ~15 KB brotli for `/`. Largest image
sources in `public/images/` remain `img-5.webp` (~385 KB) and
`pexels-eye4dtail-118009.webp` (~365 KB) — candidates if a further weight pass
is needed.

---

## Resolution

Code fixes for findings #2–#23 landed after this audit. **#1 (Resend env vars /
`REQUIRE_CONTACT_DELIVERY`) is intentionally left to the site owner** — it is
configuration on Vercel, not an application change.

| # | Finding | Status |
| --- | --- | --- |
| 1 | Contact form cannot deliver email in production | **Open** — set Resend env vars + `REQUIRE_CONTACT_DELIVERY=1` |
| 2 | Legal pages cite UK law | **Fixed** — Australian Privacy Principles / SA + ACL terms |
| 3 | Analytics / cookie / consent claims | **Fixed** — legal copy matches the no-analytics site |
| 4 | Mailto fallback looks like success | **Fixed** — warning state + call CTA; form values retained |
| 5 | Placeholder social links | **Fixed** — empty `business.social`; footer icons hidden |
| 6 | Rate limiter best-effort | **Partly fixed** — platform IP, hard key cap; shared store still backlog |
| 7 | Body-size trusts Content-Length | **Fixed** — raw body length checked after read |
| 8 | Free-form `service` / always Cladding | **Fixed** — allowlist + service-page / quote prefill |
| 9 | CTA always sells cladding | **Fixed** — generic walling CTA copy |
| 10 | Missing OG image / sticky `og:url` | **Fixed** — `pageMetadata()` + default banner image |
| 11 | Logs include visitor email | **Fixed** — page only; Resend errors logged without address |
| 12 | Immutable year-long image cache | **Fixed** — `max-age=604800` without `immutable` |
| 13 | Sitemap / JSON-LD slash mismatch | **Fixed** — trailing slashes via `absoluteUrl()` |
| 14 | Self-served 5★ review schema | **Fixed** — AggregateRating JSON-LD removed |
| 15 | Incomplete hero tabs pattern | **Fixed** — plain pressed buttons; pause on focus |
| 16 | Mobile drawer not modal | **Fixed** — dialog + focus trap; quote closes drawer cleanly |
| 17 | Services submenu semantics | **Fixed** — `aria-haspopup`, menu roles, Escape / outside click |
| 18 | Footer hover contrast | **Fixed** — white hover on dark footer |
| 19 | 404 metadata | **Fixed** — dedicated title + `noindex` |
| 20 | Org schema locality | **Fixed** — `addressLocality: Adelaide` (no invented street) |
| 21 | ESLint toolchain advisories | **Accepted** — still in ESLint/`minimatch` only; forcing `brace-expansion@5` breaks lint. Not in the production bundle |
| 22 | Stale migration-audit row | **Fixed** — in the audit PR |
| 23 | No a11y regression suite | **Fixed** — `npm run a11y` (Playwright + axe-core) |

### Still open

1. Configure Resend on Vercel and set `REQUIRE_CONTACT_DELIVERY=1` (#1)
2. Optional: shared rate-limit store (Upstash / Vercel KV) for a hard ceiling (#6)
3. Optional: qualified legal review of the new AU privacy/terms (#2)
4. Optional: real Facebook / Instagram profile URLs in `business.social` (#5)

---

## Verification commands

```bash
npm ci
npm run check

npm run start &
npm run smoke
npm run a11y

# Against production
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run smoke

# Delivery probe (expect 200 once Resend is configured)
curl -sS -X POST 'https://elitesurfacegroup.com.au/api/contact/' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://elitesurfacegroup.com.au' \
  -d '{"name":"Probe","email":"probe@example.com","message":"delivery check","service":"Cladding"}'
```
