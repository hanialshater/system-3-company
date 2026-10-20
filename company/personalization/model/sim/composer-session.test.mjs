// Session composer tests (composer-v0.3-session, model-v0.4.0; model-v0.4.2 tests 10-12). Run by gate.mjs in `npm run test:personalization`.
//   node --test company/personalization/model/sim/composer-session.test.mjs
// owner: learner-model-engineer (Ifeoma) · offline only · no dependencies (node:test), Node 22.18 or later.
// Build note: company/personalization/policies/gam-session-build-note.md.
//
// 1. determinism; 2. remaining/coverage arithmetic equals EDP applyAddr (copied verbatim) on the addr scaled by addrUse,
// on a hand case and on every slot of real compositions, and the budget gain equals EDP's gain line (copied verbatim);
// 3. residual need and on_cov sign on a hand-built pool, and the default card carries no cov terms; 4. the attention
// budget (EDP's resolvable-need gain) falls back to the default card; 5. hard constraints hold; 6. v1/v3/applyEdits; 7. forbidden-input invariance (N3 shape);
// 8. existing policies byte-identical (golden) and the GAM still model-v0.2.2 (c2 fingerprint);
// 9. sandbox drift: sim/sandbox-reference.mjs, which imports nothing, recomposes the CLI's session exactly (every sandbox variant,
// reasonCarriesMove included); 10. gam-session, -v3, -no-cov composed outputs pinned at model-v0.4.1 (702e4588);
// 11. v3-edpbase = v3 + one base row, beta > 0 (model-v0.4.2, W-2003); 12. reasonCarriesMove fixtures (true, true only via
// need+cov, false, the equality edge (>=, model-v0.4.4, W-2008), null) and the formula on every real composition.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../model.ts";
import { PERSONAS } from "../personas.ts";
import { composeSession, applyAddr, resolvableGain, reasonTermValue } from "./composer-session.ts";
import { loadPinnedCatalog } from "./catalog-pin.mjs";
import { runEpisode, ALL_POLICIES, PHASE_A_POLICIES, SESSION_VARIANTS, SANDBOX_VARIANTS, composeSessionFor, sandboxDocument, firstComposeInput } from "./simulate.mjs";
import { goldenHashes, GOLDEN_FILE } from "./policy-golden.mjs";
import { recompose } from "./sandbox-reference.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const cat = loadPinnedCatalog();
const NOW = Date.UTC(2026, 9, 16, 9);
const HOUR = 3_600_000, DAY = 24 * HOUR;
const NEEDS = M.NEEDS;
const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };
const byDomain = (d) => cat.defaultOrder.filter((s) => cat.dims[s].domain === d);
const hist = (slugs, f) => slugs.map((slug, i) => { const o = f(slug, i); const at = NOW - DAY - (slugs.length - i) * HOUR;
  return { slug, completedAt: at, ...(o.pred === undefined ? {} : { predictedCorrectly: o.pred }), recalls: o.recall === undefined ? [] : [{ at: at + DAY, correct: o.recall }] }; });
const CASES = [
  { id: "cold-start", hist: [] },
  { id: "missing-probability", hist: hist(byDomain("probability").slice(0, 9), (s, i) => ({ pred: i % 3 === 0, recall: i % 2 ? false : undefined })) },
  { id: "succeeding-mixed", hist: hist(cat.defaultOrder.slice(0, 14), () => ({ pred: true, recall: true })) },
  { id: "concentrated-cs", hist: hist(byDomain("cs").slice(0, 12), (s) => ({ pred: fnv(s) % 2 === 0, recall: fnv(s) % 3 === 0 })) },
  { id: "with-due-revisits", hist: hist(cat.defaultOrder.slice(0, 12), (s, i) => ({ pred: i % 2 === 0 })), due: cat.defaultOrder.slice(0, 2) },
  { id: "stated-subjects", hist: hist(cat.defaultOrder.slice(0, 12), (s, i) => ({ pred: i % 2 === 0, recall: false })), settings: { statedSubjects: ["probability"] } },
  { id: "less-of-this", hist: hist(cat.defaultOrder.slice(0, 12), (s, i) => ({ pred: i % 2 === 1 })), settings: { lessOfThis: ["cs"] } },
  { id: "switched-off", hist: hist(byDomain("probability").slice(0, 9), () => ({ pred: false, recall: false })), off: true },
];
const inputOf = (c) => {
  const fingerprint = M.fingerprintFrom(c.hist, cat.dims, NOW, { predictedCorrectly: true, ...(c.settings ?? {}) });
  const needs = M.detect(fingerprint);
  return { fingerprint, needs, remaining: { ...needs }, pool: cat.lessons, defaultOrder: cat.defaultOrder, queued: [],
    history: c.hist, dueRevisits: c.due ?? [], personalisationOn: !c.off };
};
const SESSION_POLICIES = Object.keys(SESSION_VARIANTS);

// EDP's applyAddr, copied verbatim from company/personalization/reference/edp-orchestrator/src/policies.js lines 12-17.
function edpApplyAddr(mod, remaining, coverage) {
  for (const p in (mod.addr || {})) {
    remaining[p] = Math.max(0, remaining[p] - mod.addr[p]);
    coverage[p] = Math.min(1, coverage[p] + mod.addr[p]);
  }
}

// EDP's attention-budget gain, copied verbatim from company/personalization/reference/edp-orchestrator/src/edp-engine.js
// compose (the `gain=` line), with EDP's position `attention` factor in the place of our addrUse.
const edpGain = (mod, remaining, attention) => Object.entries(mod.addr||{}).reduce((s,[p,v])=>s+Math.min(remaining[p]||0,v*attention),0);
const scaled = (addr, use) => Object.fromEntries(NEEDS.map((n) => [n, use * addr[n]]));

