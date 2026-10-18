// The browser side of accounts (src/lib/account-client.ts with src/kit/progress.ts), driven in Node against the real
// handlers and a real PostgreSQL 16 (see helpers.mjs). A "profile" is one browser profile: its localStorage and its
// session cookie. A "page load" imports fresh copies of the client and the kit (their module state is per page), sets
// window and fetch for that profile, and does what AccountSync in the root layout does: startAccountSync() once.
// Covers the principal review 2026-10-18 MC2, PC1, PC2, PC3, PC8, its re-read's probe 1 (PC3 account binding) and
// PC9, and the privacy re-read 2026-10-18 scripts (a), (b).
// Run: npm run test:accounts
import test from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DB_URL, SKIP_DB, BASE, SLUGS, freshDatabase, makeWorld, signUp } from "./helpers.mjs";
import { createAccountApi } from "../../src/lib/server/account-api.ts";

register("./client-loader.mjs", import.meta.url);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CLIENT = pathToFileURL(path.join(ROOT, "src/lib/account-client.ts")).href;
const KIT = pathToFileURL(path.join(ROOT, "src/kit/progress.ts")).href;
const DAY = 86_400_000;
const NOW = Date.now();
const PROGRESS_KEY = "s3c:progress:v1";
const DEVICE_KEY = "s3c:account-device:v1";

let pool;
test.before(async () => {
  if (DB_URL) pool = await freshDatabase();
});
test.after(async () => {
  if (pool) await pool.end();
});
const t = (name, fn) => test(name, { skip: SKIP_DB }, fn);

// ---------- The fake browser ----------
function makeProfile(world) {
  const store = new Map();
  return {
    world,
    store,
    cookie: null,
    calls: [],
    inflight: new Set(),
    href: `${BASE}/`,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => void store.set(k, String(v)),
      removeItem: (k) => void store.delete(k),
    },
  };
}

function route(api, request) {
  const p = new URL(request.url).pathname;
  const m = request.method;
  if (p === "/api/account/me") return api.me(request);
  if (p === "/api/account/progress") return m === "GET" ? api.progressGet(request) : api.progressPut(request);
  if (p === "/api/account/merge") return api.merge(request);
  if (p === "/api/account/delete") return api.remove(request);
  if (p === "/api/account/saves") return api.listMarks(request, "lesson_save");
  if (p === "/api/account/likes") return api.listMarks(request, "lesson_like");
  const mark = p.match(/^\/api\/account\/(likes|saves)\/(.+)$/);
  if (mark) return api.mark(request, mark[1] === "likes" ? "lesson_like" : "lesson_save", decodeURIComponent(mark[2]), m === "PUT");
  if (p.startsWith("/api/account/auth/")) return api.authRoute(request);
  throw new Error(`unrouted ${m} ${p}`);
}

function fakeFetch(profile, input, init = {}) {
  const url = new URL(String(input), BASE);
  const method = init.method ?? "GET";
  const headers = { host: "localhost:3000", ...(init.headers ?? {}) };
  if (method !== "GET") headers.origin = BASE; // a browser sends Origin on a same-origin write
  if (profile.cookie && url.pathname.startsWith("/api/account")) headers.cookie = profile.cookie; // cookie Path=/api/account
  profile.calls.push({ method, path: url.pathname + url.search, cache: init.cache, body: init.body ? JSON.parse(init.body) : undefined });
  const request = new Request(url, { method, headers, body: init.body });
  const p = Promise.resolve(route(profile.world.api, request)).then((res) => {
    for (const c of res.headers.getSetCookie()) {
      if (!c.startsWith("s3c.session_token=")) continue;
      const pair = c.split(";")[0];
      profile.cookie = pair === "s3c.session_token=" || /Max-Age=0/i.test(c) ? null : pair;
    }
    return res;
  });
  profile.inflight.add(p);
  p.finally(() => profile.inflight.delete(p)).catch(() => {});
  return p;
}

let loads = 0;
/** A full page load in this profile. Returns the page's own copies of the client and the kit. */
async function pageLoad(profile, href = "/", { start = true } = {}) {
  profile.href = new URL(href, BASE).href;
  globalThis.window = {
    localStorage: profile.localStorage,
    get location() {
      return { href: profile.href };
    },
    history: { state: null, replaceState: (_s, _t, u) => void (profile.href = new URL(u, BASE).href) },
    addEventListener: () => {},
  };
  globalThis.fetch = (input, init) => fakeFetch(profile, input, init);
  const n = ++loads;
  const client = await import(`${CLIENT}?load=${n}`);
  const kit = await import(`${KIT}?load=${n}`);
  const state = start ? await client.startAccountSync() : undefined;
  await idle(profile);
  return { client, kit, state };
}

