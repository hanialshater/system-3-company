// Learner rows: progress, recalls, likes, saves; the merge, export and deletion (EDD-008 §7-§9 and the 2026-10-17
// addendum). Owner: backend-engineer. Server only; relative imports only.
//
// Nothing here logs. Errors are rethrown untouched to the handler, which reduces them to fixed text (http.ts).
// lesson_like and lesson_save are read here only for the account's own lists, the export, the deletion and the
// public count (PRD-005 rule 2; tests/platform/engagement-not-ranking.test.mjs fails on any other reader).
import type { Query } from "./db";

// ---------- Shapes (the s3c:progress:v1 shape, src/kit/progress.ts) ----------
export type Recall = { at: number; correct: boolean };
export type LessonProgress = { completedAt?: number; predictedCorrectly?: boolean; recalls: Recall[] };
export type ProgressMap = Record<string, LessonProgress>;
export type Mark = { slug: string; at: number };

// ---------- Validation (§8) ----------
export const MAX_MERGE_BODY_CHARS = 1_000_000;
export const MAX_SLUGS = 5_000;
export const MAX_RECALLS_PER_SLUG = 100;
export const MAX_SAVES = 5_000;
export const EARLIEST_MS = Date.UTC(2026, 0, 1);
const DAY_MS = 86_400_000;

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const okTime = (v: unknown, now: number): v is number =>
  typeof v === "number" && Number.isInteger(v) && v >= EARLIEST_MS && v <= now + DAY_MS;

/**
 * Clean a ProgressMap from a device: catalog slugs only, at most MAX_SLUGS, booleans only, times in bounds, at most
 * MAX_RECALLS_PER_SLUG recalls per slug (the newest kept), unknown keys dropped. Never throws; bad parts are dropped.
 */
export function cleanProgressMap(raw: unknown, inCatalog: (slug: string) => boolean, now: number): ProgressMap {
  const out: ProgressMap = {};
  if (!isObj(raw)) return out;
  let n = 0;
  for (const [slug, v] of Object.entries(raw)) {
    if (n >= MAX_SLUGS) break;
    if (slug.length < 1 || slug.length > 200 || !inCatalog(slug) || !isObj(v)) continue;
    const entry: LessonProgress = { recalls: [] };
    if (okTime(v.completedAt, now)) entry.completedAt = v.completedAt;
    if (typeof v.predictedCorrectly === "boolean") entry.predictedCorrectly = v.predictedCorrectly;
    if (Array.isArray(v.recalls)) {
      const seen = new Set<number>();
      const recalls: Recall[] = [];
      for (const r of v.recalls) {
        if (!isObj(r) || !okTime(r.at, now) || typeof r.correct !== "boolean" || seen.has(r.at)) continue;
        seen.add(r.at);
        recalls.push({ at: r.at, correct: r.correct });
      }
      recalls.sort((a, b) => a.at - b.at);
      entry.recalls = recalls.slice(-MAX_RECALLS_PER_SLUG);
    }
    if (entry.completedAt === undefined && entry.predictedCorrectly === undefined && entry.recalls.length === 0) continue;
    out[slug] = entry;
    n++;
  }
  return out;
}

/** Clean a list of saves from a device ([{slug, at}]): catalog slugs, valid times, first per slug, at most MAX_SAVES. */
export function cleanMarks(raw: unknown, inCatalog: (slug: string) => boolean, now: number): Mark[] {
  if (!Array.isArray(raw)) return [];
  const out: Mark[] = [];
  const seen = new Set<string>();
  for (const m of raw) {
    if (out.length >= MAX_SAVES) break;
    if (!isObj(m) || typeof m.slug !== "string" || seen.has(m.slug) || !inCatalog(m.slug) || !okTime(m.at, now)) continue;
    seen.add(m.slug);
    out.push({ slug: m.slug, at: m.at });
  }
  return out;
}

