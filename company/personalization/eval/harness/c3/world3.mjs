// Criterion 3's world additions: the E3 block (revisit price, session length, N7), the placements and the cells.
// owner: personalization-eval (Uma) · run: eval-k3-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3.md (§1, §4)
// Judge module: imports nothing (criterion 3 T5c). Criterion 2's E1 block and cells2() are passed in by the glue
// (harness3.mjs), so this file never reads world2.mjs itself and nothing in ../c2/ is edited.
//
// THE E3 BLOCK, filled in K4 (run eval-k4-1017) from learning-scientist-personalization's E3 ranges table
// (company/personalization/evidence/2026-10-17-criterion-3-ranges.md), with F3's blocking rows B1-B3 answered
// (company/personalization/evidence/2026-10-17-criterion-3-fidelity-review.md; answers in criterion 3 §10.1).
// Run with another block: `--e3=<file.json>` (same keys); the manifest records its hash.
//   outer: one extra reported cell per placement at that value (F3 B3: criterion 2's L4 rule kept as an outer cell).
//   corner: one reported-only cell per placement with these rows set together (F3 N6, the price corner).

export const E3 = {
  status: "FILLED (K4, run eval-k4-1017) from E3 ranges table; F3 B1-B3 applied",
  ranges: "company/personalization/evidence/2026-10-17-criterion-3-ranges.md (ranges table; §1a, §1b, §1c, §2a, §2b)",
  // Positions a revisit card takes, relative to a new lesson card = E3 "revisit time ratio" (time of a revisit / a lesson).
  revisitSlotCost: { low: 0.15, base: 0.3, high: 0.5, mark: "E3 revisit time ratio 0.15/0.3/0.5 (product + E1 [F] answer windows, derived; low)" },
  // Stop hazard after a revisit card relative to after a new card, per card = E3 "revisit stop multiplier, per card".
  revisitStopScale: { low: 0.5, base: 1, high: 2, mark: "E3 revisit stop multiplier per card 0.5/1.0/2.0 (direction [A]/[S] only; analytics; low)" },
  // Card positions per session = E3 "session length".
  slots: { low: 4, base: 8, high: 15, mark: "E3 session length 4/8/15 card positions ([S] only; analytics; none-low)" },
  // N7: a prior-known trace forgets at priorRateMult x the rate of a newly learned one. F3 B2: mapped from E3's
  // "prior-known 14-day kept" row (0.99 / 0.96 / 0.78) through the world's own L8 form at age 0, E1 base k 0.08,
  // shape 0.27, L9 factor 1, over E3's 14-day span: m = -ln(kept) / (0.08 x (7 + 0.27 x 7)). The labels follow the
  // VALUE of m: low m = the most stable trace = E3's HIGH kept (0.99); high m = E3's LOW kept (0.78).
  // outer 1 = criterion 2's L4 (a prior trace forgets as a fresh one), F3 B3 / E3 §4 item 3, reported cell.
  priorRateMult: { low: 0.0141, base: 0.0574, high: 0.349, outer: 1,
    mark: "E3 prior-known 14-day kept 0.99/0.96/0.78 mapped through L8 (F3 B2); low m = E3 high kept; outer 1 = criterion 2 L4 (F3 B3)" },
  // F3 B1, fix (a): the age axis is dropped (0 everywhere). Under L8 an age past day 7 adds only a starting deficit and no
  // slower rate, the opposite of E3 item 2; N7 is carried by priorRateMult alone. The L11 age code stays, inert at 0.
  priorAgeDays: { low: 0, base: 0, high: 0, mark: "F3 B1 fix (a): not swept; 0 = clock at the episode start (criterion 2 L4)" },
  // F3 N6: one reported-only price corner (high stop x short session x costly revisit). No rule reads it.
  corner: { revisitStopScale: 2, slots: 4, revisitSlotCost: 0.5 },
};

/** Placements (criterion 3 §1.1). "first": revisits first (AMD-008 F2 as drafted; criterion 2). "interleave": as
 *  src/components/Feed.tsx: one due revisit before new lesson i when i % 3 === 1, at most MAX_REVISITS fetched, the rest
 *  not served in that session (the feed appends them only when the catalogue ends). */
