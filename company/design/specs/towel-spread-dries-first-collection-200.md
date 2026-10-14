# towel-spread-dries-first: interaction specification

Owner: interaction-designer · 2026-10-13 · status: implementation handoff

Format: existing **Before / after toggle**, with a three-state fold selector. Goal and prediction remain the prepared brief's same-water/same-air comparison: spread takes an illustrative 3 hours; quarters is about 12. Safety class is the brief's `none`; never depict a heater, powered appliance or added heat.

## One representation

Use one edge-on towel cross-section in a responsive 360 × 240 SVG. The stack is at x=90…270, y=110…160. Folding changes layer count and exposed perimeter. Air-facing edges are solid; internal touching faces are muted dashed seams. Only exposed faces carry outward arrows. Preserve a faint quarter-fold outline after the learner spreads it so the smaller doorway remains visible without adding a second representation.

At phone width, show the fold buttons in one 44 px row, the breeze toggle below, and two readouts below the diagram. Colour supports but does not encode air exposure by itself. Draw geometry before commitment, but keep area/time readouts as `?` and do not animate evaporation.

## Controls in DOM order

Initial condition: quarter-folded, still air. All controls exist from first render.

| Order | Visible label | Action and observable response |
| --- | --- | --- |
| 1 | Half | Set two layers; perimeter/arrows and readouts change |
| 2 | Quarters | Set four layers; compare against the previously visited half state |
| 3 | Spread | Unfold to one layer; faint quarter reference remains |
| 4 | Breeze / Still | Toggle airflow; arrows change density/length and both model times change |

Selected fold buttons are active and disabled. Every control includes `disabled={locked || alreadySelected}` as appropriate. Toggling air preserves fold geometry and the recorded still-air comparisons. Do not add an enabled “reset” that clears those comparisons before reveal.

## States, assumptions and milestones

The cloth is illustratively 0.7 × 1.4 m, with the same water mass, humidity and temperature in both arrangements. Spread area is 1.96 m². Quarter area is about 0.52 m² including illustrative edges; the illustrative still-air constant-rate model gives 3.0 × 1.96 / 0.52 ≈ 11.3 h. Use “about 12” in the prediction as supplied, and 11.3 in the detailed model readout. Do not call either value a measured drying time. The half-state edge approximation must be explicit in the claim derivation; no unrecorded interpolation.

If Breeze uses a numerical multiplier, disclose it as an illustrative model assumption in a claim. It speeds both arrangements by the same factor, so the ratio is preserved; retain the still-air 3.0/11.3 h values when quoting the prediction. Otherwise show an unnumbered faster evaporation response rather than inventing a measured breeze rate.

Milestones: `quarters-inspected`, then `spread-inspected` (`minInteractions=2`). Record the quarter and spread still-air readouts when visited. The final QA path is Half → Quarters → Spread → Breeze; both milestones are reached and the spread geometry persists into reveal. A learner who immediately presses Spread can earn the quarter milestone only after the initial quarter readout has actually become visible following commitment; do not mark it while locked.

## Stage copy budget

Suggested worst-state vocabulary, 21 whitespace-delimited words:

> Illustrative; fixed humidity, temperature. 0.7 × 1.4 m. Half Quarters Spread Breeze Area 1.96 m² Time 3.0 h Still: 3.0/11.3 h

Use only the labels actually needed in a given state. If control labels change, recount the full stage. A still comparison may replace the current time label instead of duplicating it. Hidden SVG accessibility descriptions are not a reason to put extra visible paragraphs on the stage.

## Reveal-visible state and proposed body

Freeze/preserve the actual arrangement at reveal. The normal QA result is Spread plus Breeze, with the faint quarters outline and stored still-air comparison. If a learner later selects a different fold, write the reveal about the stored spread/quarters states and leave those two outlines visible; do not assert the current towel is spread when it is not.

> The still-air model gave the spread towel 3 hours and the quarter-folded towel about 11 hours. Same water, smaller exposed area.
>
> Water evaporates from surfaces touching air. Folding hides those surfaces, so inner water must reach the outside. A breeze helps, but spreading the towel opens the doorway. Real drying times also depend on humidity, temperature and airflow.

The body leaves room within 90 words for the kit's verdict. All factual text, area arithmetic, time assumptions and airflow behavior need claims from the prepared brief. This spec does not verify them.

Mockup request: edge-on layer diagram with outward arrows on outer faces only; quarter and spread key states; no laundry appliance. The SVG layout reference is `lifehacks-phone-wireframes.svg`.
