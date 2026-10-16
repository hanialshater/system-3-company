*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: price-tag-or-auction
lesson version: v2
boundary: same as r1 (company/reviews/price-tag-or-auction/2026-10-16-learner-knows-second-price.md): knows second-price auctions (highest bidder wins, pays the second bid); does not know that a seller who knows only the value range earns more from the best fixed price with one or two bidders, but from an auction from three. Phone viewport (Pixel 7), first-time learner, chose "2".
Screenshots seen: yes (artifacts/walkthroughs/price-tag-or-auction/sheet.png, recorded 2026-10-16T23:15Z, built from e092f6c3 with NEXT_DIST_DIR=.next-le-ncm-r2, port 3711; plus a playwright probe of the reveal gate on the same build, port 3712, scratchpad, not committed)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Does r1 still hold?** Its main point is fixed. The row under the x-axis now starts "tag price:" ($50.00, $57.74, $63.00, $66.87) in dark grey, not in the revenue line's green, so I read it as the price set and the green numbers above as what that price earned. The question now reads "What is the fewest bidders for which a second-price auction beats the best price tag on average?": "fewest" and "on average" make clear what "2" is an answer to. The reveal now says "An auction with no reserve lets the second-highest bidder set the price", restating the second-price rule where the reason is given.
2. **Where understanding now first breaks.** Nowhere that blocks. Still from r1: at 3 bidders the "$50.00" and "$47.25" labels sit close at the crossing (the caption "3 bidders: tag earns $47.25 · auction $50.00" carries it), and the lesson never says why the best tag rises with bidders; I did not need that for the point. "No reserve" still appears only in the reveal.
3. **What the prediction felt like.** Real, as in r1: 2, 3 and 5 are all plausible; the 1-bidder state (tag $25.00, auction $0.00) is visible before committing and does not give away the crossing.
4. **Did the reveal answer my question?** Yes ("why does the tag still win at 2?"): the tag is a guess made knowing only the range; the auction's price is the second-highest value, which improves with each rival.
5. **The reveal gate (QA observation: locked until every milestone is hit, with only "Try it first" as a hint).** Probed: tapping "2 bidders", "4 bidders" and "Simulate 1,000 sales" (skipping 3) leaves "Try it first". Skipping 3 also skips drawing the 3-bidder point (the lines jump from 2 to 4), so the gate holds the reveal until I have seen the count that answers the question; the gate is doing its job. The hint is weak ("Try it first" after three taps reads as "you did nothing"), but the panel says "Add bidders one count at a time", and "3 bidders" is the one untouched button, in the middle of the row. Not blocking.

Verdict reason: the comparison, the crossing at 3 and its reason reach a learner with this boundary; the r1 label finding is fixed.

## After reading build.md / meta.json
- Intent matches experience: the objective (best tag wins with 1 or 2 bidders, the auction from 3, because the second-highest bid rises with each rival while a tag is a guess) is what the stage and reveal showed; my "2" carried the misconception ("an auction always earns more" in its softer form, "it wins as soon as there is competition"). meta.json version is 2, matching my stamp.
- build.md (fix round W-1572, v2) names milestones "two" and "three"; my probe that skipping 3 keeps the reveal locked matches. The gate guards exactly the question's case (finding 5).
