*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): the-doctor-picks-the-patients
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows confounding and control groups; does not know that letting a person choose who is treated builds their judgement into the result, and that a coin breaks that link)
Screenshots seen: yes (artifacts/walkthroughs/the-doctor-picks-the-patients/sheet.png; single frames 02-step-1.png and 03-step-2.png opened and cropped to compare the boxes)
Verdict: block

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "The doctor, who knows the patients"; tapped "Coin chooses", "Coin again", "Doctor chooses"; opened reveal.

1. **The prediction is genuine.** "The doctor, who knows the patients" sounds responsible; "Either: with 20 per group it evens out" is a good trap for someone who knows control groups but not selection. Three distinct options.
2. **The doctor's split is a strong picture.** Dots shaded by chance to recover (30% pale → 90% dark): with the doctor choosing, the Drug box is all dark and the No-drug box pale, "15.1 vs 8.9 · Gap +6.2" for a drug that does nothing. That is the lesson, seen.
3. **Blocking: "Coin again" looks like a dead control.** After "Coin chooses" the boxes read "expected: 11.8 of 20 / 12.2 of 20 · Gap −0.4". After "Coin again" they read exactly the same, and because each box's dots are drawn sorted from dark to pale, the two pictures look identical (I compared the cropped frames side by side; I could not spot a difference). The "Coin again" button does not even stay highlighted. From my seat the control did nothing.
   This is worse than a cosmetic bug because the reveal relies on randomness: "A coin knows nothing about the patients, so fit and frail land on both sides about equally. A gap as big as the doctor's turns up by coin less than 1 time in 100." What I saw is a coin that gives the same answer every time. A learner can leave believing the coin split is fixed, which removes the reason a coin is fair.
4. **Where the idea I lack first appears: "expected: 11.8 of 20".** "Expected recoveries" is the sum of each patient's chance, not a count of people. My boundary has not met expected values, so 11.8 people reads oddly. Not blocking; "Gap" carries the comparison.
5. "less than 1 time in 100" is told, not seen; there is no tally of repeated coin splits. With a working "Coin again" a short "coin gaps seen: −0.4, +1.2, ..." line would make it seen.
6. Reveal fits with its picture (05-reveal: doctor's split on stage, "Last coin split: 11.8 vs 12.2" trace). Trust link reads "4/4 claims checked".

Verdict reason: a control that visibly changes nothing, and that undercuts the reveal's claim about chance, is a specific blocking finding (reviews README rule 5: dead control). The rest of the lesson is strong.

Fixes (hypotheses for the builder, not tested):
- Make each coin press produce a visibly different split: different gap values, and dots drawn in patient order (not sorted within each box) so the shuffle is visible.
- Keep a short tally of coin gaps seen, so "about equally" and "rarely as big as the doctor's" are seen.

## After reading build.md (Pre-flight v1)

- The build note confirms finding 3: coinSplit uses seeds 58 then 59, and both give "11.8 vs 12.2"; the QA path records "new positions". The positions do change, but with dots sorted inside each box and identical totals, the change is invisible to a learner. QA passing (the DOM changed) does not mean the learner saw a change. The block stands until "Coin again" visibly changes the split, or is removed and the reveal stops relying on repeated coin draws.
- Fix route: demo-builder (seed choice / dot order / tally); cm-probability to confirm the reveal wording once the coin varies.
