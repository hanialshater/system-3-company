// EDD-008 accounts against a real PostgreSQL 16 (see helpers.mjs). Run: npm run test:accounts
// The titles named in better-auth-regression.json are the M5 regression suite for every Better Auth bump.
import test from "node:test";
import assert from "node:assert/strict";
import { DB_URL, SKIP_DB, BASE, POLICY, SLUGS, freshDatabase, makeWorld, baseEnv, req, counts, signUp } from "./helpers.mjs";
import { createAuth, PUBLISHED_POLICY_VERSIONS, tokenHash } from "../../src/lib/server/auth.ts";
import { IDLE_PURGE_SQL } from "../../src/lib/server/idle-purge.ts";
import { accountCounts, allCounts, deletionPasses, oldestExpired } from "../../tools/db-deletion-check.mjs";
import { migrateDown, migrateUp, applied } from "../../tools/db-migrate.mjs";

const DAY = 86_400_000;
const T0 = Date.UTC(2026, 9, 10, 12); // 2026-10-10, inside the accepted time window

let pool;
test.before(async () => {
  if (DB_URL) pool = await freshDatabase();
});
test.after(async () => {
  if (pool) await pool.end();
});

const t = (name, fn) => test(name, { skip: SKIP_DB }, fn);

// ---------------- Switches (C4, C5) ----------------

t("1. accounts off: every handler answers 404, sets no cookie, and constructs nothing", async () => {
  const before = await counts(pool);
  for (const env of [{}, { ACCOUNTS_ENABLED: "true" }, { ACCOUNTS_ENABLED: "ON" }, { LIKES_SAVES_ENABLED: "on", LIKE_COUNTS_PUBLIC: "on" }]) {
    const w = makeWorld(pool, { env: { ...baseEnv(), ACCOUNTS_ENABLED: undefined, ...env } });
    w.auth = new Proxy({}, { get: () => assert.fail("auth constructed with accounts off") });
    const calls = [
      w.api.me(req("/api/account/me")),
      w.api.start(req("/api/account/start", { method: "POST", body: { email: "x@example.com", ageBand: "16+", policyVersion: POLICY } })),
      w.api.merge(req("/api/account/merge", { method: "POST", body: { progress: {} } })),
      w.api.progressGet(req("/api/account/progress")),
      w.api.progressPut(req("/api/account/progress", { method: "PUT", body: { slug: "plates-move", entry: {} } })),
      w.api.exportFile(req("/api/account/export")),
      w.api.remove(req("/api/account/delete", { method: "POST", body: { confirm: true } })),
      w.api.listMarks(req("/api/account/likes"), "lesson_like"),
      w.api.mark(req("/api/account/likes/plates-move", { method: "PUT" }), "lesson_like", "plates-move", true),
      w.api.mark(req("/api/account/saves/plates-move", { method: "DELETE" }), "lesson_save", "plates-move", false),
      w.api.counts(req("/api/likes/counts?slugs=plates-move")),
      w.api.authRoute(req("/api/account/auth/magic-link/verify?token=x")),
      w.api.authRoute(req("/api/account/auth/sign-out", { method: "POST" })),
    ];
    for (const res of await Promise.all(calls)) {
      assert.equal(res.status, 404);
      assert.deepEqual(res.headers.getSetCookie(), []);
    }
  }
  assert.deepEqual(await counts(pool), before);
});

t("2. likes and saves off (accounts on): like, save and count routes answer 404; counts need their own switch", async () => {
  const w = makeWorld(pool, { env: baseEnv({ LIKES_SAVES_ENABLED: undefined }) });
  assert.equal((await w.api.listMarks(req("/api/account/saves"), "lesson_save")).status, 404);
  assert.equal((await w.api.mark(req("/api/account/saves/plates-move", { method: "PUT" }), "lesson_save", "plates-move", true)).status, 404);
  assert.equal((await w.api.counts(req("/api/likes/counts?slugs=plates-move"))).status, 404);
  const w2 = makeWorld(pool, { env: baseEnv({ LIKE_COUNTS_PUBLIC: undefined }) });
  assert.equal((await w2.api.counts(req("/api/likes/counts?slugs=plates-move"))).status, 404, "LIKE_COUNTS_PUBLIC off: no count");
  const me = await (await w.api.me(req("/api/account/me"))).json();
  assert.equal(me.likesSaves, false);
});

// ---------------- Sign-up (§6.2, C2, C3, C7, M1, M6) ----------------

t("3. start refuses any key but three, a bad band, an unpublished policy version, a bad email", async () => {
  const w = makeWorld(pool);
  const before = await counts(pool);
  const bad = [
    [{ email: "a@example.com", ageBand: "16+", policyVersion: POLICY, name: "Ada" }, "malformed"],
    [{ email: "a@example.com", ageBand: "16+", policyVersion: POLICY, birthYear: 2001 }, "malformed"],
    [{ email: "a@example.com", ageBand: "under-13", policyVersion: POLICY }, "bad_band"],
    [{ email: "a@example.com", ageBand: "12", policyVersion: POLICY }, "bad_band"],
    [{ email: "a@example.com", ageBand: "16+", policyVersion: "2099-01-01" }, "bad_policy_version"],
    [{ email: "not-an-email", ageBand: "16+", policyVersion: POLICY }, "bad_email"],
    [[1, 2], "malformed"],
  ];
  for (const [body, error] of bad) {
    const res = await w.api.start(req("/api/account/start", { method: "POST", body }));
    assert.equal(res.status, 400, JSON.stringify(body));
    assert.equal((await res.json()).error, error);
  }
  assert.equal(w.links.length, 0, "no mail sent");
  assert.deepEqual(await counts(pool), before, "nothing stored");
});

t("4. C7: a cross-origin or non-JSON POST to start is refused; C2: the library's own doors answer 404", async () => {
  const w = makeWorld(pool);
  const body = { email: "a@example.com", ageBand: "16+", policyVersion: POLICY };
  for (const headers of [{ origin: "https://evil.example" }, { origin: "null" }, { "sec-fetch-site": "cross-site" }, { "content-type": "text/plain" }]) {
    const res = await w.api.start(req("/api/account/start", { method: "POST", body, headers }));
    assert.equal(res.status, 403, JSON.stringify(headers));
  }
  const noOrigin = new Request(`${BASE}/api/account/start`, { method: "POST", headers: { host: "localhost:3000", "content-type": "application/json" }, body: JSON.stringify(body) });
  assert.equal((await w.api.start(noOrigin)).status, 403, "missing Origin");
  for (const [method, p] of [
    ["POST", "/api/account/auth/sign-in/magic-link"],
    ["POST", "/api/account/auth/update-user"],
    ["POST", "/api/account/auth/delete-user"],
    ["GET", "/api/account/auth/get-session"],
    ["GET", "/api/account/auth/list-sessions"],
    ["POST", "/api/account/auth/sign-up/email"],
  ]) {
    const res = await w.api.authRoute(req(p, { method, body: method === "POST" ? { email: "a@example.com", name: "Ada" } : undefined }));
    assert.equal(res.status, 404, p);
  }
  assert.equal(w.links.length, 0);
});

