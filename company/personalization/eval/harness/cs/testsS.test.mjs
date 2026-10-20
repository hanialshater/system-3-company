// The session criterion's tests (criterion §5). They hold before and after the freeze: before it, only the reference arm
// and fixtures run in the eval world (the lock), and the lock itself is tested on temporary copies.
// owner: personalization-eval (Uma) · run: eval-s1-1020 · criterion: company/personalization/eval/2026-10-20-session-criterion.md
//   NODE_NO_WARNINGS=1 node --test company/personalization/eval/harness/cs/testsS.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { firstComposeInput, composeSessionFor, SESSION_VARIANTS } from "../../../model/sim/simulate.mjs";
import { loadCatalog } from "../../../model/sim/catalog.mjs";
import { PERSONAS as SIM_PERSONAS } from "../../../model/personas.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, CRITERION2 } from "../c2/world2.mjs";
import { E3 } from "../c3/world3.mjs";
import { seedsFromSd } from "../c2/scorer2.mjs";
import { assertScoringAllowedS, criterionStatusS, runEpisodeS, cellsS, cellByNameS, catalog, candidatePin, frozenPin, pinCheck, homeDomain,
  SESSION_ARMS, SESSION_POLICIES, REFERENCE_ARM, BASE_CELL, SEEDS_S, PIN_FILES, CRITERION_S_FILE } from "./harnessS.mjs";
import { judgeChecks, identityS, sessionLoopIdentity, t1ReplayS, composeChecksS, t4Session } from "./checksS.mjs";
import { readings, qnorm, qt, intervalAdj, CRITERION_S } from "./runS.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const P = (id) => PERSONAS.find((p) => p.id === id);

// ---------------- the freeze lock ----------------
test("freeze lock: a draft runs only default-order+fixed and fixtures; a frozen copy allows every arm", () => {
  const dir = mkdtempSync(join(tmpdir(), "cslock-")), f = join(dir, "c.md");
  writeFileSync(f, "# x\nstatus: draft (unfrozen)\n");
  assert.doesNotThrow(() => assertScoringAllowedS([REFERENCE_ARM, "fixture-session-default+fixed"], f));
  for (const a of [...SESSION_ARMS, "gam+fixed", "draft-rules+fixed", "random+fixed", "oracle-order+fixed", "default-order+none"]) assert.throws(() => assertScoringAllowedS([a], f), /freeze lock/, a);
  writeFileSync(f, "# x\nstatus: frozen\n");
  assert.doesNotThrow(() => assertScoringAllowedS([...SESSION_ARMS, "gam+fixed"], f));
  if (!/^frozen\b/.test(criterionStatusS())) assert.throws(() => assertScoringAllowedS(["gam-session+fixed"]), /freeze lock/);
});

// ---------------- the judge is criterion 3's ----------------
test("S-ID0, T5c, K-e, GAM pin: judge files equal readout 3's manifest; judge modules import nothing; no draft in dims; GAM is v0.2.2", () => {
  const j = judgeChecks({ seeds: [SEEDS_S.first, SEEDS_S.first + 1] });
  assert.ok(j.id0.ok, JSON.stringify(j.id0)); assert.ok(j.t5c.ok); assert.ok(j.ke.ok, JSON.stringify(j.ke.problems)); assert.ok(j.gam.ok);
});
test("S-ID1: runEpisodeS equals runEpisode3 for the reference arm (6 cells x 6 personas x 2 seeds)", () => { const r = identityS(); assert.ok(r.ok, JSON.stringify(r)); assert.equal(r.n, 72); });
test("S-ID2: the session loop serving the default order as 5-card plans is the reference arm byte for byte", () => { const r = sessionLoopIdentity(); assert.ok(r.ok, JSON.stringify(r)); });

