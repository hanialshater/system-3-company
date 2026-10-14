# wobbly-table-quarter-turn: interaction specification

Owner: interaction-designer · 2026-10-13 · status: implementation handoff; safety re-check remains external

Format: existing **Single card**. The prepared brief's theorem is square-table-only, with four equal legs and continuous gentle ground. The current brief safety record is “pass with changes”; this spec does not clear its outstanding re-check.

## One representation

Use an empty square tabletop above a smooth, gently bumpy floor contour map, in one 360 × 230 SVG. Four corners have feet. Add a narrow linked strip beneath the same table view showing the fourth foot's signed gap: a floor baseline, a foot marker and a vertical dimension. This strip is a magnified detail of the same object, not a second independent chart. Positive/negative gap uses `+`/`−` and vertical location as well as colour. At zero, all four contact marks become filled. No cups, plates, glasses, people standing/sitting/leaning, steep slope, stairs, paving lips or holes.

At reveal the zero-contact configuration remains visible, while faint initial and quarter-turn diagonal outlines retain the sign-change argument. The top is never labelled “level”, “safe” or “stable”. Contact is the measured payoff.

## Controls in DOM order

Initial condition: equal legs, smooth pattern A, angle 0°.

| Order | Visible label | Action and observable response |
| --- | --- | --- |
| 1 | Angle slider | Rotate 0…90°, step 1°; feet and signed gap change |
| 2 | Floor | Toggle two continuous gentle bump patterns; gap/contact angle changes |
| 3 | Short | Select a short-leg counterexample; one foot marker lifts and gap stays positive |
| 4 | Equal | Restore equal legs, retaining floor/angle |
| 5 | Contact | Find/display the actual zero of the selected equal-leg model, showing the rotation path |

Short and Equal are active disabled choices when selected; Contact is disabled with Short selected and when already exactly at contact. Explain that disability through a short status/accessibility description, not a new paragraph. All controls exist while locked. Contact is an honest “find contact” operation, not a generic “show answer” button: it computes a root for the displayed floor and draws the swept angle. It settles within 450 ms, with a static path under reduced motion.

## Model and milestones

Illustrative equal-leg signed-gap functions may satisfy `g(90°) = −g(0°)` and use two different roots (for example 45° and 30°). They illustrate the continuity argument; they are not a full rigid-table-on-terrain solver. State that distinction in the model claim. The stage geometry must remain consistent with the displayed signed gap; the fourth-foot strip cannot report zero while that foot is visibly floating.

Milestones: `short-tested` and `four-feet-down`, `minInteractions=2`. The Short press stores a faint short-foot outline; Equal restores equal legs; Contact reaches zero. The QA route is angle 0→2°, alternate Floor, Short, Equal, Contact. At final state, both limitations and the successful contact are observable. Angle adjustment alone does not earn the reveal.

The short-leg case is a chosen counterexample where the shortfall exceeds the floor variation, so no zero occurs. Do not infer that *every* unequal-leg table on *every* uneven floor is impossible to balance; the square equal-leg theorem does not supply that universal converse. This is a scope clarification for the model claim, not permission to alter the brief's pedagogical objective. Parent/claim reviewer should reconcile any overly broad reveal wording.

## Stage copy budget

Suggested worst-state vocabulary, 24 words:

> Toy square; smooth floor. Feet down ≠ level. Clear hot drinks before you turn it. Gap +0.0 mm. Angle 30°. Floor Short Equal Contact

Before prediction, Gap is `?`. “Toy” may be replaced by “Illustrative” without changing the count. The safety wording is visible on the stage and persists; do not bury it only in alt text. The approximately 35° theorem limit is omitted from the learner card; if retained in claim/source detail, it is a mathematical condition and never usage advice.

## Proposed reveal body

> You found zero gap: all four feet touch. With equal legs, a quarter turn swaps the rocking diagonals. On continuous ground, the signed gap crosses zero between them.
>
> This needs the theorem's conditions: a square table, equal legs and gentle ground without steps or holes. The short-leg example never reached contact. Four feet down is not level. Clear hot drinks before you turn it.

The body leaves room for the short answer “Turn it within a quarter turn” and the kit verdict under 90 words. If builders retain the full prepared prediction option, recount the repeated option inside the verdict. Do not say the toy root solver proves the general theorem. Claims, theorem conditions and safety advice need the prepared source addresses.

Mockup request: empty square, four foot contacts, continuous contours, signed-gap detail and swept quarter-turn sector. Layout reference: `lifehacks-phone-wireframes.svg`.
