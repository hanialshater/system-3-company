// The /api/events allow-list (privacy ruling company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md,
// conditions C1 and C2; gate rows P6.1 and P6.2). Server only by use: imported by src/app/api/events/route.ts.
//
// C1: the route logs an explicit pick of fields per type, never the request body. A key that is not
//     listed here is never logged. Strings are capped; a value of the wrong kind drops the whole event.
// C2: `type: "exp"` is accepted only when every field validates against the one definition in the
//     ruling and `exp` is in REGISTERED_EXPERIMENTS, which is empty until analytics-steward registers one.
//     Anything else is dropped. The caller always answers 204, so a sender cannot tell a drop from a log.
//
// No identifier is read or added here: no cookie, no IP, no user agent, no session id (P6.2).
// The server adds `at`; a client `at` is never taken.

import { eventWriteAllowed } from "./spike";

/** Longest slug the intake will log. Catalog slugs are far shorter; a longer value is not a slug. */
export const MAX_SLUG_LENGTH = 200;
/** Longest request body, in characters, that is parsed. A real beacon is under 200. */
export const MAX_BODY_CHARS = 2048;

/** The schedule values an `exp` event may carry (src/kit/progress.ts REVISIT_SCHEDULE_DAYS; the ruling's 1 | 3 | 7 | 21). */
export const EXP_SPACED_DAYS: readonly number[] = [1, 3, 7, 21];
export const EXP_ORIGINS: readonly string[] = ["swap", "challenge", "none"];
export const EXP_ARMS: readonly string[] = ["test", "holdout"];

export type RegisteredExperiment = {
  /** "EXP-<n>", as registered by analytics-steward. */
  id: string;
  /** First UTC day (YYYY-MM-DD) on which the server drops this experiment's events. An invalid date accepts nothing. */
  closes: string;
};

/**
 * The server-side list of registered experiments (ruling C2). EMPTY in this change: no `exp` record is
 * accepted until analytics-steward registers an experiment and an engineer adds it here, in a reviewed change.
 * Removing an entry, or a `closes` date in the past, stops that experiment's collection (C8's per-experiment
 * switch, at the cost of a rebuild until W-706 brings a run-time switch).
 */
export const REGISTERED_EXPERIMENTS: readonly RegisteredExperiment[] = [];

export type LoggedEvent = { at: string; type: string; slug: string } & Record<string, string | number | boolean>;

export type PickOptions = {
  now?: number;
  experiments?: readonly RegisteredExperiment[];
  /** Is this a catalog slug? Asked only for `exp`, and only after every other field has passed. */
  isCatalogSlug?: (slug: string) => boolean | Promise<boolean>;
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isSlug = (v: unknown): v is string => typeof v === "string" && v.length > 0 && v.length <= MAX_SLUG_LENGTH;
const isInt = (v: unknown, min: number, max: number): v is number => Number.isInteger(v) && (v as number) >= min && (v as number) <= max;
const SAFE = Number.MAX_SAFE_INTEGER;

/**
 * The existing types (src/kit/types.ts LessonEvent). Each lists exactly the fields it may log beyond `type` and
 * `slug`, with a check. Every field the current senders (src/kit/Lesson.tsx, src/components/Feed.tsx) send is kept.
 */
const FIELDS: Record<string, Record<string, (v: unknown) => boolean>> = {
  view: {},
  interact: {},
  reveal: {},
  predict: { option: (v) => isInt(v, 0, 99), correct: (v) => typeof v === "boolean" },
  // spacedDays and dwellMs come from Date.now() differences, so a clock change can make them negative.
  recall: { correct: (v) => typeof v === "boolean", spacedDays: (v) => isInt(v, -SAFE, SAFE) },
  complete: { dwellMs: (v) => isInt(v, -SAFE, SAFE) },
};

function acceptsExperiment(id: unknown, experiments: readonly RegisteredExperiment[], now: number): boolean {
  if (typeof id !== "string" || !/^EXP-[0-9]{1,6}$/.test(id)) return false;
  const reg = experiments.find((e) => e.id === id);
  if (!reg || !/^\d{4}-\d{2}-\d{2}$/.test(reg.closes)) return false;
  const closesAt = Date.parse(`${reg.closes}T00:00:00Z`);
  return Number.isFinite(closesAt) && now < closesAt;
}

const EXP_KEYS = new Set(["type", "exp", "origin", "arm", "slug", "correct", "spacedDays"]);

/** The record to log for a parsed body, or null to drop it. Never returns a key the tables above do not name. */
export async function pickEvent(body: unknown, opts: PickOptions = {}): Promise<LoggedEvent | null> {
  if (!isObj(body)) return null;
  const now = opts.now ?? Date.now();
  const at = new Date(now).toISOString();
  const type = body.type;

  if (type === "exp") {
    // C2: every field validates, and nothing else is present (a stray key means a broken sender: no token may pass).
    for (const k of Object.keys(body)) if (!EXP_KEYS.has(k)) return null;
    if (!acceptsExperiment(body.exp, opts.experiments ?? REGISTERED_EXPERIMENTS, now)) return null;
    if (typeof body.origin !== "string" || !EXP_ORIGINS.includes(body.origin)) return null;
    if ("arm" in body && (typeof body.arm !== "string" || !EXP_ARMS.includes(body.arm))) return null;
    if (!isSlug(body.slug) || typeof body.correct !== "boolean") return null;
    if (typeof body.spacedDays !== "number" || !EXP_SPACED_DAYS.includes(body.spacedDays)) return null;
    if (!opts.isCatalogSlug || !(await opts.isCatalogSlug(body.slug))) return null;
    const out: LoggedEvent = { at, type: "exp", exp: body.exp as string, origin: body.origin, slug: body.slug };
    if (typeof body.arm === "string") out.arm = body.arm;
    out.correct = body.correct;
    out.spacedDays = body.spacedDays;
    return out;
  }

  if (typeof type !== "string" || !Object.hasOwn(FIELDS, type)) return null;
  if (!isSlug(body.slug)) return null;
  const out: LoggedEvent = { at, type, slug: body.slug };
  for (const [key, ok] of Object.entries(FIELDS[type])) {
    const v = body[key];
    if (!ok(v)) return null;
    out[key] = v as string | number | boolean;
  }
  return out;
}

export type IntakeDeps = PickOptions & { log?: (line: string) => void };

/** The whole POST: guard, bounded read, pick, log one line. Always 204 except the W-477 refusal (403). */
export async function handleEventPost(req: Request, deps: IntakeDeps = {}): Promise<Response> {
  if (!eventWriteAllowed(req)) return new Response(null, { status: 403 });
  try {
    const declared = Number(req.headers.get("content-length") ?? 0);
    const text = declared > MAX_BODY_CHARS * 4 ? "" : await req.text();
    if (text && text.length <= MAX_BODY_CHARS) {
      const rec = await pickEvent(JSON.parse(text), deps);
      if (rec) (deps.log ?? console.log)(JSON.stringify(rec));
    }
  } catch {
    /* malformed events are dropped */
  }
  return new Response(null, { status: 204 });
}
