# Life Hacks: 200-lesson interaction specification

Owner: interaction-designer · 2026-10-13 · status: implementation handoff

Scope: founder-requested batch of exactly 200 distinct lessons: household organisation/mechanisms 70, study/planning/digital 70, shopping/resource arithmetic 60. Builders own runtime code and claims; this document chooses interactions within the existing catalogue. It adds no format, kit API, dependency, publication permission or claim verification. Root owns the board, progress and event records.

Inputs: `company/design/formats.md`, `company/design/system.md`, `company/product/demo-standard.md`, `company/domains/lifehacks.md`, `company/domains/briefs/lifehacks.md`, and the current `tests/qa/contract.spec.ts` read without modification. Read the lesson-specific specs below before implementing the five prepared briefs.

## The interaction decision for every lesson

Each lesson needs a different decision or misconception, an observable mechanism, and a key evidence state. A new title, item name, coefficient or currency on the same calculation does not by itself make a distinct lesson. Reusing a stage component is acceptable when the objects, rule, actions and payoff teach that lesson's particular idea.

| Existing format | Suitable Life Hacks use | Visible response | Evidence required before reveal |
| --- | --- | --- | --- |
| Single card | Drawer grouping, locating an item, dividing a task, a geometric mechanism | Objects move, a search path is traced, a queue changes, or contact appears | Reach the changed physical or logical state; a counter alone is insufficient |
| Before / after toggle | One intervention on the same object: spread, reorient, label, group | The original outline remains as a faint reference and the same object changes | Visit the baseline and intervention; preserve the intervention at reveal |
| Side-by-side comparison | Two organisers, schedules, purchase quantities or allocation methods | Both cases share the same input; the different rule is visible | Apply the same change to both cases and inspect the resulting difference |
| Storyboard / scrub | A sequence, deadline, review schedule, ordered digital operation | Scrubbing exposes named key frames in a single scene or chart | Visit the key frames explicitly, then preserve them as markers |
| Simulation run | Repeated chance events, trial outcomes, variability | Each seeded trial updates marked outcomes and a live tally | Run the specified trial batch in the relevant conditions; retain each tally |

Use a physical representation for household mechanisms, a timeline/task/document representation for planning and digital operations, and quantities/receipts/containers for arithmetic. Bars can be an accessory, not the default replacement for the mechanism. Multi-card sequences, proposed agent formats, and kit changes are outside this batch.

## Contract and evidence

1. Use the existing `Lesson` wrapper: predict → explore → reveal. Prediction has 2–4 plausible choices. Before commitment, every stage control exists and is disabled; answer readouts show `?`.
2. Name 1–3 meaningful milestones. Use the existing `Milestones`/`useMilestones`, with `minInteractions` equal to the milestone count. Only actions that reach those states count toward the gate. Unrelated taps and slider nudges must not earn the reveal.
3. Controls are observable: a tap changes geometry, text, input value or SVG attributes within 450 ms. An already selected choice is visibly active and disabled. A reset is disabled at the initial state. Do not add an enabled control that merely reassigns the current state.
4. Give every answer-critical value a reachable state on the actual QA route: buttons once in DOM order; sliders receive two arrow presses. Explicit actions such as “One month”, “Apply both”, “Find contact”, or “20 long” may choose a real condition and perform the stated action. Their labels must describe that action; they must not silently choose the answer.
5. Preserve evidence after later controls. Snapshot a previous comparison in the same representation, retain a timeline marker, or retain an earlier trial tally. Entering reveal must not reset the diagram. Write the reveal from the learner's actual stored states, rather than assuming the learner left a particular slider value selected.
6. Keep data assumptions visible: “Toy model”, the fixed setup, units and rounding. Randomness uses seeded `mulberry32` and discloses its seed and probability source. Sampled data must not be described as a physical simulation.
7. Every learner-facing factual sentence and model number needs a claim address in `meta.json`. Model assumptions and arithmetic derivations are claims too. Builders leave verification to the fact-checker. This spec is not a source check.

## Phone layout

Design at 390 × 844 first and also inspect 320 px width. One SVG `viewBox`, no fixed pixel width, no absolute text beyond the viewBox. Keep the main scene near 280–340 px high so the contract panel has room. For side-by-side scenes use two compact panels inside one shared SVG; stack readouts below when labels would collide.

The stage contains at most 25 visible words at any moment, counting control labels, readout labels, units and SVG labels. Budget the worst state and the locked state. The reveal contains at most 90 words including the kit verdict. Avoid long prediction answer text because the verdict repeats the correct option. Round displayed floats; use `toFixed`/integer formatting appropriate to the units, and avoid negative zero.

Use existing `Control`, `Slider`, `Readout`, `Row` and colour variables. Buttons meet the 44 px design target, despite the looser 24 px QA gate; slider track remains 28 px high. Labels do not depend on colour: use orientation, outline/dash pattern, explicit A/B labels or symbols as well. Motion settles within 450 ms and reduced-motion displays the settled state immediately. Preserve keyboard and screen-reader names while keeping visible wording short.

## Assumptions and scope of advice

Arithmetic about money is a computed scenario, not a buying recommendation. Show total quantity and units before the cost comparison; do not imply that a larger pack is preferable when storage, spoilage, fees or a budget are excluded. Any advice touching food, chemicals, heat, electricity, health, children, pets or money keeps the domain's safety-review requirement. A simple arithmetic model does not waive that gate.

For household models, do not turn a conditional mechanism into universal advice. For study and planning models, do not call illustrative scores a prediction of a person's memory, concentration or health. Different timelines and queues need different operations and observable consequences, not just renamed productivity bars.

## Prepared-brief implementation index

| Slug | Spec | Key evidence |
| --- | --- | --- |
| towel-spread-dries-first | `company/design/specs/towel-spread-dries-first-collection-200.md` | Quarters and spread area/time; spread persists |
| spaced-beats-cram | `company/design/specs/spaced-beats-cram-collection-200.md` | Next-morning and month comparisons, with recall sessions visible |
| wobbly-table-quarter-turn | `company/design/specs/wobbly-table-quarter-turn.md` | Signed gap crosses zero with equal legs; short-leg counterexample retained |
| square-bow-stays-tied | `company/design/specs/square-bow-stays-tied-collection-200.md` | Reverse one wrap, then compare an equally tight pair after walking |
| long-cord-knots-itself | `company/design/specs/long-cord-knots-itself-collection-200.md` | Stored 20-trial tallies at short and long lengths, plus closed-loop distinction |

Mockup request: implement the precise wireframes in those files using inline SVG and existing design tokens. Decorative hero imagery is optional and does not replace an evidence diagram. Knot crossing geometry must follow the cited source; no generated or decorative image may stand in for that geometry. `lifehacks-phone-wireframes.svg` is a layout reference, not measured evidence or approved knot topology.

## Coordination and review record

2026-10-13: sent `/root/home_builder` the prepared household constraints, QA reachability requirements, stage/reveal budgets and this spec path. Sent `/root/study_builder` the spacing storyboard, fixed study-time, recall-session, QA-marker and model-disclosure constraints. At initial writing no acknowledgment had arrived; no adoption is claimed. Subsequent acknowledgments and code-only review findings are recorded in `lifehacks-design-handoff.md`.

Validation required by builders: complete prediction, press every enabled control once in DOM order, and inspect the final evidence and reveal on phone and desktop. Contract pass alone does not establish that the mechanism was shown or that the 200 lessons are distinct. This designer has not run browser QA and does not claim screenshots, learner evidence, publication readiness or safety clearance.