// ---------- Progress ----------
const UPSERT_PROGRESS_SQL = `
INSERT INTO progress (user_id, slug, completed_at_ms, predicted_correctly)
SELECT $1, x.slug, x.completed_at_ms, x.predicted_correctly
FROM jsonb_to_recordset($2::jsonb) AS x(slug text, completed_at_ms bigint, predicted_correctly boolean)
ON CONFLICT (user_id, slug) DO UPDATE SET
  completed_at_ms     = LEAST(progress.completed_at_ms, EXCLUDED.completed_at_ms),
  predicted_correctly = COALESCE(progress.predicted_correctly, EXCLUDED.predicted_correctly)
WHERE progress.completed_at_ms IS DISTINCT FROM LEAST(progress.completed_at_ms, EXCLUDED.completed_at_ms)
   OR progress.predicted_correctly IS DISTINCT FROM COALESCE(progress.predicted_correctly, EXCLUDED.predicted_correctly)`;

const INSERT_RECALLS_SQL = `
INSERT INTO recall (user_id, slug, at_ms, correct)
SELECT $1, r.slug, r.at_ms, r.correct
FROM jsonb_to_recordset($2::jsonb) AS r(slug text, at_ms bigint, correct boolean)
ON CONFLICT DO NOTHING`;

/**
 * Union-merge a cleaned map into the account (§8): earliest completion wins, an existing prediction is never
 * overwritten (Q7), recalls de-duplicated by `at`. Nothing is ever deleted or lowered. Idempotent. Call inside a
 * transaction.
 */
export async function mergeProgress(q: Query, userId: string, map: ProgressMap): Promise<void> {
  const slugs = Object.keys(map);
  if (!slugs.length) return;
  const rows = slugs.map((slug) => ({
    slug,
    completed_at_ms: map[slug].completedAt ?? null,
    predicted_correctly: map[slug].predictedCorrectly ?? null,
  }));
  await q(UPSERT_PROGRESS_SQL, [userId, JSON.stringify(rows)]);
  const recalls = slugs.flatMap((slug) => map[slug].recalls.map((r) => ({ slug, at_ms: r.at, correct: r.correct })));
  if (recalls.length) await q(INSERT_RECALLS_SQL, [userId, JSON.stringify(recalls)]);
}

/** The account's map, in the s3c:progress:v1 shape, recalls sorted by `at` (revisitDue reads the last one). */
export async function loadProgressMap(q: Query, userId: string, slugs?: string[]): Promise<ProgressMap> {
  const filter = slugs ? " AND slug = ANY($2::text[])" : "";
  const args = slugs ? [userId, slugs] : [userId];
  const { rows: prog } = await q(`SELECT slug, completed_at_ms, predicted_correctly FROM progress WHERE user_id = $1${filter} ORDER BY slug`, args);
  const { rows: recs } = await q(`SELECT slug, at_ms, correct FROM recall WHERE user_id = $1${filter} ORDER BY slug, at_ms`, args);
  const out: ProgressMap = {};
  for (const r of prog) {
    const e: LessonProgress = { recalls: [] };
    if (r.completed_at_ms !== null) e.completedAt = Number(r.completed_at_ms);
    if (r.predicted_correctly !== null) e.predictedCorrectly = Boolean(r.predicted_correctly);
    out[String(r.slug)] = e;
  }
  for (const r of recs) out[String(r.slug)]?.recalls.push({ at: Number(r.at_ms), correct: Boolean(r.correct) });
  return out;
}

// ---------- Likes and saves (PRD-005; privacy ruling 2026-10-17) ----------
export type MarkTable = "lesson_like" | "lesson_save";

export async function putMark(q: Query, table: MarkTable, userId: string, slug: string, at: number): Promise<void> {
  await q(`INSERT INTO ${table} (user_id, slug, created_at_ms) VALUES ($1, $2, $3) ON CONFLICT (user_id, slug) DO NOTHING`, [userId, slug, at]);
}

