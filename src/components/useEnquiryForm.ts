"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { serviceNames } from "@/content/services";
import { business } from "@/content/business";
import {
  createSubmissionId,
  isSubmissionId,
} from "@/lib/contact-submission";

export type EnquiryStatus = {
  state: "success" | "error" | "warning";
  message: string;
  mailto?: string;
} | null;

export const serviceOptions = serviceNames;

/**
 * Posts an enquiry to the contact endpoint.
 *
 * The trailing slash matters: `trailingSlash` is enabled for the site, so
 * posting to `/api/contact` would answer 308 and cost every submission an extra
 * round trip.
 */
const ENDPOINT = "/api/contact/";
const SUBMISSION_STORAGE_KEY = "elite-contact-submission-v1";

type SubmissionAttempt = {
  digest: string;
  submissionId: string;
};

async function digestPayload(serializedPayload: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(serializedPayload),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function storedSubmission(): SubmissionAttempt | null {
  try {
    const stored: unknown = JSON.parse(
      sessionStorage.getItem(SUBMISSION_STORAGE_KEY) ?? "null",
    );
    if (
      !stored ||
      typeof stored !== "object" ||
      !("digest" in stored) ||
      !("submissionId" in stored) ||
      typeof stored.digest !== "string" ||
      !/^[0-9a-f]{64}$/.test(stored.digest) ||
      !isSubmissionId(stored.submissionId)
    ) {
      return null;
    }
    return {
      digest: stored.digest,
      submissionId: stored.submissionId,
    };
  } catch {
    return null;
  }
}

function rememberSubmission(attempt: SubmissionAttempt) {
  try {
    sessionStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(attempt));
  } catch {
    // Memory-only idempotency is still useful when storage is unavailable.
  }
}

function forgetSubmission() {
  try {
    sessionStorage.removeItem(SUBMISSION_STORAGE_KEY);
  } catch {
    // Nothing else is required when storage is unavailable.
  }
}

export function useEnquiryForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<EnquiryStatus>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const submissionRef = useRef<SubmissionAttempt | null>(null);

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
    const requestPayload = {
      name: [value("firstName"), value("lastName")]
        .filter(Boolean)
        .join(" "),
      email: value("email"),
      phone: value("phone"),
      service: value("service"),
      projectType: value("projectType"),
      projectArea: value("projectArea"),
      projectTiming: value("projectTiming"),
      message: value("message"),
      company: value("company"),
      sourcePath: window.location.pathname,
    };

    setPending(true);
    setStatus(null);
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      // Persist only a one-way digest, never the enquiry itself. That lets an
      // identical retry survive a dialog remount or reload without placing PII
      // in web storage.
      const digest = await digestPayload(JSON.stringify(requestPayload));
      if (!mountedRef.current || controllerRef.current !== controller) {
        return;
      }
      const previous = submissionRef.current ?? storedSubmission();
      const attempt =
        previous?.digest === digest
          ? previous
          : { digest, submissionId: createSubmissionId() };
      submissionRef.current = attempt;
      rememberSubmission(attempt);

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          ...requestPayload,
          submissionId: attempt.submissionId,
        }),
      });

      const responsePayload: { message?: string; mailto?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        if (responsePayload.mailto) {
          // Mailto is a last resort, not successful delivery. Keep the visitor
          // on-page and require an explicit click so the warning is always seen.
          setStatus({
            state: "warning",
            message:
              responsePayload.message ??
              `Email delivery is unavailable. Please call ${business.phoneDisplay}, or send the message from your email app.`,
            mailto: responsePayload.mailto,
          });
          return;
        }
        throw new Error(
          responsePayload.message || "The message could not be sent.",
        );
      }

      // A retry after an ambiguous network failure keeps the same identifier;
      // a confirmed acceptance rotates it before any future enquiry.
      submissionRef.current = null;
      forgetSubmission();
      form.reset();
      setStatus({
        state: "success",
        message:
          responsePayload.message ??
          "Thanks—your enquiry has been sent. We’ll be in touch soon.",
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
            : `The message could not be sent. Please call ${business.phoneDisplay}.`,
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
