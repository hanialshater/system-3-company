import test from "node:test";
import assert from "node:assert/strict";
import { deps, get, handlerMod, memoryStore, put, FAKE, settingsMod, storeMod } from "./helpers.mjs";
const { handleSettingsGet: GET, handleSettingsPut: PUT } = await handlerMod();
const S = await settingsMod();
const St = await storeMod();

test("account preferences: closed experience vocabulary, nullable challenge, raw cap and wrong types", () => {
  const parsed = S.parseSettingsWrite({ experiences: ["depth", "surprise", "depth", "private free text", 1], challenge: "balanced", userId: "other" }, FAKE);
  assert.deepEqual(parsed, { ok: true, patch: { mode: "set", experiences: ["depth", "surprise"], challenge: "balanced" } });
  for (const body of [{ experiences: "depth" }, { challenge: 2 }, { challenge: "inferred-expert" }]) assert.equal(S.parseSettingsWrite(body, FAKE).ok, false);
  assert.deepEqual(S.parseSettingsWrite({ experiences: Array(201).fill("depth") }, FAKE), { ok: false, error: "too_many" });
  assert.equal(S.parseSettingsWrite({ challenge: null }, FAKE).ok, true);
});

test("PC10: GET returns the current opaque tag; missing/wrong-account PUT has no read/write", async () => {
  const store = memoryStore();
  const response = await GET(get(), deps(store));
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await response.json()).accountTag, "fake-account-tag");
  store.calls.get = 0;
  for (const tag of ["", "other-account-tag"]) {
    const res = await PUT(put({ personalizationOn: true, experiences: ["depth"] }, { headers: { "x-s3c-account": tag } }), deps(store));
    assert.equal(res.status, 409);
    assert.deepEqual(await res.json(), { error: "account_changed" });
  }
  assert.equal(store.calls.get, 0);
  assert.equal(store.calls.put.length, 0);
});

test("off/anonymous gates do not construct or touch settings storage; tag failures do not echo errors", async () => {
  const store = memoryStore();
  for (const operation of [GET, PUT]) {
    const request = operation === GET ? get() : put({ challenge: "balanced" });
    assert.equal((await operation(request, deps(store, { enabled: () => false, userId: () => { throw Error("auth touched"); } }))).status, 404);
    assert.equal((await operation(request, deps(store, { userId: async () => null }))).status, 401);
  }
  const d = deps(store, { accountTag: () => { throw Error("private-secret-sentinel"); } });
  const response = await GET(get(), d);
  assert.equal(response.status, 500);
  assert.ok(!JSON.stringify(d.lines).includes("private-secret"));
  assert.equal(store.calls.get, 0);
  assert.equal(store.calls.put.length, 0);
});

test("stated choices persist for a second client; independent fields never restore a concurrent off; reset clears", async () => {
  const store = memoryStore();
  const saved = { personalizationOn: true, subjects: ["math"], lessOf: [], experiences: ["depth"], challenge: "demanding" };
  assert.equal((await PUT(put(saved), deps(store))).status, 200);
  assert.deepEqual((await (await GET(get(), deps(store))).json()).settings, saved);
  const release = store.hold();
  const delayed = PUT(put({ experiences: ["playfulness"], challenge: "gentle" }), deps(store));
  while (store.calls.put.length < 2) await new Promise(resolve => setImmediate(resolve));
  await PUT(put({ personalizationOn: false }), deps(store));
  release();
  assert.equal((await (await delayed).json()).settings.personalizationOn, false);
  assert.equal(store.rows.get("u-fake-1").challenge, "gentle");
  const reset = { personalizationOn: false, subjects: [], lessOf: [], experiences: [], challenge: null };
  assert.deepEqual((await (await PUT(put(reset), deps(store))).json()).settings, reset);
});

test("two accounts: the server session selects the row, never a supplied body identity", async () => {
  const store = memoryStore();
  await PUT(put({ experiences: ["depth"], userId: "u-other" }), deps(store));
  const other = deps(store, { userId: async () => "u-other", accountTag: () => "tag-other" });
  const b = await GET(get(), other);
  assert.deepEqual((await b.json()).settings.experiences, []);
  assert.equal(store.rows.has("u-other"), false);
  assert.deepEqual((await (await GET(get(), deps(store))).json()).settings.experiences, ["depth"]);
});

test("new fields use independent SQL flags and an existing-account merge cannot transplant them", () => {
  const plan = St.writePlan("fake", { mode: "set", experiences: ["depth"], challenge: "balanced" });
  assert.deepEqual(plan.values, ["fake", null, [], [], ["depth"], "balanced", false, false, false, true, true]);
  assert.match(plan.text, /experiences = CASE WHEN \$10::boolean/);
  assert.match(plan.text, /challenge = CASE WHEN \$11::boolean/);
  const account = { ...S.NO_CHOICE, personalizationOn: false, experiences: ["surprise"], challenge: "gentle" };
  assert.deepEqual(S.applyWrite(account, { mode: "merge", personalizationOn: true, experiences: ["depth"], challenge: "demanding" }), account);
  assert.deepEqual(S.settingsExportBlock({ personalizationOn: null, subjects: [], lessOf: [] }), S.NO_CHOICE, "old v1 choices get explicit empty/null defaults");
});


test("write origin is exact and cannot be replaced by forwarding headers; JSON content type is required", async () => {
  const store = memoryStore();
  for (const options of [
    { origin: "https://evil.example", headers: { "x-forwarded-host": "evil.example" } },
    { origin: "https://evil.example", headers: { host: "evil.example" } },
    { origin: "http://s3c.example" },
    { origin: "https://s3c.example/some-path" },
  ]) assert.equal((await PUT(put({ experiences: ["depth"] }, options), deps(store))).status, 403);
  assert.equal((await PUT(put({ experiences: ["depth"] }, { headers: { "content-type": "text/plain" } }), deps(store))).status, 415);
  assert.equal(store.calls.put.length, 0);
  assert.equal((await PUT(put({ experiences: ["depth"] }, { headers: { "content-type": "application/json; charset=utf-8" } }), deps(store))).status, 200);
});
