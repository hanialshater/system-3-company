#!/usr/bin/env node
// Wave J life briefs (cm-life, 2026-10-14): recomputes every number in the 15 Wave J briefs.
// Run: node company/domains/briefs/checks/life-wave-j-check.mjs
// Labels: E2-E6 life.ecology-body.md, G6-G10 life.genetics-evolution.md, H4-H8 life.health-epidemiology.md
// (each brief's number in its file). No network; seeded randomness is the kit's mulberry32.
const log = (...a) => console.log(...a);
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };

// E2 bad-year-breaks-the-quota: dN/dt = 0.5N(1 - N/1000) - H, H = 120 (quota) or 0.2N (share), N(0) = 600, disease at year 10.
function harvest(rule, kill, dt = 0.001) {
  let N = 600, empty = null; const out = {};
  for (let i = 0; i < 60 / dt; i++) {
    const t = i * dt;
    if (i === Math.round(10 / dt)) N *= 1 - kill;
    if (i % Math.round(10 / dt) === 0) out[Math.round(t)] = Math.round(N);
    const h = rule === "quota" ? 120 : 0.2 * N;
    N += dt * (0.5 * N * (1 - N / 1000) - h);
    if (N <= 0) { N = 0; if (empty === null) empty = +(t.toFixed(1)); }
  }
  out[60] = Math.round(N); return { byYear: out, emptyAtYear: empty };
}
for (const k of [0, 0.3, 0.5]) for (const r of ["quota", "share"]) log("E2", r, "kill", k, JSON.stringify(harvest(r, k)));
log("E2 quota balance points (0.5N(1-N/1000) = 120):", [500 - Math.sqrt(250000 - 240000), 500 + Math.sqrt(250000 - 240000)], "growth at 300:", 0.5 * 300 * 0.7, "share balance N* = 1000(1 - 0.2/0.5) =", 1000 * (1 - 0.2 / 0.5));

// E3 empty-ponds-still-left: 100 ponds, occupied pond empties w.p. 0.2/yr, empty good pond colonized w.p. 1-(1-0.005)^n.
// Start: ponds 0-59 occupied. Drained ponds: index i with (i*37) % 100 < drain.
function ponds(drain, seed, years = 100) {
  const R = mulberry32(seed); let occ = Array.from({ length: 100 }, (_, i) => i < 60);
  const drained = (i) => ((i * 37) % 100) < drain;
  occ = occ.map((o, i) => o && !drained(i));
  const start = occ.filter(Boolean).length; let n = start, ext = null;
  for (let y = 1; y <= years; y++) {
    const pcol = 1 - Math.pow(1 - 0.005, n);
    occ = occ.map((o, i) => drained(i) ? false : (o ? R() > 0.2 : R() < pcol));
    n = occ.filter(Boolean).length; if (n === 0 && ext === null) ext = y;
  }
  return { start, year100: n, extinctYear: ext };
}
for (const d of [30, 50, 70]) {
  let ext = 0, sum = 0; for (let s = 1; s <= 1000; s++) { const r = ponds(d, s); if (r.year100 === 0) ext++; sum += r.year100; }
  log("E3 drain", d, "seed 1", JSON.stringify(ponds(d, 1)), "seeds 1-1000: extinct by year 100", ext, "mean ponds at year 100", sum / 1000);
}
for (const D of [0, 0.3, 0.5, 0.6, 0.7]) log("E3 Levins p* = max(0, 1 - D - e/c), e/c = 0.4; D =", D, "->", +Math.max(0, 1 - D - 0.4).toFixed(3));

// E4 opposite-flows-swap-more: S sections; each tick every section evens out by fraction k = 0.5 of the gap, then blood moves one section along, water moves one section along its own direction.
function exchanger(S, opposite, k = 0.5, ticks = 2000) {
  let b = new Array(S).fill(0), w = new Array(S).fill(100), out = 0;
  for (let t = 0; t < ticks; t++) {
    for (let i = 0; i < S; i++) { const d = k * (w[i] - b[i]); b[i] += d; w[i] -= d; }
    out = b[S - 1]; b = [0, ...b.slice(0, S - 1)];
    w = opposite ? [...w.slice(1), 100] : [100, ...w.slice(0, S - 1)];
  }
  return +out.toFixed(1);
}
for (const S of [1, 2, 4, 10, 20]) log("E4 sections", S, "same way", exchanger(S, false), "opposite", exchanger(S, true), "S/(S+1)*100 =", +(100 * S / (S + 1)).toFixed(1));

