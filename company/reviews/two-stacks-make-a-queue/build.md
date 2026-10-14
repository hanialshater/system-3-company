# Build note: two-stacks-make-a-queue (demo-builder, algo-pair-07, 2026-10-14)

- Built from brief #34 and spec `company/design/specs/two-stacks-make-a-queue.md`. Format: storyboard / scrub, with an 8-tile operation tape.
- Answer re-checked in node before building: 1 pour, each item moved once, leaving order 1 2 3 4. The brief held; no brief problem.
- Tape rules: tile i plays a new operation only when it is the next one; played tiles scrub back to the frame after that operation; the tile for the frame on view is disabled with `active`. No reset and no play-all. Milestones: `poured` (first Remove), `all-out` (fourth Remove). QA path: Add 1 to 4, Remove x4.
- The first Remove shows the pour in two beats (items slide across with a 60 ms stagger, then item 1 leaves after 330 ms). Under reduced motion it is instant.
- Reveal pins the furthest frame reached. Text is static and true because `all-out` needs all eight operations played.
- Spec deviations: the "out not empty: no pour" note stays on the frame instead of flashing for 450 ms (it is derived from the frame, so scrubbing shows it again). The pour arrow is lit on the pour frame, not only during the slide. Badges use a pill so the text is readable on the item colour.
- Claims c1 to c4 all unverified. Builder verified nothing.
- Checks run: node answer check, tsc typecheck (passed), npm run check (passed). Skipped on coordinator order (machine out of memory): next build, lesson QA, walkthrough. Layout never seen in a browser.
