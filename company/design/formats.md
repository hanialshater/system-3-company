# Lesson format catalogue

owner: design-lead (Ines) · status: v0 (2026-10-13). Every brief names one of these formats. A new format needs a spec, a reference lesson and kit support before builders may use it.

All formats keep the lesson contract (`src/kit/Lesson.tsx`, constitutional): **predict → explore → reveal**, with spaced recall. A format decides what the explore stage looks like and how the learner moves through it.

| Format | When to use | Anatomy | Kit support | Reference lessons |
|---|---|---|---|---|
| **Single card** (default) | One mechanism, one picture, a few controls | One stage, ≤ 6 controls, milestones on the key state | ✅ today | why-seven-wins, mercator-greenland |
| **Simulation run** | Chance, populations, anything that needs many trials | Run / step buttons, seeded (mulberry32, disclosed), live tallies, the learner's own run quoted in the reveal | ✅ today | drunk-walk-distance, herd-immunity |
| **Agent-based simulation (NetLogo-style)** *(proposed 2026-10-13, design lead to approve)* | Emergent behaviour from simple agent rules: a small rule per agent produces a pattern nobody asked for | Grid or map world; agents with one or two rules; parameter sliders; run / step / reset; seeded RNG disclosed (mulberry32); live metric chart over ticks; the learner's own run quoted in the reveal | 🟡 by hand in the first two lessons; promote a shared `src/kit/abm` engine after both ship (rule of two, with an engineering review) | mild-preferences-sharp-divides (Economics), schelling-on-new-york (Geography); neither built yet |
| **Map explorer** | Geography, projections, distances | `WorldMap` with a named projection, move-the-thing controls | ✅ today (geo kit) | mercator-greenland, three-giants-in-africa |
| **Side-by-side comparison** | Two methods, two rules, two cases (A vs B) | Two panels sharing one control, the difference highlighted | 🟡 by hand in Demo.tsx; a kit `<Compare>` is proposed | lru-eviction-order, race-down-the-ramp |
| **Before / after toggle** | One change with a visible effect | One stage, a toggle, an "after" that persists into the reveal | 🟡 by hand | heavy-but-floats, point-one-is-26-percent |
| **Multi-card sequence** | An idea that needs 2–4 steps, each with its own picture | 2–4 sub-cards inside the explore phase, swiped or stepped; milestones per sub-card | 🔴 needs kit support (a stepper inside explore; no contract change if predict/reveal stay single) | none yet |
| **Storyboard / scrub** | A process over time (orbits, epidemics, algorithms) | A timeline scrubber plus key frames; the reveal names frames the learner visited | 🟡 by hand with a slider; a kit `<Timeline>` is proposed | coaster-track-shape, waves-return |
| **Debunk** (Life Hacks) | A popular claim tested on the stage | The claim, the test, the result, then the mechanism; the safety class is shown | 🟡 by hand | none yet |

## Rules for every format
- Every value named in the question or reveal is reachable on the QA path (each control pressed once in DOM order). Controls exist from the first render.
- The stage at reveal time shows what the reveal describes. No reset that empties it.
- ≤ 25 words of stage text. The reveal is ≤ 90 words and fits a phone card.
- The visual style follows `company/design/system.md`.

## Changing this catalogue
- **New format:** the design lead writes a spec, the interaction designer builds a reference with a builder, and design review approves it.
- **Kit support:** the platform engineer implements it; the principal engineer reviews it if it touches the kit or the contract (tier 2).
