*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): bad-year-breaks-the-quota
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a lake adds at most 125 fish a year, at 500 fish, and logistic growth; does not know that a fixed quota below the lake's best growth has a second balance point (400 fish here) below which the lake drains, and that a fixed share has none)
Screenshots seen: yes (artifacts/walkthroughs/bad-year-breaks-the-quota/sheet.png, recorded 2026-10-14T18:51)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Both"; tapped "Disease kills 30%", then "Disease kills 50%"; opened reveal.

1. **The prediction is genuine.** Both lakes give 120 now and both are hit equally, so "Both" (or "Neither") is the natural guess. Nothing on the locked stage gives away the asymmetry.
2. **The contrast is well chosen.** 30% (to 420) leaves both lakes recovering; 50% (to 300) leaves A crashing to empty in year 17 while B's dashed curve climbs back. The step from "both fine" to "A dies" between two taps is the lesson.
3. **Where I first needed an idea I lack: "A's tipping point: 400".** The red dashed line appears after my first tap with a number but no reason. The 50% callout ("at 300 fish: grows 105, A takes 120") explains why below the line is fatal, but nothing says that at 400 the lake grows exactly 120, which is what makes 400 the line. With logistic growth in my boundary I could compute 0.5·400·0.6 = 120, but a beginner will not. One more callout or clause closes it.
4. The 30% run reads "A 589 fish" at year 60, so A is still climbing slowly. A careful learner may ask why A is slower to recover than B; the lesson does not need to answer, but it is a visible oddity.
5. **The reveal fits.** It quotes 600, year 17, 105, 60 fish and 400, all of which are on the chart when it opens. "Toy model, not fishing advice" is honest.
6. Trust link "0/5 claims checked" (fact-checker's lane).

Fixes (wording only): name why 400 is the tipping point ("at 400 the lake adds exactly 120").

Verdict reason: the misconception (same catch now = same safety) is broken by two taps I control, and the reveal's mechanism is quoted from the stage.

## After reading the brief (meta.json)

- doesNotKnow is the second balance point at 400. The stage shows the point and what happens below it; finding 3 (why 400) is the one step the brief names and the stage leaves for me to infer. Not blocking.
