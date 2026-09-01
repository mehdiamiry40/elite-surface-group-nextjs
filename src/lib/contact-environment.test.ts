import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const checkEnvScript = fileURLToPath(
  new URL("../../scripts/check-env.mjs", import.meta.url),
);
const validDelivery = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_FROM_EMAIL:
    "Elite Surface Group <info@elitesurfacegroup.com.au>",
};
const validOutbox = {
  UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "upstash-test-token",
  CONTACT_OUTBOX_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString("base64"),
  CRON_SECRET: "c".repeat(32),
};

function runCheck(overrides: NodeJS.ProcessEnv) {
  const result = spawnSync(
    process.execPath,
    ["--experimental-strip-types", checkEnvScript],
    {
      encoding: "utf8",
      env: {
        PATH: process.env.PATH,
        NODE_NO_WARNINGS: "1",
        ...overrides,
      },
    },
  );

  assert.equal(result.error, undefined);
  return result;
}

describe("contact environment build gate", () => {
  it("warns but preserves local development when the API key is missing", () => {
    const result = runCheck({ NODE_ENV: "development" });

    assert.equal(result.status, 0);
    assert.match(result.stderr, /RESEND_API_KEY \(required\)/);
    assert.match(result.stderr, /local development build/);
  });

  it("fails production for a malformed sender", () => {
    const result = runCheck({
      VERCEL_ENV: "production",
      RESEND_API_KEY: validDelivery.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: "not-an-email",
    });

    assert.equal(result.status, 1);
    assert.match(result.stderr, /CONTACT_FROM_EMAIL/);
  });

  it("fails production for a public-mailbox sender", () => {
    const result = runCheck({
      VERCEL_ENV: "production",
      RESEND_API_KEY: validDelivery.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: "Elite Surface Group <owner@gmail.com>",
    });

    assert.equal(result.status, 1);
    assert.match(result.stderr, /public-mailbox provider/);
  });

  it("accepts a valid production sender", () => {
    const result = runCheck({
      VERCEL_ENV: "production",
      ...validDelivery,
    });

    assert.equal(result.status, 0);
    assert.match(result.stdout, /environment is configured/);
    assert.equal(result.stderr, "");
  });

  it("cannot bypass production delivery requirements", () => {
    const result = runCheck({
      NODE_ENV: "production",
      ALLOW_UNCONFIGURED_CONTACT: "1",
    });

    assert.equal(result.status, 1);
    assert.match(result.stderr, /failing a production/);
  });

  it("fails production when either Upstash value is configured alone", () => {
    for (const partial of [
      { UPSTASH_REDIS_REST_URL: "configured-url" },
      { UPSTASH_REDIS_REST_TOKEN: "test-token" },
    ]) {
      const result = runCheck({
        VERCEL_ENV: "production",
        ...validDelivery,
        ...partial,
      });

      assert.equal(result.status, 1);
      assert.match(result.stderr, /complete encrypted-outbox group or none/);
    }
  });

  it("accepts a complete encrypted outbox group", () => {
    const result = runCheck({
      VERCEL_ENV: "production",
      ...validDelivery,
      ...validOutbox,
    });

    assert.equal(result.status, 0);
    assert.match(result.stdout, /environment is configured/);
  });

  it("rejects invalid encryption, cron and monitor secrets", () => {
    const invalidEncryption = runCheck({
      VERCEL_ENV: "production",
      ...validDelivery,
      ...validOutbox,
      CONTACT_OUTBOX_ENCRYPTION_KEY: Buffer.alloc(16).toString("base64"),
    });
    assert.equal(invalidEncryption.status, 1);
    assert.match(invalidEncryption.stderr, /exactly 32 random bytes/);

    const shortCron = runCheck({
      VERCEL_ENV: "production",
      ...validDelivery,
      ...validOutbox,
      CRON_SECRET: "short",
    });
    assert.equal(shortCron.status, 1);
    assert.match(shortCron.stderr, /CRON_SECRET/);

    const shortMonitor = runCheck({
      VERCEL_ENV: "production",
      ...validDelivery,
      CONTACT_MONITOR_TOKEN: "short",
    });
    assert.equal(shortMonitor.status, 1);
    assert.match(shortMonitor.stderr, /CONTACT_MONITOR_TOKEN/);
  });
});
