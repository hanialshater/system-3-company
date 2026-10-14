*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): vaccinate-at-the-peak
lesson version: v3
boundary: adult-beginner (knows the SIR picture and that an unchecked epidemic peaks and then declines; school arithmetic; new to epidemic models)
Screenshots seen: yes (artifacts/walkthroughs/vaccinate-at-the-peak/sheet.png)
Verdict: revise

Note: there is no r6 file for this lesson. The latest earlier learner review is 2026-10-14-learner-adult-beginner-r2.md (on v3). The boundary tag is from that file and meta.json.

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "Almost none of it"; Day 0; Peak (day 19); Day 40; Never; slider right (day 2); opened reveal.

1. **The idea mostly comes from the stage.** Each date fills the 100-dot town with red (infected), green (vaccinated) and open (never) dots against a dashed outline for "no vaccine". The status line gives the finals: day 0 70%, peak 76%, day 40 94%, none 94%. Going 70 → 76 → 94 makes "the peak still keeps most of the benefit; day 40 keeps none" readable from the stage alone. The cause, "Day 19 (the peak): 35% not yet infected", is on the stage line. The dot picture shows only the final state, not the town on day 19, so the cause is a number on the stage and not a picture. It is enough to stand for the why.
2. **The reveal's arithmetic does not use the stage's rounding (revise).** The stage shows 94%, 70% and 76%. From those, a learner gets 24 points saved at day 0 and 18 at the peak: 75%. The reveal says "the peak saves 18.4 of the 23.8 points day 0 saves: 78% of the benefit". 18.4 and 23.8 never appear on the stage, and 78% is not what the shown numbers give. The answer band ("about three quarters") survives, but this breaks the rule that quoted values use the stage's rounding, and a careful learner checking the sum will think they misread.
3. **The day-40 case contradicts the premise.** The question says "20% of the town, all not yet infected, is vaccinated". On day 40 the stage says only 6% are not yet infected, and only a few green dots appear. So the 20% cannot have been given. A learner can work it out ("you can't vaccinate people who've had it"), but nothing on the stage says the dose was capped. Minor, because day 40 is not the question's case.
4. **No answer before the commit: passes.** Title "Is the peak too late to vaccinate?" and the hook are open questions. The three options are words at the same precision. The locked grid is empty.
5. **Minor:** the difference between the day-0 and peak pictures is only a few rows of red, so the learner relies on the status line more than the dots. "Given to random people instead, the peak keeps about 29%" is told context with no stage counterpart. It is fine if claimed.

## After reading the brief and the r2 review

The lesson is still v3, the version r2 reviewed (launch). r2 findings:
1. "18.4 of the 23.8 points, 78%" uses decimals the stage never shows: **not fixed**. r2 called it minor. Under "The reveal quotes what you saw" (decision 2026-10-14-reveal-quotes-what-you-saw: "it uses the stage's rounding") I now hold it as the blocking finding.
2. "Given to random people instead, the peak keeps about 29%" is told: **not fixed**, minor (context).

Verdict reason: the stage carries the idea, but the reveal's headline arithmetic disagrees with the numbers on the stage. Fix route: demo-builder (either "about 18 of 24 points, about three quarters" or one decimal on the stage line). New minor item: the day-40 case cannot vaccinate 20% "not yet infected" when 6% remain.
