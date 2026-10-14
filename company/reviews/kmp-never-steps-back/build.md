# Build note: kmp-never-steps-back (algo-pair-09, 2026-10-14)

Built from brief #36 and the wireframe company/design/specs/kmp-never-steps-back.svg (no spec .md existed). Two stacked strips driven by Compare and Compare x4. Reveal unlocks at the first miss (comparison 4), not at the match; the reveal text quotes only the comparison count reached (14 and 24 appear only if reached). No jump buttons. Traces (24 naive, 14 KMP, back moves 1/3/5 and 0, table 0 1 2 0) re-run in node. All claims unverified.
The brief said "never re-reads text"; that is false (14 comparisons over 9 letters), so the lesson says the arrow only moves right.
Skipped (machine out of memory): next build, tsc, QA, walkthrough. Only `npm run check`. I fixed likely null-narrowing type errors by eye.
