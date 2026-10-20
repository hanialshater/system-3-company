// Session composer tests (composer-v0.3-session, model-v0.3.0). Run by gate.mjs in `npm run test:personalization`.
//   node --test company/personalization/model/sim/composer-session.test.mjs
// owner: learner-model-engineer (Ifeoma) · offline only · no dependencies (node:test), Node 22.18 or later.
// Build note: company/personalization/policies/gam-session-build-note.md.
//
// 1. determinism; 2. remaining/coverage arithmetic equals EDP applyAddr (copied verbatim) on a hand case and on
// every slot of real compositions; 3. on_cov sign effect on a hand-built pool; 4. the attention budget falls back to
// the default card; 5. hard constraints hold; 6. v1/v3/applyEdits; 7. forbidden-input invariance (N3 shape);
// 8. existing policies byte-identical (golden) and the GAM still model-v0.2.2 (c2 fingerprint);
// 9. sandbox drift: sim/sandbox-reference.mjs, which imports nothing, recomposes the CLI's session exactly.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../model.ts";
import { PERSONAS } from "../personas.ts";
import { composeSession, applyAddr } from "./composer-session.ts";
import { loadPinnedCatalog } from "./catalog-pin.mjs";
import { runEpisode, ALL_POLICIES, PHASE_A_POLICIES, SESSION_VARIANTS, composeSessionFor, sandboxDocument, firstComposeInput } from "./simulate.mjs";
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
const handCoeffs = (onCovBuild) => ({ base: 0.1, onRem: { repair: 0.5, build: 1.0, breadth: 0.35, stretch: 0 },
  onCov: { repair: 0, build: onCovBuild, breadth: 0, stretch: 0 }, slotDecay: 0.02, attentionCost: 0.1 });

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

test("2. remaining/coverage: applyAddr equals EDP's on a hand case and on every slot of real sessions", () => {
  const addr = { repair: 1, build: 0.5, breadth: 0, stretch: 0.25 };
  const r0 = { repair: 0.4, build: 0.7, breadth: 0.3, stretch: 0.1 }, c0 = { repair: 0.5, build: 0.6, breadth: 0, stretch: 0.9 };
  const r1 = { ...r0 }, c1 = { ...c0 }, r2 = { ...r0 }, c2 = { ...c0 };
  applyAddr(addr, r1, c1);
  edpApplyAddr({ addr }, r2, c2);
  assert.deepEqual([r1, c1], [r2, c2]);
  assert.deepEqual(r1, { repair: 0, build: 0.7 - 0.5, breadth: 0.3, stretch: 0 }, "remaining floors at 0");
  assert.deepEqual(c1, { repair: 1, build: 1, breadth: 0, stretch: 1 }, "coverage caps at 1");
  let checked = 0;
  for (const c of CASES) for (const pol of SESSION_POLICIES) {
    const comp = composeSessionFor(pol, inputOf(c), cat);
    let rem = { ...comp.needs }, cov = { repair: 0, build: 0, breadth: 0, stretch: 0 };
    for (const s of comp.slots.filter((x) => x.kind === "new")) {
      assert.deepEqual(s.remainingBefore, rem); assert.deepEqual(s.coverageBefore, cov);
      if (comp.personalised) { const w = s.candidates.find((x) => x.slug === s.winner); edpApplyAddr({ addr: w.addr }, rem, cov); checked++; }
      assert.deepEqual(s.remainingAfter, rem, `${c.id} ${pol} slot ${s.sessionSlot}`); assert.deepEqual(s.coverageAfter, cov);
      rem = { ...rem }; cov = { ...cov };
    }
    const mass = NEEDS.reduce((q, n) => q + comp.needs[n], 0);
    assert.equal(comp.diagnostics.label, "circular: diagnostic only");
    assert.ok(Math.abs(comp.diagnostics.resolved - (mass - NEEDS.reduce((q, n) => q + comp.remaining[n], 0))) < 1e-12);
  }
  assert.ok(checked > 20, `checked ${checked} personalised slots`);
});

test("3. on_cov sign: a positive onCov pulls a second build lesson in; a negative one keeps the default (overlap)", () => {
  const { input, pilot } = handPool(["f1", "f2", "f3", "f4", "f5", "f6", "b1", "c1"]);
  assert.ok(input.needs.build > 0.3, `build need ${input.needs.build}`);
  const run = (onCov) => composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(onCov), { pilotConcepts: pilot, size: 3 });
  const pos = run(0.5), neg = run(-0.5), zero = run(0);
  for (const r of [pos, neg, zero]) { assert.equal(r.picks[0].slug, "b1"); assert.equal(r.picks[0].moved, true); assert.equal(r.picks[0].reason, "build"); }
  // after b1: remaining.build = 0, coverage.build = 1 (applyAddr with addr 1)
  assert.equal(pos.slots[1].remainingBefore.build, 0); assert.equal(pos.slots[1].coverageBefore.build, 1);
  assert.equal(pos.picks[1].slug, "c1"); assert.equal(pos.picks[1].moved, true); assert.equal(pos.picks[1].reason, "build", "complementarity names the need it serves");
  assert.equal(pos.picks[1].terms.find((t) => t.name === "cov:build").value, 0.5);
  assert.equal(neg.picks[1].slug, "f1"); assert.equal(neg.picks[1].moved, false);
  assert.equal(neg.slots[1].candidates.find((x) => x.slug === "c1").terms.find((t) => t.name === "cov:build").value, -0.5);
  assert.equal(zero.picks[1].slug, "f1", "with onCov 0 a covered need pulls nothing");
  // every cov term carries the sign of its coefficient (or is 0)
  for (const [r, sign] of [[pos, 1], [neg, -1]]) for (const s of r.slots) for (const x of s.candidates) for (const t of x.terms)
    if (t.name.startsWith("cov:") && t.value !== 0) assert.equal(Math.sign(t.value), t.name === "cov:build" ? sign : 0);
});

