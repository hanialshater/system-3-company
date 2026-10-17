// Criterion 3b tests (K5). node --test company/personalization/eval/harness/c3b/tests3b.test.mjs  (about 1-2 min: the
// plumbing run and the cross-process checks spawn Node processes). They hold before and after the freeze (lock tests use
// temporary copies) and they never run or read a non-fixture candidate.
// owner: personalization-eval (Uma) · run: eval-k5-1017 · criterion 3b §5
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, CRITERION2 } from "../c2/world2.mjs";
import { seedsFromSd } from "../c2/scorer2.mjs";
import { E3 } from "../c3/world3.mjs";
import { t5Static3, sampleReachableInput } from "../c3/checks3.mjs";
import * as H from "./harness3b.mjs";
import * as K from "./checks3b.mjs";
import { loadCandidate } from "./slot.mjs";
import { copyCheck, corpusText, lex, COPY } from "./copy-check.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const TMP = mkdtempSync(join(tmpdir(), "c3b-test-"));
const FX_SRC = readFileSync(H.FIXTURE, "utf8");
const variant = async (name, edit) => { const p = join(TMP, `${name}.ts`); writeFileSync(p, edit(FX_SRC)); return { path: p, cand: await loadCandidate(p) }; };
const input0 = () => sampleReachableInput(PERSONAS[1], 40001).input;      // single-subject-crammer
const inputOther = () => sampleReachableInput(PERSONAS[3], 40002).input;  // returning-expert

// ---------------- the judge ----------------
test("3b-ID0 readout 3's 16 file hashes, criterion 3's sha256 and the catalogue hash", () => { const r = K.identityFiles3b(); assert.ok(r.ok, JSON.stringify(r)); assert.equal(r.files, 16); });
test("3b-ID1 the slot is criterion 3's episode: fixture = reference arm, oracle in slot = reachable+fixed (144 pairs)", async () => {
  const r = await K.identitySlot({ fixturePath: H.FIXTURE }); assert.ok(r.ok, JSON.stringify(r)); assert.equal(r.n, 144);
});
test("T5c criterion 3's static check, unchanged", () => assert.ok(t5Static3().ok));
test("cells: 40; roles 1 base, 27 one-at-a-time (26 interleave + first:base), 12 reported; base interleave:base", () => {
  const c = H.cells3b();
  assert.equal(c.length, 40);
  const by = (r) => c.filter((x) => x.role === r);
  assert.deepEqual([by("base").length, by("one-at-a-time").length, by("reported").length], [1, 27, 12]);
  assert.equal(by("base")[0].name, "interleave:base");
  assert.ok(by("one-at-a-time").some((x) => x.name === "first:base"));
  assert.equal(by("one-at-a-time").filter((x) => x.placement === "interleave").length, 26);
  assert.ok(by("reported").every((x) => x.placement === "first" || x.kind !== "one-at-a-time"));
});

// ---------------- the lock ----------------
test("lock: a non-fixture candidate needs status frozen, its sha256 and an existing V3 record; fixtures always; oracle only frozen", () => {
  const cand = join(TMP, "lock-cand.ts"); copyFileSync(H.FIXTURE, cand);
  const h = sha(readFileSync(cand));
  const doc = (status, hash, v3) => { const p = join(TMP, `c-${Math.random().toString(36).slice(2)}.md`); writeFileSync(p, `# x\nstatus: ${status}\ncandidate sha256: ${hash}\nV3 record: ${v3}\n`); return p; };
  const v3 = "company/personalization/eval/2026-10-17-criterion-3.md"; // any existing file stands in for the V3 record
  for (const d of [doc("draft (unfrozen)", h, v3), doc("frozen", "(empty)", v3), doc("frozen", "0".repeat(64), v3), doc("frozen", h, "(empty)"), doc("frozen", h, "company/nope/missing.md")])
    assert.throws(() => H.assertCandidateAllowed(cand, d), /lock/);
  assert.doesNotThrow(() => H.assertCandidateAllowed(cand, doc("frozen", h, v3)));
  assert.doesNotThrow(() => H.assertCandidateAllowed(H.FIXTURE, doc("draft (unfrozen)", "(empty)", "(empty)")));
  assert.throws(() => H.assertOracleAllowed(doc("draft", "", "")), /lock/);
  assert.doesNotThrow(() => H.assertOracleAllowed(doc("frozen", "", "")));
  assert.match(H.header3b().status, /^(draft|frozen)\b/);
});