// A hand-built pool: 12 done lessons on concept t:a (in default order first, so the anti-bubble streak is 0),
// two successors of t:a (b1, c1: build addr 1) and fillers (addr 0 for every need). One domain, intro only.
function handPool(order) {
  const L = (slug, concept, prerequisites = []) => ({ slug, domain: "probability", concept, level: "intro", prerequisites, successors: [] });
  const done = Array.from({ length: 12 }, (_, i) => L(`h${String(i).padStart(2, "0")}`, "t:a"));
  for (const d of done) d.successors = ["t:b", "t:c"];
  const rest = { b1: L("b1", "t:b", ["t:a"]), c1: L("c1", "t:c", ["t:a"]) };
  for (let i = 1; i <= 6; i++) rest[`f${i}`] = L(`f${i}`, `t:f${i}`);
  const pool = [...done, ...Object.values(rest)];
  const dims = Object.fromEntries(pool.map((l) => [l.slug, l]));
  const history = done.map((l, i) => ({ slug: l.slug, completedAt: NOW - DAY - (12 - i) * HOUR, predictedCorrectly: true, recalls: [] }));
  const fingerprint = M.fingerprintFrom(history, dims, NOW);
  const needs = M.detect(fingerprint);
  return { input: { fingerprint, needs, remaining: { ...needs }, pool, defaultOrder: [...done.map((d) => d.slug), ...order], queued: [], history,
    dueRevisits: [], personalisationOn: true }, pilot: new Set(pool.map((l) => l.concept)) };
}
const handCoeffs = (onCovBuild, o = {}) => ({ base: 0.1, onRem: { repair: 0.5, build: 1.0, breadth: 0.35, stretch: 0 },
  onCov: { repair: 0, build: onCovBuild, breadth: 0, stretch: 0 }, slotDecay: 0.02, attentionCost: 0.1, addrUse: 1, ...o });

test("1. determinism: same input, same session; same seed, same session-policy trace", () => {
  for (const c of CASES) for (const pol of SESSION_POLICIES) {
    const a = composeSessionFor(pol, inputOf(c), cat), b = composeSessionFor(pol, inputOf(c), cat);
    assert.equal(JSON.stringify(a), JSON.stringify(b), `${c.id} ${pol}`);
  }
  const t1 = runEpisode({ persona: PERSONAS[2], policy: "gam-session-v3", seed: 3, cat, trace: true, days: 2 });
  const t2 = runEpisode({ persona: PERSONAS[2], policy: "gam-session-v3", seed: 3, cat, trace: true, days: 2 });
  assert.equal(JSON.stringify(t1), JSON.stringify(t2));
  assert.equal(t1.trace.schema, "personalization-sim-trace-v1");
  assert.equal(t1.trace.modelVersion, M.MODEL_VERSION);
  assert.equal(t1.trace.composer, "composer-v0.3-session");
});

test("2. remaining/coverage: applyAddr equals EDP's on the scaled addr (hand case, every real slot); gain is EDP's", () => {
  const addr = { repair: 1, build: 0.5, breadth: 0, stretch: 0.25 };
  const r0 = { repair: 0.4, build: 0.7, breadth: 0.3, stretch: 0.05 }, c0 = { repair: 0.5, build: 0.9, breadth: 0, stretch: 0.95 };
  // use = 1: EDP's function exactly
  const r1 = { ...r0 }, c1 = { ...c0 }, r2 = { ...r0 }, c2 = { ...c0 };
  applyAddr(addr, r1, c1);
  edpApplyAddr({ addr }, r2, c2);
  assert.deepEqual([r1, c1], [r2, c2]);
  assert.deepEqual(r1, { repair: 0, build: 0.7 - 0.5, breadth: 0.3, stretch: 0 }, "remaining floors at 0");
  assert.deepEqual(c1, { repair: 1, build: 1, breadth: 0, stretch: 1 }, "coverage caps at 1");
  // use = .35: EDP's function on addr x .35, both state vectors scaled (a mutation that scales only one, or neither, fails)
  const r3 = { ...r0 }, c3 = { ...c0 }, r4 = { ...r0 }, c4 = { ...c0 };
  applyAddr(addr, r3, c3, 0.35);
  edpApplyAddr({ addr: scaled(addr, 0.35) }, r4, c4);
  assert.deepEqual([r3, c3], [r4, c4]);
  assert.deepEqual(r3, { repair: 0.4 - 0.35, build: 0.7 - 0.175, breadth: 0.3, stretch: 0 }, "remaining falls by .35 x addr, floor 0");
  assert.deepEqual(c3, { repair: 0.5 + 0.35, build: 1, breadth: 0, stretch: 1 }, "coverage rises by .35 x addr, cap 1");
  assert.ok(r3.repair > 0, "a residual need survives an addr-1 pick");
  // gain: EDP's line, and the resolvable mass (not the score)
  assert.equal(resolvableGain(addr, r0, 0.35), edpGain({ addr }, r0, 0.35));
  assert.equal(resolvableGain(addr, r0, 0.35), 0.35 + 0.175 + 0 + 0.05);
  let checked = 0, gains = 0;
  for (const c of CASES) for (const pol of SESSION_POLICIES) {
    const comp = composeSessionFor(pol, inputOf(c), cat);
    const use = M.sessionCoefficients(SESSION_VARIANTS[pol].variant).addrUse;
    assert.equal(use, M.COMPOSER_SESSION.v1.addrUse);
    let rem = { ...comp.needs }, cov = { repair: 0, build: 0, breadth: 0, stretch: 0 };
    for (const s of comp.slots.filter((x) => x.kind === "new")) {
      assert.deepEqual(s.remainingBefore, rem); assert.deepEqual(s.coverageBefore, cov);
      for (const x of s.candidates) { assert.equal(x.gain, edpGain({ addr: x.addr }, s.remainingBefore, use), `${c.id} ${pol} ${x.slug} gain`); gains++; }
      if (comp.personalised) { const w = s.candidates.find((x) => x.slug === s.winner); edpApplyAddr({ addr: scaled(w.addr, use) }, rem, cov); checked++; }
      assert.deepEqual(s.remainingAfter, rem, `${c.id} ${pol} slot ${s.sessionSlot}`); assert.deepEqual(s.coverageAfter, cov);
      rem = { ...rem }; cov = { ...cov };
    }
    const mass = NEEDS.reduce((q, n) => q + comp.needs[n], 0);
    assert.equal(comp.diagnostics.label, "circular: diagnostic only");
    assert.ok(Math.abs(comp.diagnostics.resolved - (mass - NEEDS.reduce((q, n) => q + comp.remaining[n], 0))) < 1e-12);
  }
  assert.ok(checked > 20, `checked ${checked} personalised slots`);
  assert.ok(gains > 200, `checked ${gains} gains`);
});

