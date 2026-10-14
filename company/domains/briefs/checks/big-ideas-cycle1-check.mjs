#!/usr/bin/env node
// Answer checks for the first 12 Big Ideas briefs (company/domains/briefs/big-ideas.md).
// Run: node company/domains/briefs/checks/big-ideas-cycle1-check.mjs
// Every brief's stated answer is recomputed here; a mismatch exits non-zero.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const r = (x, d = 3) => Number(x.toFixed(d));
const m32 = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

// 1. falsification-2-4-6: hidden rule "any three increasing numbers".
{
  const rule = ([a, b, c]) => a < b && b < c;
  const plus2 = ([a, b, c]) => b - a === 2 && c - b === 2;
  const tests = [[8, 10, 12], [20, 22, 24], [1, 3, 5]];
  ok("1 2-4-6: confirming tests fit both rules", tests.every((t) => rule(t) && plus2(t)), "8-10-12, 20-22-24, 1-3-5 fit 'increasing' and '+2'");
  ok("1 2-4-6: 1-2-10 fits the hidden rule", rule([1, 2, 10]) && !plus2([1, 2, 10]), "1-2-10 breaks '+2' and fits (answer: yes)");
  ok("1 2-4-6: 6-4-2 does not fit", !rule([6, 4, 2]), "decreasing triple: no");
}

