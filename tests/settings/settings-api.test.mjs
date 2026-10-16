// Settings API behaviour (W-1538) against the privacy ruling
// company/reviews/_privacy/2026-10-16-personalization-batch-reads.md: B1 (§3 SS1/SS2), D1–D3 (§3.1), G1–G4 (§3.2).
// B2 and B4 have their own files. Fake data and an in-memory store only.
// Run: npm run test:settings
import test from "node:test";
import assert from "node:assert/strict";
import { FAKE, deps, get, handlerMod, memoryStore, put, realCatalog, settingsMod } from "./helpers.mjs";

const { handleSettingsGet, handleSettingsPut } = await handlerMod();
const S = await settingsMod();

const body = async (res) => JSON.parse(await res.text());

// ---- B1: membership, dedupe, caps --------------------------------------------------------------------------

test("B1: a well-shaped id that is not in the catalog is dropped (subjects and every less_of kind)", async () => {
  const store = memoryStore();
  const res = await handleSettingsPut(
    put({
      subjects: ["math", "astrology", "i-am-ashamed-of-x"],
      lessOf: ["domain:cs", "domain:astrology", "concept:binary-search", "concept:not-a-concept", "lesson:fake-lesson", "lesson:not-a-lesson"],
    }),
    deps(store),
  );
  assert.equal(res.status, 200);
  const stored = store.rows.get("u-fake-1");
  assert.deepEqual(stored.subjects, ["math"]);
  assert.deepEqual(stored.lessOf, ["domain:cs", "concept:binary-search", "lesson:fake-lesson"]);
  assert.deepEqual((await body(res)).settings, stored);
});

test("B1: the real catalog drops a well-shaped non-catalog id and keeps real ones", async () => {
  const cat = await realCatalog();
  assert.equal(cat.domains.size, 14, "content/domains.json has 14 domains on 2026-10-16");
  assert.ok(cat.concepts.size > 1000 && cat.lessons.size > 900);
  const lesson = [...cat.lessons][0];
  const concept = [...cat.concepts][0];
  const r = S.parseSettingsWrite(
    { subjects: ["math", "cs", "well-shaped-but-not-a-domain"], lessOf: [`lesson:${lesson}`, `concept:${concept}`, "lesson:well-shaped-not-a-slug-zz9", "concept:well-shaped-not-a-concept-zz9"] },
    cat,
  );
  assert.ok(r.ok);
  assert.deepEqual(r.patch.subjects, ["math", "cs"]);
  assert.deepEqual(r.patch.lessOf, [`lesson:${lesson}`, `concept:${concept}`]);
  assert.equal(S.subjectsCap(cat), 14, "app cap is the live domain count");
});

test("B1: duplicates are removed, first occurrence and order kept; untyped, unknown-kind and non-string entries dropped", () => {
  const r = S.parseSettingsWrite(
    { subjects: ["cs", "math", "cs", "math", 7, null, "MATH"], lessOf: ["overfitting", "topic:overfitting", "lesson:overfitting", "concept:overfitting", "lesson:overfitting", {}, "concept:my ex"] },
    FAKE,
  );
  assert.ok(r.ok);
  assert.deepEqual(r.patch.subjects, ["cs", "math"]);
  assert.deepEqual(r.patch.lessOf, ["lesson:overfitting", "concept:overfitting"], "typed kinds keep the slug/concept overlap apart");
});

