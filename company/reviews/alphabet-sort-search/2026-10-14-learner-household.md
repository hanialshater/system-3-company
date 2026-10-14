*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: alphabet-sort-search
date: 2026-10-14
boundary: adult familiar with ordinary household tasks and basic arithmetic; unfamiliar with why ordered search eliminates candidates.
artifact: artifacts/walkthroughs/alphabet-sort-search/transcript.md, then sheet.png; recorded 2026-10-14T00:37:36.408Z; home/study build be775a7.

## 1. From the artifact

Screenshots seen: all four frames in sheet.png. Findings written before reading meta.json or builder notes.

- Prediction felt difficult to ground: I can guess that an ordered list helps, but "worst-case comparisons" is not defined and the picture contains no target being sought. The locked supposed-unsorted picture is visibly numbered 1 through 8 in order, which further muddies what ordering means here.
- Understanding first broke after tapping Halve sorted list. Eight letter tiles appeared and the readout said 4, but no comparison, discarded half, retained candidates or target was shown. I cannot reconstruct why four comparisons suffice from what moved.
- Changing Count to ten adds I and J while the result remains 4. That is an interesting output, but the mechanism is still an opaque calculator result. The recorded path never exposes a scan count, so the fewer-comparisons comparison is supplied by the reveal rather than observed.
- The reveal explains in prose that sorted order allows discarding roughly half the addresses. It answers the intended question verbally, but "addresses" have not appeared on the stage and the demonstrated state is only alphabetic tiles plus a number.
- Specific objection: the core elimination mechanism and the comparison baseline are absent from the observed path. No fatal flaw identified; this record is a learner-experience objection, not factual or QA approval.

## 2. After reading the brief

- The objective explicitly names discarding roughly half the remaining addresses. That mechanism remains prose-only on the recorded path, supporting the artifact-first objection.
- The recall asks what condition must hold before halving a label search, but its correct option is generic "Check the mechanism and its stated constraints" rather than that the labels must be sorted. The two incorrect options are plainly unreasonable. It does not require the lesson's specific ordering condition.
- Status remains review. No claims are verified and no human-learning, QA or accessibility evidence is supplied.

Verdict: revise

## 3. Revised lesson artifact recheck — 64b7b1e

artifact recorded: 2026-10-14T00:54:05.753Z. Screenshots seen: all six fresh sheet.png frames after the fresh transcript; findings appended before reading the revised brief or recall account.

- The stage now names target H then J, shows genuinely shuffled labels, and exposes the full scan's ten checks. Compare then visibly fades/crosses A through E after E<J, retaining F through J; the counter becomes one. This resolves the historical absent-target, absent-baseline and absent-elimination objections in the actual render.
- Finish displays the remaining comparison trace H<J, I<J, J=J and four sorted checks against ten scan checks. The reveal explains why sorting licenses discarding earlier labels and discloses the target-last scan and sorting-cost exclusion.
- No sustained understanding break or fatal flaw observed. The first elimination is directly manipulated while Finish supplies later steps as a trace; that is a retained nonblocking limitation rather than a wholly hidden mechanism.
- Historical generic sortedness recall objection awaits actual revised recall-screen review.

### Actual phone recall artifact

Read phone-recall.md recorded 2026-10-14T00:58:14.599Z, then actually saw phone-recall-question.png and phone-recall-answer.png. Build 64b7b1e; seeded completion history and scripted correct selection, not human retention evidence.

- The rendered prompt starts with shuffled A–J labels and asks what must happen before middle comparisons can discard earlier labels. The correct choice explicitly alphabetizes the labels, contrasting arbitrary shuffled midpoint and every-second-label shortcuts.
- Feedback connects earlier-label order with smaller values. This resolves the historical sortedness recall objection; combined with visible elimination and scan baseline, no blocking learner-experience objection remains.

### After reading the revised brief

- The revised objective names observed elimination and comparison with a disclosed target-last shuffled scan, matching the actual new stage. The specific sortedness recall also matches its observed UI.
- Status remains review. This is a simulated learner-experience recommendation; it verifies no claims and provides no human-learning, browser-QA or accessibility attestation. Actual recall renders were seen, but the seeded/scripted flow is not observed retention.

Latest verdict: launch
