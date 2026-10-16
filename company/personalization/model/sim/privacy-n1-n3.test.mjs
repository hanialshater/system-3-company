// Privacy ruling N1 and N3 tests against the shipped composer (W-1526; ruling §3, §8 item 2).
//   node --test company/personalization/model/sim/privacy-n1-n3.test.mjs
// Ruling: company/reviews/_privacy/2026-10-16-personalization-model-inputs.md (PRIVACY_RULING in ../model.ts).
// owner: learner-model-engineer (Ifeoma) · offline only · no dependencies (node:test), Node 22.18 or later.
//
// The pipeline under test is the one simulate.mjs runs per card (compose-one-recompute):
//   fingerprintFrom(history) -> detect / explainNeeds -> composeExplained / gamCompose -> serve the pick -> repeat.
// Inputs are synthetic histories over the real pilot catalog (catalog.mjs). No learner data, no persona latent.
//
// N1 (computed, not stored): with storage, network, files, child processes and logs stubbed, composing makes
//   zero writes and zero fetches, and does not mutate its (frozen) input.
// N3 (forbidden-input invariance): two histories equal in every permitted input and different in every
//   FORBIDDEN_INPUTS entry (ageBand included) give the same order, the same reasons and the same scores;
//   and no forbidden key is ever read by name. Two controls keep it honest: the composer does move cards on
//   these histories, and flipping one permitted input does change the order.
//
// Not here, on purpose: the P1 recall-only fallback and the P2 null-prediction tests (../self-check.mjs, W-1514).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";
import dgram from "node:dgram";
import childProcess from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import * as M from "../model.ts";
import { composeExplained, gamCompose } from "./composer.ts";
import { loadCatalog } from "./catalog.mjs";

const cat = loadCatalog();
const NOW = Date.UTC(2026, 9, 16, 9);
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const byDomain = (d) => cat.defaultOrder.filter((s) => cat.dims[s].domain === d);
const hash = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };

/** A synthetic history: slugs completed an hour apart ending a day before NOW; outcome pattern per item. */
function history(slugs, outcome) {
  return slugs.map((slug, i) => {
    const o = outcome(slug, i);
    const at = NOW - DAY - (slugs.length - i) * HOUR;
    return { slug, completedAt: at, ...(o.pred === undefined ? {} : { predictedCorrectly: o.pred }),
      recalls: o.recall === undefined ? [] : [{ at: at + DAY, correct: o.recall }] };
  });
}

// Permitted-input cases. Each one is a learner the composer should treat differently (needs, filters, switch).
const CASES = [
  { id: "cold-start", hist: [], settings: {} },
  { id: "missing-probability", hist: history(byDomain("probability").slice(0, 9), (s, i) => ({ pred: i % 3 !== 0 ? false : true, recall: i % 2 ? false : undefined })), settings: {} },
  { id: "succeeding-mixed", hist: history(cat.defaultOrder.slice(0, 14), () => ({ pred: true, recall: true })), settings: {} },
  { id: "concentrated-cs", hist: history(byDomain("cs").slice(0, 12), (s) => ({ pred: hash(s) % 2 === 0, recall: hash(s) % 3 === 0 })), settings: {} },
  { id: "null-predictions", hist: history(cat.defaultOrder.slice(0, 10), (s, i) => ({ pred: i % 2 ? null : undefined, recall: i % 4 === 0 })), settings: {} },
  { id: "stated-subjects", hist: history(cat.defaultOrder.slice(0, 10), (s, i) => ({ pred: i % 2 === 0, recall: false })), settings: { statedSubjects: ["probability"] } },
  { id: "less-of-this", hist: history(cat.defaultOrder.slice(0, 10), (s, i) => ({ pred: i % 2 === 1 })), settings: { lessOfThis: ["cs"] } },
  { id: "switched-off", hist: history(byDomain("probability").slice(0, 9), () => ({ pred: false, recall: false })), settings: {}, off: true },
];
const STEPS = 10; // cards composed per case, recomputing after each (the served mode, COMPOSER.servingMode)

