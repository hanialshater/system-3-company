*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: rome-placed-too-far-east
lesson version: v2
boundary: adult beginner (the brief's own boundary). Knows that old maps were rough and that latitude and longitude locate a place. Does not know that the old errors ran almost all one way and were huge even for a short, well-travelled distance, or why longitude was hard. Assumes that measurement errors scatter around the truth. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/rome-placed-too-far-east/sheet.png, recorded 2026-10-15T10:04:34.176Z, production build on http://localhost:3590, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: in the reveal, on the word "east".** The stage is excellent at showing *that* every estimate is to the right of the true line. After step 1 I can count ticks right of the green band, and after step 4 every dot sits right of it. So my question going into the reveal was "why were they **all** too far east? I'd expect guesses to land on both sides." The reveal answers a different question: "longitude needs the difference in local time between two places, which nobody could then measure well." That explains why the errors were *big*, not why they all went *one way*. On my boundary I now wrongly infer that clock errors somehow push things east, or I am left puzzled. The surprise the lesson works hardest to show, the one-sidedness, is never explained, and nothing on the stage stands for the cause.
2. **What the prediction felt like.** It felt fair, with a mild lean. The hook ("spent centuries on one short distance. How close did they get?") and "before 1644" both suggest "not close", which nudges toward 1 of 12. With my boundary I would still say 6 of 12 (scatter around the truth). The locked stage hides the estimates. The options are the same precision.
3. **Did the reveal answer the question I actually had?** No, as above. Two smaller breaks:
   - Step 4's readout "earliest (150) 27.8°, latest (1610) 28.2°" uses a bare "150". I read it as a count, not the year AD 150. The stage's point here (no improvement in 1,460 years) is strong, but the reveal never says it, so the sort-by-year step looks like a detour.
   - "9.3° too far ≈ 780 km" quietly converts degrees to km. The 500 km scale bar helps, but a beginner who knows that a degree is about 111 km will compute about 1,030 km and distrust the number. One phrase ("at Rome's latitude a degree of longitude is about 84 km") would close that.
4. **Trust sheet.** The served build shows "7/9 claims checked" (c8 and c9 NOT YET CHECKED). I was told the claims are verified, so the build may predate the fact-check. This is a note for the rebuild.

Verdict reason: the stage makes the learner ask "why all too far east?" and the reveal answers only "why large", so the misconception the lesson targets (errors scatter around the truth) is shown wrong but left unexplained.

Concrete fixes:
- Add one claimed sentence, from the source, on why the error ran one way (for example, if the cause is inherited Ptolemaic coordinates that later mapmakers copied, say so; that also explains why 150 and 1610 agree). Point the reveal at the sort-by-year stage: "the earliest, AD 150, and the latest, 1610, both say about 28°".
- Write years as "AD 150 (Ptolemy)" on the stage and in the readout.
- Give the km conversion a stage caption, or fold it into the readout: "9.3° ≈ 780 km at Rome's latitude".

## After reading build.md / meta.json

- The misconception in the brief is "old estimates scattered around the truth, so their average was about right". The stage refutes it well, but the reveal's single cause ("longitude needs time") does not explain a one-sided error. That is the gap in finding 1, and it sits squarely on the brief.
- The objective asks only that the learner can say "all twelve put Rome too far east" and "longitude needs a difference in local time". A learner could recite both and still hold a wrong model of why. By the brief's own wording the lesson may meet its objective; by the standard's "show the why you promised" it does not, because the stated cause is told, not shown, and does not fit the observed bias.
- build.md v2 notes the fact-checker said "five of the twelve" were read from maps, while the pinned CSV gives 2. The stage says 2. I did not check this; it belongs to the fact-checker.
