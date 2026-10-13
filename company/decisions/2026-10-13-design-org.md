# Decision: a Design org, and designers in the lesson pipeline

owner: chief-of-staff · date: 2026-10-13 · status: accepted (founder request); the process change is proposed to the founder

## Finding that triggered it
The company had design roles from day one (learning-designer, mockup-artist, pedagogy-critic, accessibility-reviewer) and dispatched each of them **0 times** for about 500 lessons. Builders designed every lesson themselves. Reviews keep finding what a design pass catches:
- crowded or clipped stages;
- overlapping labels;
- payoffs told rather than shown;
- reveal text that doesn't match the final stage;
- formats forced into one card when the idea needs steps.

## Decision
- **Design team** (`team: design`, reports to the head of product):
  - **Ines**, design lead: format catalogue, design system, design review;
  - **Rafael**, interaction designer: format and interaction specs per brief;
  - **Kiri**, visual designer: tokens, chart style, motion, with the accessibility reviewer;
  - the **mockup artist** moves from Studio to Design, reporting to the design lead.
- **The learning designer stays in Studio** (pedagogy: what to teach, the misconception, the question). Learning designer + interaction designer are the pair that designs a non-default lesson.
- **Format catalogue** (`company/design/formats.md`):
  - in use today: single card, simulation run, map explorer;
  - built by hand today: comparison, before/after, storyboard/scrub, debunk;
  - needing kit support first: multi-card sequence.
- **Every brief names a format.** Category leads' and sub-area managers' onboarding docs now say so.
- **Pipeline step 3, Design** (`ops/operating-loop.md`):
  - default formats go straight to a builder;
  - other or new formats, and hard briefs, get a pedagogy note, an interaction spec and a mockup before building;
  - design review runs after the learner review (new trigger in `rituals/triggers.json`).
- **HQ:** a Design studio on floor 2.

## Engineering implications (principal engineer and platform engineer)
- Kit components for comparison (`<Compare>`) and storyboard (`<Timeline>`) would replace hand-built versions. That is a shared-kit change (tier 1, or tier 2 if the API is broad).
- **Multi-card sequence:** keeping a single predict and a single reveal, with a stepper inside explore, should need **no contract change**. If sub-cards each want their own predict, that changes `Lesson.tsx`, which is constitutional, so it needs an amendment drafted by the evaluation steward.
- Every format must stay drivable by the QA path. The SPIKE-001 sandbox must support the stepper (frame sizing).

## Objections that travel
- **Cost:** a design pass adds about 15–30k tokens per non-default lesson. Mitigation: default formats skip it, and the design review samples 10%.
- **Speed vs quality:** the push to 500 was done without designers. The design pass applies to new briefs and to revisions from now on, not retroactively. Existing lessons get design review only when a review finding asks for it.
