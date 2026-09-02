import { NextRequest, NextResponse } from "next/server";
import { business } from "@/content/business";
import { bearerTokenIsValid } from "@/lib/contact-auth";
import { contactFromAddress, isResendCompatibleFrom } from "@/lib/contact-delivery";
import {
  contactEmailTags,
  fixedMonitorEmail,
  sendWithResend,
} from "@/lib/contact-provider";
import { contactLog } from "@/lib/contact-security";
import { createSubmissionId } from "@/lib/contact-submission";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function POST(request: NextRequest) {
  if (
    !bearerTokenIsValid(
      request.headers.get("authorization"),
      process.env.CONTACT_MONITOR_TOKEN,
    )
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = contactFromAddress(
    process.env.CONTACT_FROM_EMAIL,
    business.name,
  );
  if (!apiKey || !isResendCompatibleFrom(from)) {
    return NextResponse.json(
      { message: "Contact delivery is not configured." },
      { status: 503 },
    );
  }

  const submissionId = createSubmissionId();
  const email = fixedMonitorEmail(from);
  email.tags = contactEmailTags(submissionId, "synthetic-monitor");
  const startedAt = Date.now();
  try {
    const emailId = await sendWithResend(apiKey, email, submissionId);
    contactLog("contact.resend.accepted", {
      route: "/api/internal/contact-monitor/",
      requestId: submissionId,
      emailId,
      category: "synthetic-monitor",
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json({ ok: true, emailId });
  } catch (error) {
    contactLog("contact.resend.failed", {
      route: "/api/internal/contact-monitor/",
      requestId: submissionId,
      category: "synthetic-monitor",
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { ok: false, message: "Synthetic contact delivery failed." },
      { status: 502 },
    );
  }
}
