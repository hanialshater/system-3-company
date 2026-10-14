# Build note: odds-average-the-bettors

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #6

- Intent: one 100% pool bar split into money on A (bettor 1, bettor 2) and on B (bettor 1, bettor 2); the A/B boundary is a solid line labelled "odds 70%", and a dashed line marks the simple average of beliefs. Each segment's width is the money behind a belief, which is the stand-in for "wealth-weighted".
- Stage text and chip say each bettor splits ALL their money by belief (brief edit). No house cut.
- Milestones: "equal" (equal money: odds land on the simple average) and "richer2" (bettor 2 richer: odds slide toward 40%; preset gives 50%). Presets in DOM order: Equal money, Bettor 2 richer, Start values; then four sliders (money step $50, belief step 10%).
- Log-utility (Kelly) sentence told once in the muted model line, claimed as c4 (source, unverified).
- Not run here: build, tsc, QA. Watch on a phone: two rows of two sliders may wrap to four rows; check the stage height.

## Revision v2 (wave E r6, 2026-10-14)

r6 (odds graduate, revise): the hook "The odds don't say 60%. Whose opinion counts more?" struck the misconception's option before the commit. Fixes:
- Title "Two bettors, one set of odds" (was "The odds average the bettors"). Hook "One bettor says 80%, another 40%. What do the odds say?".
- Third milestone, start: the question's own case ($300 at 80%, $100 at 40%) must be shown, either with "Start values" or the sliders. minInteractions 3.
- The equal-money and bettor-2-richer states are recorded when first reached, and the reveal quotes the records (money, odds, simple average, bettor 2's belief), not constants. The first paragraph appears only once the start state is recorded.
- A "Seen:" line keeps all three odds on stage, since the slider presses after them change the bar: "Seen: equal money 60% · bettor 2 richer 50% · start 70%".
- Bettor key under the bar (swatches for bettor 1's and bettor 2's money; "left of the line: on A").
- Claims unchanged in text (none reworded); no claim reopened. Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "Two bettors, one set of odds" / "One bettor says 80%, another 40%. What do the odds say?" Neither rules out 60%, 70% or 80%.
2. Options: "60%", "70%", "80%". All whole percents.
3. Locked stage: empty pool bar labelled "On A" and "On B", the model chip, the key, "Seen: nothing yet", readouts "?". No divider, no dashed average, no number.
4. Reveal values: $240, $40, $280 of $400, 70% and 60%: (b) milestone start, constants that equal the recorded start state (the reveal prints them only after that milestone); equal-money odds and average: (b) milestone equal, recorded; bettor-2-richer money, odds, belief and average: (b) milestone richer2, recorded. All three odds stay on the "Seen:" line.
5. QA path: Equal money (equal), Bettor 2 richer (richer2), Start values (start), then four sliders, two presses each (they change the bar but not the records). All three milestones reached, including the question's own case. The "Seen:" line is on stage at the reveal.
6. Reset: "Start values" is the only reset and is itself a milestone. The records never clear. Reveal on the QA path: "$300 × 80% = $240 and $100 × 40% = $40 put $280 of the $400 pool on A, so the odds said 70%, not the simple average of 60%. / With equal money ($200 each) the solid line sat on the dashed one: odds 60%, simple average 60%. With bettor 2 holding $300 to bettor 1's $100, the odds slid to 50%, toward bettor 2's 40%, while the dashed average stayed at 60%. Each opinion counts in proportion to the money behind it: the implied chance is the wealth-weighted average belief. / A simplified model: no house cut, each bettor splits all their money by belief, as a bettor maximising the logarithm of their wealth would."