async function idle(profile) {
  for (let i = 0; i < 5; i++) {
    while (profile.inflight.size) await Promise.all([...profile.inflight]);
    await new Promise((r) => setImmediate(r));
  }
}

const local = (profile) => JSON.parse(profile.store.get(PROGRESS_KEY) ?? "{}");
const writes = (profile) => profile.calls.filter((c) => c.method !== "GET");
/** What Lesson.tsx does at the end of a lesson (src/kit/Lesson.tsx, read, not changed). */
const completeLesson = (kit, slug, correct, at) => kit.updateProgress(slug, (p) => ({ ...p, completedAt: p.completedAt ?? at, predictedCorrectly: correct }));
/** What Feed.tsx does when a revisit is answered. */
const recall = (kit, slug, correct, at) => kit.updateProgress(slug, (p) => ({ ...p, recalls: [...p.recalls, { at, correct }] }));

async function rows(userId) {
  const progress = (await pool.query("SELECT slug, completed_at_ms, predicted_correctly FROM progress WHERE user_id = $1 ORDER BY slug", [userId])).rows.map((r) => ({
    slug: r.slug,
    completedAt: r.completed_at_ms === null ? null : Number(r.completed_at_ms),
    predicted: r.predicted_correctly,
  }));
  const recalls = (await pool.query("SELECT slug, at_ms, correct FROM recall WHERE user_id = $1 ORDER BY slug, at_ms", [userId])).rows.map((r) => ({
    slug: r.slug,
    at: Number(r.at_ms),
    correct: r.correct,
  }));
  return { progress, recalls };
}

/** An anonymous history on slug plates-move and lesson-b, the way the kit writes it. */
function seedAnonymous(profile) {
  const anon = {
    "plates-move": { completedAt: NOW - 20 * DAY, predictedCorrectly: false, recalls: [{ at: NOW - 19 * DAY, correct: true }, { at: NOW - 16 * DAY, correct: false }] },
    "lesson-b": { completedAt: NOW - 18 * DAY, predictedCorrectly: true, recalls: [] },
  };
  profile.store.set(PROGRESS_KEY, JSON.stringify(anon));
  return anon;
}

// ---------- Pure parts (no database) ----------

test("C1. PC1: progressDelta is the change an update made, never the stored entry", async () => {
  const profile = makeProfile({ api: null });
  const { client } = await pageLoad(profile, "/", { start: false });
  const before = { completedAt: 1, predictedCorrectly: false, recalls: [{ at: 2, correct: true }] };
  assert.deepEqual(client.progressDelta(before, { ...before, recalls: [...before.recalls, { at: 3, correct: false }] }), { recalls: [{ at: 3, correct: false }] });
  assert.equal(client.progressDelta(before, { ...before, predictedCorrectly: true }), null, "a replay's prediction is not a first prediction");
  assert.equal(client.progressDelta(before, { ...before }), null, "a replay of a completed lesson adds nothing");
  assert.deepEqual(client.progressDelta(undefined, { completedAt: 5, predictedCorrectly: true, recalls: [] }), { completedAt: 5, predictedCorrectly: true, recalls: [] });
  assert.deepEqual(
    client.movesAgainst(
      { a: { completedAt: 1, recalls: [{ at: 2, correct: true }, { at: 3, correct: true }] }, b: { completedAt: 1, recalls: [] } },
      { a: { completedAt: 9, recalls: [{ at: 2, correct: true }] } },
      ["x", "y"],
      ["y"],
    ),
    { lessons: 1, recalls: 1, saves: 1 },
    "only what the account does not hold",
  );
  assert.deepEqual(client.unionMaps({ a: { completedAt: 5, recalls: [{ at: 7, correct: true }] } }, { a: { completedAt: 3, predictedCorrectly: true, recalls: [{ at: 6, correct: false }] } }), {
    a: { completedAt: 3, predictedCorrectly: true, recalls: [{ at: 6, correct: false }, { at: 7, correct: true }] },
  });
});

