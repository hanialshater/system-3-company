*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-committed-stock
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Separate physical inventory from uncommitted availability.)
Screenshots seen: yes (artifacts/walkthroughs/lh-committed-stock/sheet.png, recorded 2026-10-15T21:37:06.886Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Free"; tapped Test A; Test B; slid On-shelf 10 -> 12; opened reveal.

1. **The hook asks the right question, the predict step asks a different one.** The hook ("Six units are promised. Can every unit on the shelf serve a new request?") is a good question. But the prediction is "Compare free and physical counts. Which count is smaller?" Free is physical minus committed, so it is always smaller or equal; there is nothing to predict.
2. **Where understanding first broke: "max(0,(10-6))".** Spreadsheet notation in the working. And the zero floor never matters on the path (6 committed, 10 or 12 on shelf).
3. **The mistake is never shown.** The everyday error is promising the same unit twice. Nothing on stage lets me hand a promised unit to a new request and see a conflict.
4. The reveal sentence "Commitments do not make the objects disappear, but they change which requests those objects can satisfy" is a good, plain answer to the hook's question.
5. Drawings (lists with arrows and boxes) do not distinguish promised from free units.

Verdict reason: the prediction compares a count with itself minus six, which is a gimme, and the stage never shows a promised unit being double-booked.

## After reading the brief (meta.json)

- Objective "separate physical inventory from uncommitted availability" is stated clearly in the reveal; the prediction compares physical with physical-minus-six, which is not a test of it (finding 1).
- Fix route: demo-builder (ask "how many can a new request take?" with 10 as the tempting wrong answer; replace max(0, …) with words).
