# Fact-check: box-handle-clearance (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first: src/components/lifehacks/HomeLesson.tsx (Stage, both layout buttons, slider, inputs line, readout, caption, reveal) and src/lib/lifehacks/home-models.ts (evaluateHome case for this model, plus homeCordScene for cord lessons), with the spec in src/lib/lifehacks/home-lessons.ts; then meta.json claims and the recall card (rendered by src/components/Feed.tsx from meta.recall), then source fields. This engine path has no Reset control and no animation, so reduced motion changes nothing. Note: spec.recall (the c5 transfer prompts) is not rendered by HomeLesson or Feed; I checked it as a convention whose presupposition must hold.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Convention: transfer question (spec.recall), not rendered on the card. Its presupposition, that a box's width for a fit test should include more than the body, is what the engine shows: case 'clearance' tests opening − (40 + 2×3) cm with 'Include handles' against opening − 40 with 'Body only'. |

**Result:** the one open claim verified. No disputes.
