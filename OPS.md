# Elite Surface Group operations runbook

This runbook covers the production website and its revenue-critical enquiry
path. The priority is to detect and recover from failures before a visitor's
enquiry is lost.

## Production signals

| Signal | Healthy state | Where to check |
| --- | --- | --- |
| Website | `/` returns HTTP 200 and the Elite Surface Group page | Independent GitHub delivery watchdog |
| Configuration | `/api/health/` returns HTTP 200 with `status: ready` | Public endpoint; configuration shape only |
| Durable delivery health | Protected `/api/internal/contact-status/` returns `ok: true` | Worker heartbeat, queue age and delivery reconciliation |
| Operator notification | `notificationsConfigured: true` and a received controlled alert | Explicit operator mailbox and Resend event; not configuration alone. `false` is a watchdog warning annotation, not a run failure |
| Contact acceptance | `contact.resend.accepted` | Vercel runtime logs |
| Recipient-server delivery | `contact.resend.webhook.delivered` | Vercel runtime logs and Resend Webhooks |
| Field performance | LCP, INP and CLS populate after real visits | Vercel Speed Insights |

`email.delivered` means the recipient's mail server accepted the message. It
does not prove that a person saw it or that it avoided the spam folder.

## Required production configuration

- `RESEND_API_KEY`: domain-restricted sending key.
- `RESEND_WEBHOOK_SECRET`: signing secret for the production Resend webhook.
- `CONTACT_MONITOR_TOKEN`: long random token for the authenticated synthetic
  submission and read-only delivery status.
- GitHub Actions secret `CONTACT_MONITOR_TOKEN`: exactly the same monitor token
  as the Vercel Production value.
- GitHub Actions secret `CRON_SECRET`: exactly the same retry token as the
  Vercel Production value.
- Durable outbox group: set all four or none — `UPSTASH_REDIS_REST_URL`,
  `UPSTASH_REDIS_REST_TOKEN`, `CONTACT_OUTBOX_ENCRYPTION_KEY` (base64 for 32
  random bytes), and `CRON_SECRET` (at least 32 characters).
- `CONTACT_ALERT_TO_EMAIL`: one explicitly confirmed operator email address.
  There is no inferred recipient. This is Production-only; define who owns
  the mailbox and who covers incidents when that person is unavailable.

The readiness endpoint reports `degraded` and HTTP 503 when contact delivery,
the durable outbox, delivery-event verification, or the synthetic-monitor token
is unconfigured. It reports only component state, never a secret value. A green
public configuration response does not establish live storage connectivity,
worker freshness or delivered email; use the protected status for those signals.

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

It requires `Authorization: Bearer <CRON_SECRET>`. `vercel.json` runs it every
five minutes in Production. Vercel supplies the bearer automatically from the
existing Production `CRON_SECRET`; use the exact trailing-slash route so the
cron does not encounter a redirect. Each invocation selects at most 30 records
once, works in concurrent batches of three, and stops starting new batches
after 18 seconds. The route's overall duration limit is 60 seconds, allowing
in-flight provider/storage work to finish. Provider/transport failures remain
bounded by the existing timeouts and idempotency rules.

Missing/expired and already-settled due members are rechecked atomically under
the lock owner's token. Valid records created after an earlier missing read
are retained; incomplete records are quarantined; accepted/terminal messages
are not resent. Locked records cannot occupy all three scan slots indefinitely.
The endpoint persists worker start/completion/error and returns 503 when the
aggregate delivery state needs attention, even if an HTTP call itself succeeded.

`.github/workflows/contact-retry.yml` is a manual fallback only. Its token must
still match Production. Do not restore a second automatic retry schedule as a
substitute for investigating a missed Vercel heartbeat.

For `manual_review`, use the submission ID to check the outbox metadata and the
matching Resend email ID/event. Establish whether Resend already accepted the
message before any manual send; record the decision and delete/export data only
under the stated retention and privacy policy.

## Delivery status, alerts and acknowledgement

`GET /api/internal/contact-status/` accepts the cron or monitor bearer, returns
`Cache-Control: no-store`, and exposes only operational aggregates plus an
incident acknowledgement sequence. It does not send mail. Failure conditions
include a missing/stale completed worker (>15 minutes), overdue queued work
(>15 minutes), an absent delivered event (>30 minutes), unresolved
failure/manual-review/missing-record signals, and a missing/stale synthetic
probe (14 hours; delivery allowed a further 30 minutes). Storage failure is 503.

`GET /api/internal/contact-alert/` accepts only the cron bearer. Vercel invokes
it every five minutes, offset two minutes from retries. It reads the same health
state and sends an allowlisted, customer-data-free summary to
`CONTACT_ALERT_TO_EMAIL`. The exact immutable message, issue set, recipient and
hour determine its Resend idempotency key, so concurrent checks or ambiguous
retries cannot repeatedly send the same alert within that hour. A new issue set
can send sooner. Unchanged unresolved issues are eligible for one reminder each
hour. A successful alert send never changes unhealthy delivery status to healthy.

The notification uses Resend independently of Redis, so a storage failure can
still be reported. A Resend outage can block both lead and alert email. The
independent GitHub watchdog and existing Vercel platform alerts are secondary
signals; neither is a guaranteed 15-minute outage notification service. Vercel
anomaly alerts have minimum activity thresholds and can miss isolated failures.
GitHub schedules can be delayed. If a firm external notification deadline is
required, connect an independently hosted uptime/dead-man monitor to protected
status and verify its operator delivery separately.