/**
 * Compose STEPS cards for one case. `extra(level)` returns the forbidden fields to attach at each level a
 * careless serving build might attach them to (history items, the fingerprint, fingerprintFrom's opts, the
 * ComposeInput); `wrap` lets a test observe or freeze the objects. Returns every pick and slot trace.
 */
function runCase(c, { extra = () => ({}), wrap = (o) => o, flipLastPrediction = false } = {}) {
  const hist = c.hist.map((h, i) => wrap({ ...h, recalls: h.recalls.map((r) => ({ ...r })),
    ...(flipLastPrediction && i === c.hist.length - 1 ? { predictedCorrectly: !(h.predictedCorrectly === true) } : {}), ...extra("history") }));
  const out = [];
  let t = NOW;
  for (let step = 0; step < STEPS; step++) {
    const opts = wrap({ predictedCorrectly: true, ...c.settings, ...extra("opts") });
    const fingerprint = wrap({ ...M.fingerprintFrom(hist, cat.dims, t, opts), ...extra("fingerprint") });
    const needs = M.detect(fingerprint);
    const explained = M.explainNeeds(fingerprint);
    const input = wrap({ fingerprint, needs, remaining: { ...needs }, pool: cat.lessons, defaultOrder: cat.defaultOrder,
      queued: [], history: hist.slice(), dueRevisits: [], personalisationOn: !c.off, ...extra("input") });
    const comp = composeExplained(input, M.COMPOSER, { pilotConcepts: cat.pilotConcepts });
    // The ComposeFn contract (no pilot set: out-of-pilot prerequisites count) is checked alongside the sim's call.
    const contractPicks = gamCompose(input, M.COMPOSER);
    const pick = comp.picks.find((p) => p.reason !== "due-revisit");
    if (!pick) break;
    out.push({ pick, slots: comp.slots, contractPicks, needs, explained });
    t += 10 * 60_000;
    // The simulated outcome of the served card depends on the slug only (no learner model here).
    hist.push(wrap({ slug: pick.slug, completedAt: t, predictedCorrectly: hash(pick.slug) % 2 === 0, recalls: [], ...extra("history") }));
  }
  return out;
}
const order = (run) => run.map((r) => r.pick.slug);

// ----------------------------------------------------------------------------------------------------
// N3: forbidden-input invariance.
// ----------------------------------------------------------------------------------------------------

// Two values per forbidden input, chosen to differ as much as the field allows. Keys must equal FORBIDDEN_INPUTS.
const FORBIDDEN_VALUES = {
  dwell: [0, 180_000],
  swipes: [0, 57],
  scroll: [0, 1],
  sessionLength: [30_000, 5_400_000],
  sessionCount: [1, 412],
  shares: [0, 9],
  device: ["phone", "desktop"],
  locationFinerThanCountry: ["GB-postcode-N1", "GB-postcode-SW1"],
  ageBand: ["13-15", "18+"],
  ads: ["none", "campaign-summer"],
  personaLabel: ["struggling-repeater", "returning-expert"],
};
const forbiddenSet = (k) => Object.fromEntries(Object.entries(FORBIDDEN_VALUES).map(([f, v]) => [f, v[k]]));

test("N3 covers every FORBIDDEN_INPUTS entry, ageBand included", () => {
  assert.deepEqual(Object.keys(FORBIDDEN_VALUES).sort(), [...M.FORBIDDEN_INPUTS].sort(),
    "FORBIDDEN_VALUES must list exactly FORBIDDEN_INPUTS (update this test when the list changes)");
  assert.ok(M.FORBIDDEN_INPUTS.includes("ageBand"));
});

