#!/usr/bin/env node
// Answer and number checks for Big Ideas "## Strategy wave 1" briefs 13-24
// (company/domains/briefs/big-ideas.md; strategy: company/domains/big-ideas-strategy.md).
// Run: node company/domains/briefs/checks/big-ideas-strategy-wave1-check.mjs
// Every number a brief quotes is recomputed here; a mismatch exits non-zero.
// Written by cm-big-ideas (Dmitri), 2026-10-14. Builders copy numbers from this output, not from memory.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const r = (x, d = 3) => Number(x.toFixed(d));
// mulberry32, same as src/kit/random
const m32 = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };

// 13. cumulative-selection: "SMALL STEPS ADD UP", 27 symbols, 100 copies a round, 5% per-letter miscopy.
{
  const TARGET = "SMALL STEPS ADD UP", A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ", L = TARGET.length;
  const score = (s) => [...s].filter((c, i) => c === TARGET[i]).length;
  const randStr = (rnd) => Array.from({ length: L }, () => A[Math.floor(rnd() * 27)]).join("");
  const mutate = (s, rnd) => [...s].map((c) => (rnd() < 0.05 ? A[Math.floor(rnd() * 27)] : c)).join("");
  const runCumulative = (seed, keepBest = true, cap = 2000) => {
    const rnd = m32(seed); let cur = randStr(rnd); let rounds = 0;
    while (score(cur) < L && rounds < cap) {
      rounds++;
      const kids = Array.from({ length: 100 }, () => mutate(cur, rnd));
      cur = keepBest ? kids.reduce((b, k) => (score(k) > score(b) ? k : b), kids[0]) : kids[Math.floor(rnd() * 100)];
    }
    return { rounds, final: score(cur) };
  };
  const tries = 27 ** L;
  ok("13 single-step odds", L === 18 && tries > 5.8e25 && tries < 5.9e25, `27^18 = ${tries.toExponential(2)} random tries expected per hit`);
  const rnd = m32(7); let best = 0; for (let i = 0; i < 1000; i++) best = Math.max(best, score(randStr(rnd)));
  ok("13 best of 1,000 random tries (seed 7)", best >= 3 && best <= 6, `best match ${best} of 18 letters`);
  const disclosed = runCumulative(7);
  const many = Array.from({ length: 200 }, (_, i) => runCumulative(i + 1).rounds);
  const med = median(many), mx = Math.max(...many);
  ok("13 keep-the-best, seed 7", disclosed.final === 18 && disclosed.rounds < 100, `matched in ${disclosed.rounds} rounds`);
  ok("13 keep-the-best, seeds 1-200", med >= 30 && med <= 150 && mx < 1000, `median ${med} rounds, max ${mx} (answer: fewer than 1,000, not about a million or more than a trillion trillion)`);
  const drift = runCumulative(7, false, disclosed.rounds);
  ok("13 keep-a-random-copy, same rounds", drift.final <= 3, `after ${disclosed.rounds} rounds: ${drift.final} of 18 letters`);
}

// 14. heliocentric-retrograde: circular coplanar orbits, Earth 1 AU / 365.25 d, Mars 1.5237 AU / 686.98 d.
{
  const rE = 1, TE = 365.25, rM = 1.5237, TM = 686.98;
  const lam = (t) => { const aE = (2 * Math.PI * t) / TE, aM = (2 * Math.PI * t) / TM; return Math.atan2(rM * Math.sin(aM) - rE * Math.sin(aE), rM * Math.cos(aM) - rE * Math.cos(aE)); };
  // opposition at t=0 (both at angle 0). Count days around t=0 with decreasing longitude.
  let retro = 0; for (let t = -200; t < 200; t += 0.01) { let d = lam(t + 0.01) - lam(t); if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; if (d < 0) retro += 0.01; }
  const syn = 1 / (1 / TE - 1 / TM);
  ok("14 retrograde length (circular model)", retro > 60 && retro < 85, `${r(retro, 0)} days backwards around opposition (answer: about 2 months)`);
  ok("14 loop repeats", syn > 770 && syn < 790, `synodic period ${r(syn, 0)} days (about every 2 years 2 months)`);
  // Sun view: heliocentric longitude of Mars always increases.
  ok("14 from the Sun", (2 * Math.PI) / TM > 0, "Mars's angle from the Sun grows steadily: no reversal");
}

