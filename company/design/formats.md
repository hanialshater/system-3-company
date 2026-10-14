# Lesson format catalogue

owner: design-lead (Ines) · status: v0 (2026-10-13). Every brief names one of these formats. A new format needs a spec, a reference lesson and kit support before builders may use it.

**For category managers:** which format fits which kind of concept, with examples per domain: [`formats-for-category-managers.md`](formats-for-category-managers.md).

All formats keep the lesson contract (`src/kit/Lesson.tsx`, constitutional): **predict → explore → reveal**, with spaced recall. A format decides what the explore stage looks like and how the learner moves through it.

| Format | When to use | Anatomy | Kit support | Reference lessons |
|---|---|---|---|---|
| **Single card** (default) | One mechanism, one picture, a few controls | One stage, ≤ 6 controls, milestones on the key state | ✅ today | why-seven-wins, mercator-greenland |
| **Simulation run** | Chance, populations, anything that needs many trials | Run / step buttons, seeded (mulberry32, disclosed), live tallies, the learner's own run quoted in the reveal | ✅ today | drunk-walk-distance, herd-immunity |
| **Agent-based simulation (NetLogo-style)** *(approved with changes by design lead 2026-10-13; limited to the two Schelling lessons until the reference passes design review)* | Emergent behaviour from simple agent rules: a small rule per agent produces a pattern nobody asked for, and agents react to each other (not independent trials) | One grid world (≤ 50×50, cells ≥ 6 px; shape + hue per group, hollow/filled per state); rule line with the active value; seed shown; New mix · Step · Run · parameter chips (≤ 7); Run computes then replays in ≤ 400 ms; metric chart over ticks with non-overlapping end labels; reveal pins the quoted run. Full rules: `company/design/reviews/2026-10-13-design-lead-decisions.md` §1 | 🟡 by hand in the first two lessons; promote a shared `src/kit/abm` engine after both ship (rule of two, with an engineering review) | mild-preferences-sharp-divides (Economics, reference once design review passes), schelling-on-new-york (Geography); neither built yet |
| **Map explorer** | Geography, projections, distances | `WorldMap` with a named projection, move-the-thing controls | ✅ today (geo kit) | mercator-greenland, three-giants-in-africa |
| **Side-by-side comparison** | Two methods, two rules, two cases (A vs B) | Two panels sharing one control, the difference highlighted | 🟡 by hand in Demo.tsx; a kit `<Compare>` is proposed | lru-eviction-order, race-down-the-ramp |
| **Before / after toggle** | One change with a visible effect | One stage, a toggle, an "after" that persists into the reveal | 🟡 by hand | heavy-but-floats, point-one-is-26-percent |
| **Multi-card sequence** | An idea that needs 2–4 steps, each with its own picture | 2–4 sub-cards inside the explore phase, swiped or stepped; milestones per sub-card | 🔴 needs kit support (a stepper inside explore; no contract change if predict/reveal stay single) | none yet |
| **Storyboard / scrub** | A process over time (orbits, epidemics, algorithms) | A timeline scrubber plus key frames; the reveal names frames the learner visited | 🟡 by hand with a slider; a kit `<Timeline>` is proposed | coaster-track-shape, waves-return |
| **Debunk** (Life Hacks) | A popular claim tested on the stage | The claim, the test, the result, then the mechanism; the safety class is shown | 🟡 by hand | none yet |

## Rules for every format
- Every value named in the question or reveal is reachable on the QA path (each control pressed once in DOM order). Controls exist from the first render.
- The stage at reveal time shows what the reveal describes. No reset that empties it.
- ≤ 25 words of stage text at any moment. The reveal text is ≤ 120 words (`demo-standard.md` is the gate). Aim for ≤ 90. At 390 × 844 it must pass `tools/reveal-fit.mjs`: fit or scroll, and no thumb. (Design review 2026-10-14, `reviews/2026-10-14-design-review-schelling-v3.md` D3.)
- **Counting stage words** (same review, D4a). Count every word that contains a letter in:
  - captions;
  - rule lines, including a rule written as a slider or toggle label;
  - legends, axis titles, and headers over controls.

  Do not count:
  - numerals and values;
  - button labels;
  - chips that name a value (`2×2`, `30%`);
  - readout labels of ≤ 3 words attached to a number (`Round`, `would move`);
  - the explore hint panel.

  An exception for one lesson is a recorded decision that names the exact lines it covers.
- The visual style follows `company/design/system.md`.
- **Illustrations** (design lead, 2026-10-13): the 1:1 hero shows during predict only (≤ 96×96, top right of the stage, removed on unlock; it never covers the question's object or a label). Before/after and comparison pairs (4:3) go **in the reveal**, below the text, two frames ≤ 160 px wide side by side. Never two pictures beside a live diagram. This rule covers illustration files placed in the `reveal` slot. Some stages pin two of the learner's own runs side by side at the reveal, replacing the live picture. That pair is the stage, not an illustration pair, so it sits where the stage sits (above the text):
  - draw it as one SVG with one `viewBox`;
  - show no other picture beside it;
  - it must pass reveal-fit with no thumb.

  (Design review 2026-10-14, schelling v3, D1.)
- **Tap targets ≥ 44 px.** The kit's `.control` is about 34 px today; the fix is requested from the platform engineer. Until it lands, lessons add the shared module class `.tap { min-height: 44px; }` and nothing else.
- Labels on charts never overlap or clip at 390 px: nudge, move into a gutter, or use a legend.
- **ABM boundary** (design lead, 2026-10-14): a lesson is agent-based only if it has > 20 agents or a grid world, re-rolled randomness in the agent rule or placement, or an outcome read off an aggregate metric over ticks. Otherwise it is single card (with Step) or simulation run. A deterministic threshold cascade on ≤ 12 nodes is single card with Step.
- **Network diagrams** (node-link graphs) follow the interim network-stage rules until a kit component exists: ≤ 12 tappable nodes, ≤ 10 tappable edges (midpoint handles), 44 px targets ≥ 48 px apart, state by fill/shape/line style before colour, > 20 nodes = untapped texture. Full rules: `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2. A bipartite graph whose every pair carries a value the learner must read may be drawn as a matrix (one side as rows, the other as columns, values in the cells); it is a network-stage variant, not a new format (design review 2026-10-14, `company/design/reviews/2026-10-14-design-review-ncm-specs.md` §2).

## Changing this catalogue
- **New format:** the design lead writes a spec, the interaction designer builds a reference with a builder, and design review approves it.
- **Kit support:** the platform engineer implements it; the principal engineer reviews it if it touches the kit or the contract (tier 2).
