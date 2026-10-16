# Founder: every agent has onboarding, offboarding and a personal memory (F-39)

owner: founder · date: 2026-10-16 · class: org mechanism (all agents) · route: founder directive → tools-lead implements in tools/org (generator) → chief-of-staff-ceo-office reviews · recorded by: chief-of-staff

## Founder's words
> "Leonie ... did not read her onboarding and off boarding and probably she doesn't have personal memory, each agent should have these that is basics"

## What it means
1. **Onboarding:** each agent reads its role doc `company/roles/<role>.md` first, and the prompt that dispatches it must not replace that step.
2. **Personal memory:** each role has one file, `company/roles/memory/<role>.md`. It is the role's own notebook: lessons learned, standing context, mistakes not to repeat, open threads. The agent reads it at the start of every run, right after onboarding.
3. **Offboarding:** each run ends by appending a dated entry (≤ 12 lines) to its memory file: what it did, what it learned, what the next holder should know, what's open. Then the memory is compacted at the threshold in point 5.
4. The memory file is the role's only own writable file. It is not a single-writer file, and it never holds claims or verdicts; those stay in records.

## Compaction threshold (founder, 2026-10-16: "Memory have a threshold for compaction for all agents")
5. One threshold for every role, set in one place (tools/org, not per role file): when a role's memory passes **50 KB** (founder, 2026-10-16: "Increas to 50kb"; no line limit), it is compacted before the next run reads it. Compaction keeps the dated lessons learned, standing context, mistakes not to repeat and open threads, each still citing a file; it drops narrative and closed items into a dated archive file next to it (nothing is deleted). The target after compaction is ≤ 25 KB.
6. Enforced by the tool, not by goodwill: the memory tool compacts (or refuses to append and says "compact first") at the threshold, and `npm run check` warns on any memory file over it.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| Memory files can carry stale beliefs forward (testimony, not truth), the same risk as progress.md. | chief-of-staff | Open: entries are dated and cite files; the read step says "testimony, not truth"; Leonie's review checks this. |
| Parallel runs of the same role (builders, checkers) may write the same memory file at once. | chief-of-staff | Open: tools-lead decides an append-safe method (a per-run file merged by the CoS, or append-only with the run key). |
| Reading memory adds tokens to every run. | chief-of-staff | Open: cap at 50 KB (point 5); measure in the ledger after a week. |
