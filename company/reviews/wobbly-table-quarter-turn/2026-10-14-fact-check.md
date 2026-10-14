# Fact-check: wobbly-table-quarter-turn (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first: src/components/lifehacks/HomeLesson.tsx (Stage or WobbleStage, buttons, slider, readout, caption, reveal; Scene cord branch) and src/lib/lifehacks/home-models.ts (evaluateHome and homeCordScene), with the spec in src/lib/lifehacks/home-lessons.ts; then meta.json claims and the recall card (src/components/Feed.tsx renders meta.recall), then source fields. No Reset control and no animation on this path. Source arXiv math/0511490 could not be opened (arxiv.org unreachable); the verdict below does not rest on it.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Not verified on the source (arXiv math/0511490, unreachable here). Verified on its own terms: (1) four-foot contact does not imply a level top: an equal-leg table on a uniform inclined plane has all four feet down with the top tilted at the plane's slope, a counterexample. (2) The model statement matches the stage: WobbleStage inputs line "Equal legs · gentle continuous ground", caption "Not necessarily level."; spec limit "steps, holes and unequal legs fall outside this model". The keyed option ("It has stopped rocking; the top may still slope") is the only one consistent; "A table with one short leg would settle the same way" is outside the model. The existence of a balanced position (c1, already verified) is not part of this text. |

**Result:** the one open claim verified on derivation and the stage, not on the unopened paper. No disputes.
