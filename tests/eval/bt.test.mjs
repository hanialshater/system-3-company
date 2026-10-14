import test from "node:test";
import assert from "node:assert/strict";
import { fitBT, toRating, mulberry32, parseRecords, analyse, analyseScope, judgeAgreement, components } from "../../tools/eval/bt.mjs";

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