// 15. extraordinary-evidence: prior 1 in 1,000,000; each witness right 99% (likelihood ratio 99).
{
  const post = (priorOdds, n, lr = 99) => { const o = priorOdds * lr ** n; return o / (1 + o); };
  const p0 = 1 / 999999;
  const ps = [1, 2, 3, 4].map((n) => post(p0, n));
  ok("15 witnesses needed", ps[2] < 0.5 && ps[3] > 0.5, `1: ${r(ps[0] * 100, 4)}%, 2: ${r(ps[1] * 100, 2)}%, 3: ${r(ps[2] * 100, 1)}%, 4: ${r(ps[3] * 100, 1)}% (answer: 4)`);
  const copied = post(p0, 1); // four copies of one source count once
  ok("15 four who copied one source", r(copied * 100, 4) === r(ps[0] * 100, 4), `${r(copied * 100, 4)}% (same as one witness)`);
  const everyday = post(1 / 9, 1);
  ok("15 everyday 1-in-10 claim, one witness", r(everyday * 100, 1) === 91.7, `${r(everyday * 100, 1)}%`);
}

// 16. pareto-80-20: Pareto tail; top fraction p holds p^(1 - 1/alpha) of the total.
{
  const share = (p, a) => p ** (1 - 1 / a);
  const a80 = Math.log(5) / Math.log(4);
  ok("16 80/20 alpha", r(share(0.2, a80), 4) === 0.8, `alpha = ${r(a80, 3)} gives top 20% = ${r(share(0.2, a80) * 100, 1)}%`);
  ok("16 top 4% (question case)", r(share(0.04, a80) * 100, 1) === 64, `top 4% hold ${r(share(0.04, a80) * 100, 1)}% (answer: about 64%)`);
  ok("16 top 0.8%", r(share(0.008, a80) * 100, 1) === 51.2, `top 0.8% hold ${r(share(0.008, a80) * 100, 1)}%`);
  ok("16 gentler tail alpha 2", r(share(0.2, 2) * 100, 1) === 44.7, `top 20% hold ${r(share(0.2, 2) * 100, 1)}%; top 4% hold ${r(share(0.04, 2) * 100, 1)}%`);
  ok("16 flat", share(0.2, Infinity) === 0.2, "everyone equal: top 20% hold 20%");
}

// 17. expanding-universe: a 5x5 raisin grid, 1 cm apart; every distance doubles in one hour.
{
  const pts = []; for (let x = 0; x < 5; x++) for (let y = 0; y < 5; y++) pts.push([x, y]);
  const speeds = (o) => pts.map(([x, y]) => { const d = Math.hypot(x - o[0], y - o[1]); return { d, v: 2 * d - d }; });
  const fromA = speeds([0, 2]);
  const vB = fromA.find((s) => r(s.d) === 1).v, vC = fromA.find((s) => r(s.d) === 3).v;
  ok("17 speeds from A", vB === 1 && vC === 3, `B (1 cm) recedes ${vB} cm/h, C (3 cm) recedes ${vC} cm/h (answer: 3 cm/h)`);
  const fromC = speeds([3, 2]);
  ok("17 from C: same law", fromC.every((s) => Math.abs(s.v - s.d) < 1e-12), "every raisin recedes at (distance) cm/h from C too: no centre");
}

