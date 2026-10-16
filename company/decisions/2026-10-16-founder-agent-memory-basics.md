# Founder: every agent has onboarding, offboarding and a personal memory (F-39)

owner: founder · date: 2026-10-16 · class: org mechanism (all agents) · route: founder directive → tools-lead implements in tools/org (generator) → chief-of-staff-ceo-office reviews · recorded by: chief-of-staff

## Founder's words
> "Leonie ... did not read her onboarding and off boarding and probably she doesn't have personal memory, each agent should have these that is basics"

## What it means
1. **Onboarding:** each agent reads its role doc `company/roles/<role>.md` first, and the prompt that dispatches it must not replace that step.
2. **Personal memory:** each role has one file, `company/roles/memory/<role>.md`. It is the role's own notebook: lessons learned, standing context, mistakes not to repeat, open threads. The agent reads it at the start of every run, right after onboarding.
3. **Offboarding:** each run ends by appending a dated entry (≤ 12 lines) to its memory file: what it did, what it learned, what the next holder should know, what's open. Then the memory is compacted when it passes about 150 lines, keeping lessons and dropping the narrative.
4. The memory file is the role's only own writable file. It is not a single-writer file, and it never holds claims or verdicts; those stay in records.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| Memory files can carry stale beliefs forward (testimony, not truth), the same risk as progress.md. | chief-of-staff | Open: entries are dated and cite files; the read step says "testimony, not truth"; Leonie's review checks this. |
| Parallel runs of the same role (builders, checkers) may write the same memory file at once. | chief-of-staff | Open: tools-lead decides an append-safe method (a per-run file merged by the CoS, or append-only with the run key). |
| Reading memory adds tokens to every run. | chief-of-staff | Open: cap at ~150 lines; measure in the ledger after a week. |
