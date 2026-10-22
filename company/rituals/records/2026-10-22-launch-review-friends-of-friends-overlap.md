# Launch Review: 2026-10-22: friends-of-friends-overlap

lesson: `friends-of-friends-overlap` · version: v3 · domain: math (strand discrete) · format: single card with step chips
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/friends-of-friends-overlap/transcript.md, sheet.png), then meta.json, then the fact-check (v3), learner and QA records, then build.md.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: "friends of your friends but not your own friends" with 90 / 45 / 10. The locked stage fills only step 1 (10, the number given in the question); every other cell is "?", so nothing leaks. 90 is the misconception's answer and a real bet.
- Explore, in the brief's DOM order: "2 steps" fills village step 2 = 10, "3 steps" fills step 3 = 10 and within 3 = 31; "No shared friends" draws the tree and fills 10 / 90 / 810 / 911; "Village" returns. The table keeps both columns, so every number the reveal quotes is on the stage when it opens (06-reveal).
- The ringed friend's arcs let a learner count the overlap (5 left onto you and your friends, 2 more onto your friends, 3 new) before the reveal says "7 … only 3 are new". The cause is shown, not told.
- Reveal fits on the phone frame with the arc and table above it, and names the mistake: "Multiplying 10 × 9 assumes no shared friends."
- I recomputed: ring distance-k people are ±(5k−4)…±5k, 10 per step, 1 + 30 = 31; tree 10, 90, 810, sum with you 911; friend +3 knows −2…+8 minus itself = you + 6 friends + 3 new. All agree with the screen.

## Gates
- [x] All claims verified by someone other than the builder: c1–c4 verified by fact-checker on 2026-10-22 (2026-10-22-fact-check-v3.md); c2's condition was fixed in v3 to "no shared friends", and curriculum.references now agrees with c4 (ch. 20).
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v3, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-multiplication-not-triangles.md, `lesson version: v3`, `Verdict: launch`.
- [ ] Accessibility review: none on file. Advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty; no human learners, no `**` claimed.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role joins the flow in M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record; the role joins the flow in M7, so nothing here can later be checked against a prior prediction. | head-of-product (until M7 adds analytics-steward) | The enforced gates (claims, QA, learner review) pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. Blue (step 1) vs green (step 2) dots carry the step meaning; the "you" label in the tree picture overlaps a blue node (04-step-3). | head-of-product; accessibility-reviewer when it runs | Each ring dot also carries a numeral (1 / 2 / 3) and the table gives every count in text, so colour is not the only carrier. A pass is still owed. |
| The learning-designer is merged into the builder (F-f): design.md was written by the role that built the lesson, with no independent pedagogy review before build. | head-of-product | The artifact-only learner review found the misconception refuted by something the learner can count on screen, and the fact-checker found no unrecorded claims. A structural cost, not a defect here. |
| c4 (the E&K ch. 20 / Fig. 20.1 attribution) was verified from search extracts of the Cornell PDF; the full text was proxy-blocked and the section number is unconfirmed. Its `source` field still says "Needs a human source check with the book", which reads oddly beside `verified`. | fact-checker (human source check with the book when available); demo-builder to drop the stale sentence in a v4 | The fact-checker quotes the chapter's specific argument (Fig. 20.1(b), the 100-friends estimate limited by friends knowing each other), and the claim's learner-visible content is also proved on this stage by c1 and c2. The attribution risk is to the citation, not to what the learner sees. |
| Brief/meta drift: the brief (math.discrete.md #10) names E&K ch. 2 §2.3; meta.json now references ch. 20. | cm-math (cm-math-discrete) to update the brief's Sections line | The fact-checker judged ch. 20 correct for the triadic-closure caution; the brief's section was itself marked unconfirmed. |
| Learner-review notes: (a) "within 3: 31" counts you, which only the reveal says; a learner summing 10+10+10 = 30 may pause; (b) in the tree picture only the chip highlight shows the world changed; (c) the "1,000" ring is never visible. | demo-builder / cm-math-discrete for a v4, if wanted | None blocks a first-time learner (learner verdict launch); the reveal resolves (a) with "counting you", and the counts are local so (c) does not matter. |
| `evidence.simulatedLearner` in meta.json is empty although a v3 learner review exists. | demo-builder / code (record linking) | Bookkeeping, not learner-facing; the trust sheet under-counts reviews until linked. |

## Decision
go

Signed: head-of-product, 2026-10-22. v3 of friends-of-friends-overlap goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @fact-checker: caught that "no two friends know each other" is too weak for 90/810 (the K10,10 counterexample), which made the lesson's condition and its reveal say exactly what the stage shows.
