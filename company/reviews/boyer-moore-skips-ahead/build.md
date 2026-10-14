# Build note: boyer-moore-skips-ahead (algo2-sc, 2026-10-14)

Builder: algo2-sc (demo-builder). Status: draft, version 1. Kept from evaluators until they report.
Built from brief #55 and spec company/design/specs/boyer-moore-skips-ahead.md (+ .svg).

## What was built
- Two stacked lanes over "HERE IS A SIMPLE EXAMPLE" (24 cells of 14 px, spaces as faint dots): plain left to right on top, Horspool from the end below. One comparison per press in each lane; a miss slides at once (200 ms CSS transition, none under reduced motion). Read letters keep a dot. Horspool shows a dashed ghost of the previous placement for the press that slid it, and the rule line is replaced by the reason ("S is not in EXAMPLE: slide 7"). Slide table cells under the lanes; the cell of the latest slide is outlined.
- Controls in DOM order (2, as spec): Compare · Compare to the match (14 ms per comparison).
- Milestones (minInteractions 2): first-skip (first 7-letter jump, press 1), both-matched.

## Checks run
- Node and the Demo's own traces: Horspool 15 comparisons, placements 0, 7, 9, 15, 17 (5), reads 13 letters, 11 never read; plain 27 comparisons, 18 placements, reads all 24. Table E6 X5 A4 M3 P2 L1, other 7.

## Correction carried
- The brief said 4 alignments; the spec says 5 and this build reproduces 5 (claim c1). Brief owner cm-cs-algorithms should change the brief's check line.

## Not run
next build, typecheck, QA, walkthrough (as instructed). All claims unverified.

## v2 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-knows-kmp-r6.md)
- Finding 1 (gate skips the key moment): first-skip is now reached only when a single Compare press produced the S slide (`stepped` flag); "Compare to the match" is disabled until the first Compare, so the 7-jump with its caption and ghost is always watched.
- Finding 2 (partial-match slide never captioned): a slide log under the lanes keeps every Horspool slide and its reason ("S 7 · P 2 · E 6 (miss on I) · P 2 · found"), and the reveal quotes the E 6 entry. New claim c9.
- Finding 5 (layout jump): caption and log lines get a fixed min-height.
- Finding 6: question stem shortened to point at the table on stage. Options all numbered at the same precision.
- Dropped c7 ("Longer patterns can skip further") to keep the reveal under 120 words.
- Not done: finding 3 (shading the six ruled-out placements) and 4 (two lanes kept; the comparison is the point).

## Pre-flight v2
1. Title and hook: "Read the pattern from its end" / "Must a search look at every letter of the text?" No count or comparison is named; the learner cannot pick 15 from them.
2. Options: "27, like the plain method" · "24, one per text letter" · "15, fewer than the text has". All numbered, each with one short gloss.
3. Locked stage: two lanes at placement 0, zero counters ("Never read: –"), the slide table E6 X5 A4 M3 P2 L1 other 7, "Horspool slides: none yet". Nothing equals 15.
4. Reveal values: S and jump 7 (milestone first-skip, a watched Compare press; still visible in the log as "S 7"); "E 6 (miss on I)", 4 letters (computed from HORS, shown in the log after both-matched); 15 comparisons, 5 placements, 11 never read (Horspool lane readout at both-matched); 27, 18 (plain lane readout at both-matched).
5. QA path: Compare (first-skip, caption "S is not in EXAMPLE: slide 7"), Compare to the match (runs to both-matched). 2 presses reach both milestones; the question's own case (the full 15-comparison run) is both-matched. Lane readouts and the log stay on stage when the reveal opens.
6. Reset: the lesson has no Reset; after the match both controls are disabled, so the stage cannot change under the reveal. Reveal from that run: "Reading from the pattern's end, the first check met S. S is not in EXAMPLE, so no placement covering it could match, and the pattern jumped 7. / Look at the slide log: "E 6 (miss on I)". After matching 4 letters it missed on I, but the slide used the E under the pattern's end, so it moved 6, not 7. / Your search made 15 comparisons in 5 placements and never read 11 of the 24 letters. The plain method read every letter: 27 comparisons, 18 placements. / A search can skip text, as long as each skip is justified by a letter it did read."
