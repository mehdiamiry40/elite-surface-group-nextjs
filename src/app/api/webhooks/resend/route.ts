import { contactLog } from "@/lib/contact-security";
import { outboxFromEnvironment } from "@/lib/contact-outbox";
import {
  MAX_RESEND_WEBHOOK_BYTES,
  resendWebhookNeedsDurableCorrelation,
  verifyAndNormaliseResendWebhook,
} from "@/lib/resend-webhook";

export const runtime = "nodejs";
export const maxDuration = 5;

class WebhookBodyTooLargeError extends Error {}

async function readLimitedBody(request: Request) {
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
    if (total > MAX_RESEND_WEBHOOK_BYTES) {
      await reader.cancel();
      throw new WebhookBodyTooLargeError();
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

export async function POST(request: Request) {
  const route = "/api/webhooks/resend/";
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    contactLog("contact.resend.webhook.unconfigured", { route });
    return Response.json({ received: false }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_RESEND_WEBHOOK_BYTES
  ) {
    contactLog("contact.resend.webhook.rejected", {
      route,
      reason: "body_too_large",
    });
    return Response.json({ received: false }, { status: 413 });
  }

  const providerEventId = request.headers.get("svix-id")?.trim();
  const providerTimestamp = request.headers.get("svix-timestamp")?.trim();
  const providerSignature = request.headers.get("svix-signature")?.trim();
  if (!providerEventId || !providerTimestamp || !providerSignature) {
    contactLog("contact.resend.webhook.rejected", {
      route,
      reason: "missing_signature_headers",
    });
    return Response.json({ received: false }, { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await readLimitedBody(request);
  } catch (error) {
    contactLog("contact.resend.webhook.rejected", {
      route,
      providerEventId,
      reason:
        error instanceof WebhookBodyTooLargeError
          ? "body_too_large"
          : "body_read_failed",
    });
    return Response.json(
      { received: false },
      { status: error instanceof WebhookBodyTooLargeError ? 413 : 400 },
    );
  }

  let event;
  try {
    event = verifyAndNormaliseResendWebhook({
      rawBody,
      webhookSecret,
      providerEventId,
      providerTimestamp,
      providerSignature,
    });
  } catch {
    // Do not echo verification details, signatures, or body content. A single
    // stable reason is enough to diagnose the rejected request safely.
    contactLog("contact.resend.webhook.rejected", {
      route,
      providerEventId,
      reason: "invalid_signature_or_payload",
    });
    return Response.json({ received: false }, { status: 400 });
  }

  if (event.kind === "ignored") {
    contactLog("contact.resend.webhook.ignored", {
      route,
      providerEventId: event.providerEventId,
      webhookType: event.webhookType,
    });
    return Response.json({ received: true, tracked: false });
  }

  let submissionId: string | undefined;
  let duplicate = false;
  if (resendWebhookNeedsDurableCorrelation(event)) {
    let outbox: ReturnType<typeof outboxFromEnvironment>;
    try {
      outbox = outboxFromEnvironment();
    } catch {
      contactLog("contact.resend.webhook.persistence_failed", {
        route,
        providerEventId: event.providerEventId,
        emailId: event.emailId,
        reason: "outbox_configuration_invalid",
      });
      return Response.json({ received: false }, { status: 503 });
    }
    if (outbox) {
      try {
        const persisted = await outbox.recordProviderStatus(
          event.emailId,
          event.status,
          event.providerEventId,
        );
        submissionId = persisted.submissionId;
        duplicate = persisted.duplicate;

        // A delivery webhook can beat the provider-email mapping written by the
        // accepted-send path. The outbox deliberately leaves this event ID
        // unconsumed; returning 503 asks Resend to retry after the mapping exists.
        if (!submissionId && !duplicate) {
          contactLog("contact.resend.webhook.persistence_failed", {
            route,
            providerEventId: event.providerEventId,
            emailId: event.emailId,
            reason: "provider_mapping_pending",
          });
          return Response.json({ received: false }, { status: 503 });
        }
      } catch {
        // Resend retries non-2xx webhook deliveries. Do not acknowledge until the
        // durable provider status has been recorded.
        contactLog("contact.resend.webhook.persistence_failed", {
          route,
          providerEventId: event.providerEventId,
          emailId: event.emailId,
          reason: "outbox_write_failed",
        });
        return Response.json({ received: false }, { status: 503 });
      }
    }
  }

  contactLog(event.logEvent, {
    route,
    providerEventId: event.providerEventId,
    emailId: event.emailId,
    providerCreatedAt: event.providerCreatedAt,
    category: event.category,
    providerReason: event.providerReason,
    submissionId,
    duplicate,
  });
  return Response.json({ received: true, tracked: true });
}
