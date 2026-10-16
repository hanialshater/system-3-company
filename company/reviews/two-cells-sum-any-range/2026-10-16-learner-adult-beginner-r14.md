*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: two-cells-sum-any-range
lesson version: v2
boundary: adult beginner from the lesson's own learner field. Knows how to add a list and what a running total is; does not know that a range total is one subtraction of two running totals, or that changing one number makes later totals wrong.
Screenshots seen: yes (artifacts/walkthroughs/two-cells-sum-any-range/sheet.png, recorded 2026-10-16T11:19:54Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Transcript read cut at the trust-sheet appendix (ruling R1); no build notes in the brief.

1. **Where understanding first broke.** A small wobble, not a break, at step 3: with "from day 3", the readout says "23 − 4 = 19", and the highlighted cell is "to 2", not "to 3". My first thought was "days 3 to 6 should subtract the total to 3". The dashed outline on "to 2" and the reveal's sentence ("The total up to day 7 already holds days 1 and 2, so subtracting the total up to day 2 leaves the range") fix it. That off-by-one is the thing I would most likely get wrong on my own later, and the lesson does name it.

2. **What the prediction felt like.** A real choice. Five numbers (just add days 3 to 7) is what I would do; two is the surprise; seven is a decoy. The question says the running totals "are built once", which is enough for me to guess two if I am thinking; I was not, and chose 5.

3. **Whether the reveal answered the question I actually had.** Yes. My question after the sliders was "does it always take only two reads?", and the log line "Days 3–8: also 2 reads" plus "reads 1" for days 1–6 answered it before the reveal said "at most one subtraction, however long". The "Day 3 + 1" button then made the cost visible: six totals turned red and the range readout was marked "(stale!)". The reveal ties that to "that is the price". It is the clearest cost-shown-not-told move in this batch.

Notes (do not block a first-time learner):
- The hook says "running totals ready", but the stage makes me build them. Minor mismatch; the building is useful (it shows "7 additions").
- The sliders never land on exactly days 3–7 unless I set them; the 3–7 answer appears only as a log line ("Days 3–7: 25 − 4 = 21"). A learner who skips around may not see the predicted range highlighted.
- After "Day 3 + 1" the red cells still show the old numbers (8, 9, 14...), which is right for "stale" but a fast reader might think they were recomputed.

Verdict reason: no finding blocks a first-time learner.

## After reading meta.json (claims and learner field; build.md not read)

- The objective (r minus l − 1, two reads, one subtraction, later totals go stale) matches what I experienced, including the off-by-one that finding 1 describes; c2 carries the explanation I relied on.
- c3 says "at most two reads and one subtraction"; the reveal says "at most one subtraction". Both consistent with what I saw ("reads 1" for days 1–6).
- c4 ("6 of 8 stale") matches the red cells.
- I did not read build.md. Verdict unchanged.