/** Unlike / unsave: the row is deleted (no soft delete, no tombstone; privacy C5.3, C6.1). */
export async function deleteMark(q: Query, table: MarkTable, userId: string, slug: string): Promise<void> {
  await q(`DELETE FROM ${table} WHERE user_id = $1 AND slug = $2`, [userId, slug]);
}

/** The account's own list, newest first. Never another account's rows (privacy C1.2). */
export async function listMarks(q: Query, table: MarkTable, userId: string): Promise<Mark[]> {
  const { rows } = await q(`SELECT slug, created_at_ms FROM ${table} WHERE user_id = $1 ORDER BY created_at_ms DESC, slug`, [userId]);
  return rows.map((r) => ({ slug: String(r.slug), at: Number(r.created_at_ms) }));
}

/** One-time union of a device's saves at "Keep my history" (C5.2): inserts only, never deletes. */
export async function mergeSaves(q: Query, userId: string, saves: Mark[]): Promise<void> {
  if (!saves.length) return;
  await q(
    `INSERT INTO lesson_save (user_id, slug, created_at_ms)
     SELECT $1, s.slug, s.at FROM jsonb_to_recordset($2::jsonb) AS s(slug text, at bigint)
     ON CONFLICT (user_id, slug) DO NOTHING`,
    [userId, JSON.stringify(saves)],
  );
}

// ---------- Public like count (privacy ruling 2026-10-17 C2, C3) ----------
/** Steps a lesson may show. Below 10: null (0 and 9 look the same). Never a raw number (C2.1, C2.4). */
export const COUNT_STEPS: readonly [number, string][] = [
  [1000, "1k+"],
  [250, "250+"],
  [100, "100+"],
  [50, "50+"],
  [25, "25+"],
  [10, "10+"],
];

export function countLabel(n: number): string | null {
  for (const [min, label] of COUNT_STEPS) if (n >= min) return label;
  return null;
}

/**
 * Labels for the given catalog slugs. A like counts only when its account is at least 24 hours old (C3.1); hidden
 * slugs answer null (C3.4). The raw counts never leave this function: only labels are returned.
 */
export async function countLabels(q: Query, slugs: string[], hidden: ReadonlySet<string>): Promise<Record<string, string | null>> {
  const out: Record<string, string | null> = {};
  for (const s of slugs) out[s] = null;
  const ask = slugs.filter((s) => !hidden.has(s));
  if (!ask.length) return out;
  const { rows } = await q(
    `SELECT l.slug, count(*) AS n FROM lesson_like l JOIN auth_user u ON u.id = l.user_id
     WHERE l.slug = ANY($1::text[]) AND u.created_at <= now() - interval '24 hours'
     GROUP BY l.slug`,
    [ask],
  );
  for (const r of rows) out[String(r.slug)] = countLabel(Number(r.n));
  return out;
}

// ---------- Account facts ----------
export async function accountBand(q: Query, userId: string): Promise<string | null> {
  const { rows } = await q("SELECT age_band FROM auth_user WHERE id = $1", [userId]);
  return rows[0] ? String(rows[0].age_band) : null;
}

async function tableExists(q: Query, name: string): Promise<boolean> {
  const { rows } = await q("SELECT to_regclass($1) IS NOT NULL AS ok", [`public.${name}`]);
  return Boolean(rows[0]?.ok);
}

// ---------- Export (§9; s3c-export-v1) ----------
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : v === null || v === undefined ? null : new Date(String(v)).toISOString());

