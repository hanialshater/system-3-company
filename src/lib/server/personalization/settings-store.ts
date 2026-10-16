// The only code that writes the `settings` table (B2). Owner: learner-data-engineer. W-1538.
// Called only from handleSettingsPut (settings-handler.ts), which only the settings route's PUT calls
// (src/app/api/account/settings/route.ts). tests/settings/settings-only-put-writes.test.mjs fails if any other file
// writes the table or imports this module.
//
// Atomic write (privacy D2a, principal-engineer C7, 2026-10-16): every PUT is ONE statement whose new values are
// computed by the database from the row it has locked, never from a row the server read earlier. There is no
// read-modify-write in application code, so two overlapping PUTs cannot carry a stale personalizationOn back over an
// explicit false. Which statement runs depends only on the request (writePlan), never on a read:
// - set, request would create a real choice  → SET_UPSERT_SQL: INSERT … ON CONFLICT DO UPDATE, each column written
//   only if the request carries its key (CASE on a per-key flag), otherwise the locked row's value is kept.
// - set, request would create a "no choice" row → SET_UPDATE_SQL: the same per-key UPDATE, which creates no row (D1).
// - merge → MERGE_SQL: inserts the device's choices if there is no row (and they are a choice); on an existing row
//   it only ever turns personalization_on to false (account lists win, either side false gives false, G3).
// Each statement skips the write when nothing would change (WHERE … IS DISTINCT FROM), so an unchanged row is not
// rewritten. The reference model of all three is applyWrite in settings.ts; tests/settings/settings-write-race.test.mjs
// checks the model and company/personalization/data/test-settings-write-sql.mjs checks this SQL on a throwaway local
// Postgres (fake rows only), including a two-session race.
//
// UNVERIFIED against the accounts branch (not fetchable in this clone on 2026-10-16):
// - `Query` is shaped like pg's Pool#query (company/decisions/2026-10-15-dep-pg.md). The real helper on the accounts
//   branch, its name and whether it is per-request, are backend-engineer's to confirm. Each statement here is a single
//   autocommit statement; no transaction or client checkout is needed.
// - The table name `settings`: one constant below (principal-engineer kept it, review 2026-10-16 ruling 2).
//
// No cache anywhere: every read goes to the database, so an explicit off applies on the next request (D2).
// Errors are rethrown untouched; the handler turns them into a fixed response and never logs them (B4), because a
// pg constraint error's `detail` carries the failing row.

import { freshRow, isNoChoice, type FeedSettings, type SettingsPatch } from "./settings";

export const SETTINGS_TABLE = "settings";

export type Query = (text: string, values: readonly unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;

export interface SettingsStore {
  /** The stored row for this account, or null when there is none (D1: same as "no choice"). */
  get(userId: string): Promise<FeedSettings | null>;
  /**
   * Apply one validated write atomically (applyWrite's rule, evaluated by the database on the locked row) and return
   * the row as stored afterwards, or null when the account still has no row.
   */
  put(userId: string, patch: SettingsPatch): Promise<FeedSettings | null>;
}

const COLS = "personalization_on, subjects, less_of";

export const SELECT_SQL = `SELECT ${COLS} FROM ${SETTINGS_TABLE} WHERE user_id = $1`;

// $1 user_id, $2 personalization_on, $3 subjects, $4 less_of (the freshRow values),
// $5/$6/$7: whether the request carries personalizationOn / subjects / lessOf.
const SET_COLUMNS = (v: { on: string; sub: string; less: string }) =>
  `personalization_on = CASE WHEN $5::boolean THEN ${v.on} ELSE s.personalization_on END, ` +
  `subjects = CASE WHEN $6::boolean THEN ${v.sub} ELSE s.subjects END, ` +
  `less_of = CASE WHEN $7::boolean THEN ${v.less} ELSE s.less_of END`;
const CHANGED = (v: { on: string; sub: string; less: string }) =>
  `(($5::boolean AND s.personalization_on IS DISTINCT FROM ${v.on}) OR ` +
  `($6::boolean AND s.subjects IS DISTINCT FROM ${v.sub}) OR ` +
  `($7::boolean AND s.less_of IS DISTINCT FROM ${v.less}))`;
const EXCL = { on: "EXCLUDED.personalization_on", sub: "EXCLUDED.subjects", less: "EXCLUDED.less_of" };
const PARAM = { on: "$2::boolean", sub: "$3::text[]", less: "$4::text[]" };

export const SET_UPSERT_SQL =
  `INSERT INTO ${SETTINGS_TABLE} AS s (user_id, ${COLS}) VALUES ($1::text, $2::boolean, $3::text[], $4::text[]) ` +
  `ON CONFLICT (user_id) DO UPDATE SET ${SET_COLUMNS(EXCL)} WHERE ${CHANGED(EXCL)} RETURNING ${COLS}`;

export const SET_UPDATE_SQL =
  `UPDATE ${SETTINGS_TABLE} AS s SET ${SET_COLUMNS(PARAM)} WHERE s.user_id = $1::text AND ${CHANGED(PARAM)} ` +
  `RETURNING ${COLS}`;

// $1 user_id, $2..$4 the device's choices (freshRow), $5 whether they are a choice at all (D1).
export const MERGE_SQL =
  `INSERT INTO ${SETTINGS_TABLE} AS s (user_id, ${COLS}) SELECT $1::text, $2::boolean, $3::text[], $4::text[] ` +
  `WHERE $5::boolean ON CONFLICT (user_id) DO UPDATE SET personalization_on = false ` +
  `WHERE EXCLUDED.personalization_on IS FALSE AND s.personalization_on IS DISTINCT FROM false RETURNING ${COLS}`;

export type WritePlan = { text: string; values: unknown[] };

/** Which single statement a request runs, and its parameters. Depends on the request only, never on a read. */
export function writePlan(userId: string, patch: SettingsPatch): WritePlan {
  const row = freshRow(patch);
  const base = [userId, row.personalizationOn, [...row.subjects], [...row.lessOf]];
  if (patch.mode === "merge") return { text: MERGE_SQL, values: [...base, !isNoChoice(row)] };
  const has = [patch.personalizationOn !== undefined, patch.subjects !== undefined, patch.lessOf !== undefined];
  return { text: isNoChoice(row) ? SET_UPDATE_SQL : SET_UPSERT_SQL, values: [...base, ...has] };
}

const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

function toSettings(r: Record<string, unknown> | undefined): FeedSettings | null {
  if (!r) return null;
  const on = r.personalization_on;
  return {
    personalizationOn: on === true || on === false ? on : null,
    subjects: strings(r.subjects),
    lessOf: strings(r.less_of),
  };
}

export function pgSettingsStore(query: Query): SettingsStore {
  const get = async (userId: string) => toSettings((await query(SELECT_SQL, [userId])).rows[0]);
  return {
    get,
    async put(userId, patch) {
      const { text, values } = writePlan(userId, patch);
      const { rows } = await query(text, values);
      // No row returned: nothing changed (or there is still no row). Read the row as it now is for the answer; the
      // write itself never depends on this read.
      return rows[0] ? toSettings(rows[0]) : get(userId);
    },
  };
}