test("B1/SS2: caps. subjects cannot exceed the domain count; more than 50 lessOf is refused, not truncated", () => {
  const lessons = new Set(Array.from({ length: 60 }, (_, i) => `l${i}`));
  const cat = { ...FAKE, lessons };
  const fifty = Array.from({ length: 50 }, (_, i) => `lesson:l${i}`);
  const ok = S.parseSettingsWrite({ lessOf: fifty }, cat);
  assert.ok(ok.ok);
  assert.equal(ok.patch.lessOf.length, 50);
  assert.deepEqual(S.parseSettingsWrite({ lessOf: [...fifty, "lesson:l50"] }, cat), { ok: false, error: "too_many" });
  // 50 real + 10 unknown + duplicates is fine: the cap applies after dropping.
  assert.ok(S.parseSettingsWrite({ lessOf: [...fifty, ...fifty, "lesson:zz1", "lesson:zz2"] }, cat).ok);
  assert.deepEqual(S.parseSettingsWrite({ lessOf: Array(201).fill("lesson:l1") }, cat), { ok: false, error: "too_many" });
  // subjects: dedupe and membership make the domain count the ceiling.
  const r = S.parseSettingsWrite({ subjects: ["math", "cs", "history", "math", "cs", "history"] }, FAKE);
  assert.ok(r.ok && r.patch.subjects.length === 3 && S.subjectsCap(FAKE) === 3);
  assert.equal(S.DB_MAX_SUBJECTS, 32);
  assert.equal(S.MAX_LESS_OF, 50);
});

test("B1: wrong types are malformed and the response never echoes the input", async () => {
  for (const b of [[], "x", { personalizationOn: "yes" }, { subjects: "math" }, { lessOf: { a: 1 } }, { mode: "union" }]) {
    const res = await handleSettingsPut(put(b), deps(memoryStore()));
    assert.equal(res.status, 400);
    assert.deepEqual(await body(res), { error: "malformed" });
  }
  const res = await handleSettingsPut(put("{not json"), deps(memoryStore()));
  assert.equal(res.status, 400);
  const big = await handleSettingsPut(put({ lessOf: ["lesson:" + "a".repeat(20_000)] }), deps(memoryStore()));
  assert.equal(big.status, 413);
});

test("read path: ids that left the catalog are ignored, not rewritten in the background (SS3)", async () => {
  const store = memoryStore();
  store.rows.set("u-fake-1", { personalizationOn: true, subjects: ["math", "retired-domain"], lessOf: ["lesson:gone", "lesson:fake-lesson"] });
  const res = await handleSettingsGet(get(), deps(store));
  assert.deepEqual((await body(res)).settings, { personalizationOn: true, subjects: ["math"], lessOf: ["lesson:fake-lesson"] });
  assert.equal(store.calls.put.length, 0, "a GET never writes");
  assert.deepEqual(store.rows.get("u-fake-1").subjects, ["math", "retired-domain"]);
});

// ---- D1–D3 -----------------------------------------------------------------------------------------------

test("D1: no row and NULL both read as no choice; a no-choice write on an account with no row creates no row", async () => {
  const store = memoryStore();
  const res = await handleSettingsGet(get(), deps(store));
  assert.equal(res.status, 200);
  assert.deepEqual((await body(res)).settings, { personalizationOn: null, subjects: [], lessOf: [] });
  assert.equal(res.headers.get("cache-control"), "no-store");
  const w = await handleSettingsPut(put({ personalizationOn: null, subjects: [], lessOf: ["lesson:not-real"] }), deps(store));
  assert.equal(w.status, 200);
  assert.equal(store.calls.put.length, 0);
  assert.equal(store.rows.size, 0);
  store.rows.set("u-fake-1", { personalizationOn: null, subjects: [], lessOf: [] });
  assert.deepEqual(S.servingSettings(S.cleanStored(null, FAKE)), S.servingSettings(S.cleanStored(store.rows.get("u-fake-1"), FAKE)));
  assert.equal(S.servingSettings(S.cleanStored(null, FAKE)).mode, "no-choice");
});

test("D2: an explicit false wins over subjects and lessOf, and the next read sees it (no cache)", async () => {
  const store = memoryStore();
  const d = deps(store);
  await handleSettingsPut(put({ personalizationOn: true, subjects: ["math"], lessOf: ["domain:cs"] }), d);
  assert.equal((await body(await handleSettingsGet(get(), d))).settings.personalizationOn, true);
  const off = await handleSettingsPut(put({ personalizationOn: false }), d);
  assert.equal(off.status, 200);
  const after = (await body(await handleSettingsGet(get(), d))).settings;
  assert.deepEqual(after, { personalizationOn: false, subjects: ["math"], lessOf: ["domain:cs"] }, "lists kept, off stored");
  assert.deepEqual(S.servingSettings(after), { mode: "off" }, "off carries no filters to the serving code");
  // No cache: a change made directly in the store is what the very next request sees.
  store.rows.set("u-fake-1", { personalizationOn: true, subjects: [], lessOf: [] });
  assert.equal((await body(await handleSettingsGet(get(), d))).settings.personalizationOn, true);
  const reads = store.calls.get;
  await handleSettingsGet(get(), d);
  await handleSettingsGet(get(), d);
  assert.equal(store.calls.get, reads + 2, "every GET reads the store");
});

