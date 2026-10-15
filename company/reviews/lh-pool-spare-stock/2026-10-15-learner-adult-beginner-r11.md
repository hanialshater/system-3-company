*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-pool-spare-stock
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Account for transferable surplus before computing external replenishment.)
Screenshots seen: yes (artifacts/walkthroughs/lh-pool-spare-stock/sheet.png, recorded 2026-10-15T21:36, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Local only"; tapped Test A, Test B; slid Required 10 to 12; opened reveal.

1. **Where understanding first broke: the question is easier than the hook.** The hook asks "how many new units are missing?", which is a number I would have to work out (3). The question instead asks which external order is smaller, local-only or pooled. If five free units can be moved at no cost, pooling obviously needs fewer new ones. No stakes.
2. **"max(0,(10-2))" is outside my boundary.** "10 needed − 2 here" would say it.
3. **The labels are abstract.** "Local only" and "Pooled", and readouts in "items" when the question says "units". The pictures (boxes on shelves) are decorative.
4. **Does the reveal answer my question?** Yes in substance: pooling changes the shortage from "needed minus two" to "needed minus seven", and it depends on the other units really being free. That answers the hook's question.

Fixes (for the builder):
- Ask the hook's question as the prediction ("how many new units must you order?" 8, 3, 0).
- Plain working; "units" throughout.

Verdict reason: the prediction asks which of two orders is smaller where the answer is obvious, so the hook's real question (how many are missing) is never put to the learner.

## After reading the brief (meta.json)

- Objective: account for transferable surplus before computing replenishment. The stage computes it; the learner is never asked to (finding 1).
- Fix route: demo-builder (numeric question, working).
