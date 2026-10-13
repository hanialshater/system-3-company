# Build note: add-a-zero (demo-builder, 2026-10-13)

- Intent: one place-value table (100s, 10s, 1s, 1/10s, 1/100s) with a fixed decimal point, holding 3.5 as digit tiles. "Stick a 0 on the end" adds a dashed 0 tile after the last digit (it lands in the hundredths: written 3.50, value 3.5). "× 10" slides every tile one column left (0.3 s transition): 3 tens, 5 ones = 35; a second press gives 350, then the button disables.
- Readouts: "Written" (the digits as drawn) and "Value" (sum of digit × place value from the same tiles), so 3.50 vs 3.5 is visible side by side.
- Key states (two milestones): the stuck-on 0 seen (value unchanged), and × 10 done. QA presses the 0 first, then × 10, ending on 35.0 = 35, which the reveal describes; the 3.50 paragraph shows only if the learner stuck the 0 on.
- The 30.5 option (concatenation error) is a distractor only; the reveal does not discuss it.
- All claims unverified, for the fact-checker.
