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

## 2026-10-14 integrated phone artifact review

Requested by parent after integration in `/tmp/system3-life-hacks-20261014`, branch `codex/lifehacks-200`, with latest upstream merged. Parent identifies these saved PNGs as the **`bf149a5` build snapshot**. Repository HEAD reported `6bf4e6a36138cbcb47b3f5ee968c606995eebbe3` during the accompanying source inspection; that newer HEAD is not the screenshot build identity. Browser QA was being run by the parent; this designer independently opened its saved PNGs with `view_image`. This is an actual screenshot review, not a browser session performed by this designer. No full QA rerun or runtime edit was made here.

Integration retained upstream versions of four primary specs and placed this batch's variants at `towel-spread-dries-first-collection-200.md`, `spaced-beats-cram-collection-200.md`, `square-bow-stays-tied-collection-200.md`, and `long-cord-knots-itself-collection-200.md`. The earlier Outputs section is historical; it describes the files before integration. `wobbly-table-quarter-turn.md`, the batch spec and the vector layout reference remain at their listed paths.

### Actual files and states viewed

Opened **47 PNGs for 21 lessons**. For every row below, the directory is exactly `artifacts/qa/<slug>/`:

- P means the actual file `phone-1-predict.png` was opened.
- E means the actual file `phone-2-explore.png` was opened.
- R means the actual file `phone-3-reveal.png` was opened.

These are phone-project captures; `playwright.config.ts` uses the Pixel 7 preset. They are viewport screenshots at the saved scroll positions, not full-page renderings. No other PNGs are implied by the table.

| Slug | Visual family | Files opened | Concrete final state visible |
| --- | --- | --- | --- |
| towel-spread-dries-first | Cloth before/after | P, E, R | Spread outline; width 72 cm; 2.92 h model time |
| spaced-beats-cram | Calendar + recall curves | P, E, R | Three dated B sessions, one A block, retained marker dots; day 30, A 1%, B 19% |
| wobbly-table-quarter-turn | Square + foot/contact detail | P, E, R | Empty square at 45°; all contact marks filled; gap 0 mm; safety caption visible |
| square-bow-stays-tied | Two shoes / wrap comparison | P, E, R | Along/across loops; first/second direction labels; 20 model steps; 4/14 mm loop readouts |
| long-cord-knots-itself | Seeded two-length trial trays | P, E, R | 0.3/3 m trays; 0/20 and 13/20; setup and seed 17 visible |
| suitcase-rotate-block | Household packing grid | E, R | Quarter-turn; bag 32×36 cm, blocks 18×12 cm, fit count 4 |
| ruler-start-not-zero | Ruler / offset | E, R | Start 3 cm, endpoint 20 cm, reported length 17 cm |
| laundry-sort-before-walk | Household route | E, R | Grouped trip; 10 items; 4 m one-way route; travel 8 m |
| work-back-from-a-deadline | Study calendar | E, R | Draft 12–42, review 40–50, send 50–55; 2 m overlap; due-40 readout 42 m |
| cover-before-recall | Study reconstruction | E, R | Checked feedback; lake/plum/door target and attempt; match 3/3 |
| short-jobs-clear-a-queue | Study queue | E, R | quick→small→long; 5/10/30 m blocks; waiting 20 m; late/prerequisite counts zero |
| iso-date-filename-sort | Digital file list | E, R | Year-first dates sorted 2025-12-01, 2026-01-15, 2026-11-02 |
| selection-not-focus | Digital editor state | E, R | Right panel underlined as focus; B selected with heavy border; both states stated in reveal |
| handoff-needs-a-checkpoint | Study message/checklist | E, R | Artifact draft-v2, Finished outline, Next sources; three completed fields |
| lh-big-pack-price | Resource receipt | E, R | 500/900 g; 6 and 7.778 €/kg at large-price €7; division expressions visible |
| lh-scale-recipe-portions | Resource allocation | E, R | Eight portions; scaled 600 g versus unchanged 300 g; 75×8 expression |
| lh-lead-time-stock | Resource inventory | E, R | Five lead days; 28 versus 20 items; separate +8 buffer expression |
| lh-watts-hours-trade | Resource energy chart | E, R | A-hours 3; both outputs 0.3 kWh; B expression contains 20×5×3 |
| lh-flow-times-minutes | Resource water vessels | E, R | Six minutes; 36 versus 18 L; 6×6 and 3×6 expressions |
| lh-double-container-radius | Resource geometry | E, R | Equal-height cylinders; radii 3/6 cm; height 12 cm; 0.339/1.357 L |
| lh-reuse-cost-per-use | Resource reuse loop | E, R | Twenty uses; 0.6 versus 0.2 €/use; upkeep excluded visibly |

