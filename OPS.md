# Elite Surface Group operations runbook

This runbook covers the production website and its revenue-critical enquiry
path. The priority is to detect and recover from failures before a visitor's
enquiry is lost.

## Production signals

| Signal | Healthy state | Where to check |
| --- | --- | --- |
| Website | `/` returns HTTP 200 and the Elite Surface Group page | Production synthetic monitor in GitHub Actions |
| Readiness | `/api/health/` returns HTTP 200 with `status: ready` | Browser, synthetic workflow, or Vercel runtime logs |
| Contact acceptance | `contact.resend.accepted` | Vercel runtime logs |
| Recipient-server delivery | `contact.resend.webhook.delivered` | Vercel runtime logs and Resend Webhooks |
| Field performance | LCP, INP and CLS populate after real visits | Vercel Speed Insights |

`email.delivered` means the recipient's mail server accepted the message. It
does not prove that a person saw it or that it avoided the spam folder.

## Required production configuration

- `RESEND_API_KEY`: domain-restricted sending key.
- `RESEND_WEBHOOK_SECRET`: signing secret for the production Resend webhook.
- `CONTACT_MONITOR_TOKEN`: long random token used only by the authenticated
  synthetic submission.
- GitHub Actions secret `CONTACT_MONITOR_TOKEN`: exactly the same monitor token
  as the Vercel Production value.
- GitHub Actions secret `CRON_SECRET`: exactly the same retry token as the
  Vercel Production value.
- Durable outbox group: set all four or none — `UPSTASH_REDIS_REST_URL`,
  `UPSTASH_REDIS_REST_TOKEN`, `CONTACT_OUTBOX_ENCRYPTION_KEY` (base64 for 32
  random bytes), and `CRON_SECRET` (at least 32 characters).

The readiness endpoint reports `degraded` and HTTP 503 when contact delivery,
the durable outbox, delivery-event verification, or the synthetic-monitor token
is unconfigured. It reports only component state, never a secret value.

## Durable enquiry outbox

When the complete outbox group is configured, each validated enquiry is stored
encrypted before delivery. The provider email ID is mapped back to the opaque
submission ID so signed webhook outcomes can update the same record without
logging customer details.

Retention is deliberately bounded:

- pending encrypted payload and status metadata: 30 days;
- terminal encrypted payload after acceptance/failure/outcome: 7 days;
- terminal status/correlation metadata: up to 30 days.

Retryable provider failures are scheduled after approximately 1 minute, 5
minutes, 15 minutes, then hourly. At most six delivery attempts are made and no
automatic attempt starts beyond 23 hours, staying inside Resend's 24-hour
idempotency window. Exhausted or expired records move to `manual_review` and
must not be blindly resent.

The worker endpoint is:

`https://elitesurfacegroup.com.au/api/internal/contact-retry/`

It requires `Authorization: Bearer <CRON_SECRET>` and processes at most three
due submissions per invocation. `.github/workflows/contact-retry.yml` calls it
hourly at 43 minutes past the hour and fails visibly on any non-2xx response.
The workflow becomes operational only after the matching GitHub Actions secret
is configured; until then, queued records remain durable but are not retried.

For `manual_review`, use the submission ID to check the outbox metadata and the
matching Resend email ID/event. Establish whether Resend already accepted the
message before any manual send; record the decision and delete/export data only
under the stated retention and privacy policy.

## Resend webhook

Register this production endpoint in the existing Resend account:

`https://elitesurfacegroup.com.au/api/webhooks/resend/`

Subscribe to:

- `email.delivered`
- `email.delivery_delayed`
- `email.failed`
- `email.bounced`
- `email.complained`
- `email.suppressed`

Copy the endpoint signing secret into `RESEND_WEBHOOK_SECRET` in Vercel
Production, redeploy, then replay one delivered event from the Resend dashboard.
The handler verifies the raw request and Svix headers before processing it.
Resend delivery is at least once and not ordered; use the logged `providerEventId`
when identifying duplicate replays.

The application logs only event type, provider event ID, Resend email ID,
timestamp, safe category/status, and internal submission correlation when
available. Never add recipient addresses, visitor details, subject lines,
message text, raw webhook bodies, signing headers, or secrets to logs.