test("D3: an arm, a timestamp or a score in the body is dropped unread; the store only ever receives the three choices", async () => {
  const store = memoryStore();
  const res = await handleSettingsPut(
    put({ personalizationOn: null, subjects: ["cs"], arm: "test", exp: "EXP-1", updatedAt: 1, needScore: 0.9, fingerprint: { a: 1 }, ageBand: "13-15" }),
    deps(store),
  );
  assert.equal(res.status, 200);
  assert.equal(store.calls.put.length, 1);
  assert.deepEqual(store.calls.put[0].keys, ["lessOf", "personalizationOn", "subjects"]);
  assert.deepEqual(Object.keys((await body(res)).settings).sort(), ["lessOf", "personalizationOn", "subjects"]);
  assert.deepEqual(S.WRITABLE_KEYS, ["personalizationOn", "subjects", "lessOf"]);
});

test("set mode: keys not sent keep their stored values; an unchanged row is not rewritten", async () => {
  const store = memoryStore();
  const d = deps(store);
  await handleSettingsPut(put({ subjects: ["math", "cs"], lessOf: ["lesson:fake-lesson"] }), d);
  await handleSettingsPut(put({ subjects: ["history"] }), d);
  assert.deepEqual(store.rows.get("u-fake-1"), { personalizationOn: null, subjects: ["history"], lessOf: ["lesson:fake-lesson"] });
  const n = store.calls.put.length;
  await handleSettingsPut(put({ subjects: ["history"] }), d);
  assert.equal(store.calls.put.length, n);
  await handleSettingsPut(put({ lessOf: [] }), d);
  assert.deepEqual(store.rows.get("u-fake-1").lessOf, [], "clearing empties the list at once");
});

// ---- G1–G4: merge on "Keep my history" ----------------------------------------------------------------------

test("G2: a merge into an account with no row writes the device's choices through the same validation", async () => {
  const store = memoryStore();
  const res = await handleSettingsPut(
    put({ mode: "merge", personalizationOn: true, subjects: ["cs", "cs", "astrology"], lessOf: ["lesson:fake-lesson", "lesson:nope"], arm: "test" }),
    deps(store),
  );
  assert.equal(res.status, 200);
  assert.deepEqual(store.rows.get("u-fake-1"), { personalizationOn: true, subjects: ["cs"], lessOf: ["lesson:fake-lesson"] });
});

test("G3: the account row wins for the lists, no union, and the device takes it", async () => {
  const store = memoryStore();
  store.rows.set("u-fake-1", { personalizationOn: true, subjects: ["math"], lessOf: [] });
  const res = await handleSettingsPut(put({ mode: "merge", personalizationOn: true, subjects: ["cs"], lessOf: ["domain:history"] }), deps(store));
  const out = (await body(res)).settings;
  assert.deepEqual(out, { personalizationOn: true, subjects: ["math"], lessOf: [] }, "a teen's lessOf on a shared device does not leak in");
  assert.deepEqual(store.rows.get("u-fake-1"), out);
});

test("G3: an explicit off on either side is never turned on by a merge", async () => {
  const cases = [
    { account: { personalizationOn: true, subjects: [], lessOf: [] }, device: false, want: false },
    { account: { personalizationOn: false, subjects: [], lessOf: [] }, device: true, want: false },
    { account: { personalizationOn: null, subjects: [], lessOf: [] }, device: false, want: false },
    { account: null, device: false, want: false },
    { account: { personalizationOn: false, subjects: [], lessOf: [] }, device: null, want: false },
    { account: { personalizationOn: null, subjects: [], lessOf: [] }, device: true, want: null },
  ];
  for (const c of cases) {
    const store = memoryStore();
    if (c.account) store.rows.set("u-fake-1", c.account);
    const res = await handleSettingsPut(put({ mode: "merge", personalizationOn: c.device }), deps(store));
    assert.equal((await body(res)).settings.personalizationOn, c.want, JSON.stringify(c));
  }
});

