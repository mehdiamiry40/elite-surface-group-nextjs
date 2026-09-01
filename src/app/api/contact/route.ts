import { NextRequest, NextResponse } from "next/server";
import { track } from "@vercel/analytics/server";
import { business, unavailableDeliveryCopy } from "@/content/business";
import {
  projectTimingOptions,
  projectTypeOptions,
} from "@/content/enquiry";
import { publicPaths } from "@/content/routes";
import { services } from "@/content/services";
import { CONVERSION_EVENT_NAMES } from "@/lib/conversion-analytics";
import {
  contactFromAddress,
  contactToAddress,
  isResendCompatibleFrom,
  shouldCaptureEnquiryLocally,
} from "@/lib/contact-delivery";
import {
  contactLog,
  isAllowedOrigin,
  redactSensitiveText,
  ResendDeliveryError,
} from "@/lib/contact-security";
import {
  contactEmailTags,
  sendWithResend,
  type ResendEmail,
} from "@/lib/contact-provider";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import { resolveSubmissionId } from "@/lib/contact-submission";
import { deliverOutboxSubmission } from "@/lib/contact-worker";
import {
  progressiveContactHeaders,
  renderProgressiveContactFailure,
  type ProgressiveContactFields,
} from "@/lib/progressive-contact";

export const runtime = "nodejs";
export const maxDuration = 20;

const MAX = {
  name: 120,
  email: 254,
  phone: 50,
  service: 80,
  projectType: 80,
  projectArea: 120,
  projectTiming: 80,
  message: 5000,
  sourcePath: 250,
  company: 120,
};

const MAX_BODY_BYTES = 65_536;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6;
const ALLOWED_SERVICES = new Set(services.map((service) => service.name));
const ALLOWED_PROJECT_TYPES = new Set<string>(projectTypeOptions);
const ALLOWED_PROJECT_TIMINGS = new Set<string>(projectTimingOptions);
const ALLOWED_SOURCE_PATHS = new Set(publicPaths);

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

  const configuredSite = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost = process.env.VERCEL_URL;

  return isAllowedOrigin(
    request.headers.get("origin"),
    request.nextUrl.origin,
    [configuredSite, vercelHost ? `https://${vercelHost}` : undefined],
    { hostHeader: request.headers.get("host") },
  );
}

/**
 * Rate-limit bucket key.
 *
 * Both headers below are only meaningful when the proxy in front of this route
 * writes them: on Vercel `x-vercel-forwarded-for` and `x-real-ip` are set by the
 * platform and a client cannot forge them. Behind any other proxy — or none —
 * a client sends whatever it likes and rotates the value for a fresh bucket, so
 * the limiter is a speed bump there rather than a control. Deploy this route
 * behind a proxy that overwrites both headers, or move the limit to a shared
 * store keyed on something the client does not choose.
 *
 * `x-vercel-forwarded-for` carries the client first, so read that end — the last
 * hop is the nearest proxy, not the visitor.
 */
