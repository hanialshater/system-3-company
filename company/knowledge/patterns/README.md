# Pattern language

Last pattern review: 2026-10-14 ([record](../../rituals/records/2026-10-14-pattern-review.md)); before it, 2026-10-12 ([record](../../rituals/records/2026-10-12-pattern-review.md)). Confidence is earned only on cases a pattern did not produce; on that day no pattern had such a case, so no star was added and four were removed.

| Confidence | Pattern | One line | Before → after (2026-10-12) |
|---|---|---|---|
| * | [predict-before-reveal](predict-before-reveal.md) | Commit to a guess before anything moves; the guess must be able to be wrong | ** → * |
| * | [artifact-before-account](artifact-before-account.md) | Evaluators use the lesson before reading why it was built that way | ** → * |
|   | [disclose-chosen-seeds](disclose-chosen-seeds.md) | Say when a seed was picked to show the expected result |
| * | [earn-the-reveal](earn-the-reveal.md) | The reveal unlocks only after the learner has seen the key state | * → * (cases 8 → 17) |
| * | [objection-travels](objection-travels.md) | Unresolved objections go with the decision | * → * (2 cases, 2 gaps) |
|   | [numbers-from-the-stage](numbers-from-the-stage.md) | Question, reveal and recall numbers come from the same code as the stage | new, unstarred |
|   | [label-the-model-on-the-stage](label-the-model-on-the-stage.md) | Say it is a model where the learner meets it, not only in the reveal | new, unstarred |
|   | [teach-the-payoff](teach-the-payoff.md) | Find the step that makes the idea worth having | * → (one anecdote) |
|   | [remove-the-easy-path](remove-the-easy-path.md) | When versions converge, ban the attractor | * → (no cases) |
|   | [pairwise-not-scores](pairwise-not-scores.md) | Which would you give a first-time learner, and why | * → (no cases) |
|   | [simulated-learners-find-problems](simulated-learners-find-problems.md) | They find problems; they do not show learning | open |
|   | [keep-a-strange-branch](keep-a-strange-branch.md) | Fund an alternative as far as one decisive test | open |

Added 2026-10-14, all unstarred (same-day cases, simulated readers; see the [record](../../rituals/records/2026-10-14-pattern-review.md)):

|   | Pattern | One line |
|---|---|---|
|   | [draw-the-base](draw-the-base.md) | Draw the amount the second change acts on, not only the total |
|   | [fit-means-legible](fit-means-legible.md) | "On screen" includes readable; shrink is not fit |
|   | [measure-the-fit](measure-the-fit.md) | Fit is measured at 390x844 over real lessons, not estimated |
|   | [fresh-checker-for-drafted-wording](fresh-checker-for-drafted-wording.md) | A new checker instance verifies wording a checker drafted |
|   | [reword-to-the-stage](reword-to-the-stage.md) | When the source cannot be opened, say what the stage shows |
|   | [preset-buttons](preset-buttons.md) | QA presses each control once, so milestones need presets |
|   | [data-driven-engines](data-driven-engines.md) | Engine plus data scales lesson count, and its defects |
|   | [allocate-shared-names](allocate-shared-names.md) | Concurrent agents need allocators for IDs and folders |
|   | [gate-expensive-actions](gate-expensive-actions.md) | Filter and approve deploys; a cost control, not a quality gate |

Extended 2026-10-14 (confidence unchanged): earn-the-reveal, predict-before-reveal, pairwise-not-scores, numbers-from-the-stage, objection-travels, artifact-before-account. Retired: nothing (no pattern contradicted; superseded entries are annotated, not deleted).

`**` is not available to any pattern until a case that it did not produce supports it; `product/demo-standard.md` still prints the old marks and needs updating (owner: head-of-product).