### Resolved historical objections

The rendered towel **does remain spread** at explore and reveal; its reveal names that state and its current model value. The earlier intervention→baseline route objection is resolved by actual artifacts and by the current baseline→intervention DOM order. This does not attest that the full original quarters/half/air brief was implemented: the current comparison is narrower and uses a width slider and explicit constant flux.

The rendered table **does remain at 45° / zero gap** and now includes a foot-to-floor detail. Empty tabletop, equal-leg/gentle-continuous-ground wording, the contact-versus-level caption and clear-hot-drinks wording are visible. The old lost-zero-state and horizontal-number-line objections are resolved. Source shows the slider disabled at the chosen contact state. Floor-pattern and short-leg variants from the prepared brief remain absent; this is still a simplified cosine illustration, not a reviewed physical contact solver or a demonstration of every theorem condition.

The bow now has a visible second crossing/under-over interruption in addition to the first crossing, along/across orientation, and literal first/second direction labels. The narrow objection “second crossing missing” is resolved in the rendered artifact and source. It is explicitly called a schematic, with illustrative loss and possible failure of both bows. Accuracy of the actual square/granny topology still needs the source/subject reviewer; opening the drawing does not independently verify it. The current stage reverses one shoe's wrap, rather than the two-toggle design proposed earlier.

The cord prediction now asks about the tested lengths. Its locked screenshot hides the trial tallies and omits `p=0/0.55`; the final screenshots retain both batches and agree with the reveal's actual 0/20 and 13/20. The old prediction/tally mismatch and visible probability leak are resolved. This stage is a two-length sampled comparison, not the full earlier length-slider/clip-ended mechanism. Its current reveal does not claim to have demonstrated the omitted clipped-loop case.

Spacing calendars, dates, separate line patterns, units, and both visited marker pairs are visible in the actual phone renders. Those earlier source-only calendar/marker objections are resolved. Short A/B controls fit in explore/reveal. The primary/collection spec difference and the current simpler prediction remain an explicit scope difference, not a silently approved rewrite of the original prepared brief.

Household CSS now specifies a 44 px button minimum, consistent with the visibly substantial button rows. The historical 36 px CSS objection is resolved in source. This review did not measure tap rectangles or perform an accessibility pass.

### Material findings sent to parent for runtime changes

