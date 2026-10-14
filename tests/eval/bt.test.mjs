import test from "node:test";
import assert from "node:assert/strict";
import { fitBT, toRating, mulberry32, parseRecords, analyse, analyseScope, judgeAgreement, components, judgementKey, parseExclusions, parseFlags, OVERALL } from "../../tools/eval/bt.mjs";

const TRUE = { "a@v1": 3, "b@v1": 1, "c@v1": 0.3, "d@v1": 0.1 }; // true strengths
const items = Object.keys(TRUE);

function synth(perPair, seed = 1, tieRate = 0) {
  const rng = mulberry32(seed);
  const out = [];
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++)
      for (let k = 0; k < perPair; k++) {
        const pa = TRUE[items[i]] / (TRUE[items[i]] + TRUE[items[j]]);
        const u = rng();
        out.push({ a: items[i], b: items[j], winner: u < tieRate ? "tie" : rng() < pa ? "a" : "b" });
      }
  return out;
}

test("recovers known strengths (log-ratios) from many synthetic comparisons", () => {
  const recs = synth(2000);
  const fit = fitBT(recs, items);
  for (const [x, y] of [["a@v1", "b@v1"], ["b@v1", "c@v1"], ["c@v1", "d@v1"], ["a@v1", "d@v1"]]) {
    const got = Math.log(fit.get(x) / fit.get(y));
    const want = Math.log(TRUE[x] / TRUE[y]);
    assert.ok(Math.abs(got - want) < 0.1, `${x}/${y}: ${got} vs ${want}`);
  }
});

test("a 400-point gap in rating is a 10x strength ratio", () => {
  assert.ok(Math.abs(toRating(10) - toRating(1) - 400) < 1e-9);
});

test("ties count as half a win: all-tie data leaves items equal", () => {
  const recs = Array.from({ length: 10 }, () => ({ a: "x@v1", b: "y@v1", winner: "tie" }));
  const fit = fitBT(recs, ["x@v1", "y@v1"]);
  assert.ok(Math.abs(fit.get("x@v1") - fit.get("y@v1")) < 1e-9);
  assert.ok(Math.abs(fit.get("x@v1") - 1) < 1e-6, "tie vs the reference at strength 1 keeps both at 1");
});

test("ties pull a winner back toward its opponent", () => {
  const wins = Array.from({ length: 10 }, () => ({ a: "x@v1", b: "y@v1", winner: "a" }));
  const mixed = [...wins.slice(0, 5), ...wins.slice(5).map((r) => ({ ...r, winner: "tie" }))];
  const f1 = fitBT(wins, ["x@v1", "y@v1"]);
  const f2 = fitBT(mixed, ["x@v1", "y@v1"]);
  assert.ok(f2.get("x@v1") / f2.get("y@v1") < f1.get("x@v1") / f1.get("y@v1"));
});

test("prior: an undefeated item converges to a finite strength that grows with its record", () => {
  const rec = (n) => Array.from({ length: n }, (_, i) => ({ a: "w@v1", b: i % 2 ? "p@v1" : "q@v1", winner: "a" })).concat([{ a: "p@v1", b: "q@v1", winner: "a" }, { a: "q@v1", b: "p@v1", winner: "a" }]);
  const f5 = fitBT(rec(5), ["w@v1", "p@v1", "q@v1"]);
  const f50 = fitBT(rec(50), ["w@v1", "p@v1", "q@v1"]);
  for (const f of [f5, f50]) for (const v of f.values()) assert.ok(Number.isFinite(v) && v > 0);
  assert.ok(f5.get("w@v1") > f5.get("p@v1"));
  assert.ok(f50.get("w@v1") > f5.get("w@v1"));
  assert.ok(f50.get("w@v1") < 1e4);
});