test("C2. MC2: accounts off, the first /me ask uses the HTTP cache (the 404 says max-age=300); the device is untouched; refresh is no-store", async () => {
  const api = createAccountApi({
    env: () => ({}),
    pool: () => assert.fail("pool touched with accounts off"),
    auth: () => assert.fail("auth touched with accounts off"),
    inCatalog: (s) => SLUGS.includes(s),
  });
  const profile = makeProfile({ api });
  const anon = seedAnonymous(profile);
  const { client, kit, state } = await pageLoad(profile, "/");
  assert.deepEqual(state, { me: null });
  assert.deepEqual(profile.calls, [{ method: "GET", path: "/api/account/me", cache: undefined, body: undefined }], "one request, HTTP cache allowed");
  const res = await api.me(new Request(`${BASE}/api/account/me`));
  assert.equal(res.status, 404);
  assert.equal(res.headers.get("cache-control"), "public, max-age=300, s-maxage=300");
  recall(kit, "plates-move", true, NOW - DAY);
  await idle(profile);
  assert.equal(profile.calls.length, 1, "no sink with accounts off: a lesson update sends nothing");
  assert.deepEqual(local(profile)["lesson-b"], anon["lesson-b"]);
  assert.ok(!profile.store.has(DEVICE_KEY));
  await client.accountMe(true);
  assert.equal(profile.calls.at(-1).cache, "no-store", "refresh bypasses the cache");
});

test("C3. PC8: the account merge code is not in the kit (every lesson loads src/kit/progress.ts)", async () => {
  const profile = makeProfile({ api: null });
  const { kit } = await pageLoad(profile, "/", { start: false });
  assert.equal(kit.mergeIntoLocal, undefined);
  assert.deepEqual(Object.keys(kit).filter((k) => /merge|account/i.test(k)), []);
});

// ---------- Against the database ----------

t("C4. privacy script (a), PC1: decline the import, then play: the account gets only the new event, nothing old; nothing is sent before the answer", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  const anon = seedAnonymous(profile);
  const { userId, cookie } = await signUp(world, "decline@example.com");
  profile.cookie = cookie;
  let { client, kit, state } = await pageLoad(profile, "/account?signed-in=1");
  assert.equal(state.syncing, false);
  assert.deepEqual(state.ask, { lessons: 2, recalls: 2, saves: 0 }, "the device's own history, counted before any pull");
  assert.equal(profile.href, `${BASE}/account`, "the sign-in marker is read once and removed from the address");
  // Before the answer: play on a page. Nothing goes up.
  recall(kit, "plates-move", true, NOW - 3 * DAY);
  await idle(profile);
  assert.deepEqual(writes(profile), [], "no sync before the merge screen is answered");
  assert.deepEqual(await rows(userId), { progress: [], recalls: [] });
  // Don't import.
  state = await client.answerMerge(null);
  assert.equal(state.syncing, true);
  await idle(profile);
  assert.deepEqual(writes(profile), [], "declining uploads nothing");
  // Play: one revisit on a lesson in the declined history, and a replay (Lesson.tsx) of another.
  recall(kit, "plates-move", false, NOW - DAY);
  completeLesson(kit, "lesson-b", false, NOW - 1000);
  await idle(profile);
  assert.deepEqual(
    writes(profile).map((c) => c.body),
    [{ slug: "plates-move", entry: { recalls: [{ at: NOW - DAY, correct: false }] } }],
    "one push, the new recall only; the replay of a completed lesson sends nothing",
  );
  assert.deepEqual(await rows(userId), {
    progress: [{ slug: "plates-move", completedAt: null, predicted: null }],
    recalls: [{ slug: "plates-move", at: NOW - DAY, correct: false }],
  });
  // A lesson never played here: its first completion and prediction go up, nothing else.
  completeLesson(kit, "lesson-c", true, NOW - 500);
  await idle(profile);
  assert.deepEqual(writes(profile).at(-1).body, { slug: "lesson-c", entry: { completedAt: NOW - 500, predictedCorrectly: true, recalls: [] } });
  // The next page load remembers the answer: no question, no upload of old history.
  const before = profile.calls.length;
  ({ state } = await pageLoad(profile, "/account"));
  assert.equal(state.syncing, true);
  assert.equal(state.ask, undefined);
  assert.deepEqual(profile.calls.slice(before).map((c) => `${c.method} ${c.path}`), ["GET /api/account/me", "GET /api/account/progress"]);
  const r = await rows(userId);
  assert.equal(r.recalls.length, 1, "none of the anonymous recalls");
  assert.ok(!r.progress.some((p) => p.completedAt === anon["plates-move"].completedAt || p.completedAt === anon["lesson-b"].completedAt), "no anonymous completion");
  assert.ok(!r.progress.some((p) => p.slug === "lesson-b"), "nothing for the replayed lesson");
});

