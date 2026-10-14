*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: apply-not-quote
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with this lesson's application-versus-definition distinction.
artifact: artifacts/walkthroughs/apply-not-quote/transcript.md, then sheet.png; recorded 2026-10-14T00:37:36.325Z; home/study build be775a7.

## 1. From the artifact

Screenshots seen: all six frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt nearly given away: the hook contrasts quoting and applying, and "what checks application?" asks me to select Order new values. I would choose it without a strong competing hypothesis.
- The first moment of uncertainty is interpreting the two unlabelled number rows. The lower row's orange outline and Swap controls let me infer that it is my attempt; the top row remains the input. No sustained understanding break after that inference.
- New values shows 5, 9, 2 while the attempted order remains 9, 2, 5. Two swaps turn the attempt into 2, 5, 9, and Check reports 3/3 with green outlines. I performed the ordering operation rather than merely observe a result.
- The reveal states the actual final order and match count, explains smallest-to-largest, and explicitly notes that the source values stayed visible. It explains the observed state. Calling these "new values" is a small overstatement: they are the same three numbers in a new input order.
- No fatal flaw observed. Minor limitations: weak prediction tension and initially implicit row roles. The manipulation and matching feedback are intelligible for the boundary; no factual or QA approval is implied.

## 2. After reading the brief

- The objective is applying a stated rule to a fresh set. The visible manipulation demonstrates applying ascending order, although New values only changes the input arrangement of the same 2, 5, 9 values.
- The recall repeats the prediction verbatim: "What checks application of ascending order?" with Order new values/Quote the definition. It asks for the wording choice again rather than a fresh ordering task, leaving the objective untested at recall.
- Artifact-only experience raised no blocking manipulation objection. The brief comparison adds the fresh-set and recall limitations. Status remains review; no claims, human-evidence status, QA or accessibility gate changes.

Verdict: revise

## 3. Revised lesson artifact recheck — 64b7b1e

artifact recorded: 2026-10-14T00:54:03.138Z. Screenshots seen: all six fresh sheet.png frames after the fresh transcript; findings appended before reading the revised brief or recall account.

- The prediction now asks whether containing all numbers makes any arrangement ascending, a meaningful distinction from their smallest-to-largest order. Try values replaces New values, accurately naming the reused visible set rather than promising different numbers.
- The same two swaps produce 2→5→9 and Check gives 3/3. The actual rule application remains intelligible; no sustained understanding break or fatal flaw observed.
- The reveal still says "new values" even though the stage reused 2,5,9; that remains a small wording limitation. The top/input and bottom/attempt row roles are still inferred from controls and outlines.
- The historical repeated-phrasing recall objection awaits actual revised recall-screen review.

### Actual phone recall artifact

Read phone-recall.md recorded 2026-10-14T00:58:16.771Z, then actually saw phone-recall-question.png and phone-recall-answer.png. Build 64b7b1e; seeded completion history and scripted correct selection, not human retention evidence.

- The rendered prompt uses genuinely different values 7,1,4 and asks for an ascending result. All options contain those numbers, so choosing 1→4→7 requires their order rather than the phrase "Order new values". Feedback explains the two increasing comparisons.
- This resolves the historical wording-only recall objection and supplies the fresh-set transfer absent from the lesson's reused-number stage. The reveal's "new values" phrasing remains a small lesson-path limitation, not a blocking recall mismatch.

### After reading the revised brief

- The objective now accurately says apply to visible values. The actual fresh-number recall exercises the rule without repeating prediction wording. The remaining reveal wording and implicit row roles are nonblocking.
- Status remains review. This is a simulated learner-experience recommendation; it verifies no claims and provides no human-learning, browser-QA or accessibility attestation. Actual recall renders were seen, but the seeded/scripted flow is not observed retention.

Latest verdict: launch