test("prior: a disconnected pair still gets finite strengths and is flagged", () => {
  const recs = [
    ...synth(5).slice(0, 12),
    { a: "z1@v1", b: "z2@v1", winner: "a" },
  ];
  const all = [...items, "z1@v1", "z2@v1"];
  for (const v of fitBT(recs, all).values()) assert.ok(Number.isFinite(v) && v > 0);
  const comp = components(recs, all);
  assert.equal(comp.get("a@v1"), 0);
  assert.notEqual(comp.get("z1@v1"), 0);
});

test("deterministic with a fixed seed, different with another", () => {
  const recs = synth(8, 3, 0.1);
  const r1 = analyseScope(recs, { seed: 42, resamples: 50 });
  const r2 = analyseScope(recs, { seed: 42, resamples: 50 });
  const r3 = analyseScope(recs, { seed: 43, resamples: 50 });
  assert.deepEqual(r1, r2);
  assert.notDeepEqual(r1.map((r) => [r.lo, r.hi]), r3.map((r) => [r.lo, r.hi]));
});

test("ratings average 1000, intervals bracket the rating, order follows strength", () => {
  const rows = analyseScope(synth(30, 5), { seed: 1, resamples: 100 });
  const mean = rows.reduce((s, r) => s + r.rating, 0) / rows.length;
  assert.ok(Math.abs(mean - 1000) < 0.5);
  for (const r of rows) assert.ok(r.lo <= r.rating + 25 && r.hi >= r.rating - 25);
  assert.deepEqual(rows.map((r) => r.item), items);
  assert.equal(rows[0].opponents, 3);
});

test("validation rejects unknown criterion, malformed lines, a===b, bad winner, duplicate id", () => {
  const good = { id: "r-1", date: "2026-10-14", judge: "j", criterion: "clarity", a: "x@v1", b: "y@v1", winner: "a" };
  const text = [
    JSON.stringify(good),
    JSON.stringify({ ...good, id: "r-2", criterion: "vibes" }),
    "{not json",
    JSON.stringify({ ...good, id: "r-3", b: "x@v1" }),
    JSON.stringify({ ...good, id: "r-4", winner: "draw" }),
    JSON.stringify({ ...good }),
    "",
  ].join("\n");
  const { records, errors } = parseRecords([{ name: "t.jsonl", text }], ["clarity"]);
  assert.equal(records.length, 1);
  assert.equal(errors.length, 5);
  assert.match(errors.join("\n"), /unknown criterion/);
  assert.match(errors.join("\n"), /not valid JSON/);
  assert.match(errors.join("\n"), /same item/);
});

test("judge agreement counts only pairs judged by two judges, order-insensitive", () => {
  const base = { date: "2026-10-14", criterion: "clarity" };
  const recs = [
    { ...base, id: "1", judge: "j1", a: "x@v1", b: "y@v1", winner: "a" },
    { ...base, id: "2", judge: "j2", a: "y@v1", b: "x@v1", winner: "b" }, // same verdict, flipped sides
    { ...base, id: "3", judge: "j1", a: "x@v1", b: "z@v1", winner: "a" },
    { ...base, id: "4", judge: "j2", a: "x@v1", b: "z@v1", winner: "b" }, // disagree
    { ...base, id: "5", judge: "j1", a: "y@v1", b: "z@v1", winner: "a" }, // only one judge
  ];
  const ag = judgeAgreement(recs);
  assert.equal(ag.comparable, 2);
  assert.equal(ag.agree, 1);
  assert.equal(ag.rate, 0.5);
});

test("analyse with no records gives an empty, valid result", () => {
  const out = analyse({ files: [], criteria: [{ id: "clarity", name: "Clarity", question: "?" }] });
  assert.equal(out.totalRecords, 0);
  assert.deepEqual(out.rows, []);
  assert.equal(out.lastRecordDate, null);
});

