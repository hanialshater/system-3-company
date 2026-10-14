*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r6 wave): patience-wins-the-split
lesson version: v1
boundary: NCM course learner; knows backward induction in a one-shot ultimatum (the proposer keeps almost everything) and that money later is worth less; has never seen alternating offers or Rubinstein's 1/(1 + δ).
Screenshots seen: yes (artifacts/walkthroughs/patience-wins-the-split/sheet.png, 8 frames)
Verdict: revise

## 1. From the artifact

- Predict: "alternate offers on $1; each rejected round shrinks it 10%. With no end date, what does the first proposer get?" Options about 90% / about 53% / exactly 50%. These are good: 90% is the ultimatum lesson carried over, and 50% is "no deadline means fairness". The locked stage is an empty chart with "Shrink 10%" pre-selected. Nothing leaks.
- Explore, as the path went:
  - Shrink 30% puts a dashed "no end date: 58.8%" line on the chart and shows one bar at 100%.
  - Shrink 50% moves the line to 66.7%.
  - +1 round gives "First round: offer 0.5 × 100.0% = 50.0%; keep 50.0%".
  - +10 rounds shows a zigzag that settles onto the 66.7% line.
  - 400 rounds stays at 66.7%.
  - The reveal unlocked here. **I never ran a single round at the 10% shrink the question asked about.**
- The "First round: offer 0.5 × 66.7% = 33.3%" line is the best thing on the stage. It shows the responder's power as "what I would get proposing next round, shrunk". The bars zigzag down from 100% (1 round) and settle, so stepping back from a deadline is visible.
- Reveal:
  - "With one round the proposer took 100%" was seen.
  - "Worth 90% of a proposer's share, so the proposer must offer that much" describes the 10% case, which I never ran. The stage line I saw said "0.5 ×".
  - "Long games settle at 1 ÷ (1 + 0.9) = 52.6%; **400 rounds gave 52.6%**" contradicts my run: 400 rounds gave **66.7%** on my stage. The answer to the question I predicted on is told, and it is phrased as if I had seen it (W-150).
  - "At 50% shrink it was 66.7%" was seen.
- Minor findings:
  - The dashed "no end date" line appears as soon as a shrink is chosen, before any rounds are added. At the question's 10% shrink, a learner gets the answer from the line without stepping back.
  - The bar chart caption "First proposer's share for games of 1 to N rounds" is clear, but which bar is "this" game (dark) and which are history (light) is not labelled.

## 2. Earlier findings

There is no earlier learner review. The boundary is taken from meta.json's learner field.

## 3. After reading the brief

- The objective's core number is "with a 10% shrink the first proposer keeps 1/(1 + 0.9) ≈ 52.6%". The gate (a long game at any shrink, plus a visit to 50% shrink) lets a learner finish without ever seeing it, and the controls in DOM order (shrink buttons first) lead them away from 10%. **Top finding: the question's own case is not on the required path, and the reveal claims the learner saw it.**
- The cause (the responder's power is the value of proposing next round) is stood for by the "offer δ × next share" line, and the shrinking zigzag shows stepping back. Show-the-why: met *for the case the learner ran*. The reveal needs to point at that line using the learner's own shrink, or the gate must include a long game at 10%.
- Trust sheet 0/5 checked (DRAFT): fact-checker gate.
- No FATAL (the numbers shown are correct for the shrink shown).