t("5. sign-up: link sent, intent stored by token hash, account created on click with the band; name and image empty; tokens hashed; 0 auth_account rows", async () => {
  const w = makeWorld(pool);
  const res = await w.api.start(req("/api/account/start", { method: "POST", body: { email: "Teen@Example.com", ageBand: "13-15", policyVersion: POLICY } }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { sent: true });
  const { url } = w.links.at(-1);
  const token = new URL(url).searchParams.get("token");
  assert.ok(new URL(url).pathname === "/api/account/auth/magic-link/verify");
  const intent = await pool.query("SELECT * FROM signup_intent WHERE token_hash = $1", [tokenHash(token)]);
  assert.equal(intent.rows.length, 1);
  assert.equal(intent.rows[0].age_band, "13-15");
  assert.deepEqual(Object.keys(intent.rows[0]).sort(), ["age_band", "created_at", "expires_at", "policy_version", "token_hash"]);
  const ver = await pool.query("SELECT identifier, value FROM auth_verification");
  assert.equal(ver.rows.length, 1);
  assert.ok(!ver.rows[0].identifier.includes(token), "token stored hashed");
  assert.equal(JSON.parse(ver.rows[0].value).name, undefined);
  const before = Number((await pool.query("SELECT count(*) AS n FROM auth_user")).rows[0].n);
  const click = await w.api.authRoute(new Request(url, { headers: { host: "localhost:3000", "user-agent": "Mozilla/5.0 test", "x-forwarded-for": "203.0.113.9" } }));
  assert.equal(click.status, 302);
  const cookie = click.headers.getSetCookie().find((c) => c.startsWith("s3c.session_token="));
  assert.ok(cookie, "session cookie set");
  assert.match(cookie, /Path=\/api\/account(;|$)/);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  assert.equal(click.headers.getSetCookie().length, 1, "no cookie cache or side cookies");
  const users = await pool.query("SELECT * FROM auth_user WHERE lower(email) = 'teen@example.com'");
  assert.equal(Number((await pool.query("SELECT count(*) AS n FROM auth_user")).rows[0].n), before + 1);
  assert.equal(users.rows[0].age_band, "13-15");
  assert.equal(users.rows[0].name, "");
  assert.equal(users.rows[0].image, null);
  assert.equal(users.rows[0].policy_version, POLICY);
  assert.equal((await pool.query("SELECT count(*) AS n FROM signup_intent WHERE token_hash = $1", [tokenHash(token)])).rows[0].n, 0, "intent used up");
  assert.equal((await pool.query("SELECT count(*) AS n FROM auth_account")).rows[0].n, 0, "magic link writes no auth_account row");
  // single use
  const again = await w.api.authRoute(new Request(url, { headers: { host: "localhost:3000" } }));
  assert.equal(again.status, 302);
  assert.match(again.headers.get("location"), /error=/);
  assert.deepEqual(again.headers.getSetCookie(), []);
});

t("6. IP/UA: the session hooks blank IP and user agent on create, and the DB CHECK refuses any value", async () => {
  const w = makeWorld(pool);
  await signUp(w, "ipua@example.com");
  const { rows } = await pool.query("SELECT ip_address, user_agent FROM auth_session");
  assert.ok(rows.length > 0);
  for (const r of rows) {
    assert.equal(r.ip_address ?? "", "");
    assert.equal(r.user_agent ?? "", "");
  }
  const uid = (await pool.query("SELECT id FROM auth_user WHERE email = 'ipua@example.com'")).rows[0].id;
  for (const col of ["ip_address", "user_agent"]) {
    await assert.rejects(
      pool.query(`INSERT INTO auth_session (id, token, user_id, expires_at, ${col}) VALUES ('x-${col}', 't-${col}', $1, now() + interval '1 day', '203.0.113.9')`, [uid]),
      (e) => e.code === "23514",
    );
  }
});

t("7. IP/UA: a session refresh (update) is blanked too, and moves last_sign_in_at (M2)", async () => {
  const w = makeWorld(pool);
  const { cookie, userId } = await signUp(w, "refresh@example.com");
  // Age the session past updateAge (1 day) so getSession refreshes it.
  await pool.query("UPDATE auth_session SET updated_at = now() - interval '2 days', expires_at = now() + interval '28 days' WHERE user_id = $1", [userId]);
  await pool.query("UPDATE auth_user SET last_sign_in_at = now() - interval '30 months' WHERE id = $1", [userId]);
  const me = await w.api.me(req("/api/account/me", { cookie, headers: { "user-agent": "Mozilla/5.0 test", "x-forwarded-for": "203.0.113.9" } }));
  assert.equal(me.status, 200);
  assert.ok(me.headers.getSetCookie().some((c) => c.startsWith("s3c.session_token=") && /Path=\/api\/account/.test(c)), "refreshed cookie passed through on the scoped path");
  const s = (await pool.query("SELECT ip_address, user_agent, expires_at FROM auth_session WHERE user_id = $1", [userId])).rows[0];
  assert.equal(s.ip_address ?? "", "");
  assert.equal(s.user_agent ?? "", "");
  assert.ok(s.expires_at.getTime() > Date.now() + 29 * DAY, "session slid forward");
  const u = (await pool.query("SELECT last_sign_in_at FROM auth_user WHERE id = $1", [userId])).rows[0];
  assert.ok(Date.now() - u.last_sign_in_at.getTime() < 60_000, "last_sign_in_at moved on refresh");
});

t("8. M1: a name passed straight to the library is never stored; the CHECK refuses a name, non-JSON and arrays", async () => {
  const w = makeWorld(pool);
  await w.auth.api.signInMagicLink({
    body: { email: "named@example.com", name: "Ada Lovelace", metadata: { ageBand: "16+", policyVersion: POLICY } },
    headers: new Headers({ host: "localhost:3000" }),
  });
  const rows = (await pool.query("SELECT value FROM auth_verification WHERE value LIKE '%named@example.com%'")).rows;
  assert.equal(rows.length, 1);
  assert.deepEqual(Object.keys(JSON.parse(rows[0].value)).sort(), ["email", "type"]);
  const { url } = w.links.at(-1);
  await w.api.authRoute(new Request(url, { headers: { host: "localhost:3000" } }));
  assert.equal((await pool.query("SELECT name FROM auth_user WHERE email = 'named@example.com'")).rows[0].name, "");
  for (const value of ['{"type":"magic-link","email":"x@example.com","name":"Ada"}', "plain text", '["a"]']) {
    await assert.rejects(pool.query("INSERT INTO auth_verification (id, identifier, value, expires_at) VALUES ($1, 'i', $2, now())", [`v-${value.length}`, value]), (e) => e.code === "23514");
  }
  await pool.query(`INSERT INTO auth_verification (id, identifier, value, expires_at) VALUES ('v-ok', 'i', '{"type":"magic-link","email":"y@example.com","name":""}', now() + interval '1 minute')`);
  await assert.rejects(pool.query(`UPDATE auth_verification SET value = '{"email":"y@example.com","name":"Ada"}' WHERE id = 'v-ok'`), (e) => e.code === "23514");
  await pool.query("DELETE FROM auth_verification WHERE id = 'v-ok'");
});

t("9. §6.2: no band, no mail; no intent, no user; an unpublished policy version sends nothing (M6)", async () => {
  const w = makeWorld(pool);
  const h = new Headers({ host: "localhost:3000" });
  await assert.rejects(w.auth.api.signInMagicLink({ body: { email: "noband@example.com" }, headers: h }));
  await assert.rejects(w.auth.api.signInMagicLink({ body: { email: "noband@example.com", metadata: { ageBand: "16+", policyVersion: "2099-01-01" } }, headers: h }));
  await assert.rejects(w.auth.api.signInMagicLink({ body: { email: "noband@example.com", metadata: { ageBand: "under-13", policyVersion: POLICY } }, headers: h }));
  assert.equal(w.links.length, 0, "nothing sent");
  assert.equal((await pool.query("SELECT count(*) AS n FROM signup_intent")).rows[0].n, 0);
  // A link whose intent is gone creates no user.
  await w.api.start(req("/api/account/start", { method: "POST", body: { email: "nointent@example.com", ageBand: "16+", policyVersion: POLICY } }));
  await pool.query("DELETE FROM signup_intent");
  const click = await w.api.authRoute(new Request(w.links.at(-1).url, { headers: { host: "localhost:3000" } }));
  assert.match(click.headers.get("location") ?? "", /error=/);
  assert.deepEqual(click.headers.getSetCookie(), []);
  assert.equal((await pool.query("SELECT count(*) AS n FROM auth_user WHERE email = 'nointent@example.com'")).rows[0].n, 0);
  assert.ok(PUBLISHED_POLICY_VERSIONS.length >= 1);
});

t("10. an existing account signing in keeps its band; the new intent is ignored", async () => {
  const w = makeWorld(pool);
  await signUp(w, "again@example.com", "16+");
  const res = await w.api.start(req("/api/account/start", { method: "POST", body: { email: "again@example.com", ageBand: "13-15", policyVersion: POLICY } }));
  assert.equal(res.status, 200);
  await w.api.authRoute(new Request(w.links.at(-1).url, { headers: { host: "localhost:3000" } }));
  const u = await pool.query("SELECT age_band FROM auth_user WHERE email = 'again@example.com'");
  assert.equal(u.rows.length, 1);
  assert.equal(u.rows[0].age_band, "16+");
});

t("11. C2/M6: start limits 5 per minute per IP and per email, with hashed keys", async () => {
  let clock = Date.now();
  const w = makeWorld(pool, { now: () => clock });
  const body = (i) => ({ email: `rl${i}@example.com`, ageBand: "16+", policyVersion: POLICY });
  const statuses = [];
  for (let i = 0; i < 6; i++) statuses.push((await w.api.start(req("/api/account/start", { method: "POST", body: body(i), headers: { "x-forwarded-for": "198.51.100.7" } }))).status);
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  const sameEmail = [];
  for (let i = 0; i < 6; i++) sameEmail.push((await w.api.start(req("/api/account/start", { method: "POST", body: body("x"), headers: { "x-forwarded-for": `198.51.100.${20 + i}` } }))).status);
  assert.equal(sameEmail.at(-1), 429);
  clock += 61_000;
  assert.equal((await w.api.start(req("/api/account/start", { method: "POST", body: body(99), headers: { "x-forwarded-for": "198.51.100.7" } }))).status, 200);
});

t("12. M4: anonymous GET /me with accounts on: 200 signedIn false, no Set-Cookie, no-store, no row written", async () => {
  const w = makeWorld(pool);
  const before = await counts(pool);
  for (const cookie of [undefined, "unrelated=1; s3c_pref=x", "s3c.session_token=forged.value"]) {
    const res = await w.api.me(req("/api/account/me", { cookie }));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { signedIn: false, likesSaves: true });
    assert.deepEqual(res.headers.getSetCookie(), []);
    assert.equal(res.headers.get("cache-control"), "no-store");
  }
  assert.deepEqual(await counts(pool), before);
});

