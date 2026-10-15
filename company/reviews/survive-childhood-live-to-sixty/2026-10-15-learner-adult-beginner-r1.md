*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: survive-childhood-live-to-sixty
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that life expectancy is "how long people live". Has never seen a life table or a survivor curve, and does not know that life expectancy at birth is an average that infant and child deaths pull down. (The brief's learner field was read before the walk, as the role's input; nothing else in meta.json or build.md was read until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/survive-childhood-live-to-sixty/sheet.png, recorded 2026-10-15T10:04:04.978Z, production build on http://localhost:3590, phone viewport; single frame 05-step-4.png opened to check the top labels)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** Nowhere seriously. The first wobble is at step 3/4. The stage draws two kinds of mark close together: a dot at the starting age (30, 60) and a dashed line at the average age at death (58, 72). At step 4 the dashed "from 30: 58" line sits just left of the dot at 60, and the "from 60: 72" label stacks on top of "from 30: 58" and "alive, of 1,238 born". Everything stays legible, but for a moment I read the line at 58 as "the 60 marker". The readout label "AVERAGE AGE AT DEATH FROM 30" can also be read as "years after 30" (that is, 30 + 58). The reveal's wording ("from 30, the average death came at about 58") clears it up, but only after the fact.
2. **What the prediction felt like.** It felt like a real choice. With my boundary, "About 31" (people died at about 30, so a 30-year-old has little time left) is the natural pick, and "About 45" is a tempting middle. The hook "What about a 30-year-old?" hints that the answer differs from 28, but it does not say by how much. The locked stage shows only axes, so no answer leaks before the commit. On the recorded path (option 1, correct) the reveal said "Your prediction held."
3. **Did the reveal answer the question I actually had?** Mostly yes. My question was "how can the average be 28 if a 30-year-old lives to 58?". The red "41% died before 5" block on the curve, the very steep drop near age 0 and the reveal sentence ("that pulled the average from birth down to 28") together answer it. Something on the stage stands for the cause (the red block), and the reveal points at it. What is missing is a single act that *makes* the average move. Pressing presets reads four numbers off the curve; I never see the 28 change because I changed something. This is a click-through, not an exploration, but it does not block understanding.
4. **Smaller points.** "Where it stops: this is one city's records over five years." "Five years" comes from nowhere on the stage or in the question. A beginner wonders which five years these are and why that matters.

Verdict reason: no finding blocks a first-time learner. The cause is on the stage and the reveal names it. The label crowding at step 4 and the readout wording are notes.

Concrete fixes (for the builder; not required for launch):
- Readout label: "AVERAGE AGE AT DEATH, IF ALIVE AT 30", or the plain "reached 30 → died at about 58".
- At step 4, stagger or shorten the top labels so "from 60: 72" does not sit on "alive, of 1,238 born". Or tie each label to its own dot ("alive at 30 → 58").
- Optional, stronger: a "Leave out deaths before 5" toggle that recomputes the from-birth average, so the learner makes the 28 jump.

## After reading build.md / meta.json

- The objective (explain that a low life expectancy at birth comes from infant and child deaths; those who reached 30 died at about 58) matches what I came away with. The misconception ("when life expectancy was about 30, people usually died around 30") is the one I would have brought, and option 3 serves it.
- build.md v2 records the cm-history ruling to hide the survivor curve until the commit. The walk confirms it: the locked frame has axes only.
- The trust sheet on the served build reads 6/6 claims checked, which matches meta.json (all six verified).
