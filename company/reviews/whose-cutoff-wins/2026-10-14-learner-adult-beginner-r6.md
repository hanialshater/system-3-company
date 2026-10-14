*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): whose-cutoff-wins
lesson version: v3
boundary: adult beginner (knows pass/fail cutoffs on a test; has heard "AI bias" in the news; no ML).
Screenshots seen: yes (artifacts/walkthroughs/whose-cutoff-wins/sheet.png, 4 frames; the first run timed out on page load, the retry recorded normally)
Verdict: launch

## 1. From the artifact

- Predict: the locked stage shows B dots, the A grid, the two "qualifies from" lines and "A WRONG ? / B WRONG ?". No red, no totals, so nothing leaks. The hook "So it treats everyone the same. Right?" sets up a tension but does not point at an option. "At 40, halfway" is still a fair, tempting wrong answer. The locked thumbnail is still small on phone.
- Explore: "Let the model learn a step" now comes first. Pressing it printed "Model step 30→40: 18→10 mistakes. 10 mistakes: 9 in A, 1 in B", and a red column of nine A people appeared between 40 and 50. Now I watched the model learn something, and "fewest" has numbers I can compare. Then the slider went to 60: "12 mistakes", A 9, B 3. So the total rises again past 50, and I can see that too.
- The 50 state itself (2 mistakes, both B) is not in any frame I saw. The recorded slider passed through it on the way to 60, and the gate opened at 60. The panel still said "Stop at 40, then 50" when "Show me why" was already lit.
- Reveal: "You stopped at 40: 10 mistakes, 9 in A and 1 in B" matches what I saw. "Going from 40 to 50 breaks one group B person and fixes nine group A people" points at the red column I watched, so the why (the majority's nine outweigh the minority's one) has a stand-in on stage. The 98% phrase now reads clearly ("hidden inside an overall 98% right"). Gender Shades is one told context sentence.
- The reveal frame crops the top of the stage (minor).

## 2. Earlier findings (v2 review, r5)

1. Reveal said "You saw 40" when the learner had not: **fixed**. The reveal says "You stopped at 40", and the recorded path did rest at 40 (step button), with the 40 values on stage.
2. "Let the model learn a step" never used: **fixed**. It is the first control, and it reports 18→10.
3. Running total for "fewest": **fixed** ("12 mistakes", "18→10 mistakes" on stage).
4. Predict thumbnail too small on phone: **not fixed** (minor).
5. Trust link "4/5 claims checked": **fixed** (6/6).
6. 70 s chip: **not fixed** (product-owner item).

## 3. New findings

- Told vs shown (decision 2026-10-14-told-vs-shown): the doesNotKnow items are "training minimises the average mistake" and "an under-represented group can carry most of the errors". The step button's falling totals stand for the first. The red B dots and the A/B WRONG readouts stand for the second. Both are shown, not only told.
- Minor: the "at 50" milestone seems to count on passing through, so a fast drag from 40 to 70 could unlock the reveal without the learner ever resting on the 2-mistake state the reveal quotes (the W-150 family). On the recorded path it rested about 450 ms, and the step button walks there anyway, so I do not block on it.
- Minor: when the gate is open, "Stop at 40, then 50" should stop showing as an instruction.
- No FATAL.
