# Build note: birthday-paradox

(No v1 build note was written. This file starts at the revision.)

## v2 (revision)

Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key states: at least 20 rooms of 23 drawn (`rooms-of-23`), plus one change of room size (`changed-size`). `minInteractions = 2`.

| Finding | What I did |
|---|---|
| Learner 1 / fact-check F1: the tally was for 29 people, the headline for 23 | Tallies are now kept per room size. The reveal quotes only the rooms of 23 ("You drew 21 rooms of 23; 10 had a shared birthday"), and the gate needs 20 or more of them. The readout label names the size it counts ("Rooms of 25 with a match"). |
| 2: the reveal said 253 pairs while the ring showed 406 | In the reveal phase the ring goes back to 23 people (253 lines), and the slider is disabled. The note reads "Back to 23 people: every line is one of the 253 pairs." The pair count and the 50.7% are computed from constants (`Q_PAIRS`, `Q_CHANCE`). |
| 3: the locked stage showed a match before the prediction | While locked, the dots are not coloured as shared, there is no halo, and the text reads "Shared birthday?". |
| 4: the tally showed "1/1 (100%)" and small samples looked like they contradicted the exact figure | No percentage is shown below 20 rooms ("3 of 4"). The stage note says "One room proves little", and the reveal says "A few dozen rooms wobble around it." |
| 5: nothing bridges 253 pairs to about 50% | Added to the reveal: "Each pair matches only 1 time in 365, yet the chance that all 253 miss is only about 50%." New claim c12 (an approximation, (364/365)^253 = 0.4995; marked as such in its source). |
| 6: dots cluster in arcs, which may read as "not random" | Rejected. Clustering is what uniform randomness looks like, and the dots are seeded uniform draws. Explaining it would cost stage words that the gate message needs. Worth checking with real learners in EXP-002. |
| 7: the hint "Draw some rooms of 23" goes stale after sliding | The hint is now an instruction that stays true ("Draw 20 rooms of 23 ..."). The stage note tells a learner who left 23 to go "Back to 23 people to test the question." |
| Fact-check F2: c9 ("more than most people guess") and c11 ("The trap is ...") are claims about people with no source | Both sentences removed. The reveal now says "Compare a different question: does anyone share my birthday? Only about 6%", which rests on c4. c9 and c11 are marked `withdrawn` with the reason. |
| Fact-check F3: check the Feller section | Not mine to do (fact-checker). The source is left as it is. |

Claims: c9 and c11 withdrawn. c10 reworded to "Each new person makes a pair with everyone already there" (unverified). c12 added (unverified).

QA-path trade-off: "New room" and "20 rooms" now come *before* the slider in the DOM. The contract therefore draws 21 rooms at 23, then slides to 25, and both milestones are met. A learner who slides first has to slide back to 23 to unlock the reveal. The stage says so.