test("N3: histories equal in permitted inputs and different in every forbidden input give the same order", (t) => {
  const reads = [];
  // Record any read of a forbidden key by name on any object that carries one.
  const watch = (o) => new Proxy(o, { get(target, key, recv) {
    if (typeof key === "string" && key in FORBIDDEN_VALUES) reads.push(key);
    return Reflect.get(target, key, recv);
  } });
  let movedAny = 0;
  for (const c of CASES) {
    const a = runCase(c, { extra: () => forbiddenSet(0), wrap: watch });
    const b = runCase(c, { extra: () => forbiddenSet(1), wrap: watch });
    assert.equal(a.length, STEPS, `${c.id}: composed fewer than ${STEPS} cards`);
    assert.deepEqual(order(b), order(a), `${c.id}: order depends on a forbidden input`);
    // Stricter than order: reasons, every term, scores, slot traces and need scores are identical too.
    assert.deepEqual(JSON.parse(JSON.stringify(b)), JSON.parse(JSON.stringify(a)), `${c.id}: composition depends on a forbidden input`);
    movedAny += a.filter((r) => r.pick.moved).length;
  }
  assert.deepEqual([...new Set(reads)], [], `composer pipeline read forbidden inputs by name: ${[...new Set(reads)].join(", ")}`);
  // Control 1: the cases are not vacuous; the composer personalises on them.
  assert.ok(movedAny > 0, "control: no case moved a card, so invariance would be vacuous");
  t.diagnostic(`${CASES.length} cases x ${STEPS} cards, ${movedAny} moved cards; ${M.FORBIDDEN_INPUTS.length} forbidden inputs varied at 4 levels; 0 forbidden reads`);
});

test("N3 control: a change in one permitted input does change the order (the comparison can see a difference)", (t) => {
  const changed = CASES.filter((c) => c.hist.length && !c.off)
    .filter((c) => JSON.stringify(order(runCase(c))) !== JSON.stringify(order(runCase(c, { flipLastPrediction: true }))));
  assert.ok(changed.length > 0, "control: flipping a permitted input changed nothing; the N3 comparison may be blind");
  t.diagnostic(`flipping the latest predictedCorrectly changed the order in: ${changed.map((c) => c.id).join(", ")}`);
});

// ----------------------------------------------------------------------------------------------------
// N1: computed, not stored (zero writes, zero fetches).
// ----------------------------------------------------------------------------------------------------

/** Install recording stubs over every write and network path a JS runtime offers; returns uninstall(). */
function stubIO(log) {
  const restore = [];
  const rec = (kind, what) => (...args) => { log.push(`${kind}: ${what}${args.length && typeof args[0] === "string" ? ` ${args[0].slice(0, 60)}` : ""}`); };
  const setProp = (obj, key, value) => {
    const had = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(obj, key, { value, configurable: true, writable: true, enumerable: true });
    restore.push(() => { if (had) Object.defineProperty(obj, key, had); else delete obj[key]; });
  };
  const storage = (name) => ({
    getItem: rec("storage-read", `${name}.getItem`), key: rec("storage-read", `${name}.key`), get length() { log.push(`storage-read: ${name}.length`); return 0; },
    setItem: rec("write", `${name}.setItem`), removeItem: rec("write", `${name}.removeItem`), clear: rec("write", `${name}.clear`),
  });
  // Browser-side globals (the composer will run in the browser in phase B).
  setProp(globalThis, "fetch", rec("fetch", "fetch"));
  setProp(globalThis, "localStorage", storage("localStorage"));
  setProp(globalThis, "sessionStorage", storage("sessionStorage"));
  setProp(globalThis, "indexedDB", { open: rec("write", "indexedDB.open"), deleteDatabase: rec("write", "indexedDB.deleteDatabase") });
  setProp(globalThis, "caches", { open: rec("write", "caches.open"), delete: rec("write", "caches.delete") });
  setProp(globalThis, "XMLHttpRequest", class { open(...a) { rec("fetch", "XMLHttpRequest.open")(...a); } send() { log.push("fetch: XMLHttpRequest.send"); } setRequestHeader() {} });
  setProp(globalThis, "WebSocket", class { constructor(u) { log.push(`fetch: WebSocket ${u}`); } send() { log.push("fetch: WebSocket.send"); } });
  setProp(globalThis, "EventSource", class { constructor(u) { log.push(`fetch: EventSource ${u}`); } });
  setProp(globalThis, "navigator", { sendBeacon: rec("fetch", "navigator.sendBeacon"), userAgent: "stub", storage: { persist: rec("write", "navigator.storage.persist") } });
  setProp(globalThis, "document", { get cookie() { log.push("storage-read: document.cookie"); return ""; }, set cookie(v) { log.push(`write: document.cookie ${v}`); } });
  // Node-side paths (the simulator and any server-side compose for signed-in learners).
  for (const f of ["writeFileSync", "appendFileSync", "writeFile", "appendFile", "createWriteStream", "mkdirSync", "mkdir", "rmSync", "rm",
    "unlinkSync", "unlink", "renameSync", "rename", "copyFileSync", "copyFile", "writeSync", "write", "truncateSync", "symlinkSync", "linkSync"]) {
    const orig = fs[f]; fs[f] = rec("write", `fs.${f}`); restore.push(() => { fs[f] = orig; });
  }
  for (const f of ["writeFile", "appendFile", "mkdir", "rm", "unlink", "rename", "copyFile", "open"]) {
    const orig = fs.promises[f]; fs.promises[f] = rec("write", `fs.promises.${f}`); restore.push(() => { fs.promises[f] = orig; });
  }
  const origOpen = fs.openSync;
  fs.openSync = (p, flags = "r", ...rest) => { if (String(flags) !== "r") log.push(`write: fs.openSync ${p} ${flags}`); return origOpen(p, flags, ...rest); };
  restore.push(() => { fs.openSync = origOpen; });
  for (const [modName, mod, fns] of [["http", http, ["request", "get"]], ["https", https, ["request", "get"]], ["net", net, ["connect", "createConnection"]],
    ["tls", tls, ["connect"]], ["dgram", dgram, ["createSocket"]], ["child_process", childProcess, ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]]]) {
    for (const f of fns) { const orig = mod[f]; mod[f] = rec(modName === "child_process" ? "write" : "fetch", `${modName}.${f}`); restore.push(() => { mod[f] = orig; }); }
  }
  syncBuiltinESMExports(); // so `import { writeFileSync } from "node:fs"` style bindings see the stubs too
  // Logs and error reports are writes too (ruling N1: "not to a log, not to an error report").
  for (const f of ["log", "info", "warn", "error", "debug", "trace", "dir", "table"]) {
    const orig = console[f]; console[f] = rec("write", `console.${f}`); restore.push(() => { console[f] = orig; });
  }
  for (const s of ["stdout", "stderr"]) {
    const orig = process[s].write; process[s].write = (...a) => { log.push(`write: process.${s}.write`); return true; }; restore.push(() => { process[s].write = orig; });
  }
  return () => { for (const r of restore.reverse()) r(); syncBuiltinESMExports(); };
}

