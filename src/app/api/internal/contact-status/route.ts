import { NextRequest, NextResponse } from "next/server";
import { bearerTokenIsValid } from "@/lib/contact-auth";
import { assessContactHealth } from "@/lib/contact-health";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import { contactLog } from "@/lib/contact-security";
import { contactAlertConfigurationProblem } from "@/lib/contact-alerts";

export const runtime = "nodejs";
export const maxDuration = 10;
const headers = { "Cache-Control": "no-store" };

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!bearerTokenIsValid(authorization, process.env.CRON_SECRET) &&
      !bearerTokenIsValid(authorization, process.env.CONTACT_MONITOR_TOKEN)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
  }
  try {
    const outbox = outboxFromEnvironment();
    if (!outbox) throw new Error("unconfigured");
    const health = assessContactHealth(await outbox.healthSnapshot());
    if (!health.ok) contactLog("contact.outbox.delivery_deferred", {
      route: "/api/internal/contact-status/", errorCode: health.issues.join(","),
    });
    return NextResponse.json({ ...health, notificationsConfigured: contactAlertConfigurationProblem(process.env) === null }, { status: health.ok ? 200 : 503, headers });
  } catch {
    contactLog("contact.outbox.unavailable", {
      route: "/api/internal/contact-status/", errorCode: "outbox_status_failed",
    });
    return NextResponse.json({ ok: false, issues: ["outbox_unavailable"] }, { status: 503, headers });
  }
}

export async function POST(request: NextRequest) {
  if (!bearerTokenIsValid(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
  }
  // Only a small observed-sequence acknowledgement is accepted. It retires incident
  // signals already reviewed by an operator; delivery/queue state is untouched.
  let through: unknown;
  try {
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    if (!reader) throw new Error("missing body");
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > 100) { await reader.cancel(); throw new Error("body too large"); }
      chunks.push(value);
    }
    through = JSON.parse(Buffer.concat(chunks).toString("utf8")).acknowledgeThroughSequence;
  }
  catch { through = null; }
  if (typeof through !== "number" || !Number.isSafeInteger(through) || through < 0) {
    return NextResponse.json({ message: "The observed acknowledgeThroughSequence integer is required." }, { status: 400, headers });
  }
  try {
    const outbox = outboxFromEnvironment();
    if (!outbox) throw new Error("unconfigured");
    const result = await outbox.acknowledgeIssues(through);
    return NextResponse.json({ acknowledgedThroughSequence: through, ...result }, { headers });
  } catch (error) {
    if (error instanceof RangeError) return NextResponse.json({ message: "Acknowledgement sequence is in the future." }, { status: 400, headers });
    return NextResponse.json({ ok: false, issues: ["outbox_unavailable"] }, { status: 503, headers });
  }
}
