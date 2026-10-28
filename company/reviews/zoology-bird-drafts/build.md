# Bird draft slice — 2026-10-28

Six draft cards map to proposed curriculum questions 152, 157, 160, 177, 179 and 195. All are lesson-local SVG schematics. Each has two sequential actions: inspect the subject, then expose the evidence; the reveal requires both. These are not six independently modeled simulations: five are schematic visual explanations; the soaring case is a stipulated, static velocity example. Illustrations are not species-accurate paintings, measured data, or observed episodes. No browser, image, accessibility or learner review was run.

| Plan ID | Slug | What the card shows | Science/design issue to review |
|---|---|---|---|
| 152 | zoo-bird-feather-contour-down | A coherent outer vane next to loose down branches | Check feather structure, distinctions and source; no fine-scale hooking mechanism is drawn. |
| 157 | zoo-bird-soaring-air | A toy velocity diagram: air +2, bird relative to air −1, ground result +1 m/s | The diagram adds velocities, but does not model thermals, actual flight or energy; review the explanatory sentence and source. |
| 160 | zoo-penguin-wing-water | Penguin silhouette, highlighted wing and schematic water arrow | Verify the simplified stroke for an appropriate penguin; the sketch is not a force model or an anatomical reconstruction. |
| 177 | zoo-bird-hatchling-development | Schematic hatchling examples, robin and domestic chicken | Verify example-specific stage traits and qualified wording; no single trait defines all altricial or precocial young. |
| 179 | zoo-bird-egg-gas-exchange | Exaggerated eggshell pores with labeled oxygen and carbon dioxide arrows | Review membranes, diffusion and exact supporting source; the chick/embryo is symbolic, not developmental anatomy. |
| 195 | zoo-hornbill-seed-route | A stipulated fruit-to-bird-to-viable-seed journey | Verify hornbill-specific evidence and whether the suggested references cover it; the named scenario is illustrative and does not claim an observed event. |

## Pre-flight v1 — common to all six

1. Titles and hooks do not state the target answer. The egg hook signals that gas can cross the shell, but not whether an intact shell does so through pores or a crack.
2. Each question uses three verbal options except soaring, where all three options use m/s. A reviewer should assess distractor plausibility and parallelism.
3. Locked SVG contains only “Evidence hidden”; buttons are disabled. The stage does not reveal an answer before prediction.
4. First action reveals the schematic; the second reveals evidence marks, labels or arrows. The soaring arithmetic uses the fixed −1 and +2 m/s question inputs and results in +1 m/s. The seed scene explicitly stipulates a viable seed away from its parent.
5. Inspect the subject and Trace the evidence are the first and second stage controls; each changes the rendered SVG and calls `interact`. Reveal needs both interactions. No interaction path has been checked in a real browser.
6. No stage reset exists. Reload resets the React state, but this has not been checked in a browser; no retained claim about a reset is made.
7. The reveal and stage have not been tested at 390 × 844 or on desktop. Inspect screenshot, label floor, tap targets, keyboard operation, screen reader output, contrast and reveal fit before advancing the drafts.

## Checks and integration

Metadata-only script checks all six IDs, slugs, option indexes, evidence emptiness, and unverified claim status. A direct company check sees six missing curriculum concepts and two stale registry files because this builder deliberately left those parent-owned files untouched. No TypeScript, app build or QA run was performed. References are leads, not verified claim citations; factual checks, separate learner reviews, parent curriculum/registry integration and production readiness remain open. The staging interaction shows information in steps, so pedagogy review must decide whether the action provides enough agency and evidence to support the question. Labels and SVG color contrast also need review.
