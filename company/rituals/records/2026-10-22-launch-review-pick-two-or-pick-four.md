# Launch Review: 2026-10-22: pick-two-or-pick-four

lesson: `pick-two-or-pick-four` · version: v1 · domain: math (strand discrete) · format: single card with Step
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/pick-two-or-pick-four/transcript.md, sheet.png), then meta.json, then the fact-check, learner and QA records. build.md and design.md were not read.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: the question matches the brief's kit text, with three distinct options (Taking 2 / Taking 4 / The same). The locked stage shows all six friends under "stay" and both counters at 0; it does not hint at the answer.
- Explore: the controls are Next pair, All pairs, Groups of 3, Reset, in the brief's DOM order. The first Next pair puts A, B on "go" and C–F in a dashed "stay" box, with "pairs seen: 1 of 15 / fours seen: 1 of 15": the one-to-one match is a picture on the first tap. All pairs reaches 15 of 15 for both counters and lays out the 3 × 5 grid. The chips are drawn as six dots with the pair filled and the four hollow, with no letters: this is the picture change the brief offered cm-math to get under the stage word budget, and it works. Groups of 3 shows an ABC / DEF split and "groups of 3: 20".
- Reveal: it fits at 390 px beneath the stage, keeps the milestone picture (15/15 grid, 20) after Reset, names the match in both directions and generalises to k of n and n − k. It is the brief's draft word for word, with the groups-of-3 sentence present because that control was pressed.

## Gates
- [x] All claims verified by someone other than the builder: c1 and c2 verified by fact-checker on 2026-10-22 (meta.json and 2026-10-22-fact-check.md). The walkthrough's trust sheet says NOT YET CHECKED because it was recorded before the fact-check; meta.json is the record.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-counted-pairs-no-complement.md, `Verdict: launch`, v1.
- [ ] Accessibility review: none on file. Advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty and there are no human learners, so the lesson claims no `**`.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record. The role joins the flow in M7. | head-of-product (until M7 adds analytics-steward) | The enforced gates pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. The chips separate pair from four by filled vs hollow dots only, and the dots are small. | head-of-product; accessibility-reviewer when it runs | Filled/hollow is a shape difference, not colour alone, and the go/stay rows above carry word labels. A pass on chip size and contrast is still owed. |
| The learning-designer is merged into the builder (F-f), so nobody reviewed the pedagogy independently before build. | head-of-product | The artifact-only learner review found the go/stay match lands on the first tap. A known structural cost, not a defect here. |
| Learner note 5: the pair chips have no key; a learner must infer that dot position is A–F and hollow means "the four". | demo-builder, for a v2 | Filled/hollow mirrors the go/stay circles above, and the learner traced all 15 chips correctly. A one-time A…F tick under the first chip would remove the guess. |
| Learner note 6: "Groups of 3 are the most, 20" is told, not shown: the stage only ever shows 15 and 20, never sizes 0, 1, 5, 6. | cm-math-discrete / demo-builder, for a v2 | It is an aside; the core idea (k vs n − k) does not rest on it, and c1 verifies it. A v2 could show the 1, 6, 15, 20, 15, 6, 1 row in one line. |
| Trust-sheet c1 text says "Recall: from 10 players there are 45 ways…". A learner opening "Why trust this?" before the recall card meets a "Recall" with no context. | demo-builder, for a v2 | It is true (verified) and only in the trust sheet. Rewording to "The recall question uses: …" or splitting it into its own sentence is a wording fix. |
| The reveal stage shows the A, B split after All pairs had left E, F on stage (Math.max(0, view.pair) after Reset). The picture changes between the last explore frame and the reveal. | demo-builder, for a v2 | Both splits are valid, so nothing false is shown (fact-check note). The counters and grid the reveal names are kept. |
| `evidence.simulatedLearner` in meta.json is empty, although a learner review exists for v1. | demo-builder / code (record linking) | Bookkeeping, not learner-facing; the trust sheet under-counts reviews until it is linked. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of pick-two-or-pick-four goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @learner-evaluator: traced all 15 chips against the go/stay colouring, which is the check that the unlabeled-dot grid actually reads.
