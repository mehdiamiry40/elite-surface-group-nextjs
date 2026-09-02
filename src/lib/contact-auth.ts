import { timingSafeEqual } from "node:crypto";

/** Constant-time bearer comparison for cron and synthetic-monitor routes. */
export function bearerTokenIsValid(
  authorization: string | null,
  expectedToken: string | undefined,
) {
  const token = expectedToken?.trim();
  if (!token || !authorization?.startsWith("Bearer ")) {
    return false;
  }

  const supplied = authorization.slice("Bearer ".length);
  const suppliedBytes = Buffer.from(supplied);
  const expectedBytes = Buffer.from(token);
  return (
    suppliedBytes.length === expectedBytes.length &&
    timingSafeEqual(suppliedBytes, expectedBytes)
  );
}
