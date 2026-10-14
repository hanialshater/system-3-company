# Build note: two-cells-sum-any-range

Builder: wave-i-cs (demo-builder) · 2026-10-14 · from brief cs.algorithms.md #81 (single card), board W-397.

- Brief numbers re-run in node: P = 3, 4, 8, 9, 14, 23, 25, 31; P7 - P2 = 25 - 4 = 21; all 36 ranges match; day 3 + 1 changes 6 of 8 totals.
- Stage: two rows of 8 cells (sales by day, running total; each about 40 px wide at 390). "Next total" fills one total (the two inputs light up); "Build the rest" fills the remainder; the caption then reads "building it took 7 additions" (kept after Reset). The from / to sliders (enabled once the row is built) outline the range's days and ring the two totals used; one line reads e.g. "Days 3–7: 25 − 4 = 21 · reads 2 · adding: 5 numbers" (a range from day 1 reads "total 23 · reads 1"). "Day 3 + 1" turns every stale total red; "Build the rest" becomes "Rebuild totals". Reset restores the data and empties the totals; trace lines stay.
- Deviation from the brief: "Build the rest" added (QA presses "Next total" only once), and from / to are sliders (start 1 and 6) so two arrow presses each reach 3–7 and then 3–8 (6 days, long-range).
- Milestones row-built (7 additions), question-range (25, 4, 21 and the five day values recorded), long-range (6+ days starting after day 1), edited (stale count 6). Ranges only count while no total is stale.
- Reveal = cm-cs draft unchanged (76 words). Claim c3 flags the from-day-1 edge case ("one subtraction" is "at most one"): fact-checker / cm-cs call.

## Pre-flight v1
1. **Title and hook.** "What does a range total cost?" / "Eight days of sales, running totals ready. How much reading to total days 3 to 7?" No number is named.
2. **Options.** "5" / "2" / "7": all bare numbers.
3. **Locked stage.** Eight day cells (3 1 4 1 5 9 2 6), an empty running-total row ("·"), no caption count, no outline, no ring, no readout; sliders at 1 and 6, disabled.
4. **Reveal values.** "7 additions": (b) milestone row-built; on stage in the caption "building it took 7 additions", kept after Reset. "25 minus 4 is 21", "4 + 1 + 5 + 9 + 2": (b) milestone question-range, recorded; on stage as the trace "Days 3–7: 25 − 4 = 21" (and as rings while the range is 3–7, dashed rings after a later range). "days 1 and 2", "up to day 2": constants of the question's range (told, claim c2). "6 of the 8 totals went stale": (b) milestone edited, recorded; trace "Day 3 + 1: 6 of 8 stale".
5. **QA path.** Next total (1 of 8), Build the rest (row-built), from 1→2→3, to 6→7 (question-range) →8 (3–8, long-range), Day 3 + 1 (edited), Reset. 4 milestones in 6 controls.
6. **Reset.** Reset is the last QA press: totals empty, data restored, caption count gone. The trace lines "Days 3–7: 25 − 4 = 21" and "Days 3–8: also 2 reads. Day 3 + 1: 6 of 8 stale." stay. Reveal from that run: "Building the running-total row took 7 additions, once. Then days 3 to 7 needed just two cells: 25 minus 4 is 21, the same as 4 + 1 + 5 + 9 + 2. The total up to day 7 already holds days 1 and 2, so subtracting the total up to day 2 leaves the range. Any range costs one subtraction, however long. When you changed day 3, 6 of the 8 totals went stale: that is the price." After Reset the rings are gone; the caption keeps "7 additions" and the trace lines carry 25, 4, 21 and 6.
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 two-cells-sum-any-range` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 81 words with the verdict (76 reveal). Stage 378 px (controls 130, text 188), reveal 205 px, window 618 px. Screenshot `artifacts/reveal-fit/two-cells-sum-any-range.png`.

Not run: next build, QA, walkthrough. tsc and check pass.

## v2 (2026-10-14, demo-builder, FC pass 35 fix W-499)

- c3 and the reveal now say 'at most' ('Any range costs at most one subtraction, however long.'), because day-1 ranges read one total.
- The affected claims were reset to unverified, for a fresh fact-checker. QA and reveal-fit were NOT run to completion: the :3530 dev server took 90 to 160 s to render a lesson (load 30 to 44), against the contract's 45 s. `tsc --noEmit` passes.

## QA and fit re-run (2026-10-14, demo-builder, W-638)

- The pass 35 wording fix (above) is unchanged; pass 36 has already re-checked it. This entry only re-runs the checks that timed out before. Dev server :3631 (worktree fixes-1, HEAD 57cea14), warmed before the runs.
- reveal-fit (tool clean, 390x844): verdict fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, undefined words measured (verdict line included; reveal at most 90).
- QA contract (tests/qa/contract.spec.ts, QA_ONLY on the 7 FC35-fix lessons): phone and desktop both pass (14/14 across the 7). This was a dev-server run, not a production build.