test("3. residual need and on_cov sign: a second build lesson moves on residual need, more with +onCov, not with −onCov; the default card has no cov terms", () => {
  const { input, pilot } = handPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1"]);
  const nb = input.needs.build;
  assert.ok(nb > 0.42 && nb < 0.6, `build need ${nb}`); // .47: so .3 leaves .17 (> attentionCost .1) and 1 leaves 0
  const run = (onCov, use = 0.3) => composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(onCov, { base: 0.01, addrUse: use }), { pilotConcepts: pilot, size: 3 });
  const pos = run(0.5), neg = run(-0.5), zero = run(0), full = run(0.5, 1);
  for (const r of [pos, neg, zero, full]) { assert.equal(r.picks[0].slug, "b1"); assert.equal(r.picks[0].moved, true); assert.equal(r.picks[0].reason, "build"); }
  // after b1 at addrUse .3: remaining.build = nb − .3, coverage.build = .3
  assert.equal(pos.slots[1].remainingBefore.build, Math.max(0, nb - 0.3 * 1)); assert.equal(pos.slots[1].coverageBefore.build, Math.min(1, 0 + 0.3 * 1));
  assert.equal(pos.picks[1].slug, "c1"); assert.equal(pos.picks[1].moved, true); assert.equal(pos.picks[1].reason, "build");
  assert.equal(pos.picks[1].terms.find((t) => t.name === "cov:build").value, 0.5 * 0.3 * 1);
  assert.equal(pos.picks[1].terms.find((t) => t.name === "need:build").value, 1.0 * (nb - 0.3) * 1, "the residual need still pulls");
  assert.equal(zero.picks[1].slug, "c1", "with onCov 0 the residual need alone moves a second build lesson");
  assert.equal(neg.picks[1].slug, "f1"); assert.equal(neg.picks[1].moved, false, "an overlap penalty keeps the default");
  assert.equal(neg.slots[1].candidates.find((x) => x.slug === "c1").terms.find((t) => t.name === "cov:build").value, -0.5 * 0.3 * 1);
  // control, addrUse 1 (the model-v0.3 arithmetic): b1 zeroes the need, c1 resolves nothing, the budget refuses it
  assert.equal(full.slots[1].remainingBefore.build, 0);
  assert.equal(full.picks[1].slug, "f1");
  assert.match(full.slots[1].candidates.find((x) => x.slug === "c1").note, /attention budget/);
  // every departure's cov term carries the sign of its coefficient (or is 0); the default card's are all 0
  for (const [r, sign] of [[pos, 1], [neg, -1]]) for (const s of r.slots) for (const x of s.candidates) for (const t of x.terms)
    if (t.name.startsWith("cov:") && t.value !== 0) { assert.equal(x.isDefault, false); assert.equal(Math.sign(t.value), t.name === "cov:build" ? sign : 0); }
  // (b) a default card that addresses the covered need: need term kept, cov term 0 (EDP's defaults have on_cov {})
  const d = handPool(["b1", "c1", "f1", "f2", "f3"]);
  const r = composeSession(d.input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(-0.5, { addrUse: 0.3 }), { pilotConcepts: d.pilot, size: 2 });
  assert.equal(r.picks[0].slug, "b1"); assert.equal(r.slots[1].defaultCard, "c1");
  const c1 = r.slots[1].candidates.find((x) => x.slug === "c1");
  assert.equal(c1.isDefault, true); assert.equal(c1.addr.build, 1); assert.equal(r.slots[1].coverageBefore.build, 0.3);
  assert.equal(c1.terms.find((t) => t.name === "cov:build").value, 0, "no cov term on the default card");
  assert.equal(c1.terms.find((t) => t.name === "need:build").value, 1.0 * (nb - 0.3) * 1, "the default card keeps its need term");
  assert.equal(r.picks[1].slug, "c1");
});