const deepFreeze = (o) => {
  if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); }
  return o;
};

test("N1: composing with storage and network stubbed makes zero writes and zero fetches", () => {
  const log = [];
  const results = [];
  let thrown = null;
  const uninstall = stubIO(log);
  try {
    for (const c of CASES) results.push(runCase(c, { wrap: (o) => deepFreeze(o) }));
  } catch (e) { thrown = e; } finally { uninstall(); }
  if (thrown instanceof TypeError && /read only|not extensible|frozen|Cannot (assign|add|delete)/i.test(thrown.message))
    assert.fail(`compose mutated its frozen input (a write to caller state): ${thrown.message}`);
  if (thrown) throw thrown;
  const writes = log.filter((l) => l.startsWith("write:"));
  const fetches = log.filter((l) => l.startsWith("fetch:"));
  const reads = log.filter((l) => l.startsWith("storage-read:"));
  assert.deepEqual(writes, [], `compose wrote: ${writes.join("; ")}`);
  assert.deepEqual(fetches, [], `compose reached the network: ${fetches.join("; ")}`);
  // Not N1, but the same boundary: the composer takes the history as an argument and never reads storage itself.
  assert.deepEqual(reads, [], `compose read storage itself: ${reads.join("; ")}`);
  // Not vacuous: the stubbed runs composed every case.
  assert.equal(results.length, CASES.length);
  assert.ok(results.every((r) => r.length === STEPS));
});

test("N1 control: the stubs do record a write and a fetch when one happens", () => {
  const log = [];
  const uninstall = stubIO(log);
  try {
    globalThis.localStorage.setItem("s3c:fp", "{}");
    globalThis.fetch("/api/x");
    fs.appendFileSync("/nonexistent/should-not-exist", "x");
    console.log("x");
  } finally { uninstall(); }
  assert.deepEqual(log.map((l) => l.split(":")[0]), ["write", "fetch", "write", "write"]);
});
