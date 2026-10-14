#!/usr/bin/env node
// Life Hacks Wave J: recompute every number in company/domains/briefs/lifehacks.md briefs 6-14.
// Pure node, no network, no dependencies. Run: node company/domains/briefs/checks/lifehacks-wave-j-check.mjs
// Each block prints the label used on the brief's "Check" line (J6..J14). All model constants are
// illustrative and stated in the briefs; nothing here is a measurement.

const r = (x, d = 2) => Number(x.toFixed(d));
const out = (label, obj) => console.log(label, JSON.stringify(obj));

// mulberry32, as in src/kit/random
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- J6 interleaved practice: blocked vs mixed sheet, choice-skill model ----------
{
  const blocked = "AAAABBBBCCCC".split("");
  const mixed = "ABCBACACBCAB".split(""); // fixed shuffle, 4 of each
  const counts = (s) => ({ A: s.filter((x) => x === "A").length, B: s.filter((x) => x === "B").length, C: s.filter((x) => x === "C").length });
  // A "choice" problem: its kind differs from the problem before (repeating the last method would fail).
  const choices = (s) => s.filter((k, i) => i > 0 && k !== s[i - 1]).length;
  // Illustrative model: P(correct) = exec on a repeat, choice*exec on a changed kind.
  // exec starts 0.6 and moves 15% of the way to 1 after every problem; choice starts 1/3 (guess
  // among three methods) and moves 20% of the way to 1 only after a choice problem.
  // The first problem of a sheet counts as a choice for scoring and training (no previous problem).
  const run = (s) => {
    let e = 0.6, c = 1 / 3, score = 0;
    s.forEach((k, i) => {
      const isChoice = i === 0 || k !== s[i - 1];
      score += isChoice ? c * e : e;
      e += 0.15 * (1 - e);
      if (isChoice) c += 0.2 * (1 - c);
    });
    return { practice: score, exec: e, choice: c };
  };
  const b = run(blocked), m = run(mixed);
  // Mixed test: 6 problems, every one a change of kind, scored c*e with the skills left by practice.
  const test = (x) => 6 * x.choice * x.exec;
  out("J6", {
    blockedCounts: counts(blocked), mixedCounts: counts(mixed),
    choiceProblems: { blocked: choices(blocked) + 1, mixed: choices(mixed) + 1 },
    repeatProblems: { blocked: 12 - (choices(blocked) + 1), mixed: 12 - (choices(mixed) + 1) },
    practiceScoreOf12: { blocked: r(b.practice, 1), mixed: r(m.practice, 1) },
    testScoreOf6: { blocked: r(test(b), 1), mixed: r(test(m), 1) },
    choiceSkill: { blocked: r(b.choice), mixed: r(m.choice) },
  });
}

// ---------- J7 learning styles: what pattern would support matching ----------
{
  // Mean test scores (out of 10), made-up. Rows: prefers pictures (P) / prefers words (W).
  // Columns: diagram lesson (D) / audio lesson (A).
  const studies = {
    "Study 1": { PD: 7, PA: 5, WD: 6, WA: 4 }, // everyone better with diagrams
    "Study 2": { PD: 7, PA: 6, WD: 5, WA: 4 }, // picture-preferrers score higher in both, both better with D
    "Study 3": { PD: 7, PA: 5, WD: 5, WA: 7 }, // crossover
  };
  const verdict = (s) => {
    const pGain = s.PD - s.PA, wGain = s.WA - s.WD; // gain from the matched format for each group
    return { picturesMatchedGain: pGain, wordsMatchedGain: wGain, supportsMatching: pGain > 0 && wGain > 0, bestForAll: s.PD + s.WD > s.PA + s.WA ? "diagram" : s.PD + s.WD < s.PA + s.WA ? "audio" : "tie" };
  };
  out("J7", Object.fromEntries(Object.entries(studies).map(([k, s]) => [k, verdict(s)])));
  // The question's fact, "picture-preferrers score higher with diagrams", holds in all three studies.
  out("J7-question-fact", Object.fromEntries(Object.entries(studies).map(([k, s]) => [k, s.PD > s.PA])));
}

// ---------- J8 battery: cycles count charge, not plug-ins ----------
{
  const days = 30;
  const ana = { perDay: 2, add: 40 }; // 50% -> 90%, twice a day
  const ben = { perDay: 1, add: 80 }; // 10% -> 90%, once a day
  const cycles = (p, d) => (p.perDay * p.add * d) / 100;
  const plugins = (p, d) => p.perDay * d;
  out("J8", {
    dailyChargeAdded: { ana: ana.perDay * ana.add, ben: ben.perDay * ben.add },
    fullCycles30d: { ana: cycles(ana, days), ben: cycles(ben, days) },
    plugIns30d: { ana: plugins(ana, days), ben: plugins(ben, days) },
    sliderEnds: { d1: [cycles(ana, 1), cycles(ben, 1)], d60: [cycles(ana, 60), cycles(ben, 60)] },
  });
}

