*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: lh-scale-recipe-portions
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with this lesson's constant-per-portion mechanism.
artifact: artifacts/walkthroughs/lh-scale-recipe-portions/transcript.md, then sheet.png; recorded 2026-10-14T00:27:44.550Z.

## 1. From the artifact

Screenshots seen: all five frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt easy: "which quantity preserves grams per portion?" with Scaled/Unchanged/Both largely names the right operation. I would choose Scaled even before calculating the amount.
- No sustained understanding break on this path. The first moment requiring inference is Test A's 75×6: the 75 is not derived on the stage, but I can recover 300÷4 using the question. The reveal then explicitly names 75g per portion.
- Increasing Portions from six to eight changes the scaled result from 450g to 600g while Unchanged stays 300g. The printed expressions make that difference clear. The dot pictures show relative quantities; their twelve-dot full row is not six or eight portions, so I would rely on the labelled numbers rather than count dots.
- The reveal distinguishes the original six-portion question from the current eight-portion state and explains the mechanism that produced both. It answers the useful question, "how much per person stays the same?" The unchanged case's grams per person are left for mental arithmetic.
- No fatal flaw observed on this recorded path. Minor limitation: the prediction tests choosing the named scaling operation more than deriving the amount. This review supplies no factual or QA approval.

## 2. After reading the brief

- The objective is to scale quantity while preserving quantity per portion. The stage and reveal address it, and the brief's arithmetic boundary fits the review boundary.
- The recall instead asks for B, explicitly labelled Unchanged, at nine portions. Its correct answer remains 300g without applying the 75g-per-portion mechanism. A learner could return that answer while still failing to calculate the scaled quantity; this is an objective/recall mismatch.
- Artifact-only experience raised no blocking objection, but the later brief comparison adds the recall objection. Status remains review; no claim statuses, human-learning evidence or QA/accessibility attestations change.

Verdict: revise

## 3. Fresh artifact recheck — resource fix

artifact recorded: 2026-10-14T00:48:40.156Z; build fc2b349 containing resource fix 52c3126.
Screenshots seen: all five fresh sheet.png frames, after the fresh transcript. New findings written before reopening meta.json.

- Prediction now asks for grams and presents 450/300/600g rather than the operation labels Scaled/Unchanged/Both. It requires applying the quantity-per-portion relationship instead of recognizing a word.
- The fixed full-scale fill picture now grows from 450g to 600g while the 300g case stays constant. The 75×6/75×8 expressions and reveal still make the relationship traceable. The origin of 75 requires 300÷4 from the question, a manageable inference for this boundary.
- No sustained understanding break or fatal flaw observed on the fresh path. The historical recall objection cannot be resolved from the walkthrough alone and will be compared only after these artifact findings.

### After reading the fresh brief

- New recall asks for ten portions and requires 300÷4×10=750g, resolving the historical unchanged-B recall mismatch. Objective and actual manipulation now align with the numeric prediction and transfer recall.
- Status remains review; no cooking/quantity claims, human evidence or QA/accessibility gates are attested here.

Latest verdict: launch
