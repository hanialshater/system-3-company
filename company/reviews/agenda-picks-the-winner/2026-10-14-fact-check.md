# Fact-check: agenda-picks-the-winner, 2026-10-14

## Pass NCM-1

Checker: fact-checker (did not write these claims). Method: read Demo.tsx and the walkthrough transcript, then counted every pairwise vote by hand and ran all six agenda orders against the RANK table in Demo.tsx.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A beats B, B beats C, C beats A, each 2-1 | verified | A vs B: voters 1 (ABC) and 3 (CAB) prefer A, voter 2 B. B vs C: voters 1, 2 prefer B. C vs A: voters 2 (BCA), 3 prefer C. Transcript tallies: "A vs B: A 2–1", "B vs C: B 2–1", "A vs C: C 2–1". |
| c2 agendas elect C, A, B; held-back option wins | verified | A vs B -> A, then A vs C -> C. B vs C -> B, then B vs A -> A. A vs C -> C, then C vs B -> B. Over all six orders each option wins twice, always the one held to the last vote. Predict answer is C (computed from `run(AGENDAS[0])`), correct. |
| c3 no majority favourite; agenda setter picks the winner | verified | No Condorcet winner, since each option loses one pairwise vote (c1); with sincere voting the last-held option always wins (c2), so choosing the order chooses the winner. This is the Condorcet paradox / agenda-setting point. E&K ch. 23: search found the chapter (Cambridge "Voting", p. 645) and study notes listing "23.2 Individual Preferences"; a Cambridge-TOC snippet reported "23.3 Voting Systems: Majority Rule", but a second search could not reproduce that heading, so `section_unconfirmed` 23.3 stays. |
| c4 sincere voting assumption; no claim about real elections | verified | The reveal states "when every voter backs the option they rank higher"; no real election is named. |

Recall (Ana P>Q>R, Ben Q>R>P, Cy R>P>Q; Q vs R, then P) is the same profile relabelled (A=P, B=Q, C=R) and the agenda "B vs C, then A": Q beats R 2-1 (Ana, Ben), P beats Q 2-1 (Ana, Cy), winner P, answer index 0. Correct.

Unrecorded claims: none found.

Result: 4 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
