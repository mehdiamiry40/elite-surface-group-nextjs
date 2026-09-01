"use client";

import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect } from "react";
import {
  contactEventName,
  redactAnalyticsUrl,
} from "@/lib/conversion-analytics";

/**
 * Keeps click measurement centralized so server-rendered contact links do not
 * each need a client wrapper. Event properties are deliberately allowlisted:
 * destination URLs and contact/form values must never reach analytics.
 */
function classifyContactLink(link: HTMLAnchorElement) {
  const href = link.getAttribute("href") ?? "";
  return contactEventName(href);
}

function redactTelemetryUrl<T extends { url: string }>(event: T): T {
  return {
    ...event,
    url: redactAnalyticsUrl(event.url, window.location.origin),
  };
}

export default function ConversionAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) {
        return;
      }

      const analyticsEvent = classifyContactLink(link);
      if (analyticsEvent) {
        track(analyticsEvent);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {/* These SDKs use separate browser queues, so each must receive the URL
          control. The generic helper preserves all current and future fields. */}
      <Analytics beforeSend={redactTelemetryUrl} />
      <SpeedInsights beforeSend={redactTelemetryUrl} />
    </>
  );
}