// 2. deep-time: 4.54 billion years squeezed into 24 hours.
{
  const day = 86400, age = 4.54e9;
  const before = (yearsAgo) => (yearsAgo / age) * day; // seconds before midnight
  const clock = (s) => { const t = day - s; const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = Math.floor(t % 60); return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`; };
  const humans = before(300e3), dinos = before(66e6), writing = before(5200), life = before(3.7e9);
  ok("2 deep time: modern humans", humans > 5 && humans < 6.5 && clock(humans) === "23:59:54", `${r(humans, 1)} s before midnight = ${clock(humans)} (answer: about 11:59:54 pm)`);
  ok("2 deep time: other marks", clock(dinos).startsWith("23:39") && writing < 0.2, `dinosaurs end ${clock(dinos)}; writing ${r(writing, 2)} s before midnight; early life ${clock(life)}`);
}

// 3. square-cube-giants: scale every length by k.
{
  const k = 10;
  const weight = k ** 3, area = k ** 2, stress = weight / area;
  ok("3 square-cube: stress on bones at 10x", stress === 10, `weight x${weight}, bone cross-section x${area}, stress x${stress} (answer: 10 times)`);
}

// 4. dunning-kruger-artifact: self-estimates that are pure noise, grouped by true-score quartile.
{
  const rnd = m32(42), n = 1000;
  const people = Array.from({ length: n }, (_, i) => ({ actual: ((i + 0.5) / n) * 100, guess: rnd() * 100 }));
  const q = [0, 1, 2, 3].map((k) => people.slice(k * 250, (k + 1) * 250));
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const guesses = q.map((g) => mean(g.map((p) => p.guess)));
  const actuals = q.map((g) => mean(g.map((p) => p.actual)));
  ok("4 DK: bottom quartile's mean self-estimate (pure noise, seed 42)", guesses[0] > 45 && guesses[0] < 55, `actual ${actuals.map((x) => r(x, 1)).join("/")}, guessed ${guesses.map((x) => r(x, 1)).join("/")} (answer: about the 50th)`);
  // With guesses that track skill at weight w plus noise plus a +15 'better than average' shift, the bottom still overestimates most.
  const rnd2 = m32(42);
  const g2 = people.map((p) => Math.min(100, Math.max(0, 0.3 * p.actual + 0.7 * rnd2() * 100 + 15)));
  const b2 = mean(g2.slice(0, 250)), t2 = mean(g2.slice(750));
  ok("4 DK: tracking 0.3 + shift 15", b2 - actuals[0] > 40 && t2 < actuals[3], `bottom guesses ${r(b2, 1)} vs actual ${r(actuals[0], 1)}; top guesses ${r(t2, 1)} vs ${r(actuals[3], 1)}`);
}

// 5. jevons-paradox: constant-elasticity demand for light, Q = P^-e; energy = Q / efficiency; P ~ 1/efficiency.
{
  const eff = 2, q = 3; // twice as efficient; people use 3 times as much light
  const energy = q / eff;
  const e = Math.log(q) / Math.log(eff);
  ok("5 Jevons: total electricity", energy === 1.5, `light x${q}, efficiency x${eff}: energy x${energy} (elasticity ${r(e, 2)}; answer: 1.5 times as much)`);
  ok("5 Jevons: backfire only above elasticity 1", 2 ** (0.5 - 1) < 1 && 2 ** (1.5 - 1) > 1, `e = 0.5 -> x${r(2 ** -0.5, 2)}; e = 1.5 -> x${r(2 ** 0.5, 2)}`);
}

// 6. chaos-butterfly: logistic map x -> 4x(1-x), starts 0.3 and 0.3001.
{
  let a = 0.3, b = 0.3001, first = null;
  const gaps = [];
  for (let s = 1; s <= 30; s++) { a = 4 * a * (1 - a); b = 4 * b * (1 - b); gaps.push(Math.abs(a - b)); if (first === null && Math.abs(a - b) > 0.1) first = s; }
  // A 10x smaller start gap delays divergence by only ~3 steps (log2 10 = 3.3).
  const steps = (g) => { let x = 0.3, y = 0.3 + g; for (let s = 1; s < 200; s++) { x = 4 * x * (1 - x); y = 4 * y * (1 - y); if (Math.abs(x - y) > 0.1) return s; } return null; };
  ok("6 chaos: gap after 30 steps", gaps[29] > 0.05 || gaps.slice(20).some((g) => g > 0.3), `gap > 0.1 first at step ${first}; gap at step 30 = ${r(gaps[29], 3)}; max gap steps 21-30 = ${r(Math.max(...gaps.slice(20)), 3)} (answer: as far apart as two random numbers)`);
  ok("6 chaos: each 10x smaller gap buys a few steps", [1e-4, 1e-5, 1e-6, 1e-7].map(steps).every((s, i, xs) => i === 0 || (s - xs[i - 1] >= 1 && s - xs[i - 1] <= 6)), `steps to diverge for gaps 1e-4..1e-7: ${[1e-4, 1e-5, 1e-6, 1e-7].map(steps).join(", ")}`);
}

// 7. demographic-transition: deaths fall 30 -> 10 per 1,000 over years 0-50; births stay 40 until year D, then fall to 10 over 50 years.
{
  const run = (D) => { let p = 1; for (let y = 0; y < 300; y++) { const d = y < 50 ? 30 - (20 * y) / 50 : 10; const b = y < D ? 40 : y < D + 50 ? 40 - (30 * (y - D)) / 50 : 10; p *= 1 + (b - d) / 1000; } return p; };
  const p0 = run(0), p25 = run(25), p75 = run(75);
  ok("7 transition: a 50-year longer delay", p75 / p25 > 3 && p75 / p25 < 5, `final population x${r(p25, 2)} with a 25-year lag, x${r(p75, 2)} with a 75-year lag: ratio ${r(p75 / p25, 2)} (answer: more than 3 times bigger); no lag x${r(p0, 2)}`);
}

// 8. perception-inference-shadow: the two squares share one fill on the stage.
{
  const A = "#787878", B = "#787878";
  ok("8 shadow: same pixel value", A === B, `both squares fill ${A} (answer: same); the stage must draw both from one constant`);
}

// 9. controlled-experiment: 100 people with colds, a pill with no effect. Illustrative: 80% feel better within a week anyway.
{
  const rnd = m32(3);
  let pill = 0, none = 0;
  for (let i = 0; i < 100; i++) { if (rnd() < 0.8) pill++; if (rnd() < 0.8) none++; }
  ok("9 control: no-effect pill, seed 3", pill > 50 && Math.abs(pill - none) < 15, `pill group ${pill}/100 better, control ${none}/100 (answer: most of them)`);
}

// 10. price-signals: six tin users, 10 kg each, switch fully when tin costs more than their substitute.
{
  const subs = [12, 15, 20, 30, 50, 80]; // $/kg of each user's substitute
  const supply = 50; // was 60: one mine closes
  const demand = (P) => subs.filter((c) => P <= c).length * 10;
  let P = 10; while (demand(P) > supply) P += 0.5;
  const switched = subs.filter((c) => P > c);
  ok("10 prices: who cuts back", switched.length === 1 && switched[0] === 12 && P > 12 && P <= 15, `price rises to $${P}/kg; user with the $12 substitute switches; others keep 10 kg (answer: the cheapest alternative stops first)`);
}

// 11. baumol-cost-disease: factory productivity +3%/yr, wages follow, quartet productivity flat.
{
  const rel = 1.03 ** 50;
  ok("11 Baumol: relative price after 50 years", r(rel, 1) === 4.4, `1.03^50 = ${r(rel, 2)} (answer: about 4.4 times)`);
}

// 12. false-belief-theory-of-mind: the story's logic (the answer is about where Sally will look, not about children's data).
{
  const marble = { start: "basket", movedTo: "box", sallySawMove: false };
  const sallyLooks = marble.sallySawMove ? marble.movedTo : marble.start;
  ok("12 false belief: where Sally looks", sallyLooks === "basket", `Sally did not see the move, so she looks in the ${sallyLooks}`);
}

console.log(fail ? `\n${fail} check(s) failed` : "\nall big-ideas brief answers check");
process.exit(fail ? 1 : 0);
