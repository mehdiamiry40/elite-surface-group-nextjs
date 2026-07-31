# Post-merge full-scale website audit

Audited commit `6cd1208` on 31 July 2026.

Live site: [https://elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/)

This is a fresh audit after the fixes recorded in
[`FULL-SCALE-AUDIT.md`](./FULL-SCALE-AUDIT.md) were merged. It covers the
deployed visitor journey, application code, security, accessibility, SEO,
content, conversion, performance, and operational reliability.

## Executive verdict

The website is structurally sound and fast:

- `npm run check` passes (typecheck, lint, production build)
- Production smoke suite passes **205 / 205**
- Production axe suite passes **22 / 22** initial-page checks
- Lighthouse scores are **96–100** on the routes measured
- Runtime dependencies have **0 known npm advisories**
- All 11 public routes are statically generated; only the contact endpoint is
  dynamic
- Production security headers, canonical URLs, sitemap paths, image MIME
  types, and browser cache headers are present and consistent

The site is not fully closed out. The primary concern remains the enquiry flow:
the repository still permits production builds when contact delivery is absent,
and the non-JavaScript form path leaks enquiry fields into the URL while losing
the lead. Several previous audit items are also only partly fixed: the 404
canonical, quote-dialog service prefill after client navigation, hero controls,
submenu semantics, and interactive accessibility coverage.

## Verification performed

| Check | Result |
| --- | --- |
| `npm ci` | Pass |
| `npm run check` | Pass |
| Production `npm run smoke` | **205 / 205** |
| Production `npm run a11y` | **22 / 22** initial-page axe runs |
| `npm audit --omit=dev` | **0 vulnerabilities** |
| Full `npm audit` | 9 high, all in ESLint development tooling |
| Live security headers | CSP, HSTS, nosniff, frame deny, referrer and permissions policies present |
| Live apex host | `200`, Vercel edge hit |
| Live `www` host | `200`, duplicate host; no redirect |
| Live 404 | `404`, but homepage canonical and duplicate robots tags |
| Interactive browser checks | Quote prefill, no-JS form, hero state reproduced |
| Lighthouse | Home mobile 99; home desktop 100; render mobile 97; about mobile 96 |

No live valid enquiry was submitted during this audit because doing so could
send an external email. The delivery risk below is based on the build policy,
runtime behavior in source, the local missing-env result, and the previous
verified production `503`.

---

## Critical

### 1. Contact delivery can still fail open in production

**Area:** Conversion / operations

`scripts/check-env.mjs` warns but exits successfully unless
`REQUIRE_CONTACT_DELIVERY=1`. Missing delivery configuration makes
`POST /api/contact/` return `503` plus a `mailto:` fallback.

This means a production deployment can pass its build while every web enquiry
depends on the visitor having a configured mail client. The check only verifies
that values are present; it cannot detect an expired API key, unverified sender
domain, rejected recipient, later bounce, or provider outage.

**Evidence**

- `scripts/check-env.mjs:22-50`
- `src/app/api/contact/route.ts:305-392`
- Local production build: warned that all three contact variables were absent,
  then passed
- Previous live audit: valid production request returned `503`

**Required owner action**

1. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in Vercel.
2. Verify provider acceptance and mailbox receipt with a real submission.
3. Set `REQUIRE_CONTACT_DELIVERY=1`.
4. Add a synthetic delivery monitor and alert on endpoint `502` / `503`,
   bounces, and suppressions.

---

## High

### 2. Without JavaScript, forms leak enquiry details into the URL and lose the lead

**Area:** Privacy / conversion / resilience

The forms have a React `onSubmit` handler but no progressive-enhancement
`action` or `method`. When JavaScript is disabled, unavailable, or has not
hydrated, the browser performs a GET to the current page.

**Reproduced**

```text
/contact-us/?firstName=Audit&lastName=&email=audit%40example.com
&phone=&service=Cladding&message=Private+audit+details&company=
```

The enquiry is not delivered, while the visitor's name, email, service, and
project details enter browser history, server logs, copied URLs, and referrer
surfaces.

**Evidence**

- `src/components/ContactSection.tsx:75-87`
- `src/components/QuoteDialog.tsx:48-59`
- `src/components/useEnquiryForm.ts:26-50`

**Fix**

Provide a real POST fallback through a Server Action or route-backed form.
At minimum, set an explicit safe method/action so failure cannot degrade to a
GET containing personal data.

### 3. `www` serves duplicate indexable pages instead of redirecting

**Area:** SEO / host configuration

Both hosts return `200`:

```text
https://elitesurfacegroup.com.au/
https://www.elitesurfacegroup.com.au/
```

The `www` HTML canonicalizes to the apex, which helps, but a permanent host
redirect is the stronger consolidation signal and also removes duplicate asset
and crawl surfaces.

**Fix**

Set the apex as the Vercel primary domain and configure a permanent `www` →
apex redirect.

### 4. Commercial, warranty, licensing, and testimonial claims need evidence

**Area:** Trust / compliance

The site makes strong claims without publishing supporting details:

- “SA's Leading Experts”
- “Quality craftsmanship guaranteed”
- “Licensed and fully insured services”
- “We complete every project on time, every time”
- “7-year labour warranty”
- “Price Guarantee”
- installation/compliance to Australian standards
- more than a decade of business experience

The site does not publish the legal entity, ABN, contractor licence, insurance
details, warranty scope/exclusions/claim process, or price-guarantee terms.

Every testimonial is also rendered with “Rated 5 out of 5”, although the
content records only contain a name and quote—not a rating, date, source, or
project.

**Evidence**

- `src/content/site.ts:8-10,71-72,135-170,194-209,242-245,283-290,323-359,487-499`
- `src/components/sections.tsx:130-149`

**Fix**

Verify each claim and retain evidence. Publish the legal identity/licence and
real warranty terms. Only display a rating where the source record actually
contains one; add source/date/project where permission allows.

---

## Medium

### 5. Mobile LCP is close to or above the 2.5-second target

**Area:** Performance

Measured Lighthouse results:

| Route/profile | Score | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: |
| Home mobile, median of 3 | 99 | 2.26s | 0 | 23ms |
| Home desktop | 100 | 0.51s | 0 | 0ms |
| `/render/` mobile | 97 | 2.58s | 0.032 | 26ms |
| `/about/` mobile | 96 | 2.70s | 0.014 | 52ms |

The hero and page banner are LCP candidates. They use `priority`, but the
rendered image lacks an explicit `fetchpriority="high"` in the measured output.

**Fix**

Add `fetchPriority="high"` to the first hero image and `PageBanner` image, then
re-measure. Ensure only one page-level image is high priority.

### 6. Below-fold backgrounds and inactive hero slides load immediately

**Area:** Performance / bandwidth

Three CSS backgrounds load on the homepage before they are needed:

- expertise background: `src/app/page.tsx:158-160`
- testimonials background: `src/components/sections.tsx:117-120`
- closing CTA background: `src/components/sections.tsx:162-165`

They transferred about 248 KB in the mobile audit. All hero slides are also
rendered in the viewport and downloaded immediately. Combined, these resources
represented about 47% of the 637 KB mobile homepage transfer.

**Fix**

Render below-fold backgrounds as lazy `next/image` fill layers. Initially
render/load only the active hero slide; preload the next slide shortly before
rotation.

### 7. Incorrect intrinsic dimensions cause measurable layout shift

**Area:** Performance / visual stability

All service images are declared `600×400`, but their real dimensions vary:

| Image | Actual size |
| --- | --- |
| Cladding | 1000×667 |
| Render | 1000×422 |
| Hebel | 1000×646 |
| Walling | 1000×778 |

Lighthouse attributed `/render/` CLS of 0.0315 to this mismatch. About-carousel
images similarly share one declared ratio despite different source ratios, and
the carousel starts with desktop sizing before correcting after hydration.

**Evidence**

- `src/app/[service]/page.tsx:72-80`
- `src/app/about/page.tsx:33-43`
- `src/components/Carousel.tsx:41-50`

**Fix**

Store real dimensions with image content, or use a reserved fixed-ratio
container with `fill` and `object-fit`. Make carousel item sizing responsive in
CSS before hydration.

### 8. Quote dialog keeps the old service after client-side navigation

**Area:** Conversion / data quality

Reproduced:

```json
{
  "quoteServiceHome": "Cladding",
  "quoteServiceAfterClientNavigationToRender": "Cladding"
}
```

The global dialog stays mounted. Its select uses `defaultValue`, which only
applies on first mount, so a client navigation does not update the selected
service.

**Evidence**

- `src/components/QuoteDialog.tsx:18-21,51-57`
- `src/components/EnquiryFields.tsx:28-32,77-84`
- `src/components/QuoteDialogProvider.tsx:25-37`

**Fix**

Key/remount the form by pathname, or make the service select controlled and
reset it when the route changes.

### 9. The hero has no persistent pause control and its active dot is visually broken

**Area:** Accessibility / UX

The hero advances every six seconds and only pauses while hovered or focused.
There is no persistent Pause/Play control, leaving a likely WCAG 2.2.2 gap.

The active button uses `aria-pressed="true"`, while CSS still targets
`[aria-current="true"]`. Runtime measurement showed the active dot remained
transparent:

```json
{
  "heroFirstDotPressed": "true",
  "heroFirstDotBackground": "rgba(0, 0, 0, 0)",
  "heroPauseControls": 0
}
```

**Evidence**

- `src/components/Hero.tsx:9-45,77-91`
- `src/app/globals.css:620-632`

**Fix**

Add an explicit Pause/Play button and style
`.hero__dots button[aria-pressed="true"]`.

### 10. The 404 emits conflicting metadata

**Area:** SEO

Live 404 output contains:

```html
<meta name="robots" content="noindex">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://elitesurfacegroup.com.au/">
```

The dedicated title and `noindex` are correct, but a missing page should not
canonicalize to the homepage, and duplicate robots tags are unnecessary.

**Evidence**

- `src/app/layout.tsx:39`
- `src/app/not-found.tsx:6-11`

**Fix**

Move the homepage canonical to homepage metadata rather than the root layout,
and emit one 404 robots directive.

### 11. Sitemap modification dates are knowingly stale

**Area:** SEO / crawl freshness

The sitemap still emits January–April WordPress dates even though the site and
legal pages materially changed on 30 July 2026.

**Evidence**

- `src/app/sitemap.ts:5-21`
- Live `/sitemap.xml`

**Fix**

Maintain dates with content releases or omit `lastModified` until it can be
accurate.

### 12. Service social metadata declares false image dimensions

**Area:** Social sharing / SEO

`pageMetadata()` always declares `1280×960`, but service pages pass images with
different ratios. For example, `/render/` declares its 1000×422 image as
1280×960 and uses generic walling alt text.

**Evidence**

- `src/lib/seo.ts:48-70`
- `src/app/[service]/page.tsx:35-40`
- Live `/render/` metadata

**Fix**

Use accurate dimensions and service-specific alt text, or create dedicated
1200×630 share images.

### 13. Contact hardening is still best-effort

**Area:** Security / reliability

Residual limitations:

- rate limit is process-local and resets/scales with serverless instances
- direct clients can omit `Origin`; browser-origin checks do not stop bots
- the 16 KiB post-read check uses UTF-16 string length, not UTF-8 bytes
- the full body is buffered before the application limit is applied
- Resend calls have no application timeout
- provider acceptance is treated as final delivery; no bounce webhook,
  correlation ID, or idempotency key

**Evidence**

- `src/app/api/contact/route.ts:22-147,190-243,305-392`

**Fix**

Use an atomic shared limiter and bot challenge, enforce a streaming byte limit,
add a provider deadline/idempotency key, and process signed delivery/bounce
webhooks.

### 14. Privacy policy and forms need a clearer collection notice

**Area:** Privacy / legal accuracy

The policy lists volunteered form fields but not temporary IP processing,
platform access logs, likely overseas provider processing, or practical
retention details. The forms have no adjacent privacy link/collection notice.

The policy is a good Australian-oriented baseline, but its express APP claim
should be reviewed by a qualified Australian professional.

**Evidence**

- `src/content/legal.ts:16-110`
- `src/app/api/contact/route.ts:104-147,330-357`
- `src/components/EnquiryFields.tsx:105-125`

### 15. Projects are a weak proof and organic-search asset

**Area:** Content / SEO / conversion

The projects route contains a six-image gallery, testimonials, and generic
CTA. Project records have only an image and alt text—no title, location,
service, material, scope, outcome, date, caption, or service link.

**Evidence**

- `src/app/projects/page.tsx:25-39`
- `src/content/site.ts:366-403`

**Fix**

Publish genuine case studies with contextual service links, locations,
materials, scope, constraints, and outcomes.

### 16. Generic money-page titles underuse local search intent

**Area:** SEO

Service titles/H1s are only “Cladding”, “Render”, “Hebel”, and “Walling”,
producing titles such as “Render — Elite Surface Group”.

**Fix**

Use natural descriptive titles such as “Rendering Services Adelaide”, without
keyword stuffing.

### 17. Automated accessibility checks do not exercise interactions

**Area:** Test coverage

`npm run a11y` loads each route and immediately runs axe. It does not open or
operate the drawer, submenu, quote dialog, lightbox, carousel, form states, or
hero controls.

The audit manually opened these components and found no current axe violations,
but the regression suite does not preserve that result.

**Evidence**

- `scripts/a11y-test.mjs:20-82`

### 18. Checks are not enforced in CI

**Area:** Engineering quality

The repository has strong local commands but no tracked workflow that runs
`check`, `smoke`, and `a11y` for pull requests. `package.json` also does not pin
Node through `engines` or a version file.

**Fix**

Add CI with a production server and Playwright browser install; pin the
supported Node/package-manager versions.

---

## Low

### 19. Desktop submenu uses an incomplete ARIA menu pattern

The submenu declares `menu` / `menuitem` but only implements Escape—not the
arrow/Home/End behavior users expect from that pattern. Escape also tries to
focus the mobile burger, which is hidden on desktop.

Use a normal navigation disclosure without menu roles, or implement the
complete ARIA menu keyboard pattern.

### 20. Generic forms preselect Cladding

Homepage and contact forms select the first service by default. Visitors who
are unsure may accidentally submit “Cladding”. Add “Select a service” or “Not
sure”.

### 21. Contextual legal references are not links

“Contact Us page”, `oaic.gov.au`, and “See our Privacy Policy” are plain text
because the legal content model supports only strings. Add link support to the
content model.

### 22. Retired WordPress junk redirects to an unrelated homepage

Default WordPress sample pages have no equivalent replacement. Returning
`404`/`410` is clearer than permanent redirects to `/`, which search engines may
treat as soft 404s.

### 23. Development-tool advisories remain

Full `npm audit` reports 9 high advisories through ESLint's `minimatch` /
`brace-expansion` chain. `npm audit --omit=dev` reports 0, so these are not in
the production bundle. Track compatible toolchain updates; do not force an
incompatible override.

### 24. Historical audit documents contain stale details

Examples:

- `MIGRATION-AUDIT.md` still describes year-long immutable image caching
- its “Still open” section still says UK legal copy is live
- prior check totals still reference 175 rather than 205
- `FULL-SCALE-AUDIT.md` overstates hero, submenu, 404, and interactive-a11y
  resolution status

This report supersedes those status claims.

---

## Verified strengths

### Architecture

- Typed content modules; no HTML mirror or Elementor runtime
- App Router with static generation for every public content route
- Dynamic service routes are fully enumerated and reject unknown params
- No third-party browser scripts, trackers, iframes, or remote images
- Self-hosted `next/font` with limited weights/subsets

### Security and privacy

- JSON-only contact endpoint
- same-origin / `Sec-Fetch-Site` checks
- honeypot, service allowlist, required fields, and field length caps
- HTML email values are escaped
- error logs omit submitted name, email, phone, and message
- CSP, HSTS, frame denial, nosniff, referrer and permissions headers live
- runtime dependency audit is clean

### Accessibility

- Zero axe violations on all 11 initial pages at desktop and mobile
- Skip link, semantic page structure, labels, autocomplete, visible focus
- Reduced-motion treatment
- Quote dialog, project lightbox, and mobile drawer use modal semantics and
  focus trapping
- Images have meaningful or explicitly empty alt text
- Footer contrast fix is live

### SEO

- Unique titles/descriptions on all valid routes
- Canonicals, OG URLs, sitemap URLs, breadcrumb and service schema all use
  apex HTTPS URLs with trailing slashes
- OG/Twitter cards are present
- Exactly one H1 on every public page
- Retired WordPress pages are excluded from sitemap
- Self-serving AggregateRating JSON-LD has been removed

### Performance

- Lighthouse 96–100
- CLS is low and TBT is 0–52ms in measured routes
- Production TTFB measured 196–383ms
- Static pages return Vercel edge hits
- CSS is about 25 KB source / 6.2 KB compressed
- No third-party request cost
- Image assets are WebP and served with a bounded one-week cache

---

## Prioritized remediation

### Immediate

1. Configure and end-to-end verify contact delivery; enable
   `REQUIRE_CONTACT_DELIVERY=1`.
2. Prevent no-JavaScript forms from submitting personal data via GET.
3. Redirect `www` permanently to apex.
4. Verify or qualify licence, insurance, warranty, guarantee, experience, and
   testimonial claims.

### Next release

5. Fix mobile LCP loading and lazy-load below-fold backgrounds/inactive hero
   slides.
6. Correct intrinsic image dimensions and service OG metadata.
7. Fix quote-dialog route prefill.
8. Add a persistent hero pause control and repair the active dot style.
9. Remove the homepage canonical from 404 output.
10. Correct or remove stale sitemap dates.
11. Add a form-adjacent privacy notice and obtain legal review.

### Backlog

12. Shared rate limiting, request byte streaming, provider timeout,
    idempotency, and delivery webhooks.
13. Project case studies and locally descriptive money-page titles.
14. Interactive Playwright/axe coverage and enforced CI.
15. Complete submenu keyboard pattern, contextual legal links, neutral default
    service, and stale-document cleanup.