t("C5. PC3: the count is the device's own history the account lacks, computed before the pull; one starter; the page starts nothing", async () => {
  const world = makeWorld(pool);
  const { userId, cookie } = await signUp(world, "count@example.com");
  // The account already holds plates-move (from another device).
  const elsewhere = makeProfile(world);
  elsewhere.cookie = cookie;
  seedAnonymous(elsewhere);
  let page = await pageLoad(elsewhere, "/account?signed-in=1");
  assert.ok(await page.client.answerMerge({ progress: true, saves: false }));
  // A fresh device with no history: nothing to ask, and the account's history arrives after.
  const fresh = makeProfile(world);
  fresh.cookie = cookie;
  page = await pageLoad(fresh, "/account?signed-in=1");
  assert.equal(page.state.syncing, true, "nothing to ask on an empty device");
  assert.equal(page.state.ask, undefined);
  assert.deepEqual(Object.keys(local(fresh)).sort(), ["lesson-b", "plates-move"], "pulled after the (empty) count");
  // A device holding part of what the account has, plus one lesson more: only the difference is offered.
  const partial = makeProfile(world);
  partial.cookie = cookie;
  partial.store.set(
    PROGRESS_KEY,
    JSON.stringify({
      "plates-move": { completedAt: NOW - 20 * DAY, predictedCorrectly: false, recalls: [{ at: NOW - 19 * DAY, correct: true }, { at: NOW - 2 * DAY, correct: true }] },
      "lesson-d": { completedAt: NOW - 4 * DAY, predictedCorrectly: true, recalls: [] },
    }),
  );
  // Race: two callers at once (as if the page also tried), and the page's own read.
  partial.href = `${BASE}/account?signed-in=1`;
  page = await pageLoad(partial, "/account?signed-in=1", { start: false });
  const viewRead = page.client.accountState();
  const [s1, s2] = await Promise.all([page.client.startAccountSync(), page.client.startAccountSync()]);
  await idle(partial);
  assert.equal(s1, s2, "one run, one answer");
  assert.equal(await viewRead, s1, "the page gets the starter's answer");
  assert.deepEqual(s1.ask, { lessons: 1, recalls: 1, saves: 0 }, "lesson-d and the one recall the account lacks");
  assert.deepEqual(partial.calls.map((c) => `${c.method} ${c.path}`), ["GET /api/account/me", "GET /api/account/progress"], "one /me, one read, no merge into the device");
  assert.ok(!local(partial)["lesson-b"], "the account's history is not pulled before the answer");
  // accountState alone starts nothing.
  const idleProfile = makeProfile(world);
  idleProfile.cookie = cookie;
  page = await pageLoad(idleProfile, "/account", { start: false });
  let settled = false;
  page.client.accountState().then(() => (settled = true));
  await idle(idleProfile);
  assert.equal(settled, false);
  assert.deepEqual(idleProfile.calls, [], "the account page does not start the sync");
  // The answer is remembered for this sign-in: Import, then a reload asks nothing.
  page = await pageLoad(partial, "/account", { start: false });
  await page.client.startAccountSync();
  assert.ok(await page.client.answerMerge({ progress: true, saves: false }));
  const n = (await rows(userId)).recalls.length;
  page = await pageLoad(partial, "/account");
  assert.equal(page.state.syncing, true, "remembered");
  assert.equal((await rows(userId)).recalls.length, n);
});

