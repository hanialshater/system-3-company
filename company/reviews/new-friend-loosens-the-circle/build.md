# Build note: new-friend-loosens-the-circle

builder: demo-builder (Meta M6, order for LESSON-new-friend-loosens-the-circle) · 2026-10-22 · v1 · brief: company/domains/briefs/math.discrete.md #11 (NCM J2) · design: company/reviews/new-friend-loosens-the-circle/design.md

- Intent: `network(fay)` in Demo.tsx builds Ana's friends, all their pairs and which pairs are linked, and the readout and the reveal's numbers come from it: 3 of 6 = 0.5 before; 4, 5, 6 of 10 = 0.4, 0.5, 0.6 with Fay knowing 1, 2, 3. Nothing is typed in.
- Controls in brief order: "Fay knows 1", "Fay knows 2", "Fay knows 3", "No Fay". Shown state's chip active and disabled ("No Fay" at the start).
- Deviations from the brief, for cm-math-discrete:
  1. **Every friend pair drawn** (solid if linked, faint dashed if not), so "of 6" and "of 10" can be counted on the picture. No words added.
  2. **Predict question** as a second-person scene that defines "clustering" in words before using it (copy-style.md): 40 words. Options unchanged.
  3. **Reveal** extended past the brief draft (brief's draft ~45 words) with the conditional "knowing 3 lifted it to 0.6" and a sentence that names the share and points at the 4 new pairs: 87 words by the tool's count (≤ 90).
  4. **Claim 2** keeps 0.3 (k = 0) only for the recall (a newcomer who knows none); no chip shows it (brief build note).
  5. **Claim 3 support** is `source` (E&K ch. 3, Watts & Strogatz 1998): the kit's support enum has no "definition".
- Stage words: names Ana, B, C, D, E, Fay 6; chips 8; readout "linked pairs … of …" 3 = 17 (brief: 17). Traces "✓ 0.4" count 0.
- Title and hook are mine: "Does a new friend tighten Ana's circle?" (39 chars) / "3 of the 6 pairs among Ana's friends are friends. New friend Fay joins. Tighter or looser?" (≤ 90 chars).

## Pre-flight v1

1. Title and hook: "Does a new friend tighten Ana's circle?" / "3 of the 6 pairs among Ana's friends are friends. New friend Fay joins. Tighter or looser?" Both ask; neither says lower, higher or the same.
2. Options: "Higher than 0.5" / "Still 0.5" / "Lower than 0.5": all name 0.5, same precision.
3. Locked stage: Ana, B–E, the three solid links and three dashed pairs, readout "linked pairs 3 of 6 = 0.5", chips without traces ("No Fay" active). No Fay, no 10, nothing below 0.5 is drawn.
4. Reveal values: "4 new pairs", "6 to 10" = network(1).total − network(null).total, the readout's "of 6" → "of 10" (milestone `knows1`); "4 linked pairs of 10: 0.4" = share recorded at `knows1` (trace "✓ 0.4"); "2 of the 4 … 0.5" = share recorded at `knows2` (trace "✓ 0.5"); "knowing 3 lifted it to 0.6" = recorded at the "Fay knows 3" press, shown only if pressed (trace "✓ 0.6"); "linked pairs over all pairs" = claim c3.
5. QA path: Fay knows 1 (`knows1`), Fay knows 2 (`knows2`), Fay knows 3, No Fay: both milestones by press 2; every quoted value stays on the chips' traces after "No Fay".
6. Reset ("No Fay" last): the reveal read: "Not quite: it was “Lower than 0.5”. | Fay made 4 new pairs, her with each of Ana's old friends, so Ana's pairs went from 6 to 10. Knowing 1 of them gave 4 linked pairs of 10: 0.4, lower than before. | She had to know 2 of the 4, half of them, just to hold 0.5; knowing 3 lifted it to 0.6. Clustering is linked pairs over all pairs: Fay added 4 pairs to the bottom but only one to the top for each friend she knew." Matches the traces.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3105 new-friend-loosens-the-circle --shots` on a production build of this worktree (.next-LESSON-new-friend-loosens-the-circle): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; reveal 87 words (tool count, verdict line included), 11 lines; picture 178 px, controls 99 px. Screenshot artifacts/reveal-fit/new-friend-loosens-the-circle.png (git-ignored).

## Measurement v1 (demo-builder, 2026-10-22)

- SVG scale at 390×844 (getScreenCTM): 0.847. Names 13 px → 11.0 px on screen; readout 15 px → 12.7 px (floor 10). Targets min-height 44 px.
- Console: one 404 for /api/account/me on the local server, the same on every lesson (environment).
- `npm run registry` regenerated the two index files. `tsc --noEmit`: clean. `next build`: exit 0 (tsconfig.json include rewrite reverted).
- Official QA is code's qa stage; not run by me.
