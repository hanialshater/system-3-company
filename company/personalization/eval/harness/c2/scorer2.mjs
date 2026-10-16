// Criterion 2's scorer (eval-owned). Primary: retained knowledge at a final test, per lesson the reference arm completed.
// owner: personalization-eval (Uma) · run: eval-k1-1016 · criterion: company/personalization/eval/2026-10-16-criterion-2.md §1 to §3
// Judge module: imports NOTHING (criterion 2 T5). The statistics helpers are copies of ../scorer.mjs (frozen with readout 1).
//
// Per episode (scoreEpisode2): K[H] = the learner's summed kept share over all in-pilot concepts, read H days after the
// start of the last session (no session in between; the read changes nothing); nNew = new lessons completed in the
// episode; nAll = lessons completed by the end (pre-history + new); the guardrail measures; descriptive fields. Per pair
// (judgePair2): per seed, d = (K_a[H] - K_b[H]) / nAll_ref, where ref is the reference arm (default-order + fixed
// schedule) at the same persona, seed and cell. So R_H of an arm is K[H] / nAll_ref: "lessons' worth of knowledge kept at
// the final test, per lesson the product as shipped had completed". The normaliser never depends on the arm judged.

export const newLog2 = (knownStart, nPre = 0) => ({ nPre,
  newStarted: 0, newRevealed: 0, prereqFirst: 0, moved: 0, revisits: 0, revisitsOk: 0, cardsServed: 0,
  nextDayRecall: [], byDomain: {}, concepts: new Set(), knownStart, knownEnd: knownStart, K: {},
  v4: { earlier: 0, same: 0, later: 0 },
});

const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);

export function scoreEpisode2(l) {
  const top = Math.max(0, ...Object.values(l.byDomain));
  return {
    K: { ...l.K },                                         // final-test knowledge by horizon (primary input)
    nNew: l.newRevealed,                                    // new lessons completed (review guardrail NEW)
    nAll: l.nPre + l.newRevealed,                           // lessons completed by the end, pre-history included (R normaliser)
    R1d: avg(l.nextDayRecall),                              // phase-A-style next-session recall of new lessons: descriptive only
    g1TopDomainShare: l.newRevealed ? top / l.newRevealed : NaN,
    g2Concepts: l.concepts.size,
    g3PrereqFirst: l.newStarted ? l.prereqFirst / l.newStarted : 0,
    g4Gain: l.knownEnd - l.knownStart,
    revisits: l.revisits,
    revisitShare: l.cardsServed ? l.revisits / l.cardsServed : 0, // review guardrail LOAD
    revisitOkShare: l.revisits ? l.revisitsOk / l.revisits : NaN, // descriptive
    cards: l.cardsServed,                                   // engagement, reported only
    reveal: l.newStarted ? l.newRevealed / l.newStarted : NaN, // engagement, reported only
    movedShare: l.newStarted ? l.moved / l.newStarted : 0,  // descriptive
    v4: { ...l.v4 },                                        // review arms: revisits earlier / same / later than the fixed schedule
  };
}

export function mean(xs) { const v = xs.filter((x) => !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN; }
export function sd(xs) {
  const v = xs.filter((x) => !Number.isNaN(x)); const m = mean(v);
  return v.length > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1)) : 0;
}
export function t975(df) {
  const z = 1.959963984540054;
  const z3 = z ** 3, z5 = z ** 5, z7 = z ** 7;
  return z + (z3 + z) / (4 * df) + (5 * z5 + 16 * z3 + 3 * z) / (96 * df ** 2) + (3 * z7 + 19 * z5 + 17 * z3 - 15 * z) / (384 * df ** 3);
}
/** Mean and 95% t interval of a list of per-seed differences (NaN dropped and counted). */
export function interval(d0) {
  const d = d0.filter((x) => !Number.isNaN(x));
  const m = mean(d), s = sd(d), n = d.length;
  const half = n > 1 ? t975(n - 1) * s / Math.sqrt(n) : NaN;
  return { mean: m, lo: m - half, hi: m + half, sd: s, n, dropped: d0.length - n };
}
export const paired = (a, b) => {
  if (a.length !== b.length) throw new Error("paired: arrays differ in length");
  return interval(a.map((x, i) => x - b[i]));
};

