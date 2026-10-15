*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-fixed-energy-charge
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Compare fixed and usage-dependent charges in a stated bill model.)
Screenshots seen: yes (artifacts/walkthroughs/lh-fixed-energy-charge/sheet.png, recorded 2026-10-15T21:33, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "A"; tapped Test A, Test B; slid Usage 40 to 60kWh; opened reveal.

1. **Where understanding first broke: the hook answers the prediction.** "A lower per-kWh price can still produce a higher total at small usage" sits right above a question about a lower per-kWh tariff at a small usage. The real pull (A has the cheaper rate, so A is cheaper) is a good trap, but the subtitle has already told me it is wrong.
2. **What the prediction felt like.** Without the hook it would be genuine: €0.20 looks cheaper than €0.30. With the hook it is a reading test.
3. **The charts help.** A's line starts above zero (the €10 fee) and B's starts at zero; that is the idea in one picture. The "€42" at the top of both axes reads like a value rather than a scale.
4. **Does the reveal answer my question?** Yes: a lower rate does not erase a fixed charge; they match at 100kWh. That is the rule I needed, and it says real tariffs can have other terms.

Fixes (for the builder):
- Rewrite the hook as a question that does not give the direction (for example "Cheaper per unit, but with a monthly fee: which bill is lower?").

Verdict reason: the subtitle gives away the answer to the prediction, so the learner's real belief is never tested.

## After reading the brief (meta.json)

- Objective: compare fixed and usage-dependent charges. The stage and reveal deliver it; the hook spoils the prediction (finding 1).
- Fix route: demo-builder (hook wording).
