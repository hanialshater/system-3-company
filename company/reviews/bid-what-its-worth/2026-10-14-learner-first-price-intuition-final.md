# Learner review (final): What should you bid for a $70 painting? (boundary: first-price intuition)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Seen: walkthrough at c9e4df0d (phone), sheet.png, 01-predict.png and 07-reveal.png at full size; Demo.tsx reveal and milestone gating read (reveal is one text for any choice; gate is rival $60 and rival $75 taps). Boundary: has bid in an ordinary auction (you pay what you bid) and wants to pay less than the item is worth to them.

## Findings (artifact first)

**Idea the learner lacks:** when the price is someone else's bid, your bid only decides whether you win.

1. **Answer visible before predicting?** Mildly. Title says "$70 painting" and the last option is "$70"; common sense says "bid what it is worth". The hook gives the rule (winner pays the runner-up), so it does not give the answer. Mild.
2. **Locked stage looks broken (01-predict.png).** Tiny chart, and the label "Pick a rival bid" overprints "$50" and "$70" in the column labels; the "?" bars are barely visible. A first look reads as a rendering fault. The slider "Your bid $30" is also a second, different "my bid" while I am about to choose among $50/$90/$70.
3. **Where understanding broke / worked:** Rival $40: $50, $70, $90 all win and all pay $40, +$30 each; my pick $50 looks as good as $70, which is true and a good moment. Rival $60: $50 loses, $70 +$10. Rival $75: $90 wins at -$5 (red bar). Rival $90: everything $0, loses (the tie rule appears here by accident). The "pays $X" under each column makes "the price is the rival's bid, not yours" visible. This is the cause the brief names, shown.
4. **"Whatever the others bid"** is still four taps plus an 8 px-key line chart (solid $70, dashed my bid, no axis labels) that only moves when the slider moves. The gate is met by tapping $60 and $75 alone, so a learner can reach the reveal without ever touching the sweep; the reveal does not point at it. "Never worse than any other bid" is therefore shown against four rivals and told for all.
5. **Reveal and its stage:** quotes the $60 and $75 states, both required by the gate, so they are reached. But the stage pinned beside the reveal is the last state I left it in ($40 bid vs rival $90, all $0), not the $60 or $75 bars the text quotes (07-reveal.png). The reader reads "kept $10", "lost $5" next to a chart of zeros. (Stage top cropping on phone is the known kit issue; I note the pinned state separately.)
6. **"bidding above $70 only adds wins that lose or break even":** the loses case is on stage ($75 rival); "break even" (rival exactly $70, tie goes to rival, so a $90 bid pays $70) is told only.
7. **Last line** "It is why this format invites honest bids." has an ambiguous "It" and the "honest bids" payoff (what a real bidder does) is a step beyond anything on stage.
8. My own pick ($50) is never "my bid" on stage, only a fixed column; the lesson still works because every bid column is read.

## Earlier findings (r2 and r1) checked

Title/option giveaway: residual, mild (unchanged). Single rival / pays only for slider: fixed. Reveal reached states: fine. Sweep chart weak and ungated: **unchanged**. Ambiguous "It": **unchanged**. Tie rule seen only by accident: unchanged. Locked-stage overprint: **still present** (flagged as new in r2, not fixed). Wrong-branch reveal: one text for every pick; it covers shading ($50) and inflating ($90), fine.

## Verdict for the current version: **launch with notes**

Top remaining finding: the locked predict stage looks like a rendering fault (label overprints column labels), and the sweep chart that is the only picture of "whatever the others bid" is ungated and unpointed-at. Screenshots seen.
