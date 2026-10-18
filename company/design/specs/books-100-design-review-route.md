# Books 100: independent design-review route

Owner: design-lead (Ines) · 2026-10-16 · status: routing only; no artifact verdict.
Follows `books-100-pr.md`, `books-100-learning.md` and the existing `design-review` ritual. This adds no format, gate, publication permission or product scope.

## Chair and independence

**Dispatch the existing `interaction-designer` role** (`.claude/agents/interaction-designer.md`, Rafael) as the independent design-review chair for this batch. Its existing ritual is design-review, and the assigned questions concern executed controls, reachable evidence states and visible causal explanation. Check the application of the existing phone/design rules; route any proposed visual-system change to visual-designer/accessibility-reviewer rather than inventing one.

Use an invocation that did not author `books-100-pr.md`, the model renderer, the relevant lesson code or their specific interaction/learning notes. Record that authorship check in the review. Ines, who wrote the batch spec, **does not chair or issue the design verdict**. If the proposed interaction-designer authored the evaluated surface, CoS appoints an independent existing `visual-designer` invocation to chair the visible implementation review and records the substitution; do not relabel an author as an independent reviewer. The separate learner-evaluator and qa-tester retain their own jobs.

The chair may report pass/revise/block for **design scope only**. It does not approve source accuracy, engineering readiness, human learning, publishing or deploy. It may not override a learner finding or change the lesson's teaching goal.

## First dispatch: seven current family representatives

Coordinator-provided source identity: the current seven-family v3 build is intended to use unique dist `.next-books100-seven-v3`, from revision prefix `da62`. That is a routing input, **not this author's attestation of what is served**. Before review, QA supplies the actual served URL, complete revision/build identity, BUILD_ID/asset identity and exact fresh artifact paths from that run. The chair reports a missing or mismatching identity instead of substituting older screenshots. Files named `books100-stale-*`, or an earlier build's same-named walkthrough, do not satisfy this dispatch.

Review all seven:

| Representative slug | Scene family (coordinator selection, not a verdict) |
|---|---|
| `bk-nudge-default-choice-model` | selection |
| `bk-irrational-decoy-dominance` | payoff |
| `bk-habit-cue-policy` | feedback / fixed stock flows |
| `bk-influence-social-sample` | network / bounded branching tree |
| `bk-choosing-information-budget` | intervals |
| `bk-checklist-series-reliability` | compound |
| `bk-emyth-owner-bottleneck` | flow |

The **evaluator brief contains slugs and fresh artifact/URL identities, not this table's explanatory labels, expected answers, builder notes, remediation history, semantic-go summaries or PE conclusions**. The chair reads its role, standard and design system, then inspects each actual learner-facing transcript and contact sheet/full-size phone frames. Use `npm run walkthrough -- <slug>` first when generating an artifact; when QA supplied one, inspect that actual fresh walkthrough first. Exclude trust-sheet/account appendices from this first pass. Write artifact findings before opening `meta.json`, `idea.json`, brief/design notes, renderer source, existing review accounts or this spec's mechanism expectations. Then compare the account with those written findings in a separate section.

## Final frozen 100: exact bounded sample batches

Use `company/domains/briefs/books-100/manifest.json` frozen in the final tested build. The current manifest has business 34, psychology 33 and science-history 33 entries, in manifest order. Split each strand into groups of at most ten, matching the learning-design dispatch rule. The following **12 samples** select the longest manifest title in each group as a repeatable initial text-stress choice. This ensures at least one actual design sample per internal group; it is not a claim that title length finds every layout risk.

| Internal group | Strand-local rows (1-based) | Required initial sample |
|---|---|---|
| B01 | business 1–10 | `bk-checklist-series-reliability` |
| B02 | business 11–20 | `bk-great-selected-winners` |
| B03 | business 21–30 | `bk-data-replica-read-lag` |
| B04 | business 31–34 | `bk-startup-test-before-scale` |
| P01 | psychology 1–10 | `bk-stick-retrieval-evidence` |
| P02 | psychology 11–20 | `bk-hyperfocus-salience-filter` |
| P03 | psychology 21–30 | `bk-smart-sunk-cost-boundary` |
| P04 | psychology 31–33 | `bk-range-transfer-rule` |
| S01 | science-history 1–10 | `bk-climbing-small-valid-steps` |
| S02 | science-history 11–20 | `bk-dodo-fragmented-habitat` |
| S03 | science-history 21–30 | `bk-algorithms-cache-change` |
| S04 | science-history 31–33 | `bk-chaos-nearby-trajectories` |