t("C6. privacy script (b), PC2: two accounts on one browser profile share nothing; sign-out puts the device's own history back", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  const anon = seedAnonymous(profile);
  const a = await signUp(world, "first@example.com");
  // A's account already holds lesson-d from somewhere else.
  await world.api.merge(
    new Request(`${BASE}/api/account/merge`, {
      method: "POST",
      headers: { host: "localhost:3000", origin: BASE, "content-type": "application/json", cookie: a.cookie },
      body: JSON.stringify({ progress: { "lesson-d": { completedAt: NOW - 10 * DAY, predictedCorrectly: true, recalls: [{ at: NOW - 9 * DAY, correct: true }] } } }),
    }),
  );
  profile.cookie = a.cookie;
  let page = await pageLoad(profile, "/account?signed-in=1");
  assert.deepEqual(page.state.ask, { lessons: 2, recalls: 2, saves: 0 });
  await page.client.answerMerge(null); // A declines, then plays
  assert.ok(local(profile)["lesson-d"], "A's account history is on the device while A is signed in");
  page = await pageLoad(profile, "/");
  completeLesson(page.kit, "lesson-c", true, NOW - 3 * DAY);
  recall(page.kit, "lesson-c", true, NOW - 2 * DAY);
  await idle(profile);
  assert.equal((await rows(a.userId)).recalls.length, 2, "A's lesson-d recall and A's new lesson-c recall");
  // A signs out.
  page = await pageLoad(profile, "/account");
  assert.equal(await page.client.signOut(), true);
  assert.equal(profile.cookie, null);
  assert.deepEqual(local(profile), anon, "the device holds exactly its own pre-sign-in history again");
  assert.ok(!profile.store.has(DEVICE_KEY));
  // B signs in on the same profile and plays the same lesson.
  const b = await signUp(world, "second@example.com");
  profile.cookie = b.cookie;
  page = await pageLoad(profile, "/account?signed-in=1");
  assert.deepEqual(page.state.ask, { lessons: 2, recalls: 2, saves: 0 }, "B is offered the device's own history only, nothing of A's");
  await page.client.answerMerge(null);
  page = await pageLoad(profile, "/");
  completeLesson(page.kit, "lesson-c", false, NOW - 1000);
  recall(page.kit, "lesson-d", false, NOW - 500);
  await idle(profile);
  assert.deepEqual(await rows(b.userId), {
    progress: [
      { slug: "lesson-c", completedAt: NOW - 1000, predicted: false },
      { slug: "lesson-d", completedAt: null, predicted: null },
    ],
    recalls: [{ slug: "lesson-d", at: NOW - 500, correct: false }],
  }, "B's rows hold B's two events and nothing from A");
  // And B importing gets the anonymous history, still nothing of A's.
  const ra = await rows(a.userId);
  assert.ok(!(await rows(b.userId)).recalls.some((r) => ra.recalls.some((x) => x.at === r.at)));
});

t("C7. PC2: a session that ended elsewhere, or a new sign-in link over an active one, also removes the previous account's history", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  const anon = seedAnonymous(profile);
  const a = await signUp(world, "ended@example.com");
  await world.api.merge(
    new Request(`${BASE}/api/account/merge`, {
      method: "POST",
      headers: { host: "localhost:3000", origin: BASE, "content-type": "application/json", cookie: a.cookie },
      body: JSON.stringify({ progress: { "lesson-d": { completedAt: NOW - 10 * DAY, recalls: [] } } }),
    }),
  );
  profile.cookie = a.cookie;
  let page = await pageLoad(profile, "/account?signed-in=1");
  await page.client.answerMerge(null);
  assert.ok(local(profile)["lesson-d"]);
  // The session ends without our sign-out (expiry, a cleared cookie): the next load sees signedIn false.
  profile.cookie = null;
  page = await pageLoad(profile, "/");
  assert.equal(page.state.me.signedIn, false);
  assert.deepEqual(local(profile), anon);
  // A again, then B's link clicked while A's session is still active (or a link someone mailed).
  profile.cookie = a.cookie;
  page = await pageLoad(profile, "/account?signed-in=1");
  await page.client.answerMerge(null);
  assert.ok(local(profile)["lesson-d"]);
  const b = await signUp(world, "over@example.com");
  profile.cookie = b.cookie;
  page = await pageLoad(profile, "/account?signed-in=1");
  assert.deepEqual(page.state.ask, { lessons: 2, recalls: 2, saves: 0 }, "B's screen offers none of A's lesson-d");
  assert.deepEqual(local(profile), anon, "A's copy left the device before B's count");
});

