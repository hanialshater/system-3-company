# Which format for which concept: a one-page briefing for category managers

owner: design-lead (Ines) · 2026-10-13 · draft v0 · the full catalogue and rules: [`formats.md`](formats.md)

Every brief names one format. Pick the format by asking **what the learner has to see to change their mind**. Then check the format's kit status. ✅ means builders can use it now. 🟡 means built by hand, which costs more build time. 🔴 means it needs kit work first: ask the design lead before writing the brief. If you are unsure, write the brief with your best guess. The design lead may require a format change in review, and that is cheap at the brief stage.

| If the idea is… | Use | Kit | Examples from our lessons |
|---|---|---|---|
| One mechanism, one picture: "move this, watch that" | **Single card** (default) | ✅ | Math: triangle-is-half, seesaw-mean · Physics: seesaw-sit-closer · Chemistry: same-heat-different-rise · AI: king-queen-arrow · Probability: why-seven-wins |
| About chance or populations, where one trial proves nothing and many independent trials show the pattern | **Simulation run** | ✅ | Probability: drunk-walk-distance · Life: herd-immunity, natural-selection · Chemistry: half-life · AI: greedy-slot-machine, overfitting |
| A pattern **nobody chose**, emerging from agents reacting to each other on one shared world | **Agent-based simulation** | 🟡 (approved 2026-10-13, two lessons only so far) | Economics: mild-preferences-sharp-divides · Geography: schelling-on-new-york (neither built yet). Ask the design lead before briefing a third. |
| About places, sizes, distances or map projections | **Map explorer** | ✅ | Geography: mercator-greenland, three-giants-in-africa, shortest-way-to-tokyo |
| Two methods, rules or cases, where the misconception is "they behave the same" | **Side-by-side comparison** | 🟡 | CS: lru-eviction-order · Physics: race-down-the-ramp · Economics: start-early-race · Probability: better-in-every-group-worse-overall · Life Hacks: square-bow-stays-tied (spec approved) |
| One change with a visible effect, where the "after" is the lesson | **Before / after toggle** | 🟡 | Chemistry: heavy-but-floats, point-one-is-26-percent · Physics: add-a-parallel-bulb · Life Hacks: towel-spread-dries-first (spec) |
| A process over time, where the payoff is *when* something happens, or a reversal between two moments | **Storyboard / scrub** | 🟡 | Physics: coaster-track-shape · Life: waves-return, epidemic-overshoot · Economics: compound-interest · Life Hacks: spaced-beats-cram (spec) |
| An idea that truly needs 2–4 separate pictures in order | **Multi-card sequence** | 🔴 kit work first | none yet (a proof with steps, a recipe with stages) |
| A popular claim that the stage can test | **Debunk** (Life Hacks) | 🟡 | none yet. The safety class is shown on the card. |

Domains not named in a row above, with their most common fits: **CS** is mostly single card (binary-search, heap-bubble-up), with comparison for "two algorithms". **AI** is mostly simulation run for training and noise, with comparison for fairness (whose-cutoff-wins). **Geography** uses map explorer for maps and storyboard for the sky over a year (polar-day-length).

## Quick tests
- **Single card or simulation run?** If the answer changes from run to run, use a simulation run, seeded and disclosed. If one setting gives one answer, use a single card.
- **Simulation run or agent-based?** If each trial is independent (coins, patients, atoms), use a simulation run. If agents *move because of each other*, and the pattern is in the arrangement, use agent-based.
- **Comparison or before/after?** If both cases exist at once ("solid disc vs hoop"), use a comparison. If it is one thing changed ("folded, then spread"), use before/after.
- **Storyboard or simulation run?** If time is the axis and the learner should stop at named moments, use a storyboard.

## What every format still has to fit
- 60 seconds, predict → explore → reveal. At most 25 words of stage text and at most 90 reveal words. Readable on a 390 px phone with 44 px tap targets.
- Every number the question or reveal names must be reachable by pressing each control once. Prefer **chips at the named values** over sliders.
- Images (Life Hacks): one hero during predict. Before/after or comparison pairs go in the reveal. Ask through `company/design/illustration-requests/`.
