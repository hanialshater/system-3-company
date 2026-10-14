*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): shade-your-sealed-bid
lesson version: v1
boundary: knows that in a second-price auction you bid your value, and that expected value is a payoff times its chance (meta.json learner field); has never thought about a first-price (pay-your-bid) auction.
Screenshots seen: yes (artifacts/walkthroughs/shade-your-sealed-bid/sheet.png, 6 frames; integrated build 3 at localhost:3470)
Verdict: launch

## 1. From the artifact (written before reading the brief)

- Predict: "Worth $80 to you; winners pay their bid. Your rival's value is anywhere $0–100, and they bid half of it. Best bid?" with $80 / $60 / $40. The locked stage shows an empty expected-profit chart with a single dot at $80 → $0, and readouts WIN CHANCE 100%, KEEP $0, EXPECTED $0.
- Leak (minor to moderate): the title "Bid what it's worth? Not here." and the hook "bidding your full value earns nothing" both rule out $80 before I predict. The locked stage repeats it ($0 at $80). The trap the lesson exists for (bid your value) is closed off by its own title, so the real choice is $60 vs $40. A second, accidental cue: the stem says the rival bids "half", and $40 is half of $80. A learner can get it right by pattern-matching "half" rather than trading off.
- Explore: preset bids $80 / $60 / $50 / $40 and a slider. $60 gives 100% × $20 = $20. $50 gives 100% × $30 = $30. $40 gives 80% × $40 = $32, and the dashed curve appears with its peak at $40. The slider to $42 gives 84% × $38 = $31.92, just below the peak. The two forces are both on stage: KEEP IF YOU WIN rises as I shade, and WIN CHANCE starts falling below $50. The chart shows their product peaking. The reveal unlocks after reaching $40.
- Arithmetic checks: rival bids are uniform on $0–50, so P(win) = b/50 for b ≤ 50, and EV = (80 − b) × b / 50, which is highest at $40 with $32. $42 → 0.84 × 38 = 31.92. Correct.
- Reveal: it quotes the states I saw ($0 at $80, $30 at $50, $40 → 80% × $40 = $32) and names the trade ("each dollar shaved costs 2 points of win chance"). The 2 points per dollar is shown only by 80% at $40 vs 84% at $42 on the QA path (and 100% at $50), so a learner can check it from the readouts. The equilibrium sentence is one told context line.
- Show the why you promised: the cause (keep more vs win less often) is the two readouts plus the curve. Pass.
- Minor: in the reveal frame the top of the chart, including the $32 peak label, scrolls off; the readouts below still show the $42 slider state, not $40.
- Minor: the curve between $50 and $80 is drawn dashed as a straight line, which is correct (win chance 100%), but no mark shows where the kink at $50 is. The reveal's "Below $50" relies on the readout alone.
- Routed, not mine: 0/5 claims checked, DRAFT (fact-checker).
- No FATAL.

## 2. After reading the brief (meta.json learner, objective, misconception only)

No earlier learner review exists (only a fact-check; build.md not read).

- doesNotKnow "when you pay your own bid, the best bid is well below your value": shown by the curve and readouts.
- Objective "a lower bid keeps more per win but wins less often": both halves are separate readouts that move in opposite directions. Pass.
- Misconception "bid what the item is worth": the title and hook pre-empt it. A learner from second-price auctions who would have said $80 is talked out of it before predicting, so the misconception is never held at commit time. The stage still shows $80 → $0, so it is refuted, just not caught.

## 3. Findings

1. Moderate (not blocking): the title "Not here." and the hook rule out $80 before the prediction, and "$40 = half" invites a pattern-match. A neutral title ("How much should you bid?") would let the second-price habit show up in the guess.
2. Minor: reveal frame crops the chart peak, and the readouts show $42, not $40.
3. Minor: no mark at the $50 kink where win chance starts to fall.
4. Routed: 0/5 claims checked.
