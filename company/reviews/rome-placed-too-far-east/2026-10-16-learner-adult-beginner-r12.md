*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: rome-placed-too-far-east
lesson version: v3
boundary: adult beginner (meta.json learner field, read before the walk as the role's input). Knows that old maps were rough and that latitude and longitude locate a place. Does not know that the errors ran almost all one way and were huge even for a short, well-travelled distance, because longitude needed time. Assumes measurement errors scatter around the truth.
Screenshots seen: yes (artifacts/walkthroughs/rome-placed-too-far-east/sheet.png, recorded 2026-10-16T09:26:04.493Z, production build of HEAD c2923c9 on http://localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: in the reveal, on "every one put Rome too far east". This is the same break as r1, and it is unchanged.** The stage is clear: after step 1 every tick sits right of the green band, and in the year view every dot does too, from AD 150 to 1610. So I go into the reveal asking "why were they **all** too far east? I'd expect misses on both sides." The reveal's cause is "longitude needs the difference in local time between two places, which nobody could then measure well." That tells me why the errors were *big*. It does not tell me why they were all *the same way*. Bad clocks, as I picture them, would be early or late, so the errors should scatter both ways. That is exactly the misconception I came in with, and the lesson leaves it standing on the very point it made me notice. As a beginner I either invent a wrong mechanism (time errors push things east) or I leave puzzled.
2. **What the prediction felt like.** Fair, with a mild lean. "Spent centuries... How close did they get?" and "before 1644" hint at "not close". My boundary still says "6 of 12". The locked stage hides the estimates. Note: step 1's readout "1 of 12 within 2°" gives away the answer on the first tap, before the reveal. That is fine for a count question, but it means the reveal adds no surprise about the number, only the explanation, which raises the stakes on finding 1.
3. **Did the reveal answer the question I actually had?** No (finding 1). Smaller points:
   - Fixed since r1: the years now read "AD 150", and the year-view readout "AD 150: 27.8°, 1610: 28.2°" makes the no-improvement point plain on the stage.
   - Still open: the reveal never mentions the year view. "Sort by year" is the step that shows the best evidence (1,460 years, no better), and the closing text skips it.
   - Still open: "9.3° too far ≈ 780 km" converts degrees to km at about 84 km per degree with no word on why. A beginner who knows "a degree is about 111 km" gets about 1,030 km and distrusts it. The 500 km scale bar does not resolve it.
   - New, small: in the year view the readout label reads "READING · 780 KM TOO FAR" above "AD 150: 27.8°, 1610: 28.2°". I first read it as "the 1610 estimate was 780 km too far". The label belongs to the middle estimate, not to these two values.
4. **Trust sheet** reads 9/9 checked on the served build. c10 is absent, consistent with the cut.
5. **Framing.** Nothing here touches a group of people. It is a measurement history (Toledo, Rome, named astronomers). No cultural-route flag.

Verdict reason: the stage makes the learner ask "why were all twelve too far east?" and the reveal answers only "why were they so far off". The one-sided error, which is the lesson's central surprise and the direct refutation of the "scatter around the truth" misconception, is still unexplained, exactly as in r1.

Problems to solve (not prescriptions): the learner needs either a claimed reason for the one-way error, or an honest statement that the reason is not "bad clocks". For example: "time explains why they were far off; why they all erred the same way is a different story (copied coordinates?)". Even saying "this record does not say why they all went east" would stop the wrong inference.

## After reading meta.json (build.md not read)

- **The misconception is "old estimates scattered around the truth, so their average was about right".** The stage refutes the "average was about right" half well (the middle is 780 km off). It shows the "scattered" half to be false but does not explain it, so a beginner may keep the model of random clock error and simply scale it up.
- **The objective** asks only that the learner can say "all twelve too far east" and "longitude needs a time difference". By that wording v3 may meet it. As a beginner reads it, the two statements sit side by side as if the second explains the first, and it does not. Finding 1 stands against the objective as worded. The objective may itself need a one-way cause, or an explicit "not explained here".
- **Objection to cm-history r1 ruling 5** (`company/reviews/history-round-1-cm-rulings.md`, section 5). The cut c10 was the one sentence that answered r1's finding ("Why all east? Many inherited Ptolemy's AD 150 coordinates..."). The ruling's reasons hold: the sentence was held unsourced, and it caused the crop. But the result is that v3 reopens r1's break exactly. The ruling weighed the cut against the fallback ("Nor did they improve"), not against the question the stage raises. This objection goes with the decision. The owner of the reply is cm-history (brief 6 objective, or a sourced replacement for c10). The fact-checker can say whether any source for the Ptolemy inheritance opens. A no-new-claim option, a short reveal clause that this table does not say why the errors all went east, would also clear finding 1. That is the builder's and cm-history's call, not mine.
- Under the five decision's pre-declared order, this verdict (not launch) passes slot 5 to lakes-misplaced-east-west if lakes qualifies (see that lesson's r12 review). That is head-of-product's call to apply.
