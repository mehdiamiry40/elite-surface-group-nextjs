# Security maintenance

Repository owner `@mehdiamiry40` owns triage of dependency alerts, security
workflow failures and suspected exposed credentials. Review high/critical alerts
before the next release and daily while unresolved. A backup maintainer has not
yet been assigned; the owner must nominate one before transferring operations.

Use an existing private channel to the repository owner to report a suspected
vulnerability. Include affected paths, impact, and a redacted reproduction.
Never put customer enquiries, credentials or exploitable secret values in public
issues, pull-request descriptions or CI logs. If a secret is detected, revoke or
rotate it at its provider, remove it from active configuration, and assess Git
history and deployment exposure; deleting the line alone is not remediation.

## Automated controls

- Dependabot vulnerability alerts and automatic security updates are enabled for
  this private repository. Version-update PRs remain enabled separately.
- `CI / verify` audits **all** runtime and development/build dependencies at high
  severity, runs application checks and real isolated Redis recovery tests, and
  depends on the reusable Security workflow. An advisory service error fails the
  check; it must not be treated as a clean advisory result.
- Security runs on CI, daily, and by manual dispatch. Gitleaks scans all reachable
  Git history with complete redaction. Its downloaded binary is verified against
  a pinned SHA-256. Semgrep Community Edition runs versioned local rules against
  `src` and `scripts`, with telemetry and version checks disabled. Detection
  fixtures prove both a known unsafe pattern and safe alternative for every local
  rule; the fixtures are not executed as application code.
- GitHub native Code Security and Secret Protection are not enabled under the
  current private-repository entitlement. The local scanners provide a no-cost
  baseline with Actions failure reporting, not native GitHub security alerts,
  push protection, cross-function taint analysis, or exhaustive vulnerability
  detection. Review the rules when changing the enquiry pipeline, browser HTML
  rendering or external service integrations.
- Vercel production promotion requires the exact commit's GitHub `verify` check,
  plus blocking native Lint and TypeCheck. Keep the `verify` job name unique and
  unchanged. Do not force-promote failed, missing, skipped or pending checks.

The owner must enable GitHub Actions failure notifications in their account and
verify a controlled failed-run notification after these workflows reach the
default branch. CI additions are inactive until merged. Daily schedules are best
effort; Dependabot alerts provide the independent advisory signal.

When updating scanner versions or action pins, verify them against the upstream
release, review changes, rerun fixtures, and record the review in the dependency PR.
Do not add broad secret allowlists or disable rules solely to make a build green.

## Sources

- [GitHub security features and plan availability](https://docs.github.com/en/code-security/getting-started/github-security-features)
- [Vercel Deployment Checks](https://vercel.com/docs/deployment-checks)
- [Gitleaks 8.30.1](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1)
- [Semgrep 1.176.0](https://github.com/semgrep/semgrep/releases/tag/v1.176.0)
