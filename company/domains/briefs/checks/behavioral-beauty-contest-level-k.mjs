#!/usr/bin/env node
// Check script for behavioral brief 3, beauty-contest-level-k (company/domains/briefs/behavioral.md).
// Run: node company/domains/briefs/checks/behavioral-beauty-contest-level-k.mjs
// Written by cm-behavioral (Rasmus), 2026-10-15. No network, no Math.random: the crowd comes from mulberry32,
// defined below. Prints every number the learner sees (crowd rule, seed, crowd average and target with the
// learner's own guess included, the learner's miss, the 0 player's miss, how many simulated guesses were
// closer), for EVERY guess the slider allows (integers 0-100), and checks the predict answer and the reveal.
// Boundary conditions it enforces (cm-economics E8, signed with changes 2026-10-15):
//   - the crowd rule is given as shares and guesses ("40% near 33"), labelled "one step" / "two steps";
//     the stage never derives 33 or 22 from 50, and the ceilings 66.7, 44.4, ... are not printed (E8 (3), change 1);
//   - every number in the reveal comes from this script and includes the learner's guess (E8 change 2);
//   - the predict options are 0 / about 23 / about 35, not the 33 / 22 / 0 ladder (E8 (2)).
// A mismatch exits non-zero.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const words = (s) => s.trim().split(/\s+/).length;
const r1 = (x) => (Math.round(x * 10) / 10).toFixed(1);

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- The crowd rule (shown on the stage as shares and guesses) ----------
const N = 100;                        // simulated players; the learner is player 101
const RULE = [
  { share: 30, label: "random", lo: 0, hi: 100 },     // "30% guess at random"
  { share: 40, label: "one step", lo: 30, hi: 36 },   // "40% near 33 (one step)"
  { share: 30, label: "two steps", lo: 19, hi: 25 },  // "30% near 22 (two steps)"
];
const crowdFor = (seed) => {
  const r = mulberry32(seed), g = [];
  for (const k of RULE) for (let i = 0; i < k.share; i++) g.push(k.lo + Math.floor(r() * (k.hi - k.lo + 1)));
  return g;
};
const EXPECTED = RULE.reduce((s, k) => s + (k.share / 100) * ((k.lo + k.hi) / 2), 0); // 34.8
ok("rule shares sum to 100 players", RULE.reduce((s, k) => s + k.share, 0) === N, RULE.map((k) => `${k.share}% ${k.label} (${k.lo}-${k.hi})`).join(", "));
console.log(`Rule's expected crowd average: ${EXPECTED.toFixed(1)}; two thirds of it: ${(EXPECTED * 2 / 3).toFixed(1)}`);

// ---------- Seed: the first seed from 1 up whose run sits within 0.5 of the rule's expected average ----------
// Disclosed in the brief: seed 7 (the comparison draft's) averages 33.2, which sits on the ladder's "33"; the brief
// takes a typical run of the rule instead, by this stated test, and shows that seed on the stage.
const seed7 = crowdFor(7).reduce((a, b) => a + b, 0) / N;
let SEED = 0;
for (let s = 1; s <= 100 && !SEED; s++) if (Math.abs(crowdFor(s).reduce((a, b) => a + b, 0) / N - EXPECTED) <= 0.5) SEED = s;
const crowd = crowdFor(SEED);
const S = crowd.reduce((a, b) => a + b, 0);
console.log(`Seed 7 (comparison draft) crowd average: ${seed7.toFixed(2)} (not used)`);
ok("seed chosen by the stated test", SEED === 2, `seed ${SEED}: crowd of ${N} sums to ${S}, average ${(S / N).toFixed(2)} (rule's expectation ${EXPECTED.toFixed(1)})`);
const again = crowdFor(SEED).reduce((a, b) => a + b, 0);
ok("the run reproduces from the seed", again === S, `second run sums to ${again}`);
for (const k of RULE) {
  const off = RULE.slice(0, RULE.indexOf(k)).reduce((s, j) => s + j.share, 0);
  const part = crowd.slice(off, off + k.share);
  console.log(`  ${k.label}: ${part.length} guesses, min ${Math.min(...part)}, max ${Math.max(...part)}, mean ${(part.reduce((a, b) => a + b, 0) / part.length).toFixed(1)}`);
}

// ---------- Type (a)/(c): target, with the learner's guess included ----------
const avg = (g) => (S + g) / (N + 1);
const target = (g) => (2 / 3) * avg(g);
const miss = (g) => Math.abs(g - target(g));
const closer = (g) => crowd.filter((c) => Math.abs(c - target(g)) < miss(g)).length;
// The learner's best guess solves g = (2/3)(S + g)/101, i.e. g* = 2S/301.
const gStar = (2 * S) / (3 * (N + 1) - 2);
let bestInt = 0; for (let g = 0; g <= 100; g++) if (miss(g) < miss(bestInt)) bestInt = g;
ok("(a) best guess against this crowd", Math.abs(bestInt - gStar) <= 0.5, `g* = 2S/301 = ${gStar.toFixed(2)}; best whole-number guess ${bestInt}, which misses by ${miss(bestInt).toFixed(2)}`);
ok("(a) averages over the guess range are 'about 35', targets 'about 23'",
  Math.round(avg(0)) >= 34 && Math.round(avg(100)) <= 35 && Math.round(target(0)) === 23 && Math.round(target(97)) === 23,
  `guess 0: average ${r1(avg(0))}, target ${r1(target(0))}; guess 100: average ${r1(avg(100))}, target ${r1(target(100))}`);