// ---------------- Progress (§8) ----------------

t("13. merge: union, validation, idempotent, two devices converge; recalls sorted; prediction never overwritten", async () => {
  const w = makeWorld(pool, { now: () => T0 + 5 * DAY });
  const { cookie, userId } = await signUp(w, "merge@example.com");
  const deviceA = {
    "plates-move": { completedAt: T0, predictedCorrectly: true, recalls: [{ at: T0 + 2 * DAY, correct: true }, { at: T0 + DAY, correct: false }] },
    "not-in-catalog": { completedAt: T0, recalls: [] },
    "lesson-b": { completedAt: Date.UTC(2025, 0, 1), predictedCorrectly: "yes", recalls: [{ at: T0, correct: 1 }], extra: "dropped" },
    "lesson-c": { completedAt: T0 + 30 * DAY, recalls: [] },
  };
  const merge = async (progress) => {
    const res = await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress }, cookie }));
    assert.equal(res.status, 200);
    return (await res.json()).progress;
  };
  const m1 = await merge(deviceA);
  assert.deepEqual(Object.keys(m1), ["plates-move"], "unknown slug, out-of-range times and wrong types dropped");
  assert.deepEqual(m1["plates-move"].recalls.map((r) => r.at), [T0 + DAY, T0 + 2 * DAY], "sorted by at");
  const rowsOnce = await counts(pool);
  assert.deepEqual(await merge(deviceA), m1, "idempotent answer");
  assert.deepEqual(await counts(pool), rowsOnce, "idempotent rows");
  const deviceB = {
    "plates-move": { completedAt: T0 - DAY, predictedCorrectly: false, recalls: [{ at: T0 + DAY, correct: false }, { at: T0 + 3 * DAY, correct: true }] },
    "lesson-d": { completedAt: T0 + DAY, predictedCorrectly: false, recalls: [] },
  };
  const m2 = await merge(deviceB);
  assert.equal(m2["plates-move"].completedAt, T0 - DAY, "earliest completion wins");
  assert.equal(m2["plates-move"].predictedCorrectly, true, "an existing prediction is never overwritten (Q7)");
  assert.deepEqual(m2["plates-move"].recalls.map((r) => r.at), [T0 + DAY, T0 + 2 * DAY, T0 + 3 * DAY], "de-duplicated by at");
  assert.deepEqual(await merge(deviceA), m2, "device A converges to the same map");
  assert.deepEqual(await merge({}), m2, "an empty map lowers nothing");
  // caps
  const many = { "plates-move": { recalls: Array.from({ length: 150 }, (_, i) => ({ at: T0 + i * 1000, correct: true })) } };
  const m3 = await merge(many);
  assert.ok(m3["plates-move"].recalls.length <= 100 + 3);
  const n = Number((await pool.query("SELECT count(*) AS n FROM recall WHERE user_id = $1 AND slug = 'plates-move' AND at_ms < $2", [userId, T0 + 50 * 1000])).rows[0].n);
  assert.equal(n, 0, "the oldest 50 of 150 were dropped (the newest 100 kept)");
  const big = await w.api.merge(req("/api/account/merge", { method: "POST", body: "x".repeat(1_000_001), cookie }));
  assert.equal(big.status, 413);
  assert.equal((await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress: {} } }))).status, 401, "signed out");
  assert.equal((await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress: {} }, cookie, headers: { origin: "https://evil.example" } }))).status, 403);
});