// ---------------- the candidate checks can fail ----------------
test("T1 replay: a deterministic fixture passes in two processes; a Math.random fixture fails", () => {
  assert.ok(t1ReplayS({ persona: "wanderer", seed: SEEDS_S.first, arm: "fixture-session-default+fixed" }).ok);
  assert.ok(!t1ReplayS({ persona: "wanderer", seed: SEEDS_S.first, arm: "fixture-session-nondeterministic+fixed" }).ok);
});
test("T2S, T3S, NM: the default fixture passes; the forbidden reader fails T3S only; the Math.random fixture fails T2S", () => {
  const ok = composeChecksS({ persona: "wanderer", seed: SEEDS_S.first, arm: "fixture-session-default+fixed", t4: false });
  assert.ok(ok.composes > 10 && ok.t2.ok && ok.t3.ok && ok.nm.ok);
  const fr = composeChecksS({ persona: "wanderer", seed: SEEDS_S.first, arm: "fixture-session-forbidden-reader+fixed", t4: false });
  assert.ok(fr.t2.ok && !fr.t3.ok && fr.nm.ok); assert.ok(fr.t3.fails.every((x) => x.input === "sessionCount"));
  const nd = composeChecksS({ persona: "wanderer", seed: SEEDS_S.first, arm: "fixture-session-nondeterministic+fixed", t4: false });
  assert.ok(!nd.t2.ok);
});
test("T4S: passes on the builder's own sample compositions of all four variants (sim personas, seeds 1-3); fails on broken copies", () => {
  const cat = loadCatalog();
  let moved = 0, carriesFalse = 0;
  const comps = [];
  for (const p of SIM_PERSONAS) for (const seed of [1, 2, 3]) for (const pol of SESSION_POLICIES) {
    const c = composeSessionFor(pol, firstComposeInput(p, seed, cat).input, cat);
    const r = t4Session(c); assert.ok(r.ok, `${pol} ${p.id} ${seed} ${JSON.stringify(r.fails)}`);
    moved += c.picks.filter((x) => x.moved).length; carriesFalse += c.picks.filter((x) => x.reasonCarriesMove === false).length; comps.push(c);
  }
  assert.ok(moved > 0, "the sample has moved picks to check");
  const withMove = comps.find((c) => c.picks.some((x) => x.moved));
  const i = withMove.picks.findIndex((x) => x.moved);
  const breaks = {
    score: (c) => { c.picks[i].score += 0.01; },
    carries: (c) => { c.picks[i].reasonCarriesMove = !c.picks[i].reasonCarriesMove; c.slots.filter((s) => s.kind === "new")[i].reasonCarriesMove = c.picks[i].reasonCarriesMove; },
    margin: (c) => { c.slots.filter((s) => s.kind === "new")[i].margin = -0.01; },
    nullOnDefault: (c) => { const j = c.picks.findIndex((x) => !x.moved); if (j >= 0) c.picks[j].reasonCarriesMove = false; else c.picks[i].moved = false; },
  };
  for (const [k, f] of Object.entries(breaks)) { const c = structuredClone(withMove); f(c); assert.ok(!t4Session(c).ok, k); }
  assert.ok(carriesFalse >= 0);
});
test("K5 counter: a fixture's uncarried move is counted on every served moved card; the default fixture counts none", () => {
  const cell = cellByNameS(BASE_CELL);
  const sw = runEpisodeS({ persona: P("wanderer"), arm: "fixture-session-swap-uncarried+fixed", seed: SEEDS_S.first, cell });
  assert.ok(sw.extra.movedServed > 0); assert.equal(sw.extra.carriesFalse, sw.extra.movedServed); assert.equal(sw.extra.carriesNull, 0);
  const df = runEpisodeS({ persona: P("wanderer"), arm: "fixture-session-default+fixed", seed: SEEDS_S.first, cell });
  assert.equal(df.extra.movedServed, 0); assert.equal(df.extra.carriesFalse, 0);
  assert.ok(df.extra.composes > 10 && df.extra.servedBySlot[0] === df.extra.composes);
});

// ---------------- K4's home domain ----------------
test("K4 home domain: from the visible pre-history only; most completions; a tie goes to the latest completion's domain", () => {
  const cat = catalog();
  const pr = cat.lessons.filter((l) => l.domain === "probability").slice(0, 3), cs = cat.lessons.filter((l) => l.domain === "cs").slice(0, 3);
  const h = (l, at) => ({ slug: l.slug, completedAt: at, predictedCorrectly: true, recalls: [] });
  assert.equal(homeDomain([h(pr[0], 1), h(pr[1], 2), h(cs[0], 3)], cat), "probability");
  assert.equal(homeDomain([h(pr[0], 1), h(cs[0], 2), h(cs[1], 3), h(pr[1], 4)], cat), "probability");
  assert.equal(homeDomain([h(pr[0], 5), h(cs[0], 2), h(cs[1], 3), h(pr[1], 4)], cat), "probability");
  assert.equal(homeDomain([h(pr[0], 1), h(cs[0], 6), h(cs[1], 3), h(pr[1], 4)], cat), "cs");
  assert.equal(homeDomain([], cat), null);
});

