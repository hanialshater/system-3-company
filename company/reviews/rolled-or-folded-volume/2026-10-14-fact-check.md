# Fact-check: rolled-or-folded-volume (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first: src/components/lifehacks/HomeLesson.tsx (Stage or WobbleStage, buttons, slider, readout, caption, reveal; Scene cord branch) and src/lib/lifehacks/home-models.ts (evaluateHome and homeCordScene), with the spec in src/lib/lifehacks/home-lessons.ts; then meta.json claims and the recall card (src/components/Feed.tsx renders meta.recall), then source fields. No Reset control and no animation on this path.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Derivation: engine case conserve gives material volume = count × 30 × 20 × 0.2 = count × 120 cm³ for both Fold and Roll (value does not depend on the layout flag). The space an item takes in a bag is its material volume plus enclosed air, shaped by how it packs with its neighbours, so a real difference must come from air gaps, compression (removing air) or the packing arrangement, which is the list given. Keyed option (index 2, "Less trapped air, or more squeezing") is the only one consistent with this; the others contradict conservation or speak of weight. |

**Result:** the one open claim verified. No disputes.
