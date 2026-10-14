# Build note: sorted-input-sinks-quicksort (algo-pair-01, 2026-10-14)

Built from the brief (#2) and spec. Status draft, all 6 claims unverified.
- Re-ran in node: sorted 1..6 = 15, shuffled 3 4 1 6 2 5 = 9, all 720 orders: max 15, min 8, total 7416 (mean 10.3), **32 orders tie at 15**. Reveal says "no order of 6 cards costs more", not "the only worst case".
- Controls (DOM order): Split next group, sorted/shuffled toggle, Finish both hands (70 ms per row, ~350 ms; instant under reduced motion). One-press QA path reaches both milestones (sorted-done, shuffled-done). Counts are "?" while locked; no scale end drawn.
- Reveal switches the view to the sorted ladder; nothing cleared.
- Spec said an SVG wireframe exists; none was on disk.
- NOT run (machine out of memory, coordinator order): next build, tsc, QA, walkthrough. Only `npm run check` passed. Chief of staff's integrated pass must cover them; things to look at: ladder row text at 390 px, tally wrap.