// ---------------- statistics and readings on synthetic scores ----------------
test("qnorm and qt: known values; intervalAdj at m = 1 equals scorer2's 95% t interval", () => {
  assert.ok(Math.abs(qnorm(0.975) - 1.959963985) < 1e-8); assert.ok(Math.abs(qnorm(0.995) - 2.575829304) < 1e-8);
  assert.ok(Math.abs(qt(0.975, 1999) - 1.961151) < 1e-5);
  assert.ok(Math.abs(qnorm(1 - 0.05 / (2 * 156)) - 3.597) < 2e-3);
  const d = Array.from({ length: 200 }, (_, i) => Math.sin(i) * 0.1 + 0.01);
  const a = intervalAdj(d, 1, 0.05), mu = d.reduce((x, y) => x + y, 0) / d.length;
  assert.ok(Math.abs(a.mean - mu) < 1e-12 && a.lo < mu && a.hi > mu);
});
function synth({ n = 60, delta = {}, out = {}, carriesFalse = 0 } = {}) {
  const cells = cellsS().filter((c) => c.role === "base" || c.name === "interleave:slots-low");
  const mk = (p, i, d = 0, o = 0.5, cf = 0) => ({ K: { 1: 50, 7: 40 + d * 100 + 0.3 * Math.sin(i * 7 + p.length), 30: 30 }, nAll: 100, nNew: 50, g1TopDomainShare: 0.5, g2Concepts: 50, g3PrereqFirst: 0.3, g4Gain: 30,
    extra: { home: "cs", servedNew: 100, servedOutHome: Math.round(100 * (o + 0.02 * Math.sin(i))), movedServed: 10, carriesFalse: cf, carriesTrue: 10 - cf, carriesNull: 0, nearTie: 0 } });
  const R = {};
  for (const c of cells) for (const arm of [REFERENCE_ARM, ...SESSION_ARMS]) for (const p of PERSONAS)
    ((R[c.name] ??= {})[arm] ??= {})[p.id] = Array.from({ length: n }, (_, i) => mk(p.id, i, arm === REFERENCE_ARM ? 0 : (delta[arm]?.[p.id] ?? 0), arm === REFERENCE_ARM ? 0.5 : (out[arm] ?? 0.5), arm === "gam-session-v3+fixed" ? carriesFalse : 0));
  return { R, cells };
}
test("readings: K1 PASS/FAIL, K2 veto on a clear loss, K3 prefers the simpler on a tie, K4 NARROWER, K5 COPY-BLOCKED", () => {
  const win = Object.fromEntries(PERSONAS.map((p) => [p.id, 0.02]));
  const { R, cells } = synth({ delta: { "gam-session+fixed": win, "gam-session-v3+fixed": { ...win, wanderer: -0.005 } }, out: { "gam-session-no-cov+fixed": 0.4 }, carriesFalse: 1 });
  const invalid = Object.fromEntries(SESSION_ARMS.map((a) => [a, false]));
  const v = readings({ R, cells, invalid });
  assert.equal(v.K1["gam-session+fixed"].verdict, "PASS");
  assert.equal(v.K1["gam-session-no-cov+fixed"].verdict, "FAIL");
  assert.equal(v.K2["gam-session+fixed"].veto, false);
  assert.equal(v.K2["gam-session-v3+fixed"].veto, true); assert.ok(v.K2["gam-session-v3+fixed"].losses.some((x) => x.endsWith("|wanderer")));
  assert.equal(v.K3.K3a.prefer, "gam-session+fixed");                // complex beats simpler by 0.02 in 6 of 6
  assert.equal(v.K3.K3c.prefer, "gam-session-v3+fixed");             // edpbase = v3 + 0: tie goes to v3
  assert.equal(v.K4["gam-session-no-cov+fixed"].reading, "NARROWER"); assert.equal(v.K4["gam-session+fixed"].reading, "HOLDS");
  assert.equal(v.K5["gam-session-v3+fixed"].gate, "COPY-BLOCKED"); assert.equal(v.K5["gam-session+fixed"].gate, "COPY-CLEAR");
  const v2 = readings({ R, cells, invalid: { ...invalid, "gam-session+fixed": true } });
  assert.equal(v2.K1["gam-session+fixed"].verdict, "INVALID"); assert.equal(v2.K2["gam-session+fixed"].veto, null);
  assert.equal(CRITERION_S.k4Margin, 0.05); assert.equal(CRITERION2.deltaMin, 0.01);
});

// ---------------- cells, S, pin ----------------
test("cells: criterion 3's interleave cells: 1 base (interleave:base), 26 one-at-a-time, 2 reported (outer, corner)", () => {
  const c = cellsS();
  assert.equal(c.filter((x) => x.role === "base").length, 1); assert.equal(c.find((x) => x.role === "base").name, BASE_CELL);
  assert.equal(c.filter((x) => x.role === "oat").length, 26); assert.deepEqual(c.filter((x) => x.role === "reported").map((x) => x.name).sort(), ["interleave:price-corner", "interleave:priorRateMult-outer"]);
});
test("S record: the reference arm alone at interleave:base, seeds 70001-70500 pilot, the rule gives S = 2000 (cap)", () => {
  const rec = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-20-seeds-session-s1.json"), "utf8"));
  assert.equal(rec.S, seedsFromSd(rec.sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap));
  assert.equal(rec.S, 2000); assert.equal(rec.seedList, "70001..72000"); assert.equal(rec.pilotSeeds, "70001..70500");
  assert.equal(rec.e1Hash, sha(JSON.stringify(E1))); assert.equal(rec.e3Hash, sha(JSON.stringify(E3)));
});
test("candidate pin: every pinned file is hashed, the four variants are SESSION_VARIANTS; after the freeze the tree equals the frozen pin", () => {
  const pin = candidatePin();
  assert.deepEqual(Object.keys(pin.files), PIN_FILES);
  assert.deepEqual(Object.keys(pin.variants), Object.keys(SESSION_VARIANTS));
  assert.deepEqual(SESSION_ARMS.map((a) => a.split("+")[0]), Object.keys(SESSION_VARIANTS));
  assert.equal(pin.servingMode, M.COMPOSER_SESSION.servingMode); assert.equal(pin.sessionSize, 5);
  if (/^frozen\b/.test(criterionStatusS())) { const r = pinCheck(); assert.ok(r.ok, JSON.stringify(r.bad)); }
  else assert.ok(frozenPin(CRITERION_S_FILE) === null || pinCheck().ok);
});