// E5 same-dose-levels-off: 100 units every I hours, half cleared every 6 hours, 10 days.
for (const I of [12, 6, 3]) {
  const f = Math.pow(0.5, I / 6), n = Math.round(240 / I); let x = 0; const peaks = [];
  for (let i = 0; i < n; i++) { x = x * (i ? f : 1) + 100; peaks.push(+x.toFixed(1)); }
  log("E5 every", I, "h:", n, "doses; just after doses 1-6:", peaks.slice(0, 6).join(", "), "; after the last:", peaks[n - 1], "; limit 100/(1-f) =", +(100 / (1 - f)).toFixed(1));
}

// E6 more-traps-more-species: 40 species, abundance proportional to 0.88^i; catch with replacement.
{
  const S = 40, w = [...Array(S)].map((_, i) => Math.pow(0.88, i)), W = w.reduce((a, b) => a + b, 0), p = w.map((x) => x / W);
  const ex = (n) => p.reduce((a, pi) => a + 1 - Math.pow(1 - pi, n), 0);
  log("E6 expected species at 50 / 500 / 5000:", ex(50).toFixed(1), ex(500).toFixed(1), ex(5000).toFixed(1), "commonest share", p[0].toFixed(3), "rarest", p[S - 1].toFixed(5));
  for (const seed of [1, 2, 3]) {
    const R = mulberry32(seed), seen = new Set(), at = {};
    for (let k = 1; k <= 5000; k++) { let u = R(), i = 0; while (i < S - 1 && u > p[i]) { u -= p[i]; i++; } seen.add(i); if ([50, 500, 5000].includes(k)) at[k] = seen.size; }
    log("E6 one cumulative catch, seed", seed, JSON.stringify(at));
  }
}

// G6 five-chicks-for-a-sister: helper carries one copy; gives up 2 own chicks (each carries w.p. 1/2);
// relative carries w.p. r (sister 1/2, cousin 1/8) and then each of her B extra chicks w.p. 1/2.
function kin(r, B, trials = 1000, seed = 7) {
  const R = mulberry32(seed); let lost = 0, gained = 0;
  for (let t = 0; t < trials; t++) { for (let i = 0; i < 2; i++) if (R() < 0.5) lost++; const carries = R() < r; for (let j = 0; j < B; j++) { const u = R(); if (carries && u < 0.5) gained++; } }
  return { lostPerHelper: +(lost / trials).toFixed(2), gainedPerHelper: +(gained / trials).toFixed(2), exactLost: 1, exactGained: r * 0.5 * B };
}
log("G6 sister +3", JSON.stringify(kin(0.5, 3)), "| sister +5", JSON.stringify(kin(0.5, 5)), "| cousin +5", JSON.stringify(kin(0.125, 5)));
log("G6 Hamilton r*B > C (B, C in the relative's / own offspring): sister 0.5*5 = 2.5 > 2; sister 0.5*3 = 1.5 < 2; cousin 0.125*5 = 0.625 < 2");

// G7 same-shape-different-genes: shape 0-100; open-water best 90, sea floor best 20. Per generation shape += 0.002(best - shape) + 0.3*gauss;
// 60 neutral letters, each changes w.p. 0.0001 per generation to another letter. A and C share an ancestor (same letters, shape 20); B random letters, shape 50.
function gauss(R) { return Math.sqrt(-2 * Math.log(R() + 1e-12)) * Math.cos(2 * Math.PI * R()); }
function lineages(seed, G = 2000) {
  const R = mulberry32(seed), L = 60, AL = "ACGT";
  const anc = [...Array(L)].map(() => AL[Math.floor(R() * 4)]), other = [...Array(L)].map(() => AL[Math.floor(R() * 4)]);
  const lin = { A: { s: 20, dna: [...anc], opt: 90 }, C: { s: 20, dna: [...anc], opt: 20 }, B: { s: 50, dna: other, opt: 90 } };
  const snap = {};
  const stat = () => { const id = (x, y) => lin[x].dna.filter((c, i) => c === lin[y].dna[i]).length; return { shapeA: Math.round(lin.A.s), shapeB: Math.round(lin.B.s), shapeC: Math.round(lin.C.s), lettersAB: id("A", "B"), lettersAC: id("A", "C") }; };
  for (let g = 0; g <= G; g++) {
    if ([0, 500, 1000, 2000].includes(g)) snap[g] = stat();
    for (const k of "ABC") { const l = lin[k]; l.s += 0.002 * (l.opt - l.s) + 0.3 * gauss(R); l.s = Math.max(0, Math.min(100, l.s)); for (let i = 0; i < L; i++) if (R() < 0.0001) { let c; do { c = AL[Math.floor(R() * 4)]; } while (c === l.dna[i]); l.dna[i] = c; } }
  }
  return snap;
}
log("G7 seed 3", JSON.stringify(lineages(3)));
{ let sAB = 0, sAC = 0, iAB = 0, iAC = 0; for (let s = 1; s <= 1000; s++) { const r = lineages(s)[2000]; sAB += Math.abs(r.shapeA - r.shapeB); sAC += Math.abs(r.shapeA - r.shapeC); iAB += r.lettersAB; iAC += r.lettersAC; }
  log("G7 seeds 1-1000 at generation 2000: mean shape gap A-B", sAB / 1000, "A-C", sAC / 1000, "; mean matching letters of 60 A-B", iAB / 1000, "A-C", iAC / 1000, "; chance level 15"); }

