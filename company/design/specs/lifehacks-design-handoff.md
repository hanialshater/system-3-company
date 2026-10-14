# Life Hacks design handoff and implementation review

Owner: interaction-designer · 2026-10-13

Scope: only Life Hacks files in `company/design/specs/`. Runtime code, board/progress/events, safety and claim gates remain with their assigned owners. No commits made by this designer.

## Outputs

- `lifehacks-batch-200.md`: existing-format selection, key-state and phone rules for the 200-lesson batch.
- `towel-spread-dries-first.md`, `spaced-beats-cram.md`, `wobbly-table-quarter-turn.md`, `square-bow-stays-tied.md`, `long-cord-knots-itself.md`: concrete prepared-brief controls, milestones, assumptions, exact DOM routes, stage copy and reveal-visible states.
- `lifehacks-phone-wireframes.svg`: code-native layout reference for the five prepared lessons. It is an interaction wireframe, not factual evidence or an approved knot diagram.

## Coordination

Initial handoff sent to `/root/home_builder` and `/root/study_builder` with explicit paths and requirements. Acknowledgments are recorded here only after they arrive. No acknowledged implementation change is inferred from the messages being sent.

Received `/root/study_builder` acknowledgment: illustrative spacing storyboard, three hours each, later sessions begin with recall, no health/sleep claims, percentages locked as `?`, separate immediate-test and retrieval sources, and no optimal-gap/fitted-memory implication. The builder's acknowledged DOM order is Next morning → One month → slider → Show A → Show B → Month: both plans; the individual spec was adjusted to that equivalent reachable route. This is an agreed scope, not a claim that the code or browser state already meets it.

Received `/root/home_builder` acknowledgment: bespoke cloth SVG with spread persisting and illustrative constant flux; empty-square table and signed gap with gentle continuous ground/equal-leg conditions, contact-versus-level distinction, clear-hot-drinks wording, and a cosine illustration rather than a full contact solver; bow across/along and actual over/under crossings, literal first/second directions, illustrative rates and possible square failure; cord 20-trial Bernoulli batches at 0.3/3 m, fixed experimental setup, seed 17 and a 55% 3 m parameter attributed by the builder to Table 1. Builder also stated shared household diagrams rather than bars and about 60 mathematical models for 70 lessons. These are builder acknowledgments, not independently observed results or counts. Asked explicitly to retain both cord tallies after clipping and to make bow reveal references follow the swapped knot types.

## Objections to resolve

1. The prepared wobbly-table wording could be read as a universal converse (“a short leg can never be helped by rotation”). The spec uses a chosen toy counterexample with shortfall greater than floor variation. Parent/claim reviewer should keep the theorem's guarantee and this counterexample separate.
2. A generic bars-and-score stage does not fulfil the five prepared briefs' supplied mechanisms. Reuse is welcome; missing exposed faces, retrieval events, signed contacts, knot crossings or seeded trays is an interface/craft issue to send back to builders.
3. The kit repeats the correct prediction option in its verdict. Count that text inside the 90-word reveal target and use short options where necessary.
4. An answer-critical slider range does not guarantee a key state on QA's two-arrow route. These specs supply explicit evidence-state actions without changing the protected contract.

## Evidence and limits

Repository rules, catalogue, design system, prepared briefs, controls, milestones, contract implementation and QA route read directly. No browser evidence, learner evidence, source verification or safety-clearance claim made. Code-only findings and check results will be added after the builders' artifacts are available.

The SVG was parsed and rasterised with the existing Sharp dependency, then visually inspected. Corrected repeated arrowheads and added all 20 slots to each stored trial tray. This validates a layout artifact, not runtime interface behavior. Prepared stage-copy examples contain 21–24 whitespace-delimited words; proposed reveal bodies contain 58–77 before the kit's short verdict.

`npm run check` in root checkout returned one unrelated error: `company/decisions/2026-10-14-lifehacks-200.md` needed an `## Objections` section. Three existing disputed-claim warnings remained (cafe-is-five-bytes, twenty-then-ten-off, count-the-marked-fish). Sent this result to parent without editing its decision record.

## Initial code-only inspection

Read `/tmp/system3-lifehacks-study/src/components/lifehacks/StudyLesson.tsx` and the spacing model/catalog directly, without a browser. The explicit marker controls and final month/both action were present. Current visible stage vocabulary was approximately 30 whitespace tokens; requested shorter A/B/Month-both controls and removal of duplicate labels. Study event positions used list index rather than their session days, with three “recall” captions but no visible Plan A three-hour block or Plan B dated calendar. The prior morning marker outcome was not retained at month/reveal. Sent these concrete craft gaps to the builder and parent; do not treat a requested change as implemented.

Read the prepared household Demo wrappers/catalog in `/tmp/system3-lifehacks-home`; the shared `HomeLesson.tsx` renderer did not yet exist at that moment. This was a partial work-in-progress read, not an evaluation of a functioning stage.

## 2026-10-14 follow-up source inspection

Re-read the revised spacing branch. Observed in source: an A three-hour day-0 block, B recall→one-hour sessions at days −2/−1/0, 100%/0% units, stored visited morning/month dots, and shorter A/B/Month-both controls. The source's visible vocabulary totals approximately 24 whitespace-delimited tokens. The final QA action restores month/both. Updated the spec's example calendar to the actual dates. This resolves the initial calendar, text-length and lost-marker objections in code; browser fit and interaction behavior remain untested by this designer.

Read the now-present household shared renderer and sent these source findings to the builder and parent:

- Generic DOM order was intervention → baseline → slider. On the towel's QA route, the baseline button restored quarters, so spread did not persist. Requested baseline first (active/disabled), then spread, or a final spread action.
- Table DOM order was Find balance → Start angle → slider. It ended around 2° with nonzero gap and no retained contact state. Requested final Contact after the other controls. The signed gap was a horizontal number line rather than a foot-to-floor detail; requested a linked leg/contact strip. Floor-pattern and short-leg controls from the prepared brief were not yet present.
- Bow diagram rotated ellipses and showed a first crossing, but did not yet show the second loop-wrap routing that changes square/granny topology. Requested that accuracy-critical crossing; literal direction labels alone are not the geometry.
- Household controls had CSS `min-height: 36px`, below the 44 px design target. Requested 44 px while leaving the protected QA contract untouched.
- Cord stage had seeded short/long trays, but the catalog still predicted “End loose/End secured” and the geometry of securing an end while the stage tested lengths. Requested the length prediction and the joined-end mechanism if the closure reveal is kept. The visible `p=0/0.55` line also disclosed the probabilities while locked; requested masked answer values.

These are open requested changes as of this entry; they are not claims of implementation or browser failures. The prepared household catalog also simplified towel/table predictions rather than retaining the original brief wording. Parent should resolve that brief alignment explicitly; this designer has not silently approved a changed learning goal.

After parent added its missing Objections section, repeated `npm run check`: passed with 509 existing lessons, 2626 claims, 76 roles and the same three disputed-claim warnings. This check occurred before integration of the isolated builder lessons and is not a 200-lesson runtime QA attestation. No protected or runtime paths changed here, so `npm run verify` was not required for these document/vector artifacts.