t("14. progress delta PUT and GET; a delta never lowers what the account has", async () => {
  const w = makeWorld(pool, { now: () => T0 + 5 * DAY });
  const { cookie } = await signUp(w, "delta@example.com");
  const put = async (slug, entry) => w.api.progressPut(req("/api/account/progress", { method: "PUT", body: { slug, entry }, cookie }));
  let res = await put("lesson-b", { completedAt: T0, predictedCorrectly: false, recalls: [] });
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).progress, { completedAt: T0, predictedCorrectly: false, recalls: [] });
  res = await put("lesson-b", { completedAt: T0 + DAY, predictedCorrectly: true, recalls: [{ at: T0 + DAY, correct: true }] });
  assert.deepEqual((await res.json()).progress, { completedAt: T0, predictedCorrectly: false, recalls: [{ at: T0 + DAY, correct: true }] });
  res = await put("nope", { completedAt: T0, recalls: [] });
  assert.equal((await res.json()).progress, null, "unknown slug dropped");
  const all = await (await w.api.progressGet(req("/api/account/progress", { cookie }))).json();
  assert.deepEqual(Object.keys(all.progress), ["lesson-b"]);
});

// ---------------- Likes and saves (PRD-005; privacy 2026-10-17) ----------------

t("15. likes: 16+ only (13-15 gets 403 and no row); idempotent PUT/DELETE; unlike deletes the row; lists are own-only", async () => {
  const w = makeWorld(pool);
  const adult = await signUp(w, "liker@example.com", "16+");
  const teen = await signUp(w, "teenliker@example.com", "13-15");
  const like = (who, slug, set = true) =>
    w.api.mark(req(`/api/account/likes/${slug}`, { method: set ? "PUT" : "DELETE", cookie: who.cookie }), "lesson_like", slug, set);
  const teenRes = await like(teen, "plates-move");
  assert.equal(teenRes.status, 403);
  assert.equal((await pool.query("SELECT count(*) AS n FROM lesson_like WHERE user_id = $1", [teen.userId])).rows[0].n, 0);
  const meTeen = await (await w.api.me(req("/api/account/me", { cookie: teen.cookie }))).json();
  assert.equal(meTeen.canLike, false);
  assert.equal((await like(adult, "plates-move")).status, 204);
  assert.equal((await like(adult, "plates-move")).status, 204, "idempotent");
  assert.equal((await like(adult, "lesson-b")).status, 204);
  assert.equal((await pool.query("SELECT count(*) AS n FROM lesson_like WHERE user_id = $1", [adult.userId])).rows[0].n, 2);
  assert.equal((await like(adult, "unknown-slug")).status, 404);
  const list = await (await w.api.listMarks(req("/api/account/likes", { cookie: adult.cookie }), "lesson_like")).json();
  assert.deepEqual(new Set(list.likes.map((l) => l.slug)), new Set(["plates-move", "lesson-b"]));
  const teenList = await (await w.api.listMarks(req("/api/account/likes", { cookie: teen.cookie }), "lesson_like")).json();
  assert.deepEqual(teenList.likes, [], "a second account sees only its own rows (C1.2)");
  assert.equal((await like(adult, "plates-move", false)).status, 204);
  assert.equal((await like(adult, "plates-move", false)).status, 204, "idempotent delete");
  assert.equal((await pool.query("SELECT count(*) AS n FROM lesson_like WHERE user_id = $1 AND slug = 'plates-move'", [adult.userId])).rows[0].n, 0, "row deleted, no tombstone");
  const cols = (await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name IN ('lesson_like','lesson_save') ORDER BY table_name, ordinal_position")).rows.map((r) => r.column_name);
  assert.deepEqual(cols, ["user_id", "slug", "created_at_ms", "user_id", "slug", "created_at_ms"], "C6.1: exactly three columns each");
  assert.equal((await w.api.mark(req("/api/account/likes/lesson-c", { method: "PUT" }), "lesson_like", "lesson-c", true)).status, 401, "no anonymous like");
  assert.equal(
    (await w.api.mark(req("/api/account/likes/lesson-c", { method: "PUT", cookie: adult.cookie, headers: { origin: "https://evil.example" } }), "lesson_like", "lesson-c", true)).status,
    403,
  );
});

t("16. likes: at most 60 like writes per account per rolling day (429 after), keys hashed", async () => {
  let clock = Date.now();
  const w = makeWorld(pool, { now: () => clock });
  const a = await signUp(w, "capped@example.com", "16+");
  const statuses = [];
  for (let i = 0; i < 61; i++) {
    const set = i % 2 === 0;
    statuses.push((await w.api.mark(req("/api/account/likes/lesson-c", { method: set ? "PUT" : "DELETE", cookie: a.cookie }), "lesson_like", "lesson-c", set)).status);
  }
  assert.equal(statuses.filter((s) => s === 204).length, 60);
  assert.equal(statuses.at(-1), 429);
  clock += 86_400_001;
  assert.equal((await w.api.mark(req("/api/account/likes/lesson-c", { method: "PUT", cookie: a.cookie }), "lesson_like", "lesson-c", true)).status, 204);
});

t("17. saves: any band; merge adds saves only when the learner chose to send them; unsave deletes; no tombstone", async () => {
  const w = makeWorld(pool, { now: () => T0 + 5 * DAY });
  const teen = await signUp(w, "saver@example.com", "13-15");
  const merge = (body) => w.api.merge(req("/api/account/merge", { method: "POST", body, cookie: teen.cookie }));
  let res = await (await merge({ progress: {} })).json();
  assert.deepEqual(res.saves, [], "no saves key: nothing imported");
  res = await (await merge({ progress: {}, saves: [{ slug: "lesson-b", at: T0 }, { slug: "zzz", at: T0 }, { slug: "lesson-c", at: 5 }, { slug: "lesson-b", at: T0 + 1 }] })).json();
  assert.deepEqual(res.saves, [{ slug: "lesson-b", at: T0 }]);
  assert.equal((await w.api.mark(req("/api/account/saves/lesson-d", { method: "PUT", cookie: teen.cookie }), "lesson_save", "lesson-d", true)).status, 204);
  assert.equal((await w.api.mark(req("/api/account/saves/lesson-b", { method: "DELETE", cookie: teen.cookie }), "lesson_save", "lesson-b", false)).status, 204);
  const list = await (await w.api.listMarks(req("/api/account/saves", { cookie: teen.cookie }), "lesson_save")).json();
  assert.deepEqual(list.saves.map((s) => s.slug), ["lesson-d"]);
  res = await (await merge({ progress: {}, saves: [] })).json();
  assert.deepEqual(res.saves.map((s) => s.slug), ["lesson-d"], "merge never deletes");
});

t("18. counts: label or null; 0 and 9 byte-identical; 24-hour rule; hide list; no raw number; cacheable; no cookie", async () => {
  const w = makeWorld(pool);
  await pool.query("DELETE FROM lesson_like");
  // seed: fake accounts with likes (fake data only)
  const seed = async (slug, n, ageHours = 48) => {
    await pool.query(
      `INSERT INTO auth_user (id, email, email_verified, age_band, policy_version, policy_accepted_at, created_at)
       SELECT 'seed-' || $1 || '-' || g, 'seed-' || $1 || '-' || g || '@example.com', true, '16+', $3, now(), now() - make_interval(hours => $4)
       FROM generate_series(1, $2) g`,
      [slug, n, POLICY, ageHours],
    );
    await pool.query(`INSERT INTO lesson_like (user_id, slug, created_at_ms) SELECT 'seed-' || $1 || '-' || g, $1, 1 FROM generate_series(1, $2) g`, [slug, n]);
  };
  await seed("lesson-b", 9);
  await seed("lesson-c", 1234);
  await seed("lesson-d", 10, 1); // accounts 1 hour old
  const get = async (qs, extra = {}) => w.api.counts(req(`/api/likes/counts?slugs=${qs}`, extra));
  const zero = await (await get("plates-move")).text();
  const nine = await (await get("lesson-b")).text();
  assert.equal(zero.replace("plates-move", "X"), nine.replace("lesson-b", "X"), "0 and 9 give byte-identical answers");
  assert.deepEqual(JSON.parse(nine), { counts: { "lesson-b": null } });
  const res = await get("lesson-c,lesson-d,unknown,plates-move");
  const text = await res.text();
  assert.deepEqual(JSON.parse(text), { counts: { "lesson-c": "1k+", "lesson-d": null, "plates-move": null } }, "young accounts excluded; unknown slug ignored");
  assert.ok(!/1234|1233|\b10\b/.test(text), "no raw number in the body");
  assert.equal(res.headers.get("cache-control"), "public, max-age=600, s-maxage=600");
  assert.deepEqual(res.headers.getSetCookie(), []);
  const adult = await signUp(w, "viewer@example.com");
  assert.equal(await (await get("lesson-c,lesson-d,plates-move", { cookie: adult.cookie })).text(), text.replace("lesson-c,lesson-d,unknown,plates-move", ""), "same body with a session cookie");
  await pool.query("UPDATE auth_user SET created_at = created_at - interval '24 hours' WHERE id LIKE 'seed-lesson-d-%'");
  assert.deepEqual(await (await get("lesson-d")).json(), { counts: { "lesson-d": "10+" } }, "counted once the accounts are 24 h old");
  w.env.LIKE_COUNTS_HIDDEN = "lesson-c, lesson-x";
  assert.deepEqual(await (await get("lesson-c")).json(), { counts: { "lesson-c": null } }, "hidden lesson answers null");
  delete w.env.LIKE_COUNTS_HIDDEN;
  const many = Array.from({ length: 80 }, () => "plates-move").join(",");
  assert.deepEqual(await (await get(many)).json(), { counts: { "plates-move": null } });
  assert.ok(!w.logs.some((l) => /\d{2,}/.test(l.replace(/sqlstate=\w+/, ""))), "no number in any log line");
  await pool.query("DELETE FROM lesson_like WHERE user_id LIKE 'seed-%'");
  await pool.query("DELETE FROM auth_user WHERE id LIKE 'seed-%'");
});

// ---------------- Export and deletion (§7, §9) ----------------

t("19. export: one file in the s3c:progress:v1 shape, round trip exact; likes and saves listed; no token, IP or id", async () => {
  const w = makeWorld(pool, { now: () => T0 + 5 * DAY });
  const { cookie, userId } = await signUp(w, "export@example.com");
  const progress = { "plates-move": { completedAt: T0, predictedCorrectly: true, recalls: [{ at: T0 + DAY, correct: true }] }, "lesson-b": { predictedCorrectly: false, recalls: [] } };
  const merged = (await (await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress, saves: [{ slug: "lesson-c", at: T0 }] }, cookie }))).json()).progress;
  await w.api.mark(req("/api/account/likes/lesson-b", { method: "PUT", cookie }), "lesson_like", "lesson-b", true);
  const res = await w.api.exportFile(req("/api/account/export", { cookie }));
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-disposition"), /system3-history\.json/);
  const text = await res.text();
  const file = JSON.parse(text);
  assert.equal(file.format, "s3c-export-v1");
  assert.deepEqual(file.progress, merged);
  assert.deepEqual(file.progress, progress, "export gives back exactly what was imported");
  assert.deepEqual(Object.keys(file.account).sort(), ["ageBand", "createdAt", "email", "lastActiveAt", "policyAcceptedAt", "policyVersion"]);
  assert.deepEqual(file.saves.map((s) => s.slug), ["lesson-c"]);
  assert.deepEqual(file.likes.map((s) => s.slug), ["lesson-b"]);
  const token = (await pool.query("SELECT token FROM auth_session WHERE user_id = $1", [userId])).rows[0].token;
  assert.ok(!text.includes(token) && !text.includes(userId), "no session token, no account id");
  assert.equal((await w.api.exportFile(req("/api/account/export"))).status, 401);
});

