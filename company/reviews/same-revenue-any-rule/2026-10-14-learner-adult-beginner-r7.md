*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): same-revenue-any-rule
lesson version: v3
boundary: adult-beginner (meta.json learner field). Knows that first-price bidders shade their bids and that second-price bidders bid their true value. Does not know that with equilibrium bidding, first-price, second-price and all-pay auctions earn the seller the same on average. Same mind as r6.
Screenshots seen: yes (artifacts/walkthroughs/same-revenue-any-rule/sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact (written before reading r6)

- Predict: the options First-price / Second-price / About the same are at the same precision. The hook "Make the winner pay their own bid ... Surely the seller earns more?" pushes toward first-price. "Surely ...?" can read as a wink that the obvious answer is wrong, but it doesn't say which of the other two. I took first-price. The locked stage shows "?" everywhere, and I could not see the dashed theory line in the locked frame.
- Explore: "1 auction" gives noisy bars ($22.0 / $28.3 / $18.4), "+1,000" gives $33.3 / $32.6 / $32.5, and "All 20,000" puts all three on the dashed "theory $33.3" line. The rule buttons switch the last-auction strip: second-price A pays $18.9 (B's value), first-price A pays $45.0 (half of $90), all-pay A pays $40.5 and B pays $1.8.
- The why is now on stage. The new readouts "AVG HIGHER VALUE $66.6" and "AVG LOWER VALUE $33.4" let me see that second-price collects the lower value ($33.4) and first-price collects half the higher ($66.6 / 2 = $33.3). The reveal says exactly that and points at those readouts. All-pay ("each bids only a little") has B paying $1.8 as its stand-in, which is thinner but enough.
- Reveal: $33.4 / $33.3 / $33.3, $66.6 and $33.4 are all in the trace row "Your 20,000 run: ..." that survives Reset.
- Minor findings, not blocking:
  1. The chart is drawn tiny and unreadable whenever there is no data: in the locked frame 01, after Reset (frame 07), and the reveal stage. In frame 01 the "AUCTIONS" readout is also clipped at the bottom of the stage.
  2. After Reset, the bars and the higher/lower readouts show "?" while the reveal quotes them. The trace row carries them, but in small type.
  3. "seed 97" in the model line means nothing to this learner.
  4. Stage text is heavy (model line, chart labels, strip labels, six readout labels), well over 25 words at once.

## 2. Earlier findings (r6, on v2)

1. The reveal's why ("second-price charges a high price, first-price charges less") contradicted the auction on stage, and the cancelling was told: **fixed**. The reveal now compares averages, and the avg-higher and avg-lower readouts show them.
2. The locked chart was tiny, with a theory line hinting "the same": **partly fixed**. No theory line is visible before commit, but the chart is still tiny when empty.
3. After Reset the reveal sat under "?" bars: **partly fixed** (a trace row now carries the run).
4. The "theory $33.3" label collided with the all-pay value: **fixed** in frames 04-06 as far as I can see.

## 3. After reading the brief

- The doesNotKnow item (same average under all three rules) is shown by the converging bars. The objective's "why" (each rule changes the bids, and the changes cancel) has stand-ins for second-price and first-price, and a thinner one for all-pay.