test("4. attention budget (EDP gain): a synergy card that outscores the default but resolves too little need leaves the default card, no reason", () => {
  // addrUse .4: b1 moves at slot 0 and leaves build nb − .4 ≈ .07. At slot 1, c1 carries cov:build 1 × .4 = .4, so it
  // outscores the default f1, but the need mass it would resolve, min(.07, .4), is ≤ attentionCost .1: the default fills it.
  // Under the model-v0.3 gain (need-term score .07 + .4 > .1) it would have moved.
  const { input, pilot } = handPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1"]);
  const nb = input.needs.build;
  const co = handCoeffs(1, { base: 0.01, addrUse: 0.4 });
  const r = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, co, { pilotConcepts: pilot, size: 2 });
  assert.deepEqual(r.picks.map((p) => [p.slug, p.moved, p.reason]), [["b1", true, "build"], ["f1", false, "default"]]);
  const s = r.slots[1];
  const c1 = s.candidates.find((x) => x.slug === "c1");
  assert.ok(c1.score > s.defaultScore, "c1 outscores the default card");
  assert.equal(c1.gain, 0 + Math.min(nb - 0.4, 0.4 * 1) + 0 + 0);
  assert.ok(c1.gain <= co.attentionCost);
  const termGain = c1.terms.filter((t) => /^(need|cov):/.test(t.name)).reduce((q, t) => q + t.value, 0);
  assert.ok(termGain > co.attentionCost, "the old score-based gain would have let it move");
  assert.equal(c1.eligibleToMove, false);
  assert.match(c1.note, /attention budget: resolvable need/);
  assert.match(s.rejected.find((x) => x.slug === "c1").why, /attention budget/);
  // control: lower the bar below the resolvable mass and it moves
  const r2 = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, { ...co, attentionCost: 0.03 }, { pilotConcepts: pilot, size: 2 });
  assert.equal(r2.picks[1].slug, "c1"); assert.equal(r2.picks[1].moved, true);
  // a filler (addr 0 everywhere) resolves nothing and never departs, whatever it scores
  for (const x of s.candidates) if (x.slug.startsWith("f") && !x.isDefault) { assert.equal(x.gain, 0); assert.equal(x.eligibleToMove, false); }
});

test("5. constraints: due revisits first, default when off or dampened, 1-in-3 floor, stretch readiness, filters, no repeats", () => {
  for (const c of CASES) for (const pol of SESSION_POLICIES) {
    const input = inputOf(c);
    const r = composeSessionFor(pol, input, cat);
    const due = input.dueRevisits;
    assert.deepEqual(r.picks.slice(0, due.length).map((p) => [p.slug, p.reason]), due.map((s) => [s, "due-revisit"]), `${c.id}: revisits first`);
    const fresh = r.picks.filter((p) => p.reason !== "due-revisit");
    assert.equal(fresh.length, M.COMPOSER_SESSION.sessionSize, `${c.id} ${pol}: a full session`);
    assert.equal(new Set(fresh.map((p) => p.slug)).size, fresh.length, "no repeats");
    const done = new Set(input.history.map((h) => h.slug));
    assert.ok(fresh.every((p) => !done.has(p.slug)), "nothing already completed");
    if (c.off || c.id === "cold-start") {
      assert.equal(r.personalised, false);
      assert.ok(fresh.every((p) => !p.moved && p.reason === "default"), `${c.id}: default order`);
      assert.deepEqual(fresh.map((p) => p.slug), cat.defaultOrder.filter((s) => !done.has(s)).slice(0, fresh.length));
    }
    for (const s of r.slots.filter((x) => x.kind === "new")) {
      const w = s.candidates.find((x) => x.slug === s.winner);
      if (s.moved) {
        assert.ok(w.eligibleToMove && !/stretch readiness/.test(w.note ?? ""), "a moved card passed readiness");
        assert.ok(w.gain > s.attentionCost, "a moved card paid its attention");
        assert.ok(s.margin > 0);
      } else assert.ok(s.reason === "default" || s.reason === "breadth-floor");
      for (const t of w.terms) assert.ok(["base", "surprise", "novelty", "slotDecay", "attentionCost"].includes(t.name) || /^(need|cov):/.test(t.name), t.name);
      for (const x of s.candidates) if (x.isDefault) assert.ok(x.terms.filter((t) => t.name.startsWith("cov:")).every((t) => t.value === 0), "default card: no cov terms");
      assert.equal(w.terms.find((t) => t.name === "surprise").value, 0, "surprise gate shut");
      assert.equal(w.terms.find((t) => t.name === "novelty").value, 0, "novelty gate shut");
    }
    // floor across the session: never 3 moved in a row (history streak 0 or more, then the session's own)
    let run = 0;
    for (const p of fresh) { run = p.moved ? run + 1 : 0; assert.ok(run <= 2, `${c.id} ${pol}: floor`); }
    const doms = fresh.map((p) => cat.dims[p.slug].domain);
    if (c.settings?.statedSubjects) assert.ok(doms.every((d) => d === "probability"), "stated subjects");
    if (c.settings?.lessOfThis) assert.ok(doms.every((d) => d !== "cs"), "less of this");
  }
  // and over whole episodes: the history-rebuilt streak never lets three moved cards be completed in a row
  for (const p of PERSONAS) for (const pol of SESSION_POLICIES) {
    const e = runEpisode({ persona: p, policy: pol, seed: 1, cat, trace: true, days: 2 });
    let run = 0;
    for (const s of e.trace.steps.filter((x) => x.kind === "new" && x.simulated.revealed)) { run = s.moved ? run + 1 : 0; assert.ok(run <= 2, `${p.id} ${pol}`); }
  }
});

