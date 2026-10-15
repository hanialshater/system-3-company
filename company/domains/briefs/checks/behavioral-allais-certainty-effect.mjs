#!/usr/bin/env node
// Check script for behavioral brief 1, allais-certainty-effect (company/domains/briefs/behavioral.md).
// Run: node company/domains/briefs/checks/behavioral-allais-certainty-effect.mjs
// Written by cm-behavioral (Rasmus), 2026-10-15. No network, no Math.random (own seeded PRNG).
// Prints every number the learner sees (stage, predict, reveal, recall) and checks the type (a)
// derivation and every type (b) reveal branch (all 4 combinations the two choice controls allow).
// The stated model is expected utility with any increasing utility u (P0 condition 1), not expected value.
// A mismatch exits non-zero.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const words = (s) => s.trim().split(/\s+/).length;

// ---------- Stage numbers (prizes in $M; probabilities in hundredths, so arithmetic is exact) ----------
const G = {
  "1A": { 1: 100 },                 // $1M for sure
  "1B": { 5: 10, 1: 89, 0: 1 },     // 10% $5M, 89% $1M, 1% nothing
  "2A": { 1: 11, 0: 89 },           // 11% $1M, 89% nothing
  "2B": { 5: 10, 0: 90 },           // 10% $5M, 90% nothing
};
console.log("\nStage (what the learner sees on the locked stage and in explore)");
for (const [k, g] of Object.entries(G)) {
  const tot = Object.values(g).reduce((a, b) => a + b, 0);
  ok(`gamble ${k} probabilities sum to 100%`, tot === 100, Object.entries(g).map(([x, p]) => `${p}% of $${x}M`).join(", "));
}

// ---------- Type (a): the common consequence ----------
// EU(g) = sum p_x u(x). Coefficients of u(0), u(1M), u(5M) in EU(1A)-EU(1B) and EU(2A)-EU(2B).
const coef = (a, b) => [0, 1, 5].map((x) => (G[a][x] || 0) - (G[b][x] || 0));
const d1 = coef("1A", "1B"), d2 = coef("2A", "2B");
ok("(a) EU(1A)-EU(1B) and EU(2A)-EU(2B) have identical coefficients", d1.every((c, i) => c === d2[i]),
  `both = ${d1[0] / 100}*u(0) + ${d1[1] / 100}*u($1M) + ${d1[2] / 100}*u($5M)`);
// The shared 89%: 1A and 1B share 89% of $1M; 2A and 2B share 89% of $0. Removing it leaves the same comparison.
const strip = (g, x) => { const h = { ...g }; h[x] -= 89; if (h[x] === 0) delete h[x]; return h; };
const s = { "1A": strip(G["1A"], 1), "1B": strip(G["1B"], 1), "2A": strip(G["2A"], 0), "2B": strip(G["2B"], 0) };
const same = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
ok("(a) 'Take away the shared 89%' turns pair 1 into pair 2", same(s["1A"], s["2A"]) && same(s["1B"], s["2B"]),
  `left: ${JSON.stringify(s["1A"])} vs ${JSON.stringify(s["1B"])} (in %, keyed by $M), in both pairs: 11% of $1M against 10% of $5M (+1% of nothing)`);
// With u(0)=0: 1A over 1B iff 0.11 u(1M) > 0.10 u(5M) iff u(1M)/u(5M) > 10/11.
ok("(a) threshold with u(0)=0", Math.abs(10 / 11 - 0.909090909) < 1e-6, `1A (and 2A) iff u($1M) > ${(10 / 11).toFixed(3)} x u($5M); 1B (and 2B) iff u($5M) > ${(11 / 10).toFixed(1)} x u($1M)`);

