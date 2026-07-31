import { NextRequest, NextResponse } from "next/server";
import { business, services } from "@/content/site";

export const runtime = "nodejs";
export const maxDuration = 10;

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
const RESEND_TIMEOUT_MS = 8_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6;
const ALLOWED_SERVICES = new Set(services.map((service) => service.name));
const ALLOWED_SOURCE_PATHS = new Set([
  "/",
  "/about/",
  "/services/",
  "/projects/",
  "/contact-us/",
  "/privacy-policy/",
  "/terms-of-service/",
  ...services.map((service) => `/${service.slug}/`),
]);

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

class BodyTooLargeError extends Error {}

/** Reads at most MAX_BODY_BYTES without buffering a platform-sized payload. */
async function readBody(request: NextRequest) {
  const reader = request.body?.getReader();
  if (!reader) {
    return "";
  }

  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new BodyTooLargeError("Request body exceeds the limit");
    }
    chunks.push(value);
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

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

function singleLine(value: unknown) {
  return text(value).replace(/[\u0000-\u001f\u007f]/g, " ");
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
  // Keep the fallback below common URL-length limits. The full message remains
  // in the on-page form so the visitor can copy it or retry.
  const fallbackMessage =
    message.length > 1_200 ? `${message.slice(0, 1_200)}…` : message;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${service || "Not specified"}`,
    "",
    fallbackMessage,
  ].join("\n");
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

type ContactPayload = {
  ok?: boolean;
  message: string;
  mailto?: string;
};

type FormOutcome = "sent" | "unavailable" | "invalid";

function contactResponse(
  request: NextRequest,
  isBrowserForm: boolean,
  payload: ContactPayload,
  status: number,
  outcome: FormOutcome,
) {
  if (isBrowserForm) {
    const destination = new URL("/contact-us/", request.url);
    destination.hash = `enquiry-${outcome}`;
    return NextResponse.redirect(destination, 303);
  }
  return NextResponse.json(payload, { status });
}

type ResendEmail = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
  html: string;
};

async function sendWithResend(
  apiKey: string,
  email: ResendEmail,
  idempotencyKey: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });

  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      result && typeof result === "object" && "message" in result
        ? String(result.message)
        : `Resend returned HTTP ${response.status}`,
    );
  }

  return result && typeof result === "object" && "id" in result
    ? String(result.id)
    : "accepted";
}

export async function POST(request: NextRequest) {
  const contentType =
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ??
    "";
  const isJson = contentType === "application/json";
  const isBrowserForm = contentType === "application/x-www-form-urlencoded";

  if (!isJson && !isBrowserForm) {
    return NextResponse.json(
      { message: "This endpoint accepts website form submissions only." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return contactResponse(
      request,
      isBrowserForm,
      { message: "The form submission is too large." },
      413,
      "invalid",
    );
  }

  if (!originIsAllowed(request)) {
    return contactResponse(
      request,
      isBrowserForm,
      { message: "This form submission was not accepted." },
      403,
      "invalid",
    );
  }

  if (!rateLimit(request)) {
    if (isBrowserForm) {
      return contactResponse(
        request,
        true,
        { message: "Too many enquiries were submitted. Please try again soon." },
        429,
        "unavailable",
      );
    }
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
    rawBody = await readBody(request);
  } catch (error) {
    return contactResponse(
      request,
      isBrowserForm,
      {
        message:
          error instanceof BodyTooLargeError
            ? "The form submission is too large."
            : "Please check the form and try again.",
      },
      error instanceof BodyTooLargeError ? 413 : 400,
      "invalid",
    );
  }

  let body: Record<string, unknown>;
  try {
    if (isJson) {
      const parsed: unknown = JSON.parse(rawBody);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new TypeError("Expected an object");
      }
      body = parsed as Record<string, unknown>;
    } else {
      const params = new URLSearchParams(rawBody);
      body = Object.fromEntries(params);
      body.name = [params.get("firstName"), params.get("lastName")]
        .map((part) => part?.trim())
        .filter(Boolean)
        .join(" ");
    }
  } catch {
    return contactResponse(
      request,
      isBrowserForm,
      { message: "Please check the form and try again." },
      400,
      "invalid",
    );
  }

  const name = singleLine(body.name);
  const email = singleLine(body.email);
  const phone = singleLine(body.phone);
  const service = singleLine(body.service);
  const message = text(body.message);
  const requestedSourcePath = singleLine(body.sourcePath);
  const sourcePath = ALLOWED_SOURCE_PATHS.has(requestedSourcePath)
    ? requestedSourcePath
    : "unknown";
  const company = singleLine(body.company);

  if (company) {
    return contactResponse(
      request,
      isBrowserForm,
      { ok: true, message: "Thanks — your message has been sent." },
      200,
      "sent",
    );
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
    return contactResponse(
      request,
      isBrowserForm,
      { message: "One or more form fields are too long." },
      422,
      "invalid",
    );
  }

  if (
    !name ||
    !email ||
    !message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return contactResponse(
      request,
      isBrowserForm,
      { message: "Please provide your name, email address and message." },
      400,
      "invalid",
    );
  }

  if (service && !ALLOWED_SERVICES.has(service)) {
    return contactResponse(
      request,
      isBrowserForm,
      { message: "Please choose a valid service." },
      400,
      "invalid",
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
    return contactResponse(
      request,
      isBrowserForm,
      {
        message:
          "Email delivery is unavailable right now. You can call us on 0413 844 912, or continue in your email app.",
        mailto: mailtoUrl({ name, email, phone, service, message }),
      },
      503,
      "unavailable",
    );
  }

  const requestId = crypto.randomUUID();
  try {
    const emailId = await sendWithResend(
      resendKey,
      {
      from,
      to: [to],
        reply_to: email,
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
      },
      requestId,
    );

    console.info("[contact] Enquiry accepted by Resend.", {
      requestId,
      emailId,
      page: sourcePath || "unknown",
    });
  } catch (error) {
    console.error("[contact] Resend threw while sending an enquiry.", {
      requestId,
      page: sourcePath || "unknown",
      error: error instanceof Error ? error.message : "unknown",
    });
    return contactResponse(
      request,
      isBrowserForm,
      {
        message:
          "Email delivery is unavailable right now. You can call us on 0413 844 912, or continue in your email app.",
        mailto: mailtoUrl({ name, email, phone, service, message }),
      },
      502,
      "unavailable",
    );
  }

  return contactResponse(
    request,
    isBrowserForm,
    {
      ok: true,
      message: "Thanks — your message has been sent.",
    },
    200,
    "sent",
  );
}