// G8 many-genes-smooth-curve: n genes, tall form w.p. 1/2 adds 2 cm; 1,000 plants, seed 5.
for (const n of [1, 2, 10]) { const R = mulberry32(5), h = new Array(n + 1).fill(0); for (let i = 0; i < 1000; i++) { let k = 0; for (let g = 0; g < n; g++) if (R() < 0.5) k++; h[k]++; } log("G8 genes", n, "seed 5 counts by number of tall forms:", h.join(","), "| expected:", [...Array(n + 1)].map((_, k) => (1000 * binom(n, k) / 2 ** n).toFixed(1)).join(",")); }
log("G8 10 genes: middle three (4-6 tall forms) expected share", ((binom(10, 4) + binom(10, 5) + binom(10, 6)) / 1024).toFixed(3), "; all 10 tall 1 in", 2 ** 10);

// G9 never-more-than-half-apart: crossovers between the genes ~ Poisson(m); separated iff odd. Each preset reseeds 11, 100 eggs.
function poisson(R, m) { const L = Math.exp(-m); let k = 0, p = 1; do { k++; p *= R(); } while (p > L); return k - 1; }
for (const [name, m] of [["close", 0.05], ["middle", 0.5], ["far ends", 3]]) { const R = mulberry32(11); let sep = 0; for (let i = 0; i < 100; i++) if (poisson(R, m) % 2) sep++; const R2 = mulberry32(12); let big = 0; for (let i = 0; i < 10000; i++) if (poisson(R2, m) % 2) big++; log("G9", name, "m =", m, "seed 11: separated", sep, "of 100 | 10,000 eggs seed 12:", big / 10000, "| exact (1 - e^-2m)/2 =", ((1 - Math.exp(-2 * m)) / 2).toFixed(4)); }
{ const R = mulberry32(11); let s = 0; for (let i = 0; i < 100; i++) if (R() < 0.5) s++; log("G9 other chromosome (1/2 each egg) seed 11: separated", s, "of 100"); }

// G10 clones-take-over-fast: clone share of females x' = 2x/(1+x), x0 = 1/1000.
{ let x = 0.001; const v = []; for (let g = 0; g <= 20; g++) { v.push(+(100 * x).toFixed(1)); x = 2 * x / (1 + x); } log("G10 clone % of females by generation 0-20:", v.join(", ")); }