// Sweep: many increasing utility functions; the sign of the two differences must always agree.
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const R = mulberry32(7);
const EU = (g, u) => Object.entries(g).reduce((acc, [x, p]) => acc + (p / 100) * u(Number(x)), 0);
const fams = [];
for (let r = -3; r <= 6; r += 0.25) fams.push([`CRRA r=${r}`, (x) => (r === 1 ? Math.log(1 + x) : ((1 + x) ** (1 - r) - 1) / (1 - r))]);
for (let k = 0.05; k <= 10; k *= 1.3) fams.push([`CARA k=${k.toFixed(2)}`, (x) => 1 - Math.exp(-k * x)]);
// Random strictly increasing piecewise-linear utilities through knots at $0M..$5M (seed 7).
for (let i = 0; i < 20000; i++) { const k = [R()]; for (let j = 1; j <= 5; j++) k.push(k[j - 1] + 1e-6 + R() * (R() < 0.5 ? 0.1 : 5)); fams.push([`random #${i}`, (x) => { const j = Math.min(4, Math.floor(x)); return k[j] + (x - j) * (k[j + 1] - k[j]); }]); }
let agree = 0, pickAA = 0, pickBB = 0;
for (const [, u] of fams) {
  const a = EU(G["1A"], u) - EU(G["1B"], u), b = EU(G["2A"], u) - EU(G["2B"], u);
  if (Math.sign(a) === Math.sign(b) || Math.abs(a - b) < 1e-12) agree++;
  if (a > 0 && b > 0) pickAA++; if (a < 0 && b < 0) pickBB++;
}
ok("(a) sweep: every increasing u picks the same letter in both pairs", agree === fams.length, `${agree}/${fams.length} functions agree; ${pickAA} pick 1A+2A, ${pickBB} pick 1B+2B, 0 pick a mixed pair`);
// Named witnesses used in the reveal wording ("a cautious one" / "a bolder one").
const cautious = (x) => 1 - Math.exp(-3 * x), bold = (x) => Math.sqrt(x);
ok("(a) witness: u = 1 - e^(-3x) (x in $M) picks 1A and 2A", EU(G["1A"], cautious) > EU(G["1B"], cautious) && EU(G["2A"], cautious) > EU(G["2B"], cautious), `u($1M)/u($5M) = ${(cautious(1) / cautious(5)).toFixed(3)} > 0.909`);
ok("(a) witness: u = sqrt(x) picks 1B and 2B", EU(G["1B"], bold) > EU(G["1A"], bold) && EU(G["2B"], bold) > EU(G["2A"], bold), `u($5M)/u($1M) = ${(bold(5) / bold(1)).toFixed(3)} > 1.1`);

// ---------- Predict (stage text <= 25 words; options at the same precision) ----------
const predict = {
  q: "Someone takes the sure $1M in pair 1. Under expected utility, which may they choose in pair 2?",
  options: ["Only the 11% chance of $1M", "Only the 10% chance of $5M", "Either one, depending on how cautious they are"],
  answer: 0,
};
console.log("\nPredict");
ok("predict question <= 25 words", words(predict.q) <= 25, `${words(predict.q)} words: "${predict.q}"`);
ok("predict answer follows from the derivation", predict.answer === 0 && pickAA > 0 && agree === fams.length, `answer: "${predict.options[predict.answer]}" (1A implies 2A for every u)`);

// ---------- Reveal: one branch per combination of the learner's two choices (type b) ----------
const name = { "1A": "the sure $1M", "1B": "the 10% chance of $5M", "2A": "the 11% chance of $1M", "2B": "the 10% chance of $5M" };
const common = "Take away the 89% each pair shares, and both pairs become 11% of $1M against 10% of $5M.";
const stops = "Where it stops: you chose knowing the pairs were linked.";
const held = "Re-run with 4,098 people in 19 countries, it held up, weaker than first reported.";
const heldReverse = "That is the reverse of the certainty effect, which held up with 4,098 people in 19 countries, weaker than first reported.";
// Branch text as revised by the learning designer (company/reviews/sure-million-or-long-shot/design.md) and accepted
// by cm-behavioral on 2026-10-15: shorter lead, and the matched branches also name the certainty effect.
function reveal(p1, p2, withHeld = false) {
  const lead = name[p1] === name[p2] ? `You took ${name[p1]} both times.` : `You took ${name[p1]}, then ${name[p2]}.`;
  if (p1[1] === p2[1]) {
    const fit = p1 === "1A" ? "a cautious one, for which $1M is worth more than 10/11 of $5M" : "a bolder one, for which $5M is worth more than 1.1 times $1M";
    return `${lead} ${common} You answered it the same way both times, so one utility function fits your two choices: ${fit}. The sure $1M, then the 10% chance of $5M, would fit none: that is the certainty effect. ${stops}`;
  }
  // The held type (d) line goes in the mixed branches only (one held sentence per reveal; G1 condition 2).
  const label = p1 === "1A"
    ? `This lean to the sure thing is the certainty effect.${withHeld ? " " + held : ""}`
    : withHeld ? heldReverse : "Leaning away from the sure thing is the reverse of the certainty effect.";
  return `${lead} ${common} Expected utility must answer it the same way both times, so no utility function fits your two choices: a departure from the model, not a slip. ${label} ${stops}`;
}
console.log("\nReveal branches (every combination the controls allow)");
for (const p1 of ["1A", "1B"]) for (const p2 of ["2A", "2B"]) {
  const t = reveal(p1, p2);
  const consistentByModel = p1[1] === p2[1]; // same letter in both pairs: the sweep above found a u for both such pairs and none for a mixed pair
  ok(`reveal ${p1}+${p2} <= 90 words, verdict matches the derivation`, words(t) <= 90 && (/no utility function fits/i.test(t) === !consistentByModel), `${words(t)} words: "${t}"`);
}

