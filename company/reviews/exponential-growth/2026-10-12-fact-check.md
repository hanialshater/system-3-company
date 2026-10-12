# Fact-check: exponential-growth

date: 2026-10-12 · reviewer: fact-checker · inputs: meta.json claims, `artifacts/walkthroughs/exponential-growth/transcript.md`, Demo.tsx (read only to list visible sentences)
working: `artifacts/scratch/fc-exponential-growth.mjs`

## Claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 coverage on day d = (1/2)^(30-d) | **verified** | Follows from exact daily doubling and full on day 30; Demo.tsx uses f = 1/2^(30-day). The premise (exact doubling, no saturation until full) is the stated puzzle, not a claim about real ponds. Stewart cite: section number depends on edition (3.8 in later editions); content is the standard model. |
| c2 day 29 = 1/2, day 28 = 1/4, last two days fill 3/4, day 25 = 1/32 ~ 3% | **verified** | Script: 0.5, 0.25, 1 - 0.25 = 0.75, 0.03125 (3.125%). |
| c3 day 20 = 1/1024 ~ 0.098% | **verified** | (1/2)^10 = 0.0009765625 = 0.0977%. Also checked the drawn patch for m = 10 halvings is exactly one cell of the 32x32 grid. |
| c4 2^30 > a billion | **verified** | 2^30 = 1,073,741,824. |
| c5 the pond puzzle is a classic illustration; a version is in The Limits to Growth (1972) | **verified** | Web search: the lily-pond riddle (lily doubles daily, covers the pond in 30 days, half-covered on day 29) appears in Meadows et al., The Limits to Growth, 1972, ch. 1; one source gives p. 29 of the Pan edition. The book uses lilies, the lesson algae; the claim says "a version", which holds. Secondary sources only (I could not open the book). |

## Unrecorded claims found (added to meta.json as `unverified`)

- c6: the grid is 32 x 32 = 1,024 cells, each a 1/1024 pond; day 20 is exactly one cell (stage caption and reveal).
- c7: "a pond that looks 97% clear is five days from full" (1 - 1/32 = 96.875%, rounded to 97%).
- c8: the distractor "About 83% (25 of 30 days)" (25/30 = 83.3%).
- c9: recall: cases doubling every 3 days, full in 12 days, so today 1/16 (about 6%).

My own arithmetic for these (script output: 1/1024 cell, 96.875, 0.8333, 1/16 = 6.25%) agrees, but I wrote the claims so another checker must verify them.

Seen and covered: day captions "Day 29: half the pond is still open water" (c1/c2), the generated "Day d: 1/N covered. X% is still open water" lines (c1).

## Fixes routed to demo-builder (phrased as problems)

1. None blocking. The reveal's "Most of the pond fills in the last two days" is correct (75%), but "most" is vague; it is the same fact as c2's "three quarters" and nothing is wrong.
2. The Limits to Growth tells the riddle with lilies; if the lesson ever says the riddle is "about algae in that book", that would be wrong. It does not today.

Status after this check: c1-c5 verified, none disputed; c6-c9 await an independent checker.
