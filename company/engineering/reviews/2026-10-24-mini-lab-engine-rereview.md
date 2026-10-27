# Mini-lab engine: independent re-review of R1–R3

owner: principal-engineer
date: 2026-10-24
reviewed: 9d2c84ad9dd80bd458a65467f71cccb32ac4a38e
prior review: company/engineering/reviews/2026-10-24-mini-lab-engine-review.md
status: R1–R3 closed by source and focused regression evidence; integrated browser QA and independent ops readiness pending

## Result

The actual fix closes the three required engine findings from the first review. I read the implementation diff and reran the focused tests, then independently repeated the duplicate-frame and post-Reset probes. No further blocking engine defect emerged in this re-review. This is a bounded engineering result, not approval of the 200 lessons' claims, mathematical models, phone layout, publication or deployment.

## R1 — Closed

`validateSpec` now compares every adjacent pair of frame signatures, rejecting `[1, 1, 2]` even when a later frame changes. `renderedVisualData` replaces raw numeric data in signatures with normalized chart geometry, formatted displayed numbers and rendered labels. This prevents automatically rescaled single bars or raw precision below the displayed rounding from manufacturing a contrast. The regression includes both adjacent duplicate pictures and values 1.0001 versus 1.0002 that format and draw alike.

My independent prior reproduction, repeated against this commit, now throws an `adjacent` validation error. The fixed engine does not merely hide an enabled no-op behind a new caption.

## R2 — Closed

`availability` derives each action's enabled state from whether `advance` returns a changed presentation. `advance` checks `presentationSignature`, which excludes hidden indices, captions and the Saved prefix, and includes the displayed picture/readouts and retained summaries.

From A-final, Reset is disabled when it would only add the Saved prefix. From B-final, Reset meaningfully restores A-final, preserves both witnesses and summaries, and disables Run because that would reproduce the same observation. Step from that saved picture performs an actual rewind to a different frame, skipping a first frame if it matches the already displayed saved final picture. Compare still changes A to B, and no case can earn its witness twice.

I independently checked: Run → Reset returns the same state with Reset disabled; Run → Compare → Reset has Run disabled; pressing that disabled Run transition returns the same object; Step from the saved state changes the presentation; both witnesses remain true. No changes were made to the kit's two-interaction reveal gate.

## R3 — Closed for the state-level regression

The exhaustive transition test now compares `presentationSignature(spec, next)` with the prior presentation instead of comparing serialized internal state. New fixtures cover three-frame adjacent duplicates, rounded-away differences, both Reset paths and a nonadjacent duplicate first/final frame during rewind. The tested signature is constructed from the same geometry/formatted fields the renderer draws, so hidden `frameIndex` or Saved-label changes no longer satisfy it.

The additional `tools/mini-lab-control-check.mjs` checks actual rendered picture attributes/text, metrics and witness rows; it excludes captions, aria descriptions and hidden state indices. It exercises initial DOM-order controls and branches after Reset on phone and desktop. It supplements the protected QA contract without changing it. I reviewed the script; I did **not** run it in this re-review because the integrated browser build and QA remain with the chief of staff/QA role. Its future output must be recorded as execution evidence rather than inferred from this source review.

## Checks performed and limits

- `node --import ./tests/lifehacks/register.mjs --test tests/mini-lab/model.test.mjs`: **12/12 passed**.
- Independent in-memory reproduction: duplicate adjacent trace rejected, post-Reset no-op disabled, evidence retained, Step rewind changes meaningful presentation.
- Read the actual model/renderer/test diff from `c4049323e` to `9d2c84ad9`. Builder notes and claimed old-code mutation results were not used as verification evidence. I did not independently run a mutation test, and claim no such run here.
- No source, tests, board, progress or event changes made by the reviewer.

The first review's content-dependent limits still apply: local lesson models need arithmetic/domain checks, empirical claims stay unverified until independently sourced, phone fit and text budgets require rendered checks, and graph/timeline labels can exceed available space despite character limits. The shared renderer remains tier 2. Principal-engineer-ops readiness and integrated browser QA are separate outstanding steps.

## Next move

QA runs the unchanged protected contract on all 200 new routes, plus the extra control-path script, against the final integrated build. The chief of staff records exact browser/build/check results and any inherited failures. Principal-engineer-ops independently rules on readiness; release/publication gates retain their ordinary requirements.

## Addendum: composable wrappers, reviewed 9ae4b0fc2

Read the actual `TraceLesson.tsx` refactor and the live wrappers for `be-par-or-birdie`, `p100-bootstrap` and `p100-little-s-law`. The extraction exposes `useMiniLab` (the same validated state/controller), `MiniLabStage` (picture, layout and retained observations) and `MiniLabReveal` (existing reveal paragraphs). `model.ts` and its closed R1–R3 semantics are unchanged. The local wrappers render the real existing kit `<Lesson>` and four working `<Control>` elements: they pass the controller's availability, locked state, actions and kit `interact` callback through to actual JSX. This is an ordinary composition boundary, not comments or dead strings designed to satisfy the static checker.

Independently parsed the integrated lesson wrappers with the TypeScript JSX AST: **200/200** mini-lab wrappers (100 behavioral, 100 probability) contain one actual `Lesson`, one `MiniLabStage` and four `Control` elements. This structural count supplements the three manual source reads; it does not claim every wrapper has received an individual semantic review. The three manually read wrappers correctly use `minInteractions={2}`, pass `locked` into the stage and disable each control with both `locked` and `!lab.enabled.<action>`.

The imports remain one-way: lesson → component/controller → pure model/types, with existing kit imports for the actual contract. No circular import, catalog-wide import, storage/network call, nondeterministic calculation or new persistent side effect was introduced by this extraction. The remaining `TraceLesson` convenience adapter itself composes the same exports; repository lesson wrappers use the local contract elements. `package.json` adds the existing-loader `test:mini-lab` command and inserts it into `verify`; no suite is removed, no dependency or protected gate changes, and no test success is fabricated by this wiring.

Reran focused engine tests after the extraction: **12/12 passed**. No new required engineering fix from this addendum. Integrated browser paths, actual phone fit, lesson model/source checks and independent ops readiness remain pending and are not approved here.
