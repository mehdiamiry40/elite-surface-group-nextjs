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
const AGE_KEY = `${PREFIX}:pending-age`;
const AWAITING_KEY = `${PREFIX}:awaiting-delivery`;
const FAILURE_KEY = `${PREFIX}:failures`;
const REVIEW_KEY = `${PREFIX}:manual-review`;
const MISSING_KEY = `${PREFIX}:missing`;
const WORKER_KEY = `${PREFIX}:worker`;
const SYNTHETIC_KEY = `${PREFIX}:synthetic`;
const ISSUE_SEQUENCE_KEY = `${PREFIX}:issue-sequence`;
const ISSUE_INDEX_KEY = `${PREFIX}:issue-index`;
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
  'updatedAt', ARGV[3], 'attempts', '0', 'category', ARGV[7])
redis.call('EXPIRE', KEYS[1], ARGV[5])
redis.call('SET', KEYS[2], ARGV[2], 'EX', ARGV[4])
redis.call('ZADD', KEYS[3], ARGV[3], ARGV[6])
redis.call('ZADD', KEYS[4], ARGV[3], ARGV[6])
if ARGV[7] == 'synthetic-monitor' then
  redis.call('HSET', KEYS[5], 'lastStartedAt', ARGV[3])
  redis.call('EXPIRE', KEYS[5], ARGV[5])
end
return 1`;

// Re-read both halves while holding the same owner's lock. A create that won
// the race after load() returned null must retain its queue membership.
const CLEAN_MISSING_SCRIPT = `
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 'locked' end
local status = redis.call('HGET', KEYS[2], 'status')
if status == 'accepted' or status == 'delivery_delayed' or status == 'delivered'
  or status == 'failed' or status == 'bounced' or status == 'complained'
  or status == 'suppressed' or status == 'manual_review' then
  redis.call('ZREM', KEYS[4], ARGV[2])
  redis.call('ZREM', KEYS[5], ARGV[2])
  return 'settled'
end
local createdAt = tonumber(redis.call('HGET', KEYS[2], 'createdAt'))
local attempts = tonumber(redis.call('HGET', KEYS[2], 'attempts'))
local hash = redis.call('HGET', KEYS[2], 'payloadHash')
local validStatus = status == 'queued' or status == 'sending' or status == 'accepted'
  or status == 'delivery_delayed' or status == 'delivered' or status == 'failed'
  or status == 'bounced' or status == 'complained' or status == 'suppressed'
  or status == 'manual_review'
if validStatus and createdAt and createdAt >= 0 and attempts and attempts >= 0
  and attempts == math.floor(attempts) and hash and hash ~= ''
  and redis.call('EXISTS', KEYS[3]) == 1 then return 'present' end
if redis.call('ZREM', KEYS[4], ARGV[2]) == 0 then return 'absent' end
redis.call('ZREM', KEYS[5], ARGV[2])
redis.call('ZADD', KEYS[6], ARGV[3], ARGV[2])
redis.call('ZADD', KEYS[8], redis.call('INCR', KEYS[7]), 'missing:' .. ARGV[2])
if redis.call('EXISTS', KEYS[2]) == 1 or redis.call('EXISTS', KEYS[3]) == 1 then
  redis.call('HSET', KEYS[2], 'status', 'manual_review', 'lastErrorCode',
    'outbox_record_incomplete', 'updatedAt', ARGV[3])
  redis.call('EXPIRE', KEYS[2], ARGV[4])
  redis.call('EXPIRE', KEYS[3], ARGV[5])
end
return 'removed'`;

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
    redis.call('ZREM', KEYS[3], submissionId)
    if incoming ~= 'delivered' then
      redis.call('ZADD', KEYS[4], ARGV[5], submissionId)
      redis.call('ZADD', KEYS[7], redis.call('INCR', KEYS[6]), 'failure:' .. submissionId)
    elseif redis.call('HGET', metaKey, 'category') == 'synthetic-monitor' then
      redis.call('HSET', KEYS[5], 'lastDeliveredAt', ARGV[5])
      redis.call('EXPIRE', KEYS[5], ARGV[1])
    end
  end
end
return {1, submissionId}`;

