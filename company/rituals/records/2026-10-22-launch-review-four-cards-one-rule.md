# Launch Review: 2026-10-22: four-cards-one-rule

lesson: `four-cards-one-rule` · version: v1 · domain: math (strand discrete) · format: single card
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/four-cards-one-rule/transcript.md, sheet.png), then meta.json, then the fact-check, learner and QA records.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: the rule is stated plainly in the question, and the four options are distinct. "E and 4", the confirmation answer, is offered and was the walkthrough's choice.
- Explore: the controls are card E, card K, card 4, card 7 and Reset, in the brief's DOM order. Each tap shows two possible backs, each tagged "fine" or "breaks" (red outline plus the word). The decisive frame is step 3, where the tempting 4 shows "A fine, K fine". The readout builds from "?" to "E" to "E, 7" from the learner's own taps and survives Reset. The tags match D1: E:7 and 7:A break, the other six backs are fine.
- Reveal: it fits at phone size beneath the cards, answers "why not the 4", names the missed case (7 with a vowel behind it) and generalises to "if P then Q". It is close to the brief's draft, and the empirical success rate is correctly left out.

## Gates
- [x] All claims verified by someone other than the builder: c1 and c2 are verified by fact-checker on 2026-10-22, with no findings. c2 was also checked over every digit and letter, so the stage's two-backs simplification does not change the answer.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-everyday-if-then.md, `Verdict: launch`, v1.
- [ ] Accessibility review: none on file. It is advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty and there are no human learners, so the lesson claims no `**`.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record. The role joins the flow in M7. | head-of-product (until M7 adds analytics-steward) | The enforced gates pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. | head-of-product; accessibility-reviewer when it runs | "breaks" and "fine" are words, not colour alone, and the readout is text. An accessibility pass is still owed. |
| The learning-designer is merged into the builder (F-f), so nobody reviewed the pedagogy independently before build. | head-of-product | The artifact-only learner review found that the misconception is refuted on screen at the 4. This is a known structural cost, not a defect here. |
| The learner review's non-blocking notes: (a) the backs are limited to 4/7 and A/K without saying so; (b) P and Q are never mapped to "vowel" and "even"; (c) the reveal explains the 4 but not the K, so an "All four" learner gets no word on K; (d) the back tiles reuse the cards' symbols. | cm-math-discrete / demo-builder for a v2, if wanted | None blocks a first-time learner. The fact-check shows (a) does not change the answer. (c) is the strongest candidate for v2: half a sentence on K. |
| The fact-checker's nuance: "turning it can only agree" about the 4. With K behind it, the rule does not apply rather than agrees. | demo-builder, for a v2 | It is not false. "Can never break it" would be stricter wording for a later version. |
| `evidence.simulatedLearner` in meta.json is empty, although a learner review exists for v1. | demo-builder / code (record linking) | This is bookkeeping, not learner-facing. The trust sheet under-counts reviews until it is linked. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of four-cards-one-rule goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @fact-checker: enumerated every digit and letter, not only the stage's backs. That shows the simplification the learner questioned does not change the answer.