test("G1/G4: merge is a PUT the client sends after the learner's confirm; GET and errors never merge", async () => {
  const store = memoryStore();
  await handleSettingsGet(get(), deps(store));
  assert.equal(store.calls.put.length, 0);
  const bad = await handleSettingsPut(put({ mode: "merge", lessOf: "domain:cs" }), deps(store));
  assert.equal(bad.status, 400);
  assert.equal(store.calls.put.length, 0);
});

// ---- Access ------------------------------------------------------------------------------------------------

test("access: 404 when accounts are off, 401 signed out, 403 for a missing or cross-site Origin on PUT", async () => {
  const store = memoryStore();
  assert.equal((await handleSettingsGet(get(), deps(store, { enabled: () => false }))).status, 404);
  assert.equal((await handleSettingsPut(put({}), deps(store, { enabled: () => false }))).status, 404);
  assert.equal((await handleSettingsGet(get(), deps(store, { userId: async () => null }))).status, 401);
  assert.equal((await handleSettingsPut(put({ subjects: ["cs"] }), deps(store, { userId: async () => null }))).status, 401);
  assert.equal((await handleSettingsPut(put({ subjects: ["cs"] }, { origin: null }), deps(store))).status, 403);
  assert.equal((await handleSettingsPut(put({ subjects: ["cs"] }, { origin: "https://evil.example" }), deps(store))).status, 403);
  assert.equal((await handleSettingsPut(put({ subjects: ["cs"] }, { origin: "null" }), deps(store))).status, 403);
  assert.equal(
    (await handleSettingsPut(put({ subjects: ["cs"] }, { headers: { "sec-fetch-site": "cross-site" } }), deps(store))).status,
    403,
  );
  assert.equal(store.calls.put.length, 0);
  assert.equal((await handleSettingsPut(put({ subjects: ["cs"] }), deps(store))).status, 200);
});

test("the pg store sends exactly the four columns, parameterised, and maps NULL to no choice", async () => {
  const { pgSettingsStore, UPSERT_SQL, SELECT_SQL } = await import("./helpers.mjs").then((h) => h.storeMod());
  const seen = [];
  const q = async (text, values) => {
    seen.push({ text, values });
    return { rows: text === SELECT_SQL ? [{ personalization_on: null, subjects: ["math"], less_of: [] }] : [] };
  };
  const st = pgSettingsStore(q);
  assert.deepEqual(await st.get("u-fake-1"), { personalizationOn: null, subjects: ["math"], lessOf: [] });
  await st.put("u-fake-1", { personalizationOn: false, subjects: ["cs"], lessOf: ["domain:math"] });
  assert.equal(seen[1].text, UPSERT_SQL);
  assert.deepEqual(seen[1].values, ["u-fake-1", false, ["cs"], ["domain:math"]]);
  assert.match(UPSERT_SQL, /\(user_id, personalization_on, subjects, less_of\) VALUES \(\$1, \$2, \$3, \$4\)/);
  assert.doesNotMatch(UPSERT_SQL + SELECT_SQL, /created_at|updated_at|arm|score|age_band/);
  const none = pgSettingsStore(async () => ({ rows: [] }));
  assert.equal(await none.get("u-fake-2"), null);
});

test("B3 export block: the stored row as is, D1 block when there is none, three keys only", () => {
  assert.deepEqual(S.settingsExportBlock(null), { personalizationOn: null, subjects: [], lessOf: [] });
  const row = { personalizationOn: false, subjects: ["math", "retired-domain"], lessOf: ["lesson:gone"] };
  const block = S.settingsExportBlock(row);
  assert.deepEqual(block, row, "an export is the learner's copy of the row, stale ids included");
  assert.notEqual(block.subjects, row.subjects);
  assert.deepEqual(Object.keys(block), ["personalizationOn", "subjects", "lessOf"]);
});
