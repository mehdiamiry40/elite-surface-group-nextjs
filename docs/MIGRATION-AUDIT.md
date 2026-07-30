# Migration audit — elitesurfacegroup.com.au → Next.js

> **Status: superseded by the component rebuild.**
>
> This document audited the first migration pass (commit `3b8b119`), which
> wrapped a static mirror of the WordPress HTML in a Next.js shell. That
> architecture has since been replaced by a real component rebuild, and all
> but two of the findings below are resolved. See
> [Resolution](#resolution) at the end for the item-by-item status.
>
> The findings are kept as written — they are the reasoning that motivated the
> rebuild, and the two open items still need a decision.

Audited commit `3b8b119` on `claude/elitesurfacegroup-migration-audit-8heq2y`.
Next.js 16.2.12 / React 19.2.8 / Node 22.

Everything below was verified by running the code: `npm run check` (typecheck +
build), `npm run smoke`, and a headless Chromium pass over `/`, `/about/`,
`/services/`, `/cladding/`, `/projects/` and `/contact-us/` at 1440×900 and
390×844.

---

## Verdict

The migration **works**. Build is clean, all 15 routes return 200, the smoke
suite passes (15 routes, 110 assets, legacy-URL compatibility, guarded contact
endpoint), and visual fidelity against the source design is high — hero
carousel, service cards, icon rows, dark "Experts In" band, testimonial
carousel, gallery lightbox, mobile menu and quote popup all render and behave
correctly. URL rewriting was done thoroughly: **zero** absolute
`elitesurfacegroup.com.au` references remain in the captured HTML, and every
WordPress `<script>` was stripped.

What it is *not* is a Next.js rebuild. It is a **high-fidelity static mirror of
the WordPress output**, wrapped in a Next.js shell. That distinction drives most
of what follows.

---

## The architectural finding

All 15 pages live as pre-rendered HTML strings inside a single 845 KB JSON file
(`src/content/site-pages.json`), injected wholesale via
`dangerouslySetInnerHTML`:

```tsx
// src/app/[[...slug]]/page.tsx:105
<div className="esg-source-page" dangerouslySetInnerHTML={{ __html: page.html }} />
```

There is exactly one React route handler; `SourceInteractions.tsx` (937 lines)
then re-implements the stripped WordPress JavaScript — lazy-image
materialisation, the Elementor popup, a hand-written Swiper replacement, the
`wp-responsive-menu` hamburger, and a gallery lightbox — by reaching into that
injected DOM with `querySelectorAll` and manual `addEventListener`/cleanup
pairs.

**What this buys you:** WordPress, PHP, MySQL and the plugin attack surface are
gone. Hosting is static. The visual result is faithful.

**What it costs you:**

- **Content is no longer editable.** Changing a headline means hand-editing a
  minified HTML string inside an 845 KB JSON blob, or re-scraping the WordPress
  site — which must therefore stay alive, defeating much of the point.
- **The styling is coupled to Elementor's generated class names**
  (`.elementor-element-9dfec35`). Any real redesign means starting over.
- **`SourceInteractions.tsx` is coupled to Elementor's DOM and to specific
  generated field IDs.** The contact form maps
  `form_fields[field_44c7fb9]` → last name, `form_fields[field_4f00a29]` →
  phone, `form_fields[field_5a03240]` → service
  (`SourceInteractions.tsx:42-69`). Re-snapshotting after any Elementor form
  edit silently renames these and the fields go blank — with no test to catch
  it.
- **No client-side routing.** Because navigation is raw `<a href>` inside
  injected HTML, every internal link is a full document load (verified: 1 full
  navigation per click). Each load re-downloads a ~200–350 KB stylesheet.

**Recommendation:** treat this as a *transitional* checkpoint, not the finished
product. It is a good way to get off WordPress today. Plan a page-by-page
rebuild into real components (there are only ~11 real pages, sharing perhaps 6
section types) with content in MDX or a headless CMS. Start with
`/contact-us/` and `/services/`, which are the simplest and highest-value.

---

## Findings

Severity reflects business impact, not effort.

### 🔴 High

#### 1. The "Call Now" phone links dial a placeholder number

Carried over verbatim from the source site. The header button **displays**
`0413 844 912` but links to `tel:0400 000 000`:

```html
<a class="elementor-button..." href="tel:0400%20000%20000">
  <span class="elementor-button-text">0413 844 912</span>
```

Present on **all 15 routes**. The hero "Call Now" button is worse — it points at
`tel:04000000000`, an invalid 11-digit number. The footer contact block has the
same display/link mismatch.

Four distinct numbers appear across the site: `0413 844 912` (correct),
`0413844912`, `0400 000 000`, `04000000000`.

This is a pre-existing WordPress defect, not one the migration introduced — but
every mobile visitor who taps to call reaches a dead number, and the migration
is the natural moment to fix it. Normalise every `tel:` href to
`tel:+61413844912`.

#### 2. The contact form silently sends nothing until Resend is configured

`src/app/api/contact/route.ts:222` — with `RESEND_API_KEY`,
`CONTACT_FROM_EMAIL` or `CONTACT_TO_EMAIL` unset, the endpoint returns **503**
plus a `mailto:` URL, and the client does `window.location.href = result.mailto`
(`SourceInteractions.tsx:122`).

Verified live: `POST /api/contact/` → `503` with a `mailto:` payload.

On a visitor with no configured mail client (most mobile browsers, most webmail
users) this opens nothing and the enquiry is lost. The failure is invisible to
the site owner — no bounce, no log, no alert.

Set the three env vars *before* DNS cutover, and add a deploy check that fails
the build when they are missing in production.

#### 3. WordPress starter junk is live and indexable

Four routes were migrated and are marked `index: true`:

| Route | In sitemap? |
|---|---|
| `/sample-page/` | yes |
| `/2026/01/28/hello-world/` | yes |
| `/category/uncategorized/` | yes |
| `/author/admin/` | no |

`generateMetadata` sets `robots: { index: true, follow: true }` for *every*
route unconditionally (`[[...slug]]/page.tsx:75`), and `sitemap.ts` includes the
first three.

`/sample-page/` still contains a `wp-admin` reference and reads *"This is an
example page."*; `/2026/01/28/hello-world/` reads *"Welcome to WordPress. This is
your first post."* and pulls an avatar from `secure.gravatar.com`.

Delete all four from `ROUTE_PATHS`, the sitemap and `SOURCE_LAST_MODIFIED`, and
add 410 (or 301 to `/`) responses.

#### 4. No security headers

A page response carries only `x-nextjs-*`, `Cache-Control` and `Content-Type`.
Missing: `Content-Security-Policy`, `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`,
`Strict-Transport-Security`, `Permissions-Policy`.

> **Do not spot-check this on a protected preview URL.** While Vercel
> deployment protection is enabled, the SSO gateway injects its own
> `strict-transport-security`, `x-frame-options: DENY` and
> `x-robots-tag: noindex` *before* the request reaches the app — so the
> deployment looks protected when the application sets nothing. Confirm
> against the production domain, or a preview with protection disabled.

`X-Content-Type-Options: nosniff` interacts with finding #6 — add it *after*
fixing the MIME mismatch, or the images will break.

Add a `headers()` block in `next.config.ts`. A CSP is realistic here precisely
because all WordPress inline scripts were stripped; the only external origins
are `fonts.googleapis.com`, `fonts.gstatic.com` and `secure.gravatar.com`.

---

### 🟠 Medium

#### 5. Every form submission takes a wasted redirect round trip

`trailingSlash: true` applies to API routes too. The client posts to
`/api/contact` (`SourceInteractions.tsx:98`) and gets a **308** to
`/api/contact/`. Verified:

```
POST /api/contact   → 308
POST /api/contact/  → 503 (handler reached)
```

`fetch` follows it, so it works — but it doubles latency on the site's primary
conversion action and is fragile through proxies that mishandle redirected
POSTs. Either post to `/api/contact/`, or set
`skipTrailingSlashRedirect: true`.

#### 6. 68 of 76 raster assets are WebP data with `.png` / `.jpg` extensions

`scripts/snapshot-source.mjs:709` requests assets with
`Accept: ...image/webp...`. SiteGround's optimiser honours it and returns WebP
bytes, which the script writes to the original filename unchanged:

```
public/mirror/wp-content/uploads/2026/01/title-img.png  →  actual: image/webp
public/mirror/wp-content/uploads/2026/01/banner.jpg     →  actual: image/webp
```

Next.js serves `Content-Type` from the file extension, so these go out as
`image/png` / `image/jpeg` with WebP payloads. Chromium sniffs and renders them
(confirmed — no user-visible breakage today), but this will bite:

- `next/image` and any Sharp-based CDN transform will reject them;
- `X-Content-Type-Options: nosniff` (finding #4) would break every one;
- strict consumers — some social crawlers, email clients, image proxies — fail.

Fix in the snapshot script, either by requesting the original format
(`Accept: image/png,image/jpeg,*/*`) or by naming files `.webp` and rewriting
references in HTML *and* CSS.

#### 7. ~2.9 MB of duplicated CSS, 349 KB of it render-blocking

- `public/mirror/_inline/` holds **15 files that are byte-identical**
  (`md5 2fd3379a…`, 16,495 bytes each). 231 KB of the 247 KB is pure duplication.
- `siteground-optimizer-assets/` holds **11 near-identical stylesheets**,
  200–350 KB each, 2.7 MB total — one per page, differing only in the
  per-page Elementor rules appended to a shared bundle.

The homepage blocks render on a **349 KB** unminified stylesheet. Because
navigation is a full page load (see architecture note), a visitor browsing four
pages downloads four ~250 KB stylesheets.

Deduplicate to one shared bundle plus a small per-page delta, and minify. This
is the single largest performance win available without touching the
architecture.

#### 8. Homepage ships 1.5 MB of images; one PNG is 1.4 MB

`cladding.png` is **1,377 KB** and renders at **274×350** — roughly 60× the
pixels needed. Responsive variants (`cladding-300x200.png`,
`cladding-768x512.png`) exist in the mirror but the service card uses the
full-size original.

Measured totals (Chromium, cold cache): `/` 2.66 MB over 34 requests,
`/cladding/` 2.32 MB, `/about/` 1.89 MB.

Point the markup at the existing size variants; longer term, serve through
`next/image` (which requires finding #6 fixed first).

#### 9. Static assets are served with `Cache-Control: public, max-age=0`

Both `/mirror/...` and the `/wp-content/...` rewrite return `max-age=0`, so all
12 MB of content-addressable assets revalidate on every navigation.

The project sets no `Cache-Control` for `/mirror/*`, so Next.js's `public/`
default applies — measured against `next start` locally. Vercel's CDN adds edge
caching on top, but the origin header still drives browser revalidation, and the
fix is the same either way: add an explicit long-lived, immutable
`Cache-Control` for `/mirror/*` via `headers()`. (Production headers could not
be measured from the audit environment — see the note under finding #4.)

#### 10. The rate limiter does not survive serverless

```ts
// route.ts:19
const requestBuckets = new Map<string, number[]>();
```

Process-local state. On Vercel each concurrent instance keeps its own map, so
the effective limit is `6 × instances` and resets on every cold start. The map
also has no eviction — it grows unboundedly for the lifetime of a warm
instance.

The limiter does work as written (verified: 7th request in the window → 429). It
just doesn't do what it looks like it does in production. Use a shared store
(Vercel KV / Upstash) or accept it as best-effort and document that.

`clientKey` also trusts the first `x-forwarded-for` entry, which a client can
spoof; prefer the platform-provided IP.

---

### 🟡 Low

#### 11. Three identical `<h1>` elements on the homepage

All three read *"SA's Leading Experts in Walling Installations & Finishes"* —
Elementor's desktop/tablet/mobile duplicates, all present in the DOM with only
CSS hiding two. Inherited from source. Keep one; drop the hidden duplicates
during snapshot post-processing.

#### 12. Images are effectively invisible to search and screen readers

40 of 41 `<img>` on the homepage have `alt=""`. Empty alt is correct for the
decorative icons, but not for the four service cards (`cladding.png`,
`render.png`, `hebel.png`, `walling.png`).

Worse, the six project photos on `/projects/` are rendered as **CSS
background-images** (`.e-gallery-image`), so they carry no alt text and cannot
carry any — invisible to assistive tech and to image search, on the page most
likely to attract it.

#### 13. Four routes have an empty meta description

`/services/`, `/contact-us/`, `/category/uncategorized/`, `/author/admin/` — the
first two are real commercial pages. `generateMetadata` passes `description: ""`
straight through.

#### 14. Structured data makes two claims that are no longer true

In the JSON-LD `@graph`:

- `"inLanguage": "en-US"` contradicts `<html lang="en-AU">`
  (`layout.tsx:36`) — and the site is Australian.
- A `SearchAction` advertises `https://elitesurfacegroup.com.au/?s={search_term_string}`.
  WordPress search no longer exists; `/?s=cladding` returns **200 with the
  homepage**, so the endpoint looks functional while silently ignoring the
  query. Remove the `SearchAction` or implement real search.

`legalName: "Nemat Safari"` on a `HomeAndConstructionBusiness` is also worth a
look — that reads like a person, not the trading entity.

#### 15. Google Fonts loaded from a third-party origin, per page

Each route pulls three separate stylesheets from `fonts.googleapis.com`, each
requesting **18 weight/style combinations** of Roboto, Roboto Slab and PT Sans.
That is render-blocking on an origin you do not control, plus an EU-visitor
privacy consideration. `next/font` self-hosts and subsets these; the site
appears to use ~4 of the 54 requested variants.

#### 16. The 404 page has no site chrome

`not-found.tsx` is a bare inline-styled page — no header, nav, logo or footer, so
a mistyped URL becomes a dead end that looks unrelated to the brand.

#### 17. No linting and no test framework

No ESLint (`eslint-config-next` absent, no `lint` script), no Prettier, no unit
or E2E test runner. `scripts/smoke-test.mjs` is genuinely good — it catches
unmaterialised lazy images, blocked Elementor backgrounds, broken routes and
missing assets — but it needs a running server and is the project's only
automated check.

At minimum add `eslint-config-next` and wire `npm run lint` into `check`. The
`SourceInteractions` field mapping (finding, architecture note) deserves a real
regression test.

#### 18. Migration scaffolding left in the repo

`.gitignore` still excludes `/work/` and `/outputs/` from the migration tooling.
The 110-file, 12 MB asset mirror is committed (8.04 MiB packed) — workable, but
consider whether binaries belong in Git long-term.

---

## Prioritised plan

**Before DNS cutover**

1. Fix every `tel:` link → `tel:+61413844912` (#1)
2. Configure Resend env vars; fail the build if absent in production (#2)
3. Delete the four WordPress starter routes and de-index them (#3)
4. Add security headers (#4)
5. Post to `/api/contact/` to drop the 308 (#5)
6. Fill in the two missing commercial meta descriptions (#13)

**First fortnight**

7. Fix the snapshot script's WebP/extension mismatch and re-snapshot (#6)
8. Deduplicate and minify CSS (#7) — biggest performance win
9. Add immutable caching for `/mirror/*` (#9)
10. Point service cards at existing image size variants (#8)
11. Self-host fonts with `next/font` (#15)
12. Add ESLint (#17)

**Backlog**

13. Alt text on service cards; convert the `/projects/` gallery to real
    `<img>` elements (#12)
14. Drop the duplicate `<h1>`s (#11)
15. Correct the JSON-LD language and remove the dead `SearchAction` (#14)
16. Brand the 404 page (#16)
17. Move rate limiting to a shared store, or document it as best-effort (#10)

**Strategic**

18. Begin the component rebuild, `/contact-us/` and `/services/` first, and
    move content into MDX or a headless CMS so the WordPress source can be
    retired for good.

---

## Verification commands

```bash
npm ci
npm run check     # typecheck + production build
npm run start &   # smoke needs a live server
npm run smoke     # 15 routes, 110 assets, legacy URLs, contact endpoint
```

---

## Resolution

The architecture finding was addressed by rebuilding the site as React
components: content moved into `src/content/site.ts` and `src/content/legal.ts`,
the 845 KB HTML blob and the 937-line DOM-manipulation layer were deleted, and
2.9 MB of Elementor CSS was replaced by a ~23 KB hand-written stylesheet. The
four WordPress starter routes were dropped.

| # | Finding | Status |
| --- | --- | --- |
| — | HTML mirror architecture | **Fixed** — real components, content in typed modules |
| 1 | Placeholder `tel:` links | **Fixed** — one `business.phone` constant; smoke test enforces it |
| 2 | Contact form silently sends nothing | **Partly fixed** — `prebuild` warns when Resend vars are missing; set `REQUIRE_CONTACT_DELIVERY=1` to fail the build. The fallback path logs an error. See `docs/FULL-SCALE-AUDIT.md` #1 for the live-site status. |
| 3 | WordPress starter pages indexable | **Fixed** — routes deleted, 301 to `/`, out of the sitemap |
| 4 | No security headers | **Fixed** — CSP, nosniff, Referrer-Policy, X-Frame-Options, HSTS, Permissions-Policy |
| 5 | 308 redirect on every form post | **Fixed** — client posts to `/api/contact/` |
| 6 | WebP data behind `.png`/`.jpg` | **Fixed** — all imagery normalised to `.webp`; 75 legacy URLs 301 to the new paths |
| 7 | ~2.9 MB duplicated CSS | **Fixed** — single ~23 KB stylesheet |
| 8 | Oversized images | **Fixed** — `next/image`; the 1.4 MB `cladding.png` is now a 127 KB WebP source |
| 9 | `max-age=0` on static assets | **Fixed** — `/images/*` is `max-age=31536000, immutable` |
| 10 | Rate limiter ineffective on serverless | **Partly fixed** — now bounded and evicts stale keys, and documented as best-effort. A shared store is still the real answer |
| 11 | Three duplicate `<h1>` | **Fixed** — smoke test asserts exactly one per page |
| 12 | Missing alt text | **Fixed** — every image has meaningful or explicitly empty alt; the projects gallery uses real `<img>` |
| 13 | Empty meta descriptions | **Fixed** — every page has one; asserted in the smoke suite |
| 14 | JSON-LD errors | **Fixed** — `en-AU`, dead `SearchAction` removed, `legalName` dropped |
| 15 | Third-party Google Fonts | **Fixed** — `next/font` self-hosts PT Sans + Roboto Slab |
| 16 | Bare 404 page | **Fixed** — full site chrome, nav and a call link |
| 17 | No linting or tests | **Fixed** — ESLint wired into `npm run check`; smoke suite grown from 1 assertion to 175 |
| 18 | Migration scaffolding | **Fixed** — snapshot script and mirror removed; `public/` 12 MB → 3.0 MB |

### Measured effect

Cold-cache transfer at 1440×900, measured the same way before and after:

| Route | Before | After |
| --- | --- | --- |
| `/` | 2.66 MB | 0.61 MB |
| `/about/` | 1.89 MB | 0.33 MB |
| `/cladding/` | 2.32 MB | 0.20 MB |
| `/projects/` | 1.72 MB | 0.23 MB |

Request count rose (34 → 66 on `/`) because the App Router splits JavaScript
into more chunks than the mirror's single bundle; they are small, cacheable and
multiplexed over HTTP/2.

`/contact-us/` went the other way — 0.06 MB → 0.24 MB — because the WordPress
version of that page contained no form and no contact details at all, only a
banner and the closing CTA. It now has both.

### Still open

- **#2 / contact delivery.** Build-time enforcement is opt-in via
  `REQUIRE_CONTACT_DELIVERY=1`. Confirm the three Resend vars are set in
  Production before treating the form as live.
- **#10 — hard rate limiting.** The throttle is per-instance by design. A real
  limit needs Vercel KV or Upstash.
- **The legal pages cite UK law** (Data Protection Act 1998; "the laws of
  England, Northern Ireland, Scotland and Wales") on a South Australian
  business. The text is preserved verbatim and needs review by someone
  qualified — rewriting it is not a developer's call.

For the current production posture, see [`FULL-SCALE-AUDIT.md`](./FULL-SCALE-AUDIT.md).
