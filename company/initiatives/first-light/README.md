# First Light: status.json and the war room

Owner: head-of-strategic-initiatives (chief-of-staff until the role exists). Page: `/hq/first-light` (HQ, CEO-office floor, "War room: First Light").

- `status.json` is the data. Edit it with the board ids and the one-line next step; do not copy board states into it.
- A workstream's status is derived from its board items (`src/lib/hq-firstlight.ts`): no live items, or all `backlog`/`next` = not started; any `doing`/`review`, or some `done` = in progress; all `done` = done. Dropped items are ignored.
- `override: { status, note }` on a workstream wins over the derived status. The note is required and the page shows the derived status beside it. Use it for `blocked` (the board has no blocked state) and when work is real but not on the board. Remove it when the board catches up.
- Founder decisions and risks are read live by id from `company/ops/founder-inbox.json` and `company/ops/risks.json`. Risks with `status: "proposed"` are the initiative's own proposals; principal-engineer-ops decides whether they enter risks.json.
- Stand-up and founder-review records go in `standups/<yyyy-mm-dd>-standup.md` and `-founder-review.md`; the page shows the latest of each.
- Overall RAG (`overallRag`): red if any workstream is blocked and go/no-go is 14 days away or less, or go/no-go has passed with a workstream not done. Amber if any workstream is blocked, a founder decision is open, or half or more of the workstreams are not started. Green otherwise.