const TERMINAL_SCRIPT = `
redis.call('HSET', KEYS[1], 'status', ARGV[2], 'lastErrorCode', ARGV[3], 'updatedAt', ARGV[4])
redis.call('ZREM', KEYS[3], ARGV[1])
redis.call('ZREM', KEYS[4], ARGV[1])
redis.call('ZREM', KEYS[5], ARGV[1])
redis.call('ZADD', KEYS[6], ARGV[4], ARGV[1])
redis.call('ZADD', KEYS[8], redis.call('INCR', KEYS[7]), ARGV[6] .. ARGV[1])
redis.call('EXPIRE', KEYS[2], ARGV[5])
return 1`;

// Scores in the primary issue sets retain event time for retention; this
// independent index is sequenced at Redis commit time, never at a caller clock.
const PRUNE_ISSUES_SCRIPT = `
local prefixes = {'failure:', 'review:', 'missing:'}
for index = 1, 3 do
  local expired = redis.call('ZRANGEBYSCORE', KEYS[index], '-inf', ARGV[1], 'LIMIT', 0, 100)
  for _, id in ipairs(expired) do
    redis.call('ZREM', KEYS[index], id)
    redis.call('ZREM', KEYS[4], prefixes[index] .. id)
  end
end
return 1`;

const ACKNOWLEDGE_ISSUES_SCRIPT = `
local current = tonumber(redis.call('GET', KEYS[1]) or '0')
if tonumber(ARGV[1]) > current then return {-1, 0} end
local issues = redis.call('ZRANGEBYSCORE', KEYS[2], '-inf', ARGV[1], 'LIMIT', 0, 300)
for _, issue in ipairs(issues) do
  local separator = string.find(issue, ':')
  local kind = string.sub(issue, 1, separator - 1)
  local id = string.sub(issue, separator + 1)
  local index = kind == 'failure' and 3 or kind == 'review' and 4 or 5
  redis.call('ZREM', KEYS[index], id)
  redis.call('ZREM', KEYS[2], issue)
end
return {#issues, redis.call('ZCOUNT', KEYS[2], '-inf', ARGV[1])}`;

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

