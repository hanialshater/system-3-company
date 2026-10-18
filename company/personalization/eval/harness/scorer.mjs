// The eval-owned scorer (W-1513: adopt a copy of sim/score.ts's definitions, with additions).
// owner: personalization-eval (Uma) · run: eval-c1-1016 · criterion: company/personalization/eval/2026-10-16-phase-a-criterion.md
// Judge module: imports NOTHING (criterion T5). Scores what the eval learner did, never need coverage or composer terms.
//
// Kept from sim/score.ts (copied definitions): prereqFirst (new cards shown before every in-pilot prerequisite was
// completed ÷ new cards shown), gain (concepts known at the end minus at the start, ground truth), reveal (share of
// started cards that reached the reveal), concepts (distinct concepts completed), moved share.
// Added: R, the expected-value primary (mean over completed new cards of the ground-truth recall probability at the
// card's scheduled first revisit; criterion §1); R_realised (consistency check only, never a pass input); G1 top-domain
// share; paired per-seed differences with 95% t intervals; the criterion §2/§3 rule as a pure function of those.

export const newLog = (knownStart) => ({
  started: 0, revealed: 0, prereqFirst: 0, moved: 0,
  expectedRecalls: [], realisedRecalls: [], byDomain: {}, concepts: new Set(), knownStart, knownEnd: knownStart,
});

const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);

export function scoreEpisode(l) {
  const completed = l.revealed;
  const top = Math.max(0, ...Object.values(l.byDomain));
  return {
    R: avg(l.expectedRecalls),
    R_realised: l.realisedRecalls.length ? l.realisedRecalls.filter(Boolean).length / l.realisedRecalls.length : NaN,
    nCompleted: completed,
    g1TopDomainShare: completed ? top / completed : NaN,
    g2Concepts: l.concepts.size,
    g3PrereqFirst: l.started ? l.prereqFirst / l.started : 0,
    g4Gain: l.knownEnd - l.knownStart,
    reveal: l.started ? l.revealed / l.started : NaN,   // engagement, reported only
    cards: l.started,                                   // engagement, reported only
    movedShare: l.started ? l.moved / l.started : 0,    // descriptive (phase B dilution, criterion §6)
  };
}

export function mean(xs) { const v = xs.filter((x) => !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN; }
export function sd(xs) {
  const v = xs.filter((x) => !Number.isNaN(x)); const m = mean(v);
  return v.length > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1)) : 0;
}

/** Two-sided 97.5% Student t quantile (Cornish-Fisher expansion; error < 1e-4 for df >= 10). */
export function t975(df) {
  const z = 1.959963984540054;
  const z3 = z ** 3, z5 = z ** 5, z7 = z ** 7;
  return z + (z3 + z) / (4 * df) + (5 * z5 + 16 * z3 + 3 * z) / (96 * df ** 2) + (3 * z7 + 19 * z5 + 17 * z3 - 15 * z) / (384 * df ** 3);
}

/** Paired differences a[i] - b[i] over seeds (same order). NaN pairs are dropped and counted. */
export function paired(a, b) {
  if (a.length !== b.length) throw new Error("paired: arrays differ in length");
  const d = [];
  let dropped = 0;
  for (let i = 0; i < a.length; i++) { const x = a[i] - b[i]; if (Number.isNaN(x)) dropped++; else d.push(x); }
  const m = mean(d), s = sd(d), n = d.length;
  const half = n > 1 ? t975(n - 1) * s / Math.sqrt(n) : NaN;
  return { mean: m, lo: m - half, hi: m + half, sd: s, n, dropped };
}

/** S from the default-order arm alone (criterion §1): max(floor, ceil((2.8·√2·sd_R/δ_min)²)), capped. */
export function seedsFromSd(sdR, deltaMin, floor, cap) {
  return Math.min(cap, Math.max(floor, Math.ceil((2.8 * Math.SQRT2 * sdR / deltaMin) ** 2)));
}

/**
 * The criterion §2 items 1-4 in one cell, for one policy pair. Inputs per persona: arrays over the same seed list.
 *   gam[p], base[p], dflt[p]: arrays of episode scores (scoreEpisode) for the policy, the baseline, and default-order.
 *   withGuardrails: false for the per-term rule (criterion §2: items 1 and 2 only).
 * Returns per-persona rows and the verdict { beats, wins, harmed, guardrailFails }.
 */
export function judgeCell({ gam, base, dflt, C, withGuardrails = true }) {
  const rows = [];
  let wins = 0; const harmed = []; const guardrailFails = [];
  for (const p of Object.keys(gam)) {
    const R = paired(gam[p].map((s) => s.R), base[p].map((s) => s.R));
    const win = R.lo > 0 && R.mean >= C.deltaMin;
    const harm = R.mean <= -C.deltaHarm && R.hi < 0;
    if (win) wins++;
    if (harm) harmed.push(p);
    const row = { persona: p, R, win, harm };
    if (withGuardrails) {
      const D = dflt[p];
      const g1 = paired(gam[p].map((s) => s.g1TopDomainShare), D.map((s) => s.g1TopDomainShare));
      const g2 = paired(gam[p].map((s) => s.g2Concepts), D.map((s) => s.g2Concepts));
      const g3 = paired(gam[p].map((s) => s.g3PrereqFirst), D.map((s) => s.g3PrereqFirst));
      const g4 = paired(gam[p].map((s) => s.g4Gain), D.map((s) => s.g4Gain));
      const m2 = mean(D.map((s) => s.g2Concepts)), m4 = mean(D.map((s) => s.g4Gain));
      const holds = {
        G1: g1.hi <= C.g1MaxRise,
        G2: m2 > 0 ? g2.lo / m2 >= -C.g2MaxRelFall : g2.lo >= 0,
        G3: g3.hi <= C.g3MaxRise,
        G4: m4 > 0 ? g4.lo / m4 >= -C.g4MaxRelFall : g4.lo >= 0,
      };
      for (const [g, ok] of Object.entries(holds)) if (!ok) guardrailFails.push(`${p}:${g}`);
      Object.assign(row, { g1, g2, g3, g4, holds });
    }
    rows.push(row);
  }
  const beats = wins >= C.winsNeeded && harmed.length === 0 && guardrailFails.length === 0;
  return { rows, wins, harmed, guardrailFails, beats };
}

/** Criterion §2 sweep outcome for one pair. invalid: any T1-T4 failure for the policy. */
export function outcome({ invalid, baseBeats, oatBeats }) {
  if (invalid) return { verdict: "INVALID", cells: [] };
  if (!baseBeats) return { verdict: "FAIL", cells: ["base"] };
  const failed = Object.entries(oatBeats).filter(([, b]) => !b).map(([c]) => c);
  return failed.length ? { verdict: "FAIL-SENSITIVE", cells: failed } : { verdict: "PASS", cells: [] };
}