// ---------------- validity V1-V9 ----------------
test("V1-V8: the fixture passes every check on a real input", async () => {
  const fx = await loadCandidate(H.FIXTURE), fresh = await loadCandidate(H.FIXTURE, { fresh: "t" });
  assert.deepEqual(K.v1Static(fx.source), { ok: true, problems: [] });
  const r = K.callChecks(fx, input0(), { others: [inputOther()], fresh });
  assert.ok(r.ok, JSON.stringify(r));
});
test("V1-V8: each bad fixture fails its own check", async () => {
  const inp = input0(), oth = inputOther();
  assert.notEqual(inp.history.length, oth.history.length); // the V7 state fixture keys on history length
  const R = "export function rank(input: Input): Ranked[] {";
  const cases = [
    ["random", (s) => s.replace(R, `${R}\n  if (Math.random() < 2) return catalogueOrder(input.dims).filter((x) => !input.history.some((h) => h.slug === x)).map((slug) => ({ slug, value: Math.random(), reason: "r" })).sort((a, b) => a.value - b.value);`), ["V1", "V2"]],
    ["import", (s) => `import type { Nothing } from "./nothing.ts";\n${s}`, ["V1"]],
    ["date", (s) => s.replace(R, `${R}\n  const t0 = Date.now(); void t0;`), ["V1"]],
    ["state", (s) => s.replace(R, `let LAST: number | null = null;\n${R}\n  const flip = LAST !== null && LAST !== input.history.length; LAST = input.history.length;\n  if (flip) return rankPlain(input).reverse();\n  return rankPlain(input);\n}\nfunction rankPlain(input: Input): Ranked[] {`), ["V7"]],
    ["mutate", (s) => s.replace(R, `${R}\n  (input.history as Item[]).sort((a, b) => (a.slug < b.slug ? -1 : 1));`), ["V4"]],
    ["sessioncount", (s) => s.replace(R, `${R}\n  if ((input as any).sessionCount !== undefined) return rankPlain(input).reverse();\n  return rankPlain(input);\n}\nfunction rankPlain(input: Input): Ranked[] {`), ["V5"]],
    ["itemdwell", (s) => s.replace(R, `${R}\n  if (input.history.some((h: any) => h.dwell !== undefined)) return rankPlain(input).reverse();\n  return rankPlain(input);\n}\nfunction rankPlain(input: Input): Ranked[] {`), ["V5"]],
    ["clock", (s) => s.replace(R, `${R}\n  if (input.now % 2 === 1) return rankPlain(input).reverse();\n  return rankPlain(input);\n}\nfunction rankPlain(input: Input): Ranked[] {`), ["V6"]],
    ["decide", (s) => s.replace("return r.length ? r[0] : null;", "return r.length > 1 ? r[1] : null;"), ["V8"]],
    ["missing", (s) => s.replace(`map((slug) => ({ slug, value: 0, reason: "default-order" }));`, `map((slug) => ({ slug, value: 0, reason: "default-order" })).slice(1);`), ["V8"]],
    ["duerevisit", (s) => s.replace(`reason: "default-order"`, `reason: "due-revisit"`), ["V8"]],
  ];
  for (const [name, edit, fails] of cases) {
    const { cand } = await variant(name, edit);
    const fresh = await loadCandidate(join(TMP, `${name}.ts`), { fresh: name });
    const r = K.callChecks(cand, inp, { others: [oth], fresh });
    const st = K.v1Static(cand.source);
    for (const f of fails) {
      if (f === "V1") assert.equal(st.ok, false, `${name}: V1 should fail`);
      else assert.equal(r[f], false, `${name}: ${f} should fail (${JSON.stringify({ ...r, notes: r.notes })})`);
    }
    if (!fails.includes("V1")) assert.ok(st.ok, `${name}: V1 should pass (${st.problems})`);
  }
});
test("V3: the fixture replays across processes (call level and episode level)", async () => {
  const fx = await loadCandidate(H.FIXTURE);
  const r = K.v3CrossProcess(fx, H.FIXTURE, [input0(), inputOther()]); assert.ok(r.ok, JSON.stringify(r));
  const e = K.v3Episode({ candidatePath: H.FIXTURE, persona: "wanderer", seed: 40001, cell: "first:base" }); assert.ok(e.ok, JSON.stringify(e));
});
test("V9: the hash check", async () => {
  const fx = await loadCandidate(H.FIXTURE);
  assert.ok(K.v9Hash(fx, sha(FX_SRC)).ok); assert.equal(K.v9Hash(fx, "0".repeat(64)).ok, false); assert.equal(K.v9Hash(fx, null).ok, false);
});