// ---------- E2: overall is diagnostic and resampled by judgement ----------
const CRIT = [
  { id: "learning", name: "Learning", question: "?" },
  { id: "trust", name: "Trust", question: "?" },
];
// Each judgement (judge x shown pair) writes one line per criterion.
function roundFile(name = "2026-10-14-rt.jsonl") {
  const lines = [];
  let n = 0;
  const pairs = [["x@v1", "y@v1", "j1"], ["y@v1", "z@v1", "j2"], ["z@v1", "x@v1", "j3"], ["x@v1", "y@v1", "j4"], ["x@v1", "z@v1", "j5"]];
  for (const [a, b, judge] of pairs)
    for (const c of CRIT) lines.push(JSON.stringify({ id: `rt-${++n}`, date: "2026-10-14", judge, criterion: c.id, a, b, winner: n % 3 ? "a" : "tie", reason: "r", artifacts: [], blind: true }));
  return [{ name, text: lines.join("\n") + "\n" }];
}

test("E2: overall is a diagnostic scope, not a criterion, with no suggestions", () => {
  const out = analyse({ files: roundFile(), criteria: CRIT, resamples: 20 });
  assert.deepEqual(out.criteria.map((c) => c.id), ["learning", "trust"]);
  assert.deepEqual(out.diagnosticScopes, [OVERALL]);
  const ov = out.scopes.find((s) => s.id === OVERALL);
  assert.equal(ov.diagnostic, true);
  assert.equal(ov.resampleUnit, "judgement");
  assert.equal(ov.records, 10);
  assert.equal(ov.judgements, 5);
  assert.match(ov.note, /Diagnostic only/);
  for (const s of out.scopes.filter((x) => x.id !== OVERALL)) {
    assert.equal(s.diagnostic, false);
    assert.equal(s.resampleUnit, "record");
  }
  assert.equal(out.suggestions.filter((s) => s.criterion === OVERALL).length, 0);
  assert.ok(out.rows.some((r) => r.criterion === OVERALL), "overall rows still computed for diagnostics");
});

test("E2: judgement key groups one judge's lines on one shown pair within a run", () => {
  const r = { id: "round-1-7", judge: "judge-2", a: "x@v1", b: "y@v1" };
  assert.equal(judgementKey(r), judgementKey({ ...r, id: "round-1-12" }));
  assert.notEqual(judgementKey(r), judgementKey({ ...r, id: "round-2-7" }));
  assert.notEqual(judgementKey(r), judgementKey({ ...r, judge: "judge-3" }));
  assert.notEqual(judgementKey(r), judgementKey({ ...r, a: "y@v1", b: "x@v1" }));
});

test("E2: cluster bootstrap keeps correlated lines together, so duplicated lines do not shrink the interval", () => {
  // Every comparison written 6x inside one cluster (like one judge's lines on one pair). Resampling
  // the copies as independent lines must understate the spread compared with resampling clusters.
  const single = synth(3, 9).map((r, i) => ({ ...r, id: `s-${i}`, judge: `j${i}` }));
  const six = single.flatMap((r) => Array.from({ length: 6 }, () => r));
  const width = (rows) => rows.reduce((s, r) => s + (r.hi - r.lo), 0);
  const clustered = analyseScope(six, { seed: 5, resamples: 100, cluster: (r) => r.id });
  const lines = analyseScope(six, { seed: 5, resamples: 100 });
  assert.ok(width(lines) < width(clustered), `line bootstrap ${width(lines)} should be narrower than cluster ${width(clustered)}`);
  assert.deepEqual(clustered.map((r) => r.rating), lines.map((r) => r.rating), "point estimates do not depend on the resampling unit");
});

test("E2: per-criterion fits are unchanged by the overall change (no cluster = record bootstrap)", () => {
  const recs = synth(8, 3, 0.1).map((r, i) => ({ ...r, id: `q-${i}`, judge: "j" }));
  assert.deepEqual(analyseScope(recs, { seed: 42, resamples: 30 }), analyseScope(recs, { seed: 42, resamples: 30, cluster: null }));
});

