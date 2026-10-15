*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-idle-versus-active
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Compare separate operating-state energy contributions.)
Screenshots seen: yes (artifacts/walkthroughs/lh-idle-versus-active/sheet.png, recorded 2026-10-15T21:34, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Active"; tapped Test A, Test B; slid Days 5 to 7; opened reveal.

1. **The prediction is genuine.** The hook asks whether a small load that runs many hours can beat a larger one, without saying which way. 3W for 22h against 60W for 2h is not something I can feel, so I have to commit.
2. **The stage lets me check.** (60×2×5)÷1,000 and (3×22×5)÷1,000 are readable; 0.6 against 0.33kWh. The two charts both rise, B more slowly.
3. **Where my boundary stops (minor).** Both chart axes are labelled "3.6kWh" at the top, which reads like a value. The caption names "€0.30/kWh" but no cost is ever shown. The reveal says "your stage now uses 7" without "days".
4. **Does the reveal answer my question?** Yes: multiply each power by its own hours before comparing; idle adds energy but here stays below active use. It is careful to say this depends on the stated numbers, which is honest; I would like one line on when idle would win (for example a 10W idle), but it is not needed for the question asked.

Notes (for the builder, not blocking):
- Drop the unused tariff or show the cost; plain axis labels; "7 days".

Verdict reason: the prediction is a real uncertainty and the reveal answers it from the expressions the stage showed.

## After reading the brief (meta.json)

- Objective: compare separate operating-state energy contributions. Delivered: each power times its own hours, compared.
- Notes route: demo-builder; not blocking.
