# Founder ask: the R&D evaluation leaderboard in HQ

owner: hq-engineer (the page) · data owner: rnd-lead · date: 2026-10-17 · status: decided (whether)
class: product
route: founder → chief-of-staff (records, dispatches) → hq-engineer (builds) → rnd-lead (checks the page against `node tools/evolve.mjs board`)
recorded by: chief-of-staff

## What the founder said

> "We had also eval work like leaderboard, what happened to that?" … "I want it in hq"  (founder, conversation, 2026-10-17, after the chief of staff explained that the code-evolution leaderboard, `node tools/evolve.mjs board <project>`, has only ever been a CLI view)

## What is decided

- A read-only HQ page shows each R&D evolution project's leaderboard (today: knots), from committed data only (company/rnd/evolution/*.jsonl, each project's evolve.json, the generation notes). It shows the same ranking and numbers as `tools/evolve.mjs board`, including its warnings (e.g. mixed bench seeds), each candidate's tests, size, parents, and which candidate the kit uses.
- Unchanged: the evaluator stays fixed and owned by rnd-lead; the page scores nothing and changes nothing.

## Objections

- **chief-of-staff:** a leaderboard on show invites optimising for the number. **Answer:** the page shows the evaluator's own warnings and the promoted candidate next to the top score (they differ today), and links each generation's written selection note, so the number is never read without its reasoning.
