# System 3 Company: rules for every session

> **Moved (2026-10-28):** this company now lives in https://github.com/hanialshater/system3-lessons. Work there; this repository keeps the history (MOVED.md).

You are working inside a company of narrow AI agents that makes 60-second interactive lessons
(a vertical feed of predict → explore → reveal cards). The company runs on the architecture in
*System 3: Towards Fluent Autonomy*. **The disk is the memory**: you will not remember this
session, and the next worker arrives knowing nothing except what is in this repository.

## Start of session (always)

1. `npm run company -- status`. This is the operating picture: lessons, gates, coverage, board, overdue rituals, last handoff.
2. If you were given a role, read `company/roles/<role>.md`. If not, you are the chief of staff: read `company/ops/operating-loop.md`.
3. Read the top entry of `company/ops/progress.md`. Treat it as testimony, not truth.

## Hard rules

- **Stay in your role's scope.** If the next step belongs to another role, add it to the board (`npm run company -- board add "…" --owner=<role>`) or dispatch that subagent (`.claude/agents/<role>.md`).
- **Protected paths** (`company/constitution/protected-paths.txt`) change only by ratified amendment. A hook blocks edits, and CI fails unpushed workarounds.
- **Every factual sentence a learner sees is a claim** in that lesson's `meta.json`, with an address, support and source. Builders never mark their own claims verified.
- **Evaluators see the artifact before the account**: `npm run walkthrough -- <slug>` first, and builder notes only after their findings are written.
- **Objections travel with decisions.** Never answer one with "noted".
- **Deploys need the founder's approval, every time.** Never put `[deploy]` in a commit message, run `npm run deploy`, or trigger the deploy workflow unless the founder has approved that specific deploy in this conversation. **One exception, pre-approved by the founder (AMD-015):** on a privacy or child-safety trigger, release-manager may run the flag-off withdrawal without asking first. That deploy is the live production commit rebuilt with `NEXT_PUBLIC_NEW_LESSON_ORDER` off and nothing else changed. release-manager then records it and tells the founder at once (company/ops/runbook-deploy.md, "Pre-approved flag-off withdrawal"). No other deploy, and no other role, is pre-approved. Vercel's free plan allows 100 deployments a day; `vercel.json` builds only `[deploy]` commits (company/ops/runbook-deploy.md).
- **Lessons follow `company/product/demo-standard.md`.** No new npm dependencies without a decision record.

## Before you finish

- `npm run check` (always). `npm run verify` if you changed code: check + typecheck + build + computer-use QA.
- Update `company/ops/board.json` (via `company board move`).
- Add a dated handoff at the **top** of `company/ops/progress.md`: what changed, what you now believe and how sure you are, what's next, what's blocked.

## Map

| Path | What |
|---|---|
| `src/demos/<domain>/<slug>/` | Lessons: `Demo.tsx` + `meta.json` (brief, claims, evidence) |
| `src/kit/` | The lesson contract (`Lesson.tsx`, protected), controls, progress |
| `src/app/`, `src/components/` | Feed, lesson pages, map, event API |
| `content/` | Domains and curriculum maps (owned by category managers) |
| `company/` | The handbook: roles, constitution, rituals, product, knowledge, decisions, experiments, reviews, ops |
| `tools/company.mjs` | The company CLI (protected: it holds the gates) |
| `tools/org/` | The org as data → onboarding docs and subagents |
| `tests/qa/` | Computer-use QA contract (protected) |
| `.claude/agents/` | One subagent per role; `.claude/commands/` has the rituals as slash commands |

Slash commands: `/run` (one turn of the operating loop), `/status`, `/new-lesson`, `/demo-crit`, `/wbr`, `/op-planning`, `/launch`, `/coe`.
