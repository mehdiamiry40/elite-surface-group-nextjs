"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { services } from "@/content/site";

export type EnquiryStatus = {
  state: "success" | "error" | "warning";
  message: string;
  mailto?: string;
} | null;

export const serviceOptions = services.map((service) => service.name);

/**
 * Posts an enquiry to the contact endpoint.
 *
 * The trailing slash matters: `trailingSlash` is enabled for the site, so
 * posting to `/api/contact` would answer 308 and cost every submission an extra
 * round trip.
 */
const ENDPOINT = "/api/contact/";

export function useEnquiryForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<EnquiryStatus>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, []);

  const submit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    setPending(true);
    setStatus(null);
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: [value("firstName"), value("lastName")]
            .filter(Boolean)
            .join(" "),
          email: value("email"),
          phone: value("phone"),
          service: value("service"),
          message: value("message"),
          company: value("company"),
          sourcePath: window.location.pathname,
        }),
      });

      const payload: { message?: string; mailto?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        if (payload.mailto) {
          // Mailto is a last resort, not successful delivery. Keep the visitor
          // on-page and require an explicit click so the warning is always seen.
          setStatus({
            state: "warning",
            message:
              payload.message ??
              "Email delivery is unavailable. Please call 0413 844 912, or send the message from your email app.",
            mailto: payload.mailto,
          });
          return;
        }
        throw new Error(payload.message || "The message could not be sent.");
      }

      form.reset();
      setStatus({
        state: "success",
        message: payload.message ?? "Thanks — your message has been sent.",
      });
    } catch (error) {
      if (!mountedRef.current) {
        return;
      }
      setStatus({
        state: "error",
        message:
          error instanceof DOMException && error.name === "AbortError"
            ? "The request was cancelled. Please try again."
            : error instanceof Error
            ? error.message
            : "The message could not be sent. Please call 0413 844 912.",
      });
    } finally {
      if (mountedRef.current && controllerRef.current === controller) {
        controllerRef.current = null;
        setPending(false);
      }
    }
  }, []);

  return { submit, pending, status };
}
