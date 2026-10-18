#!/usr/bin/env node
// The privacy reviewer's deletion check (EDD-008 §7, P1.4; PRD-005 privacy ruling 2026-10-17 C6.2). Owner: backend-engineer.
// Prints table names, counts and ages only: never an email, id, token or any other value.
//
//   DATABASE_URL=... node tools/db-deletion-check.mjs <user-id> <email>   # after a deletion: every count 0, deleted_account 1
//   DATABASE_URL=... node tools/db-deletion-check.mjs --all-counts        # rows per table (auth_account must be 0)
//   DATABASE_URL=... node tools/db-deletion-check.mjs --oldest-expired    # expired rows still waiting for the purge (M3, A-15)
//
// Exit code: 0 when the check passes, 1 when it does not (a non-zero count after deletion, or auth_account > 0).
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

/** Every table that can hold a row about one account, and how to find that account's rows. */
export const PER_ACCOUNT = [
  ["auth_user", "id = $1 OR lower(email) = lower($2)"],
  ["auth_session", "user_id = $1"],
  ["auth_account", "user_id = $1"],
  ["auth_verification", "value IS JSON OBJECT AND lower(value::jsonb ->> 'email') = lower($2)"],
  ["progress", "user_id = $1"],
  ["recall", "user_id = $1"],
  ["lesson_like", "user_id = $1"],
  ["lesson_save", "user_id = $1"],
  ["settings", "user_id = $1"], // the personalization lane's table (origin/perso-m1), if its migration is applied
  ["deleted_account", "user_id = $1"], // the tombstone: expected 1
];

export const ALL_TABLES = [
  "auth_user",
  "auth_session",
  "auth_account",
  "auth_verification",
  "signup_intent",
  "progress",
  "recall",
  "lesson_like",
  "lesson_save",
  "settings",
  "deleted_account",
  "schema_migrations",
];

export const EXPIRED = [
  ["auth_verification", "expires_at", "expires_at < now()"],
  ["signup_intent", "expires_at", "expires_at < now()"],
  ["auth_session", "expires_at", "expires_at < now()"],
  ["deleted_account", "deleted_at", "deleted_at < now() - interval '35 days'"],
];

async function exists(client, table) {
  const { rows } = await client.query("SELECT to_regclass($1) IS NOT NULL AS ok", [`public.${table}`]);
  return rows[0].ok;
}

/** {table: count | null (table absent)} for one account. */
export async function accountCounts(client, userId, email) {
  const out = {};
  for (const [t, where] of PER_ACCOUNT) {
    if (!(await exists(client, t))) {
      out[t] = null;
      continue;
    }
    // Pass only the parameters the clause uses (Postgres refuses unused ones).
    const args = where.includes("$2") ? [userId, email] : [userId];
    const clause = where.includes("$1") ? where : where.replace(/\$2/g, "$1");
    const { rows } = await client.query(`SELECT count(*)::int AS n FROM ${t} WHERE ${clause}`, where.includes("$1") ? args : [email]);
    out[t] = rows[0].n;
  }
  return out;
}

export function deletionPasses(c) {
  return Object.entries(c).every(([t, n]) => n === null || (t === "deleted_account" ? n === 1 : n === 0));
}

export async function allCounts(client) {
  const out = {};
  for (const t of ALL_TABLES) {
    out[t] = (await exists(client, t)) ? (await client.query(`SELECT count(*)::int AS n FROM ${t}`)).rows[0].n : null;
  }
  return out;
}

/** {table: {count, oldestSeconds}} of expired rows not yet purged. */
export async function oldestExpired(client) {
  const out = {};
  for (const [t, col, where] of EXPIRED) {
    const { rows } = await client.query(
      `SELECT count(*)::int AS n, coalesce(extract(epoch FROM now() - min(${col}))::int, 0) AS age FROM ${t} WHERE ${where}`,
    );
    out[t] = { count: rows[0].n, oldestSeconds: rows[0].n ? rows[0].age : null };
  }
  return out;
}

async function main(argv) {
  const url = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    console.error("db-deletion-check: set DATABASE_URL.");
    return 2;
  }
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    if (argv[0] === "--all-counts") {
      const c = await allCounts(client);
      for (const [t, n] of Object.entries(c)) console.log(`${t.padEnd(18)} ${n === null ? "(no table)" : n}`);
      const ok = !c.auth_account;
      console.log(ok ? "PASS: auth_account is empty" : "FAIL: auth_account has rows (a stop, privacy review Q2)");
      return ok ? 0 : 1;
    }
    if (argv[0] === "--oldest-expired") {
      const c = await oldestExpired(client);
      for (const [t, v] of Object.entries(c)) console.log(`${t.padEnd(18)} expired=${v.count} oldest=${v.oldestSeconds === null ? "-" : `${v.oldestSeconds}s`}`);
      return 0;
    }
    const [userId, email] = argv;
    if (!userId || !email) {
      console.error("usage: db-deletion-check.mjs <user-id> <email> | --all-counts | --oldest-expired");
      return 2;
    }
    const c = await accountCounts(client, userId, email);
    for (const [t, n] of Object.entries(c)) console.log(`${t.padEnd(18)} ${n === null ? "(no table)" : n}`);
    const ok = deletionPasses(c);
    console.log(ok ? "PASS: every table 0, deleted_account 1" : "FAIL: rows remain (or no tombstone)");
    return ok ? 0 : 1;
  } finally {
    await client.end();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (e) => {
      console.error(`db-deletion-check: failed${e?.code ? ` sqlstate=${e.code}` : ""}`);
      process.exit(1);
    },
  );
}
