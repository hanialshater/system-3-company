// Shared set-up for the accounts suite (EDD-008). A real PostgreSQL 16 is needed for the database tests:
//   ACCOUNTS_TEST_DATABASE_URL=postgresql://user@/db?host=/path/to/socket&port=55432 npm run test:accounts
// The database named there is WIPED (every table dropped) and re-migrated with tools/db-migrate.mjs. Use a
// throwaway local database with fake data only; never Neon, never anything with a real learner in it.
// Without the variable, the database tests skip and the static tests still run.
import pg from "pg";
import { migrateUp } from "../../tools/db-migrate.mjs";
import { createAuth } from "../../src/lib/server/auth.ts";
import { createAccountApi } from "../../src/lib/server/account-api.ts";
import { ACCOUNT_HEADER, accountTag } from "../../src/lib/server/http.ts";

export const DB_URL = process.env.ACCOUNTS_TEST_DATABASE_URL;
export const SKIP_DB = DB_URL ? false : "set ACCOUNTS_TEST_DATABASE_URL to a throwaway local PostgreSQL 16 (see helpers.mjs)";
export const BASE = "http://localhost:3000";
export const POLICY = "draft-2026-10-16";
export const SLUGS = ["plates-move", "lesson-b", "lesson-c", "lesson-d"];

export const TABLES = [
  "auth_user",
  "auth_session",
  "auth_account",
  "auth_verification",
  "signup_intent",
  "progress",
  "recall",
  "deleted_account",
  "lesson_like",
  "lesson_save",
];

export async function freshDatabase() {
  const pool = new pg.Pool({ connectionString: DB_URL, max: 4 });
  await pool.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
  const client = await pool.connect();
  try {
    await migrateUp(client);
  } finally {
    client.release();
  }
  return pool;
}

export function baseEnv(extra = {}) {
  return {
    ACCOUNTS_ENABLED: "on",
    LIKES_SAVES_ENABLED: "on",
    LIKE_COUNTS_PUBLIC: "on",
    BETTER_AUTH_SECRET: "test-secret-0123456789-abcdefghijklmnop",
    BETTER_AUTH_URL: BASE,
    ...extra,
  };
}

/** A world: pool, auth, api, the captured sign-in links and log lines. `env` is mutable per test. */
export function makeWorld(pool, { env = baseEnv(), now } = {}) {
  const links = [];
  const logs = [];
  const world = { pool, env, links, logs };
  world.auth = createAuth({
    pool,
    env,
    sendLink: async (email, url) => links.push({ email, url }),
    log: (l) => logs.push(l),
  });
  world.api = createAccountApi({
    env: () => world.env,
    pool: () => pool,
    auth: () => world.auth,
    inCatalog: (s) => SLUGS.includes(s),
    now,
    log: (l) => logs.push(l),
  });
  return world;
}

/** PC10: the account tag of each session cookie signUp made, so req() can bind a write the way the client does. */
const TAGS = new Map();
export const tagOfCookie = (cookie) => TAGS.get(cookie);

/**
 * A request. A write (not GET) with a cookie from signUp carries that account's tag in ACCOUNT_HEADER, as the client
 * sends it (PC10). `account: null` sends no tag; a string sends that tag.
 */
export function req(path, { method = "GET", body, cookie, headers = {}, account } = {}) {
  const h = { host: "localhost:3000", ...headers };
  const tag = account === undefined ? (method !== "GET" && cookie ? TAGS.get(cookie) : undefined) : account;
  if (tag) h[ACCOUNT_HEADER] = tag;
  if (body !== undefined) {
    h["content-type"] ??= "application/json";
    h.origin ??= BASE;
  }
  if (method !== "GET" && h.origin === undefined) h.origin = BASE;
  if (cookie) h.cookie = cookie;
  return new Request(`${BASE}${path}`, { method, headers: h, body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body) });
}

export async function counts(pool) {
  const out = {};
  for (const t of TABLES) out[t] = Number((await pool.query(`SELECT count(*) AS n FROM ${t}`)).rows[0].n);
  return out;
}

/** Start, click the captured link, and return {cookie, userId, setCookie, verify, tag}. */
export async function signUp(world, email, ageBand = "16+") {
  const res = await world.api.start(req("/api/account/start", { method: "POST", body: { email, ageBand, policyVersion: POLICY } }));
  if (res.status !== 200) throw new Error(`start ${res.status} ${await res.text()}`);
  const link = world.links.at(-1);
  const verify = await world.api.authRoute(new Request(link.url, { headers: { host: "localhost:3000" } }));
  const setCookie = verify.headers.getSetCookie();
  const sc = setCookie.find((c) => c.startsWith("s3c.session_token="));
  if (!sc) throw new Error(`no session cookie (status ${verify.status}, location ${verify.headers.get("location")})`);
  const cookie = sc.split(";")[0];
  const { rows } = await world.pool.query("SELECT id FROM auth_user WHERE lower(email) = lower($1)", [email]);
  const tag = rows[0]?.id ? accountTag(world.env.BETTER_AUTH_SECRET, rows[0].id) : undefined;
  if (tag) TAGS.set(cookie, tag);
  return { cookie, userId: rows[0]?.id, setCookie, verify, tag };
}