ok("(a) 0, the equilibrium, loses to this crowd", closer(0) > 0, `with a guess of 0 the target is ${r1(target(0))}; ${closer(0)} simulated guesses are closer`);

// ---------- Predict ----------
const predict = {
  q: "Against this simulated crowd, which guess lands closest to two thirds of the average, your guess included?",
  options: [["0, the equilibrium guess", 0], ["About 23, between the other two", 23], ["About 35, the crowd's average", 35]],
  answer: 1,
};
ok("predict question <= 25 words", words(predict.q) <= 25, `${words(predict.q)} words: "${predict.q}"`);
const optMiss = predict.options.map(([, g]) => miss(g));
ok("predict answer: 'about 23' misses least when played", optMiss.indexOf(Math.min(...optMiss)) === predict.answer,
  predict.options.map(([t, g], i) => `${t}: target ${r1(target(g))}, miss ${r1(optMiss[i])}`).join("; "));
// Equal precision (cm-behavioral, 2026-10-16, W-1267): every option carries a gloss; B's says only where it sits.
ok("predict options: each carries a gloss, and B's gloss is true", predict.options.every(([t]) => /, /.test(t)) && predict.options[0][1] < predict.options[1][1] && predict.options[1][1] < predict.options[2][1], predict.options.map(([t]) => `"${t}"`).join(" / "));
ok("predict options are not the 33 / 22 / 0 ladder", !predict.options.some(([, g]) => g === 33 || g === 22), predict.options.map(([, g]) => g).join(" / "));

// ---------- Stage text ----------
const stageText = `Simulated crowd, seed ${SEED}: 30% guess at random, 40% near 33 (one step), 30% near 22 (two steps). Target: two thirds of everyone's average.`;
ok("stage text <= 25 words", words(stageText) <= 25, `${words(stageText)} words: "${stageText}"`);
ok("stage text derives no ceiling", !/66\.7|44\.4|29\.6|\b50\b/.test(stageText), "no 66.7, 44.4, 29.6 or 'half of 50' on the stage");

// ---------- Reveal: one text per guess the slider allows (0-100) ----------
const stops = "Where it stops: a simulated crowd with a stated rule, not real players.";
const lesson = "Against a crowd that stops after one or two steps, the winning guess sits near two thirds of the crowd's actual average, not at 0.";
const closerText = (k) => (k === 0 ? "no simulated guess was closer" : k === 1 ? "1 simulated guess was closer" : `${k} simulated guesses were closer`);
function reveal(g, held = "") {
  const lead = `With your ${g} in, this simulated crowd averaged ${r1(avg(g))}, so the target was ${r1(target(g))}.`;
  const you = g === 0
    ? `0 is the equilibrium guess, and it missed by ${r1(miss(0))}; ${closerText(closer(0))}.`
    : `Your guess missed by ${r1(miss(g))}; ${closerText(closer(g))}. Had you guessed 0, the equilibrium, you would have missed by ${r1(miss(0))}.`;
  return [lead, you, lesson, held, stops].filter(Boolean).join(" ");
}
console.log("\nReveal: all 101 guesses checked; five printed in full (0, 23, 33, 50, 100)");
let longest = 0, allOk = true;
for (let g = 0; g <= 100; g++) {
  const t = reveal(g);
  longest = Math.max(longest, words(t));
  // Every number in the text must be one this script computed for this guess.
  const nums = (t.match(/\d+(\.\d+)?/g) || []).map(Number);
  const allowed = new Set([g, Number(r1(avg(g))), Number(r1(target(g))), Number(r1(miss(g))), Number(r1(miss(0))), closer(g), closer(0), 0, 1, 2, 100]);
  if (!nums.every((n) => allowed.has(n)) || words(t) > 90 || !/simulated/.test(t) || /\bpeople\b/i.test(t)) allOk = false;
  if ([0, 23, 33, 50, 100].includes(g)) console.log(`  guess ${g} (${words(t)} words): "${t}"`);
}
ok("every reveal: <= 90 words, numbers from this script, says 'simulated', never 'people'", allOk, `longest ${longest} words`);
const winners = [...Array(101).keys()].filter((g) => closer(g) === 0);
console.log(`  guesses no simulated guess beats: ${winners.join(", ")}`);

// ---------- Held type (d) line (one only; G1). Not in the published text until the fact-checker opens it ----------
const held = "In one online sample of 250 real players, first guesses averaged 36.4, far above 0.";
let worst = 0; for (let g = 0; g <= 100; g++) worst = Math.max(worst, words(reveal(g, held)));
console.log("\nHeld type (d) line: W-902 row 'Beauty contest / level-k' (robust), Pantelis & Kennedy 2017, PMC5303671, opened by research-lead, not by the fact-checker");
ok("reveal with the held line stays within 90 words", worst <= 90, `held: "${held}" (${words(held)} words); longest reveal with it: ${worst} words. It goes before "Where it stops". Fallback when not checkable: cut; nothing replaces it`);

// ---------- Transfer recall ----------
// "A simulated crowd of 100 averages 60; the target is half the average, your guess included."
const S2 = 6000, T2 = (g) => (S2 + g) / (N + 1) / 2, m2 = (g) => Math.abs(g - T2(g));
const recOpts = [0, 30, 60];
const rm = recOpts.map(m2);
ok("recall: half-the-average game, crowd averages 60: 'about 30' misses least", rm.indexOf(Math.min(...rm)) === 1,
  recOpts.map((g, i) => `${g}: miss ${rm[i].toFixed(1)}`).join("; ") + `. Options: "0, the equilibrium guess" / "About 30, between the other two" / "About 60, the crowd's average". Answer: "About 30, between the other two"`);

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);