// ---------- E3: exclusions ----------
test("E3: excluded ids leave the fit but stay counted and listed", () => {
  const files = roundFile();
  const base = analyse({ files, criteria: CRIT, resamples: 20 });
  const out = analyse({ files, criteria: CRIT, resamples: 20, exclusions: { exclude: [{ id: "rt-2", reason: "judge saw the key", round: "rt" }] } });
  assert.equal(out.totalRecords, 10);
  assert.equal(out.fittedRecords, 9);
  assert.deepEqual(out.exclusions.applied, [{ id: "rt-2", reason: "judge saw the key", round: "rt", criterion: "trust", judge: "j1" }]);
  assert.equal(out.scopes.find((s) => s.id === "trust").records, 4);
  assert.equal(out.scopes.find((s) => s.id === "trust").excluded, 1);
  assert.equal(out.scopes.find((s) => s.id === "learning").records, 5);
  assert.equal(out.scopes.find((s) => s.id === OVERALL).records, 9);
  assert.notDeepEqual(
    out.rows.filter((r) => r.criterion === "trust").map((r) => r.rating),
    base.rows.filter((r) => r.criterion === "trust").map((r) => r.rating),
  );
  assert.deepEqual(out.errors, []);
});

test("E3: an exclusion without a reason is not applied; unknown ids are reported", () => {
  const { valid, invalid } = parseExclusions({ exclude: [{ id: "rt-1" }, { id: "rt-1", reason: " " }, { id: "rt-3", reason: "ok" }, { id: "rt-3", reason: "again" }] });
  assert.deepEqual(valid.map((e) => e.id), ["rt-3"]);
  assert.equal(invalid.length, 3);
  const out = analyse({ files: roundFile(), criteria: CRIT, resamples: 5, exclusions: { exclude: [{ id: "nope-9", reason: "x" }, { id: "rt-1" }] } });
  assert.equal(out.fittedRecords, 10);
  assert.deepEqual(out.exclusions.unmatched, ["nope-9"]);
  assert.equal(out.exclusions.invalid.length, 1);
  assert.equal(out.warnings.length, 2);
});

test("E3: empty or missing exclusions file changes nothing", () => {
  const a = analyse({ files: roundFile(), criteria: CRIT, resamples: 10 });
  const b = analyse({ files: roundFile(), criteria: CRIT, resamples: 10, exclusions: { exclude: [] } });
  assert.deepEqual(a.rows, b.rows);
  assert.deepEqual(b.exclusions, { applied: [], unmatched: [], invalid: [] });
});

// ---------- E4: flags ----------
test("E4: flags are attached to their criterion scope and listed top-level", () => {
  const flags = { flags: [{ criterion: "trust", text: "possibly anchored on claim counts (round 1)", round: "rt", records: "rt trust lines", extra: "dropped" }] };
  const out = analyse({ files: roundFile(), criteria: CRIT, resamples: 5, flags });
  assert.deepEqual(out.flags, [{ criterion: "trust", text: "possibly anchored on claim counts (round 1)", records: "rt trust lines", round: "rt" }]);
  assert.equal(out.scopes.find((s) => s.id === "trust").flags.length, 1);
  assert.equal(out.scopes.find((s) => s.id === "learning").flags.length, 0);
});

test("E4: flags for unknown criteria or without text are rejected as warnings", () => {
  const { valid, invalid } = parseFlags({ flags: [{ criterion: "vibes", text: "x" }, { criterion: "trust" }, { criterion: "trust", text: "ok" }] }, ["learning", "trust", OVERALL]);
  assert.equal(valid.length, 1);
  assert.equal(invalid.length, 2);
  const out = analyse({ files: roundFile(), criteria: CRIT, resamples: 5, flags: { flags: [{ criterion: "vibes", text: "x" }] } });
  assert.deepEqual(out.flags, []);
  assert.match(out.warnings.join("\n"), /unknown criterion/);
});

test("E4: scope summary carries tie rate and first-shown (A) share", () => {
  const out = analyse({ files: roundFile(), criteria: CRIT, resamples: 5 });
  const ov = out.scopes.find((s) => s.id === OVERALL);
  assert.equal(ov.ties, 3); // ids 3, 6, 9 are ties
  assert.equal(ov.tieRate, 0.3);
  assert.equal(ov.aWinRate, 1);
});
