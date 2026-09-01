import { NextRequest, NextResponse } from "next/server";
import { bearerTokenIsValid } from "@/lib/contact-auth";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import { contactLog } from "@/lib/contact-security";
import { deliverOutboxSubmission } from "@/lib/contact-worker";

export const runtime = "nodejs";
export const maxDuration = 30;

async function retryDueEnquiries(request: NextRequest) {
  if (
    !bearerTokenIsValid(
      request.headers.get("authorization"),
      process.env.CRON_SECRET,
    )
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const outbox = outboxFromEnvironment();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!outbox || !apiKey) {
    return NextResponse.json(
      { message: "Contact retry is not configured." },
      { status: 503 },
    );
  }

  const submissionIds = await outbox.dueSubmissionIds(Date.now(), 3);
  const summary: Record<string, number> = {};
  const results = await Promise.all(
    submissionIds.map((submissionId) =>
      deliverOutboxSubmission(outbox, submissionId, apiKey),
    ),
  );
  for (const [index, result] of results.entries()) {
    const submissionId = submissionIds[index];
    summary[result.state] = (summary[result.state] ?? 0) + 1;
    if (result.state === "accepted") {
      contactLog("contact.resend.accepted", {
        route: "/api/internal/contact-retry/",
        requestId: submissionId,
        emailId: result.emailId,
        category: "website-enquiry",
      });
    } else if (result.state === "queued") {
      contactLog("contact.outbox.queued", {
        route: "/api/internal/contact-retry/",
        requestId: submissionId,
        errorCode: result.errorCode,
      });
    } else if (
      result.state === "permanent_failure" ||
      result.state === "manual_review"
    ) {
      contactLog("contact.resend.failed", {
        route: "/api/internal/contact-retry/",
        requestId: submissionId,
        errorCode: result.errorCode,
      });
    } else if (result.state === "locked" || result.state === "missing") {
      contactLog("contact.outbox.delivery_deferred", {
        route: "/api/internal/contact-retry/",
        requestId: submissionId,
        errorCode: result.state,
      });
    }
  }

  return NextResponse.json({ processed: submissionIds.length, summary });
}

export const GET = retryDueEnquiries;
export const POST = retryDueEnquiries;