// 18. wrights-law: cost x0.8 per doubling of cumulative output.
{
  const cost = (growth, lr = 0.2) => (1 - lr) ** Math.log2(growth);
  ok("18 1,000x (question case)", r(cost(1000) * 100, 1) === 10.8, `${r(cost(1000) * 100, 1)}% of the start (answer: about a tenth)`);
  ok("18 10x", r(cost(10) * 100, 1) === 47.7, `${r(cost(10) * 100, 1)}%`);
  ok("18 learning rate 10%", r(cost(1000, 0.1) * 100, 1) === 35, `${r(cost(1000, 0.1) * 100, 1)}%`);
  const floor = 0.15 + 0.85 * cost(1000);
  ok("18 materials floor 15%", r(floor * 100, 1) === 24.2, `${r(floor * 100, 1)}% (the floor never falls)`);
  ok("18 doublings in 1,000x", r(Math.log2(1000), 2) === 9.97, `${r(Math.log2(1000), 2)} doublings`);
}

// 19. most-findings-false: 1,000 hypotheses; alpha 5%.
{
  const ppv = (n, prior, power, alpha = 0.05) => { const tp = n * prior * power, fp = n * (1 - prior) * alpha; return { tp, fp, ppv: tp / (tp + fp) }; };
  const q = ppv(1000, 0.1, 0.5);
  ok("19 question case", q.tp === 50 && r(q.fp, 1) === 45 && r(q.ppv * 100, 1) === 52.6, `true positives ${q.tp}, false ${r(q.fp, 1)}: ${r(q.ppv * 100, 1)}% true (answer: about half)`);
  const p80 = ppv(1000, 0.1, 0.8);
  ok("19 power 80%", r(p80.ppv * 100, 1) === 64, `${p80.tp} true vs ${r(p80.fp, 1)} false: ${r(p80.ppv * 100, 1)}%`);
  const rare = ppv(1000, 0.01, 0.5);
  ok("19 1 in 100 true", r(rare.ppv * 100, 1) === 9.2, `${rare.tp} true vs ${r(rare.fp, 1)} false: ${r(rare.ppv * 100, 1)}%`);
}

// 20. fermi-estimation: five factors, each off by a random factor in [1/2, 2] (uniform in log). Seed 11.
{
  const LN2 = Math.log(2);
  const run = (seed, n, bias = 1) => { const rnd = m32(seed); const errs = []; for (let i = 0; i < n; i++) { let s = 0; for (let k = 0; k < 5; k++) s += (rnd() * 2 - 1) * LN2 + Math.log(bias); errs.push(Math.exp(Math.abs(s))); } return errs; };
  const e = run(11, 1000);
  const med = median(e), within2 = e.filter((x) => x <= 2).length / 10, worst = Math.max(...e);
  ok("20 typical error (seed 11)", med > 1.6 && med < 2.1, `median error x${r(med, 2)}; ${within2}% within 2x; worst x${r(worst, 1)} (answer: about 2x)`);
  ok("20 worst case possible", r(2 ** 5) === 32, "all five off the same way: x32");
  const sd = LN2 / Math.sqrt(3) * Math.sqrt(5);
  ok("20 theory", r(Math.exp(0.6745 * sd), 2) > 1.7 && r(Math.exp(0.6745 * sd), 2) < 1.9, `normal approx median x${r(Math.exp(0.6745 * sd), 2)}`);
  const b = run(11, 1000, 1.5), bmed = median(b);
  ok("20 every guess 1.5x high", bmed > 6 && bmed < 9 && r(1.5 ** 5, 2) === 7.59, `median error x${r(bmed, 1)} (1.5^5 = ${r(1.5 ** 5, 2)})`);
}