t("C8. sign-out with 'also clear this device' removes the device's history too; a failed sign-out changes nothing; delete cleans up the same way", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  seedAnonymous(profile);
  profile.store.set("s3c:saves:v1", JSON.stringify({ "lesson-b": NOW - DAY }));
  profile.store.set("s3c:events:v1", "[]");
  const a = await signUp(world, "clear@example.com");
  profile.cookie = a.cookie;
  let page = await pageLoad(profile, "/account?signed-in=1");
  assert.deepEqual(page.state.ask, { lessons: 2, recalls: 2, saves: 1 });
  assert.ok(await page.client.answerMerge({ progress: true, saves: true }));
  assert.ok(!profile.store.has("s3c:saves:v1"), "saves acknowledged by the server leave the device (C5.2)");
  // A sign-out the server refuses changes nothing on the device.
  const realApi = world.api;
  world.api = { ...realApi, authRoute: async () => new Response(null, { status: 500 }) };
  const snapshot = new Map(profile.store);
  assert.equal(await page.client.signOut({ clearDevice: true }), false);
  assert.deepEqual(profile.store, snapshot);
  world.api = realApi;
  assert.equal(await page.client.signOut({ clearDevice: true }), true);
  for (const k of [PROGRESS_KEY, DEVICE_KEY, "s3c:saves:v1", "s3c:events:v1"]) assert.ok(!profile.store.has(k), `${k} cleared`);
  // Delete: the account copy leaves; the device's own history stays (no box ticked).
  const anon = seedAnonymous(profile);
  const d = await signUp(world, "deleter@example.com");
  profile.cookie = d.cookie;
  page = await pageLoad(profile, "/account?signed-in=1");
  await page.client.answerMerge({ progress: true, saves: false });
  completeLesson(page.kit, "lesson-c", true, NOW - 100);
  await idle(profile);
  assert.ok(local(profile)["lesson-c"]);
  const res = await fakeFetch(profile, "/api/account/delete", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ confirm: true }) });
  assert.equal(res.status, 200);
  page.client.afterAccountDeleted(false);
  assert.deepEqual(local(profile), anon);
});

/** Ask for a sign-in link for `email` (as anyone can) and return it with its callbackURL edited to `callback`. */
async function editedLink(world, email, callback) {
  const res = await world.api.start(
    new Request(`${BASE}/api/account/start`, {
      method: "POST",
      headers: { host: "localhost:3000", origin: BASE, "content-type": "application/json" },
      body: JSON.stringify({ email, ageBand: "16+", policyVersion: "draft-2026-10-16" }),
    }),
  );
  assert.equal(res.status, 200);
  const link = new URL(world.links.at(-1).url);
  assert.ok(link.searchParams.has("callbackURL"), "the link carries callbackURL as a query parameter");
  link.searchParams.set("callbackURL", callback);
  return link;
}

t("C9. PC3 probe 1: a sign-in link for another account with callbackURL edited to / (no marker) still meets the merge screen; nothing is pushed until answered", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  const anon = seedAnonymous(profile);
  // The victim A signs in by the normal link and answers.
  const a = await signUp(world, "victim@example.com");
  profile.cookie = a.cookie;
  let page = await pageLoad(profile, "/account?signed-in=1");
  assert.ok(await page.client.answerMerge({ progress: true, saves: false }));
  page = await pageLoad(profile, "/");
  assert.equal(page.state.syncing, true);
  const tagA = page.state.me.tag;
  const deviceA = profile.store.get(DEVICE_KEY);
  // The attacker B has an account with its own history.
  const b = await signUp(world, "attacker@example.com");
  await world.api.merge(
    new Request(`${BASE}/api/account/merge`, {
      method: "POST",
      headers: { host: "localhost:3000", origin: BASE, "content-type": "application/json", cookie: b.cookie },
      body: JSON.stringify({ progress: { "lesson-d": { completedAt: NOW - 10 * DAY, recalls: [{ at: NOW - 9 * DAY, correct: true }] } } }),
    }),
  );
  const rowsA = await rows(a.userId);
  const rowsB = await rows(b.userId);
  // B sends A a fresh link for B's account, callbackURL edited to "/". A clicks it in the same browser profile.
  const link = await editedLink(world, "attacker@example.com", "/");
  const verify = await fakeFetch(profile, link.pathname + link.search);
  assert.equal(verify.status, 302);
  assert.equal(new URL(verify.headers.get("location"), BASE).pathname + new URL(verify.headers.get("location"), BASE).search, "/", "no ?signed-in=1 marker");
  assert.ok(profile.cookie && profile.cookie !== a.cookie, "the profile now holds B's session");
  const before = profile.calls.length;
  page = await pageLoad(profile, "/");
  assert.equal(page.state.syncing, false, "a different account is treated like the marker: the merge screen again");
  assert.deepEqual(page.state.ask, { lessons: 2, recalls: 2, saves: 0 }, "B is offered the device's own history only");
  assert.deepEqual(local(profile), anon, "A's account copy left the device; B's history was not pulled");
  assert.ok(!profile.store.has(DEVICE_KEY), "nothing remembered for B until B's screen is answered");
  // Play before the answer: nothing goes to B (or anyone).
  recall(page.kit, "plates-move", true, NOW - 2 * DAY);
  completeLesson(page.kit, "lesson-c", true, NOW - 1000);
  await idle(profile);
  assert.deepEqual(profile.calls.slice(before).filter((c) => c.method !== "GET"), [], "no push before the answer");
  assert.deepEqual(await rows(b.userId), rowsB, "B's account received nothing");
  assert.deepEqual(await rows(a.userId), rowsA);
  // The next load without the marker still asks (nothing was answered).
  page = await pageLoad(profile, "/");
  assert.equal(page.state.syncing, false);
  // Answering for B is remembered for B; switching back to A's session without the marker asks again.
  const tagB = page.state.me.tag;
  await page.client.answerMerge(null);
  assert.equal(JSON.parse(profile.store.get(DEVICE_KEY)).account, tagB);
  page = await pageLoad(profile, "/");
  assert.equal(page.state.syncing, true, "remembered for B");
  profile.cookie = a.cookie;
  page = await pageLoad(profile, "/");
  assert.equal(page.state.syncing, false, "A again, no marker: asked again");
  // The binding is an opaque per-account value: A's and B's differ, and it is not the id or the email.
  assert.equal(JSON.parse(deviceA).account, tagA, "the device state recorded which account answered");
  assert.match(tagA, /^[A-Za-z0-9_-]{22}$/);
  assert.notEqual(tagA, tagB);
  for (const v of [a.userId, b.userId, "victim@example.com", "victim", "attacker"]) assert.ok(!deviceA.includes(v), `the device key holds ${v}`);
});

