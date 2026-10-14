*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): clear-the-lowest-one
lesson version: v1
boundary: knows that bit masks keep or clear named bits (mask-the-flags); has never seen x & (x − 1); thinks of "minus 1" as a last-digit change, as in decimal. (From meta.json learner field; there is no earlier learner review.)
Screenshots seen: yes (artifacts/walkthroughs/clear-the-lowest-one/sheet.png)
Verdict: revise

## 1. From the artifact
- **Blocker: the locked stage gives the answer away.** Before I commit, the stage shows a readout "1 BITS IN X: 3" under 10110. The options are "5, one per bit position" / "3, one per 1 bit" / "2". A learner who matches the numbers picks "3, one per 1 bit" without predicting anything. The stage caption "x − 1 flips the lowest 1 and the zeros below it. The AND keeps the rest." is also visible while locked. That is the mechanism the reveal is supposed to answer (W-154 pattern). Hide the ones count and the caption until the first press, or show them only after commit.
- Shown well: the three rows x / x − 1 / AND with values (22 / 21 / 20). The lowest 1 is ringed, the flipped bits in x − 1 are green, and the cleared bit in AND is red. One press gives 10110 → 10100. "Repeat until 0" gives the chain 10110 → 10100 → 10000 → 0 with REPEATS 3 and "x is 0 after 3 repeats. It had 3 ones." The step 10100 − 1 = 10011 (green run of three) is the best moment: it breaks "minus 1 only changes the last digit".
- **Told, not shown: the power-of-two test.** The reveal says "If one repeat gives 0, x was a power of two." The stage never frames that. The chain does pass through 10000 → 0 in one step, but nothing marks it, and the reveal does not point at it. This is in doesNotKnow, so under "Show the why you promised" a told sentence is a revise. Cheap fix: label the 10000 step "one 1 bit → gone in one repeat", or add a "Try 10000" preset and have the reveal point at it.
- **Quoted but not visited:** "255 takes 8 repeats." "Try 11111111" loads 255 but I never had to run it, and the recorded path did not (the bit toggles shrank it by hand instead; REPEATS stayed 0). Either gate on it or say "try it".
- Minor: the hook asks "Which bits of x survive?" but the question asks "How many repeats?". They are related but not the same question.
- Minor: the bit-toggle cells are unlabelled, so it is not obvious they can be tapped. After toggling, REPEATS resets to 0 and the chain shows only the new x.
- Minor: "2^30 takes 1, where shifting right one place at a time needs 31": fine as told context, but "shifting right" is a new idea in the last sentence.
- No FATAL: the mechanism itself is on stage and readable.

## 2. Earlier findings
None: this is the first learner review.

## 3. Against the brief (read after section 1)
Objective: "x − 1 turns the lowest 1 into 0 and zeros below into 1s" (shown: green run), "clears exactly that bit" (shown: red cell), "10110 takes 3" (shown), "power of two exactly when one repeat gives 0" (**told only**). The misconception, "minus 1 changes only the last digit", is answered by the 10100 → 10011 frame. The reveal should point at that frame by name.