// 21. veil-of-ignorance: three societies, four places each.
{
  const S = { A: [10, 10, 10, 10], B: [4, 16, 16, 24], C: [8, 12, 14, 18] };
  const mean = (x) => x.reduce((a, b) => a + b, 0) / x.length, min = (x) => Math.min(...x);
  const pick = (f) => Object.entries(S).reduce((b, [k, v]) => (f(v) > f(S[b]) ? k : b), "A");
  const rawls = pick(min), harsanyi = pick(mean);
  const floor = Object.entries(S).filter(([, v]) => min(v) >= 8).reduce((b, [k, v]) => (!b || mean(v) > mean(S[b]) ? k : b), null);
  ok("21 Rawls (best worst place)", rawls === "A", `A min ${min(S.A)}, B min ${min(S.B)}, C min ${min(S.C)}`);
  ok("21 Harsanyi (best average)", harsanyi === "B", `A ${mean(S.A)}, B ${mean(S.B)}, C ${mean(S.C)}`);
  ok("21 floor 8 then best average", floor === "C", "B fails the floor; C (13) beats A (10)");
  ok("21 answer", rawls !== harsanyi, "the two rules pick different societies (answer: No: A and B)");
}

// 22. metcalfe-oversold: 100 -> 1,000 members.
{
  const H = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / k; return s; };
  const pairs = (n) => (n * (n - 1)) / 2, zipf = (n) => n * H(n - 1);
  ok("22 Metcalfe n^2", r(pairs(1000) / pairs(100), 1) === 100.9, `possible links x${r(pairs(1000) / pairs(100), 1)}`);
  ok("22 contacts worth 1/k (question case)", r(zipf(1000) / zipf(100), 1) === 14.5, `value x${r(zipf(1000) / zipf(100), 1)} (answer: about 15x)`);
  ok("22 n log n", r((1000 * Math.log(1000)) / (100 * Math.log(100)), 1) === 15, "Odlyzko-Tilly n log n: x15");
  ok("22 linear", 1000 / 100 === 10, "each member worth the same fixed amount: x10");
}

// 23. lindy-effect: Pareto lifetimes, alpha 2, minimum 1 year: expected remaining life = age / (alpha - 1).
{
  const remPareto = (t, a = 2) => t / (a - 1);
  ok("23 books", remPareto(10) === 10 && remPareto(100) === 100, "10 years in print: 10 more expected; 100 years: 100 more (answer: about 10x longer)");
  // People: lifespans normal, mean 80, sd 10 (the lesson's model). E[T - t | T > t] by numeric integration.
  const rem = (t) => { let num = 0, den = 0; for (let x = t; x < 160; x += 0.001) { const f = Math.exp(-((x - 80) ** 2) / 200); num += (x - t) * f; den += f; } return num / den; };
  ok("23 people", r(rem(10), 1) === 70 && r(rem(80), 1) === 8, `age 10: ${r(rem(10), 1)} more years; age 80: ${r(rem(80), 1)} more`);
}

// 24. newcombs-problem: box A $1,000 always; box B $1,000,000 if one-boxing was predicted.
{
  const ev = (p) => ({ one: p * 1e6, two: (1 - p) * 1e6 + 1000 });
  const be = (1e6 + 1000) / 2e6;
  ok("24 break-even accuracy", r(be * 100, 2) === 50.05, `${r(be * 100, 2)}% (answer: just over 50%)`);
  const e90 = ev(0.9), e50 = ev(0.5);
  ok("24 predictor 90%", e90.one === 900000 && r(e90.two) === 101000, `one box $${e90.one}, two boxes $${r(e90.two)}`);
  ok("24 predictor 50%", e50.one === 500000 && e50.two === 501000, `one box $${e50.one}, two boxes $${e50.two}`);
  ok("24 dominance", [0, 1e6].every((b) => b + 1000 > b), "whatever is already in box B, two boxes pay $1,000 more");
}

