# Build note: better-in-every-group-worse-overall (demo-builder, 2026-10-12)
- Intent: a mosaic. Each treatment is a bar 350 patients wide, split into small and large stones, and the fill height is the share cured. The widths make the weighting visible. "Combine groups" draws the overall level across the segments, which is their width-weighted average height. The slider moves large-stone cases between A and B while keeping subgroup rates fixed; away from the real split the counts are expected values.
- Gate: 2 interactions, and slider moves count only in the combined view. Overall percentages are hidden while the stage is locked.
- After screenshots: in v1 the combined view replaced the segments with one flat fill, and 78% and 83% looked the same. The segments now stay (faded) under a bold overall line. I also raised the contrast and made the uncured part red.

## v2 (revision 2026-10-13)

Source: 2026-10-13 learner-adult-beginner review and fact-check. Finding -> change:

- 343 vs 350 unexplained and slider direction unclear -> key now reads 'A gets k of the 343 large-stone patients, B gets 343-k', live.
- Flip point never visited -> new button 'Share hard cases evenly' (A 172 / B 171); gate: groups combined AND A's overall above B's (milestone a-ahead-overall). Reveal's '220 or fewer' computed by flipK().
- 'Weighted' undefined -> reveal: 'a weighted average: a bigger group counts for more'. Reveal labels the 78.0/82.6 figures 'in the real data'.
- Hook leaked -> 'A beats B for small stones and for large. Overall, who wins?'. Claims unchanged.

## Revision v3
Learner review v2 (2026-10-13) findings:
- Title "Better for everyone, worse overall?" leaked the answer: retitled "Kidney stones: who cured more?", hook asks "Which cures more overall?".
- No legend for the two shades and 343 unexplained: the caption now says "Small stones left, large right" and that 343 is the large-stone patients of both treatments together.
- The 220 threshold was told: a readout "Ahead overall" (A / B) now sits beside the slider so the learner sees the flip as they drag; the reveal still states 220 (claim c5, verified earlier, unchanged).
