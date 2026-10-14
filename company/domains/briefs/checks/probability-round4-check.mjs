// Re-run: node company/domains/briefs/checks/probability-round4-check.mjs
// cm-probability, 2026-10-14. Every number in the Round 4 briefs (probability*.md, briefs 56-70). Line labels are brief numbers.
// Exact arithmetic first; seeded mulberry32 simulation only as a cross-check.
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const r = (x, d = 1) => Number(x.toFixed(d));
const out = (k, v) => console.log(k.padEnd(34), typeof v === "object" ? JSON.stringify(v) : v);
const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;

// 56 false-discovery-rate: 1,000 ideas, power 80%, false-alarm rate 5%
for (const p of [0.5, 0.1, 0.01]) { const tp = 1000 * p * 0.8, fp = 1000 * (1 - p) * 0.05; out(`56 prior ${p}: tp, fp, false%`, [tp, fp, r((100 * fp) / (tp + fp))]); }

// 57 control-groups: deterministic recovery days, the same list in both rows (the pill does nothing)
{ const days = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 8, 9, 10, 12]; const by = (d) => days.filter((x) => x <= d).length; out("57 better by day 3 / day 7", [by(3), by(7)]); }

// 58 random-assignment: 40 patients, recovery chance 30%..90% evenly spaced; drug does nothing
{ const c = Array.from({ length: 40 }, (_, i) => 0.3 + (0.6 * i) / 39);
  const top = c.slice(20), bot = c.slice(0, 20);
  out("58 doctor: drug%, other%, gap", [r(100 * mean(top)), r(100 * mean(bot)), r(100 * (mean(top) - mean(bot)))]);
  out("58 doctor: recoveries of 20", [r(20 * mean(top)), r(20 * mean(bot))]);
  const sd = Math.sqrt(mean(c.map((x) => (x - mean(c)) ** 2))); out("58 coin: sd of gap (pts, exact)", r((100 * 2 * sd) / Math.sqrt(39), 2));
  const rnd = mulberry32(58); let big = 0; const n = 100000; const gaps = [];
  for (let t = 0; t < n; t++) { const idx = [...c.keys()]; for (let i = 39; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    const g = mean(idx.slice(0, 20).map((i) => c[i])) - mean(idx.slice(20).map((i) => c[i])); if (Math.abs(g) >= 0.15) big++; if (t < 3) gaps.push(r(100 * g)); }
  out("58 coin sim: share |gap|>=15 pts", r((100 * big) / n, 2)); out("58 coin first 3 gaps (seed 58)", gaps); }

// 59 self-selection: B's fans twice as likely to reply to an open web poll; town split 50/50
{ out("59 web poll A share (any size)", r(100 / 3)); out("59 random 1,000: 95% margin pts", r(100 * 1.96 * Math.sqrt(0.25 / 1000)));
  const rnd = mulberry32(59); let a = 0; for (let i = 0; i < 1000; i++) if (rnd() < 0.5) a++; out("59 random poll seed 59: A%", r(a / 10)); }

// 60 truncated-axis: 52 vs 56
out("60 apparent ratio axis 0/40/50", [0, 40, 50].map((b) => r((56 - b) / (52 - b), 2)));

// 61 per-capita-rates (fictional towns)
{ const t = { A: [200000, 400], B: [80000, 240], C: [50000, 200], D: [20000, 100], E: [10000, 15], F: [5000, 30] };
  out("61 thefts per 1,000", Object.fromEntries(Object.entries(t).map(([k, [p, x]]) => [k, (1000 * x) / p]))); out("61 totals ratio A/F", r(400 / 30)); }

// 62 pattern-waiting-times: exact E[HH] = 6, E[HT] = 4
// HH: e0 = 1 + e0/2 + e1/2, e1 = 1 + e0/2 -> e0 = 6.  HT: e0 = 1 + e0/2 + e1/2, e1 = 1 + e1/2 -> e1 = 2, e0 = 4.
{ const rnd = mulberry32(62); const wait = (pat) => { let s = "", n = 0; while (!s.endsWith(pat)) { s = (s + (rnd() < 0.5 ? "H" : "T")).slice(-2); n++; } return n; };
  let hh = 0, ht = 0; const N = 100000; for (let i = 0; i < N; i++) hh += wait("HH"); for (let i = 0; i < N; i++) ht += wait("HT");
  out("62 sim mean wait HH / HT", [r(hh / N, 2), r(ht / N, 2)]); }

// 63 record-values: P(year k sets a record) = 1/k for independent, identically distributed years
{ const H = (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / k; return s; };
  out("63 H(100), H(10), H(100)-H(50)", [r(H(100), 3), r(H(10), 3), r(H(100) - H(50), 3)]);
  const rnd = mulberry32(63); let tot = 0; const N = 10000; for (let c = 0; c < N; c++) { let m = -1, k = 0; for (let y = 0; y < 100; y++) { const v = rnd(); if (v > m) { m = v; k++; } } tot += k; }
  out("63 sim mean records per 100 years", r(tot / N, 2)); }

// 64 draw-order-fairness: 10 straws, 1 short, drawn in turn without replacement
{ const rnd = mulberry32(64); const t = Array(10).fill(0); for (let s = 0; s < 1000; s++) { let left = 10; for (let p = 0; p < 10; p++) { if (rnd() < 1 / left) { t[p]++; break; } left--; } }
  out("64 exact: position k", "(9/10)(8/9)...(1/(11-k)) = 1/10"); out("64 sim 1,000 rounds (seed 64)", t); }

// 65 stopping-rules: every family has children until the first boy
{ const rnd = mulberry32(65); let b = 0, g = 0, one = 0; for (let f = 0; f < 1000; f++) { let kids = 0; for (;;) { kids++; if (rnd() < 0.5) { b++; break; } g++; } if (kids === 1) one++; }
  out("65 sim 1,000 families: boys, girls, %g", [b, g, r((100 * g) / (b + g))]); out("65 sim: families with 1 child", one);
  { const rnd2 = mulberry32(65); let b2 = 0, g2 = 0, b4 = 0, g4 = 0; for (let f = 0; f < 10000; f++) for (;;) { if (rnd2() < 0.5) { b2++; break; } g2++; }
    const rnd3 = mulberry32(65); for (let f = 0; f < 10000; f++) for (let k = 0; k < 4; k++) { if (rnd3() < 0.5) { b4++; break; } g4++; }
    out("65 sim 10,000 families: %girls", r((100 * g2) / (b2 + g2))); out("65 sim 10,000, cap 4: %girls", r((100 * g4) / (b4 + g4))); }
  out("65 exact per family: boys, girls", [1, 1]); out("65 cap at 4 children: E boys, E girls", [1 - 0.5 ** 4, 0.5 + 0.25 + 0.125 + 0.0625]); }

// 69 group-testing: 1,000 people, prevalence p, pools of k, perfect test, retest everyone in a positive pool
{ const tests = (k, p) => (k === 1 ? 1000 : 1000 / k + 1000 * (1 - (1 - p) ** k));
  out("69 p=1%: k=1,5,10,11,20,50", [1, 5, 10, 11, 20, 50].map((k) => r(tests(k, 0.01))));
  out("69 p=10%: k=1,3,4,5,10", [1, 3, 4, 5, 10].map((k) => r(tests(k, 0.1))));
  out("69 share of pools of 10 positive", r(100 * (1 - 0.99 ** 10), 2));
  const rnd = mulberry32(66); const inf = Array.from({ length: 1000 }, () => rnd() < 0.01); let pos = 0; for (let i = 0; i < 100; i++) if (inf.slice(10 * i, 10 * i + 10).some(Boolean)) pos++;
  out("69 seed 66: infected, +pools, tests", [inf.filter(Boolean).length, pos, 100 + 10 * pos]); }

// 70 serial-number-estimation: true total N = 100, see k = 4 distinct serials at random
{ const N = 100, k = 4; out("70 exact E[largest seen]", r((k * (N + 1)) / (k + 1), 2));
  const rnd = mulberry32(67); let sm = 0, se = 0; const T = 100000;
  for (let t = 0; t < T; t++) { const s = new Set(); while (s.size < k) s.add(1 + Math.floor(rnd() * N)); const m = Math.max(...s); sm += m; se += m + m / k - 1; }
  out("70 sim mean: largest, largest+gap", [r(sm / T, 2), r(se / T, 2)]); }

// 66 correlation-strength: typical prediction error shrinks by 1 - sqrt(1 - r^2)
for (const q of [0, 0.5, 0.8, 0.95]) out(`66 r=${q}: error shrink %, r^2 %`, [r(100 * (1 - Math.sqrt(1 - q * q))), r(100 * q * q)]);

// 67 dual-axis: sales 100,102,...,110 (left axis 100-110); ad spend 10,18,...,50 (right axis lo-hi); years 1-6
{ const cross = (lo, hi) => { const a = 1 / 5 - 8 / (hi - lo), b = (10 - lo) / (hi - lo); return Math.abs(a) < 1e-12 ? (Math.abs(b) < 1e-12 ? "same line" : "never") : r(1 + b / a, 2); };
  out("67 crossing year: 0-60, 10-50, 0-100", [cross(0, 60), cross(10, 50), cross(0, 100)]); out("67 growth %: sales, ads", [10, 400]); }

// 68 cherry-picked-window: y_t = t + uniform(-2, 2) noise (mulberry32(70)), plus +12 in year 10 (a freak year)
{ const rnd = mulberry32(70); const y = []; for (let t = 1; t <= 30; t++) y.push(r(t + (rnd() * 4 - 2) + (t === 10 ? 12 : 0)));
  out("68 series", y); out("68 rise per year from year 1/10/20 to 30", [1, 10, 20].map((s) => r((y[29] - y[s - 1]) / (30 - s), 2))); }
