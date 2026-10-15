*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-round-replenishment
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Apply package rounding to the shortage rather than total demand.)
Screenshots seen: yes (artifacts/walkthroughs/lh-round-replenishment/sheet.png, recorded 2026-10-15T21:37, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Box order"; tapped Test A, Test B; slid Required 12 to 14; opened reveal.

1. **Where understanding first broke: the prediction does not ask the hook's question.** The hook asks "Does twelve required mean ordering two boxes?", which is a good question. The prediction asks which is larger, the box order or the exact gap. A rounded-up box order is never smaller than the gap, so there is nothing to get wrong.
2. **The example cannot show the mistake the reveal names.** The reveal warns against "rounding the total requirement before subtracting stock". At 12 required, both ways give two boxes (12 ÷ 6 = 2; 9 ÷ 6 rounds up to 2). At 14, rounding first gives 3 boxes (18), minus 3 in stock leaves 15, which is not a whole number of boxes, so I could not tell what order the wrong method would even produce. The wrong method is never shown on stage, so I cannot see why it is wrong.
3. **The working is outside my boundary.** "(6×ceil((max(0,(12-3))÷6)))" uses "ceil" and "max". "12 − 3 = 9, round up to 2 boxes = 12" would say it.
4. **Does the reveal answer my question?** It gives the rule (subtract stock, then round the shortage up to boxes). It does not answer the hook's yes/no question in words ("Yes, two boxes, because you still need 9").

Fixes (for the builder):
- Ask "How many boxes do you order?" at a count where the wrong method differs (for example 13 required with 3 in stock: 2 boxes, not 3).
- Plain working; answer the hook's question in the reveal.

Verdict reason: the prediction has no plausible wrong answer and the example never shows the wrong method the reveal warns against.

## After reading the brief (meta.json)

- Objective: apply package rounding to the shortage rather than total demand. Confirms finding 2: the example never shows the two methods disagreeing, so the objective's contrast is not visible.
- Fix route: demo-builder (example numbers, question, working).
