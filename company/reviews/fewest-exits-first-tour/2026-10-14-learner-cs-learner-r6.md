*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r6 wave): fewest-exits-first-tour
lesson version: v2
boundary: learner who has done the earlier CS lessons: knows backtracking prunes a search (four-queens-pruning) and that a greedy rule can fail (coin-greedy-trap); knows how a knight moves; has never seen Warnsdorff's rule or a knight's tour.
Screenshots seen: yes (artifacts/walkthroughs/fewest-exits-first-tour/sheet.png, 5 frames, plus 02-step-1.png at full size)
Verdict: launch

## 1. From the artifact

- Predict: corner start on 5×5, Rule A (first legal move in a fixed order) against Rule B (fewest onward moves). Options: A 25 / B 25, A 21 / B 25, A 25 / B 21. Having just learned that greedy rules fail, I am pulled towards "A 25 and B 21" or "both 25". That is a real choice. The locked stage shows both boards with the knight in the corner, two candidate squares (badges "5") and "?" in the results table. Nothing leaks.
- Explore, one Move (frame 02): this is the best frame in the lesson. Both knights sit on the same square, and the candidate squares carry onward-move badges 3, 3, 3, 1. A's next pick (bold outline) is a "3". B's is the bottom-left corner, the "1". I can see the rules part at the square nobody else can reach.
- Move until stuck (frame 03): A stops at 21 with a red ring and four hatched squares, including the bottom-left corner. B fills all 25, and its corner reads "3" (visited third). The table fills in 21 / 25. Board 8×8 then gives 36 / 64.
- Reveal: "It left the bottom-left corner for last, and by then no move reached it" matches the hatched corner I saw. "Awkward squares were used while they could still be reached" matches the "1" badge pick in frame 02. Every number quoted (21, 25, 36, 64) was on stage.
- Where I could slip:
  - The gate is "both knights ended on 5×5", so a learner can press "Move until stuck" first and never see frame 02, the one frame where the rules part. They still see the end state (hatched corner in A, "3" in B's corner), which carries the idea but not the moment of choice. The reveal could point at "B's corner: visited 3rd" so that a learner who skipped still connects it.
  - The fixed-order rose (1–8 around a tiny knight) is too small to read on a phone. Rule A's "fixed order" is therefore taken on trust. It is not needed for the idea.
  - At 8×8 the two boards' numbers are very small. The table row (36 / 64) carries the point, so this is minor.
  - Two boards side by side is two places to watch, but the comparison is the lesson and both boards move together. I did not lose track.
  - "Rule of thumb, not a guarantee: it can fail on some boards and starts" is told. Nothing on stage shows B failing. It is one sentence of context.

## 2. Earlier findings

There is no earlier learner review. The boundary is taken from meta.json's learner field.

## 3. After reading the brief

- doesNotKnow ("a one-line greedy rule often completes a tour that naive move order cannot") is shown: 21 vs 25 and 36 vs 64 on stage. The objective's cause ("uses up hard-to-reach squares while they are still reachable") is stood for by the onward-move badges and the hatched corner, and the reveal points at the corner. Show-the-why rule: met. The objective's "heuristic, not a guarantee" is told only. It is a caveat, not the brief's cause, but a stage case where B fails would make it shown rather than told.
- The trust sheet reads 0/5 claims checked (DRAFT). That is a fact-checker gate before publish, not a learner finding.
- No FATAL.