// H4 friends-of-friends-slow-spread: 60 people, 4 contacts each. Town A ring (2 nearest each side); Town B random 4-regular (pairing, seed 42).
// Person 0 sick on day 0; sick for 1 day; each healthy contact infected w.p. 0.5 that day; then immune.
{
  const N = 60;
  const ring = () => { const nb = [...Array(N)].map(() => []); for (let i = 0; i < N; i++) for (const d of [1, 2]) { const j = (i + d) % N; nb[i].push(j); nb[j].push(i); } return nb; };
  const randomReg = (seed) => { const R = mulberry32(seed); for (;;) { const st = []; for (let i = 0; i < N; i++) for (let k = 0; k < 4; k++) st.push(i); for (let i = st.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [st[i], st[j]] = [st[j], st[i]]; } const nb = [...Array(N)].map(() => new Set()); let ok = true; for (let k = 0; k < st.length; k += 2) { const a = st[k], b = st[k + 1]; if (a === b || nb[a].has(b)) { ok = false; break; } nb[a].add(b); nb[b].add(a); } if (ok) return nb.map((s) => [...s]); } };
  const clustering = (nb) => { let t = 0; for (let i = 0; i < N; i++) { const n = nb[i]; let l = 0, p = 0; for (let a = 0; a < n.length; a++) for (let b = a + 1; b < n.length; b++) { p++; if (nb[n[a]].includes(n[b])) l++; } t += l / p; } return t / N; };
  const sir = (nb, seed, days = 10) => { const R = mulberry32(seed), st = new Array(N).fill(0); st[0] = 1; let ever = 1; const series = [1]; for (let d = 1; d <= days; d++) { const inf = []; for (let i = 0; i < N; i++) if (st[i] === 1) inf.push(i); const nw = new Set(); for (const i of inf) for (const j of nb[i]) if (st[j] === 0 && !nw.has(j) && R() < 0.5) nw.add(j); for (const i of inf) st[i] = 2; for (const j of nw) st[j] = 1; ever += nw.size; series.push(ever); } return series; };
  const A = ring(), B = randomReg(42);
  log("H4 clustering A", clustering(A).toFixed(2), "B", clustering(B).toFixed(3));
  log("H4 seed 1 ever-sick by day 0-10: A", sir(A, 1).join(","), "| B", sir(B, 1).join(","));
  let a = 0, b = 0; for (let s = 1; s <= 2000; s++) { a += sir(A, s).at(-1); b += sir(B, s).at(-1); } log("H4 seeds 1-2000 mean ever-sick by day 10: A", (a / 2000).toFixed(1), "B", (b / 2000).toFixed(1));
}

// H5 who-has-it-today: S 50 new a week, lasts 1 week; L 5 new a week, lasts 20 weeks; both start in week 1. Number ill in week w: S 50, L 5*min(w, 20).
for (const wk of [5, 10, 20, 52]) log("H5 week", wk, "S", 50, "L", 5 * Math.min(wk, 20));

// H6 trace-back-finds-the-cluster: 10 spreaders infected [12,3,0x8] (uneven) or [2x5,1x5] (even), 15 cases either way.
for (const [name, z] of [["uneven", [12, 3, 0, 0, 0, 0, 0, 0, 0, 0]], ["even", [2, 2, 2, 2, 2, 1, 1, 1, 1, 1]]]) {
  const s = z.reduce((x, y) => x + y, 0), s2 = z.reduce((x, y) => x + y * y, 0);
  const R = mulberry32(4), pool = []; z.forEach((c, i) => { for (let k = 0; k < c; k++) pool.push(i); }); const back = []; for (let k = 0; k < 5; k++) back.push(pool.splice(Math.floor(R() * pool.length), 1)[0]);
  const R2 = mulberry32(4), ppl = [...Array(10).keys()], fwd = []; for (let k = 0; k < 5; k++) fwd.push(ppl.splice(Math.floor(R2() * ppl.length), 1)[0]);
  const avg = (ix) => ix.reduce((x, i) => x + z[i], 0) / ix.length;
  log("H6", name, "mean per spreader", s / 10, "| exact mean for the infector of a random case E[Z^2]/E[Z] =", (s2 / s).toFixed(2), "| seed 4 back: infectors infected", back.map((i) => z[i]).join(","), "avg", avg(back), "| seed 4 forward: 5 spreaders infected", fwd.map((i) => z[i]).join(","), "avg", avg(fwd));
}

// H7 screening-finds-slow-ones: slow person i (0-9) silent in [i, i+4); fast person i silent in [i+0.5, i+1.5). Screen in year y.
for (const y of [4, 6, 8]) { let slow = 0, fast = 0; for (let i = 0; i < 10; i++) { if (y >= i && y < i + 4) slow++; if (y >= i + 0.5 && y < i + 1.5) fast++; } log("H7 screen year", y, "found slow", slow, "fast", fast, "slow share", slow / (slow + fast)); }

// H8 bites-count-twice: R = (mosquitoes infected per sick person) x (people infected per infected mosquito).
// leg 1 = mosquitoes per person 4 x bites per mosquito per day a x 10 sick days x 0.5; leg 2 = a x 10-day mosquito life x 0.5.
for (const [name, m, a] of [["now", 4, 0.2], ["half the mosquitoes", 2, 0.2], ["half the bites", 4, 0.1], ["both", 2, 0.1]]) { const l1 = m * a * 10 * 0.5, l2 = a * 10 * 0.5; log("H8", name, "leg 1", +l1.toFixed(2), "leg 2", +l2.toFixed(2), "R", +(l1 * l2).toFixed(2)); }
