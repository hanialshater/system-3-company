// The only code that writes the `settings` table (B2). Owner: learner-data-engineer. W-1538.
// Called only from handleSettingsPut (settings-handler.ts), which only the settings route's PUT calls.
// tests/settings/settings-only-put-writes.test.mjs fails if any other file writes the table or imports this module.
//
// UNVERIFIED against the accounts branch (not fetchable in this clone on 2026-10-16):
// - `Query` is shaped like pg's Pool#query (company/decisions/2026-10-15-dep-pg.md). The real helper on the accounts
//   branch, its name and whether it is per-request, are backend-engineer's to confirm.
// - The table name `settings` (principal-engineer may rename it, schema note §0 item 5): one constant below.
//
// No cache anywhere: every read goes to the database, so an explicit off applies on the next request (D2).
// Errors are rethrown untouched; the handler turns them into a fixed response and never logs them (B4), because a
// pg constraint error's `detail` carries the failing row.

import type { FeedSettings } from "./settings";

export const SETTINGS_TABLE = "settings";

export type Query = (text: string, values: readonly unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;

export interface SettingsStore {
  /** The stored row for this account, or null when there is none (D1: same as "no choice"). */
  get(userId: string): Promise<FeedSettings | null>;
  /** Replace the row with exactly these three stated choices. */
  put(userId: string, s: FeedSettings): Promise<void>;
}

export const SELECT_SQL = `SELECT personalization_on, subjects, less_of FROM ${SETTINGS_TABLE} WHERE user_id = $1`;

// Upsert of the whole row. Exactly the four columns of the W-1521 draft; nothing else exists to write.
export const UPSERT_SQL =
  `INSERT INTO ${SETTINGS_TABLE} (user_id, personalization_on, subjects, less_of) VALUES ($1, $2, $3, $4) ` +
  `ON CONFLICT (user_id) DO UPDATE SET personalization_on = EXCLUDED.personalization_on, ` +
  `subjects = EXCLUDED.subjects, less_of = EXCLUDED.less_of`;

const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

export function pgSettingsStore(query: Query): SettingsStore {
  return {
    async get(userId) {
      const { rows } = await query(SELECT_SQL, [userId]);
      const r = rows[0];
      if (!r) return null;
      const on = r.personalization_on;
      return {
        personalizationOn: on === true || on === false ? on : null,
        subjects: strings(r.subjects),
        lessOf: strings(r.less_of),
      };
    },
    async put(userId, s) {
      await query(UPSERT_SQL, [userId, s.personalizationOn, [...s.subjects], [...s.lessOf]]);
    },
  };
}
