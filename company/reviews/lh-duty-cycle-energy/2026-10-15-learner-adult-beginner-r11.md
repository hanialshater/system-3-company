*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-duty-cycle-energy
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Use a stated duty fraction rather than treating rated power as continuous.)
Screenshots seen: yes (artifacts/walkthroughs/lh-duty-cycle-energy/sheet.png, recorded 2026-10-15T21:32, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Quarter-on"; tapped Test A, Test B; slid Hours 8 to 10h; opened reveal.

1. **Where understanding first broke: the hook.** "Should every hour use full power?" I did not understand what it was asking me to doubt. The lesson is apparently about estimating energy from a rated power, but the hook does not say so.
2. **What the prediction felt like.** No stakes. Something that runs a quarter of the time uses less than something that runs all the time; there is no plausible wrong answer. The mistake the title suggests (multiplying rated power by all the hours) is not something I am asked to commit to.
3. **Stage labels confuse.** Both charts carry "2.4kWh" at the top and "0→8h" below, but the readouts say 0.2 and 0.8kWh, so the 2.4 looks like a value. The caption names "€0.30/kWh" but no cost is ever shown.
4. **The reveal uses words outside my boundary.** "Nameplate-sized number", "on-time fraction" and "toy model" are not in my vocabulary.
5. **Does the reveal answer my question?** It states the rule (hours × fraction on × power), which is right, but the question I was asked had no misconception for it to correct.

Fixes (for the builder):
- Ask the estimate question: "A 100W device runs a quarter of each hour. Over 8 hours, how much energy?" with 0.8kWh (rated × hours) as the trap.
- Plain words for "nameplate"; drop the unused €0.30/kWh or show the cost.

Verdict reason: the prediction compares on-a-quarter with always-on, which no beginner gets wrong, so the rated-power-times-hours error is never tested.

## After reading the brief (meta.json)

- Objective: use a stated duty fraction rather than treating rated power as continuous. The "treat it as continuous" error is option B's scenario, not a tempting answer, so the objective's misconception is not tested (finding 2).
- Fix route: demo-builder (question, hook, reveal vocabulary).
