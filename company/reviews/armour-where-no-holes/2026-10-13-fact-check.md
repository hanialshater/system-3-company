# Fact-check: armour-where-no-holes (2026-10-13)

Checker: fact-checker (independent; did not write these claims). Scripts: artifacts/scratch/fc-problife/a1.ts. Stage text read from artifacts/walkthroughs/armour-where-no-holes/transcript.md.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | model.ts draws hits uniformly over the silhouette by rejection sampling inside the bounding box; lost = any hit in an engine ellipse; returned planes therefore have 0 engine holes by construction. Lesson text says "toy model". |
| c2 | verified | engineShare() re-run = 0.1470; 1-(1-0.147)^3 = 0.379. fleet(1943): 10 planes 5 lost, 60 -> 23, 100 -> 35, 120 -> 40 (the reveal's "40 of 120"), 400 -> 141; engine holes on returned planes 0 every time. Across seeds 1-300, first 100 planes: mean 38.5 lost (range 20-56), 0 engine holes on returned planes in all. So "about 38%" holds generally; "35 of 100" is specific to seed 1943 (the claim says "seeded"). |
| c3 | verified | Mangel & Samaniego (1984), JASA 79(386): 259-267 exists and describes Wald's survivability work (recommend armour where survivors have few hits). Citation details match. |

Stage text with no claim: none found. The reveal's "Of your N planes, M never came back" is a live count of the same run (checked at 120/40).

Note (not blocking): the source of c2 does not say whether seed 1943 was chosen. Per disclose-chosen-seeds, a one-line statement ("untuned" or "chosen") would be better. The lesson does not generalise from the run, so this does not block.
