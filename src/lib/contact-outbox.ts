import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  hkdfSync,
  randomBytes,
  randomUUID,
} from "node:crypto";
import type { ResendEmail } from "./contact-provider.ts";

const PREFIX = "contact:v2";
const DUE_KEY = `${PREFIX}:due`;
const PENDING_TTL_SECONDS = 30 * 24 * 60 * 60;
const TERMINAL_DATA_TTL_SECONDS = 7 * 24 * 60 * 60;
const META_TTL_SECONDS = 30 * 24 * 60 * 60;
const LOCK_MS = 30_000;
export const OUTBOX_RETRY_CUTOFF_MS = 23 * 60 * 60 * 1000;

const TERMINAL_STATUSES = new Set<ContactOutboxStatus>([
  "delivered",
  "failed",
  "bounced",
  "complained",
  "suppressed",
  "manual_review",
]);

const CREATE_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 1 then
  if redis.call('HGET', KEYS[1], 'payloadHash') == ARGV[1] then return 0 end
  return -1
end
redis.call('HSET', KEYS[1],
  'payloadHash', ARGV[1], 'status', 'queued', 'createdAt', ARGV[3],
  'updatedAt', ARGV[3], 'attempts', '0')
redis.call('EXPIRE', KEYS[1], ARGV[5])
redis.call('SET', KEYS[2], ARGV[2], 'EX', ARGV[4])
redis.call('ZADD', KEYS[3], ARGV[3], ARGV[6])
return 1`;

const RELEASE_LOCK_SCRIPT = `
if redis.call('GET', KEYS[1]) == ARGV[1] then
  return redis.call('DEL', KEYS[1])
end
return 0`;

const PROVIDER_STATUS_SCRIPT = `
local submissionId = redis.call('GET', KEYS[2])
if not submissionId then return {1, ''} end
if not redis.call('SET', KEYS[1], '1', 'NX', 'EX', ARGV[1]) then
  return {0, submissionId}
end
local metaKey = ARGV[2] .. submissionId
local dataKey = ARGV[3] .. submissionId
local current = redis.call('HGET', metaKey, 'status')
local incoming = ARGV[4]
local update = true
if current == 'complained' or current == 'bounced' or current == 'suppressed'
  or current == 'failed' or current == 'manual_review' then update = false end
if current == 'delivered' and incoming ~= 'complained' then update = false end
if update then
  redis.call('HSET', metaKey, 'status', incoming, 'updatedAt', ARGV[5])
  if incoming == 'delivered' or incoming == 'failed' or incoming == 'bounced'
    or incoming == 'complained' or incoming == 'suppressed' then
    redis.call('EXPIRE', dataKey, ARGV[6])
  end
