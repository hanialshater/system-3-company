# Fact-check: flat-pack-volume-dimensions (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/flat-pack-volume-dimensions v3. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Transfer prompt in home-lessons.ts spec.recall. No component renders spec.recall (only the Feed renders meta.json recall), so it does not reach the learner. Its presupposition (the hollow disappears) matches the model (assembled 40×30×30 envelope vs stack 40×30×6t). Convention. Owner may withdraw it as unrendered. |
| c6 | verified | home-lessons.ts choices = ['Assembled box', 'Panels stacked']; HomeLesson renders them as predict options 1-2 (plus 'Same outcome') and as the two toggle controls. Unchanged evaluateHome 'flat-pack' gives a·b·b = 40×30×30 = 36,000 cm³, the closed box. |
| recall | verified | Own arithmetic: six 40×40×1 panels assembled enclose about 40³ = 64,000 cm³; stacked 40×40×6 = 9,600 cm³ = the panel material (6 × 1,600), so the hollow is what goes. Keyed option '64,000 and 9,600 cm³' is the only correct one. The dismantling caution matches the lesson's limit line. |