t("20. delete: one transaction; the learner is told what went; every table 0 but the tombstone; re-sign-up is a new, empty account", async () => {
  const w = makeWorld(pool, { now: () => T0 + 5 * DAY });
  const email = "delete@example.com";
  const { cookie, userId } = await signUp(w, email);
  await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress: { "plates-move": { completedAt: T0, recalls: [{ at: T0 + DAY, correct: true }, { at: T0 + 2 * DAY, correct: false }] } }, saves: [{ slug: "lesson-c", at: T0 }] }, cookie }));
  await w.api.mark(req("/api/account/likes/lesson-b", { method: "PUT", cookie }), "lesson_like", "lesson-b", true);
  await w.api.start(req("/api/account/start", { method: "POST", body: { email, ageBand: "16+", policyVersion: POLICY } })); // a pending link
  assert.equal((await w.api.remove(req("/api/account/delete", { method: "POST", body: {}, cookie }))).status, 400, "needs confirm");
  assert.equal((await w.api.remove(req("/api/account/delete", { method: "POST", body: { confirm: true }, cookie, headers: { origin: "https://evil.example" } }))).status, 403);
  const res = await w.api.remove(req("/api/account/delete", { method: "POST", body: { confirm: true }, cookie }));
  assert.equal(res.status, 200);
  const { deleted } = await res.json();
  assert.deepEqual(deleted, { account: 1, lessons: 1, recalls: 2, devices: 1, likes: 1, saves: 1, settings: 0, pendingLinks: 1 });
  assert.ok(res.headers.getSetCookie().some((c) => /^s3c\.session_token=;.*Max-Age=0/.test(c) && /Path=\/api\/account/.test(c)), "cookie cleared on the scoped path");
  const client = await pool.connect();
  try {
    const c = await accountCounts(client, userId, email);
    assert.ok(deletionPasses(c), JSON.stringify(c));
    assert.equal(c.deleted_account, 1);
  } finally {
    client.release();
  }
  assert.equal((await w.api.me(req("/api/account/me", { cookie }))).status, 200);
  assert.equal((await (await w.api.me(req("/api/account/me", { cookie }))).json()).signedIn, false, "old cookie is dead");
  const again = await signUp(w, email);
  assert.notEqual(again.userId, userId, "a new random id");
  assert.deepEqual((await (await w.api.progressGet(req("/api/account/progress", { cookie: again.cookie }))).json()).progress, {});
});

