# Build note: herd-immunity

(No v1 build note was written. This file starts at the revision.)

## v2 (revision)

Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key states: one finished outbreak above the 75% threshold (`over-above`), and one finished outbreak below it that took off, reaching more than 20% of the unprotected (`took-off-below`). `minInteractions = 2`.

| Finding | What I did |
|---|---|
| Fact-check c5 DISPUTED ("when it takes off it reaches a large share") | Reworded the claim and the reveal. Below the threshold, outbreaks can still fizzle, but one that takes off reaches a share that grows with distance from the threshold: small just under it, most of the unprotected at 50%. c5 goes back to unverified for an independent re-check. |
| Learner 1: R0 and 1 − 1/R0 appear without introduction | The stage label reads "Toy disease, R0 = 4: each case meets 4 random people." The reveal uses R0 only after the stage has named it. |
| Learner 2: the learner can finish without seeing 80% or a below-threshold take-off | Gated (see key states). The immune share is now a row of chips (50/60/70/80/90). Once an outbreak is over, changing the share shows how the same seeded outbreak ends at the new share, so comparing across the threshold takes one tap. If a run below the threshold fizzles, the stage says "It fizzled by luck. Try a new outbreak." |
| 3: no step from 4 to 0.8 | The readout shows "Each case infects 4 × 20% = 0.8", and the reveal repeats the arithmetic. |
| 4 / fact-check F1: "Typical" was a mean, and a single run could coincide with it | The readout is now "Average, 200 runs". The reveal says "on average about 4 of the 80". I did not switch to a median: c4 is stated as a mean and is verified. |
| 5: "sick now" and "had it" look alike | "Had it" is now a pale fill with a dashed red outline. "Sick now" stays solid red and larger. |
| 6: the line answering the hook is buried; the caveat is clipped | The hook answer is now the last sentence of the main paragraph ("Above it, the immune mostly shield people with no immunity"), with "mostly" per fact-check F4. Clipping: the reveal panel scrolls inside the kit card. That is a kit layout issue, so I did not touch it. |
| Fact-check F3: "made up" and "imperfect vaccines" appeared nowhere | The stage says "Toy disease". The reveal says "Toy model: made-up disease, random mixing, perfect immunity (real vaccines are not)." The predict question starts "Toy town of 400". c8 is unchanged. |
| label-the-model-on-the-stage | Done (stage label plus "Toy town" in the question). |

Claims: c5, c9 ("mostly") and c10 ("usually") reworded and unverified. c12 added (R0 = 4 contacts, 4 × unprotected share).

QA-path trade-off: the DOM order is Next step, Run to end, the share chips, New outbreak. CSS `order` puts New outbreak on the first line visually. The contract finishes the outbreak at 80%, then presses 50% (seed 1 takes off: 168 of 200) and the other shares, then New outbreak. Both milestones are met. The slider is gone: chips are coarser (5% steps are lost) but make the threshold comparison one tap.

## v3 (claim fix 2026-10-13)

Claim c10 disputed (per-step shrinkage is false). Reveal now says 'Outbreaks usually fizzle out' instead of 'The chain usually shrinks and dies'; claim rewritten to the 0.8 new cases per case average and the 97-in-100 figure the checker supplied; unverified. c5 was already verified in the second check and is untouched.

## Revision v4

Input: latest learner review (and fact-check). 75% threshold never shown, 70% fizzle contradicted the 1.2 readout, R0 undefined, dense reveal. Added a 75% chip and a third milestone (a finished run at 75%); readout says "(shrinks / can grow / just replaces itself)"; fizzle message explains luck; R0 defined in the question and the stage line; reveal quotes the 75% run; hook no longer leans to "yes". c12 reworded, unverified.
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 4, `format` set, edited claims are unverified for the fact-checker.

## Revision v5 (batch 02, 2026-10-14)

The "Each case infects" and "Average" readouts now sit directly under the status line, above the controls, so they are visible on the phone after a run. The 70% fizzle caption is shorter and the line reserves two lines (no overlap with the buttons). "Below it" is now "Below 75% immune". Known, not fixed: the picture label after step 1.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
