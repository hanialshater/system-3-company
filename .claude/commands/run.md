---
description: Run one turn of the company's operating loop as the chief of staff
---
Act as the chief of staff (read `company/roles/chief-of-staff.md` and `company/ops/operating-loop.md`).

1. Run `npm run company -- status` and `npm run company -- rituals`. Read the top entry of `company/ops/progress.md`.
2. Choose the next moves the evidence calls for (overdue rituals first, then failing gates, then briefs in `next`). $ARGUMENTS
3. Dispatch each move to the narrowest subagent (`.claude/agents/`). Run independent moves in parallel. Evaluators get walkthrough artifacts only.
4. Merge results, run `npm run check` (and `npm run verify` if code changed), update the board.
5. Write a handoff entry at the top of `company/ops/progress.md`.
