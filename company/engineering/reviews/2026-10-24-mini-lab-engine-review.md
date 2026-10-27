# Independent review: numerical mini-lab trace engine

owner: principal-engineer
date: 2026-10-24
reviewed: c4049323e3e5628c93fdb686a495dcf474be5034
status: required fixes before merge; no publication or deployment verdict
scope: actual engine source and tests, not builder accounts or readiness assertions

## Verdict

The implementation keeps its imports local, bounds rendered arrays, rejects non-finite visual values and correctly preserves completed-case evidence across Reset. The two witnessed-case transitions are an appropriate reveal gate. Two control-state defects remain: adjacent duplicate frames can produce an enabled Step with no numerical or pictorial change, and the retained-picture Reset state enables Run even though that action only changes a saved-caption prefix. The existing transition test does not establish its stated visible-change guarantee.

This review does not verify the eventual 200 lessons' numerical calculations or factual claims. They are deliberately outside this renderer, so per-family arithmetic and boundary checks remain necessary in the lesson implementations.

## Required fixes

### R1 — Adjacent identical pictures are accepted and Step remains enabled

`src/lib/mini-lab/model.ts:93` checks only that a complete trace contains more than one distinct signature. A trace with values `[1, 1, 2]` passes `validateSpec`. From its first frame, `availability(...).step` is true, but `advance(..., "step")` moves to an identical visible frame. The only changed value is hidden `frameIndex`.

I reproduced this with a valid two-option local spec: scenario A has bars `[1, 1, 2]`, scenario B `[1, 3]`, identical captions and no metrics; all other fields satisfy the validator. Result: `acceptedAdjacentDuplicate=true`, `stepEnabled=true`, `visibleChanged=false` using `visibleFrameSignature` on the before/after frame. This is independent of any lesson content.

**Required:** reject adjacent duplicate rendered frames, or make Step skip them and disable itself if no meaningful next frame remains. Do not count hidden scenario/frame indices as visible change. Include a regression fixture with a three-frame trace containing adjacent duplicates.

### R2 — Run after Reset need not change the mathematical stage

After Run → Compare → Reset, `displayedFrame` shows case A's completed frame with `saved=true`, and both summary rows remain present. `availability` nevertheless enables Run. Pressing it displays the same completed case A picture and the same metrics/summaries; only the prefix `Saved case A ·` disappears and hidden `frameIndex` changes. The same occurs after Run → Reset → Run. This falls short of the pre-code requirement that each enabled action do meaningful visible work, rather than merely relabel the current evidence.

**Required:** make the saved-picture state's action availability agree with its displayed evidence, or change the reset/run transition to perform a meaningful exploration action while retaining truthful summaries. Preserve the two-case gate and Reset-safe evidence. Add a regression for both Run → Reset → Run and Run → Compare → Reset → Run.

### R3 — The visible-change test checks internal state instead of the artifact

`tests/mini-lab/model.test.mjs:50` is named “Every enabled transition changes a visible frame, case or retained witness,” but line 61 compares `JSON.stringify(next)` with serialized prior state. Any changed hidden index passes, including R1 and R2. This is the same class of false assurance identified in the earlier Algorithms 200 review: a non-rendered state difference does not establish an observable action.

**Required:** compare the actual rendered presentation fields (selected/displayed frame visual and formatted readouts, saved observation summaries and any genuine result-bearing state), ignoring hidden indices and caption-only changes. Keep a browser check that presses every enabled control, including actions after Reset. The regression must fail on this reviewed commit and pass after the engine fix.

## Source findings that pass

- **Scope and blast radius:** the engine and two domain adapter components are new modules. They import only React, existing kit modules, their local model/types and CSS. There is no full catalog import, new route, metadata-schema change, dependency or protected-path change in the engine commit.
- **Determinism and local behavior:** no `fetch`, `/api/` call, browser storage, `Math.random`, clock, `window` or `document` reference exists in the inspected engine/adapters. Existing `<Lesson>` supplies its established event/progress behavior; this patch adds no event fields or independent persistence.
- **Bounds:** bars ≤8, points ≤100, grid cells ≤12, graph nodes ≤8/edges ≤16, tables ≤4 columns/5 rows, timeline events ≤8, intervals ≤5, frames ≤32 and scenarios exactly 2. Numeric visual values are finite with absolute value ≤1e15. Interval order, graph id uniqueness, edge targets and graph coordinates are checked. Invalid option indices and duplicate options are rejected. Reveal text has a 90-word ceiling and minimum explanation length.
- **Gate and evidence:** Compare cannot earn its witness before A is witnessed. Repeated completion of the same case does not call `interact` twice because each case is a persistent boolean. `<Lesson minInteractions={2}>` therefore needs A and B. Reset preserves both witnessed booleans and summaries, avoiding the earlier “your zero runs” failure.
- **Pre-commit stage:** every stage control includes `disabled={locked || ...}`; the locked visual is a neutral two-card placeholder. Numerical traces and summaries are not rendered before a normal first prediction.
- **Basic responsiveness:** the renderer uses fixed SVG viewBoxes, width 100%, bounded graphs, CSS variables, text alternatives and 44px control height. These are useful constraints, not proof of actual phone fit.

## Limits and remaining integration checks

- `MiniLabSpec.family` is a descriptive string, not a validated mathematical family. The shared module validates *output traces*, not input probabilities, sample sizes, causal assumptions, denominators or calculations. That division is acceptable only with independently tested local models; do not describe the eight engine tests as numerical verification of 200 demos.
- Text-length limits allow labels that can overlap SVG nodes or neighboring labels. The stage's 25-word budget is not counted by the engine, and the engine cannot establish that a fixed reveal remains true for every permitted active frame. All-route phone/desktop QA and per-family visual inspection must cover these content-dependent limits.
- Curve/scatter axes rescale for each frame. A lesson that expects comparable vertical distances must use explicit matching bounds or show the changed scale clearly. No universal correctness conclusion follows from the renderer.
- `visibleFrameSignature` compares raw numbers rather than formatted precision. Very small raw differences can produce the same displayed readouts or imperceptible geometry. R3's implementation should not mistake those for a useful contrast.
- Shared code serving 200 new consumers remains tier 2. Independent principal-engineer-ops readiness, integrated build/typecheck/verify, and the ordinary publication gates are still outstanding. This file provides no ops approval and no merge/deploy permission.

## Checks performed

Ran `node --import ./tests/lifehacks/register.mjs --test tests/mini-lab/model.test.mjs`: **8/8 passed** on the reviewed commit. Ran the independent adjacent-duplicate reproduction above: it demonstrated R1. Read the actual renderer/state/types/CSS/domain adapters and their imports. Did not read builder notes and did not edit source, tests, board, progress or events. No browser or full-repository QA is claimed by this review.

## Next move

Chief of staff routes R1–R3 to the existing platform-engineer. Return the exact fix commit for an independent re-read; include regression output and then integrated per-lesson QA. Lesson builders continue numerical/content work within their own scope.
