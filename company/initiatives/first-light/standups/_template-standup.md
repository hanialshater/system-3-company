# First Light stand-up: <yyyy-mm-dd> (<Mon|Thu>)

<!-- Template. Copy to standups/<yyyy-mm-dd>-standup.md (the HQ war room shows the latest file with that name;
     files starting with "_" are ignored). Written, 20 minutes of reading, no meeting.
     Owner: head-of-strategic-initiatives. Core team only (charter.md). -->

held by: head-of-strategic-initiatives · read by: the core team in charter.md · previous: <link to the last stand-up>
sources read (state is taken from these, not from memory): `npm run company -- status`, board.json filtered on the First Light ids in status.json, founder-inbox.json, risks.json, quality-bar.md, dependencies.md

**This record is a builders' account.** It is not pasted into an evaluator's brief, and evaluators read it only after their findings are written (company/reviews/README.md). It never marks a quality row met, waived or out of scope.

## 1. Days to the dates

| Date | What | Days left | Moved since last stand-up? |
|---|---|---|---|
| <date> | <next dependency due, from dependencies.md> | <n> | <no / yes: from → to, record> |
| 2026-10-23 | quality-bar freeze, tranche-1 checkpoint (W-908, F-01) | <n> | |
| 2026-11-16 | T-7 quality dry run | <n> | |
| 2026-11-23 | go/no-go (two keys) | <n> | |
| 2026-11-30 | launch | <n> | |

## 2. Workstreams (one line each; status as the war room derives it from the board, override shown)

| Workstream | Owner | Status (derived / override) | Board ids and states | Owes, to whom, by when | Changed since last |
|---|---|---|---|---|---|
| <id> | <role> | <not started / in progress / blocked / done> | <W-… state> | <deliverable → role, date> | <one fact with a file or commit, or "nothing"> |

Rule: a line says what is on disk or on the board, with its address. "Working on it" is not a status.

## 3. Dependencies due or slipped (from dependencies.md)

| # | Waits on | Owner | Due | State | If it slips |
|---|---|---|---|---|---|
| D-<n> | <decision / review / EDD / amendment> | <role> | <date> | <on time / at risk / slipped> | <what moves, who decides> |

Critical path today: <the chain, from dependencies.md, with today's slack in days>

## 4. Risks that moved

| Risk | Score last time → now (L×I) | Evidence | Proposed to principal-engineer-ops? |
|---|---|---|---|

## 5. Asks

- **To the founder (Friday review):** <decision, record or inbox id, by when, cost of waiting>
- **To head-of-product (scope, a record not a stand-up line):** <proposed cut or question>
- **Board asks (for the chief of staff to file; this file does not edit board.json):** <item, owner, due>

## 6. Quality key, as it stands

<Quote the evaluation steward's latest status line from quality-bar.md or her record, verbatim, with its date. Do not summarise or score it.>
