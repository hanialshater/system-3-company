*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): one-bad-label-knn
lesson version: v2
boundary: an adult with no machine-learning background; has never seen "k-nearest neighbours" or the letter k used this way.
Screenshots seen: yes (artifacts/walkthroughs/one-bad-label-knn/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: the stem now gives the rule first ("A new dot takes the majority label among its k nearest dots") and does not give the vote count. So I have to picture the five nearest dots myself. Choosing "Orange" because the closest dot is orange is a real, tempting mistake.
- Explore: k = 3, 5 and 7 each draw lines from the diamond to its voters, coloured by label, and the tiles read 2·1, 4·1 and 6·1, all blue. Then k = 13 reaches across to the right cluster and the dot turns orange even though it sits inside the blue group. Both halves of the idea are on the stage: a few neighbours outvote one bad label, and too many swamp the real boundary.
- Reveal: it uses the numbers I saw (4 blue, 1 orange) and now explains the 7 ("the six real orange dots plus the mistake").

## 2. Earlier findings (v1 review, 2026-10-14)

1. k and majority vote used before they were defined: **fixed** (the rule is in the stem).
2. The question gave away the vote count: **fixed**.
3. "6 blue · 7 orange" count puzzle: **fixed in the reveal**. The stage tile still just says 7 orange, but the reveal accounts for it.
4. Reveal thumbnail small, vote lines hard to see: **partly fixed**. At reveal the stage is cropped at the top but the lines are readable.
5. Told-not-shown trade-off line: **acceptable**, earned by the k = 1 vs k = 13 contrast.

## 3. New findings

1. Minor: "wherever it sat" rests on one "Move new dot" tap. That tap put the dot between the two clusters, where orange at k = 13 is not surprising. A second position deeper in the blue group, or a draggable dot, would make "wherever" something I saw rather than something I was told.
2. Minor: in the locked and k = 1 frames, the diamond overlaps the ringed orange dot and the two are hard to tell apart at phone size.
3. Note for the fact-checker (not a learner issue): the trust link reads "3/4 claims checked".
- No FATAL.
