# Build note: one-link-back-grows-the-core

builder: demo-builder (Meta M6, order O-10) · 2026-10-22 · v1 · brief: company/domains/briefs/cs.systems.md #8 (J5) · design: company/reviews/one-link-back-grows-the-core/design.md

## Answer check (node, same rule as Demo.tsx coreOf())
Edges A→B, B→C, C→D, D→A, E→A, F→E, G→B, C→H, H→I, D→J. Core = pages A reaches that reach A.
`{"before":["A","B","C","D"],"addIF":["A","B","C","D","E","F","H","I"],"addJG":["A","B","C","D","G","J"],"both":[all 10]}`; every other page is its own group in each case. Before: pages reaching A = A–G; pages A reaches = A–D, H, I, J. Rule "v reaches w and w reaches u" for a new link u → v gives the same sets (I→F: A–F, H, I; J→G: A–D, G, J). Matches the brief's J5 check.

## Built as briefed
Ten nodes in a bow tie (IN left, core centre, OUT right), core filled, chips [Add I → F] [Add J → G] [Both] [None] in DOM order, exclusive, the shown one active and disabled, readout "core: N pages", no node taps, labels 15 px in the viewBox (measured scale 1.07 at the reveal; the stage never goes below 175 px tall, so labels ≥ 10.9 px and tags ≥ 10.2 px).

## Choices and deviations, for cm-cs
1. Back links drawn as arcs around the outside (I → F over the top, J → G under the bottom), only while added. Core-internal links bold, the rest muted. The core square has A→B and C→D vertical and B→C, D→A crossing in the middle: with F, I on top and G, J at the bottom (so the arcs never cross the picture), a 4-cycle A→B→C→D cannot be drawn without one crossing.
2. Predict question rewritten as a second-person scene (copy-style), keeping every condition of the brief's text.
3. Title and hook are mine: "Add one link back. How big is the core?" / "One new link runs from OUT back to IN. How many pages join the core?"
4. Reveal: the brief's draft plus the J → G case (core 6) and the Both case (only if pressed) so it quotes both milestones; "A toy web, not to scale." carries planned claim 3. Reveal pinned to I → F in the reveal phase.
5. Claims: 4, not the brief's 3. c3 (the general rule the reveal's last sentence and the recall state) is split out as its own derivation; c2's support is "source" (E&K ch. 13 definition) and c4's "convention" (the kit's enum has no "definition").
6. Stage words, busiest frame: readout "core: pages" 2 + node letters 10 + tags 3 + chips 8 ("Add I F" ×2, Both, None; traces are numbers, 0) = 23 ≤ 25.

## Pre-flight v1

1. Title and hook: "Add one link back. How big is the core?" / "One new link runs from OUT back to IN. How many pages join the core?" Both ask the question; neither names 5, 8 or 10 or says "the whole" or "only some".
2. Options: "5", "8", "10": bare numbers, same precision.
3. Locked stage: 10 nodes, A–D filled, core links bold, no back link drawn, readout "core: 4 pages", tags IN / CORE / OUT, chips without traces, None active. Nothing equals 8 or marks E, F, H, I.
4. Reveal values: "core 8" = seen.IF, recorded when milestone IF fires (trace "✓ 8"; stage pinned to I → F at the reveal, readout "core: 8 pages"); loop F → E → A → B → C → H → I → F and "E, F, H and I joined" = the pinned stage's bold links and filled nodes; "G … J … stayed out" = hollow G and J on the pinned stage; "core 6" = seen.JG, milestone JG (trace "✓ 6"); "all 10" = seen.both, shown only if Both was pressed (trace "✓ 10").
5. QA path: Add I → F (IF, core 8, the question's case), Add J → G (JG, core 6), Both (10), None (4). Both milestones by press 2; each quoted value stays on its chip trace and the pinned stage when the reveal opens.
6. Reset: None is the reset (pressed last on the QA path). Reveal after that run (reveal-fit run, all four chips pressed): "I → F closed one loop: F → E → A → B → C → H → I → F. Every page on it now reaches every other, so E, F, H and I joined: core 8. G still can't be reached from the core, and J can't click back, so they stayed out. | J → G instead closed J → G → B → C → D → J: core 6. Both links: all 10. One back link adds only the pages on the loop it closes. | A toy web, not to scale." Matches the traces and the pinned stage.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3110 one-link-back-grows-the-core --shots` on `next dev` in this worktree: verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 86 words (tool count, verdict line included; the first draft was 97 and was cut); picture 203 px, controls 99 px. Screenshot artifacts/reveal-fit/one-link-back-grows-the-core.png (git-ignored): readout, the whole graph with the I → F arc, all four chips with traces and the whole reveal on one screen.

## Checks run
`npx tsc --noEmit`: clean. `npm run check`: nothing for this slug. `npm run registry` regenerated the two index files. `meta check --order=O-10` (test1). Official QA, walkthrough and build are code's stages; not run by me.
