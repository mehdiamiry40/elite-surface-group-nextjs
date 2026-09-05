import { NextRequest, NextResponse } from "next/server";
import { business } from "@/content/business";
import { bearerTokenIsValid } from "@/lib/contact-auth";
import { contactFromAddress, isResendCompatibleFrom } from "@/lib/contact-delivery";
import { contactEmailTags, fixedMonitorEmail } from "@/lib/contact-provider";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import { contactLog } from "@/lib/contact-security";
import { createSubmissionId, isSubmissionId } from "@/lib/contact-submission";
import { deliverOutboxSubmission } from "@/lib/contact-worker";

export const runtime = "nodejs";
export const maxDuration = 30;
const headers = { "Cache-Control": "no-store" };

async function runMonitor() {
  const startedAt = Date.now();
  const submissionId = createSubmissionId();
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = contactFromAddress(process.env.CONTACT_FROM_EMAIL, business.name);
    const outbox = outboxFromEnvironment();
    if (!apiKey || !isResendCompatibleFrom(from) || !outbox) throw new Error("unconfigured");
    const email = fixedMonitorEmail(from);
    email.tags = contactEmailTags(submissionId, "synthetic-monitor");
    await outbox.persist(submissionId, email, startedAt);
    const result = await deliverOutboxSubmission(outbox, submissionId, apiKey);
    if (result.state !== "accepted") throw new Error("delivery_not_accepted");
    contactLog("contact.resend.accepted", {
      route: "/api/internal/contact-monitor/", requestId: submissionId,
      emailId: result.emailId, category: "synthetic-monitor", durationMs: Date.now() - startedAt,
    });
    // Acceptance is explicitly provisional. The signed webhook records the
    // delivery outcome, queried for this exact durable probe by the CLI monitor.
    return NextResponse.json({ ok: true, durable: true, state: "accepted", submissionId, emailId: result.emailId }, { headers });
  } catch {
    contactLog("contact.resend.failed", {
      route: "/api/internal/contact-monitor/", requestId: submissionId,
      category: "synthetic-monitor", durationMs: Date.now() - startedAt,
      errorCode: "durable_synthetic_probe_failed",
    });
    return NextResponse.json({ ok: false, message: "Durable synthetic contact delivery failed." }, { status: 503, headers });
  }
}

export async function POST(request: NextRequest) {
  if (!bearerTokenIsValid(request.headers.get("authorization"), process.env.CONTACT_MONITOR_TOKEN)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
  }
  return runMonitor();
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const submissionId = request.nextUrl.searchParams.get("submissionId");
  const cronAuthorized = bearerTokenIsValid(authorization, process.env.CRON_SECRET);
  if (submissionId) {
    if (!cronAuthorized && !bearerTokenIsValid(authorization, process.env.CONTACT_MONITOR_TOKEN)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
    }
    if (!isSubmissionId(submissionId)) return NextResponse.json({ message: "Invalid probe ID." }, { status: 400, headers });
    try {
      const outbox = outboxFromEnvironment();
      if (!outbox) throw new Error("unconfigured");
      const status = await outbox.syntheticStatus(submissionId);
      if (!status) return NextResponse.json({ message: "Probe not found." }, { status: 404, headers });
      return NextResponse.json({ ok: status.state === "delivered", ...status }, { headers });
    } catch {
      return NextResponse.json({ ok: false, message: "Probe status unavailable." }, { status: 503, headers });
    }
  }
  if (!cronAuthorized) return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
  return runMonitor();
}