t("21. purge (C10, M3): expired links, intents, sessions and old tombstones wait for the next start, which removes them", async () => {
  const w = makeWorld(pool);
  const { cookie } = await signUp(w, "purge@example.com");
  await w.api.start(req("/api/account/start", { method: "POST", body: { email: "pending@example.com", ageBand: "16+", policyVersion: POLICY } }));
  await pool.query("UPDATE auth_verification SET expires_at = now() - interval '1 hour', created_at = now() - interval '2 hours'");
  await pool.query("UPDATE signup_intent SET created_at = now() - interval '2 hours', expires_at = now() - interval '1 hour' - interval '55 minutes'");
  await pool.query("INSERT INTO deleted_account (user_id, deleted_at) VALUES ('old-tomb', now() - interval '36 days') ON CONFLICT DO NOTHING");
  await w.api.me(req("/api/account/me", { cookie }));
  await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress: {} }, cookie }));
  const client = await pool.connect();
  try {
    const before = await oldestExpired(client);
    assert.ok(before.auth_verification.count >= 1 && before.auth_verification.oldestSeconds >= 3500, "survives me and merge; the tool reports it");
    assert.equal(before.deleted_account.count, 1);
    assert.ok(!JSON.stringify(before).includes("@"), "counts and ages only");
    await w.api.start(req("/api/account/start", { method: "POST", body: { email: "trigger@example.com", ageBand: "16+", policyVersion: POLICY } }));
    const after = await oldestExpired(client);
    for (const v of Object.values(after)) assert.equal(v.count, 0);
  } finally {
    client.release();
  }
});

t("22. M2: the idle purge keys on last activity; active learners are kept; idle ones are tombstoned and removed", async () => {
  const mk = async (id, signIn, sessionUpdated) => {
    await pool.query(
      "INSERT INTO auth_user (id, email, email_verified, age_band, policy_version, policy_accepted_at, last_sign_in_at) VALUES ($1, $1 || '@example.com', true, '16+', $2, now(), now() - $3::interval)",
      [id, POLICY, signIn],
    );
    if (sessionUpdated) await pool.query("INSERT INTO auth_session (id, token, user_id, expires_at, updated_at) VALUES ($1, $1, $1, now() + interval '1 day', now() - $2::interval)", [id, sessionUpdated]);
  };
  await mk("idle-active", "30 months", "1 day");
  await mk("idle-nosession", "25 months", null);
  await mk("idle-oldsession", "26 months", "25 months");
  await pool.query(IDLE_PURGE_SQL);
  const left = (await pool.query("SELECT id FROM auth_user WHERE id LIKE 'idle-%' ORDER BY id")).rows.map((r) => r.id);
  assert.deepEqual(left, ["idle-active"]);
  const tombs = (await pool.query("SELECT user_id FROM deleted_account WHERE user_id LIKE 'idle-%' ORDER BY user_id")).rows.map((r) => r.user_id);
  assert.deepEqual(tombs, ["idle-nosession", "idle-oldsession"]);
  await pool.query("DELETE FROM auth_user WHERE id LIKE 'idle-%'");
  await pool.query("DELETE FROM deleted_account WHERE user_id LIKE 'idle-%'");
});

