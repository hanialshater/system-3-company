*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-purchase-plus-running
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Combine an upfront amount and repeated operating charges without assuming the same winner at every horizon.)
Screenshots seen: yes (artifacts/walkthroughs/lh-purchase-plus-running/sheet.png, recorded 2026-10-15T21:36, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "A"; tapped Test A, Test B; slid Years 2 to 4; opened reveal.

1. **The prediction has real tension.** The hook says a higher upfront price "can cross" a lower one, which pulls me toward B; at two years A is still cheaper (€152 against €176). I had to work it out rather than read it off.
2. **The stage shows the crossing.** At four years B is cheaper (€212 against €224). The expressions (80+(120×0.3×2)) are readable for me once I see 0.3 is the price per kWh.
3. **Where my boundary stops (minor).** The two cost lines are on separate small charts, so I cannot see them cross; one chart with both lines would show the crossing point. Both axes read "€368", which looks like a value. The reveal does not say when they cross (a little after three years), which is the next thing I wanted to know.
4. **Does the reveal answer my question?** Yes: add the upfront price to the running costs; A starts lower, B's running cost grows more slowly, so B catches up. The caveat (no repairs, lifespan, discounting; not a recommendation) is clear.

Notes (for the builder, not blocking):
- Put both lines on one chart; name the crossing ("about 3 years 4 months").

Verdict reason: the prediction is a real judgement and the reveal explains both the two-year answer and why it reverses later.

## After reading the brief (meta.json)

- Objective: combine upfront and running costs without assuming the same winner at every horizon. Delivered: the slider to four years reverses the winner and the reveal explains why.
- Notes route: demo-builder; not blocking.
