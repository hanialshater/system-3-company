# Fact-check record: lh-double-container-radius

Pass LH-1 date: 2026-10-14 · checker: fact-checker (Ingrid) · batch B7 of PR #2 (origin/codex/lifehacks-200 at fetch time)

## Pass LH-1 (pre-merge, read-only)

Read from `git show origin/codex/lifehacks-200:...`: `src/demos/lifehacks/lh-double-container-radius/meta.json`, `src/lib/lifehacks/resource-specs.json`, `resource-model.ts`, `ResourceLesson.tsx`. Did not read the contributor's review records. Did not build or run the lesson; the reveal text and the stage values were reproduced by re-implementing the evaluator (`evaluateResource`) in node. Statuses below are recorded here and are to be applied to meta.json after the merge (not edited now).

Learner-visible sentence generation: question, options, assumptions line, principle (reveal), "At the prediction's ... A gives ... and B gives ..." (generated from the AST, so covered by c2) and the SVG aria-label (generated).

| Claim | Verdict | Note |
|---|---|---|
| c1 | verified | Declared inputs and limits equal the learner-visible question and assumptions line in resource-specs.json (text match checked by script). Convention only; no real-world figure asserted. V = pi r^2 h/1000 L. At h=10: r=3 gives 0.2827 L, r=6 gives 1.1310 L; ratio exactly 4 (36/9). At h=13: 1.470 L. |
| c2 | verified | Re-derived both formulas in node from the AST in resource-specs.json: AST in the claim equals the AST in the spec; start-value A and B and the recall-value B equal my recomputation (tolerance 1e-9). Display rounding to 3 decimals is as stated. V = pi r^2 h/1000 L. At h=10: r=3 gives 0.2827 L, r=6 gives 1.1310 L; ratio exactly 4 (36/9). At h=13: 1.470 L. |
| c3 | verified | Principle sentences contain no figure that fails recomputation and make no real-world claim beyond the toy model; text equals the reveal text in resource-specs.json. V = pi r^2 h/1000 L. At h=10: r=3 gives 0.2827 L, r=6 gives 1.1310 L; ratio exactly 4 (36/9). At h=13: 1.470 L. |
| c4 | verified | Recall question and correct option equal the node recomputation at the recall input; no distractor equals the correct value. Answer index 0 matches the spec (the all-option-0 pattern is a PR blocker 5, pedagogy, not mine). |
| hook (unrecorded: hook/title, no claim) | verified | Hook "Two ideal cylinders have equal height and radii of 3cm and 6cm." and title "Double the radius, not the volume" are learner-visible factual statements with no claim of their own. I checked them against the recomputation above: they hold at the lesson's default inputs. Add a claim (or fold into c3) before marking. |

**Arithmetic as re-derived:** V = pi r^2 h/1000 L. At h=10: r=3 gives 0.2827 L, r=6 gives 1.1310 L; ratio exactly 4 (36/9). At h=13: 1.470 L.

**Advisories (not claim failures):** Geometry (picture): cylinder rx/ry = 7r/3r px and height = 4h px per resourceCylinderDimensions; r=6 is exactly twice r=3 in both, as c2 states.

**Disputes:** none.
**Caveat on independence:** the claims are self-referential (the source of c2 to c4 is the contributor's own AST). The check here is that the arithmetic and the real-world meaning of the toy model are correct, which I did independently; there is no external source for these, and none is needed beyond c5 where present.