test("6. v1/v3: applyEdits is pure, v3 differs from v1 exactly at the edit table, a stale edit throws", () => {
  const v1 = M.sessionCoefficients("v1"), before = JSON.stringify(M.COMPOSER_SESSION.v1);
  const v3 = M.applyEdits(v1, M.COMPOSER_SESSION.edits);
  assert.equal(JSON.stringify(M.COMPOSER_SESSION.v1), before, "v1 not mutated");
  assert.deepEqual(v3, M.sessionCoefficients("v3"));
  const diffs = [];
  for (const k of ["base", "slotDecay", "attentionCost", "addrUse"]) if (v1[k] !== v3[k]) diffs.push(`session.${k}`);
  for (const k of ["onRem", "onCov"]) for (const n of NEEDS) if (v1[k][n] !== v3[k][n]) diffs.push(`${n}.${k}`);
  assert.deepEqual(diffs.sort(), M.COMPOSER_SESSION.edits.map(([t, p]) => `${t}.${p}`).sort());
  assert.ok(M.COMPOSER_SESSION.edits.length >= 2 && M.COMPOSER_SESSION.edits.length <= 4);
  for (const e of M.COMPOSER_SESSION.edits) assert.match(e[4], /guess/);
  for (const v of Object.values(M.COMPOSER_SESSION.why)) assert.match(v, /guess/);
  assert.throws(() => M.applyEdits(v1, [["build", "onCov", 0.99, 1, "stale"]]), /from 0.99/);
  assert.throws(() => M.applyEdits(v1, [["session", "onCov", -0.1, 1, "x"]]), /needs a need/);
  assert.deepEqual(M.checkModel(), []);
  assert.ok(v1.addrUse > 0 && v1.addrUse <= 1 && v1.addrUse === v3.addrUse, "addrUse is a v1 number (no v3 edit)");
  assert.equal(M.applyEdits(v1, [["session", "addrUse", v1.addrUse, 0.5, "x"]]).addrUse, 0.5, "addrUse is editable like any scalar");
  assert.ok(M.COMPOSER_SESSION.edits.some(([, p, f, t]) => p === "onCov" && f < 0 && t > 0), "v3 holds at least one EDP-style complementarity edit");
});

test("7. forbidden inputs attached anywhere change nothing (N3 shape) and are never read by name", () => {
  const extra = Object.fromEntries(M.FORBIDDEN_INPUTS.map((k, i) => [k, i + 1]));
  const read = new Set();
  const watch = (o) => new Proxy(o, { get(t, k, r) { if (typeof k === "string" && M.FORBIDDEN_INPUTS.includes(k)) read.add(k); return Reflect.get(t, k, r); },
    has(t, k) { if (typeof k === "string" && M.FORBIDDEN_INPUTS.includes(k)) read.add(k); return Reflect.has(t, k); } });
  for (const c of CASES) for (const pol of SESSION_POLICIES) {
    const plain = inputOf(c);
    const dirty = watch({ ...plain, ...extra, fingerprint: watch({ ...plain.fingerprint, ...extra }), history: plain.history.map((h) => watch({ ...h, ...extra })) });
    assert.equal(JSON.stringify(composeSessionFor(pol, dirty, cat)), JSON.stringify(composeSessionFor(pol, plain, cat)), `${c.id} ${pol}`);
  }
  assert.deepEqual([...read], []);
});

test("8. existing policies byte-identical to the golden; the GAM is still model-v0.2.2 (c2 fingerprint)", () => {
  const golden = JSON.parse(readFileSync(GOLDEN_FILE, "utf8"));
  assert.deepEqual(PHASE_A_POLICIES, Object.keys(golden.hashes));
  assert.deepEqual(ALL_POLICIES, [...PHASE_A_POLICIES, "gam-session", "gam-session-v3", "gam-session-no-cov", "gam-session-v3-edpbase"]);
  assert.ok(!M.POLICIES.some((p) => p.startsWith("gam-session")), "session policies stay out of model.ts POLICIES (phase A harness, HQ main set)");
  // The full byte-identity check (goldenHashes(cat) deep-equals golden.hashes, ~1 s) runs once, in review-timing.test.mjs
  // (gate.mjs runs both files); set S3_SESSION_FULL=1 to repeat it here.
  if (process.env.S3_SESSION_FULL === "1") assert.deepEqual(goldenHashes(cat), golden.hashes);
  const fp = createHash("sha256").update(JSON.stringify({ version: M.PHASE_A_MODEL_VERSION, composer: M.COMPOSER, curves: M.inspect().curves })).digest("hex");
  assert.equal(fp, readFileSync(join(here, "..", "..", "eval", "harness", "c2", "gam-v0.2.2.sha256"), "utf8").trim());
  const e = runEpisode({ persona: PERSONAS[0], policy: "gam", seed: 1, cat, trace: true, days: 1 });
  assert.equal(e.trace.schema, "personalization-sim-trace-v0");
  assert.equal(e.trace.modelVersion, "model-v0.2.2");
});

