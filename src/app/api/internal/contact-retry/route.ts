import { NextRequest, NextResponse } from "next/server";
import { bearerTokenIsValid } from "@/lib/contact-auth";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import { assessContactHealth } from "@/lib/contact-health";
import { contactLog } from "@/lib/contact-security";
import { drainContactOutbox } from "@/lib/contact-worker";

export const runtime = "nodejs";
export const maxDuration = 60;

async function retryDueEnquiries(request: NextRequest) {
  if (!bearerTokenIsValid(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const outbox = outboxFromEnvironment();
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!outbox || !apiKey) throw new Error("unconfigured");
    const result = await drainContactOutbox(outbox, apiKey);
    const health = assessContactHealth(await outbox.healthSnapshot());
    if (!health.ok) contactLog("contact.outbox.delivery_deferred", {
      route: "/api/internal/contact-retry/", errorCode: health.issues.join(","),
    });
    return NextResponse.json({ ...result, ...health }, {
      status: health.ok ? 200 : 503, headers: { "Cache-Control": "no-store" },
    });
  } catch {
    contactLog("contact.outbox.unavailable", {
      route: "/api/internal/contact-retry/", errorCode: "outbox_recovery_failed",
    });
    return NextResponse.json({ ok: false, issues: ["outbox_unavailable"] }, {
      status: 503, headers: { "Cache-Control": "no-store" },
    });
  }
}

export const GET = retryDueEnquiries;
export const POST = retryDueEnquiries;