function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-vercel-forwarded-for");
  const client = forwarded?.split(",")[0]?.trim();
  if (client) {
    return client;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function memoryRateLimit(request: NextRequest) {
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

/** Reads one numeric reply out of an Upstash pipeline response. */
function pipelineNumber(result: unknown, index: number) {
  if (!Array.isArray(result)) {
    return Number.NaN;
  }

  const entry: unknown = result[index];
  if (!entry || typeof entry !== "object" || !("result" in entry)) {
    return Number.NaN;
  }

  return Number(entry.result);
}

/**
 * Optional shared limiter via Upstash Redis REST.
 * When UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are unset, falls back
 * to the in-memory limiter.
 */
async function sharedRateLimit(request: NextRequest) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return memoryRateLimit(request);
  }

  const key = `contact:${clientKey(request)}`;
  const windowSeconds = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
  try {
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // `SET … NX EX` seeds the counter with a TTL only when the window is not
      // already open, then `INCR` counts without touching that TTL. Expiring the
      // key on every request instead would push the deadline forward each time,
      // so a visitor who kept retrying would never leave the penalty box.
      body: JSON.stringify([
        ["SET", key, "0", "EX", String(windowSeconds), "NX"],
        ["INCR", key],
      ]),
      signal: AbortSignal.timeout(1_500),
      cache: "no-store",
    });

    if (!response.ok) {
      return memoryRateLimit(request);
    }

    const result: unknown = await response.json();
    const count = pipelineNumber(result, 1);

    if (!Number.isFinite(count)) {
      return memoryRateLimit(request);
    }

    return count <= RATE_LIMIT_MAX;
  } catch {
    return memoryRateLimit(request);
  }
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
  projectType,
  projectArea,
  projectTiming,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  projectArea: string;
  projectTiming: string;
  message: string;
}) {
  const recipient = contactToAddress(
    process.env.CONTACT_TO_EMAIL,
    business.email,
  );
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
    `Project type: ${projectType || "Not specified"}`,
    `Project area: ${projectArea || "Not provided"}`,
    `Target timing: ${projectTiming || "Not specified"}`,
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

type FormOutcome = "sent" | "received" | "unavailable" | "invalid";

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

function parsedContactResponse(
  request: NextRequest,
  isBrowserForm: boolean,
  payload: ContactPayload,
  status: number,
  outcome: FormOutcome,
  fields: ProgressiveContactFields,
) {
  if (!isBrowserForm || outcome === "sent" || outcome === "received") {
    return contactResponse(request, isBrowserForm, payload, status, outcome);
  }

  return new NextResponse(
    renderProgressiveContactFailure({
      fields,
      message: payload.message,
      mailto: payload.mailto,
      serviceOptions: services.map((service) => service.name),
      projectTypeOptions,
      projectTimingOptions,
      businessName: business.name,
      businessEmail: business.email,
      businessPhone: business.phone,
      businessPhoneDisplay: business.phoneDisplay,
    }),
    { status, headers: progressiveContactHeaders },
  );
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
  let browserFirstName = "";
  let browserLastName = "";
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
      browserFirstName = params.get("firstName")?.trim() ?? "";
      browserLastName = params.get("lastName")?.trim() ?? "";
      body.name = [browserFirstName, browserLastName]
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
  const projectType = singleLine(body.projectType);
  const projectArea = singleLine(body.projectArea);
  const projectTiming = singleLine(body.projectTiming);
  const message = text(body.message);
  const requestedSourcePath = singleLine(body.sourcePath);
  const sourcePath = ALLOWED_SOURCE_PATHS.has(requestedSourcePath)
    ? requestedSourcePath
    : "unknown";
  const company = singleLine(body.company);
  const submissionId = resolveSubmissionId(body.submissionId);
  const progressiveFields: ProgressiveContactFields = {
    firstName: isBrowserForm ? singleLine(browserFirstName) : name,
    lastName: isBrowserForm ? singleLine(browserLastName) : "",
    email,
    phone,
    service,
    projectType,
    projectArea,
    projectTiming,
    message,
    sourcePath,
    submissionId,
  };

  if (!(await sharedRateLimit(request))) {
    if (isBrowserForm) {
      return parsedContactResponse(
        request,
        true,
        { message: "Too many enquiries were submitted. Please try again soon." },
        429,
        "unavailable",
        progressiveFields,
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

  if (company) {
    return contactResponse(
      request,
      isBrowserForm,
      { ok: true, message: "Thanks—your enquiry has been sent. We’ll be in touch soon." },
      200,
      "sent",
    );
  }

  if (
    tooLong(name, MAX.name) ||
    tooLong(email, MAX.email) ||
    tooLong(phone, MAX.phone) ||
    tooLong(service, MAX.service) ||
    tooLong(projectType, MAX.projectType) ||
    tooLong(projectArea, MAX.projectArea) ||
    tooLong(projectTiming, MAX.projectTiming) ||
    tooLong(message, MAX.message) ||
    tooLong(sourcePath, MAX.sourcePath) ||
    tooLong(company, MAX.company)
  ) {
    return parsedContactResponse(
      request,
      isBrowserForm,
      { message: "One or more form fields are too long." },
      422,
      "invalid",
      progressiveFields,
    );
  }

  if (
    !name ||
    !email ||
    !message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return parsedContactResponse(
      request,
      isBrowserForm,
      { message: "Please provide your name, email address and message." },
      400,
      "invalid",
      progressiveFields,
    );
  }

  if (service && !ALLOWED_SERVICES.has(service)) {
    return parsedContactResponse(
      request,
      isBrowserForm,
      { message: "Please choose a valid service." },
      400,
      "invalid",
      progressiveFields,
    );
  }

  if (projectType && !ALLOWED_PROJECT_TYPES.has(projectType)) {
    return parsedContactResponse(
      request,
      isBrowserForm,
      { message: "Please choose a valid project type." },
      400,
      "invalid",
      progressiveFields,
    );
  }

  if (projectTiming && !ALLOWED_PROJECT_TIMINGS.has(projectTiming)) {
    return parsedContactResponse(
      request,
      isBrowserForm,
      { message: "Please choose a valid target timing." },
      400,
      "invalid",
      progressiveFields,
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = contactFromAddress(
    process.env.CONTACT_FROM_EMAIL,
    business.name,
  );
  const to = contactToAddress(process.env.CONTACT_TO_EMAIL, business.email);
  const mailtoFields = {
    name,
    email,
    phone,
    service,
    projectType,
    projectArea,
    projectTiming,
    message,
  };

  if (!resendKey) {
    // `next dev` captures the enquiry so the form can be tested without
    // secrets. Vercel and `next start` stay loud: without a provider key no
    // enquiry is ever delivered, and the visitor-side mailto fallback is easy
    // to miss on mobile.
    if (shouldCaptureEnquiryLocally()) {
      contactLog("contact.delivery_logged_locally", {
        page: sourcePath || "unknown",
      });
      console.info("[contact] captured locally (not emailed)", {
        name,
        email,
        phone,
        service,
        projectType,
        projectArea,
        projectTiming,
        sourcePath,
        message,
      });
      return contactResponse(
        request,
        isBrowserForm,
        {
          ok: true,
          message:
            "Thanks—your enquiry has been sent. We’ll be in touch soon.",
        },
        200,
        "sent",
      );
    }
    contactLog("contact.delivery_unconfigured", {
      page: sourcePath || "unknown",
    });
    return parsedContactResponse(
      request,
      isBrowserForm,
      {
        message: unavailableDeliveryCopy,
        mailto: mailtoUrl(mailtoFields),
      },
      503,
      "unavailable",
      progressiveFields,
    );
  }

  if (!isResendCompatibleFrom(from)) {
    // A Gmail (or other public-mailbox) From is not delivery — Resend rejects
    // it. Fail the same way as a missing key rather than posting to the API
    // and turning a config mistake into a 502.
    contactLog("contact.delivery_unconfigured", {
      page: sourcePath || "unknown",
    });
    return parsedContactResponse(
      request,
      isBrowserForm,
      {
        message: unavailableDeliveryCopy,
        mailto: mailtoUrl(mailtoFields),
      },
      503,
      "unavailable",
      progressiveFields,
    );
  }

  const requestId = submissionId;
  const contactEmail: ResendEmail = {
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
      `Project type: ${projectType || "Not specified"}`,
      `Project area: ${projectArea || "Not provided"}`,
      `Target timing: ${projectTiming || "Not specified"}`,
      `Page: ${sourcePath || "Unknown"}`,
      "",
      message,
    ].join("\n"),
    html: `
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectType || "Not specified")}</p>
      <p><strong>Project area:</strong> ${escapeHtml(projectArea || "Not provided")}</p>
      <p><strong>Target timing:</strong> ${escapeHtml(projectTiming || "Not specified")}</p>
      <p><strong>Page:</strong> ${escapeHtml(sourcePath || "Unknown")}</p>
      <hr />
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `,
    tags: contactEmailTags(submissionId),
  };

  let deliveryStatus = 200;
  let successMessage =
    "Thanks—your enquiry has been sent. We’ll be in touch soon.";
  let deliveredOrQueued = false;
  let outboxPersisted = false;
  let outbox: ReturnType<typeof outboxFromEnvironment> = null;

  try {
    outbox = outboxFromEnvironment();
    if (outbox) {
      const persisted = await outbox.persist(submissionId, contactEmail);
      if (persisted === "conflict") {
        return parsedContactResponse(
          request,
          isBrowserForm,
          {
            message:
              "This enquiry changed while it was being retried. Please submit it again.",
          },
          409,
          "invalid",
          progressiveFields,
        );
      }
      outboxPersisted = true;
    }
  } catch (error) {
    contactLog("contact.outbox.unavailable", {
      requestId,
      error: error instanceof Error ? String(error.name) : "unknown",
    });
    outbox = null;
  }

  if (outbox && outboxPersisted) {
    try {
      const result = await deliverOutboxSubmission(
        outbox,
        submissionId,
        resendKey,
      );
      if (result.state === "accepted") {
        deliveredOrQueued = true;
        contactLog("contact.resend.accepted", {
          requestId,
          emailId: result.emailId,
          page: sourcePath || "unknown",
        });
      } else if (result.state === "queued" || result.state === "locked") {
        deliveredOrQueued = true;
        deliveryStatus = 202;
        successMessage =
          "Thanks—your enquiry has been received and queued for delivery. We’ll be in touch soon.";
        contactLog("contact.outbox.queued", {
          requestId,
          errorCode:
            result.state === "queued" ? result.errorCode : "delivery_locked",
        });
      } else {
        contactLog("contact.resend.failed", {
          requestId,
          page: sourcePath || "unknown",
          providerCode:
            "errorCode" in result ? result.errorCode : result.state,
        });
        return parsedContactResponse(
          request,
          isBrowserForm,
          {
            message: unavailableDeliveryCopy,
            mailto: mailtoUrl(mailtoFields),
          },
          502,
          "unavailable",
          progressiveFields,
        );
      }
    } catch (error) {
      // The encrypted record and due-set member already exist. Leave recovery
      // to the authenticated retry worker instead of risking an untracked send.
      deliveredOrQueued = true;
      deliveryStatus = 202;
      successMessage =
        "Thanks—your enquiry has been received and queued for delivery. We’ll be in touch soon.";
      contactLog("contact.outbox.delivery_deferred", {
        requestId,
        error: error instanceof Error ? String(error.name) : "unknown",
      });
    }
  }

  if (!deliveredOrQueued) {
    try {
      const emailId = await sendWithResend(
        resendKey,
        contactEmail,
        submissionId,
      );
      deliveredOrQueued = true;
      contactLog("contact.resend.accepted", {
        requestId,
        emailId,
        page: sourcePath || "unknown",
      });
    } catch (error) {
      contactLog("contact.resend.failed", {
        requestId,
        page: sourcePath || "unknown",
        providerStatus:
          error instanceof ResendDeliveryError
            ? error.providerStatus
            : undefined,
        providerCode:
          error instanceof ResendDeliveryError ? error.providerCode : undefined,
        error:
          error instanceof Error
            ? redactSensitiveText(error.message)
            : "unknown",
      });
      return parsedContactResponse(
        request,
        isBrowserForm,
        {
          message: unavailableDeliveryCopy,
          mailto: mailtoUrl(mailtoFields),
        },
        502,
        "unavailable",
        progressiveFields,
      );
    }
  }

  // Measurement must never change a successfully delivered enquiry into a
  // visitor-facing failure, but awaiting it lets Vercel finish the dispatch.
  try {
    await track(
      CONVERSION_EVENT_NAMES.enquirySubmitted,
      {
        page: sourcePath,
        service: service || "Not specified",
      },
      { request },
    );
  } catch {
    contactLog("contact.analytics.failed", { page: sourcePath });
  }

  return contactResponse(
    request,
    isBrowserForm,
    {
      ok: true,
      message: successMessage,
    },
    deliveryStatus,
    deliveryStatus === 202 ? "received" : "sent",
  );
}
