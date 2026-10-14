*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: lh-big-pack-price
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with this lesson's unit-price mechanism.
artifact: artifacts/walkthroughs/lh-big-pack-price/transcript.md, then sheet.png; recorded 2026-10-14T00:26:03.180Z.

## 1. From the artifact

Screenshots seen: all five frames in sheet.png (predict, Test A, Test B, Large-price=7€, reveal). Findings written before reading meta.json or builder notes.

- Prediction felt answerable: €3/500g and €6/900g are sufficiently concrete to compare. I would lean toward A because twice the price buys less than twice the mass. The title already points toward the larger pack losing, so the commitment carries little surprise.
- Understanding first broke at the explore instruction, "then change the quantity": the only adjustable control is Large-price, measured in euros. The pack quantities remain 500g and 900g. I can operate it, but the instruction misnames the thing I changed.
- The two Test controls expose 3÷0.5 and 6÷0.9 alongside €/kg. The grams-to-kilograms conversion is implicit, but basic arithmetic and the persistent 500g/900g labels let me trace the denominators. The receipt pictures give no additional comparison evidence beyond the expressions.
- The reveal answers the original comparison and distinguishes the prediction's €6 from the stage's €7. It explains the observed 6 and 7.778 €/kg rather than pretending the changed price was the original question. The useful unit-price idea is visible in the expressions.
- Specific objection: the quantity/price mismatch interrupts the intended manipulation. No fatal flaw observed on this recorded path. This is a learner-experience finding, not factual approval or a QA attestation.

## 2. After reading the brief

- The declared objective is to normalize different pack masses to cost per kilogram. The visible expressions and the final explanation address that objective; the household/arithmetic boundary is compatible with the brief's basic-division boundary.
- The misconception is that the largest pack always has the lowest unit price. The recorded counterexample addresses it, although the title gives away the direction of the answer. The recall varies price rather than pack mass, consistent with the actual slider and inconsistent with the explore instruction's "quantity" wording.
- Status remains review. This record does not verify any claim, provide human-learning evidence, or attest to browser/accessibility gates.

Verdict: revise

## 3. Fresh artifact recheck — resource fix

artifact recorded: 2026-10-14T00:46:59.390Z; build fc2b349 containing resource fix 52c3126.
Screenshots seen: all five fresh sheet.png frames, after the fresh transcript. New findings written before reopening meta.json.

- The explore instruction now says "move the labelled slider". This resolves the historical quantity/price mismatch: the Large-price label and euro value accurately identify the manipulated input.
- Prediction, displayed expressions and state-aware reveal remain traceable for the household/arithmetic boundary. The newly printed full scale is explicit; the receipt icon still mainly serves as a case cue rather than a detailed unit-price representation.
- No sustained understanding break or fatal flaw observed on this fresh path. The historical revise finding remains above as evidence of the prior version; its specific instruction objection is resolved in the actual new render.

### After reading the fresh brief

- Objective and idea-based arithmetic recall remain aligned with the observed expressions. Status stays review; no claims, human evidence or QA/accessibility gates are attested here.

Latest verdict: launch
