<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a self-contained Next.js 16 (App Router) + React 19 marketing site. There is
no database or backend service to run — all content lives in typed modules under
`src/content/`. Node is pinned by `.nvmrc` (22.14.0) and the VM already matches it.

Standard commands are documented in `README.md` and `package.json` scripts; use those
rather than duplicating them. Key ones: `npm run dev` (dev server on port 3000),
`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check`.

Non-obvious caveats for running/testing here:

- The browser suites (`smoke`, `analytics-test`, `enquiry-test`, `a11y`) drive a real
  Chromium via Playwright. Chromium is installed once by the update script. Always run
  them with `PLAYWRIGHT_CHROMIUM_PATH` pointing at Playwright's binary so they reuse it
  instead of re-downloading:
  `export PLAYWRIGHT_CHROMIUM_PATH=$(node -e "console.log(require('playwright').chromium.executablePath())")`
- `analytics-test` and `smoke` assume a production-mode server: the Vercel analytics
  script only injects in a production build, so run them against `npm run build` +
  `npm run start` (as CI does), not against `next dev`. Point any suite at a chosen
  server with `SMOKE_BASE_URL=http://localhost:PORT`. `enquiry-test` mocks the API and
  passes against dev too.
- Contact-form email delivery (Resend) is intentionally optional. Without
  `RESEND_API_KEY` the `/api/contact` endpoint returns HTTP 503 with a graceful
  "email delivery is unavailable" message plus a `mailto:` fallback — this is the
  correct designed behavior in dev, not a bug. Set `RESEND_API_KEY` in `.env.local`
  only if you need to exercise the successful "enquiry sent" path.
- `npm run build`/`prebuild` prints a loud "CONTACT FORM CANNOT DELIVER EMAIL" warning
  when `RESEND_API_KEY` is unset. It is only a warning locally; it fails the build only
  for Vercel Production or when `REQUIRE_CONTACT_DELIVERY=1`.
- `next dev` regenerates `AGENTS.md` and `CLAUDE.md` (the `nextjs-agent-rules` block).
  This is expected; committing them keeps the working tree clean.
