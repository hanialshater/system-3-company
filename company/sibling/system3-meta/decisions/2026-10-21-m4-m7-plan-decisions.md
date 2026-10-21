# Founder ask: M4-M7 plan decisions F-a to F-f (plans/2026-10-21-m4-m7-plan.md)

owner: vp-meta
date: 2026-10-21
status: decided
class: engineering
route: founder → vp-meta
recorded by: chief-of-staff

## Ask

Founder, 2026-10-21: "Ultracode I want you to work until M7 is done". Earlier the same day: "decide for me".

## Decisions

- **F-a, ratified.** The milestones are:
  - M4: 3 real lessons to `company publish` exit 0 in a sandbox branch;
  - M5: governance in code;
  - M6: 10 more lessons, with up to 3 builders;
  - M7: one event-driven cycle of the operating loop.

  "A week" in M5 and M7 is stated honestly: judged on the run window, with a real week as the follow-on.
- **F-b, approved in the sandbox only.** `git worktree add` under /home/user/s3c-wt, and `npm ci` there. Nothing is merged to main and nothing is pushed from those branches.
- **F-c, approved.** The Meta spec mirrors existing company roles (no new roles). It is not an org change.
- **F-d, approved.** M4 has a $60 cap (the SDK's cost estimate) across all sessions. Later milestones are capped at 3× their measured per-lesson cost.
- **F-e, approved in the sandbox only.** Dispatch-check R1 is waived for M4-M6; M7 restores it.
- **F-f, approved.** One demo-builder session also writes design.md. Independent roles stay independent (fact-checker, learner-evaluator, head-of-product), because the constitution requires it.

## Kept with the founder (not decided here)

- External acceptance of the lessons (M4 exit 5, M6 exit 1).
- Any merge to main, and any deploy (never, without the founder's words in that conversation).

## Objections

1. **"Publishing lessons, even on a branch, could leak to production."**
   - Answer: publish only sets meta.json status on `meta/*` branches.
   - Vercel builds only `[deploy]` commits, which K7 refuses. Nothing is pushed.
2. **"Waiving R1 hides overdue rituals."**
   - Answer: M7's first act is to hold every overdue ritual, with R1 restored.
