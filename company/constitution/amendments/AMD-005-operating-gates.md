# AMD-005: operating gates in the company CLI (honest ritual status, one board writer, safe board ids, founder-intake lint)

status: proposed (draft, not applied)
date: 2026-10-14
proposed_by: chief-of-staff-ceo-office (Leonie), at the founder's request ("make sure we fix this to have scalable and durable work", company/decisions/2026-10-14-founder-durable-ops-and-marketing.md)
prepared_by: evaluation-steward (to own, redraft and number; AMD-003 and AMD-004 are reserved by the 2026-10-14 constitutional review, so this draft takes 005)
surface: `tools/company.mjs` (protected). Nothing else. `ci.yml` and the hook are AMD-003's surface.
evidence: company/reviews/org/2026-10-14-operating-audit.md (findings F3, F5, F7, F9)

Nothing below has been applied. The CEO office drafts it because the founder asked for it. The CEO office does not ratify it, and its unprotected half (tools/dispatch-check.mjs, the rituals-due record reader) is already built, so the CEO office is not a neutral judge of whether this half is needed.

## The four changes

**(a) `company status` and `company rituals` report the event-driven triggers.** Today `cmdStatus` prints "Rituals all on cadence" from the calendar table (`RITUALS`, a 7-day WBR), while `node tools/rituals-due.mjs` printed 9 rituals DUE at 18:17 on 2026-10-14. The start-of-session read named in CLAUDE.md therefore hid every overdue ritual all day. Change: `cmdStatus` imports `due()` from `tools/rituals-due.mjs` and prints the DUE list. The calendar table stays as the upper bound (the triggers.json note). Where the two disagree, status prints both.

**(b) One board writer.** `board add` and `board move` refuse unless `S3_ROLE=chief-of-staff` (or `portfolio-manager` for `move` during triage) is set in the environment. Dispatched agents put board items in their final report; the chief of staff adds them. `check` fails when `company/ops/board.json` has an item whose `created` is today and whose id was not issued by the allocator in (c) (the allocator writes `issuedBy`).

**(c) A safe id allocator (W-528).** `board add` takes an O_EXCL lock in the main checkout's `company/ops/claims/board.lock`, re-reads `board.json` under the lock, allocates `max+1`, writes through a temp file and `rename`, then releases. `board add` with no title, or with `--help`, prints usage and adds nothing (three empty items were created today: W-444, W-454, W-685). This does not fix ids issued on another branch; for that, ids carry no meaning across branches and the merge step renumbers with `board renumber` (a new subcommand) instead of by hand.

**(d) Founder-intake lint in `check`.** A record in `company/decisions/` dated 2026-10-15 or later whose header names the founder must have `owner:` (a role, not "founder (recorded by ...)" alone), `class:`, `route:` and a `## Objections` section in which every bullet has an `Answer:`. Template: `company/decisions/_template-founder-intake.md`. Until this is ratified, `tools/dispatch-check.mjs` (rule I1) blocks wave dispatch on the same condition, which is a softer, unprotected stand-in.

## Claimed benefit
The four operating rules broken most on 2026-10-14 (rituals before dispatch, one board writer, no id collisions, routing founder asks) fail a command instead of depending on memory. The judge of these rules (the CLI) becomes harder to change than the loop it judges.

## What it removes
- The ability of any agent to write the board (it removes convenience for every role, including the CEO office).
- `status`'s single calendar view of rituals.
- Founder decision records without a route or with unanswered objections (today: the History record carried principal-pm-verticals' objection "forward" with no answer).

## Prediction and test
- prediction: over the next 5 merge rounds, 0 board-id collisions, 0 empty board items, and `status` and `rituals-due` agree on every ritual.
- would_be_wrong_if: board items are lost because agents stop reporting them (count board items mentioned in agent reports vs added), or the chief of staff sets `S3_ROLE` in every agent's environment (grep dispatch briefs).
- side_by_side: run the allocator on a planted test of 20 parallel `board add` calls (W-528's falsifier): 20 distinct ids, 20 items. Run the intake lint against today's 7 founder records and list what it would have failed.

## Does it change how the proposer is judged?
Yes, in part: (a) makes overdue rituals visible in the CEO office's own WBR health section, and the CEO office built the unprotected stand-ins. The CEO office therefore cannot be the deciding approver. Deciding votes: founder, with the evaluation steward and the chief of staff (the role most constrained by it) seated.

## Rollback
Revert the `tools/company.mjs` commit under its own `Amendment: AMD-005` trailer. `tools/dispatch-check.mjs` keeps working without it.

## Decision (constitutional review board)
