*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5, first learner review): drop-the-losing-start
lesson version: v2
boundary: adult beginner who knows a running total (brief: "assumed"); does not know that a negative running total can be thrown away, or Kadane's algorithm.
Screenshots seen: yes (artifacts/walkthroughs/drop-the-losing-start/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: nine gains, "biggest total over a run of consecutive days?": 4 (the biggest single day), 6, 12 (all the positives added). Both wrong answers are natural. A real guess; doing it by hand means trying many stretches, which is the pain the lesson removes.
- Explore: "Next day" plots −2; "Start over" drops it ("dropped −2") and the solid line resets to 0 while the dashed "Kept everything" line stays below. "Auto: start over below 0" then "Play to day 9" drops −2 again after day 3 and climbs 4, −1, 2, 1 to "Best 6, days 4–7"; the dashed line never gets above 2. The gap between solid and dashed lines shows on stage that dropping a negative stretch only helps. "Check all 45 stretches" fills a start × end triangle and rings 6: "Your best 6 matches the 45 stretches." The proof by brute force is seen.
- Reveal: every number quoted (−2 twice, days 4 to 7, 6, "never above 2", 45) was on stage. The name "Kadane's algorithm" comes last.

## 2. Earlier findings

None: no earlier learner review exists for this lesson.

## 3. New findings

- Minor: the panel ("Drop a stretch when you think it has become a burden") leaves "burden" to the learner; the rule (drop when the total goes below 0) is only on the Auto button. A learner who drops at the wrong moment will see a worse best, which is instructive, but the stage does not say why.
- Minor: the "dropped −2" labels under the day chips are clipped at the left edge ("lropped −2").
- Minor: the 45-stretch triangle is dense on a phone (tiny numbers); the ringed 6 carries it. In the reveal frame the chart is scrolled out of view and only the triangle shows.
- Minor: the hook's "without trying every pair" means pairs of start and end days; "every stretch" would be plainer.
- Status chip reads DRAFT and the trust link "0/5 claims checked" (fact-checker's lane; launch is blocked on that, not on this review).
- No FATAL.