1. **Spacing exposes the outcome before commitment.** `spaced-beats-cram/phone-1-predict.png` already draws the full, distinct A/B decline curves. Calendar colours and line shapes identify which plan retains more, even though percentages are `?`. Requested neutral/hidden future curves while locked. This is a teaching/prediction issue the existing control-lock QA does not establish.
2. **Ruler geometry disagrees with its displayed endpoint.** In `ruler-start-not-zero/phone-2-explore.png` and `phone-3-reveal.png`, the object and green span begin near 3 but end around 17.5 on the pictured ruler, while the text says endpoint 20 and length 17. Source uses a constant 180 px span. Requested both object and measurement span derived from the ruler's 12.5 px/cm mapping and current endpoint.
3. **Packing geometry leaves apparently usable space.** `suitcase-rotate-block/phone-2-explore.png` and `phone-3-reveal.png` show four small blocks in the upper-left with large empty areas apparently able to fit more, yet the result says four is the capacity. Source uses fixed tile sizes/spacing rather than a common scale for bag and blocks. Requested one consistent scale for the bag's 32×36 cm and the rotated 12×18 cm blocks, so the leftover strips visibly explain the capacity.
4. **Energy axes give the wrong physical duration for B.** `lh-watts-hours-trade/phone-2-explore.png` and `phone-3-reveal.png` label both x axes `0→3h`. B's visible expression is 20×5×3, so its physical duration is 15 h when A-hours is 3. Requested a B duration label of 15 h, or an explicitly named common A-hours parameter with actual B duration separately stated. Code labels both using the slider's value.
5. **Water path crosses the panel boundary.** In both viewed `lh-flow-times-minutes` files a white trapezoid/pipe stretches from one vessel toward the other. The water-family path closes with absolute `H50` even in the right-hand group. Requested a panel-relative closing coordinate so the two compared cases do not appear connected.
6. **Cylinder cap perspective changes inconsistently.** In both viewed `lh-double-container-radius` files, cap width doubles but ellipse height stays fixed. The depicted base area therefore looks doubled while the lesson explains a fourfold base area. Source uses fixed `ry=9` and fixed bottom-arc depth. Requested radius scaling on both ellipse axes with a constant foreshortening ratio and an unclipped top position.
7. **Accessible names expose computed results while locked (code-only).** The generic Home scene's `aria-label` includes `result.value` even when the visible readout is `?`. The Study schedule frame name likewise includes its computed conflict count. Requested omission of computed outcomes from accessible names until unlocked. This finding came from source after the screenshot inspection; no screen-reader test was performed. Correction to the initial message: the current order frame label names inputs and dependencies, not a computed waiting outcome, so it is not included in this objection. Parent received that correction before changing code on its basis.

All seven findings were sent to parent, with the relevant slugs, files and proposed fixes. At this entry they are requests, not confirmed corrections. Do not treat their presence in the record as a claim that a browser test failed or that a fix has already shipped.

### Craft findings and practical limits

The sampled resource cards have readable quantities, units, arithmetic expressions and explicit model assumptions. Their reveals distinguish the prediction's input from the slider's current input; that avoids explaining the old input while displaying new values. The study schedule similarly describes its current 12-minute start and two-minute overrun, rather than claiming the final state is on time. These are visible strengths of the current artifacts.

Resource inventory/allocation/reuse pictures normalise to twelve glyphs without a unit key. For example, the 28/20-item stock comparison shows twelve/nine rectangles; recipe quantities show twelve/six dots, although the portion count is eight. “Scaled model” is present, so this is not an asserted one-glyph-per-item count, but a visible scale key or fixed scale would make the mechanism clearer. The current normalisation also lets a constant case's drawing change when the other case changes. This is a teaching refinement, separately sent to parent, not a numeric-source finding.

The laundry route shows one outgoing arrow while the readout counts an 8 m round trip on a 4 m one-way route. A return arrow or “round trip” label would tie the diagram to the arithmetic. ISO-date sorting repeats the same date on both sides of each row, and its `Order 3` readout means row count, not demonstrated chronological agreement; shorter meaningful labeling would improve the payoff. Queue metrics include late/prerequisite counts even in the short-job lesson whose goal ignores deadlines; those add jargon beyond the main waiting-time comparison. Focus and selection are separately represented, but the saved final state puts both on the right, so that final image alone does not show the intermediate mismatch.