export const PLACEMENTS = ["interleave", "first"];
export const BASE_PLACEMENT = "interleave"; // criterion 3 §2.0: the base cell is interleave:base (named before any score)
export const FEED = { maxRevisits: 12, every: 3, at: 1 }; // Feed.tsx MAX_REVISITS = 12; `i % 3 === 1`

/** Criterion 2's values of the E3 rows: the "c2-equivalent" world (identity checks only, never a scored cell). */
export const C2_VALUES = { revisitSlotCost: 1, revisitStopScale: 1, slots: 12, priorRateMult: 1, priorAgeDays: 0 };

/**
 * The cells (criterion 3 §4). c2cells: criterion 2's cells2(e1) output (passed in). For each placement: the base, criterion
 * 2's one-at-a-time cells except its revisitStopScale row (now an E3 row; interleave only), and one cell per E3 row bound
 * that differs from its base; K4 adds one outer cell per row naming one (F3 B3) and the price corner (F3 N6), both
 * reported only. Names are "<placement>:<cell>".
 */
export function cells3(c2cells, e3 = E3) {
  const base2 = c2cells.find((c) => c.name === "base").world;
  const e3base = Object.fromEntries(Object.keys(C2_VALUES).map((k) => [k, e3[k].base]));
  const out = [];
  for (const placement of PLACEMENTS) {
    const base = { ...base2, ...e3base, placement };
    out.push({ name: `${placement}:base`, kind: "base", placement, world: { ...base } });
    // Revisits first: criterion 2's one-at-a-time rows were swept there in readout 2; criterion 3 sweeps only the E3 rows
    // in that placement (compute, criterion 3 §4). Interleave: every row.
    for (const c of placement === "first" ? [] : c2cells) {
      if (c.kind !== "one-at-a-time" || c.name.startsWith("revisitStopScale")) continue;
      const diff = Object.fromEntries(Object.entries(c.world).filter(([k, v]) => base2[k] !== v));
      out.push({ name: `${placement}:${c.name}`, kind: "one-at-a-time", placement, world: { ...base, ...diff } });
    }
    for (const k of Object.keys(C2_VALUES)) for (const side of ["low", "high"]) {
      if (e3[k][side] === e3[k].base) continue;
      out.push({ name: `${placement}:${k}-${side}`, kind: "one-at-a-time", placement, world: { ...base, [k]: e3[k][side] } });
    }
    // K4 (F3 B3): an outer cell per row that names one (criterion 2's L4 for priorRateMult). Reported; no rule reads it.
    for (const k of Object.keys(C2_VALUES)) if (e3[k].outer !== undefined && e3[k].outer !== e3[k].base)
      out.push({ name: `${placement}:${k}-outer`, kind: "outer", placement, world: { ...base, [k]: e3[k].outer } });
    // K4 (F3 N6): the price corner, reported only.
    if (e3.corner) out.push({ name: `${placement}:price-corner`, kind: "corner", placement, world: { ...base, ...e3.corner } });
  }
  return out;
}

/** The c2-equivalent world of a criterion 2 cell: revisits first, every E3 row at criterion 2's value. */
export const c2Equivalent = (c2world) => ({ ...C2_VALUES, ...c2world, placement: "first" }); // the c2 cell's own revisitStopScale wins

/** Adds the N7 rows to a personaWorld2() output (criterion 3 §1.2 L11). A row at criterion 2's value is left out, so the
 *  world object (and criterion 2's world hash) is unchanged there (C3-ID1). */
export function personaWorld3(pw2, cell) {
  const w = { ...pw2 };
  if ((cell.priorRateMult ?? 1) !== C2_VALUES.priorRateMult) w.priorRateMult = cell.priorRateMult;
  if ((cell.priorAgeDays ?? 0) !== C2_VALUES.priorAgeDays) w.priorAgeDays = cell.priorAgeDays;
  return w;
}
