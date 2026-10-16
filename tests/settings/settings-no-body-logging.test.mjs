// B4 (company/reviews/_privacy/2026-10-16-personalization-batch-reads.md §3, SS5 row): "the settings route and any
// error handler must not log request bodies (inventory gap 11: D6 logs whole bodies; do not let that pattern reach
// this route)". W-1538.
//
// Runtime: every console method and process.stdout/stderr are stubbed; requests carry a sentinel in the body, the
// store and the session helper throw errors whose message and pg-style `detail` carry the sentinel. Nothing printed,
// logged or returned may contain it, and the handler must never reject (a thrown error would reach Next's default
// handler, which prints it). Static: no console call in the route or library files except the handler's one fixed line.
// Control: the capture is shown to record.
// Run: npm run test:settings
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { REPO, deps, get, handlerMod, memoryStore, put } from "./helpers.mjs";

const { handleSettingsGet, handleSettingsPut } = await handlerMod();
const SENTINEL = "zz-sentinel-9f3a";

function capture() {
  const out = [];
  const saved = {};
  for (const m of ["log", "info", "warn", "error", "debug", "trace", "dir", "table"]) {
    saved[m] = console[m];
    console[m] = (...a) => out.push(a.map((x) => (typeof x === "string" ? x : JSON.stringify(x, Object.getOwnPropertyNames(x ?? {})))).join(" "));
  }
  const so = process.stdout.write;
  const se = process.stderr.write;
  process.stdout.write = (c, ...r) => (out.push(String(c)), typeof r.at(-1) === "function" && r.at(-1)(), true);
  process.stderr.write = (c, ...r) => (out.push(String(c)), typeof r.at(-1) === "function" && r.at(-1)(), true);
  return {
    out,
    restore() {
      Object.assign(console, saved);
      process.stdout.write = so;
      process.stderr.write = se;
    },
  };
}

function pgError() {
  const e = new Error(`new row for relation "settings" violates check constraint: ${SENTINEL}`);
  e.code = "23514";
  e.detail = `Failing row contains (u-fake-1, t, {${SENTINEL}}, {}).`;
  return e;
}

test("B4: no body, value or error text reaches any log, stdout, stderr or response, on any path", async () => {
  const cases = [
    ["valid PUT", () => handleSettingsPut(put({ subjects: ["math"], lessOf: [`lesson:${SENTINEL}`], note: SENTINEL }), withDefaultLog(memoryStore()))],
    ["malformed JSON", () => handleSettingsPut(put(`{"subjects": ["${SENTINEL}"`), withDefaultLog(memoryStore()))],
    ["wrong type", () => handleSettingsPut(put({ personalizationOn: SENTINEL }), withDefaultLog(memoryStore()))],
    ["too many", () => handleSettingsPut(put({ lessOf: Array(201).fill(SENTINEL) }), withDefaultLog(memoryStore()))],
    ["too large", () => handleSettingsPut(put({ lessOf: [SENTINEL.repeat(2000)] }), withDefaultLog(memoryStore()))],
    ["cross-site", () => handleSettingsPut(put({ subjects: [SENTINEL] }, { origin: "https://evil.example" }), withDefaultLog(memoryStore()))],
    ["store throws on PUT", () => handleSettingsPut(put({ subjects: ["math"], x: SENTINEL }), withDefaultLog(memoryStore({ failWith: pgError() })))],
    ["store throws on GET", () => handleSettingsGet(get(), withDefaultLog(memoryStore({ failWith: pgError() })))],
    ["session throws", () => handleSettingsPut(put({ subjects: [SENTINEL] }), withDefaultLog(memoryStore(), { userId: async () => { throw pgError(); } }))],
    ["catalog throws", () => handleSettingsPut(put({ subjects: [SENTINEL] }), withDefaultLog(memoryStore(), { catalog: () => { throw pgError(); } }))],
    ["logger throws", () => handleSettingsGet(get(), { ...deps(memoryStore({ failWith: pgError() })), log: () => { throw pgError(); } })],
  ];
  for (const [name, run] of cases) {
    const cap = capture();
    let res;
    try {
      res = await run();
    } catch (err) {
      cap.restore();
      assert.fail(`${name}: handler rejected (${err?.name}); a thrown error would be printed by Next`);
    }
    cap.restore();
    assert.ok(res instanceof Response, name);
    const text = await res.text();
    assert.ok(!text.includes(SENTINEL), `${name}: response echoes input`);
    for (const line of cap.out) assert.ok(!line.includes(SENTINEL), `${name}: logged ${line}`);
    for (const line of cap.out) assert.match(line, /^settings (get|put): (auth|store|catalog) failed( sqlstate=[0-9A-Z]{5})?$/, `${name}: unexpected line`);
  }
});

function withDefaultLog(store, over = {}) {
  const d = deps(store, over);
  delete d.log; // exercise the default (console.error) path
  return d;
}

test("B4 control: the capture records console and stderr, and a store error does produce the fixed line", async () => {
  const cap = capture();
  console.log(SENTINEL);
  process.stderr.write(SENTINEL);
  const res = await handleSettingsGet(get(), withDefaultLog(memoryStore({ failWith: pgError() })));
  cap.restore();
  assert.equal(res.status, 500);
  assert.equal(cap.out.filter((l) => l.includes(SENTINEL)).length, 2);
  assert.ok(cap.out.includes("settings get: store failed sqlstate=23514"));
});

test("B4 static: no console, logger or body echo in the route and library files beyond the one fixed line", () => {
  const files = [
    "src/app/api/settings/route.ts",
    "src/lib/server/personalization/settings.ts",
    "src/lib/server/personalization/settings-store.ts",
    "src/lib/server/personalization/settings-handler.ts",
    "src/lib/server/personalization/settings-wiring.ts",
  ];
  for (const f of files) {
    const src = fs.readFileSync(path.join(REPO, f), "utf8");
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const consoles = code.match(/console\.\w+/g) ?? [];
    if (f.endsWith("settings-handler.ts")) assert.deepEqual(consoles, ["console.error"], f);
    else assert.deepEqual(consoles, [], f);
    assert.doesNotMatch(code, /process\.(stdout|stderr)|\.message\b|\.detail\b|\.stack\b/, `${f} reads error text or writes to a stream`);
    for (const line of code.split("\n").filter((l) => /\bdeps\.log\b|\blog\s*\(/.test(l))) {
      assert.doesNotMatch(line, /\b(text|body|req|userId|err|row|patch|next)\b/, `${f} passes request or row data to a logger: ${line.trim()}`);
    }
  }
  const handler = fs.readFileSync(path.join(REPO, "src/lib/server/personalization/settings-handler.ts"), "utf8");
  assert.match(handler, /\(deps\.log \?\? console\.error\)\(`settings \$\{op\}: \$\{stage\} failed\$\{sqlstate\}`\)/);
});
