import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { business, services } from "@/content/site";

export const runtime = "nodejs";

const MAX = {
  name: 120,
  email: 254,
  phone: 50,
  service: 80,
  message: 5000,
  sourcePath: 250,
  company: 120,
};

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6;
const ALLOWED_SERVICES = new Set(services.map((service) => service.name));

/**
 * Best-effort, per-instance throttle.
 *
 * This deliberately does NOT try to be a real rate limiter: on serverless each
 * concurrent instance keeps its own map, so the effective ceiling is
 * `RATE_LIMIT_MAX × instances` and it resets on cold start. It exists to blunt
 * naive repeat submissions. For a hard limit, move this to a shared store
 * (Vercel KV / Upstash) — see docs/FULL-SCALE-AUDIT.md.
 */
const RATE_LIMIT_MAX_KEYS = 5_000;
const requestBuckets = new Map<string, number[]>();

/** Drops expired buckets so the map cannot grow without bound. */
function evictStaleBuckets(now: number) {
  for (const [key, timestamps] of requestBuckets) {
    const live = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );
    if (live.length) {
      requestBuckets.set(key, live);
    } else {
      requestBuckets.delete(key);
    }
  }
}

/** Hard-caps the map when every remaining key is still inside the window. */
function enforceKeyCap() {
  if (requestBuckets.size < RATE_LIMIT_MAX_KEYS) {
    return;
  }

  const target = Math.floor(RATE_LIMIT_MAX_KEYS / 2);
  let removed = 0;
  for (const key of requestBuckets.keys()) {
    if (requestBuckets.size - removed <= target) {
      break;
    }
    requestBuckets.delete(key);
    removed += 1;
  }
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function originIsAllowed(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const allowedOrigins = new Set([request.nextUrl.origin]);
  const configuredSite = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost = process.env.VERCEL_URL;

  for (const candidate of [
    configuredSite,
    vercelHost ? `https://${vercelHost}` : undefined,
  ]) {
    if (!candidate) {
      continue;
    }
    try {
      allowedOrigins.add(new URL(candidate).origin);
    } catch {
      // Ignore malformed optional deployment configuration.
    }
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

/**
 * Prefer platform-provided client IP over the first X-Forwarded-For hop, which
 * a client can spoof.
 */
function clientKey(request: NextRequest) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) {
    const parts = vercelForwarded.split(",").map((part) => part.trim());
    const last = parts[parts.length - 1];
    if (last) {
      return last;
    }
  }

  return "unknown";
}

function rateLimit(request: NextRequest) {
  const now = Date.now();
  const key = clientKey(request);

  if (requestBuckets.size >= RATE_LIMIT_MAX_KEYS) {
    evictStaleBuckets(now);
    enforceKeyCap();
  }

  const active = (requestBuckets.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (active.length >= RATE_LIMIT_MAX) {
    requestBuckets.set(key, active);
    return false;
  }

  active.push(now);
  requestBuckets.set(key, active);
  return true;
}

function tooLong(value: string, max: number) {
  return value.length > max;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mailtoUrl({
  name,
  email,
  phone,
  service,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const recipient = process.env.CONTACT_TO_EMAIL || business.email;
  const subject = `Website enquiry${service ? ` — ${service}` : ""}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${service || "Not specified"}`,
    "",
    message,
  ].join("\n");
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export async function POST(request: NextRequest) {
  const contentType =
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ??
    "";
  if (contentType !== "application/json") {
    return NextResponse.json(
      { message: "This endpoint accepts JSON form submissions only." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "The form submission is too large." },
      { status: 413 },
    );
  }

  if (!originIsAllowed(request)) {
    return NextResponse.json(
      { message: "This form submission was not accepted." },
      { status: 403 },
    );
  }

  if (!rateLimit(request)) {
    return NextResponse.json(
      { message: "Too many enquiries were submitted. Please try again soon." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
        },
      },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "The form submission is too large." },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new TypeError("Expected an object");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone);
  const service = text(body.service);
  const message = text(body.message);
  const sourcePath = text(body.sourcePath);
  const company = text(body.company);

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (
    tooLong(name, MAX.name) ||
    tooLong(email, MAX.email) ||
    tooLong(phone, MAX.phone) ||
    tooLong(service, MAX.service) ||
    tooLong(message, MAX.message) ||
    tooLong(sourcePath, MAX.sourcePath) ||
    tooLong(company, MAX.company)
  ) {
    return NextResponse.json(
      { message: "One or more form fields are too long." },
      { status: 422 },
    );
  }

  if (
    !name ||
    !email ||
    !message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { message: "Please provide your name, email address and message." },
      { status: 400 },
    );
  }

  if (service && !ALLOWED_SERVICES.has(service)) {
    return NextResponse.json(
      { message: "Please choose a valid service." },
      { status: 400 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!resendKey || !from || !to) {
    // Loud on purpose: without these variables no enquiry is ever delivered,
    // and the visitor-side mailto fallback is easy to miss on mobile.
    console.error(
      "[contact] Enquiry NOT delivered — RESEND_API_KEY, CONTACT_FROM_EMAIL or " +
        "CONTACT_TO_EMAIL is unset. Falling back to the visitor's mail client.",
      { page: sourcePath || "unknown" },
    );
    return NextResponse.json(
      {
        message:
          "Email delivery is unavailable right now. You can call us on 0413 844 912, or continue in your email app.",
        mailto: mailtoUrl({ name, email, phone, service, message }),
      },
      { status: 503 },
    );
  }

  let result: Awaited<ReturnType<Resend["emails"]["send"]>>;
  try {
    const resend = new Resend(resendKey);
    result = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Elite Surface Group website enquiry${
        service ? ` — ${service}` : ""
      }`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Service: ${service || "Not specified"}`,
        `Page: ${sourcePath || "Unknown"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Service:</strong> ${escapeHtml(
          service || "Not specified",
        )}</p>
        <p><strong>Page:</strong> ${escapeHtml(sourcePath || "Unknown")}</p>
        <hr />
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });
  } catch (error) {
    console.error("[contact] Resend threw while sending an enquiry.", {
      page: sourcePath || "unknown",
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        message:
          "Email delivery is unavailable right now. You can call us on 0413 844 912, or continue in your email app.",
        mailto: mailtoUrl({ name, email, phone, service, message }),
      },
      { status: 502 },
    );
  }

  if (result.error) {
    console.error("[contact] Resend returned an error.", {
      page: sourcePath || "unknown",
      error: result.error,
    });
    return NextResponse.json(
      {
        message:
          "Email delivery is unavailable right now. You can call us on 0413 844 912, or continue in your email app.",
        mailto: mailtoUrl({ name, email, phone, service, message }),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — your message has been sent.",
  });
}