end
return {1, submissionId}`;

export type ContactOutboxStatus =
  | "queued"
  | "sending"
  | "accepted"
  | "delivery_delayed"
  | "delivered"
  | "failed"
  | "bounced"
  | "complained"
  | "suppressed"
  | "manual_review";

export type ContactOutboxRecord = {
  submissionId: string;
  status: ContactOutboxStatus;
  email: ResendEmail;
  payloadHash: string;
  createdAt: number;
  updatedAt: number;
  attempts: number;
  firstAttemptAt?: number;
  providerEmailId?: string;
  lastErrorCode?: string;
};

export type PersistResult = "created" | "existing" | "conflict";

export type ProviderStatus = Extract<
  ContactOutboxStatus,
  | "delivery_delayed"
  | "delivered"
  | "failed"
  | "bounced"
  | "complained"
  | "suppressed"
>;

type Fetcher = typeof fetch;

type OutboxConfig = {
  url: string;
  token: string;
  encryptionKey: string;
};

type RedisResult = { result?: unknown; error?: string };

function metaKey(submissionId: string) {
  return `${PREFIX}:meta:${submissionId}`;
}

function dataKey(submissionId: string) {
  return `${PREFIX}:data:${submissionId}`;
}

function lockKey(submissionId: string) {
  return `${PREFIX}:lock:${submissionId}`;
}

function opaqueKey(kind: "provider" | "webhook", value: string) {
  const digest = createHash("sha256").update(value).digest("hex");
  return `${PREFIX}:${kind}:${digest}`;
}

function decodeMasterKey(encoded: string) {
  const key = Buffer.from(encoded, "base64");
  if (key.length !== 32) {
    throw new TypeError("CONTACT_OUTBOX_ENCRYPTION_KEY must decode to 32 bytes");
  }
  return key;
}

function deriveKey(master: Buffer, purpose: "encryption" | "digest") {
  return Buffer.from(
    hkdfSync("sha256", master, Buffer.alloc(0), `contact-outbox:${purpose}:v1`, 32),
  );
}

function canonicalPayload(email: ResendEmail) {
  return JSON.stringify(email);
}

export function outboxPayloadDigest(email: ResendEmail, encodedKey: string) {
  const digestKey = deriveKey(decodeMasterKey(encodedKey), "digest");
  return createHmac("sha256", digestKey)
    .update(canonicalPayload(email))
    .digest("base64url");
}

export function encryptOutboxPayload(
  email: ResendEmail,
  submissionId: string,
  encodedKey: string,
) {
  const key = deriveKey(decodeMasterKey(encodedKey), "encryption");
  const iv = randomBytes(12);
  const aad = Buffer.from(`contact-outbox:v1:${submissionId}`);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(aad);
  const ciphertext = Buffer.concat([
    cipher.update(canonicalPayload(email), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `v1.${iv.toString("base64url")}.${ciphertext.toString("base64url")}.${tag.toString("base64url")}`;
}

export function decryptOutboxPayload(
  envelope: string,
  submissionId: string,
  encodedKey: string,
) {
  const [version, ivValue, ciphertextValue, tagValue, extra] = envelope.split(".");
  if (version !== "v1" || !ivValue || !ciphertextValue || !tagValue || extra) {
    throw new TypeError("Invalid contact outbox envelope");
  }

  const key = deriveKey(decodeMasterKey(encodedKey), "encryption");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(ivValue, "base64url"),
  );
  decipher.setAAD(Buffer.from(`contact-outbox:v1:${submissionId}`));
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertextValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
  return JSON.parse(plaintext) as ResendEmail;
}

export function retryCutoffReached(firstAttemptAt: number | undefined, now: number) {
  return firstAttemptAt !== undefined && now - firstAttemptAt >= OUTBOX_RETRY_CUTOFF_MS;
}

export function nextRetryAt(attempts: number, now: number) {
  const delays = [60_000, 5 * 60_000, 15 * 60_000, 60 * 60_000];
  return now + delays[Math.min(Math.max(attempts - 1, 0), delays.length - 1)];
}

export function providerStatusTransition(
  current: ContactOutboxStatus,
  incoming: ProviderStatus,
) {
  if (
    ["complained", "bounced", "suppressed", "failed", "manual_review"].includes(
      current,
    )
  ) {
    return current;
  }
  if (current === "delivered" && incoming !== "complained") {
    return current;
  }
  return incoming;
}

function hashFields(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, String(entry)]),
    );
  }
  if (!Array.isArray(value)) {
    return {} as Record<string, string>;
  }
  const fields: Record<string, string> = {};
  for (let index = 0; index + 1 < value.length; index += 2) {
    fields[String(value[index])] = String(value[index + 1]);
  }
  return fields;
}

export class UpstashContactOutbox {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly encryptionKey: string;
  private readonly fetcher: Fetcher;

  constructor(config: OutboxConfig, fetcher: Fetcher = fetch) {
    this.baseUrl = config.url.replace(/\/+$/, "");
    this.token = config.token;
    this.encryptionKey = config.encryptionKey;
    this.fetcher = fetcher;
    decodeMasterKey(this.encryptionKey);
  }

  private async request(path: string, body: unknown) {
    const response = await this.fetcher(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(1_500),
      cache: "no-store",
    });
    const result: unknown = await response.json().catch(() => null);
    if (!response.ok || !result || typeof result !== "object") {
      throw new Error(`Contact outbox request failed with HTTP ${response.status}`);
    }
    return result;
  }

  private async command(command: unknown[]) {
    const response = (await this.request("", command)) as RedisResult;
    if (response.error) {
      throw new Error(`Contact outbox command failed: ${response.error}`);
    }
    return response.result;
  }

  private async transaction(commands: unknown[][]) {
    const response = await this.request("/multi-exec", commands);
    if (!Array.isArray(response)) {
      throw new Error("Contact outbox transaction returned an invalid response");
    }
    for (const entry of response as RedisResult[]) {
      if (entry.error) {
        throw new Error(`Contact outbox transaction failed: ${entry.error}`);
      }
    }
    return response as RedisResult[];
  }

  async persist(submissionId: string, email: ResendEmail, now = Date.now()) {
    const digest = outboxPayloadDigest(email, this.encryptionKey);
    const envelope = encryptOutboxPayload(email, submissionId, this.encryptionKey);
    const result = Number(
      await this.command([
        "EVAL",
        CREATE_SCRIPT,
        "3",
        metaKey(submissionId),
        dataKey(submissionId),
        DUE_KEY,
        digest,
        envelope,
        String(now),
        String(PENDING_TTL_SECONDS),
        String(META_TTL_SECONDS),
        submissionId,
      ]),
    );
    return (result === 1 ? "created" : result === 0 ? "existing" : "conflict") as PersistResult;
  }

  async load(submissionId: string): Promise<ContactOutboxRecord | null> {
    const entries = await this.transaction([
      ["HGETALL", metaKey(submissionId)],
      ["GET", dataKey(submissionId)],
    ]);
    const fields = hashFields(entries[0]?.result);
    const envelope = entries[1]?.result;
    if (!fields.status || typeof envelope !== "string") {
      return null;
    }
    return {
      submissionId,
      status: fields.status as ContactOutboxStatus,
      email: decryptOutboxPayload(envelope, submissionId, this.encryptionKey),
      payloadHash: fields.payloadHash,
      createdAt: Number(fields.createdAt),
      updatedAt: Number(fields.updatedAt),
      attempts: Number(fields.attempts ?? 0),
      firstAttemptAt: fields.firstAttemptAt
        ? Number(fields.firstAttemptAt)
        : undefined,
      providerEmailId: fields.providerEmailId || undefined,
      lastErrorCode: fields.lastErrorCode || undefined,
    };
  }

  async acquireLock(submissionId: string) {
    const token = randomUUID();
    const result = await this.command([
      "SET",
      lockKey(submissionId),
      token,
      "NX",
      "PX",
      String(LOCK_MS),
    ]);
    return result === "OK" ? token : null;
  }

  async releaseLock(submissionId: string, token: string) {
    await this.command([
      "EVAL",
      RELEASE_LOCK_SCRIPT,
      "1",
      lockKey(submissionId),
      token,
    ]);
  }

  async markAttempt(submissionId: string, record: ContactOutboxRecord, now: number) {
    const firstAttemptAt = record.firstAttemptAt ?? now;
    await this.transaction([
      [
        "HSET",
        metaKey(submissionId),
        "status",
        "sending",
        "attempts",
        String(record.attempts + 1),
        "firstAttemptAt",
        String(firstAttemptAt),
        "updatedAt",
        String(now),
      ],
      ["EXPIRE", metaKey(submissionId), String(META_TTL_SECONDS)],
    ]);
    return { attempts: record.attempts + 1, firstAttemptAt };
  }

  async recordAccepted(submissionId: string, emailId: string, now: number) {
    await this.transaction([
      [
        "HSET",
        metaKey(submissionId),
        "status",
        "accepted",
        "providerEmailId",
        emailId,
        "updatedAt",
        String(now),
      ],
      ["ZREM", DUE_KEY, submissionId],
      [
        "SET",
        opaqueKey("provider", emailId),
        submissionId,
        "EX",
        String(META_TTL_SECONDS),
      ],
      ["EXPIRE", dataKey(submissionId), String(TERMINAL_DATA_TTL_SECONDS)],
    ]);
  }

  async queueRetry(
    submissionId: string,
    attempts: number,
    errorCode: string,
    now: number,
  ) {
    const dueAt = nextRetryAt(attempts, now);
    await this.transaction([
      [
        "HSET",
        metaKey(submissionId),
        "status",
        "queued",
        "lastErrorCode",
        errorCode,
        "updatedAt",
        String(now),
      ],
      ["ZADD", DUE_KEY, String(dueAt), submissionId],
    ]);
    return dueAt;
  }

  async markTerminal(
    submissionId: string,
    status: "failed" | "manual_review",
    errorCode: string,
    now: number,
  ) {
    await this.transaction([
      [
        "HSET",
        metaKey(submissionId),
        "status",
        status,
        "lastErrorCode",
        errorCode,
        "updatedAt",
        String(now),
      ],
      ["ZREM", DUE_KEY, submissionId],
      ["EXPIRE", dataKey(submissionId), String(TERMINAL_DATA_TTL_SECONDS)],
    ]);
  }

  async dueSubmissionIds(now = Date.now(), limit = 3) {
    const result = await this.command([
      "ZRANGEBYSCORE",
      DUE_KEY,
      "-inf",
      String(now),
      "LIMIT",
      "0",
      String(limit),
    ]);
    return Array.isArray(result) ? result.map(String) : [];
  }

  async submissionForProviderEmail(emailId: string) {
    const result = await this.command(["GET", opaqueKey("provider", emailId)]);
    return typeof result === "string" ? result : undefined;
  }

  async recordProviderStatus(
    emailId: string,
    status: ProviderStatus,
    eventId: string,
    now = Date.now(),
  ): Promise<{ submissionId?: string; duplicate: boolean }> {
    const result = await this.command([
      "EVAL",
      PROVIDER_STATUS_SCRIPT,
      "2",
      opaqueKey("webhook", eventId),
      opaqueKey("provider", emailId),
      String(META_TTL_SECONDS),
      `${PREFIX}:meta:`,
      `${PREFIX}:data:`,
      status,
      String(now),
      String(TERMINAL_DATA_TTL_SECONDS),
    ]);
    const values = Array.isArray(result) ? result : [];
    return {
      duplicate: Number(values[0]) === 0,
      submissionId: values[1] ? String(values[1]) : undefined,
    };
  }
}

export function outboxFromEnvironment(
  env: NodeJS.ProcessEnv = process.env,
  fetcher: Fetcher = fetch,
) {
  const url = env.UPSTASH_REDIS_REST_URL?.trim();
  const token = env.UPSTASH_REDIS_REST_TOKEN?.trim();
  const encryptionKey = env.CONTACT_OUTBOX_ENCRYPTION_KEY?.trim();
  const cronSecret = env.CRON_SECRET?.trim();
  if (!url || !token || !encryptionKey || !cronSecret) {
    return null;
  }
  return new UpstashContactOutbox({ url, token, encryptionKey }, fetcher);
}

export function isTerminalOutboxStatus(status: ContactOutboxStatus) {
  return TERMINAL_STATUSES.has(status);
}
