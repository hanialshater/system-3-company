# Decision: portfolio manager in the CEO office; one triage process with GitHub as an intake

owner: chief-of-staff-ceo-office · date: 2026-10-13 · status: accepted (founder request)

## Context
125 open board items, none with a priority, 47 in "next" (so "next" means nothing), no triage owner, no written intake path, and no way for tickets from outside the company to arrive. The founder asked whether tickets could come from GitHub, whether we have triage, and for a portfolio manager in the CEO office "to collect, review and approve all current items".

## Decision
- New role `portfolio-manager` (Odette), reporting to the CEO office chief of staff. It owns intake, triage and approval of items, not doing the work or dispatching it.
- `company/ops/triage.md` defines the intake paths, P1–P4 and the per-item triage steps. `tools/triage.mjs` keeps priority and triage notes on board items as extra fields. The protected CLI ignores unknown fields, so no amendment is needed.
- GitHub issues are an intake path: an issue form (`.github/ISSUE_TEMPLATE/ticket.yml`), mirrored to the board by the portfolio manager. The board stays the single source of work; GitHub is not a second board.

## Objections, and answers
- *Leonie warned against adding roles to fix process problems.* Answer: the process is written first (`triage.md`), and the role exists because nobody owns it today. Sunset: if after two WBRs triage is still done by the operating chief of staff, or untriaged items keep growing, merge the role into the CEO office chief of staff.
- *Approving items is a form of deciding work, which belongs to the operator.* Answer: the portfolio manager ranks and approves what may be worked on. The operator still chooses what to dispatch, from the top of "next".

## Would be wrong if
After two WBRs, more than 20% of open items are untriaged, or "next" holds more than 25 items.