// ---------- J9 backup: copies in one place share one fate ----------
{
  const p = 1 / 20; // a drive fails in a given year (illustrative)
  const s = 1 / 200; // fire, flood or theft takes everything at one address in a year (illustrative)
  const home = (n) => s + (1 - s) * p ** n; // n copies all at one address
  const split = (h, a) => home(h) * home(a); // h copies at home, a copies at a second address (independent)
  const oneIn = (x) => Math.round(1 / x);
  const exact = {
    "1 copy": home(1), "3 at home": home(3), "2 home + 1 away": split(2, 1), "6 at home": home(6),
  };
  out("J9-exact", Object.fromEntries(Object.entries(exact).map(([k, v]) => [k, { prob: r(v, 6), oneIn: oneIn(v) }])));
  // Seeded simulation the stage runs: 10,000 simulated years per preset, seed 20261014 (disclosed).
  const years = 10000;
  const sim = (h, a, seed) => {
    const rnd = mulberry32(seed); let lost = 0;
    for (let y = 0; y < years; y++) {
      const siteHome = rnd() < s, siteAway = rnd() < s;
      let alive = 0;
      for (let i = 0; i < h; i++) { const f = rnd() < p; if (!siteHome && !f) alive++; }
      for (let i = 0; i < a; i++) { const f = rnd() < p; if (!siteAway && !f) alive++; }
      if (alive === 0) lost++;
    }
    return lost;
  };
  const seed = 20261014;
  out("J9-sim", { seed, years, "1 copy": sim(1, 0, seed), "3 at home": sim(3, 0, seed), "6 at home": sim(6, 0, seed), "2 home + 1 away": sim(2, 1, seed) });
  // The floor: however many copies at home, the yearly loss never drops below s.
  out("J9-floor", { s, home10: r(home(10), 6) });
}

// ---------- J10 spaced repetition: doubling gaps vs daily ----------
{
  const horizon = 60;
  const doublingDays = []; let day = 0, gap = 1;
  while (day + gap <= horizon) { day += gap; doublingDays.push(day); gap *= 2; }
  const nextAfter = day + gap;
  // Illustrative model: recall R = exp(-t/S) since the last review; each review resets R to 100%
  // and doubles S. S0 is chosen so the dip before each doubling-schedule review is 80%.
  const S0 = 1 / Math.log(1 / 0.8);
  const dips = []; let S = S0, g = 1;
  for (let k = 0; k < doublingDays.length; k++) { dips.push(r(100 * Math.exp(-g / S), 1)); S *= 2; g *= 2; }
  // Dip just before day 60 on the doubling schedule (after the last review at day 31, S = S0*2^5).
  const lastDip = 100 * Math.exp(-(horizon - doublingDays.at(-1)) / (S0 * 2 ** doublingDays.length));
  // Every 3 days, same model: first dip.
  const every3First = 100 * Math.exp(-3 / S0);
  out("J10", {
    doublingReviewDays: doublingDays, reviewsIn60: doublingDays.length, nextReviewDay: nextAfter,
    dailyReviewsIn60: horizon, every3ReviewsIn60: Math.floor(horizon / 3),
    S0days: r(S0), dipsBeforeEachReview: dips, recallAtDay60: r(lastDip, 1), every3FirstDip: r(every3First, 1),
  });
}

// ---------- J11 salt on ice: Newton cooling to a colder bath ----------
{
  const tau = 15; // minutes, illustrative can-in-slush time constant (same stirring, same can)
  const t = (Tb) => tau * Math.log((25 - Tb) / (5 - Tb));
  // Ideal freezing-point depression of NaCl brine: dT = i * Kf * m, i = 2, Kf = 1.86 K kg/mol.
  const Kf = 1.86, M = 58.44;
  const dT = (wt) => 2 * Kf * ((wt * 1000) / M / (1 - wt)); // wt = salt mass fraction of the brine; molality per kg of water
  const wtFor = (target) => { let lo = 0, hi = 0.3; for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; dT(mid) < target ? (lo = mid) : (hi = mid); } return lo; };
  out("J11", {
    minutesTo5C: { iceWater0C: r(t(0), 1), slushMinus10C: r(t(-10), 1), slushMinus20C: r(t(-20), 1) },
    speedup10: r(t(0) / t(-10), 2),
    idealSaltMassFractionFor10K: r(wtFor(10) * 100, 1) + "%",
  });
}

