// GET and PUT for the learner's feed settings (W-1717). Owner: learner-data-engineer.
// Privacy ruling: company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3 B1–B4, §3.1 D1–D3, §3.2 G1–G4.
// Design note: company/personalization/data/2026-10-16-settings-api-note.md
//
// B2: handleSettingsPut is the only caller of SettingsStore#put; only the settings route's PUT calls it.
// B4: nothing here logs a request body, a stored value, an id, or an error's message or detail. The one log line is
//     fixed text plus, at most, a five-character SQLSTATE. Every path returns a Response; nothing is thrown to Next,
//     whose default handler would print the error (a pg constraint error's `detail` holds the failing row).
// D1: no row and NULL both answer personalizationOn: null. D2: every request reads the store; nothing is cached.
// D2a/C7: the PUT never reads the row before writing it. It hands the validated request to store.put, which applies
//     it in one SQL statement against the locked row (settings-store.ts), so no stale value can be written back.
// D3: the body's keys are an allow-list; an arm, a timestamp or any other key is dropped unread and never stored.
// Anonymous learners never reach this account store: no session means 401; no new device preferences are saved.

import { sameAccountHeader } from "../http";
import { cleanStored, parseSettingsWrite, type FeedSettings, type SettingsCatalog } from "./settings";
import type { SettingsStore } from "./settings-store";

/** Longest PUT body parsed. 50 typed slugs of 200 characters plus the subjects fit well under it. */
export const MAX_SETTINGS_BODY_CHARS = 16_384;

export type SettingsDeps = {
  /** ACCOUNTS_ENABLED, read per request (ADR-008 C5). Off: the route answers 404 as if it did not exist. */
  enabled: () => boolean;
  /** The signed-in account id, or null, from the existing account session helper. */
  userId: (req: Request) => Promise<string | null>;
  accountTag: (userId: string) => string;
  store: SettingsStore;
  catalog: () => SettingsCatalog | Promise<SettingsCatalog>;
  /** Receives fixed text only (B4). Defaults to console.error. */
  log?: (line: string) => void;
};

const NO_STORE = { "cache-control": "no-store" };

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...NO_STORE } });

const empty = (status: number): Response => new Response(null, { status, headers: NO_STORE });

/** A fixed line, never the error's text: SQLSTATE codes are five characters of [0-9A-Z] and carry no learner data. */
function logFailure(deps: SettingsDeps, op: "get" | "put", stage: "auth" | "store" | "catalog", err: unknown): void {
  const code = (err as { code?: unknown } | null)?.code;
  const sqlstate = typeof code === "string" && /^[0-9A-Z]{5}$/.test(code) ? ` sqlstate=${code}` : "";
  try {
    (deps.log ?? console.error)(`settings ${op}: ${stage} failed${sqlstate}`);
  } catch {
    /* a broken logger must not turn into a thrown error */
  }
}

/**
 * ADR-008 C7: a state-changing route checks Origin. A PUT must carry an Origin header naming this host; a missing
 * Origin, "null", or a cross-site fetch is refused. GET needs no check (it changes nothing).
 */
export function sameOriginWrite(req: Request): boolean {
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
  try {
    return hosts.has(new URL(origin).host);
  } catch {
    return false;
  }
}

type Auth = { ok: true; userId: string; accountTag: string } | { ok: false; res: Response };

async function authenticate(req: Request, deps: SettingsDeps, op: "get" | "put"): Promise<Auth> {
  let userId: string | null;
  try {
    userId = await deps.userId(req);
  } catch (err) {
    logFailure(deps, op, "auth", err);
    return { ok: false, res: json(500, { error: "unavailable" }) };
  }
  if (!userId) return { ok: false, res: json(401, { error: "signed_out" }) };
  try {
    return { ok: true, userId, accountTag: deps.accountTag(userId) };
  } catch (err) {
    logFailure(deps, op, "auth", err);
    return { ok: false, res: json(500, { error: "unavailable" }) };
  }
}

async function loadCatalog(deps: SettingsDeps, op: "get" | "put"): Promise<SettingsCatalog | null> {
  try {
    return await deps.catalog();
  } catch (err) {
    logFailure(deps, op, "catalog", err);
    return null;
  }
}

/** GET: the learner's own settings, ids no longer in the catalog left out. No row answers the D1 "no choice". */
export async function handleSettingsGet(req: Request, deps: SettingsDeps): Promise<Response> {
  try {
    if (!deps.enabled()) return empty(404);
  } catch {
    return empty(404);
  }
  const auth = await authenticate(req, deps, "get");
  if (!auth.ok) return auth.res;
  const catalog = await loadCatalog(deps, "get");
  if (!catalog) return json(500, { error: "unavailable" });
  let row: FeedSettings | null;
  try {
    row = await deps.store.get(auth.userId);
  } catch (err) {
    logFailure(deps, "get", "store", err);
    return json(500, { error: "unavailable" });
  }
  return json(200, { settings: cleanStored(row, catalog), accountTag: auth.accountTag });
}

/**
 * PUT: the learner's stated choices (SS3).
 *  {"personalizationOn"?: true|false|null, "subjects"?: string[], "lessOf"?: string[], "mode"?: "set"|"merge"}
 * "set" (default): keys sent replace stored ones. "merge": the "Keep my history" confirm (G1–G4). The rule for both
 * is applyWrite (settings.ts), evaluated atomically by the store's single statement (D2a).
 * Unknown keys and ids are dropped (B1, gate 2.3); wrong types are 400 "malformed"; over the caps is 400 "too_many".
 * Answers 200 with the settings as now stored, which the device then keeps (G4 after the learner's confirm).
 * A row is created only when there is a choice to keep: a write that leaves "no choice" on an account with no row
 * writes nothing, and an unchanged row is not rewritten. The answer is the stored row read through cleanStored, so
 * ids that left the catalog are not handed back to the device.
 */
export async function handleSettingsPut(req: Request, deps: SettingsDeps): Promise<Response> {
  try {
    if (!deps.enabled()) return empty(404);
  } catch {
    return empty(404);
  }
  if (!sameOriginWrite(req)) return json(403, { error: "origin" });
  const auth = await authenticate(req, deps, "put");
  if (!auth.ok) return auth.res;
  if (!sameAccountHeader(req, auth.accountTag)) return json(409, { error: "account_changed" });

  let body: unknown;
  try {
    const declared = Number(req.headers.get("content-length") ?? 0);
    if (declared > MAX_SETTINGS_BODY_CHARS) return json(413, { error: "too_large" });
    const text = await req.text();
    if (text.length > MAX_SETTINGS_BODY_CHARS) return json(413, { error: "too_large" });
    body = JSON.parse(text);
  } catch {
    return json(400, { error: "malformed" });
  }

  const catalog = await loadCatalog(deps, "put");
  if (!catalog) return json(500, { error: "unavailable" });
  const parsed = parseSettingsWrite(body, catalog);
  if (!parsed.ok) return json(400, { error: parsed.error });
  const { patch } = parsed;

  try {
    const stored: FeedSettings | null = await deps.store.put(auth.userId, patch);
    return json(200, { settings: cleanStored(stored, catalog), accountTag: auth.accountTag });
  } catch (err) {
    logFailure(deps, "put", "store", err);
    return json(500, { error: "unavailable" });
  }
}