// Recall questions (a new case for each idea; the answer must come from the idea, not the stage's numbers).
{
  // 13: a faulty lock that clicks when any one dial is right: at most 10 tries per dial.
  ok("13 recall lock", 6 * 10 === 60 && 10 ** 6 === 1e6, "6 dials x 10 digits: at most 60 tries with per-dial feedback, versus 1,000,000 blind");
  // 14: Jupiter (5.2026 AU, 4332.6 d) also loops backwards when Earth passes it.
  const rJ = 5.2026, TJ = 4332.6;
  const lam = (t) => { const aE = (2 * Math.PI * t) / 365.25, aJ = (2 * Math.PI * t) / TJ; return Math.atan2(rJ * Math.sin(aJ) - Math.sin(aE), rJ * Math.cos(aJ) - Math.cos(aE)); };
  let retro = 0; for (let t = -100; t < 100; t += 0.01) { let d = lam(t + 0.01) - lam(t); if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; if (d < 0) retro += 0.01; }
  const syn = 1 / (1 / 365.25 - 1 / TJ);
  ok("14 recall Jupiter", retro > 90 && syn > 395 && syn < 402, `Jupiter goes west for ${r(retro, 0)} days in the circular model, every ${r(syn, 0)} days (answer: yes)`);
  // 15: five sites citing one tweet: likelihood ratio of one source.
  ok("15 recall one source", 99 ** 1 === 99, "five copies of one tweet carry one source's evidence (answer: about as much as the tweet)");
  // 16: top 4% of bugs under the same 80/20 tail.
  ok("16 recall bugs", r(0.04 ** (1 - Math.log(4) / Math.log(5)) * 100, 0) === 64, "top 4% of bugs cause about 64% of crashes");
  // 17: all prices +10%: a $50 item rises $5.
  ok("17 recall prices", r(50 * 0.1, 2) === 5 && r(5 * 0.1, 2) === 0.5, "$5 item +50c, $50 item +$5");
  // 18: 18% per doubling, 3 doublings.
  ok("18 recall batteries", r(0.82 ** 3 * 100, 0) === 55, `${r(0.82 ** 3 * 100, 1)}% of the start (about half)`);
  // 19: half of ideas true, power 80%, alpha 5%.
  ok("19 recall field", r((0.5 * 0.8) / (0.5 * 0.8 + 0.5 * 0.05) * 100, 1) === 94.1, "94.1% of flagged ideas true");
  // 20: ten factors.
  const sd10 = (Math.LN2 / Math.sqrt(3)) * Math.sqrt(10);
  ok("20 recall ten guesses", r(Math.exp(0.6745 * sd10), 1) === 2.3, `typical error about x${r(Math.exp(0.6745 * sd10), 2)} (answer: nearer 2.5x than 1,000x)`);
  // 21: D = 9, 9, 30, 30 against A = 10 x 4.
  ok("21 recall society D", (9 + 9 + 30 + 30) / 4 === 19.5 && Math.min(9, 9, 30, 30) < 10, "Harsanyi picks D (mean 19.5 > 10); Rawls keeps A (worst 10 > 9)");
  // 22: 1,000 -> 10,000 users with 1/k contacts.
  const H = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / k; return s; };
  ok("22 recall chat app", r((10000 * H(9999)) / (1000 * H(999)), 1) === 13.1, `value x${r((10000 * H(9999)) / (1000 * H(999)), 1)} (answer: nearer 13x than 100x)`);
  // 23: Lindy 40 vs 4 years; constant-risk atoms: same expected time left at any age.
  ok("23 recall languages", 40 / (2 - 1) > 4 / (2 - 1), "the 40-year language: about 40 years left versus 4");
  const remExp = (t, mean = 10) => { let num = 0, den = 0; for (let x = t; x < t + 400; x += 0.001) { const f = Math.exp(-x / mean); num += (x - t) * f; den += f; } return num / den; };
  ok("23 atoms preset", r(remExp(10), 1) === 10 && r(remExp(100), 1) === 10, `constant risk, mean life 10: ${r(remExp(10), 1)} left at age 10, ${r(remExp(100), 1)} left at age 100 (memoryless)`);
  // 24: $10 / $100 version.
  ok("24 recall small boxes", r(((100 + 10) / 200) * 100, 1) === 55, "break-even accuracy 55%");
}

console.log(fail ? `\n${fail} check(s) failed` : "\nall big-ideas strategy wave 1 numbers check");
process.exit(fail ? 1 : 0);
