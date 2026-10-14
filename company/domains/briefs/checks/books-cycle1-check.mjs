#!/usr/bin/env node
// Answer checks for the first 12 Book Summaries briefs (company/domains/briefs/books.md).
// Run: node company/domains/briefs/checks/books-cycle1-check.mjs
// Every brief's stated answer is recomputed here; a mismatch exits non-zero.
// The models are the briefs' stated toy models, not claims about the world.

import fs from "node:fs";

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const r = (x, d = 3) => Number(x.toFixed(d));

// 1. goal-bottleneck-sets-pace: serial line throughput = slowest station.
{
  const line = [12, 9, 5, 10];
  const t0 = Math.min(...line);
  const fast = [24, 9, 5, 10];
  ok("1 bottleneck: doubling the fastest station", Math.min(...fast) === 5 && t0 === 5, `before ${t0}/h, after ${Math.min(...fast)}/h (answer: 5)`);
  // three upgrades of +2 on the bottleneck: 5 -> 7 -> 9 -> 11, then station 2 (9/h) is the bottleneck
  const up = [12, 9, 11, 10];
  ok("1 bottleneck: three +2 upgrades on station 3", Math.min(...up) === 9 && up.indexOf(9) === 1, `throughput ${Math.min(...up)}/h, new bottleneck station ${up.indexOf(9) + 1}`);
}

// 2. habits-one-percent: 1.01^365 vs linear vs a power-law practice curve.
{
  const comp = 1.01 ** 365, lin = 1 + 0.01 * 365, down = 0.99 ** 365;
  ok("2 habits: 1% a day compounded", r(comp, 1) === 37.8, `1.01^365 = ${r(comp, 2)}; linear = ${r(lin, 2)}; 0.99^365 = ${r(down, 4)} (answer: about 37.8)`);
  // Illustrative power law of practice: speed after N sessions ~ N^0.4 (exponent stated on the stage as illustrative).
  const pl = 365 ** 0.4, firstMonth = 30 ** 0.4;
  ok("2 habits: power-law curve (illustrative b = 0.4)", pl < comp && firstMonth / pl > 0.35, `365^0.4 = ${r(pl, 2)}x after a year; ${r((firstMonth / pl) * 100, 0)}% of that gain is reached by day 30`);
}

// 3. outliers-relative-age: pick the tallest 10% of a one-year cohort with a 1 January cutoff.
{
  // Illustrative model: height at age 9 = 133 cm + 0.5 cm per month of age within the cohort + N(0, 5.5 cm).
  const growth = 0.5, sd = 5.5;
  const phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  function erf(x) { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; }
  // months older than the youngest: Jan-born are ~11.5 months older than Dec-born
  const months = Array.from({ length: 12 }, (_, i) => 11.5 - i); // i = 0 is January
  const above = (cut) => months.map((m) => 1 - phi((cut - growth * m) / sd));
  // find the cut that selects 10% of the whole cohort
  let lo = -50, hi = 50;
  for (let k = 0; k < 100; k++) { const mid = (lo + hi) / 2; const share = above(mid).reduce((a, b) => a + b) / 12; if (share > 0.1) lo = mid; else hi = mid; }
  const picks = above(lo);
  const tot = picks.reduce((a, b) => a + b);
  const q1 = (picks[0] + picks[1] + picks[2]) / tot, q4 = (picks[9] + picks[10] + picks[11]) / tot;
  ok("3 relative age: share of picks born Jan-Mar", q1 > 0.4 && q1 < 0.48, `Jan-Mar ${r(q1 * 100, 1)}%, Oct-Dec ${r(q4 * 100, 1)}% (answer: about 45%)`);
  // Moving the cutoff to 1 July moves the peak to July-September (same model, shifted).
}

// 4. tfs-anchoring: anchor-and-adjust toy crowd. Private beliefs median 35; each adjusts 60% of the way from the anchor.
{
  const k = 0.6, belief = 35;
  const lo = 10 + k * (belief - 10), hi = 65 + k * (belief - 65);
  ok("4 anchoring: model medians", r(lo, 1) === 25 && r(hi, 1) === 47 && hi - lo > 15, `anchor 10 -> ${lo}, anchor 65 -> ${hi}, gap ${hi - lo} points (published medians 25 and 45; answer: about 20 points higher)`);
}

// 5. checklist-steps-compound: P(all n steps right) = p^n.
{
  const p20 = 0.99 ** 20, withList = 0.999 ** 20, p100 = 0.99 ** 100;
  ok("5 checklist: 20 steps at 99%", r(p20, 3) === 0.818, `0.99^20 = ${r(p20, 4)} (answer: about 82%); with a checklist catching 9 in 10 misses: 0.999^20 = ${r(withList, 3)}; 100 steps: ${r(p100, 3)}`);
}

// 6. bets-resulting: 20 managers pick a 70% plan, 20 pick a 50% plan; share of losers who chose the better plan.
{
  const lossA = 20 * 0.3, lossB = 20 * 0.5;
  const share = lossA / (lossA + lossB);
  ok("6 resulting: losers who picked the better plan", r(share, 3) === 0.375, `expected losses A ${lossA}, B ${lossB}; share ${r(share * 100, 1)}% (answer: about 4 in 10)`);
  // seeded check of the stage's "run 100 seasons" (mulberry32 as in src/kit/random)
  const m32 = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const rnd = m32(7); let la = 0, lb = 0;
  for (let s = 0; s < 100; s++) for (let i = 0; i < 20; i++) { if (rnd() >= 0.7) la++; if (rnd() >= 0.5) lb++; }
  ok("6 resulting: 100 seeded seasons (seed 7)", Math.abs(la / (la + lb) - 0.375) < 0.03, `share ${r((la / (la + lb)) * 100, 1)}%`);
}

