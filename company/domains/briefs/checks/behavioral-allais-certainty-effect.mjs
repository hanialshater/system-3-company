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
function reveal(p1, p2) {
  const lead = `You took ${name[p1]} in pair 1 and ${name[p2]} in pair 2.`;
  if (p1[1] === p2[1]) {
    const fit = p1 === "1A" ? "a cautious one, for which $1M is worth more than 10/11 of $5M" : "a bolder one, for which $5M is worth more than 1.1 times $1M";
    return `${lead} ${common} You answered that comparison the same way twice, so one utility function fits both of your choices: ${fit}. ${stops}`;
  }
  const label = p1 === "1A" ? "Leaning to the sure thing like this is called the certainty effect." : "Leaning away from the sure thing is the reverse of the certainty effect.";
  return `${lead} ${common} Expected utility weighs it the same in both pairs, so no utility function fits both of your choices: a departure from the model, not a slip. ${label} ${stops}`;
}
console.log("\nReveal branches (every combination the controls allow)");
for (const p1 of ["1A", "1B"]) for (const p2 of ["2A", "2B"]) {
  const t = reveal(p1, p2);
  const consistentByModel = p1[1] === p2[1]; // same letter in both pairs: the sweep above found a u for both such pairs and none for a mixed pair
  ok(`reveal ${p1}+${p2} <= 90 words, verdict matches the derivation`, words(t) <= 90 && (/no utility function fits/i.test(t) === !consistentByModel), `${words(t)} words: "${t}"`);
}

// ---------- Held type (d) line (one only; D4 / G1) ----------
const held = "A version of this pair held up when re-run in 19 countries.";
console.log("\nHeld type (d) line, not in the published text until W-902 sources it and the fact-checker opens it");
// When the held line is published, it takes the place of the certainty-effect sentence in the mixed branches
// and goes before "Where it stops" in the matched branches.
let worst = 0;
for (const p1 of ["1A", "1B"]) for (const p2 of ["2A", "2B"]) {
  const base = reveal(p1, p2).replace(/ Leaning [^.]*certainty effect\./, "");
  worst = Math.max(worst, words(base) + words(held));
}
ok("reveal with the held line stays within 90 words", worst <= 90,
  `held: "${held}" (${words(held)} words); longest branch with it: ${worst} words. Fallback when not checkable: the sentence is cut and nothing replaces it`);

// ---------- Transfer recall (common ratio: same logic, different shape) ----------
const X1 = { 3: 100 }, X2 = { 4: 80, 0: 20 }, Y1 = { 3: 25, 0: 75 }, Y2 = { 4: 20, 0: 80 };   // $ thousands
let rAgree = 0;
for (const [, u] of fams) { const a = EU(X1, u) - EU(X2, u), b = EU(Y1, u) - EU(Y2, u); if (Math.sign(a) === Math.sign(b) || Math.abs(a - b) < 1e-12) rAgree++; }
ok("recall: $3,000 sure vs 80% of $4,000; 25% of $3,000 vs 20% of $4,000", rAgree === fams.length,
  `pair Y = pair X with every chance divided by 4, so EU(Y1)-EU(Y2) = (EU(X1)-EU(X2))/4 for any u; ${rAgree}/${fams.length} functions agree. Answer: "the 25% chance of $3,000"`);

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);
