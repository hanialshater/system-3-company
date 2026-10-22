# Launch Review: 2026-10-22: one-link-back-grows-the-core

lesson: `one-link-back-grows-the-core` · version: v1 · domain: cs (strand systems) · format: single card · brief: company/domains/briefs/cs.systems.md #8 (NCM wave J, J5)
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/one-link-back-grows-the-core/transcript.md, sheet.png, 02-step-1.png, 06-reveal.png), then meta.json, then the fact-check, learner and QA records, then build.md and design.md.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: the question defines the core in plain words ("each click their way to every other") and names the new link. The options 5 / 8 / 10 are bare numbers at the same precision. 10 is the misconception and 5 is "only F joins". The locked stage shows the 4-page core with no back link and no hint of 8.
- Explore: the chips are Add I → F, Add J → G, Both, None, in the brief's DOM order. They are exclusive and each keeps a "✓ N" trace. Step 1 draws the I → F arc and fills E, F, H and I, while G and J stay hollow. The readout says "core: 8 pages". Steps 2 to 4 give 6, 10 and 4, which match the brief's J5 check.
- Reveal: it fits on the phone under the stage, which is pinned back to I → F. It names the loop edge by edge, says why G and J stay out (one cannot be reached and the other cannot reach back), quotes the recorded 6 and 10, and states the rule. "A toy web, not to scale" is present. The misconception (10) is refuted on screen by the hollow G and J.
- The trust sheet in the walkthrough still reads "NOT YET CHECKED" and "0 browser QA runs" because the walkthrough was recorded before the fact-check stage. meta.json now has all four claims verified.

## Gates
- [x] All claims verified by someone other than the builder: fact-checker verified c1 to c4 on 2026-10-22 (2026-10-22-fact-check.md). The checker recomputed the components in node from Demo.tsx's edge list (4 / 8 / 6 / 10), checked both loops edge by edge, derived the general rule and confirmed the E&K ch. 13 table of contents.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-bow-tie.md, `lesson version: v1`, `Verdict: launch`.
- [ ] Accessibility review: none on file. It is advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty and there are no human learners, so the lesson claims no `**`.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record. The role joins the flow in M7. | head-of-product (until M7 adds analytics-steward) | The enforced gates pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. | head-of-product; accessibility-reviewer when it runs | The core count is a text readout and the reveal names the joining pages in words, so filled versus hollow nodes are not the only signal. Still owed: a check of the hollow-node contrast and a check that the arc colour is not the only cue for the added link. |
| The learning-designer is merged into the builder (F-f), so nobody reviewed the pedagogy independently before build. | head-of-product | The learner review read only the artifact and found the prediction a real choice and the misconception refuted on screen. This is a known structural cost, not a defect here. |
| The reveal says "One back link adds only the pages on the loop it closes", in the singular. In a general graph one link can close several loops, and every page on any of them joins. Raised by the learner review and by the fact-checker's advisory on c3. | demo-builder / cm-cs-systems, for a v2 | It is true on this stage, where each link closes exactly one loop, and the reveal opens with "closed one loop". c3 in the trust sheet states the general rule ("the pages v reaches that also reach u"). A v2 could say "the pages on loops through it". |
| The learner review's visual notes: (a) there is no key saying that a filled node means "in the core"; (b) G looks drawn with a heavier ring than J when both are outside the core (in 02-step-1 and 06-reveal I see a slight difference too); (c) None shows as the active chip before any exploring. | demo-builder, for a v2 | None of these blocks a first-time learner. The readout and the "Watch which pages fill" panel carry (a). For (b), the reveal names G and J alike, so the stray ring changes no fact. (b) is the first fix if a v2 opens. |
| `evidence.simulatedLearner` in meta.json is empty, although a v1 learner review exists. The walkthrough's trust sheet also predates the fact-check. | demo-builder / code (record linking) | This is bookkeeping, not learner-facing content. The trust sheet under-counts reviews until it is linked, and the published build shows the verified statuses. |
| E&K section numbers are recorded as `section_unconfirmed` (13.3–13.4). | cm-course-ncm | The fact-checker confirmed from the book's table of contents that §13.3 and §13.4 cover SCCs and the bow tie. The reference stays chapter-only, as the wave J rule requires. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of one-link-back-grows-the-core goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @fact-checker: derived the general u → v rule (v ⇝ w ⇝ u) and scoped the reveal's last sentence to the stage, which stops the "one loop" wording from becoming a hidden falsehood.
