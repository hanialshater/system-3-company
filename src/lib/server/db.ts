// The one Postgres pool (ADR-009 decision 2; dependency record company/decisions/2026-10-15-dep-pg.md).
// Owner: backend-engineer. Server only.
//
// C4: nothing is constructed at import. The pool is created on the first call to getPool(), which route code reaches
// only after the ACCOUNTS_ENABLED check, so `next build` and every route work with no database variables set.
// The connection string is always passed explicitly, so pg never picks up PG* variables silently.
// No DDL ever runs through this pool (C10): migrations are tools/db-migrate.mjs, by hand.
import pg from "pg";

/** Shaped like pg Pool#query, and the same as `Query` in the settings store (origin/perso-m1 settings-store.ts). */
export type Query = (text: string, values?: readonly unknown[]) => Promise<{ rows: Record<string, unknown>[]; rowCount?: number | null }>;

let pool: pg.Pool | null = null;

// bigint (int8) as a JS number: our bigints are epoch milliseconds (< 2^53) and counts.
pg.types.setTypeParser(20, (v: string) => Number(v));

export function getPool(env: Record<string, string | undefined> = process.env): pg.Pool {
  if (pool) return pool;
  const connectionString = env.DATABASE_URL;
  if (!connectionString) throw Object.assign(new Error("database not configured"), { code: "NODB0" });
  pool = new pg.Pool({ connectionString, max: 3, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 5_000 });
  // An idle client error must not crash the instance or print the error (it can carry connection details).
  pool.on("error", () => {});
  return pool;
}

/** The query helper the settings route wiring takes (perso-m1 SettingsDeps store: pgSettingsStore(query)). */
export const query: Query = (text, values = []) => getPool().query(text, values as unknown[]);

/** Run fn inside one transaction on one client. Rolls back on any error and rethrows it untouched. */
export async function withTransaction<T>(p: pg.Pool, fn: (q: Query) => Promise<T>): Promise<T> {
  const client = await p.connect();
  try {
    await client.query("BEGIN");
    const out = await fn((text, values = []) => client.query(text, values as unknown[]));
    await client.query("COMMIT");
    return out;
  } catch (e) {
    try {
      await client.query("ROLLBACK");
    } catch {
      /* ignore */
    }
    throw e;
  } finally {
    client.release();
  }
}

/** Tests only: close and forget the pool. */
export async function closePool(): Promise<void> {
  const p = pool;
  pool = null;
  if (p) await p.end();
}