test("9. sandbox drift: sandbox-reference.mjs (no model import) recomposes the CLI's session exactly", () => {
  const near = (a, b) => Math.abs(a - b) < 1e-12;
  for (const p of PERSONAS) for (const variant of Object.keys(SANDBOX_VARIANTS)) {
    const doc = sandboxDocument(p, variant, 1, cat);
    const r = recompose(doc);
    assert.deepEqual(r.picks.map((x) => x.reasonCarriesMove), doc.composed.picks.map((x) => x.reasonCarriesMove), `${p.id} ${variant} reasonCarriesMove`);
    assert.deepEqual(r.slots.map((x) => x.reasonCarriesMove), doc.composed.slots.filter((x) => x.kind === "new").map((x) => x.reasonCarriesMove));
    assert.deepEqual(r.needs, doc.needs, `${p.id} ${variant}: detect`);
    assert.deepEqual(r.picks.map((x) => [x.slug, x.moved, x.reason]), doc.composed.picks.map((x) => [x.slug, x.moved, x.reason]), `${p.id} ${variant}`);
    r.picks.forEach((x, i) => assert.ok(near(x.score, doc.composed.picks[i].score)));
    assert.deepEqual(r.remaining, doc.composed.remaining); assert.deepEqual(r.coverage, doc.composed.coverage);
    const fresh = doc.composed.slots.filter((x) => x.kind === "new");
    r.slots.forEach((x, i) => { assert.equal(x.margin, fresh[i].margin, `${p.id} ${variant} margin ${i}`);
      assert.equal(x.gain, fresh[i].candidates.find((y) => y.slug === fresh[i].winner).gain, `${p.id} ${variant} gain ${i}`); });
  }
  // a drag (coefficients and one curve changed) on the simulator's real input (firstComposeInput is what sandboxDocument used)
  const p = PERSONAS.find((x) => x.id === "struggling-repeater");
  const doc = sandboxDocument(p, "v1", 1, cat);
  assert.equal(doc.session.coefficients.addrUse, M.COMPOSER_SESSION.v1.addrUse, "the document carries addrUse");
  const c = { ...doc.session.coefficients, attentionCost: 0.03, addrUse: 0.6, onCov: { ...doc.session.coefficients.onCov, build: 0.6, repair: 0.4 } };
  const shapes = JSON.parse(JSON.stringify(M.NEED_SHAPES)); shapes.repair[0].vals = [0, 0.3, 0.6, 0.85, 1];
  const r = recompose(doc, { coefficients: c, needShapes: shapes });
  assert.ok(doc.historyCount > 0);
  const { input } = firstComposeInput(p, 1, cat);
  const needs = M.detect(input.fingerprint, shapes);
  const real = composeSession({ ...input, needs, remaining: { ...needs } }, M.COMPOSER, M.COMPOSER_SESSION, c, { pilotConcepts: cat.pilotConcepts });
  assert.deepEqual(r.needs, needs);
  assert.deepEqual(r.picks.map((x) => [x.slug, x.moved, x.reason]), real.picks.map((x) => [x.slug, x.moved, x.reason]));
  r.picks.forEach((x, i) => assert.ok(near(x.score, real.picks[i].score)));
  // a drag where the attention budget binds (cost .3 > most resolvable masses at addrUse .35): eligibility must match
  for (const q of PERSONAS) {
    const { input: qi } = firstComposeInput(q, 1, cat);
    const dq = sandboxDocument(q, "v3", 1, cat);
    const cq = { ...dq.session.coefficients, attentionCost: 0.3, base: 0.05 };
    const rq = recompose(dq, { coefficients: cq });
    const realq = composeSession(qi, M.COMPOSER, M.COMPOSER_SESSION, cq, { pilotConcepts: cat.pilotConcepts });
    assert.deepEqual(rq.picks.map((x) => [x.slug, x.moved, x.reason, x.reasonCarriesMove]), realq.picks.map((x) => [x.slug, x.moved, x.reason, x.reasonCarriesMove]), `${q.id} cost .3`);
    rq.slots.forEach((x, i) => assert.equal(x.margin, realq.slots.filter((y) => y.kind === "new")[i].margin, `${q.id} cost .3 margin ${i}`));
  }
});