t("23. A-6: a constraint failure inside a library route logs no email, token or value", async () => {
  const w = makeWorld(pool);
  // Force the user insert to fail on a CHECK: an intent whose policy version passes the hook but a band the DB refuses is impossible,
  // so drop the intent's NOT NULL path by making the email too long for the column instead.
  const long = `${"a".repeat(250)}@example.com`;
  await w.auth.api.signInMagicLink({ body: { email: long, metadata: { ageBand: "16+", policyVersion: POLICY } }, headers: new Headers({ host: "localhost:3000" }) }).catch(() => {});
  const link = w.links.find((l) => l.email === long);
  if (link) {
    const res = await w.api.authRoute(new Request(link.url, { headers: { host: "localhost:3000" } }));
    assert.ok(res.status >= 300);
  }
  for (const l of w.logs) {
    assert.ok(!l.includes("@") && !l.includes("aaaa"), `log line carries a value: ${l}`);
    assert.match(l, /^(better-auth \w+( sqlstate=\w{5})?|account [\w ]+: failed( sqlstate=\w{5})?)$/);
  }
});

t("24. A-5: auth refuses to construct with any BETTER_AUTH_TELEMETRY* variable set, or without a secret", async () => {
  for (const v of ["BETTER_AUTH_TELEMETRY", "BETTER_AUTH_TELEMETRY_ENDPOINT", "BETTER_AUTH_TELEMETRY_DEBUG"]) {
    assert.throws(() => createAuth({ pool, env: baseEnv({ [v]: "1" }) }), (e) => e.code === "TELE0", v);
  }
  assert.throws(() => createAuth({ pool, env: baseEnv({ BETTER_AUTH_SECRET: undefined }) }), (e) => e.code === "SECR0");
});

t("25. sign-out: clears the cookie on the scoped path and ends the session", async () => {
  const w = makeWorld(pool);
  const { cookie, userId } = await signUp(w, "signout@example.com");
  const res = await w.api.authRoute(req("/api/account/auth/sign-out", { method: "POST", body: {}, cookie }));
  assert.equal(res.status, 200);
  assert.ok(res.headers.getSetCookie().some((c) => c.startsWith("s3c.session_token=;") && /Path=\/api\/account/.test(c)));
  assert.equal((await pool.query("SELECT count(*) AS n FROM auth_session WHERE user_id = $1", [userId])).rows[0].n, 0);
  assert.equal((await (await w.api.me(req("/api/account/me", { cookie }))).json()).signedIn, false);
});

