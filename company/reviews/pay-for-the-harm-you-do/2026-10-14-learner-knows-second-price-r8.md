*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): pay-for-the-harm-you-do
lesson version: v3
boundary: knows-second-price (meta.json learner: knows second-price auctions; does not know that charging each winner the value their presence costs everyone else makes honest bids best, even with several slots). Same tag as r7.
Screenshots seen: yes (artifacts/walkthroughs/pay-for-the-harm-you-do/sheet.png, 6 frames, build 5 walkthrough; 06-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

Path walked: chose "$70"; Bid $7 (honest); Bid $3; Bid $10; slider to $8; opened reveal.

- **No answer before the commit: pass.** "$70" / "$35" / "$60", all whole dollars. Locked stage: empty value bars and keep chart, "$7 honest" under the axis, "?" readouts. The title and stem name the rule ("pay the harm"), not the amount.
- **Show the why: pass, the strongest in this batch.** The dashed gap between "Y $60" and "Y $30" with "harm = X pays $35", the Without/With sums line, and the keep chart (flat $35 for bids 6-10, $30 for 1-5) show both halves of the idea.
- **Reveal quotes what you saw: pass in content.** "At the honest $7, the line under the bars read ..." is accurate, and that line is on screen at the reveal (the bid is $8, same sums).
- **The reveal fits with its picture: fail (revise).** In 06-reveal the stage top is cropped: the model chip and both "Y and Z's value" bars with the dashed harm gap are above the screen. The keep chart is a sliver of about 115x45 px with 3 px tick labels. The reveal says "That gap, $35, is X's price", and the gap is the part that is off screen. The sums line lets a careful reader do the subtraction, so the number survives; the picture does not.
- **Text budget: fail.** About 122 words, the longest in this batch. "By the same rule Y pays $5 and Z $0", the VCG name and the model caveat are told.

## 2. Earlier findings (r7, v2, verdict launch)

r7 had no blocking finding. The v3 change (fact-check W-236: "At the honest $7 ... That gap") is in and reads correctly. What blocks now is the phone-fit rule decided after r7 (company/decisions/2026-10-14-reveal-fits-with-its-picture.md) and the 90-word budget.

## 3. New findings

1. **Revise (top):** at 390x844 the open reveal crops the stage top, so the dashed harm gap that the reveal calls "That gap" is off screen; the reveal is about 122 words. Bring it to 90 or less (candidates: the Y/Z payments sentence and the VCG naming; the model caveat can move onto the stage chip, which already says most of it; cm-economics decides) and get stage-top crop 0 with the harm bars on screen. Record measured px in Pre-flight item 7.
2. Kit (W-287): keep-chart tick labels about 3 px at the reveal.
- No FATAL.

## 4. After reading build.md

Pre-flight v2 item 5 says the bracket "harm = X pays $35" is on stage at the reveal. It is in the DOM, but at 390x844 it is above the screen. No item 7. Findings unchanged.
