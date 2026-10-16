// D2a (company/reviews/_privacy/2026-10-16-w1538-settings-api.md) and C7 (company/engineering/reviews/
// 2026-10-16-w1538-settings-api.md): an explicit personalizationOn:false must survive a PUT that overlaps it, whether
// that PUT is a subjects-only "set" or a "merge" from a device that still shows "on". W-1538.
//
// What this file proves, and what it does not:
// - The handler no longer reads the row before writing it: a PUT is one store.put call with the request's keys only.
// - Against the in-memory store (tests/settings/helpers.mjs), which models the store's contract (the write rule is
//   applied to the row as it is when the write lands, in one step), an interleaved PUT cannot undo a false.
// - The write rule (applyWrite) agrees with the old sequential behaviour on every non-racing case it replaced.
// - A control replays the old read-modify-write with the same interleaving and shows it loses the false, so the
//   interleaving here would catch the defect.
// It does NOT run Postgres. That the three SQL statements in settings-store.ts implement applyWrite atomically is
// checked separately on a throwaway local cluster with fake rows: company/personalization/data/test-settings-write-sql.mjs.
// Run: npm run test:settings
import test from "node:test";
import assert from "node:assert/strict";
import { deps, handlerMod, memoryStore, put, settingsMod } from "./helpers.mjs";

const { handleSettingsPut } = await handlerMod();
const S = await settingsMod();
const body = async (res) => JSON.parse(await res.text());
const U = "u-fake-1";

/** Start PUT B with its store write held, let PUT A finish, then release B. Returns both responses. */
async function interleave(store, first, second) {
  const release = store.hold();
  const late = handleSettingsPut(put(first), deps(store)); // B: built while the learner's screen still showed "on"
  for (let i = 0; i < 100 && store.calls.put.length === 0; i++) await new Promise((r) => setImmediate(r));
  assert.equal(store.calls.put.length, 1, "B has reached the store and is held there");
  const early = await handleSettingsPut(put(second), deps(store)); // A: the learner turns personalization off
  release();
  return { late: await late, early };
}

test("D2a: a subjects-only PUT that started before an off and lands after it does not undo the off", async () => {
  const store = memoryStore();
  store.rows.set(U, { personalizationOn: true, subjects: ["math"], lessOf: ["domain:cs"] });
  const { late, early } = await interleave(store, { subjects: ["history"] }, { personalizationOn: false });
  assert.equal(early.status, 200);
  assert.equal(late.status, 200);
  assert.deepEqual(store.rows.get(U), { personalizationOn: false, subjects: ["history"], lessOf: ["domain:cs"] });
  assert.equal((await body(late)).settings.personalizationOn, false, "B's answer shows the off, so the device takes it");
});

test("D2a: a merge (device on) that lands after an off does not undo it (G3 inside the one write)", async () => {
  const store = memoryStore();
  store.rows.set(U, { personalizationOn: true, subjects: ["math"], lessOf: [] });
  await interleave(store, { mode: "merge", personalizationOn: true, subjects: ["cs"] }, { personalizationOn: false });
  assert.deepEqual(store.rows.get(U), { personalizationOn: false, subjects: ["math"], lessOf: [] });
});

test("D2a: the other order too, and a merge racing the first-ever off on an account with no row", async () => {
  const a = memoryStore();
  a.rows.set(U, { personalizationOn: true, subjects: [], lessOf: [] });
  await interleave(a, { personalizationOn: false }, { subjects: ["cs"] }); // the off is the one held
  assert.deepEqual(a.rows.get(U), { personalizationOn: false, subjects: ["cs"], lessOf: [] });

  const b = memoryStore();
  await interleave(b, { mode: "merge", personalizationOn: true, subjects: ["cs"] }, { personalizationOn: false });
  assert.equal(b.rows.get(U).personalizationOn, false, "the off created the row; the late merge keeps it off");
  assert.deepEqual(b.rows.get(U).subjects, [], "and the account (the off's row) wins the lists");
});

test("D2a: the handler writes without reading first; the store receives only the keys the request carried", async () => {
  const store = memoryStore();
  store.rows.set(U, { personalizationOn: true, subjects: ["math"], lessOf: [] });
  await handleSettingsPut(put({ subjects: ["cs"] }), deps(store));
  assert.equal(store.calls.get, 0, "no read before the write");
  assert.deepEqual(store.calls.put[0].patch, { mode: "set", subjects: ["cs"] }, "personalizationOn is not sent to the store");
});

test("control: the old read-modify-write, with the same interleaving, loses the false", async () => {
  const store = memoryStore();
  store.rows.set(U, { personalizationOn: true, subjects: ["math"], lessOf: [] });
  // B reads, as the old handler did, then computes the whole row from that read.
  const stale = await store.get(U);
  const fullRow = { mode: "set", ...S.applyWrite(stale, { mode: "set", subjects: ["history"] }) };
  // A turns personalization off in between.
  await store.put(U, { mode: "set", personalizationOn: false });
  assert.equal(store.rows.get(U).personalizationOn, false);
  // B writes every column back.
  await store.put(U, fullRow);
  assert.equal(store.rows.get(U).personalizationOn, true, "the defect D2a describes: the off is silently reversed");
});

test("applyWrite agrees with the sequential rules it replaced (set keeps unsent keys; merge per G3; D1)", () => {
  const on = { personalizationOn: true, subjects: ["math"], lessOf: ["domain:cs"] };
  assert.deepEqual(S.applyWrite(on, { mode: "set", subjects: ["cs"] }), { ...on, subjects: ["cs"] });
  assert.deepEqual(S.applyWrite(on, { mode: "set", personalizationOn: null }), { ...on, personalizationOn: null });
  assert.deepEqual(S.applyWrite(on, { mode: "set" }), on);
  assert.equal(S.applyWrite(null, { mode: "set", subjects: [] }), null, "D1: no row for no choice");
  assert.equal(S.applyWrite(null, { mode: "merge", personalizationOn: null }), null);
  assert.deepEqual(S.applyWrite(null, { mode: "set", lessOf: ["domain:cs"] }), { personalizationOn: null, subjects: [], lessOf: ["domain:cs"] });
  const states = [true, false, null];
  for (const acc of [...states, "none"]) {
    for (const dev of [...states, undefined]) {
      const row = acc === "none" ? null : { personalizationOn: acc, subjects: ["math"], lessOf: [] };
      const patch = { mode: "merge", subjects: ["cs"] };
      if (dev !== undefined) patch.personalizationOn = dev;
      const out = S.applyWrite(row, patch);
      const want = acc === false || dev === false ? false : acc === "none" ? (dev ?? null) : acc;
      assert.equal(out.personalizationOn, want, `merge account=${acc} device=${dev}`);
      assert.deepEqual(out.subjects, row ? ["math"] : ["cs"], "account lists win; no row takes the device's");
    }
  }
});