t("C10. PC3: a device state written before PC3 (no account tag) asks again instead of syncing", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  const anon = seedAnonymous(profile);
  const a = await signUp(world, "legacy@example.com");
  profile.cookie = a.cookie;
  profile.store.set(DEVICE_KEY, JSON.stringify({ answer: "decline", own: anon }));
  const page = await pageLoad(profile, "/");
  assert.equal(page.state.syncing, false);
  assert.deepEqual(page.state.ask, { lessons: 2, recalls: 2, saves: 0 });
  assert.deepEqual(writes(profile), []);
});

/** Resolves to the value, or to "timeout" after ms. */
const within = (p, ms = 1000) => Promise.race([p, new Promise((r) => setTimeout(() => r("timeout"), ms))]);

t("C11. PC9: /account remounting in the same page load after sign-out, and after deletion, gets an answer (no endless Loading)", async () => {
  const world = makeWorld(pool);
  const profile = makeProfile(world);
  seedAnonymous(profile);
  const a = await signUp(world, "remount@example.com");
  profile.cookie = a.cookie;
  let page = await pageLoad(profile, "/account?signed-in=1");
  await page.client.answerMerge(null);
  assert.equal((await within(page.client.accountState())).syncing, true, "first mount reads the started state");
  assert.equal(await page.client.signOut(), true);
  // The page navigates to / and back to /account without a reload: AccountView mounts again and calls accountState().
  const afterSignOut = await within(page.client.accountState());
  assert.notEqual(afterSignOut, "timeout", "accountState resolves after sign-out");
  assert.equal(afterSignOut.me.signedIn, false);
  assert.ok(!profile.store.has(DEVICE_KEY));
  // A second remount reads the same answer and makes no new request.
  const n = profile.calls.length;
  assert.equal(await within(page.client.accountState()), afterSignOut);
  assert.equal(profile.calls.length, n);
  // Deletion, the same way.
  const d = await signUp(world, "remount-del@example.com");
  profile.cookie = d.cookie;
  page = await pageLoad(profile, "/account?signed-in=1");
  await page.client.answerMerge(null);
  const res = await fakeFetch(profile, "/api/account/delete", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ confirm: true }) });
  assert.equal(res.status, 200);
  page.client.afterAccountDeleted(false);
  const afterDelete = await within(page.client.accountState());
  assert.notEqual(afterDelete, "timeout", "accountState resolves after deletion");
  assert.equal(afterDelete.me.signedIn, false);
});