// ---------------- V10 copy check: thresholds and calibration (criterion 3b §4.2) ----------------
test("V10: thresholds as criterion 3b §4.2; controls give the table's results", () => {
  assert.deepEqual(COPY, { m1: 3, m2: 12, m3: 4, shingle: 6, minName: 4 });
  const root = H.ROOT, corpus = corpusText(root), oracle = readFileSync(K.ORACLE_FILE, "utf8");
  const chk = (src) => copyCheck(src, oracle, corpus);
  const strip = (s) => s.split("\n").map((l) => l.replace(/\/\/.*$/, "")).join("\n").replace(/\/\*[\s\S]*?\*\//g, "");
  const BUILT = new Set(["Math", "Object", "Array", "Set", "Map", "max", "min", "exp", "log", "sqrt", "reduce", "map", "filter", "forEach", "push", "has", "get", "set", "add", "delete", "keys", "values", "entries", "length", "includes", "slice", "localeCompare", "sort", "shift", "some", "from", "Infinity", "NaN", "split"]);
  const rename = (s, which) => { let k = 0; const m = new Map(which.map((w) => [w, `v${k++}x`])); return s.replace(/[A-Za-z_$][A-Za-z0-9_$]*/g, (w) => m.get(w) ?? w); };
  const ids = [...new Set(lex(oracle).tokens.filter((t) => /^[A-Za-z_$]/.test(t)))];
  const nonCorpus = chk(oracle).m3.names;
  const step1 = strip(oracle.slice(oracle.indexOf("    // 1. pi_d posterior"), oracle.indexOf("    // 2-4.")));
  const positive = { P1: oracle, P2: rename(oracle, nonCorpus), P3: strip(oracle), P5: FX_SRC + "\n" + step1, P6: rename(strip(oracle), nonCorpus),
    P7: FX_SRC + "\n" + rename(step1, ["seen", "logL", "firstOf", "byConcept", "pb", "pr", "domains", "grid"]) };
  for (const [k, s] of Object.entries(positive)) assert.equal(chk(s).copy, true, `${k} should be a finding`);
  assert.equal(chk(rename(strip(oracle), ids.filter((w) => !BUILT.has(w)))).copy, false, "P4 (the stated limit) passes");
  for (const f of ["company/personalization/model/sim/review-timing.ts", "company/personalization/model/sim/composer.ts", "company/personalization/model/model.ts",
    "company/personalization/model/sim/learner.ts", "company/personalization/model/review-timing-curves.ts", "company/personalization/eval/harness/c3b/fixtures/fixture-default-order.ts",
    "company/personalization/eval/harness/c2/harness2.mjs", "company/personalization/eval/harness/c2/learner2.mjs"])
    assert.equal(chk(readFileSync(join(root, f), "utf8")).copy, false, `${f} should be clean`);
  const l3 = chk(readFileSync(join(root, "company/personalization/eval/harness/c3/learner3.mjs"), "utf8"));
  assert.equal(l3.m1.count, 3); assert.ok(l3.m2.length < COPY.m2 && l3.m3.count < COPY.m3); // same run's header line only
  assert.ok(K.v10Copy(FX_SRC).ok);
});

// ---------------- §4.3 input facts and probes ----------------
test("§4.3 input facts: K-a no (key order = catalogue lesson order; default order derivable), K-b misconceptionStrength, K-c rho 0.5, K-d pilot only", async () => {
  for (const seed of [40001, 1001]) {
    const f = K.inputFacts(sampleReachableInput(PERSONAS[0], seed).input);
    assert.equal(f.Ka_keyOrderIsDefaultOrder, false); assert.equal(f.Ka_firstDifferenceAt, 1);
    assert.equal(f.Ka_keyOrderIsCatalogueLessonOrder, true); assert.equal(f.Ka_defaultOrderDerivableFromDims, true);
    assert.equal(f.Kb_ratingField, "misconceptionStrength"); assert.deepEqual(f.Kb_ratingValues, [1, 2, 3]); assert.ok(f.Kb_everyLessonHasIt);
    assert.equal(f.Kc_rho, 0.5); assert.equal(f.Kd_pilotOnly, true); assert.equal(f.Kd_lessons, 230);
  }
  const fx = await loadCandidate(H.FIXTURE), inp = input0();
  const t = K.tieOrderProbe(fx, inp); assert.ok(t.tiedPairs > 0); assert.equal(t.inDefaultOrder, t.tiedPairs);
  assert.equal(K.ratingProbe(fx, inp).changes, false);
});

// ---------------- S ----------------
test("S record: reference arm alone at interleave:base, 3b's block, this E1, E3 and catalogue", () => {
  const rec = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-17-seeds-c3b-k5.json"), "utf8"));
  const h = (o) => sha(JSON.stringify(o));
  assert.equal(rec.e1Hash, h(E1)); assert.equal(rec.e3Hash, h(E3)); assert.equal(rec.catalogSha256, H.CATALOG_SHA256_C3);
  assert.equal(rec.cellName, H.BASE_CELL_3B); assert.equal(rec.pilotSeeds, "40001..40500");
  assert.equal(rec.S, seedsFromSd(rec.sdMax, CRITERION2.deltaMin, CRITERION2.seeds.floor, CRITERION2.seeds.cap));
  assert.equal(rec.S, 2000); assert.equal(rec.seedList, "40001..42000");
});

// ---------------- plumbing ----------------
test("plumbing: run3b --plumbing (fixture = reference arm): every Δ 0, validity ok, outcome FAIL with 0 wins, tables print", () => {
  const out = join(TMP, "plumb");
  const r = spawnSync(process.execPath, [join(HERE, "run3b.mjs"), "--plumbing", "--seeds=2", "--jobs=4", `--out=${out}`], { encoding: "utf8", env: { ...process.env, NODE_NO_WARNINGS: "1" }, timeout: 600_000 });
  assert.equal(r.status, 0, r.stderr);
  const v = JSON.parse(readFileSync(join(out, "verdicts.json"), "utf8"));
  assert.ok(v.judge.id0.ok && v.judge.id1.ok && v.judge.t5c.ok);
  assert.equal(v.candidateInvalid, false, JSON.stringify(v.validity).slice(0, 500));
  assert.equal(Object.keys(v.pair.byCell).length, 40);
  for (const j of Object.values(v.pair.byCell)) for (const row of j.rows) { assert.equal(row.R.mean, 0); for (const g of Object.values(row.g)) assert.equal(g.mean, 0); }
  for (const j of Object.values(v.reported.candidateVsOracle)) for (const row of j.rows) assert.equal(row.R.mean, 0);
  assert.equal(v.pair.outcome.verdict, "FAIL");
  assert.equal(v.validity.inputFacts.length, 12); assert.ok(v.validity.inputFacts.every((x) => x.Ka_keyOrderIsDefaultOrder === false && x.Kd_pilotOnly));
  const t = spawnSync(process.execPath, [join(HERE, "readout3b-tables.mjs"), `--dir=${out}`], { encoding: "utf8" });
  assert.equal(t.status, 0, t.stderr); assert.match(t.stdout, /## Outcome: candidate\+fixed vs default-order\+fixed: \*\*FAIL\*\*/);
});