test("9b. the CLI's sandbox document is the in-process one (one spawn)", () => {
  const out = execFileSync(process.execPath, [join(here, "hq-cli.mjs"), "sandbox", "--persona=wanderer", "--variant=v3"],
    { env: { NODE_NO_WARNINGS: "1" }, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const doc = JSON.parse(out);
  assert.equal(doc.schema, "personalization-hq-sandbox-v0");
  const mine = JSON.parse(JSON.stringify(sandboxDocument(PERSONAS.find((x) => x.id === "wanderer"), "v3", 1, cat)));
  for (const k of Object.keys(mine)) assert.deepEqual(doc[k], mine[k], k);
  // model-v0.4.2: --variant=edpbase reaches gam-session-v3-edpbase, and only its document carries the edpbase rows
  const e = JSON.parse(execFileSync(process.execPath, [join(here, "hq-cli.mjs"), "sandbox", "--persona=wanderer", "--variant=edpbase"],
    { env: { NODE_NO_WARNINGS: "1" }, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));
  assert.equal(e.policy, "gam-session-v3-edpbase"); assert.equal(e.variant, "edpbase");
  assert.deepEqual(e.session.coefficients, M.sessionCoefficients("v3-edpbase"));
  assert.deepEqual(e.session["v3-edpbase"], M.sessionCoefficients("v3-edpbase"));
  assert.equal(e.session.edpBaseEdits.length, 1);
  assert.ok(!("edpBaseEdits" in doc.session) && !("v3-edpbase" in doc.session), "the v3 document keeps its shape");
});

// 10. The pre-existing session policies' composed outputs are pinned at model-v0.4.1 (commit 702e4588, before W-2003).
// Hash over: compositions of every CASE, both sandbox documents' composed sessions per persona, and whole session
// episodes (trace steps and score, seed 1, 3 days) per persona. The hash was computed by this code on a git archive of 702e4588. `reasonCarriesMove` (added at model-v0.4.2) is dropped
// before hashing, so the pin says the new trace field is the only change to these policies' outputs. The episode step
// carries no modelVersion, so the version bump does not enter the hash. A deliberate change to these policies rewrites
// PIN_V041 under the change rule, never silently.
const PINNED_POLICIES = ["gam-session", "gam-session-v3", "gam-session-no-cov"];
const PIN_V041 = "9399c3abf0298d0e7677ea751efbbc35d36834eac3a61313c78dfc7c63e67f6b";
const dropNew = (_k, v) => (_k === "reasonCarriesMove" ? undefined : v);
function sessionPin() {
  const h = createHash("sha256");
  for (const c of CASES) for (const pol of PINNED_POLICIES) h.update(JSON.stringify(composeSessionFor(pol, inputOf(c), cat), dropNew));
  for (const p of PERSONAS) for (const v of ["v1", "v3"]) h.update(JSON.stringify(sandboxDocument(p, v, 1, cat).composed, dropNew));
  for (const p of PERSONAS) for (const pol of PINNED_POLICIES) for (const seed of [1]) {
    const e = runEpisode({ persona: p, policy: pol, seed, cat, trace: true, days: 3 });
    h.update(JSON.stringify({ steps: e.trace.steps, score: e.score }, dropNew));
  }
  return h.digest("hex");
}

test("10. existing session policies (gam-session, -v3, -no-cov): composed outputs identical to model-v0.4.1", () => {
  assert.equal(sessionPin(), PIN_V041);
});

// 11. gam-session-v3-edpbase (model-v0.4.2, W-2003; VP record company/decisions/2026-10-20-vp-personalization-session-base.md §2, §5).
test("11. v3-edpbase: v3 plus exactly one base row kept apart from edits; beta > 0 enforced by checkModel; wired as a session policy", () => {
  const v3 = M.sessionCoefficients("v3"), e = M.sessionCoefficients("v3-edpbase");
  const rows = M.COMPOSER_SESSION.edpBaseEdits;
  assert.equal(rows.length, 1);
  const [target, path, from, beta, why] = rows[0];
  assert.deepEqual([target, path, from], ["session", "base", 1.0]);
  assert.equal(v3.base, 1.0, "v3 keeps base 1.0");
  assert.ok(beta > 0 && beta < 1);
  // model-v0.4.3 (W-2004): beta set by applied-scientist-personalization by the VP record §2.3 rule; the placeholder is gone.
  assert.equal(beta, 0.033);
  assert.match(why, /^guess: \.033 \(model-v0\.4\.3, W-2004; was the \.02 placeholder\), by the VP record's rule/, "beta carries the W-2004 reason, not the placeholder");
  assert.doesNotMatch(why, /placeholder pending/, "the placeholder reason cannot survive into a frozen criterion");
  // equal to v3 except base, field by field
  assert.equal(e.base, beta);
  assert.deepEqual({ ...e, base: v3.base }, v3);
  assert.deepEqual(e, M.applyEdits(v3, rows));
  // apart from the v3 edit table: no base row in edits, so v3 (and gam-session-v3) cannot move with beta
  assert.ok(!M.COMPOSER_SESSION.edits.some(([, p]) => p === "base"));
  // checkModel requires beta > 0 and exactly one [session, base, 1.0, beta, reason] row (mutate, check, restore)
  assert.deepEqual(M.checkModel(), []);
  const keep = rows[0][3];
  try {
    for (const bad of [0, -0.01, Number.NaN]) {
      rows[0][3] = bad;
      assert.ok(M.checkModel().some((x) => /edpBaseEdits: beta must be > 0/.test(x)), `beta ${bad} refused`);
    }
  } finally { rows[0][3] = keep; }
  rows.push(["session", "slotDecay", M.COMPOSER_SESSION.v1.slotDecay, 0.02, "a second row is refused by the VP record §2.4"]);
  try { assert.ok(M.checkModel().some((x) => /exactly one row/.test(x))); } finally { rows.pop(); }
  assert.deepEqual(M.checkModel(), []);
  // wiring
  assert.deepEqual(SESSION_VARIANTS["gam-session-v3-edpbase"], { variant: "v3-edpbase", off: [] });
  assert.ok(ALL_POLICIES.includes("gam-session-v3-edpbase") && !M.POLICIES.includes("gam-session-v3-edpbase"));
  assert.equal(SANDBOX_VARIANTS.edpbase, "gam-session-v3-edpbase");
  assert.deepEqual(M.inspect().composerSession.coefficients["v3-edpbase"], e);
  const t = runEpisode({ persona: PERSONAS[1], policy: "gam-session-v3-edpbase", seed: 2, cat, trace: true, days: 2 });
  assert.deepEqual(t.trace.session.coefficients, e);
  assert.equal(t.trace.session.variant, "v3-edpbase");
  assert.equal(JSON.stringify(t), JSON.stringify(runEpisode({ persona: PERSONAS[1], policy: "gam-session-v3-edpbase", seed: 2, cat, trace: true, days: 2 })), "deterministic");
  // the floor still holds for the flat prior (VP record §3 Drift): never three moved cards in a row
  for (const c of CASES) { let run = 0; for (const p of composeSessionFor("gam-session-v3-edpbase", inputOf(c), cat).picks) { run = p.moved ? run + 1 : 0; assert.ok(run <= 2, c.id); } }
});

// A hand pool for reasonCarriesMove: handPool's lessons plus x1, a successor of t:a in another domain (build addr 1 and breadth addr 1).
function twoNeedPool(order) {
  const { input, pilot } = handPool(order.filter((s) => s !== "x1"));
  const x1 = { slug: "x1", domain: "cs", concept: "t:x", level: "intro", prerequisites: ["t:a"], successors: [] };
  for (const l of input.pool) if (l.concept === "t:a") l.successors = [...l.successors, "t:x"];
  const pool = [...input.pool, x1];
  const dims = Object.fromEntries(pool.map((l) => [l.slug, l]));
  const fingerprint = M.fingerprintFrom(input.history, dims, NOW);
  const needs = M.detect(fingerprint);
  return { input: { ...input, pool, fingerprint, needs, remaining: { ...needs }, defaultOrder: [...input.history.map((h) => h.slug), ...order] },
    pilot: new Set([...pilot, "t:x"]) };
}

test("12. reasonCarriesMove: true iff the named reason's terms are >= score(winner) − score(default); null when not moved", () => {
  const val = (pick, name) => pick.terms.find((t) => t.name === name).value;
  // (a) TRUE, one need: b1 moves for build alone
  { const { input, pilot } = handPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1"]);
    const r = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(0, { base: 0.01, addrUse: 1 }), { pilotConcepts: pilot, size: 2 });
    assert.deepEqual([r.picks[0].slug, r.picks[0].moved, r.picks[0].reason], ["b1", true, "build"]);
    assert.ok(val(r.picks[0], "need:build") > r.slots[0].margin);
    assert.equal(r.picks[0].reasonCarriesMove, true); assert.equal(r.slots[0].reasonCarriesMove, true);
    assert.equal(r.picks[1].moved, false); assert.equal(r.picks[1].reasonCarriesMove, null, "a default pick is null, not false"); }
  // (b) TRUE only through the sum need:build + cov:build: the larger single term alone is below the margin
  { const { input, pilot } = handPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1"]);
    const r = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(0.5, { base: 0.01, addrUse: 0.3 }), { pilotConcepts: pilot, size: 3 });
    const p = r.picks[1], m = r.slots[1].margin;
    assert.deepEqual([p.slug, p.moved, p.reason], ["c1", true, "build"]);
    assert.ok(Math.max(val(p, "need:build"), val(p, "cov:build")) < m, "no single term carries it");
    assert.ok(val(p, "need:build") + val(p, "cov:build") > m);
    assert.equal(reasonTermValue("build", p.terms), val(p, "need:build") + val(p, "cov:build"));
    assert.equal(p.reasonCarriesMove, true); }
  // (c) FALSE: x1 wins on build + breadth; it is named for breadth (the larger term), and breadth alone is below the margin
  { const { input, pilot } = twoNeedPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1", "x1"]);
    const co = handCoeffs(0, { base: 0.01, addrUse: 1, onRem: { repair: 0.5, build: 1.0, breadth: 1.0, stretch: 0 } });
    const r = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, co, { pilotConcepts: pilot, size: 2 });
    const p = r.picks[0], m = r.slots[0].margin;
    assert.deepEqual([p.slug, p.moved, p.reason], ["x1", true, "breadth"]);
    assert.ok(val(p, "need:build") > 0 && val(p, "need:breadth") >= val(p, "need:build"));
    assert.ok(reasonTermValue("breadth", p.terms) < m);
    assert.equal(p.reasonCarriesMove, false); assert.equal(r.slots[0].reasonCarriesMove, false);
    // control: switch build off and the same move is carried by breadth alone
    const r2 = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, co, { pilotConcepts: pilot, size: 2, off: ["need:build"] });
    assert.deepEqual([r2.picks[0].slug, r2.picks[0].reason, r2.picks[0].reasonCarriesMove], ["x1", "breadth", true]); }
  // (f) the equality edge, exact in floats (base 0, no cost, no decay: the margin IS the reason's value). model-v0.4.4
  // (W-2008, VP record §7, replacing §5's "greater than"): equality is TRUE, since without the reason the winner would only
  // tie the default card, and a tie keeps the default. The only fixture that catches "> instead of >=" (build note §9.3).
  { const { input, pilot } = handPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1"]);
    const r = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(0, { base: 0, attentionCost: 0, slotDecay: 0, addrUse: 1 }), { pilotConcepts: pilot, size: 1 });
    assert.deepEqual([r.picks[0].slug, r.picks[0].moved, r.picks[0].reason], ["b1", true, "build"]);
    assert.equal(reasonTermValue("build", r.picks[0].terms), r.slots[0].margin);
    assert.equal(r.picks[0].reasonCarriesMove, true, "greater than or equal: equality carries (VP record §7)");
    assert.equal(r.slots[0].reasonCarriesMove, true); }
  // (d) due revisits are null (breadth-floor picks, a move the floor refused, are counted null in (e))
  { const { input, pilot } = handPool(["b1", "c1", "f1", "f2", "f3", "f4", "f5", "f6"]);
    const r = composeSession({ ...input, dueRevisits: [input.history[0].slug] }, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(0.5, { base: 0.01, addrUse: 0.2 }), { pilotConcepts: pilot });
    assert.equal(r.picks[0].reason, "due-revisit"); assert.equal(r.picks[0].reasonCarriesMove, null); assert.equal(r.slots[0].reasonCarriesMove, null); }
  // (e) every real composition of every session policy: the field is the spec's formula, recomputed here from the trace
  let moved = 0, nulls = 0, floors = 0;
  for (const c of CASES) for (const pol of Object.keys(SESSION_VARIANTS)) {
    const r = composeSessionFor(pol, inputOf(c), cat);
    r.picks.forEach((p, i) => {
      const s = r.slots[i];
      assert.equal(s.reasonCarriesMove, p.reasonCarriesMove, `${c.id} ${pol} slot ${i}: slot and pick agree`);
      if (!p.moved) { assert.equal(p.reasonCarriesMove, null, `${c.id} ${pol} slot ${i} (${p.reason})`); nulls++; if (p.reason === "breadth-floor") floors++; return; }
      const names = /^(repair|build|breadth|stretch)$/.test(p.reason) ? [`need:${p.reason}`, `cov:${p.reason}`] : [p.reason];
      const rv = p.terms.filter((t) => names.includes(t.name)).reduce((q, t) => q + t.value, 0);
      assert.equal(p.reasonCarriesMove, rv >= p.score - s.defaultScore, `${c.id} ${pol} slot ${i}`); // model-v0.4.4: >=
      assert.equal(p.score - s.defaultScore, s.margin);
      moved++;
    });
  }
  assert.ok(moved > 5 && nulls > 5 && floors > 0, `moved ${moved}, null ${nulls}, breadth-floor ${floors}`);
  // and in an episode trace (every served step's slot carries the field)
  const ep = runEpisode({ persona: PERSONAS[0], policy: "gam-session-v3-edpbase", seed: 1, cat, trace: true, days: 1 });
  for (const st of ep.trace.steps.filter((x) => x.kind === "new")) assert.ok("reasonCarriesMove" in st.slots[0] && (st.moved ? typeof st.slots[0].reasonCarriesMove === "boolean" : st.slots[0].reasonCarriesMove === null));
});
