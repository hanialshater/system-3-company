// Criterion 3's world additions: the E3 block (revisit price, session length, N7), the placements and the cells.
// owner: personalization-eval (Uma) · run: eval-k3-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3.md (§1, §4)
// Judge module: imports nothing (criterion 3 T5c). Criterion 2's E1 block and cells2() are passed in by the glue
// (harness3.mjs), so this file never reads world2.mjs itself and nothing in ../c2/ is edited.
//
// THE E3 BLOCK IS A PLACEHOLDER until learning-scientist-personalization's E3 lands
// (company/personalization/evidence/2026-10-17-criterion-3-ranges.md, batch 4 E3). Every base below is criterion 2's own
// value, so that the base cells differ from criterion 2 only in placement until E3 fills them. K4 replaces each row with
// E3's low / base / high and its mark, row by row, before the freeze. Bounds are deliberately wide (batch 4: sweep where E3
// is wide). Run with another block: `--e3=<file.json>` (same keys); the manifest records its hash.

export const E3 = {
  status: "PLACEHOLDER (K3, run eval-k3-1017): criterion 2 values as bases; E3 not landed",
  ranges: "company/personalization/evidence/2026-10-17-criterion-3-ranges.md (not landed at K3)",
  // Positions a revisit card takes, relative to a new lesson card (E3 item 1: time of a retrieval card / a lesson card).
  // Criterion 2: 1 (one for one, B6 unsourced). 0.5 = criterion 2's own minutes (EPISODE2: revisit 1 min, card 2 min).
  revisitSlotCost: { low: 0.5, base: 1, high: 1, mark: "PLACEHOLDER: criterion 2 B6 value; E3 item 1" },
  // Stop hazard after a revisit card relative to after a new card (E3 item 1). Criterion 2: base 1, low 0.5 (L5).
  revisitStopScale: { low: 0.5, base: 1, high: 1.5, mark: "PLACEHOLDER: criterion 2 L5 values; high added; E3 item 1" },
  // Card positions per session (E3 item 1: session length in self-paced microlearning). Criterion 2: 12.
  slots: { low: 6, base: 12, high: 20, mark: "PLACEHOLDER: criterion 2 value 12; E3 item 1" },
  // N7 (E3 item 2): a prior-known trace forgets at priorRateMult x the rate of a newly learned one ...
  priorRateMult: { low: 0.25, base: 1, high: 2, mark: "PLACEHOLDER: criterion 2 value 1 (L4); E3 item 2" },
  // ... and is priorAgeDays old at the episode start (criterion 2 L4: 0, the clock at the episode start).
  priorAgeDays: { low: 0, base: 0, high: 90, mark: "PLACEHOLDER: criterion 2 value 0 (L4); E3 item 2" },
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
 * that differs from its base. No corners (criterion 3 §4). Names are "<placement>:<cell>".
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
