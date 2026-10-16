# Fact-check: the 13 NCM lessons in review, a staleness re-check (2026-10-16, lane B)

- Checker: fact-checker, lane B of the F-46 closeout (W-1483). Worktree base cdee168c.
- Scope: the meta.json files that cite easley-kleinberg-2010 and are in review:
  - cut-the-busiest-link, selfish-routes-cost-a-third-more
  - only-the-needed-trader-profits, outside-option-sets-the-split, patience-wins-the-split, pay-for-the-harm-you-do, penalty-kick-mix, who-pays-same-filter
  - agenda-picks-the-winner, bridge-carries-news-not-habits, cluster-stops-the-cascade, enemies-allow-three-camps
  - weak-links-hold-it-together
- Starting fact: at this base, **none of the 13 has an unverified or disputed claim**. 72 claims are verified; withdrawn ones (outside-option c3, pay-for-the-harm c2) are not on the card. All 13 are listed under "Ready to publish" in the company status. The dispatch premise (open claims here) did not hold at cdee168c.
- So I asked a different question: did any lesson change after its claims were checked (mostly 10-14), so that the stage now makes a claim nobody checked? Several were revised later: selfish-routes v6 (W-564), cluster-stops v5 (W-573), agenda v3 (W-577), penalty-kick-mix and who-pays (W-513). The history is shallow (graft at bc747077), so I could not diff versions. Instead I read each Demo.tsx (predict, reveal, stage lines, alt strings where numeric) and the meta.json recall against the claims.
- Result: **no status changes. The verified claims still match what the learner sees in all 13.** No unrecorded claims found.

## What I re-derived (own arithmetic, not the builders' scripts)

| Lesson | Checked |
|---|---|
| selfish-routes | avg(x) = (1-x)60 + 60x², min 45 at 50%, 60/45 = 4/3. joinCost(50): 5 × 27 = 135 saved, 50 × 3 = 150 lost. v6 reveal: "4/3 of the best, a third more: the worst case for roads with a fixed time plus a part proportional to traffic" = c4 + c6 (Roughgarden and Tardos 2002, affine latencies). Recall "why" matches c4. |
| cluster-stops | Ran both cascades by hand from the EDGES list (14 links). Seeds 0,1: one per round, 2..7, stop at 8 of 12 in round 6; 8 then has 1 of 4. Seeds 8,9: round 1 adds 7, 10, 11, then 6..0, all 12 by round 8. v5 reveal and recall match c2-c7 and c9. |
| penalty-kick-mix | Kicker p* = 0.4/(x-0.1): 50% at 0.90, 44.4% at 1.00. Keeper q* = (x-0.5)/(x-0.1): 50%, 55.6%. Value 0.700 to 0.722. Keeping 50% at 1.00: left dive 0.700, right dive 0.750. Reveal matches c1-c3, c6, c7. |
| who-pays | OFFERS 50/200/350, and a deal needs both sides to gain strictly, so only $200 can strike. The reveal's hard-coded "your $200 offer" therefore always holds. Totals -$100 both ways. |
| patience | 1/(1+0.9) = 52.6%, 1/1.5 = 66.7%, 1/1.7 = 58.8%. |
| outside-option | 0.40 + 0.60/2 = 0.70. A change of d cents in the option moves A by d/2 cents (c6). |
| pay-for-the-harm | Without X: 60 + 5 = 65. X on top: Y 30. Pay 35; X keeps 70-35 = 35 at bids 6-10 (ties to X). At bids 1-5, X takes second: pays 65-60 = 5 and keeps 35-5 = 30. |
| agenda | Cycle A>B, B>C, C>A, each 2-1. Each of the three agendas elects the option held back. |
| enemies | 3+2+1 camps: 1 all-friend + 13 one-friend-link + 6 all-enemy = 20; 0 banned. |
| bridge | Ben 1 of 5 = 20%. News reaches all 10 in 3 rounds. |
| cut-the-busiest-link, only-the-needed, weak-links | Reveal sentences are computed from the stage or match c1-c5 word for word; nothing new since the 10-14/10-16 checks. |

## Not done

- No walkthrough transcripts exist under artifacts/walkthroughs in this worktree, and I started no server. This was a source read of the rendered text paths, not of a rendered page.