Some prediction stage content lies below its internally scrollable area (notably the spacing A/B row and towel's model caption), and several reveal screenshots stop before the last paragraph. Current CSS makes stage/card-body content scrollable and removes reveal-height clipping, so the saved crop is **not proof of inaccessible or permanently clipped text**. Reducing unused diagram space and keeping the decisive controls/readouts visible without a second scroll would improve the phone card. No horizontal overlap/overflow was apparent in these saved captures; this is visual sampling, not a measured full-catalog layout result. The pale locked stage remains an accessibility contrast question, not a contrast approval from this review.

This record covers only the named 47 files and the cited source excerpts. It does not approve all 200 lessons, establish learner understanding, verify any external source, clear Life Hacks safety gates, or supply publication approval. No dark-mode, desktop, 320 px, real-device, keyboard, screen-reader, repeated-trial or intermediate-state browser session was performed by this designer. Full walkthrough sheets were not yet used for this pass. Historical findings above remain intact; later corrected renders should be appended with their actual files/states before an open finding is marked resolved.

After this record was written, parent merged upstream `df6a898` (metadata/HQ) and reported home geometry/accessibility changes in `d4f0873`, study changes in `6bf4e6` and a second accessibility change `4ce8257` being integrated, with the resource fix still in progress. Parent explicitly confirmed that the existing PNGs remained the old `bf149a5` snapshot. These are change notifications, not a new rendered review: the numbered material findings remain open pending the new artifacts or appropriate direct source verification. During the merge pause this designer made no further edits; afterward only this handoff file was updated.

`npm run check` after the integrated record: passed with 709 lessons, 3508 claims, 81 roles and zero warnings. That is repository validation, not independent review of 709 lessons or a full-200 browser/learner/source approval.

### Direct source follow-up while new renders are pending

At repository HEAD `7c0ab4d`, read the actual changed components/helpers. Observed: `homeRulerScene` derives object/measurement start and end from centimetres and gives the offset ruler a wider viewBox; `rectangularPackingScene` uses one common scale and complete row/column placement; household round-trip routes draw the return arrow; spacing curve/cursor/marker elements are guarded by `!locked`; the Home scene receives `locked` and excludes computed outcomes in its locked accessible name; the schedule accessible name includes outcomes only after a tested step and while unlocked. These observations independently confirm the intended changes in source. Visual geometry and the prediction render still await new PNGs; they are not marked resolved by a stale `bf149a5` screenshot. The accessible-name code objection itself is corrected in source, with no assistive-technology test claimed.

The newly integrated metadata reports `before-after` for table and bow. Sent parent a format-label suggestion: their prepared briefs/specs name Single card and Side-by-side comparison. This is a catalogue alignment suggestion, not evidence of a runtime contract failure. No metadata was edited by this designer.

## 2026-10-14 fresh home/study walkthrough verification

Parent identifies these new walkthroughs as the **`be775a7` build**, produced after 00:37 UTC. Read the learner-visible transcript before inspecting each sheet; no builder account was used to infer the recorded behavior. Opened the five sheets below, plus three individual PNGs for a closer view. This pass adds five actual walkthrough transcripts, five sheet PNGs and three individual PNGs; it does not imply opening every standalone image referenced inside the sheets.

All paths in this table are under exactly `artifacts/walkthroughs/<slug>/`. “Recorded” is the timestamp printed in that slug's transcript; “sheet mtime” is its filesystem modification time, read as UTC.

| Slug | Actual files read/opened | Recorded timestamp (2026-10-14 UTC) | Sheet mtime (2026-10-14 UTC) |
| --- | --- | --- | --- |
| apply-not-quote | `transcript.md`, `sheet.png` | 00:37:36.325 | 00:37:43.055 |
| laundry-sort-before-walk | `transcript.md`, `sheet.png` | 00:38:59.863 | 00:39:03.640 |
| ruler-start-not-zero | `transcript.md`, `sheet.png`, `03-step-2.png` | 00:39:43.236 | 00:39:46.966 |
| suitcase-rotate-block | `transcript.md`, `sheet.png`, `03-step-2.png` | 00:40:10.958 | 00:40:14.462 |
| spaced-beats-cram | `transcript.md`, `sheet.png`, `01-predict.png` | 00:40:08.960 | 00:40:18.262 |

### Observed changes and status

**Finding 1, spacing prediction leak: resolved in the fresh phone artifact.** The new standalone `spaced-beats-cram/01-predict.png` shows the given study calendars, axes and `?` readouts, with no future decline curves, cursor or answer markers. The sheet then shows the actual morning/month comparison, slider movement to day 28, A-only/B-only views and restoration to day 30/Both. Morning and month marker pairs remain visible at reveal; 1%/19% remains explicitly illustrative. The locked transcript's picture name describes calendars and says the recall illustration is hidden, rather than announcing the result.

**Finding 2, ruler geometry mismatch: resolved in the fresh phone artifact.** In the individually opened `ruler-start-not-zero/03-step-2.png`, the object and green span visibly begin at 3 and end at 20 on the same ruler. The displayed length is 17 cm. The sheet also shows the previous endpoint-18/length-15 state changing consistently to endpoint-20/length-17, with the corrected arrangement preserved at reveal. Its locked picture description contains no computed outcome.

**Finding 3, packing geometry mismatch: resolved in the fresh phone artifact.** `suitcase-rotate-block/03-step-2.png` now shows two columns and two rows of rotated blocks filling the bag's full 36 cm height. The leftover strip on the right is narrower than another 12 cm block. The sheet shows three long-way blocks at the initial 30 cm width, then four quarter-turned blocks, then the 32 cm width retaining four. The visible geometry now supports the complete-row/column capacity explanation, rather than suggesting empty room for many more.

**Laundry route refinement: resolved in the fresh phone artifact.** The new sheet visibly contains paired outgoing and returning arrows. The same scene labels 4 m one-way while the readout gives 8 m per grouped round trip. The earlier discrepancy between an outgoing-only arrow and doubled distance is closed for this sample.

**Accessible-name outcome leak: corrected in source and corroborated by fresh Home/spacing transcripts.** The new locked Home picture descriptions omit the computed result; the spacing description omits memory values and curves. The schedule label's tested/unlocked condition was independently read in source. This is a bounded source/DOM-text finding, not screen-reader usability approval.

The extra `apply-not-quote` sheet shows new inputs remaining visible while the learner swaps the attempted order and receives a 3/3 check. Its final text correctly frames this as rule application with new values, not a memory test. No layout/craft defect was apparent in that particular sequence.

| Material finding | Current review status |
| --- | --- |
| 1. Spacing future curve before prediction | Resolved by new `be775a7` predict/sequence images |
| 2. Ruler physical endpoint | Resolved by new `be775a7` step/sequence images |
| 3. Packing unit scale and leftover strips | Resolved by new `be775a7` step/sequence images |
| 4. Energy B-duration axis | Awaiting fresh resource artifact; old `bf149a5` evidence remains historical |
| 5. Water cross-panel path | Awaiting fresh resource artifact; old `bf149a5` evidence remains historical |
| 6. Cylinder cap foreshortening | Awaiting fresh resource artifact; old `bf149a5` evidence remains historical |
| 7. Locked computed accessible outcomes | Corrected in directly read source; fresh Home/spacing locked descriptions corroborate masking; no AT test |

Parent reports table metadata changed to `single-card` and bow to `side-by-side` following the format suggestion. That is a metadata coordination outcome, not evidence of a changed drawing; this designer did not edit metadata.

The new walkthroughs still show internally scrolling prediction/reveal content in some captures. The earlier “not proof of permanent clipping” limitation remains. These fixes improve the specific evidenced diagrams and prediction integrity; they do not supply a full-200 learner, source, safety, accessibility or publication verdict. No runtime file or protected path was changed by this designer.

## 2026-10-14 fresh resource walkthrough verification

Parent identifies this pass as the **`fc2b349` build**, including resource fix `52c3126`, with new walkthroughs recorded after 00:46 UTC. On the first availability check, energy/allocation/inventory still had pre-00:46 transcripts or incomplete sheets; those stale artifacts were not used to approve the new resource changes. Waited for each named sheet and fresh transcript to complete, then read the learner-visible sequence and independently opened that sheet.

Opened exactly these five fresh `sheet.png` files and read their corresponding `transcript.md` files. The full directory for each row is `artifacts/walkthroughs/<slug>/`. Each sheet contains the labelled predict, Test A, Test B, slider and reveal frames; this does not imply separately opening its five constituent PNGs. Recorded times are printed by the transcripts; file mtimes were read as UTC.

| Slug | Actual files read/opened | Recorded timestamp (2026-10-14 UTC) | Transcript mtime (UTC) | Sheet mtime (UTC) |
| --- | --- | --- | --- | --- |
| lh-double-container-radius | `transcript.md`, `sheet.png` | 00:47:24.255 | 00:47:30.219 | 00:47:31.555 |
| lh-flow-times-minutes | `transcript.md`, `sheet.png` | 00:47:45.834 | 00:47:51.587 | 00:47:52.591 |
| lh-lead-time-stock | `transcript.md`, `sheet.png` | 00:48:02.444 | 00:48:08.001 | 00:48:09.314 |
| lh-scale-recipe-portions | `transcript.md`, `sheet.png` | 00:48:40.156 | 00:48:46.056 | 00:48:47.412 |
| lh-watts-hours-trade | `transcript.md`, `sheet.png` | 00:49:21.028 | 00:49:26.755 | 00:49:28.266 |

**Finding 4, energy B-duration axis: resolved in the fresh phone artifact.** The energy sequence now labels A's physical axis 0→1 h and B's 0→5 h at prediction/default input. After A-hours moves to 3, the axes visibly read 0→3 h and 0→15 h. Both outputs are 0.3 kWh with the appropriate 100×3 and 20×5×3 expressions. The shared vertical full scale is explicitly 0.8 kWh. The reveal still distinguishes the prediction's one-hour input from the current three-hour input.

**Finding 5, cross-panel water path: resolved in the fresh phone artifact.** The two tap shapes stay local to their respective vessels; the old white cross-panel trapezoid is gone. A fixed “Full scale:72L” key is visible. At four minutes, the levels/results are 24/12 L; after six minutes, both increase to 36/18 L while the full scale stays 72 L. This also resolves the dynamic-rescaling concern for this sampled water card: absolute amounts now move on a constant stated scale.

**Finding 6, cylinder-cap foreshortening: resolved in the fresh phone artifact.** The 6 cm cap visibly has twice the width and twice the depth of the 3 cm cap, with a consistent ellipse shape. Both are fully inside their frames. The physical height detail increases with the shared height slider, and the resulting 0.339/1.357 L values remain visible at 12 cm. The corrected drawing supports the fourfold base-area relationship; this is a bounded geometry/render finding, not external-source verification.

**Allocation/inventory scale refinement: resolved for the two freshly inspected samples.** `lh-scale-recipe-portions` replaces the earlier twelve-dot amount proxy with continuous fill and a visible “Full scale:900g” key. The sequence shows A growing from 450 to 600 g as portions change from six to eight, while B remains 300 g with the same visible fill. `lh-lead-time-stock` uses continuous shelf-width fills with a “Full scale:48items” key, rather than twelve item icons purporting to stand in for 28/20 items. Its values/fills change from 20/12 to 28/20 as delivery days change from three to five, with the fixed +8 reserve stated separately. The new inventory reveal explicitly distinguishes stock left when ordering from purchase quantity. This closes the observed ambiguity in those samples; it does not claim that every resource lesson was individually inspected.

| Material finding | Current review status after resource pass |
| --- | --- |
| 1. Spacing future curve before prediction | Resolved in `be775a7` fresh phone captures |
| 2. Ruler physical endpoint | Resolved in `be775a7` fresh phone captures |
| 3. Packing unit scale and leftover strips | Resolved in `be775a7` fresh phone captures |
| 4. Energy B-duration axis | Resolved in the named `fc2b349` fresh energy sheet/transcript |
| 5. Water cross-panel path | Resolved in the named `fc2b349` fresh water sheet/transcript |
| 6. Cylinder cap foreshortening | Resolved in the named `fc2b349` fresh cylinder sheet/transcript |
| 7. Locked computed accessible outcomes | Corrected in directly read source and bounded Home/spacing transcript evidence; no AT test |

Sent these actual observations and timestamps to parent. Existing generic scrolling, contrast, and simplified-prepared-brief limitations remain recorded above. Parent separately reports a bow initial-step correction is forthcoming; that future change has not been approved or observed in this resource pass.

This pass contains no runtime edits, no new browser run by the designer, no assistive-technology test and no full-200 learner/source/safety/publication approval. The old `bf149a5` images remain historical evidence of the defects before correction. Current contract-QA execution is owned by parent and is not inferred from this sample of saved walkthroughs.

## 2026-10-14 final bow and search mechanism verification

Parent identifies these changed-target walkthroughs as the **`64b7b1e` build**. The batch completed after 00:54 UTC; the bow's individual recording began slightly earlier, as the actual timestamps below show. Read both learner-visible transcripts and opened both sheets. For the bow, additionally opened the two individual step PNGs at original detail; no other standalone images in this pass are implied.

| Slug | Actual files read/opened | Transcript's recorded timestamp (2026-10-14 UTC) | Transcript mtime | Sheet mtime |
| --- | --- | --- | --- | --- |
| square-bow-stays-tied | `artifacts/walkthroughs/square-bow-stays-tied/transcript.md`, `sheet.png`, `02-step-1.png`, `03-step-2.png` in that directory | 00:53:52.819 | 00:53:56.586 | 00:53:57.244 |
| alphabet-sort-search | `artifacts/walkthroughs/alphabet-sort-search/transcript.md`, `sheet.png` in that directory | 00:54:05.753 | 00:54:12.424 | 00:54:13.452 |

The individually viewed bow files were modified at 00:53:54.872 UTC (`02-step-1.png`) and 00:53:56.317 UTC (`03-step-2.png`).

**Bow initial-step accounting: resolved in the actual final render.** After the learner presses “Second: right-over-left”, the two visible labels are Matching/Opposing, the loop readouts are 20/20 mm, and the caption says `Model steps=0`. Wrap direction/orientation changes without consuming hidden walking steps. The reveal remains gated at that point. After “Walk 20 steps”, the readouts are 4/14 mm and the caption says `Model steps=20`; the reveal unlocks and refers to those same observed values. This accounts for the full model reductions, 20−20×0.8 and 20−20×0.3. The final stage/reveal retains the along/across comparison and the explicit “both can fail” / illustrative-schematic limits.

This resolves the step-accounting and unlabeled-comparison concerns for the named final sequence. It does **not** independently verify the knot topology, validate the illustrative loss rates as experimental measurements, approve a tying tutorial, or establish that learners understood the mechanism. Those limits from the earlier bow review remain.

**Additional search sample: mechanism visible in the actual final render.** `alphabet-sort-search` initially shows a disclosed target-last shuffled list. The Count slider changes the case to ten labels with target J. “Scan all” visits all ten and finds J last. “Compare” shows E<J, fades/crosses out A–E and leaves F–J as candidates. “Finish” leaves only J active and retains the comparison trail E<J → H<J → I<J → J=J, with scan/sorted counts 10/4. The reveal describes that same trail and explicitly excludes sorting cost from its comparison count. Candidate elimination, not just a smaller counter, is observable in the saved frames; no new material layout defect was apparent in this sampled sequence.

All earlier numbered material rendering findings now have bounded resolutions in the specified fresh captures, with accessible-name masking established by the cited source/transcript evidence. Remaining scrolling/contrast, simpler-than-original prepared brief, and specialist/source/learner review refinements may remain with parent's backlog W-140 and the existing publication gates. No runtime or protected-path change, commit, assistive-technology test or full-catalog approval was made by this designer. Parent's contract-QA results remain parent's evidence, not a browser run attributed to this role.
