# How product management works here

owner: head-of-product

Product management is how we decide what should exist, and how we keep each decision attached
to its reasons so that a worker who was not in the room can tell when a line stops being true.

## The artifacts, smallest to largest

| Artifact | Who writes | Where | Must contain |
|---|---|---|---|
| **Brief** (one lesson) | category manager | board item + `meta.json` brief fields | concept, audience boundary, misconception, why this one next |
| **Design note** | learning designer | `reviews/<slug>/design.md` | prediction, interaction, what to notice, reveal script |
| **PRD** (a feature or programme) | head of product | `product/prds/PRD-<n>-<slug>.md` | problem, users, non-goals, requirements, committed predictions, would_be_wrong_if, rollout, owner |
| **Decision record** | the decision's owner | `decisions/<date>-<slug>.md` | context, options, decision, owner, **objections** with status |
| **Experiment** | analytics steward | `experiments/EXP-<n>-<slug>.md` | hypothesis, committed prediction **before** results, baseline that may win, would_be_wrong_if |
| **OP** | head of product + CMs | `rituals/records/<date>-op-planning.md` | goals, allocation, exploration budget, what we won't do |

## Rules

1. **Recognition before specification.** For lessons, build cheap versions and look before writing long specs. For platform features, write the PRD first: plumbing is expensive to undo.
2. **Committed predictions.** Anything we will judge by a number states the number's meaning, period and refutation condition *before* the result.
3. **The simpler baseline gets to win.** Every experiment includes "do less" as an arm when it is plausible.
4. **Feathers stand next to local evidence.** An idea that worked elsewhere is a hypothesis here.
5. **Purpose vs evidence.** If a disagreement is about what matters, it goes to the founder. Do not request more evidence to avoid naming a conflict over purpose.
6. **No "noted".** Every objection gets a status: accepted, rejected with reason, open with budget, or superseded.

## Lifecycle of a lesson

`draft` → (design, build, local QA) → `review` → (fact-check, learner review, pairwise, a11y, QA record) → Launch Review → `published` → (revisit data, real learners) → keep / revise (new version) / `retired`.

`version` in `meta.json` increments when the idea or interaction changes, not for typo fixes.