// ---------- J12 lid on: linear-loss heating model, plus latent heat ----------
{
  const m = 1.5, c = 4186, P = 1200, Ta = 20, Tb = 100; // kg, J/(kg K), W delivered to the water
  const U = { off: 6, on: 2 }; // W/K, illustrative loss coefficients (open surface loses steam and heat)
  const time = (u) => ((m * c) / u) * Math.log(P / (P - u * (Tb - Ta)));
  const L = 2257e3; // J/kg latent heat of vaporisation at 100 C
  out("J12", {
    minutes: { lidOff: r(time(U.off) / 60, 1), lidOn: r(time(U.on) / 60, 1) },
    savedMinutes: r((time(U.off) - time(U.on)) / 60, 1),
    energyKJ: { lidOff: r((P * time(U.off)) / 1000, 0), lidOn: r((P * time(U.on)) / 1000, 0) },
    heatToBoilKJ: r((m * c * (Tb - Ta)) / 1000, 0),
    tenGramsSteamKJ: r((0.01 * L) / 1000, 1),
    tenGramsSteamWouldWarm_1p5kg_byC: r((0.01 * L) / (m * c), 1),
  });
}

// ---------- J13 resting meat: 1-D conduction after the heat stops ----------
// A 3 cm slab starting at 5 C. Both faces are held at a preset "outer layer" temperature (60, 70 or
// 80 C: an illustrative stand-in for how hard it was cooked) until the centre reads 50 C. Then both
// faces lose heat to 20 C air (h = 10 W/m2K, k = 0.45 W/mK, alpha = 1.3e-7 m2/s, illustrative).
function slab({ L = 0.03, n = 61, alpha = 1.3e-7, k = 0.45, h = 10, Tsurf = 70, T0 = 5, Tair = 20, pull = 50, after = 900 }) {
  const dx = L / (n - 1), dt = 0.4 * dx * dx / alpha;
  let T = new Array(n).fill(T0);
  const mid = (n - 1) / 2;
  let t = 0;
  while (T[mid] < pull) {
    T[0] = Tsurf; T[n - 1] = Tsurf;
    const N = T.slice();
    for (let i = 1; i < n - 1; i++) N[i] = T[i] + alpha * dt / dx / dx * (T[i + 1] - 2 * T[i] + T[i - 1]);
    T = N; t += dt;
  }
  let peak = T[mid], peakAt = 0, tr = 0, at10 = null;
  while (tr < after) {
    const N = T.slice();
    for (let i = 0; i < n; i++) {
      const left = i === 0 ? T[1] - 2 * dx * h / k * (T[0] - Tair) : T[i - 1];
      const right = i === n - 1 ? T[n - 2] - 2 * dx * h / k * (T[n - 1] - Tair) : T[i + 1];
      N[i] = T[i] + alpha * dt / dx / dx * (right - 2 * T[i] + left);
    }
    T = N; tr += dt;
    if (T[mid] > peak) { peak = T[mid]; peakAt = tr; }
    if (at10 === null && tr >= 600) at10 = T[mid];
  }
  return { heatMin: r(t / 60, 1), centreAt10min: r(at10, 1), centrePeak: r(peak, 1), rise: r(peak - pull, 1), peakAtMin: r(peakAt / 60, 1) };
}
out("J13", { "outer 60C": slab({ Tsurf: 60 }), "outer 70C": slab({ Tsurf: 70 }), "outer 80C": slab({ Tsurf: 80 }) });

// ---------- J14 searing: energy budget for the sizzle ----------
// While the seared face is wet it sits near 100 C, and heat arriving there either flows inward or
// boils surface water off. Illustrative pan heat flux q = 20 kW/m2 into a 10 x 10 cm face,
// 2 minutes per side, 2 sides. Share f of that heat that boils water: preset 10%, 33%, 50%.
{
  const q = 20000, A = 0.01, tSide = 120, sides = 2, L = 2257e3;
  const heat = q * A * tSide * sides; // J
  const water = (f) => (f * heat / L) * 1000; // g
  out("J14", { heatKJ: r(heat / 1000, 1), waterG: { f10: r(water(0.1), 1), f33: r(water(1 / 3), 1), f50: r(water(0.5), 1) }, sealedMeans: "f = 0: no water boils, so no sizzle" });
}
