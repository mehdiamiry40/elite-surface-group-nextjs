# Audit remediation — 5 September 2026

This change addresses the full-scale audit of production commit
`4efb90baf3be5da65ae042ce43cac1ef669d14d5`.

## Implemented

- Five-minute Vercel retry scheduling, bounded draining of up to 30 records and
  atomic owner-fenced cleanup of expired, incomplete and already-settled queue
  members. A newer valid record cannot be starved by the old first-three entries.
- Persisted worker, backlog and signed-delivery health, plus fixed-recipient
  synthetic probes through the real encrypted outbox and webhook correlation.
- Protected, customer-data-free failure notifications with an explicit
  `CONTACT_ALERT_TO_EMAIL` recipient and immutable provider idempotency per
  issue-set/hour. A separate GitHub watchdog reads state independently.
- Bounded incident acknowledgement through an atomically observed Redis sequence.
  Independent review reproduced a timestamp acknowledgement race during
  development; the corrected sequence contract preserves delayed/new incidents
  and recurring failures. Real Redis regression tests cover that boundary.
- Required local-rule Semgrep, checksum-verified Gitleaks, full dependency audit
  and real Redis tests in CI, with daily security checks. `verify` explicitly
  fails when prerequisite security checks fail instead of becoming skipped.
- Responsive measured header offsets with no-JavaScript fallbacks; a shorter
  three-guide homepage selection; accurate storage/telemetry privacy wording;
  neutral illustration captions; four article-specific social cards and alt text.

## Verified before publication

| Check | Result |
|---|---|
| TypeScript / ESLint / unit tests | Passed; 78 unit tests |
| Production build / bundle budget | Passed; all 24 bundle-stat rows below 575,000 bytes |
| Actual Redis expiry, races and delivery correlation | 12 integration tests passed |
| Independent corrected acknowledgement proof | 2 additional real Redis tests passed |
| Local smoke | 1,044 checks across 30 routes and 71 images |
| Browser enquiry / analytics | Passed; recovery, stable identity, focus, no-JS and URL redaction |
| Accessibility | 67 axe runs, 2 service-area layout and 15 anchor checks passed |
| Final source Semgrep | 7 rules, 107 targets, no findings; new alert/status/health modules included |
| Secret scanning | No leaks in staged source; separate complete 138-commit history scan passed |
| Scanner detection fixtures | 7 Semgrep rule pairs and a nonfunctional Gitleaks token detected as intended |

The final minor privacy wording and resource archive prefetch adjustment received
a fresh build and smoke/enquiry run after the full layout/accessibility pass.
The change did not modify responsive geometry after that pass. Hosted CI remains
required on the exact final commit; local checks do not replace it.

Reproduce with `npm ci`, `npm run check`, `npm run contact-redis-test`, then
`npm run smoke`, `npm run analytics-test`, `npm run enquiry-test` and
`npm run a11y` against `npm run start`. Set `REDIS_SERVER` when the executable is
not on PATH. CI installs Redis and Chromium. The security workflow contains the
pinned scanner commands and proof fixtures.

## Account controls and activation

On 5 September, Vercel's imported GitHub `verify` check and native Lint/TypeCheck
were saved as **Blocking** for Production and read back. GitHub vulnerability
alerts and automated security fixes were enabled and read back. Private-repository
code/secret protection entitlement was not purchased; the committed CI scanners
provide explicit first-party coverage without uploading source to a hosted service.

After production release, verify the exact-commit gate, initial worker heartbeat,
one fixed synthetic signed delivery and at least two natural five-minute worker
runs. Continue observing cadence for seven days before claiming that window.
See [OPS.md](../OPS.md) for response ownership, bootstrap and rollback.

## Outstanding owner inputs and limits

- Supply and verify the contractor licence name/number before publication. No
  credential or project-photo provenance was invented.
- Confirm `CONTACT_ALERT_TO_EMAIL` and controlled operator receipt. The alert
  path remains unconfigured until an address is supplied; a successful email API
  result is not Inbox/Spam placement or human viewing.
- New monitoring indexes do not backfill previously accepted/terminal enquiries.
  Record a cutover baseline and reconcile historical metadata separately.
- Resend outages can also block alert email; GitHub schedules and low-volume
  platform anomaly alerts do not provide a firm external notification deadline.
- No production customer enquiry was submitted by the local test suites. New
  workflows retain the fixed Resend simulated-recipient probe boundary.
