// Small HTTP helpers for the /api/account/* routes (EDD-008). Owner: backend-engineer. Server only.
// Relative imports only, so node:test can load this without the Next alias.
//
// Logging rule (readiness A-6, privacy B4 style): nothing here or in a caller logs a request body, an email, a token,
// an id, or an error's message or detail. A pg constraint error's `detail` holds the failing row, which can be an
// email. `logFailure` prints fixed text plus, at most, a five-character SQLSTATE or one allow-listed library code.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const NO_STORE = { "cache-control": "no-store" } as const;

export function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...NO_STORE, ...headers },
  });
}

export function empty(status: number, headers: Record<string, string> = {}): Response {
  return new Response(null, { status, headers: { ...NO_STORE, ...headers } });
}

export const notFound = () => empty(404);

/**
 * PC3: an opaque value per account for the device state (s3c:account-device:v1), so the client can tell that a
 * different account is now signed in without a marker in the URL. HMAC-SHA-256 of the account id under the auth
 * secret, first 16 bytes, base64url (22 characters). It is not the id, cannot be reversed or matched to an id without
 * the secret, and holds no email. Nothing stores it on the server.
 * Rotation (principal re-read 2026-10-18, second): changing BETTER_AUTH_SECRET invalidates every session, so every
 * device is signed out and its device state removed before a tag is compared; rotating through Better Auth's
 * versioned BETTER_AUTH_SECRETS leaves BETTER_AUTH_SECRET, and so every tag, unchanged.
 */
export function accountTag(secret: string, accountId: string): string {
  return createHmac("sha256", secret).update(`s3c:account-device:v1\0${accountId}`).digest().subarray(0, 16).toString("base64url");
}

/**
 * PC10: the request header that binds an account write to the account the page started with. The client sends the
 * /me tag it holds; the write routes compare it with the session's tag and answer 409 without writing on a mismatch
 * or a missing header. It travels only to our own /api/account write routes (tests/accounts/static.test.mjs S18).
 * The same literal is ACCOUNT_HEADER in src/lib/account-client.ts (S18 checks they match).
 */
export const ACCOUNT_HEADER = "x-s3c-account";

/** PC10: does the request carry exactly `expected` in ACCOUNT_HEADER? A missing or empty header never matches. */
export function sameAccountHeader(req: Request, expected: string): boolean {
  const sent = req.headers.get(ACCOUNT_HEADER);
  if (!sent || !expected) return false;
  const a = Buffer.from(sent);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Library error codes `logFailure` may print (readiness Ruling 1, W-1714). Exact string match only, never a pattern.
 * Add one at a time, each with its reason:
 * - SCHEMA_MISMATCH: Better Auth's SchemaMismatchError (@better-auth/core db/schema-diff). The store lacks a table or
 *   column the library writes; it is cached until the instance restarts (readiness Ruling 2), so the log must say so.
 */
export const LOGGED_LIBRARY_CODES: readonly string[] = Object.freeze(["SCHEMA_MISMATCH"]);

/**
 * Fixed text plus a SQLSTATE if the error carries one, or a library code from LOGGED_LIBRARY_CODES. Never the
 * message, detail, findings, table or column names, cause, stack or any value.
 */
export function logFailure(what: string, err: unknown, log: (line: string) => void = console.error): void {
  let code: unknown;
  try {
    code = (err as { code?: unknown } | null)?.code;
  } catch {
    code = undefined; // a throwing getter must not throw here
  }
  const sqlstate = typeof code === "string" && /^[0-9A-Z]{5}$/.test(code) ? ` sqlstate=${code}` : "";
  const libCode = typeof code === "string" && LOGGED_LIBRARY_CODES.includes(code) ? ` code=${code}` : "";
  try {
    log(`account ${what}: failed${sqlstate}${libCode}`);
  } catch {
    /* a broken logger must not throw */
  }
}

/**
 * C7: every state-changing route of ours checks Origin against this host and accepts only application/json.
 * A missing Origin, "null", or a cross-site / same-site (sibling subdomain) fetch is refused. Same rule as the
 * settings route's sameOriginWrite (origin/perso-m1), so the two never disagree.
 */
export function sameOriginWrite(req: Request, extraOrigins: readonly string[] = []): boolean {
  const origin = req.headers.get("origin");
  if (!origin || origin === "null") return false;
  const site = req.headers.get("sec-fetch-site");
  if (site === "cross-site" || site === "same-site") return false;
  const hosts = new Set<string>();
  try {
    hosts.add(new URL(req.url).host);
  } catch {
    /* ignore */
  }
  for (const h of [req.headers.get("x-forwarded-host"), req.headers.get("host")]) if (h) hosts.add(h.split(",")[0].trim());
  for (const o of extraOrigins) {
    try {
      hosts.add(new URL(o).host);
    } catch {
      /* ignore */
    }
  }
  try {
    return hosts.has(new URL(origin).host);
  } catch {
    return false;
  }
}

export function isJson(req: Request): boolean {
  const ct = (req.headers.get("content-type") ?? "").toLowerCase();
  return ct.split(";")[0].trim() === "application/json";
}

/** Read and parse a JSON body of at most `max` characters. Returns undefined on any failure. */
export async function readJson(req: Request, max: number): Promise<{ ok: true; body: unknown } | { ok: false; status: 400 | 413 }> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > max) return { ok: false, status: 413 };
  let text: string;
  try {
    text = await req.text();
  } catch {
    return { ok: false, status: 400 };
  }
  if (text.length > max) return { ok: false, status: 413 };
  try {
    return { ok: true, body: JSON.parse(text) };
  } catch {
    return { ok: false, status: 400 };
  }
}

/** The client IP for the in-memory limiter only. Never stored, never logged (P1.1; ADR-008 decision 6). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ---- Rate limiting (C2, M6, PRD-005 privacy C3.2) ----
// Keys are HMAC-SHA-256 under a random key that lives only in this instance's memory, so the map never holds an
// IP, an email or a user id, and a key cannot be reversed by hashing guesses offline. Per instance, never persisted.
const LIMITER_SECRET = randomBytes(32);

export function limiterKey(raw: string): string {
  return createHmac("sha256", LIMITER_SECRET).update(raw).digest("hex");
}

export class RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(
    private readonly max: number,
    private readonly windowMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  /** Records one hit for each key and answers true if any key is over its limit (the hit is still counted). */
  limited(...rawKeys: string[]): boolean {
    const t = this.now();
    let over = false;
    for (const raw of rawKeys) {
      const k = limiterKey(raw);
      const list = (this.hits.get(k) ?? []).filter((x) => t - x < this.windowMs);
      list.push(t);
      this.hits.set(k, list);
      if (list.length > this.max) over = true;
    }
    if (this.hits.size > 10_000) this.sweep(t);
    return over;
  }

  /** Test hook: the stored keys (hashes only). */
  keys(): string[] {
    return [...this.hits.keys()];
  }

  private sweep(t: number) {
    for (const [k, list] of this.hits) if (!list.some((x) => t - x < this.windowMs)) this.hits.delete(k);
  }
}
