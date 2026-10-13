# Decision: R&D and Research orgs on floor 4, reporting to a VP of R&D in the CEO office

owner: vp-rnd · date: 2026-10-13 · status: accepted (founder request)

## Context
The founder asked for a new floor with two orgs, R&D and Research, reporting to a VP of R&D in the CEO office. The first task is a JavaScript knot theory library for knot theory lessons.

Before this, new capabilities were built inside lessons (Schelling's engine) or not at all, and the one researcher sat in the studio under the learning designer.

## Decision
- **New roles:**
  - vp-rnd (Vera), in the CEO office, reporting to the founder.
  - The **R&D** org: rnd-lead (Bram) and rnd-engineer (one per project).
  - The **Research** org: research-lead (Wen) and research-scientist (one per question).
- The existing `researcher` moves into Research, under the research lead.
- HQ gets **floor 4**: the R&D lab, the Research lab, the two leads' offices, and the seminar room for the R&D Review.
- **Lab to kit:** code incubates in `src/lab/`, which lessons may not import. It is promoted to `src/kit/` only by an EDD and the principal engineer's review.
- **No new npm dependencies.**
- **First bet:** the knot theory library (`src/lab/knots/`).

## Objections, and answers
- *The CEO office keeps growing.* Answer: the VP sits there. The orgs sit on floor 4 and do no production work.
- *R&D could build frameworks nobody uses.* Answer: every bet names its user and an exit criterion, and the R&D Review can stop it.

## Would be wrong if
After two R&D Reviews, no lab library has been promoted or used, and no research note has changed a brief.
