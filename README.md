# Elite Surface Group — Next.js migration

This repository contains the Next.js migration of
[elitesurfacegroup.com.au](https://elitesurfacegroup.com.au/). It preserves the
live site’s public pages, content, imagery, responsive presentation, navigation,
quote popup, project lightbox behaviour, and contact forms while removing the
WordPress runtime dependency.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Refreshing the source snapshot

The migration includes an idempotent snapshot tool for authorised future
refreshes from the source website:

```bash
npm run snapshot:source
```

It rebuilds `src/content/site-pages.json` and the first-party asset mirror in
`public/mirror`.

## Contact-form delivery

Without email credentials, submitted forms fall back to the visitor’s email
application and address the message to Elite Surface Group. For direct delivery
from the deployed site, copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (a sender on a verified domain)
- `CONTACT_TO_EMAIL`

The same variables can be added to the Vercel project settings.

## Production checks

```bash
npm run check
npm run smoke
npm audit
```

Run `npm run smoke` while the local server is active. It checks every captured
route and mirrored asset, legacy WordPress URL compatibility, sitemap endpoints,
and the guarded contact endpoint.

The app is configured for Vercel and uses trailing-slash URLs to preserve the
source website’s route structure.
