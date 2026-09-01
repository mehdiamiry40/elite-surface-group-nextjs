"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
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
      <Analytics
        beforeSend={(event: BeforeSendEvent) => {
          // Do not allow future query-string or fragment content into analytics.
          return {
            ...event,
            url: redactAnalyticsUrl(event.url, window.location.origin),
          };
        }}
      />
      <SpeedInsights />
    </>
  );
}
