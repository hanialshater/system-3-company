#!/usr/bin/env node
// Applies the numbered plain-SQL migrations in db/migrations/ (ADR-009 §3). Owner: backend-engineer.
// Run by an engineer, by hand, against a named database. It never runs in the build or at run time (C10).
//
//   DATABASE_URL_UNPOOLED=... node tools/db-migrate.mjs status
//   DATABASE_URL_UNPOOLED=... node tools/db-migrate.mjs up            # every pending migration
//   DATABASE_URL_UNPOOLED=... node tools/db-migrate.mjs up --to=1     # up to and including 001
//   DATABASE_URL_UNPOOLED=... node tools/db-migrate.mjs down --confirm-drop            # the latest one
//   DATABASE_URL_UNPOOLED=... node tools/db-migrate.mjs down --to=0 --confirm-drop     # all of them
//
// The connection is DATABASE_URL_UNPOOLED (direct), falling back to DATABASE_URL. Each migration runs in its own
// transaction together with its schema_migrations row. A down drops learner tables, so it needs --confirm-drop.
// Prints versions and table names only: never the connection string, a row or a value.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const MIGRATIONS_DIR = path.join(ROOT, "db", "migrations");

/** [{version, name, up, down}] sorted by version, read from NNN_name.up.sql / NNN_name.down.sql. */
export function listMigrations(dir = MIGRATIONS_DIR) {
  const byVersion = new Map();
  for (const f of fs.readdirSync(dir)) {
    const m = /^(\d{3})_([a-z0-9_]+)\.(up|down)\.sql$/.exec(f);
    if (!m) continue;
    const version = Number(m[1]);
    const entry = byVersion.get(version) ?? { version, name: m[2] };
    entry[m[3]] = path.join(dir, f);
    byVersion.set(version, entry);
  }
  const list = [...byVersion.values()].sort((a, b) => a.version - b.version);
  for (const m of list) if (!m.up || !m.down) throw new Error(`migration ${m.version} needs both an up and a down file`);
  return list;
}

const BOOKKEEPING =
  "CREATE TABLE IF NOT EXISTS schema_migrations (version integer PRIMARY KEY, name text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())";

export async function applied(client) {
  await client.query(BOOKKEEPING);
  const { rows } = await client.query("SELECT version FROM schema_migrations ORDER BY version");
  return rows.map((r) => Number(r.version));
}

/** Apply pending migrations up to `to` (inclusive). Returns the versions applied. */
export async function migrateUp(client, { to = Infinity, dir = MIGRATIONS_DIR, log = () => {} } = {}) {
  const done = new Set(await applied(client));
  const out = [];
  for (const m of listMigrations(dir)) {
    if (m.version > to || done.has(m.version)) continue;
    await client.query("BEGIN");
    try {
      await client.query(fs.readFileSync(m.up, "utf8"));
      await client.query("INSERT INTO schema_migrations (version, name) VALUES ($1, $2)", [m.version, m.name]);
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw new Error(`migration ${m.version} (${m.name}) failed: ${e.code ?? ""} ${e.message}`);
    }
    log(`up ${String(m.version).padStart(3, "0")}_${m.name}`);
    out.push(m.version);
  }
  return out;
}

/** Roll back applied migrations above `to` (default: only the latest). Returns the versions rolled back. */
export async function migrateDown(client, { to, dir = MIGRATIONS_DIR, log = () => {} } = {}) {
  const done = await applied(client);
  if (!done.length) return [];
  const floor = to ?? done[done.length - 1] - 1;
  const byVersion = new Map(listMigrations(dir).map((m) => [m.version, m]));
  const out = [];
  for (const v of [...done].reverse()) {
    if (v <= floor) break;
    const m = byVersion.get(v);
    if (!m) throw new Error(`applied migration ${v} has no files here; refusing to guess its down`);
    await client.query("BEGIN");
    try {
      await client.query(fs.readFileSync(m.down, "utf8"));
      await client.query("DELETE FROM schema_migrations WHERE version = $1", [v]);
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw new Error(`down ${v} (${m.name}) failed: ${e.code ?? ""} ${e.message}`);
    }
    log(`down ${String(v).padStart(3, "0")}_${m.name}`);
    out.push(v);
  }
  return out;
}

async function main(argv) {
  const [cmd = "status", ...rest] = argv;
  const flag = (n) => rest.find((a) => a === `--${n}` || a.startsWith(`--${n}=`));
  const val = (n) => flag(n)?.split("=")[1];
  const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (!url) {
    console.error("db-migrate: set DATABASE_URL_UNPOOLED (or DATABASE_URL). Nothing was changed.");
    process.exit(2);
  }
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    const { rows } = await client.query("SHOW server_version_num");
    if (Number(rows[0].server_version_num) < 160000) {
      console.error("db-migrate: PostgreSQL 16 or newer is required (migration 001 uses IS JSON; readiness A-14).");
      process.exit(2);
    }
    if (cmd === "status") {
      const done = new Set(await applied(client));
      for (const m of listMigrations()) console.log(`${done.has(m.version) ? "applied" : "pending"} ${String(m.version).padStart(3, "0")}_${m.name}`);
    } else if (cmd === "up") {
      const to = val("to") !== undefined ? Number(val("to")) : Infinity;
      const done = await migrateUp(client, { to, log: console.log });
      if (!done.length) console.log("nothing to apply");
    } else if (cmd === "down") {
      if (!flag("confirm-drop")) {
        console.error("db-migrate: down drops tables and their rows. Re-run with --confirm-drop.");
        process.exit(2);
      }
      const to = val("to") !== undefined ? Number(val("to")) : undefined;
      const done = await migrateDown(client, { to, log: console.log });
      if (!done.length) console.log("nothing to roll back");
    } else {
      console.error(`db-migrate: unknown command ${cmd} (status | up | down)`);
      process.exit(2);
    }
  } finally {
    await client.end();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => {
    console.error(`db-migrate: ${e.message}`);
    process.exit(1);
  });
}
