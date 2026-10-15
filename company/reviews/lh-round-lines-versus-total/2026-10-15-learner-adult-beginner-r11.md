*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-round-lines-versus-total
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Compare line-level rounding with aggregate rounding under a stated convention.)
Screenshots seen: yes (artifacts/walkthroughs/lh-round-lines-versus-total/sheet.png, recorded 2026-10-15T21:37, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Each line"; tapped Test A, Test B; slid Lines 3 to 5; opened reveal.

1. **The prediction is genuine.** My instinct is "rounding is rounding, it comes out the same", so "Equal" is the honest pull. The hook says they "can differ" but not which is higher, so I still had to think about €0.335 rounding up to €0.34 three times.
2. **The stage confirms it.** €1.02 against €1.01; at five lines €1.70 against €1.68, so the gap grows with the number of lines. "round(0.335)" is readable enough for me.
3. **Where my boundary stops (minor).** "€1.7" should be "€1.70". "Full scale: €3.4" and "toy rule: nearest cent, half upward" are compact; "half upward" I understood only from the reveal. Receipts are decorative.
4. **Does the reveal answer my question?** Yes: three €0.34 lines make €1.02; €1.005 rounded once is €1.01. "Rounding loses information at each application" is the idea. It honestly says real billing has its own rules.

Notes (for the builder, not blocking):
- Two-decimal money; plain words for "Full scale".

Verdict reason: the prediction tests the "rounding is harmless" instinct and the reveal explains the cent from the numbers on stage.

## After reading the brief (meta.json)

- Objective: compare line-level and total rounding under a stated convention. Delivered.
- Notes route: demo-builder; not blocking.