export async function exportAccount(q: Query, userId: string) {
  const { rows: users } = await q(
    "SELECT email, age_band, created_at, last_sign_in_at, policy_version, policy_accepted_at FROM auth_user WHERE id = $1",
    [userId],
  );
  const u = users[0];
  if (!u) return null;
  const { rows: sessions } = await q("SELECT created_at, expires_at FROM auth_session WHERE user_id = $1 ORDER BY created_at", [userId]);
  const file: Record<string, unknown> = {
    format: "s3c-export-v1",
    exportedAt: new Date().toISOString(),
    account: {
      email: String(u.email),
      ageBand: String(u.age_band),
      createdAt: iso(u.created_at),
      // Privacy re-read R-M2a: "last sign-in or signed-in use, to the day". Named for what it is.
      lastActiveAt: iso(u.last_sign_in_at),
      policyVersion: String(u.policy_version),
      policyAcceptedAt: iso(u.policy_accepted_at),
    },
    sessions: sessions.map((s) => ({ createdAt: iso(s.created_at), expiresAt: iso(s.expires_at) })),
    progress: await loadProgressMap(q, userId),
  };
  if (await tableExists(q, "lesson_like")) file.likes = await listMarks(q, "lesson_like", userId);
  if (await tableExists(q, "lesson_save")) file.saves = await listMarks(q, "lesson_save", userId);
  // The personalization lane's settings table (origin/perso-m1, its own migration). Exported as stored if present.
  if (await tableExists(q, "settings")) {
    const { rows } = await q("SELECT personalization_on, subjects, less_of FROM settings WHERE user_id = $1", [userId]);
    const r = rows[0];
    file.settings = r
      ? { personalizationOn: r.personalization_on === true || r.personalization_on === false ? r.personalization_on : null, subjects: r.subjects ?? [], lessOf: r.less_of ?? [] }
      : { personalizationOn: null, subjects: [], lessOf: [] };
  }
  return file;
}

// ---------- Deletion (§7): one transaction ----------
export type DeletionCounts = {
  account: number;
  lessons: number;
  recalls: number;
  devices: number;
  likes: number;
  saves: number;
  settings: number;
  pendingLinks: number;
};

/** Delete everything about an account in one transaction (call inside withTransaction). Returns what was deleted. */
export async function deleteAccount(q: Query, userId: string): Promise<DeletionCounts | null> {
  const { rows } = await q("SELECT email FROM auth_user WHERE id = $1 FOR UPDATE", [userId]);
  if (!rows[0]) return null;
  const email = String(rows[0].email);
  await q("INSERT INTO deleted_account (user_id) VALUES ($1) ON CONFLICT DO NOTHING", [userId]);
  const n = async (sql: string, args: unknown[]) => (await q(sql, args)).rowCount ?? 0;
  const likes = (await tableExists(q, "lesson_like")) ? await n("DELETE FROM lesson_like WHERE user_id = $1", [userId]) : 0;
  const saves = (await tableExists(q, "lesson_save")) ? await n("DELETE FROM lesson_save WHERE user_id = $1", [userId]) : 0;
  const settings = (await tableExists(q, "settings")) ? await n("DELETE FROM settings WHERE user_id = $1", [userId]) : 0;
  const recalls = await n("DELETE FROM recall WHERE user_id = $1", [userId]);
  const lessons = await n("DELETE FROM progress WHERE user_id = $1", [userId]);
  const devices = await n("DELETE FROM auth_session WHERE user_id = $1", [userId]);
  await n("DELETE FROM auth_account WHERE user_id = $1", [userId]);
  const pendingLinks = await n(
    "DELETE FROM auth_verification WHERE value IS JSON OBJECT AND lower(value::jsonb ->> 'email') = lower($1)",
    [email],
  );
  const account = await n("DELETE FROM auth_user WHERE id = $1", [userId]);
  return { account, lessons, recalls, devices, likes, saves, settings, pendingLinks };
}

// ---------- Purge of expired rows (C10, M3): run inside each start request; no cron ----------
export const PURGE_EXPIRED_SQL = [
  "DELETE FROM auth_verification WHERE expires_at < now()",
  "DELETE FROM signup_intent WHERE expires_at < now()",
  "DELETE FROM auth_session WHERE expires_at < now()",
  "DELETE FROM deleted_account WHERE deleted_at < now() - interval '35 days'",
];

export async function purgeExpired(q: Query): Promise<void> {
  for (const sql of PURGE_EXPIRED_SQL) await q(sql, []);
}
