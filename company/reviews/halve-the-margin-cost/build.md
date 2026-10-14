# Build note: halve-the-margin-cost (demo-builder, 2026-10-13)
- Intent: a slider steps the sample size through doublings (250, 500, 1,000, 2,000, 4,000, 8,000; starts at 1,000). 100 seeded polls of a 50/50 population appear as dots (seed 1936, untuned, a separate stream per size); the shaded band is the 95% margin. Readouts: margin and polls inside the band.
- Gate: 2 milestones, 2,000 seen and 4,000 seen. QA's two right-arrow presses visit exactly 2,000 then 4,000.
- Question numbers (1,000, 3.1, 1.5) and options (2,000 / 4,000 / 8,000) come from SIZES and margin(); 4,000 gives 1.5495 -> "1.5".
- The non-sampling-error caveat is in the reveal (c4, AAPOR).

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Added a 'Double the people' button (first control). The 4,000 milestone counts only after 2,000 has been seen, so the 'only 2.2' step cannot be skipped. Dashed lines keep earlier bands so widths compare. Claims unchanged.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
