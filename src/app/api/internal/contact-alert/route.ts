import { NextRequest, NextResponse } from "next/server";
import { bearerTokenIsValid } from "@/lib/contact-auth";
import { sendContactAlert } from "@/lib/contact-alerts";
import { assessContactHealth } from "@/lib/contact-health";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import { contactLog } from "@/lib/contact-security";

export const runtime = "nodejs";
export const maxDuration = 20;
const route = "/api/internal/contact-alert/";
const headers = { "Cache-Control": "no-store" };

export async function GET(request: NextRequest) {
  if (!bearerTokenIsValid(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers });
  }
  let issues: string[];
  try {
    const outbox = outboxFromEnvironment();
    if (!outbox) throw new Error("unconfigured");
    issues = assessContactHealth(await outbox.healthSnapshot()).issues;
  } catch {
    issues = ["outbox_unavailable"];
  }
  try {
    const notification = await sendContactAlert(issues);
    if (notification.state === "accepted") {
      contactLog("contact.resend.accepted", {
        route, category: "operations-alert", emailId: notification.emailId,
        requestId: notification.submissionId,
      });
    } else if (notification.state === "unconfigured") {
      contactLog("contact.delivery_unconfigured", {
        route, category: "operations-alert", errorCode: "alert_delivery_unconfigured",
      });
    }
    // Reporting a notification acceptance must never make the underlying
    // incident healthy. Platform/external monitors keep seeing the failure.
    return NextResponse.json(
      { ok: issues.length === 0, issues, notification: notification.state },
      { status: issues.length ? 503 : 200, headers },
    );
  } catch {
    contactLog("contact.resend.failed", {
      route, category: "operations-alert", errorCode: "alert_delivery_failed",
    });
    return NextResponse.json(
      { ok: false, issues, notification: "failed" }, { status: 503, headers },
    );
  }
}