// ---------- Held type (d) line (one only; D4 / G1); declared above the reveal function's use ----------
console.log("\nHeld type (d) line, mixed branches only; not in the published text until the fact-checker opens it");
console.log("  W-902 row 'Allais / certainty effect' (robust, smaller than in 1979): Ruggeri et al. 2020 as reported by Cicerale et al. 2022, PMC9337702 (second-hand; the fact-checker rules on it)");
let worst = 0;
for (const [p1, p2] of [["1A", "2B"], ["1B", "2A"]]) {
  const t = reveal(p1, p2, true);
  worst = Math.max(worst, words(t));
  ok(`reveal ${p1}+${p2} with the held line <= 90 words and one held sentence`, words(t) <= 90 && (t.match(/4,098/g) || []).length === 1, `${words(t)} words: "${t}"`);
}
ok("matched branches carry no held line", ["1A2A", "1B2B"].every((k) => !/4,098/.test(reveal(k.slice(0, 2), k.slice(2), true))), "fallback when not checkable: the sentence is cut and the unheld text above stands");

// ---------- Transfer recall (common consequence, new numbers; the learning designer's pair, accepted 2026-10-15) ----------
// X: $2,000 for sure, or 20% of $3,000, 75% of $2,000 and 5% nothing. Y: 25% of $2,000, or 20% of $3,000.
const recall = "Pair X: $2,000 for sure, or 20% of $3,000, 75% of $2,000 and 5% nothing. Pair Y: 25% of $2,000, or 20% of $3,000. Under expected utility, someone who takes the sure $2,000 must choose in Y:";
const X1 = { 2: 100 }, X2 = { 3: 20, 2: 75, 0: 5 }, Y1 = { 2: 25, 0: 75 }, Y2 = { 3: 20, 0: 80 };   // $ thousands
for (const [k, g] of Object.entries({ X1, X2, Y1, Y2 })) ok(`recall gamble ${k} sums to 100%`, Object.values(g).reduce((a, b) => a + b, 0) === 100, JSON.stringify(g));
const rc = (a, b) => [0, 2, 3].map((x) => (a[x] || 0) - (b[x] || 0));
const rx = rc(X1, X2), ry = rc(Y1, Y2);
ok("recall: EU(X1)-EU(X2) and EU(Y1)-EU(Y2) have identical coefficients", rx.every((c, i) => c === ry[i]), `both = ${rx[0] / 100}*u(0) + ${rx[1] / 100}*u($2k) + ${rx[2] / 100}*u($3k)`);
const shared = (g, x) => { const h = { ...g }; h[x] -= 75; if (h[x] === 0) delete h[x]; return h; };
ok("recall: taking away the shared 75% turns X into Y", same(shared(X1, 2), shared(Y1, 0)) && same(shared(X2, 2), shared(Y2, 0)), "25% of $2,000 against 20% of $3,000 and 5% nothing");
let rAgree = 0;
for (const [, u] of fams) { const a = EU(X1, u) - EU(X2, u), b = EU(Y1, u) - EU(Y2, u); if (Math.sign(a) === Math.sign(b) || Math.abs(a - b) < 1e-12) rAgree++; }
ok("recall: every increasing u picks the same letter in X and Y", rAgree === fams.length, `${rAgree}/${fams.length}; ${words(recall)} words: "${recall}" Answer: "The 25% chance of $2,000"`);

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);