/** R_H of one episode against the reference arm's episode at the same seed. */
export const rOf = (s, ref, H) => (ref.nAll > 0 ? s.K[H] / ref.nAll : NaN);

/** S from the reference arm alone (criterion 2 §1): sd of R_primary = K[H]/nAll of the reference arm itself. */
export function seedsFromSd(sdR, deltaMin, floor, cap) {
  return Math.min(cap, Math.max(floor, Math.ceil((2.8 * Math.SQRT2 * sdR / deltaMin) ** 2)));
}

/**
 * One cell, one pair (criterion 2 §2). a[p], b[p], ref[p]: per persona, arrays of episode scores over the same seeds.
 * guardrails: "ordering" (G1-G4 vs ref), "review" (G1, NEW, LOAD vs ref), or "none" (headroom and reference rows).
 * Returns { rows, wins, harmed, guardrailFails, beats }.
 */
export function judgePair2({ a, b, ref, C, H, guardrails }) {
  const rows = [];
  let wins = 0; const harmed = []; const guardrailFails = [];
  for (const p of Object.keys(a)) {
    const A = a[p], B = b[p], Rf = ref[p];
    const R = interval(A.map((s, i) => (s.K[H] - B[i].K[H]) / (Rf[i].nAll > 0 ? Rf[i].nAll : NaN)));
    const win = R.lo > 0 && R.mean >= C.deltaMin;
    const harm = R.mean <= -C.deltaHarm && R.hi < 0;
    if (win) wins++;
    if (harm) harmed.push(p);
    const row = { persona: p, R, win, harm };
    const rel = (k, d) => { const m = mean(Rf.map((s) => s[k])); return m > 0 ? d.lo / m : d.lo; };
    if (guardrails === "ordering") {
      const g = Object.fromEntries(["g1TopDomainShare", "g2Concepts", "g3PrereqFirst", "g4Gain"].map((k) => [k, paired(A.map((s) => s[k]), Rf.map((s) => s[k]))]));
      const holds = {
        G1: g.g1TopDomainShare.hi <= C.g1MaxRise,
        G2: rel("g2Concepts", g.g2Concepts) >= -C.g2MaxRelFall,
        G3: g.g3PrereqFirst.hi <= C.g3MaxRise,
        G4: rel("g4Gain", g.g4Gain) >= -C.g4MaxRelFall,
      };
      for (const [k, ok] of Object.entries(holds)) if (!ok) guardrailFails.push(`${p}:${k}`);
      Object.assign(row, { g, holds });
    } else if (guardrails === "review") {
      const g = Object.fromEntries(["g1TopDomainShare", "nNew", "revisitShare"].map((k) => [k, paired(A.map((s) => s[k]), Rf.map((s) => s[k]))]));
      const holds = {
        G1: g.g1TopDomainShare.hi <= C.g1MaxRise,
        NEW: rel("nNew", g.nNew) >= -C.newMaxRelFall,
        LOAD: g.revisitShare.hi <= C.loadMaxRise,
      };
      for (const [k, ok] of Object.entries(holds)) if (!ok) guardrailFails.push(`${p}:${k}`);
      Object.assign(row, { g, holds });
    }
    rows.push(row);
  }
  const beats = wins >= C.winsNeeded && harmed.length === 0 && guardrailFails.length === 0;
  return { rows, wins, harmed, guardrailFails, beats };
}

/** Sweep outcome for a candidate pair (criterion 2 §2.1), the phase A rule: PASS / FAIL-SENSITIVE / FAIL / INVALID. */
export function outcome2({ invalid, baseBeats, oatBeats }) {
  if (invalid) return { verdict: "INVALID", cells: [] };
  if (!baseBeats) return { verdict: "FAIL", cells: ["base"] };
  const failed = Object.entries(oatBeats).filter(([, b]) => !b).map(([c]) => c);
  return failed.length ? { verdict: "FAIL-SENSITIVE", cells: failed } : { verdict: "PASS", cells: [] };
}

/** Headroom reading (criterion 2 §2.3, §2.4; pre-commitment 3, V2): wins in at least winsNeeded personas, base cell. */
export function headroom({ wins }, C) {
  return wins >= C.winsNeeded ? "HEADROOM" : "NO-HEADROOM";
}
