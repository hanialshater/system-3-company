*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: ruler-start-not-zero
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with correcting an off-zero ruler reading.
artifact: artifacts/walkthroughs/ruler-start-not-zero/transcript.md, then sheet.png; recorded 2026-10-14T00:39:43.236Z; home/study build be775a7.

## 1. From the artifact

Screenshots seen: all four frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt given away by the title "Subtract the starting mark", but the orange object's start at three centimetres provides a concrete reason to choose Subtract start.
- No sustained arithmetic understanding break. Switching method produces fifteen centimetres for an endpoint of eighteen, and moving Endpoint to twenty lengthens the object and changes the answer to seventeen. The stage's Start=3cm labels let me reconstruct the subtraction.
- The first visual ambiguity is the green line below the object: it extends from ruler zero to the endpoint rather than matching the object's orange start at three. Its meaning is not labelled. I can resolve the actual object length from the orange shape and numbers, but the extra line competes with that span.
- The reveal explains the unused first three centimetres and reports the current seventeen-centimetre result. The recorded path never displays the wrong endpoint method's number, but that number is the labelled Endpoint control itself, so the comparison is recoverable.
- No fatal flaw observed. Minor issues: the early answer-giving title and unexplained green span. No factual or QA approval is implied.

## 2. After reading the brief

- The objective is endpoint minus starting mark; the stage and reveal make that calculation recoverable despite the extra green span.
- The recall asks "What calculation works" but offers only Check the mechanism and its stated constraints/Assume the layout always works/Ignore the stated inputs. None states a calculation, and the marked correct option does not require subtracting the start. This is a material recall mismatch.
- Artifact-only experience raised no blocking arithmetic objection. The brief comparison adds the recall objection. Status remains review; no claims or human-learning, QA/accessibility evidence change.

Verdict: revise

## 3. Revised lesson artifact recheck — 64b7b1e

artifact recorded: 2026-10-14T00:53:57.306Z. Screenshots seen: all four fresh sheet.png frames after the fresh transcript; findings appended before reading the revised brief or recall account.

- The fresh path still makes eighteen minus three equal fifteen, then twenty minus three equal seventeen. The orange object and stage labels make the arithmetic recoverable. No sustained understanding break or fatal flaw observed.
- Closer inspection distinguishes the green spans: the initial endpoint-method frame spans zero to endpoint, while after Subtract start the green line matches the object's start at three. The earlier nonblocking ambiguity is limited to the unlabelled method indicator in the prediction frame; it is not a wrong span throughout the path.
- The title still suggests the answer before prediction. Historical generic-calculation recall resolution awaits actual revised recall screens.

### Actual phone recall artifact

Read phone-recall.md recorded 2026-10-14T00:58:10.159Z, then actually saw phone-recall-question.png and phone-recall-answer.png. Build 64b7b1e; seeded completion history and scripted correct selection, not human retention evidence.

- The rendered recall changes the starting mark to four and endpoint to nineteen. Numeric choices 15/19/23cm require subtraction rather than selecting a generic instruction. Feedback displays 19−4=15 and explains the unused initial segment.
- The historical missing-calculation recall objection is resolved in the actual phone UI. Remaining title/method-indicator issues are nonblocking limitations.

### After reading the revised brief

- Objective and the actual changed-start/end recall align. The numerical subtraction recall resolves the historical generic-options objection.
- Status remains review. This is a simulated learner-experience recommendation; it verifies no claims and provides no human-learning, browser-QA or accessibility attestation. Actual recall renders were seen, but the seeded/scripted flow is not observed retention.

Latest verdict: launch
