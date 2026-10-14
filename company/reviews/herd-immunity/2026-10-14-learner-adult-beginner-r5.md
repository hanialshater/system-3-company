*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): herd-immunity
lesson version: v5
boundary: adult with school-level science; knows vaccines protect people and has heard "herd immunity" and "R0", but could not say what R0 does.
Screenshots seen: yes (artifacts/walkthroughs/herd-immunity/sheet.png, all 11 frames, plus 01-predict.png at full size)
Verdict: launch

## 1. From the artifact (written before reading the earlier reviews)

- Predict: R0 is defined in the question, the hook is neutral, and Nearly all 80 / About 20 / Just a handful is a real guess. "Nearly all 80" is the honest fear.
- Predict leak (hidden): the transcript's locked stage contains "EACH CASE INFECTS 4 × 20% = 0.8 (shrinks)". In the phone screenshot it is below the fold of the stage, so the default view does not show it, but a learner who scrolls inside the stage would read "(shrinks)" before predicting. It should be "?" until the lock, like the AVERAGE readout.
- Explore: at 80%, Next step draws one infection line, and Run to end gives "Over. 2 of 80 unprotected caught it." with "4 × 20% = 0.8 (shrinks)" and "AVERAGE, 200 RUNS 4 of 80" now in view under the grid. 50% fills the grid with dashed "had it" rings (168 of 200, 2.0 can grow). 60% gives 100 of 160. 70% fizzles, and the caption says "Fizzled by luck. Try a new one." against an average of 21 of 120. 75% shows "1.0 (just replaces itself)". 90% gives 2 of 40. The tipping is on the stage: the per-case number crosses 1 between 70 and 80, and the grid goes from red to green.
- Reveal: every number it quotes was reached in this path. "One run is noisy; the average … about 4 of the 80" settles single run against average. "Below 75% immune a case more than replaces itself" is unambiguous now. The caveat (random mixing, perfect immunity, clusters) is fully visible.
- Small: the picture label after step 1 says "2 caught it so far" while the caption says "1 new case" (it counts the seed). The 70% caption names luck but not that 1.2 is close to 1. The badge says 85 s.

## 2. Earlier findings

From r2 (v4, 2026-10-14):
- N1, readouts below the fold in the explore frames: **fixed**. EACH CASE INFECTS and AVERAGE are visible under the grid in every explore frame.
- N2, the 70% caption overlapping the buttons: **fixed** (shorter caption, no overlap).
- N3, "Below it" ambiguous: **fixed** ("Below 75% immune").
- "Step 1: 1 new case" against "2 caught it so far": **not fixed**, minor (picture label only).

From v3 and v1: single run against average, the 75% threshold not on stage, R0 undefined, the hook leaning, the 70% fizzle contradicting the rule, and the readout lacking "of 4": all **fixed**, as r2 recorded, and still fixed in this build.

## 3. New findings

- Should fix before shipping: hide the "EACH CASE INFECTS … (shrinks)" readout while locked. It is out of view on the phone, so I do not count it as blocking, but it is one scroll away from giving the answer.
- Minor: the 85 s badge (product-owner item); the "2 caught" label after step 1.
- No FATAL.
