# Learner review (final): Does a good product always find users? (boundary: no-network-effects)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Seen: walkthrough at c9e4df0d (phone), sheet.png (all 9 frames). **The transcript's reveal text is stale**: it says "Right of it the curve is above the line and the share grows" with no mention of falling back to 80%. I read the current reveal in Demo.tsx (after the one-line fix): "Between it and 80% the curve is above the line and the share grows. Above 80% it dips below again, so the share falls back to 80%." My judgement is on the current text. Fallback branch also read: if 19% and 21% were not both run, the reveal says only "A start below 20% dies out; one above it climbs to 80%." (the gate makes that unreachable).

Boundary: knows a product is worth buying if value exceeds price; has never met network effects or a tipping point.

## Findings (artifact first)

**Idea the learner lacks:** when value grows with the number of users, a launch below a threshold shrinks to nothing and one just above takes off.

1. **Answer visible before predicting?** Title "Does a good product always find users?" is still a rhetorical "no". Options are now of similar length (correct one second, no longer the longest); option 2 still reuses the 18/25 numbers and is the only option that splits the two launches along the line the title implies. Residual tell, smaller than before.
2. **Locked stage** is a clipped thin strip with "The chart appears after you answer". Honest and no leak.
3. **Predict question** is about 75 words in one paragraph, but now plain (people differ, value rises with users, everyone above $0.16 joins). Readable.
4. **Where understanding first broke:** frame 02 "Round 2: 18 -> 11 -> 0% Dies out." The chart now carries labels (dashed "same share next round", ringed "20%: round changes nothing", red "shrinks", green "shaded: grows"), so I can point at the crossing and at the shrinking region. "next" and "now" on the axes are still tiny; the staircase reads once I have seen 19 die and 21 take off (frames 03, 04). The knife-edge (19 vs 21: 2 rounds to nothing vs 8 to 80%) is the best part.
5. **Told vs shown (decision 2026-10-14):** the objective asks the learner to explain that a launch below critical mass shrinks. The stage holds a labelled "shrinks" region and the reveal points at it. The reason the curve dips there ("with few users the product is worth less than its price to most people, so even fewer join") is one told sentence; nothing on stage stands for "people differ" or for who drops out. Whether a labelled region counts as the stand-in for that "why" is the head-of-product's reading; I read it as met for "shrinks", not for "why".
6. **80% and not 100%** is told in one claimed sentence (people who want it least would not pay $0.16), not shown; step 3 settles at 80 and I wondered. It is context outside the brief's gap, so allowed.
7. **Reveal quotes reached states:** 19% and 21% runs, required by the gate. Matches frames 03 and 04.
8. **Dead steps:** slider to 27, Step, To the end add little; Step is the only view of the mechanism round by round and the gate does not require it.
9. **Reveal density:** four paragraphs, about 160 words, with chart vocabulary (curve, dashed line, ringed crossing, shaded). Longer than the others; on a phone the stage scrolls away (known kit issue).
10. Trust line in the artifact reads 9/11 claims checked while meta lists all claims verified; the walkthrough predates the last re-check (not investigated; fact-checker's gate).

## Earlier findings (r2) checked

Chart not explained: **fixed** (labels, ring, shading). Option tell: partly (see 1). Reveal quotes reached states: fixed. Tipping point found not told: fixed. Mechanism: still one told sentence. 80% unexplained: **fixed by a told sentence**. Reveal now points at marks: fixed. Reveal "above the line" text: fixed in current source (stale in transcript).

## Verdict for the current version: **launch with notes**

Top remaining finding: the cause of the shrink ("worth less than the price to most people") is one told sentence with no stage stand-in for who drops out; the labelled "shrinks" region shows that it shrinks, not why. Screenshots seen. Block-level for head-of-product if they read the told-vs-shown decision as requiring the "why" itself; otherwise notes only.