// 7. swan-turkey: Laplace's rule of succession, P(safe tomorrow) = (n+1)/(n+2) after n safe days.
{
  const conf = (n) => (n + 1) / (n + 2);
  ok("7 turkey: confidence rises every day", conf(1000) > conf(500) && conf(500) > conf(1), `day 1 ${r(conf(1), 3)}, day 500 ${r(conf(500), 4)}, day 1000 ${r(conf(1000), 4)} (answer: most confident on day 1,000)`);
}

// 8. lean-vanity-metrics: 1,000 visitors a month, conversion 10% falling a point a month.
{
  const conv = [10, 9, 8, 7, 6, 5];
  const neu = conv.map((c) => 1000 * c / 100);
  const cum = neu.reduce((a, x) => [...a, (a.at(-1) ?? 0) + x], []);
  const rising = cum.every((x, i) => i === 0 || x > cum[i - 1]);
  ok("8 vanity: cumulative rises while conversion falls", rising && cum.at(-1) === 450, `new ${neu.join(", ")}; cumulative ${cum.join(", ")} (answer: can't tell from the total; here it fell)`);
  // "Getting better" preset (W-623 re-check, cm-books 2026-10-14): rising conversion reaches the same total.
  const up = [5, 6, 7, 8, 9, 10].map((c) => 1000 * c / 100).reduce((a, x) => [...a, (a.at(-1) ?? 0) + x], []);
  const upRising = up.every((x, i) => i === 0 || x > up[i - 1]);
  ok("8 vanity: getting better also rises, to the same total", upRising && up.at(-1) === cum.at(-1), `cumulative ${up.join(", ")}; final ${up.at(-1)} = ${cum.at(-1)} (answer D: the total can't tell them apart)`);
  // Brief text: stage question <= 25 words, reveal <= 90 and equal to its stated count.
  const md = fs.readFileSync(new URL("../books.md", import.meta.url), "utf8");
  const b8 = md.slice(md.indexOf("### 8. total-signups-hide-the-slide"), md.indexOf("### 9. "));
  const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
  const q = b8.match(/Prediction \(stage text\): "([^"]+)"/);
  const rv = b8.match(/Reveal payoff \(draft, (\d+) words\): "([^"]+)"/);
  ok("8 vanity: stage question <= 25 words", q && words(q[1]) <= 25, q ? `${words(q[1])} words` : "no question");
  ok("8 vanity: reveal <= 90 words, count stated", rv && words(rv[2]) <= 90 && Number(rv[1]) === words(rv[2]), rv ? `${words(rv[2])} words (stated ${rv[1]})` : "no reveal");
  ok("8 vanity: answer letter D", /\(answer: D\)/.test(b8), "D");
}

// 9. fact-gap-instinct: four income levels, 2017, billions of people (book: about 1, 3, 2, 1).
{
  const lv = [1, 3, 2, 1];
  const mid = (lv[1] + lv[2]) / lv.reduce((a, b) => a + b);
  ok("9 gap: share in the middle two levels", r(mid, 2) === 0.71, `${lv[1] + lv[2]} of 7 billion = ${r(mid * 100, 0)}% (answer: levels 2 and 3)`);
}

// 10. mmm-brooks-law: toy model. Team of 4; each person's output = 1 - 0.04 (n-1); newcomers produce nothing
//     for 2 months and each takes 0.5 of a veteran's month.
{
  const per = (n) => 1 - 0.04 * (n - 1);
  const finish = (monthsLeft, add) => {
    let work = 4 * per(4) * monthsLeft; // remaining work, as planned for the team of 4
    if (!add) return monthsLeft;
    const n = 4 + add;
    let t = 0;
    for (; t < 2 && work > 0; t++) work -= Math.max(0, 4 * per(n) - 0.5 * add);
    if (work <= 0) return t;
    return t + work / (n * per(n));
  };
  const f3 = finish(3, 4), f12 = finish(12, 4);
  // crossover: months left at which adding 4 stops making it later
  let x = 1; while (finish(x, 4) > x && x < 40) x += 0.01;
  ok("10 Brooks: 3 months left, add 4", f3 > 3, `finish ${r(f3, 2)} months instead of 3 (answer: later)`);
  ok("10 Brooks: 12 months left, add 4", f12 < 12, `finish ${r(f12, 2)} months instead of 12 (earlier); break-even near ${r(x, 1)} months left`);
}

// 11. innovators-overshoot-crossing: need 100 growing 10%/yr; newcomer 20 growing 50%/yr.
{
  const t = Math.log(100 / 20) / Math.log(1.5 / 1.1);
  const inc = (y) => 150 * 1.3 ** y, need = (y) => 100 * 1.1 ** y;
  ok("11 disruption: newcomer meets the need", t > 5 && t < 5.5, `after ${r(t, 2)} years (answer: about 5 years); incumbent overshoot at year 5: ${r(inc(5) / need(5), 2)}x the need`);
}

// 12. tfs-loss-aversion: accept a 50/50 bet (lose 100, win X) when X >= lambda * 100. Crowd of 20 with lambdas.
{
  const lambdas = [1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.9, 2.0, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.7, 3.0, 3.3, 4.0];
  const s = [...lambdas].sort((a, b) => a - b);
  const median = (s[9] + s[10]) / 2;
  const acceptAt = (x) => lambdas.filter((l) => x >= l * 100).length;
  ok("12 loss aversion: median prize most people need", median === 2.0 && acceptAt(200) >= 10 && acceptAt(120) < 3, `median lambda ${median}: ${acceptAt(120)}/20 accept at $120, ${acceptAt(200)}/20 at $200 (answer: about $200)`);
}

console.log(fail ? `\n${fail} check(s) failed` : "\nall book brief answers check");
process.exit(fail ? 1 : 0);
