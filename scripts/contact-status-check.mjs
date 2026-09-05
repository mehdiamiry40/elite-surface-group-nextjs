#!/usr/bin/env node

// Independent read-only watchdog: it neither sends mail nor acknowledges
// incidents. Failed Actions notifications complement the primary Vercel alerts.
const baseUrl = new URL(process.env.MONITOR_BASE_URL ?? "https://elitesurfacegroup.com.au");
const token = process.env.CONTACT_MONITOR_TOKEN?.trim();
if (!token) throw new Error("CONTACT_MONITOR_TOKEN is required.");
for (const pathname of ["/", "/api/health/", "/api/internal/contact-status/"]) {
  const protectedRoute = pathname === "/api/internal/contact-status/";
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
    headers: {
      "User-Agent": "Elite-Surface-Group-Delivery-Watchdog/1.0",
      ...(protectedRoute ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    // Never print arbitrary remote bodies, credentials or personal data into
    // Actions logs. The route and HTTP status locate the operator's next check.
    throw new Error(`Production delivery watchdog failed: ${pathname} HTTP ${response.status}.`);
  }
  if (pathname === "/") {
    if (!(await response.text()).includes("Elite Surface Group")) {
      throw new Error("The homepage did not contain the expected site identity.");
    }
  } else {
    const body = await response.json();
    if (pathname === "/api/health/" && body.status !== "ready") {
      throw new Error("Production configuration is not ready.");
    }
    if (protectedRoute && (body.ok !== true || body.notificationsConfigured !== true)) {
      throw new Error("Durable delivery or its dedicated notification configuration is unhealthy.");
    }
  }
}
console.log("Production watchdog passed: homepage, configuration, durable delivery and alert configuration are healthy.");
