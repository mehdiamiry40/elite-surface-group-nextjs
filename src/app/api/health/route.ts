import {
  contactEnvironmentProblems,
  contactOutboxIsConfigured,
} from "@/lib/contact-delivery";
import { serviceReadiness } from "@/lib/readiness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const { ready, checks } = serviceReadiness({
    contactDelivery: contactEnvironmentProblems(process.env).length === 0,
    durableOutbox: contactOutboxIsConfigured(process.env),
    deliveryEvents: Boolean(process.env.RESEND_WEBHOOK_SECRET?.trim()),
    syntheticMonitor: Boolean(process.env.CONTACT_MONITOR_TOKEN?.trim()),
  });

  return Response.json(
    { status: ready ? "ready" : "degraded", checks },
    {
      status: ready ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