export function retryCutoffReached(
  idempotencyWindowStartedAt: number,
  now: number,
) {
  return now - idempotencyWindowStartedAt >= OUTBOX_RETRY_CUTOFF_MS;
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
        "5",
        metaKey(submissionId),
        dataKey(submissionId),
        DUE_KEY,
        AGE_KEY,
        SYNTHETIC_KEY,
        digest,
        envelope,
        String(now),
        String(PENDING_TTL_SECONDS),
        String(META_TTL_SECONDS),
        submissionId,
        email.tags?.find((tag) => tag.name === "category")?.value === "synthetic-monitor"
          ? "synthetic-monitor" : "website-enquiry",
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
    if (
      !["queued", "sending", "accepted", "delivery_delayed", ...TERMINAL_STATUSES].includes(fields.status) ||
      !fields.payloadHash || !Number.isFinite(Number(fields.createdAt)) ||
      !fields.createdAt || Number(fields.createdAt) < 0 ||
      !fields.attempts || !Number.isInteger(Number(fields.attempts)) ||
      Number(fields.attempts) < 0 || typeof envelope !== "string"
    ) {
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

  async cleanupDueMember(submissionId: string, token: string, now = Date.now()) {
    return await this.command([
      "EVAL", CLEAN_MISSING_SCRIPT, "8", lockKey(submissionId),
      metaKey(submissionId), dataKey(submissionId), DUE_KEY, AGE_KEY, MISSING_KEY,
      ISSUE_SEQUENCE_KEY, ISSUE_INDEX_KEY,
      token, submissionId, String(now), String(META_TTL_SECONDS),
      String(TERMINAL_DATA_TTL_SECONDS),
    ]) as "removed" | "present" | "locked" | "absent" | "settled";
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
      ["ZREM", AGE_KEY, submissionId],
      ["ZADD", AWAITING_KEY, String(now), submissionId],
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
    await this.command([
      "EVAL", TERMINAL_SCRIPT, "8", metaKey(submissionId), dataKey(submissionId),
      DUE_KEY, AGE_KEY, AWAITING_KEY, status === "manual_review" ? REVIEW_KEY : FAILURE_KEY,
      ISSUE_SEQUENCE_KEY, ISSUE_INDEX_KEY, submissionId, status, errorCode,
      String(now), String(TERMINAL_DATA_TTL_SECONDS), status === "manual_review" ? "review:" : "failure:",
    ]);
  }

  async dueSubmissionIds(now = Date.now(), limit = 30) {
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

  async syntheticStatus(submissionId: string) {
    const fields = hashFields(await this.command(["HGETALL", metaKey(submissionId)]));
    if (fields.category !== "synthetic-monitor") return null;
    return { state: fields.status, createdAt: Number(fields.createdAt), updatedAt: Number(fields.updatedAt) };
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
      "7",
      opaqueKey("webhook", eventId),
      opaqueKey("provider", emailId),
      AWAITING_KEY,
      FAILURE_KEY,
      SYNTHETIC_KEY,
      ISSUE_SEQUENCE_KEY,
      ISSUE_INDEX_KEY,
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

  async recordWorkerHeartbeat(
    phase: "started" | "completed" | "error",
    now = Date.now(),
    processed = 0,
  ) {
    const field = { started: "lastStartedAt", completed: "lastCompletedAt", error: "lastErrorAt" }[phase];
    await this.transaction([
      ["HSET", WORKER_KEY, field, String(now), "lastProcessed", String(processed)],
      ["EXPIRE", WORKER_KEY, String(META_TTL_SECONDS)],
    ]);
  }

  async healthSnapshot(now = Date.now()) {
    const keys = [FAILURE_KEY, REVIEW_KEY, MISSING_KEY, AWAITING_KEY];
    const cutoff = String(now - META_TTL_SECONDS * 1_000);
    const pruning = [
      ["EVAL", PRUNE_ISSUES_SCRIPT, "4", FAILURE_KEY, REVIEW_KEY, MISSING_KEY, ISSUE_INDEX_KEY, cutoff],
      ["ZREMRANGEBYSCORE", AWAITING_KEY, "-inf", cutoff],
    ];
    const results = (await this.transaction([
      ...pruning,
      ["HGETALL", WORKER_KEY], ["HGETALL", SYNTHETIC_KEY],
      ["ZCARD", DUE_KEY], ["ZCOUNT", DUE_KEY, "-inf", String(now)],
      ["ZRANGE", DUE_KEY, "0", "0", "WITHSCORES"],
      ["ZRANGE", AGE_KEY, "0", "0", "WITHSCORES"],
      ...keys.map((key) => ["ZCARD", key]),
      ["ZRANGE", AWAITING_KEY, "0", "0", "WITHSCORES"],
      ["ZCOUNT", AWAITING_KEY, "-inf", String(now - 30 * 60_000)],
      ["GET", ISSUE_SEQUENCE_KEY],
    ])).slice(pruning.length).map((entry) => entry.result);
    const timestamp = (value: unknown) => {
      const n = Number(value);
      return value !== undefined && Number.isFinite(n) ? n : null;
    };
    const oldest = (value: unknown) => Array.isArray(value) ? timestamp(value[1]) : null;
    const age = (value: number | null) => value === null ? null : Math.max(0, now - value);
    const worker = hashFields(results[0]);
    const synthetic = hashFields(results[1]);
    const oldestDue = oldest(results[4]);
    return {
      acknowledgementSequence: Number(results[12] ?? 0),
      worker: {
        lastStartedAt: timestamp(worker.lastStartedAt),
        lastCompletedAt: timestamp(worker.lastCompletedAt),
        lastErrorAt: timestamp(worker.lastErrorAt),
      },
      queue: {
        depth: Number(results[2]), dueDepth: Number(results[3]),
        oldestAgeMs: age(oldest(results[5]) ?? oldestDue),
        oldestDueAgeMs: age(oldestDue),
      },
      delivery: {
        failures: Number(results[6]), manualReview: Number(results[7]),
        missing: Number(results[8]), awaiting: Number(results[9]),
        oldestAwaitingAgeMs: age(oldest(results[10])), overdue: Number(results[11]),
      },
      synthetic: {
        lastStartedAt: timestamp(synthetic.lastStartedAt),
        lastDeliveredAt: timestamp(synthetic.lastDeliveredAt),
      },
    };
  }

  async acknowledgeIssues(through: number) {
    const result = await this.command([
      "EVAL", ACKNOWLEDGE_ISSUES_SCRIPT, "5", ISSUE_SEQUENCE_KEY, ISSUE_INDEX_KEY,
      FAILURE_KEY, REVIEW_KEY, MISSING_KEY, String(through),
    ]);
    const values = Array.isArray(result) ? result : [];
    if (Number(values[0]) < 0) throw new RangeError("Acknowledgement sequence is in the future");
    return { acknowledged: Number(values[0]), remainingThroughSequence: Number(values[1]) };
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