test("4. attention budget: a departure that outscores the default but gains too little leaves the default card, no reason", () => {
  // b1 is the default at slot 0 (shown, covers build); at slot 1 the default c1 carries an overlap penalty (cov:build −.5),
  // so filler f1 outscores it, but f1's need-term gain is 0 ≤ attentionCost: the default card fills the slot.
  const { input, pilot } = handPool(["b1", "c1", "f1", "f2", "f3"]);
  const r = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, handCoeffs(-0.5), { pilotConcepts: pilot, size: 2 });
  assert.deepEqual(r.picks.map((p) => [p.slug, p.moved, p.reason]), [["b1", false, "default"], ["c1", false, "default"]]);
  const s = r.slots[1];
  const f1 = s.candidates.find((x) => x.slug === "f1");
  assert.ok(f1.score > s.defaultScore, "f1 outscores the default card");
  assert.equal(f1.eligibleToMove, false);
  assert.match(f1.note, /attention budget/);
  assert.match(s.rejected.find((x) => x.slug === "f1").why, /attention budget/);
  assert.equal(s.margin, null, "no eligible departure");
  // control: with a zero attention cost f1 still has gain 0, so 0 > 0 fails; lower the bar below the gain and it moves
  const r2 = composeSession(input, M.COMPOSER, M.COMPOSER_SESSION, { ...handCoeffs(-0.5), attentionCost: -0.01 }, { pilotConcepts: pilot, size: 2 });
  assert.equal(r2.picks[1].slug, "f1"); assert.equal(r2.picks[1].moved, true);
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
  for (const k of ["base", "slotDecay", "attentionCost"]) if (v1[k] !== v3[k]) diffs.push(`session.${k}`);
  for (const k of ["onRem", "onCov"]) for (const n of NEEDS) if (v1[k][n] !== v3[k][n]) diffs.push(`${n}.${k}`);
  assert.deepEqual(diffs.sort(), M.COMPOSER_SESSION.edits.map(([t, p]) => `${t}.${p}`).sort());
  assert.ok(M.COMPOSER_SESSION.edits.length >= 2 && M.COMPOSER_SESSION.edits.length <= 4);
  for (const e of M.COMPOSER_SESSION.edits) assert.match(e[4], /guess/);
  for (const v of Object.values(M.COMPOSER_SESSION.why)) assert.match(v, /guess/);
  assert.throws(() => M.applyEdits(v1, [["build", "onCov", 0.99, 1, "stale"]]), /from 0.99/);
  assert.throws(() => M.applyEdits(v1, [["session", "onCov", -0.1, 1, "x"]]), /needs a need/);
  assert.deepEqual(M.checkModel(), []);
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
  assert.deepEqual(ALL_POLICIES, [...PHASE_A_POLICIES, "gam-session", "gam-session-v3", "gam-session-no-cov"]);
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
  for (const p of PERSONAS) for (const variant of ["v1", "v3"]) {
    const doc = sandboxDocument(p, variant, 1, cat);
    const r = recompose(doc);
    assert.deepEqual(r.needs, doc.needs, `${p.id} ${variant}: detect`);
    assert.deepEqual(r.picks.map((x) => [x.slug, x.moved, x.reason]), doc.composed.picks.map((x) => [x.slug, x.moved, x.reason]), `${p.id} ${variant}`);
    r.picks.forEach((x, i) => assert.ok(near(x.score, doc.composed.picks[i].score)));
    assert.deepEqual(r.remaining, doc.composed.remaining); assert.deepEqual(r.coverage, doc.composed.coverage);
  }
  // a drag (coefficients and one curve changed) on the simulator's real input (firstComposeInput is what sandboxDocument used)
  const p = PERSONAS.find((x) => x.id === "struggling-repeater");
  const doc = sandboxDocument(p, "v1", 1, cat);
  const c = { ...doc.session.coefficients, attentionCost: 0.03, onCov: { ...doc.session.coefficients.onCov, build: 0.6, repair: 0.4 } };
  const shapes = JSON.parse(JSON.stringify(M.NEED_SHAPES)); shapes.repair[0].vals = [0, 0.3, 0.6, 0.85, 1];
  const r = recompose(doc, { coefficients: c, needShapes: shapes });
  assert.ok(doc.historyCount > 0);
  const { input } = firstComposeInput(p, 1, cat);
  const needs = M.detect(input.fingerprint, shapes);
  const real = composeSession({ ...input, needs, remaining: { ...needs } }, M.COMPOSER, M.COMPOSER_SESSION, c, { pilotConcepts: cat.pilotConcepts });
  assert.deepEqual(r.needs, needs);
  assert.deepEqual(r.picks.map((x) => [x.slug, x.moved, x.reason]), real.picks.map((x) => [x.slug, x.moved, x.reason]));
  r.picks.forEach((x, i) => assert.ok(near(x.score, real.picks[i].score)));
});

test("9b. the CLI's sandbox document is the in-process one (one spawn)", () => {
  const out = execFileSync(process.execPath, [join(here, "hq-cli.mjs"), "sandbox", "--persona=wanderer", "--variant=v3"],
    { env: { NODE_NO_WARNINGS: "1" }, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const doc = JSON.parse(out);
  assert.equal(doc.schema, "personalization-hq-sandbox-v0");
  const mine = JSON.parse(JSON.stringify(sandboxDocument(PERSONAS.find((x) => x.id === "wanderer"), "v3", 1, cat)));
  for (const k of Object.keys(mine)) assert.deepEqual(doc[k], mine[k], k);
});