## Log events and response priority

| Event | Level | Response |
| --- | --- | --- |
| `contact.delivery_unconfigured` | error | Treat as urgent: production cannot accept normal enquiries. |
| `contact.outbox.unavailable` | error | Delivery fell back to direct Resend; check Upstash before the next provider failure. |
| `contact.outbox.queued` | error | The encrypted enquiry is safe but awaiting an automatic retry. |
| `contact.outbox.delivery_deferred` | error | The persisted record could not complete its current attempt; check the retry workflow. |
| `contact.resend.failed` | error | Check Resend status/key/domain and retry the durable submission if present. |
| `contact.resend.webhook.failed` | error | Check provider reason, quota, domain and key status. |
| `contact.resend.webhook.bounced` | error | Confirm recipient mailbox health and inspect the event in Resend. |
| `contact.resend.webhook.complained` | error | Confirm whether the event belongs to a real enquiry or synthetic test. |
| `contact.resend.webhook.suppressed` | error | Inspect the account suppression list before retrying. |
| `contact.resend.webhook.persistence_failed` | error | Check Upstash; Resend receives 503 and retries the event. |
| `contact.resend.webhook.delivery_delayed` | warning | Watch for a later delivered or failed event. |
| `contact.analytics.failed` | warning | Lead delivery can still be healthy; investigate measurement separately. |

In Vercel, open the production deployment's Runtime Logs and search the exact
event name. From a linked local checkout, recent errors can also be inspected
with `vercel logs <production-url> --level error --since 1h`.

The synthetic and retry workflows provide failure notifications for the two
scheduled paths. Real bounce/complaint alerts still require a Vercel log alert,
drain, or external alert destination; do not treat runtime logging alone as
instant paging.

Routine unknown-path traffic can currently produce Next.js
`Internal: NoFallbackError` messages while still returning the intended custom
404. Do not page on that message alone; correlate it with an unexpected 5xx or
failed user flow.

## Synthetic monitor

`.github/workflows/synthetic-monitor.yml` runs at 08:17 and 20:17 UTC and can
also be started manually. It checks the homepage, readiness endpoint, and the
authenticated `/api/internal/contact-monitor/` route, which sends only a fixed
payload to Resend's safe delivered-test address. It does not send a test message
to the sales inbox.

GitHub schedules can be delayed and are not an availability SLA. Enable GitHub
Actions notifications for failed workflows. A failure should be investigated
the same business day; a contact/readiness failure is urgent.

To reproduce locally against production without printing the token:

```bash
CONTACT_MONITOR_TOKEN=... node scripts/synthetic-monitor.mjs
```

## Deployment verification

Before promotion:

```bash
npm ci
npm run check
```

After production is ready:

```bash
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run smoke
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run analytics-test
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run a11y
CONTACT_MONITOR_TOKEN=... node scripts/synthetic-monitor.mjs
```

Then confirm:

1. no new production error logs;
2. the synthetic `contact.resend.accepted` event has an email ID;
3. a matching `contact.resend.webhook.delivered` event arrives;
4. Speed Insights starts receiving field data after real visits.

Speed Insights availability and billing depend on the Vercel plan. Confirm the
dashboard price before enabling a charge. The code mount alone does not replace
that account-level check.

## Incident recovery and rollback

1. Capture the deployment ID, first failure time, affected event name, and any
   safe request/submission/email IDs. Do not copy visitor content into an issue.
2. Check Vercel Runtime Logs and the corresponding Resend event.
3. If the failure began with the latest deployment, use the Vercel deployment
   menu to roll back the production aliases to the last verified deployment.
4. Rerun production smoke, analytics, readiness and the synthetic monitor.
5. Confirm a matching accepted and delivered synthetic event.
6. Preserve affected durable submissions for retry; do not manually resend an
   enquiry unless its provider state is known, or it may be duplicated.
7. Record the cause, recovery time and preventive follow-up without personal
   information.

If rollback cannot restore contact delivery, keep the published phone and email
paths available, investigate the Resend account/domain/key, and treat the form
as unavailable until the synthetic delivery path passes again.
