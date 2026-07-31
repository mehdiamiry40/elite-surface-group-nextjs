# Sitemap audit — 31 July 2026

Audit of `src/app/sitemap.ts`, live `/sitemap.xml`, `robots.txt`, legacy
WordPress sitemap redirects, and smoke coverage against public App Router pages.

## Verdict

**The sitemap is healthy.** All 19 public indexable pages are listed with apex
HTTPS URLs and trailing slashes; every live `<loc>` returns HTTP 200; retired
WordPress junk is excluded; legacy WP sitemap paths permanently redirect to
`/sitemap.xml`; `lastmod` is a current content-release stamp rather than stale
WordPress dates.

Remaining work from this pass is hygiene and regression coverage (priorities
made explicit; smoke now asserts the full sitemap URL set).

## Scope checked

| Surface | Result |
|---|---|
| `src/app/sitemap.ts` vs `src/app/**/page.tsx` + content slugs | 19/19 match |
| Live `https://elitesurfacegroup.com.au/sitemap.xml` | 200, 19 unique URLs |
| Live GET of every `<loc>` | 200 |
| Trailing slashes (`trailingSlash: true`) | All `<loc>` end with `/` |
| Apex host only | `elitesurfacegroup.com.au` (no `www`) |
| Retired WP routes in sitemap | Absent; live 404 |
| Legacy `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`, `/category-sitemap.xml`, `/wp-sitemap.xml` | 301/308 → `/sitemap.xml` |
| `robots.txt` `Sitemap:` pointer | Correct absolute URL |
| `CONTENT_LAST_MODIFIED` | `2026-07-31T12:00:00.000Z` for all entries |

## Expected / actual URL set (19)

1. `/`
2. `/about/`
3. `/services/`
4. `/cladding/`
5. `/render/`
6. `/hebel/`
7. `/walling/`
8. `/projects/`
9. `/projects/two-storey-exterior-render/`
10. `/projects/curved-rendered-wall-detail/`
11. `/projects/contemporary-exterior-cladding/`
12. `/projects/rendered-boundary-wall/`
13. `/projects/mixed-cladding-and-render-facade/`
14. `/projects/dark-feature-cladding/`
15. `/locations/`
16. `/locations/adelaide/`
17. `/contact-us/`
18. `/privacy-policy/`
19. `/terms-of-service/`

Excluded by design: `/api/contact/`, 404, `/llms.txt`, assets.

## Historical issues (already fixed on `main`)

Documented in earlier audits; confirmed resolved live and in source:

- WordPress starter pages were indexable and listed in the sitemap — removed
- Sitemap / JSON-LD omitted trailing slashes while the app used
  `trailingSlash: true` — fixed via `absoluteUrl()`
- Stale January–April WordPress `lastmod` values — replaced with
  `CONTENT_LAST_MODIFIED`

## Findings from this pass

### 1. Priority map omitted main-nav hubs (low)

**Area:** SEO hygiene

`PRIORITY` elevated `/services/` and `/contact-us/` but left `/about/` and
`/projects/` to the `0.8` default. Behaviour was correct; the map was
incomplete and easy to misread.

**Fix:** Make `/about/`, `/projects/`, and the Adelaide location landing
explicit; keep service detail pages at the commercial default (`0.8` unless
listed).

### 2. Smoke test under-covered project case studies (medium / testing)

**Area:** Regression coverage

`scripts/smoke-test.mjs` only GETted one project detail route and only asserted
that the smoke `ROUTES` list appeared in the sitemap. Five other project URLs
could drift out of the sitemap unnoticed.

**Fix:** Derive the expected sitemap path set from content modules and assert
an exact match against `/sitemap.xml`; include every project slug in smoke
`ROUTES`.

### 3. Uniform `changefreq` / `lastmod` (info)

Every URL uses `changeFrequency: "monthly"` and the same `lastModified`. That
is acceptable for a small static marketing site with typed content releases.
Per-URL dates would only help if content modules carried real update
timestamps — not worth inventing.

### 4. `robots.txt` `Host` includes scheme (info / out of scope)

Live robots emits `Host: https://elitesurfacegroup.com.au`. The non-standard
Host directive (mainly Yandex) usually expects a bare hostname. Google ignores
Host. Left unchanged; sitemap pointer is correct.

## Changes shipped with this audit

- `src/app/sitemap.ts` — explicit priorities for about, projects, Adelaide
- `scripts/smoke-test.mjs` — full public route list + exact sitemap URL-set check
- this document
