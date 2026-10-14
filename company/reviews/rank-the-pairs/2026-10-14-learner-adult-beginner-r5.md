*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): rank-the-pairs
lesson version: v2
boundary: adult beginner (knows a spam filter scores emails and a cutoff decides; never heard of AUC or ROC).
Screenshots seen: yes (artifacts/walkthroughs/rank-the-pairs/sheet.png, all 4 frames)
Verdict: launch

## 1. From the artifact (written before reading the earlier review)

- Predict: the stem gives both score lists and defines the quantity ("the chance the spam scores higher, a tie counts half"). The options 64 / 75 / 86 / 94% are close together, and none can be ruled out by a glance, so the learner has to guess from a feeling for the overlap. It is still closer to "compute" than "intuit", but a beginner can make a real guess. The locked stage is an empty 5 x 5 grid with both axes labelled; nothing leaks.
- Explore: "Check next spam row" fills the 0.9 row with five ticks and the counters (PAIRS CHECKED 5 of 25, SPAM HIGHER 5) update. "Check all pairs" then fills the rest: the red crosses at 0.5 vs 0.6 and 0.3 vs 0.6/0.4 and the grey "½" for the 0.3 vs 0.3 tie are clear, and 21.5 is visibly made of them. The learner sees the answer being counted, not stated.
- Reveal: 21.5 of 25 = 86% matches the counters on stage. The reveal names the three non-wins, which are the three coloured cells the learner can see. The grid stays full size and readable in the reveal frame.
- Threshold-free point: the stage never uses a cutoff, and the reveal says the count "needs no cutoff". The learner can see that no threshold was ever chosen, so the hook's question is answered by the artifact, even though no cutoff is drawn for contrast.
- Weak spots: "the area under the ROC curve" is a name with no picture; a beginner gets "AUC = share of correctly ordered pairs" but nothing about a curve or an area. "Check all pairs" lets the learner skip 20 of the 25 comparisons. The trust link reads "2/3 claims checked", so one learner-facing claim is not yet verified (a fact-checker gate, not a learner one).

## 2. Earlier findings (v1 review, 2026-10-13)

1. Prediction leak (50 / 86 / 100%, answer by elimination): **fixed**. The options are now 64 / 75 / 86 / 94%.
2. Cutoff warning told, never shown: **fixed by removal**. The reveal no longer claims what AUC hides at a cutoff; it only says no cutoff is needed, which the stage supports.
3. "Check all pairs" fills rows 2 to 5 at once: **not fixed**, now minor. The one-row step comes first and shows how the count works.
4. Grid shrank to an unreadable thumbnail at the reveal: **fixed**.
5. The question asks for a computation rather than a guess: **partly fixed**. The closer options make it a judgement; it is still arithmetic at heart.

## 3. New findings

- Minor: "area under the ROC curve" is an unexplained name. Either give it a gloss or say "called AUC" and stop.
- Gate note for others: 2/3 claims are checked on the trust sheet (fact-checker owns this).
- No FATAL.