The existing `.github/workflows/synthetic-monitor.yml` is now the **Production
delivery watchdog**: hourly, read-only checks of the homepage, public
configuration and protected status. It does not send a synthetic email. It
fails when the homepage, public configuration or delivery status is unhealthy.
An unconfigured `CONTACT_ALERT_TO_EMAIL` is annotated as a run warning instead:
it is a deployment setting that cannot change between runs, so failing on it
would mail the same unchanged fact every scheduled run until somebody edits the
Vercel environment, and an operator who learns to ignore a permanently red
watchdog will also ignore it on the run that reports lost enquiries. Delivery
stays covered while the recipient is undecided, because this watchdog is itself
the independent second alert path. Read the run summary, not only the
conclusion, and enable failed GitHub Actions workflow notifications for the
responsible operator.
The manual workflow form has an opt-in `synthetic_proof` checkbox for a controlled
fixed-recipient delivery verification; it defaults off and is never used by the
hourly schedule. This lets an authorized operator verify with existing Actions
secrets without copying credentials to a workstation.

To acknowledge incidents, first read status and investigate the displayed
failure counts using the safe IDs in runtime logs and the provider dashboard.
Keep the returned `acknowledgementSequence`. Then, using **CRON_SECRET only**,
POST this JSON to `/api/internal/contact-status/`:

```json
{"acknowledgeThroughSequence": 123}
```

Replace `123` with the sequence from the status snapshot that was actually
reviewed. Do not use `checkedAt` or a timestamp. The snapshot captures the
counts and sequence atomically; incidents committed later receive a higher
sequence even if their timestamps are older, so acknowledging the snapshot
cannot clear an unseen newer failure. Each call removes at most 300 observed
signals. If `remainingThroughSequence` is nonzero, repeat with the same reviewed
sequence. The monitor bearer cannot acknowledge. Acknowledgement retires alert
signals only: it does not resend or delete an enquiry, change provider state,
clear overdue awaiting-delivery records, or repair a stalled worker.

Incident time indexes are pruned during health checks after their 30-day
retention window, in bounded batches. The monotonic incident counter contains
no customer information and is not reset. Payload and per-record metadata TTLs
remain as described above.

## Cutover and historical reconciliation

New health indexes observe post-release writes and callbacks; existing queued
entries are considered as the worker processes them. Previously accepted or
terminal records with no due membership are **not automatically backfilled**.
A green new status therefore does not certify historical enquiry reconciliation.
The operator should record the cutover deployment/time and complete a
metadata-only review of outstanding pre-cutover provider outcomes, without
blindly replaying old messages or exporting customer content into audit logs.

After first deployment, allow/verify one worker completion and run one fixed
synthetic probe through signed delivery before declaring the new signals healthy.
Missing-heartbeat/probe status during this bootstrap is expected. Keep the alert
recipient unset until it is explicitly confirmed, and do not call notification
configuration or delivery complete before a controlled receipt test.

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

The alert cron reports reconciled bounce/complaint/suppression, manual-review,
missing-record and delivery-overdue signals to the configured operator. Logs
alone are not notification receipt. Check the route/category when triaging:
`operations-alert` refers to the alert transport itself, while `website-enquiry`
and `synthetic-monitor` identify the durable delivery flows.

Routine unknown-path traffic can currently produce Next.js
`Internal: NoFallbackError` messages while still returning the intended custom
404. Do not page on that message alone; correlate it with an unexpected 5xx or
failed user flow.

## Synthetic monitor

Vercel invokes `GET /api/internal/contact-monitor/` at 08:17 and 20:17 UTC with
the cron bearer. It persists a fixed, PII-free message in the encrypted outbox,
delivers through the normal worker and reconciles the signed webhook. Its
recipient is only `delivered+elite-surface-monitor@resend.dev`; it does not send
a test message to the sales inbox. A direct POST requires the separate monitor
token. Both dispatch methods return provisional `state: accepted`, not proof
that the signed delivery event has arrived.

`scripts/synthetic-monitor.mjs` checks the homepage/configuration, starts a fixed
probe, and polls `GET /api/internal/contact-monitor/?submissionId=...` for that
exact durable probe until its signed event marks it delivered, up to two minutes.
The status lookup accepts the monitor or cron bearer and exposes no message body
or recipient. A delayed confirmation fails the verification command; inspect the
existing probe before dispatching another.

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
npm run contact-redis-test
```

After production is ready:

```bash
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run smoke
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run analytics-test
SMOKE_BASE_URL=https://elitesurfacegroup.com.au npm run a11y
CONTACT_MONITOR_TOKEN=... node scripts/synthetic-monitor.mjs
CONTACT_MONITOR_TOKEN=... npm run contact-status-check
```

Then confirm:

1. the live aliases waited for the exact commit's blocking `verify` check;
2. no unexplained new production error logs;
3. the synthetic accepted and signed delivered events correlate to one durable ID;
4. protected status is healthy after the initial worker/probe bootstrap;
5. dedicated alert configuration and controlled operator receipt are verified;
6. at least two natural five-minute worker runs appear without manual triggers;
7. the independent watchdog and normal field telemetry continue to operate.

Continue checking natural worker cadence, oldest queue age and alert response
for seven days after cutover. Initial successful runs do not prove a seven-day
delivery objective. Record the observed window rather than claiming it early.

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
