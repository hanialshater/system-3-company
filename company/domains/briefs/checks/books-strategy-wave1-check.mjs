#!/usr/bin/env node
// Checks for the Book Summaries "## Strategy wave 1" briefs (ranks 13-24) in company/domains/briefs/books.md.
// Run: node company/domains/briefs/checks/books-strategy-wave1-check.mjs
// 1. Recomputes every number a brief states from its stated toy model (derivation claims), and checks the
//    stated answer letter. Published figures (study rates, the book's class test) are checked only for
//    internal arithmetic; whether they are right is the fact-checker's job.
// 2. Parses the briefs file: stage question <= 25 words, reveal draft <= 90 words and equal to its stated
//    count, a Format line, presets in DOM order, the three claim families, and the answer-letter spread.
// Exits non-zero on any failure. Written by cm-books, 2026-10-14.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const r = (x, d = 2) => Number(x.toFixed(d));
const mulberry32 = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const answers = {};

// 13. ten-thousand-hours-how-much: a 40-person toy scatter with r^2 exactly as each preset says.
{
  const n = 40;
  // x: evenly spaced normal quantiles (Acklam-free: inverse via bisection on erf).
  const erf = (x) => { const t = 1 / (1 + 0.3275911 * Math.abs(x)); const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return x >= 0 ? y : -y; };
  const phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const q = (p) => { let lo = -8, hi = 8; for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; if (phi(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; };
  const x = Array.from({ length: n }, (_, i) => q((i + 0.5) / n));
  const R = mulberry32(10000);
  const z2 = Array.from({ length: n }, () => Math.sqrt(-2 * Math.log(R() || 1e-12)) * Math.cos(2 * Math.PI * R()));
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const mx = mean(x), sxx = x.reduce((s, v) => s + (v - mx) ** 2, 0);
  const beta = x.reduce((s, v, i) => s + (v - mx) * z2[i], 0) / sxx;
  let e = z2.map((v, i) => v - beta * (x[i] - mx)); const me = mean(e); e = e.map((v) => v - me);
  const scale = Math.sqrt(sxx / e.reduce((s, v) => s + v * v, 0)); e = e.map((v) => v * scale);
  const r2 = (rr) => { const y = x.map((v, i) => rr * (v - mx) + Math.sqrt(1 - rr * rr) * e[i]); const my = mean(y); const sxy = x.reduce((s, v, i) => s + (v - mx) * (y[i] - my), 0); const syy = y.reduce((s, v) => s + (v - my) ** 2, 0); return (sxy * sxy) / (sxx * syy); };
  const shares = { rule: 0.9, games: 0.26, music: 0.21, sport: 0.18 };
  const got = Object.fromEntries(Object.entries(shares).map(([k, v]) => [k, r(r2(Math.sqrt(v)) * 100, 1)]));
  ok("13 toy r^2 by construction", got.rule === 90 && got.games === 26 && got.music === 21 && got.sport === 18, JSON.stringify(got));
  const fields = [26, 21, 18];
  ok("13 answer A (a quarter or less)", fields.every((f) => f <= 26) && Math.max(...fields) < 50, `measured shares ${fields.join(", ")}% (meta-analysis figures, to confirm)`);
  answers[13] = "A";
}

// 14. biased-judge-noisy-judge: MSE = bias^2 + variance.
{
  const A = Array(10).fill(2);
  const B = [-3, -3, -1, -1, 0, 0, 1, 1, 3, 3];
  const C = B.map((v) => v + 2);
  const mse = (a) => a.reduce((s, v) => s + v * v, 0) / a.length;
  const bias = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const vari = (a) => { const m = bias(a); return a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length; };
  ok("14 judge A", mse(A) === 4 && bias(A) ** 2 === 4 && vari(A) === 0, `mse ${mse(A)} = ${bias(A) ** 2} + ${vari(A)}`);
  ok("14 judge B", mse(B) === 4 && bias(B) === 0 && vari(B) === 4 && Math.sqrt(vari(B)) === 2, `mse ${mse(B)}, mean ${bias(B)}, sd ${Math.sqrt(vari(B))}`);
  ok("14 judge C", mse(C) === 8 && r(bias(C) ** 2 + vari(C), 6) === 8, `mse ${mse(C)} = ${bias(C) ** 2} + ${vari(C)}`);
  answers[14] = mse(A) === mse(B) ? "C" : "?";
}

// 15. dice-line-falls-behind: 5 dependent stations, a die each, sequential passing within a round.
{
  const line = (rand, rounds = 20, n = 5, fixed = null) => {
    const pile = Array(n).fill(0); let out = 0;
    for (let rd = 0; rd < rounds; rd++) {
      let incoming = 0;
      for (let k = 0; k < n; k++) {
        const d = fixed ? fixed(rd) : 1 + Math.floor(rand() * 6);
        if (k > 0) pile[k] += incoming;
        const m = k === 0 ? d : Math.min(d, pile[k]);
        if (k > 0) pile[k] -= m;
        incoming = m;
        if (k === n - 1) out += m;
      }
    }
    return { avg: out / rounds, wip: pile.reduce((s, v) => s + v, 0) };
  };
  const s7 = line(mulberry32(7));
  let sa = 0, sw = 0; for (let sd = 1; sd <= 1000; sd++) { const v = line(mulberry32(sd)); sa += v.avg; sw += v.wip; }
  const steady = line(null, 20, 5, (rd) => (rd % 2 === 0 ? 3 : 4));
  ok("15 seed 7", r(s7.avg, 2) === 2.7 && s7.wip === 18, `finished ${s7.avg}/round, ${s7.wip} piled`);
  ok("15 1,000 lines", r(sa / 1000, 2) === 2.57 && r(sw / 1000, 1) === 18.9, `mean ${r(sa / 1000, 3)}/round, ${r(sw / 1000, 2)} piled`);
  ok("15 no swings", steady.avg === 3.5 && steady.wip === 0, `${steady.avg}/round, ${steady.wip} piled`);
  const near25 = (v) => Math.abs(v - 2.5) < Math.abs(v - 3.5);
  ok("15 answer B (about 2.5)", near25(sa / 1000) && near25(s7.avg), "both nearer 2.5 than 3.5");
  answers[15] = "B";
}

// 16. tick-to-join-or-leave: a four-group crowd fitted to the study's 42 / 82 / 79.
{
  const g = { always: 42, leanYes: 37, leanNo: 3, never: 18 };
  const total = g.always + g.leanYes + g.leanNo + g.never;
  const join = g.always, leave = total - g.never, choose = g.always + g.leanYes;
  ok("16 crowd", total === 100 && join === 42 && leave === 82 && choose === 79, `join ${join}, leave ${leave}, choose ${choose}`);
  ok("16 answer A (about 40 points)", leave - join === 40, `gap ${leave - join} points`);
  answers[16] = "A";
}

// 17. rome-beijing-same-daylight: geometric day length at the June solstice, haversine distances.
{
  const rad = Math.PI / 180;
  const dayH = (lat) => 2 * Math.acos(Math.max(-1, Math.min(1, -Math.tan(lat * rad) * Math.tan(23.44 * rad)))) / rad / 15;
  const hm = (h) => { const m = Math.round(h * 60); return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`; };
  const km = (a, b) => { const dp = (b[0] - a[0]) * rad, dl = (b[1] - a[1]) * rad; const h = Math.sin(dp / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dl / 2) ** 2; return 2 * 6371 * Math.asin(Math.sqrt(h)); };
  const C = { rome: [41.9, 12.5], beijing: [39.9, 116.4], lagos: [6.45, 3.4], mexico: [19.43, -99.13], lima: [-12.05, -77.04] };
  const D = Object.fromEntries(Object.entries(C).map(([k, v]) => [k, dayH(v[0])]));
  const mins = (h) => Math.round(h * 60); const gap = (a, b) => Math.abs(mins(D[a]) - mins(D[b])); // between the rounded times shown
  ok("17 day lengths", hm(D.rome) === "15 h 03" && hm(D.beijing) === "14 h 50" && hm(D.lagos) === "12 h 22" && hm(D.mexico) === "13 h 10" && hm(D.lima) === "11 h 18",
    `Rome ${hm(D.rome)}, Beijing ${hm(D.beijing)}, Lagos ${hm(D.lagos)}, Mexico City ${hm(D.mexico)}, Lima ${hm(D.lima)}`);
  ok("17 gaps", gap("rome", "beijing") === 13 && gap("rome", "lagos") === 161 && gap("mexico", "lima") === 112, `Rome-Beijing ${gap("rome", "beijing")} min, Rome-Lagos ${gap("rome", "lagos")} min (2 h 41), Mexico-Lima ${gap("mexico", "lima")} min (1 h 52)`);
  const rb = km(C.rome, C.beijing), rl = km(C.rome, C.lagos), ml = km(C.mexico, C.lima);
  ok("17 distances", Math.round(rb) === 8125 && Math.round(rl) === 4043 && Math.round(ml) === 4255 && Math.abs(rb / rl - 2) < 0.05, `Rome-Beijing ${Math.round(rb)} km, Rome-Lagos ${Math.round(rl)} km (ratio ${r(rb / rl)}), Mexico-Lima ${Math.round(ml)} km`);
  answers[17] = gap("rome", "beijing") < gap("rome", "lagos") ? "A" : "?";
}

// 18. one-deal-beats-the-rest: sums of 1/k^2, 1/k and a bell curve.
{
  const rest = (p) => { let s = 0; for (let k = 2; k <= 20; k++) s += 50 / k ** p; return s; };
  const bell = Array.from({ length: 20 }, (_, i) => 1 + (i * 2) / 19);
  const bellRest = bell.slice(0, 19).reduce((s, v) => s + v, 0);
  ok("18 steep tail", r(rest(2), 1) === 29.8, `#1 50x vs rest ${r(rest(2), 2)}x`);
  ok("18 gentle tail", r(rest(1), 1) === 129.9, `#1 50x vs rest ${r(rest(1), 2)}x`);
  ok("18 bell curve", r(bell[19], 2) === 3 && Math.round(bellRest) === 37, `best ${r(bell[19], 2)}x vs rest ${r(bellRest, 2)}x`);
  answers[18] = 50 > rest(2) ? "B" : "?";
}

// 19. decoy-nobody-buys: internal arithmetic of the book's reported shares (figures to confirm).
{
  const two = [68, 32], three = [16, 0, 84];
  ok("19 shares sum", two[0] + two[1] === 100 && three.reduce((s, v) => s + v, 0) === 100, `two ${two.join("/")}, three ${three.join("/")}`);
  answers[19] = "C";
}

// 20. most-guests-reuse-towels: rounding published rates to 100 rooms (figures to confirm).
{
  const rates = [35.1, 44.1, 49.3].map(Math.round);
  ok("20 rooms", rates.join() === "35,44,49", rates.join(" / "));
  answers[20] = rates[1] === 44 ? "B" : "?";
}

// 21. one-slip-echoes-forever: iterated prisoner's dilemma, payoffs 3/3, 0/5, 1/1.
{
  const pay = (a, b) => (a === "C" ? (b === "C" ? [3, 3] : [0, 5]) : b === "C" ? [5, 0] : [1, 1]);
  const play = (rule, slipRound) => {
    const ha = [], hb = []; let sa = 0, sb = 0;
    for (let t = 1; t <= 100; t++) {
      let a = rule(hb), b = rule(ha);
      if (t === slipRound) a = "D";
      const [pa, pb] = pay(a, b); sa += pa; sb += pb; ha.push(a); hb.push(b);
    }
    return [sa, sb, ha, hb];
  };
  const tft = (opp) => (opp.length ? opp[opp.length - 1] : "C");
  const tf2t = (opp) => (opp.length >= 2 && opp[opp.length - 1] === "D" && opp[opp.length - 2] === "D" ? "D" : "C");
  const clean = play(tft, 0), slip = play(tft, 10), forgive = play(tf2t, 10);
  ok("21 no mistakes", clean[0] === 300 && clean[1] === 300, `${clean[0]} / ${clean[1]}`);
  const alternates = slip[2].slice(9).every((m, i) => m === (i % 2 === 0 ? "D" : "C"));
  ok("21 one slip echoes", slip[0] === 257 && slip[1] === 252 && alternates, `${slip[0]} / ${slip[1]}; A alternates D, C from round 10 to 100: ${alternates}`);
  ok("21 tit for two tats", forgive[0] === 302 && forgive[1] === 297, `${forgive[0]} / ${forgive[1]}`);
  answers[21] = alternates ? "A" : "?";
}

// 22. trade-the-issues: two issues, different weights.
{
  const buyer = (p, d) => 40 * p + 10 * d, seller = (p, d) => 10 * (1 - p) + 40 * (1 - d);
  const half = [buyer(0.5, 0.5), seller(0.5, 0.5)], trade = [buyer(1, 0), seller(1, 0)];
  ok("22 halfway", half[0] === 25 && half[1] === 25, half.join(" / "));
  ok("22 trade", trade[0] === 40 && trade[1] === 40 && trade[0] + trade[1] - (half[0] + half[1]) === 30, `${trade.join(" / ")}; ${trade[0] + trade[1] - half[0] - half[1]} points unclaimed at halfway`);
  answers[22] = trade[0] > half[0] && trade[1] > half[1] ? "C" : "?";
}

// 23. poison-climbs-the-chain: x10 per link, or x5 if half is excreted.
{
  const chain = (f) => [0, 1, 2, 3, 4].map((k) => 0.02 * f ** k);
  const full = chain(10), half = chain(5);
  ok("23 four links", r(full[4], 6) === 200 && r(full[1], 6) === 0.2 && r(full[4] / full[0], 6) === 10000, full.map((v) => r(v, 3)).join(" -> "));
  ok("23 half excreted", r(half[4], 6) === 12.5, half.map((v) => r(v, 3)).join(" -> "));
  ok("23 distractor", r(0.02 * 10 ** 5, 6) === 2000, "2,000 ppm would need five links");
  answers[23] = "B";
}

// 24. late-hot-water-overshoots: S(t+1) = S(t) + k (38 - felt), felt = S(t - delay).
{
  const run = (delay, k, T = 30) => { const S = [30]; for (let t = 0; t < T; t++) { const felt = t - delay >= 0 ? S[t - delay] : 30; S.push(S[t] + k * (38 - felt)); } return S.map((_, t) => (t - delay >= 0 ? S[t - delay] : 30)); };
  const settle = (F) => { for (let t = 0; t < F.length; t++) if (F.slice(t).every((v) => Math.abs(v - 38) < 0.5)) return t; return null; };
  const a = run(0, 0.5), b = run(2, 0.5), c = run(2, 0.25, 40);
  ok("24 no delay", r(Math.max(...a), 1) === 38 && a.every((v, i) => i === 0 || v >= a[i - 1] - 1e-9), `peak ${r(Math.max(...a), 2)}, never falls`);
  ok("24 2-second delay", Math.max(...b) === 44 && r(Math.min(...b.slice(5)), 1) === 33.5 && r(b[28], 1) === 39.7 && settle(b) === null, `peak ${Math.max(...b)}, low ${Math.min(...b.slice(5))}, at 28 s ${r(b[28], 1)}, not settled by 30 s`);
  ok("24 gentle hand", r(Math.max(...c), 1) === 39.1 && settle(c) === 12, `peak ${r(Math.max(...c), 2)}, within 0.5 of 38 from ${settle(c)} s`);
  answers[24] = "C";
}

// Part 2: the briefs file.
const here = path.dirname(fileURLToPath(import.meta.url));
const md = fs.readFileSync(path.join(here, "..", "books.md"), "utf8");
const start = md.indexOf("\n## Strategy wave 1");
ok("file has a Strategy wave 1 section", start >= 0, "heading found");
const section = md.slice(start).split(/\n## (?!Strategy wave 1)/)[0];
const briefs = section.split(/\n(?=### \d+\. )/).filter((b) => /^### \d+\. /.test(b));
ok("12 briefs, ranks 13-24", briefs.length === 12, `${briefs.length} briefs`);
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const letters = [];
for (const b of briefs) {
  const rank = Number(b.match(/^### (\d+)\./)[1]);
  const slug = b.match(/^### \d+\. ([a-z0-9-]+)/)[1];
  const q = b.match(/Prediction \(stage text\): "([^"]+)"/);
  const rv = b.match(/Reveal payoff \(draft, (\d+) words\): "([^"]+)"/);
  const ans = b.match(/\(answer: ([A-D])\)/);
  ok(`${rank} ${slug} question <= 25 words`, q && words(q[1]) <= 25, q ? `${words(q[1])} words` : "no question");
  ok(`${rank} ${slug} reveal <= 90 words, count stated`, rv && words(rv[2]) <= 90 && Number(rv[1]) === words(rv[2]), rv ? `${words(rv[2])} words (stated ${rv[1]})` : "no reveal");
  ok(`${rank} ${slug} has format, DOM-order presets, three claim families`, /^- Format: /m.test(b) && /Preset buttons in DOM order:/.test(b) && /\*\*Derivation:\*\*/.test(b) && /\*\*Book-sourced:\*\*/.test(b) && /\*\*Research-sourced:\*\*/.test(b), "present");
  ok(`${rank} ${slug} answer matches the check`, ans && answers[rank] === ans[1], `brief ${ans ? ans[1] : "?"}, check ${answers[rank]}`);
  ok(`${rank} ${slug} no Reset preset`, !/Preset buttons in DOM order:[^\n]*"Reset"/.test(b), "none");
  if (ans) letters.push(ans[1]);
}
const spread = letters.reduce((m, l) => ((m[l] = (m[l] || 0) + 1), m), {});
ok("answer letters spread (none above half)", Object.values(spread).every((v) => v <= letters.length / 2) && Object.keys(spread).length >= 3, JSON.stringify(spread));

console.log(fail ? `\n${fail} check(s) failed` : "\nall checks pass");
process.exit(fail ? 1 : 0);