t("26. tools: --all-counts shows auth_account 0; migrations go down and up cleanly", async () => {
  const client = await pool.connect();
  try {
    const c = await allCounts(client);
    assert.equal(c.auth_account, 0);
    assert.deepEqual(await applied(client), [1, 2]);
    assert.deepEqual(await migrateDown(client, { to: 0 }), [2, 1]);
    const left = (await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY 1")).rows.map((r) => r.table_name);
    assert.deepEqual(left, ["schema_migrations"]);
    assert.deepEqual(await migrateUp(client), [1, 2]);
    const tables = (await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY 1")).rows.map((r) => r.table_name);
    assert.deepEqual(tables, ["auth_account", "auth_session", "auth_user", "auth_verification", "deleted_account", "lesson_like", "lesson_save", "progress", "recall", "schema_migrations", "signup_intent"]);
  } finally {
    client.release();
  }
});

t("27. Postgres is 16 or newer (M1's IS JSON; readiness A-14)", async () => {
  const { rows } = await pool.query("SHOW server_version_num");
  assert.ok(Number(rows[0].server_version_num) >= 160000);
  assert.ok(SLUGS.length > 0);
});

// ---------------- Principal review 2026-10-18 PC4 (F6, F7) ----------------

t("28. PC4: the recall cap holds across requests (the 20 x 100 probe), and progress writes and merges are limited per account", async () => {
  let clock = Date.now();
  const w = makeWorld(pool, { now: () => clock });
  const { cookie, userId } = await signUp(w, "probe@example.com");
  const base = clock - 30 * DAY;
  const put = (entry) => w.api.progressPut(req("/api/account/progress", { method: "PUT", body: { slug: "lesson-c", entry }, cookie }));
  for (let i = 0; i < 20; i++) {
    const recalls = Array.from({ length: 100 }, (_, j) => ({ at: base + (i * 100 + j) * 1000, correct: j % 2 === 0 }));
    assert.equal((await put({ recalls })).status, 200, `put ${i}`);
  }
  const n = Number((await pool.query("SELECT count(*) AS n FROM recall WHERE user_id = $1 AND slug = 'lesson-c'", [userId])).rows[0].n);
  assert.equal(n, 100, "at most 100 recalls per (account, slug), not 2,000");
  const got = (await (await w.api.progressGet(req("/api/account/progress", { cookie }))).json()).progress["lesson-c"].recalls;
  assert.equal(got.length, 100);
  assert.equal(got.at(-1).at, base + 1999 * 1000, "the newest are kept (revisitDue reads the last)");
  assert.equal(got[0].at, base + 1900 * 1000);
  // The same probe through merge: the cap holds there too, and merge stops at 10 per hour per account.
  const statuses = [];
  for (let i = 0; i < 11; i++) {
    const recalls = Array.from({ length: 100 }, (_, j) => ({ at: base + 3_000_000 + (i * 100 + j) * 1000, correct: true }));
    statuses.push((await w.api.merge(req("/api/account/merge", { method: "POST", body: { progress: { "lesson-d": { recalls } } }, cookie }))).status);
  }
  assert.deepEqual(statuses.slice(0, 10), Array(10).fill(200));
  assert.equal(statuses[10], 429, "11th merge in an hour refused");
  assert.equal(Number((await pool.query("SELECT count(*) AS n FROM recall WHERE user_id = $1 AND slug = 'lesson-d'", [userId])).rows[0].n), 100);
  // Progress PUTs: 20 used above; 40 more pass, then 429 until the 10-minute window moves on.
  for (let i = 0; i < 40; i++) assert.equal((await put({ recalls: [{ at: base + 5_000_000 + i, correct: true }] })).status, 200);
  assert.equal((await put({ recalls: [{ at: base + 6_000_000, correct: true }] })).status, 429);
  const other = await signUp(w, "probe-other@example.com");
  assert.equal(
    (await w.api.progressPut(req("/api/account/progress", { method: "PUT", body: { slug: "lesson-c", entry: { recalls: [{ at: base, correct: true }] } }, cookie: other.cookie }))).status,
    200,
    "the limit is per account",
  );
  clock += 600_001;
  assert.equal((await put({ recalls: [{ at: base + 6_000_001, correct: true }] })).status, 200);
});

t("29. PC4 (F7): unlike and unsave of a lesson that has left the catalog delete the row; marking it is still refused", async () => {
  const w = makeWorld(pool);
  const a = await signUp(w, "retired@example.com", "16+");
  for (const table of ["lesson_like", "lesson_save"]) {
    await pool.query(`INSERT INTO ${table} (user_id, slug, created_at_ms) VALUES ($1, 'retired-lesson', $2)`, [a.userId, Date.now()]);
  }
  for (const [kind, table] of [["likes", "lesson_like"], ["saves", "lesson_save"]]) {
    const put = await w.api.mark(req(`/api/account/${kind}/retired-lesson`, { method: "PUT", cookie: a.cookie }), table, "retired-lesson", true);
    assert.equal(put.status, 404, `${kind}: marking a retired lesson is refused`);
    const del = await w.api.mark(req(`/api/account/${kind}/retired-lesson`, { method: "DELETE", cookie: a.cookie }), table, "retired-lesson", false);
    assert.equal(del.status, 204, `${kind}: unmark of a retired lesson`);
    assert.equal(Number((await pool.query(`SELECT count(*) AS n FROM ${table} WHERE user_id = $1`, [a.userId])).rows[0].n), 0, `${kind}: row deleted`);
  }
  const long = "x".repeat(201);
  assert.equal((await w.api.mark(req(`/api/account/saves/${long}`, { method: "DELETE", cookie: a.cookie }), "lesson_save", long, false)).status, 404);
});

t("30. PC10: every signed-in write needs the session account's tag; another account's tag, none or an empty one gets 409 and writes nothing", async () => {
  const w = makeWorld(pool);
  const a = await signUp(w, "bind-a@example.com", "16+");
  const b = await signUp(w, "bind-b@example.com", "16+");
  assert.notEqual(a.tag, b.tag);
  const snapshot = async () => {
    const one = async (sql) => (await pool.query(sql, [b.userId])).rows;
    return {
      progress: await one("SELECT slug, completed_at_ms, predicted_correctly FROM progress WHERE user_id = $1 ORDER BY slug"),
      recall: await one("SELECT slug, at_ms FROM recall WHERE user_id = $1 ORDER BY slug, at_ms"),
      likes: await one("SELECT slug FROM lesson_like WHERE user_id = $1 ORDER BY slug"),
      saves: await one("SELECT slug FROM lesson_save WHERE user_id = $1 ORDER BY slug"),
      user: await one("SELECT id FROM auth_user WHERE id = $1"),
    };
  };
  // Every write route, each sent with B's cookie (the browser is in B) and the tag a page started with.
  const writes = (account) => [
    ["PUT progress", () => w.api.progressPut(req("/api/account/progress", { method: "PUT", cookie: b.cookie, account, body: { slug: "lesson-c", entry: { completedAt: T0, predictedCorrectly: true, recalls: [{ at: T0 + DAY, correct: true }] } } }))],
    ["POST merge", () => w.api.merge(req("/api/account/merge", { method: "POST", cookie: b.cookie, account, body: { progress: { "lesson-d": { completedAt: T0, recalls: [] } }, saves: [{ slug: "lesson-d", at: T0 }] } }))],
    ["PUT save", () => w.api.mark(req("/api/account/saves/lesson-b", { method: "PUT", cookie: b.cookie, account }), "lesson_save", "lesson-b", true)],
    ["PUT like", () => w.api.mark(req("/api/account/likes/lesson-b", { method: "PUT", cookie: b.cookie, account }), "lesson_like", "lesson-b", true)],
    ["DELETE like", () => w.api.mark(req("/api/account/likes/lesson-b", { method: "DELETE", cookie: b.cookie, account }), "lesson_like", "lesson-b", false)],
    ["POST delete", () => w.api.remove(req("/api/account/delete", { method: "POST", cookie: b.cookie, account, body: { confirm: true } }))],
  ];
  const before = await snapshot();
  for (const [label, account] of [["A's tag", a.tag], ["no tag", null], ["an empty tag", ""], ["a near miss", b.tag.slice(0, -1) + (b.tag.endsWith("A") ? "B" : "A")]]) {
    for (const [what, call] of writes(account)) {
      const res = await call();
      assert.equal(res.status, 409, `${what} with ${label}`);
      assert.deepEqual(await res.json(), { error: "account_changed" });
      assert.deepEqual(res.headers.getSetCookie(), [], `${what}: no cookie on a 409`);
    }
  }
  assert.deepEqual(await snapshot(), before, "nothing written to B");
  // The tag is checked before the body is read: a malformed body with the wrong tag is still a 409, never a 400.
  assert.equal((await w.api.progressPut(req("/api/account/progress", { method: "PUT", cookie: b.cookie, account: a.tag, body: "{not json" }))).status, 409);
  // Signed out stays 401 (no session to compare with); a foreign Origin stays 403 (checked first).
  assert.equal((await w.api.merge(req("/api/account/merge", { method: "POST", account: a.tag, body: { progress: {} } }))).status, 401);
  assert.equal((await w.api.merge(req("/api/account/merge", { method: "POST", cookie: b.cookie, account: b.tag, body: { progress: {} }, headers: { origin: "https://evil.example" } }))).status, 403);
  // B's own tag: each write goes through.
  const ok = [];
  for (const [what, call] of writes(b.tag)) ok.push(`${what} ${(await call()).status}`);
  assert.deepEqual(ok, ["PUT progress 200", "POST merge 200", "PUT save 204", "PUT like 204", "DELETE like 204", "POST delete 200"]);
  // A's account was never touched by any of it.
  assert.equal(Number((await pool.query("SELECT count(*) AS n FROM auth_user WHERE id = $1", [a.userId])).rows[0].n), 1);
});
