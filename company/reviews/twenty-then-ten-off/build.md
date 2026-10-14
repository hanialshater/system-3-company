# Build note: twenty-then-ten-off

builder: demo-builder (sonnet builder, EXP-003 model comparison) · 2026-10-13

- Intent: one price bar; each discount cuts its percent of the price at that moment, with the working shown ("10% of $80 = $8 off").
- Milestones: both discounts applied ($72, 28%) and "Swap order" pressed (still $72). Reveal quotes both orders.
- Controls: 20% off, 10% off, Swap order (enabled once both applied), Reset.
- Total discount readout hidden while locked.

## Revision v2 (wave C)

No code change: the 28.000000000000004% artefact was already removed in v2 (TOTAL_PCT is rounded; verified in the built page). Remaining options are all round numbers.

## Pre-flight v3

builder: demo-builder (wave G revisions, batch 2) · 2026-10-14 · answers r7 learner review `2026-10-14-learner-knows-percent-discount-r7.md`

Changes: Reset cleared every number the reveal quotes. Each finished order is now recorded on a "Seen" line under the readouts ("Seen 20% then 10%: $20 off, then $8 of $80 → $72 (28% off)"; the swapped order gets its own line). Reset clears the bar and the working labels, not the Seen lines, and the reveal reads its numbers from the recorded runs. Hook changed from "Is that 30% off?" (it singled out one option) to "What is the total discount?". c1-c3 unverified (their stage source changed).

1. **Title and hook.** "Twenty off, then ten off" / "A coat is 20% off, then a coupon takes 10% off. What is the total discount?" No percent named as the total, no option singled out. No.
2. **Options.** "30%" / "28%" / "25%". All whole percents.
3. **Locked stage.** Chip "Model: two % discounts on one $100 coat", a full $100 bar, "Price now $100", "Total discount ?", buttons 20% off / 10% off / Swap order / Reset (all disabled). No Seen lines, no working labels, no 28 or 72.
4. **Reveal values.** "$20 ... $80 ... $8 ... $72 ... 28% off": the recorded run seen["20>10"] (milestone stacked or swapped puts it there), printed on its Seen line in the same rounding. "$10 then $18 ... $72": seen["10>20"], its own Seen line; milestone swapped guarantees both orders were finished. "not $10" and "0.8 x 0.9 = 0.9 x 0.8": told, claims c1, c4.
5. **QA path.** 20% off, 10% off (stacked; first Seen line), Swap order (swapped; second Seen line), Reset. Both milestones. At reveal both Seen lines are on stage.
6. **Reset.** Pressed last in the QA path; the bar returns to $100 and 0%, both Seen lines stay. Reveal from that run: "Your Seen lines: 20% off took $20, leaving $80. The next 10% was of that sale price, only $8, not $10. The coat ended at $72: 28% off. / Swapped, the cuts were $10 then $18, and the price was still $72. Percent changes multiply (0.8 x 0.9 = 0.9 x 0.8), so stacked discounts are less than their sum and the order does not matter. / Illustrative numbers: one item, two percentage discounts." (Read from the code; this batch does not run QA.) Text budget: with both Seen lines and both working labels the stage passes 25 words, most of them numbers; flagged for the reviewer.