Retain the seven-family set as well: the final union is **18 distinct slugs**, since checklist appears in both sets. A seven-family review may count toward this union only if its served renderer, lesson content and layout match the final frozen build; record the identity comparison. Otherwise re-render/review the affected representatives. If the manifest changes, CoS recomputes group membership/sample names and records the change before dispatch; preserve at least one per actual builder group when that grouping differs. Do not infer that reviewing 18 means reviewing 100.

Add every lesson with a layout/clarity finding, an interaction exception, the longest actual reveal and the densest rendered stage if absent from the union. QA may identify these risk candidates without forwarding its verdicts or a builder's explanation. A new shared-renderer defect expands review to the affected family; a group-specific defect expands that group's sample. Resolve problems through CM/learning-designer/builder, then re-review fresh artifacts.

## What the chair actually checks

- Predict at 390×844: no answer cue in title/hook/locked scene; input assumptions understandable; stage disabled; readable labels.
- Explore: controls change the represented cause rather than just a verdict/counter; the required case and counterfactual are visible and distinguishable; geometry and numbers explain the promised relation.
- Reset-last and reverse-order evidence: revealed statements still match the saved, condition-labelled observations; every named causal part remains visible. Request live interaction or missing frames when the supplied artifact does not show a path; do not attest to an unseen path.
- Open reveal at 390×844: stage top, final reveal line and every referenced evidence element on screen; labels legible at the system floor; no wrapping/clipped controls. Inspect predict and reveal full-size, not only a reduced contact sheet.
- Worst cases: check the actual longest/densest cases, 320 px horizontal overflow, and the seven families' available small-phone/light/dark/reduced-motion frames. State which frames were actually inspected; a numeric fit report alone is not visual inspection or a complete accessibility audit.

## Records and handoff

Write `company/reviews/books-100/2026-10-16-design-seven-v3.md` for the first seven and `company/reviews/books-100/2026-10-16-design-final-sample.md` for the final union/additions. Each record names the independent role/invocation, exact build/artifact identity, timestamps, slugs and full-size images actually seen, then per-slug findings and design verdict. Keep **artifact-first findings** above the separate **after account inspection** section. Preserve objections with their disposition and owner. Name the unreviewed remainder explicitly by count/set; do not issue a blanket design pass.

Separately dispatch the existing learner-evaluator for a fresh seven-of-seven borrowed-mind pass under the quality plan; do not paste this design account into that first-look brief. QA covers all 100 routes independently. CoS owns dispatch/board/progress; this role changes none of those records and evaluates none of the artifacts itself.

## Integration sampling adjustment (2026-10-16)

Actual generation groups omit the seven representatives, so manifest row groups and builder groups differ. Add `bk-topologies-handoff-edges` (business generation group2) and `bk-porter-same-budget-opportunity` (business generation group4). The final minimum is20 distinct artifacts, plus longest-reveal/densest/flagged additions. All actual generated groups then have at least one sample; this does not expand the independent learner review beyond its named seven.

## Final review expansion from actual findings

V1 design found a rounded compound multiplier inconsistent with the actual fractional rate. The repaired caption path therefore requires fresh design inspection for all10 compound consumers. Add the two business flow questions repaired from the EMyth clarity pattern (`bk-playing-capability-fit`, `bk-ship-distributed-information`). Actual DOM stress selection adds `bk-jobs-context-changes-choice` for both longest reveal (88words) and densest stage (24words). The union is30distinct artifacts: original20 plus7previously unsampled compound cases,2flows and1stress case. The fresh v2 compound/flow artifacts replace their historical findings; unaffected paths can retain actual v1 inspection with explicit identity comparison. Full100 browser checks rerun on v2; this remains a30artifact design sample, not100.
