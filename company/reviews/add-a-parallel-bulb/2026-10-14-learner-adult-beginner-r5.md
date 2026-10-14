*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): add-a-parallel-bulb
lesson version: v1
boundary: adult beginner; knows current flows round a loop, volts/amps/ohms as words; assumes bulbs "share" a fixed current.
Screenshots seen: yes (artifacts/walkthroughs/add-a-parallel-bulb/sheet.png, 4 frames)
Verdict: launch

## 1. From the artifact

- Predict: the hook ("do they share, or does the battery pay more?") names both mental models without favouring one. 0.5 A (sharing) is the natural beginner answer, and I picked it. The locked stage shows the circuit with every meter at "?". Nothing leaks.
- Explore: one tap ("Bulb 2") gives battery 2.0 A, with each bulb branch at 1.0 A and both bulbs glowing the same. Bulb 3 gives 3.0 A, with every branch still at 1.0 A. "Do they share?" is answered on stage: no, each branch keeps 1.0 A and the total adds.
- Where it is thinnest: the one-bulb baseline (battery 1.0 A, bulb 1 lit) is never on stage. In the locked frame bulb 1 is unlit with "?", and the first explore frame already has two bulbs. The before/after comparison the reveal leans on ("took the meter from 1.0 A to 2.0 A") has its "before" only in the stem's text. The reason (each branch gets the full 6 V) is told. No per-branch voltage is shown, so the "why" is reveal-only. For my boundary, the stage gives the what and the reveal gives the why.
- The gate opens after one tap. That is fine, but bulb 3, which makes the adding pattern obvious, is optional.
- Reveal: it answers my question. "The pair acts like 3 Ω" is a new idea dropped in parentheses. Harmless.

## 2. Earlier findings (v1 review)

1. Bulb 1 shows "?" and looks unlit in the locked stage: **not fixed**.
2. Full voltage per branch is told, never shown: **not fixed**.
3. "The pair acts like 3 Ω" has no stage support: **not fixed** (minor).
4. The panel says "Switch in bulb 2" after bulb 3 is on: **not fixed** (minor).

Note: meta.json still says version 1. I saw no visible change since the v1 review.

## 3. New findings

- Should fix (carried): show bulb 1 lit with battery 1.0 A in the locked stage (the stem already gives these numbers, so it leaks nothing). Then the jump to 2.0 A is a before/after the learner sees.
- Minor (carried): label each branch "6 V across".
- No FATAL. The battery meter adding up while each branch holds 1.0 A breaks the "share" model on stage.
