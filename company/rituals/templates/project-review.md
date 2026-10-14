# Project Review (major-project approval forum): {{date}}

chair: founder · secretary: portfolio-manager · record: `company/rituals/records/{{date}}-project-review.md`
system: company/ops/token-budget.md · register: company/ops/projects.json · decision: company/decisions/2026-10-14-founder-token-budget-and-project-approval.md

Trigger (company/rituals/triggers.json): a `proposal` event in the `boardroom` room
(`node tools/ledger.mjs propose --project=<id>`), or 168 hours since the last review.
A major project (token-budget.md section 6) takes no new dispatches until this forum approves it
(`node tools/ledger.mjs gate` exits 1). The forum does **not** override deploy approval, protected
paths and amendments, publish gates, engineering review, or review independence. It decides only
whether an investment is worth its tokens, and on what terms.

{{snapshot}}

## Members

| Seat | Role | Present / written position / absent |
|---|---|---|
| Chair | founder | |
| VP | vp-rnd | |
| VP | vp-marketing (once the role exists) | |
| Chief | chief-of-staff | |
| Chief | chief-of-staff-ceo-office | |
| PE | principal-engineer | |
| PE | principal-engineer-ops | |
| PE | principal-pm-verticals | |

**Quorum:** the founder, plus at least 4 of the other members, including at least one VP, one chief and
one PE. A written position filed in this record before the session counts towards quorum. A member who owns
or wrote the proposal presents it, and their position does not count towards quorum for that item.

**Decision rule:** each member counted in the quorum states **go**, **go with changes** (say which), or
**object** (with its kind: evidence or purpose). The founder then decides: approved, approved with changes,
returned (with what is missing), or killed. A PE's evidence objection on cost or feasibility must have a
status in the objections table before the founder approves. Without the founder there is no approval.
Agenda item 0 of the first review asks the founder whether to delegate small tranches.

**Objections travel:** every objection is written in the table under its item with a status: accepted
(and what changed), rejected because ..., open and funded by ..., or superseded. "Noted" is not a status;
`node tools/ledger.mjs check` fails an approval record that says it.

## Inputs (the secretary prepares, before the session)

1. `node tools/ledger.mjs report`: spend against budget, returns, and "not measured" lines.
2. One **project proposal** per item, written by its owner in the shape below (one page).
3. Projects at 80% or 100% since the last review, with their forecasts.
4. Kill-criteria checks due: every approved project whose pilot has reported.

## Project proposal (one page; the owner writes it)

```markdown
### <project id>: <title>
owner: <role> · proposed by: <role> · major because: <rule from token-budget.md section 6>
- Goal: what is true when this is done, in one sentence.
- Budget: <tokens> for tranche <n>. Basis: <measured unit cost> x <units>, measured by <command or record>.
- Return measure: what we count, how (ledger report columns or a named metric), and the target.
- Kill criteria: the observation that stops or kills it, and when it is checked.
- Plan: tranches and checkpoints; runs, roles, models; what is NOT in scope.
- Rests on: records and measurements (links).
- Risks and what it displaces: which slots or review capacity it takes from what.
- Objections known so far: | Objection | Raised by | Kind | Status |
```

## Record (one section per item)

### Item <n>: <project id>
- Proposal: (link or inline)
- Positions:
  | Member | go / go with changes / object | Reason |
  |---|---|---|
- Founder decision: approved / approved with changes / returned / killed
- Terms: budget <tokens> (countFrom <date>), return measure, kill criteria, checkpoint
- Objections:
  | Objection | Raised by | Kind (evidence/purpose) | Status |
  |---|---|---|---|

## After the session (secretary, same day)

1. In `company/ops/projects.json`, for each item: set `status` (approved / returned / killed), `budget.tokens`, `budget.countFrom`, `kill`, `approval.record` (this file), `approval.approvedBy: founder`, `approval.date`.
2. `node tools/ledger.mjs check` passes.
3. Log the ritual: `node tools/events.mjs add --type=ritual --room=boardroom --actor=portfolio-manager --summary="Project review: <n> items, <outcomes>" --refs=company/rituals/records/{{date}}-project-review.md`.
4. Board items for each approved project's first step, owned by its owner. The chief of staff dispatches. The portfolio manager does not.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
