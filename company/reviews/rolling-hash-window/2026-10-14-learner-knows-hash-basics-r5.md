*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5 wave, first learner review): rolling-hash-window
lesson version: v2
boundary (from meta.json learner field): knows what a hash is (a number made from some data, from hash-bucket-pileup); does not know that a sliding window's hash can be updated instead of recomputed, or that equal hashes still need a letter-by-letter check.
Screenshots seen: yes (artifacts/walkthroughs/rolling-hash-window/sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact

- **Predict leaks the answer (main finding).** The title is "Slide the window, don't re-add it", the actual answer. The correct option spells out the method ("None: subtract the one that left, add the one that arrived"), while the distractors are bare ("All 5 in the window", "About half of them"). The locked stage's counter already reads "sliding 5 · adding each window again 5", which names the two strategies. A learner at my boundary does not need the idea to choose. They only need to notice that one option explains itself and the title agrees with it.
- The option wording is also slightly at odds with the reveal. "None" letters re-added, but "each slide touched two letters". A careful learner may wonder whether the answer is "none" or "two".
- Explore: the first action the panel asks for is "Check the flagged window", which teaches the second idea (false flag: EBCDA sums to 15, "E ≠ A at letter 1"). That happens before I have seen one slide. Then "Slide" shows the core move well: "15 − 5 + 6 = 16" with −5 and +6 marked over the letters leaving and arriving, and the counter goes 5 → 7 against 5 → 10. "Slide to end" jumps six slides at once to ABCDE, with totals of 19 against 40. The core idea is on the stage, but I saw only one slide step by step.
- Reveal: 7 slides, 19 vs 40 and EBCDA vs ABCDE all match what I saw. "Each slide cost the same, however long the pattern is" is told: the pattern length is fixed at 5, so I cannot test it.

## 2. Earlier findings

- No previous learner review exists for this lesson (company/reviews/rolling-hash-window/ holds only build.md and a fact-check). Nothing to compare.

## 3. New findings

1. Main: remove the answer from the title, and make the options equally bare (for example "All 5 / Just 2 / About half"). Hide the "sliding vs adding again" counter until after lock-in.
2. Order: let the learner slide first (the main idea), then meet the false flag. At the moment the collision check comes before the thing it qualifies.
3. Minor: "Slide to end" skips six steps. Requiring two or three single slides before the jump would let me see that each costs 2.
4. Minor: a window-width control (5 → 10) would make "the same cost however long the pattern" something I can see.
5. Not a learner issue, but visible to learners: the badge reads DRAFT and the trust link "0/5 claims checked" (route to fact-checker).
- No FATAL.
