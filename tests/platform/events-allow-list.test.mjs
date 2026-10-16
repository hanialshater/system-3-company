// W-999 / W-1181: the /api/events allow-list, privacy ruling C1 and C2
// (company/reviews/_privacy/2026-10-16-experiment-beacon-exp-event.md). Tests src/lib/events-intake.ts,
// which src/app/api/events/route.ts calls as its whole POST handler.
// Run: npm run test:platform
import test from "node:test";
import assert from "node:assert/strict";
import { handleEventPost, pickEvent, REGISTERED_EXPERIMENTS, MAX_SLUG_LENGTH } from "../../src/lib/events-intake.ts";

const post = (body, headers = {}) =>
  new Request("https://s3c.example/api/events", {
    method: "POST",
    headers: { host: "s3c.example", "content-type": "text/plain", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

async function send(body, deps = {}) {
  const lines = [];
  const res = await handleEventPost(post(body), { ...deps, log: (l) => lines.push(l) });
  return { status: res.status, lines, logged: lines.map((l) => JSON.parse(l)) };
}

const NOW = Date.parse("2026-10-16T12:00:00Z");
const EXP_REG = [{ id: "EXP-1", closes: "2026-12-01" }];
const catalog = async (s) => s === "plates-move";
const goodExp = { type: "exp", exp: "EXP-1", origin: "swap", slug: "plates-move", correct: true, spacedDays: 3 };

test("C1: a POST with extra keys does not log them, for every existing type", async () => {
  const extras = { token: "s/abc123", email: "a@b.example", userId: "u1", at: "1999-01-01T00:00:00Z", nested: { x: 1 }, sessionId: "s1" };
  const cases = [
    [{ type: "view", slug: "plates-move" }, ["at", "type", "slug"]],
    [{ type: "interact", slug: "plates-move" }, ["at", "type", "slug"]],
    [{ type: "reveal", slug: "plates-move" }, ["at", "type", "slug"]],
    [{ type: "predict", slug: "plates-move", option: 2, correct: false }, ["at", "type", "slug", "option", "correct"]],
    [{ type: "recall", slug: "plates-move", correct: true, spacedDays: 3 }, ["at", "type", "slug", "correct", "spacedDays"]],
    [{ type: "complete", slug: "plates-move", dwellMs: 41234 }, ["at", "type", "slug", "dwellMs"]],
  ];
  for (const [event, keys] of cases) {
    const { status, lines, logged } = await send({ ...event, ...extras });
    assert.equal(status, 204);
    assert.equal(lines.length, 1, event.type);
    assert.deepEqual(Object.keys(logged[0]), keys, event.type);
    for (const [k, v] of Object.entries(event)) assert.equal(logged[0][k], v, `${event.type}.${k} is kept`);
    assert.notEqual(logged[0].at, extras.at, "the server sets at; a client at is not taken");
    for (const bad of ["token", "abc123", "@", "userId", "sessionId", "nested"]) assert.ok(!lines[0].includes(bad), `${event.type}: ${bad}`);
  }
});

test("C1: the fields current senders use are all kept (src/kit/Lesson.tsx, src/components/Feed.tsx)", async () => {
  const { logged } = await send({ type: "complete", slug: "x", dwellMs: -5 });
  assert.equal(logged[0].dwellMs, -5, "a clock change can make dwellMs negative; it is still logged");
  const r = await send({ type: "recall", slug: "x", correct: false, spacedDays: 0 });
  assert.equal(r.logged[0].spacedDays, 0);
});

test("C1: strings are capped and wrongly typed fields drop the event", async () => {
  assert.equal((await send({ type: "view", slug: "a".repeat(MAX_SLUG_LENGTH) })).lines.length, 1);
  for (const bad of [
    { type: "view", slug: "a".repeat(MAX_SLUG_LENGTH + 1) },
    { type: "view", slug: "" },
    { type: "view", slug: 7 },
    { type: "view" },
    { type: "predict", slug: "x", option: "2", correct: true },
    { type: "predict", slug: "x", option: 1.5, correct: true },
    { type: "predict", slug: "x", option: 1, correct: "yes" },
    { type: "recall", slug: "x", correct: true, spacedDays: "3" },
    { type: "complete", slug: "x", dwellMs: 1e300 },
    { type: "complete", slug: "x" },
    { type: "toString", slug: "x" },
    { type: "__proto__", slug: "x" },
    { type: "page", slug: "x" },
    [{ type: "view", slug: "x" }],
    null,
  ]) {
    const { status, lines } = await send(bad);
    assert.equal(status, 204);
    assert.equal(lines.length, 0, JSON.stringify(bad));
  }
  assert.equal((await send("not json")).lines.length, 0);
  assert.equal((await send(JSON.stringify({ type: "view", slug: "x", pad: "y".repeat(5000) }))).lines.length, 0, "oversize body");
});

test("C2: the registered-experiment list is empty in this change, so no exp record is accepted", async () => {
  assert.deepEqual(REGISTERED_EXPERIMENTS, []);
  const { status, lines } = await send(goodExp, { isCatalogSlug: catalog, now: NOW });
  assert.equal(status, 204);
  assert.equal(lines.length, 0);
});

test("C2: an unregistered or malformed exp is dropped silently with 204", async () => {
  const deps = { experiments: EXP_REG, isCatalogSlug: catalog, now: NOW };
  // The control: with a registered experiment, a fully valid record is logged with exactly the ruling's fields.
  const ok = await send(goodExp, deps);
  assert.deepEqual(Object.keys(ok.logged[0]), ["at", "type", "exp", "origin", "slug", "correct", "spacedDays"]);
  const withArm = await send({ ...goodExp, origin: "challenge", arm: "holdout" }, deps);
  assert.equal(withArm.logged[0].arm, "holdout");

  const drops = [
    { ...goodExp, exp: "EXP-2" }, // not registered
    { ...goodExp, exp: "exp-1" },
    { ...goodExp, exp: 1 },
    { ...goodExp, exp: undefined },
    { ...goodExp, origin: "friend" },
    { ...goodExp, origin: undefined },
    { ...goodExp, arm: "control" },
    { ...goodExp, arm: null },
    { ...goodExp, slug: "not-in-catalog" },
    { ...goodExp, slug: "a".repeat(MAX_SLUG_LENGTH + 1) },
    { ...goodExp, correct: "true" },
    { ...goodExp, spacedDays: 2 },
    { ...goodExp, spacedDays: "3" },
    { ...goodExp, token: "abc" }, // nothing else is accepted
    { ...goodExp, at: "2026-10-16T00:00:00Z" },
    { ...goodExp, sessionId: "s1" },
  ];
  for (const bad of drops) {
    const { status, lines } = await send(bad, deps);
    assert.equal(status, 204);
    assert.equal(lines.length, 0, JSON.stringify(bad));
  }
  const closed = await send(goodExp, { ...deps, now: Date.parse("2026-12-01T00:00:00Z") });
  assert.equal(closed.lines.length, 0, "dropped from the experiment's closing day");
  const badDate = await send(goodExp, { ...deps, experiments: [{ id: "EXP-1", closes: "soon" }] });
  assert.equal(badDate.lines.length, 0, "an invalid closing date accepts nothing");
  const noCatalog = await send(goodExp, { experiments: EXP_REG, now: NOW });
  assert.equal(noCatalog.lines.length, 0, "without a catalog check, exp is refused");
});

test("the catalog is asked only after every other exp field passes", async () => {
  let asked = 0;
  const count = async () => (asked++, true);
  await pickEvent({ ...goodExp, origin: "bad" }, { experiments: EXP_REG, isCatalogSlug: count, now: NOW });
  await pickEvent(goodExp, { isCatalogSlug: count, now: NOW }); // empty list
  await pickEvent({ type: "view", slug: "x" }, { isCatalogSlug: count, now: NOW });
  assert.equal(asked, 0);
});

test("the W-477 guard still refuses cross-origin and spike writes with 403, and logs nothing", async () => {
  const lines = [];
  const r1 = await handleEventPost(post({ type: "view", slug: "x" }, { origin: "https://evil.example" }), { log: (l) => lines.push(l) });
  const r2 = await handleEventPost(post({ type: "view", slug: "x" }, { referer: "https://s3c.example/spike/a" }), { log: (l) => lines.push(l) });
  assert.equal(r1.status, 403);
  assert.equal(r2.status, 403);
  assert.equal(lines.length, 0);
});
