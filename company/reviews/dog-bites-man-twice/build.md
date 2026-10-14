# Build note: dog-bites-man-twice (builder: demo-builder, sonnet build, EXP-003)

- Toy attention, 3 words, "bites" as query; vectors and toy position tags in Demo.tsx (MODEL block). The brief's position-tag numbers were not reproducible (its script is not given), so I chose tags (0, 0.5, 1 added to x) and recomputed: no tags (0.79, 0.79) in both orders; with tags (1.30, 0.89) and (1.62, 0.59).
- Key state: both orders seen with tags off, then tags on. The reveal quotes only summaries the learner saw (and says when the other order was not tried with tags on).
- QA presses swap then toggle once each: both milestones reached. Arrow and summary readout hidden while locked.
- Retitled as a question; slug unchanged.
- Known limit: the reveal may quote only one tags-on arrow if the learner never swaps after turning tags on.

## Revision v1 (wave C, 2026-10-14)

- Review (v1): summary defined nowhere, order contrast not side by side, hollow circle unlabelled. Fix: stem defines the summary; two readouts show both sentence orders for the current tag setting; caption labels the rings; reveal quotes both. Locked-stage chart size is a layout issue left to the kit.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
