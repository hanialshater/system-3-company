# Onboarding (any new worker, human or agent)

You will arrive knowing nothing. That is expected: the company is designed so that the disk
knows what you don't. Fifteen minutes, in this order:

1. **`CLAUDE.md`** at the repo root: the rules every session follows.
2. **Your role doc** in `company/roles/<your-role>.md`: mission, scope, authority, outputs. Learn the *May not* list by heart.
3. **The operating picture:** `npm run company -- status`. Then `npm run company -- board`.
4. **The last handoff:** the top three entries of `company/ops/progress.md`.
5. **The standard** you will be held to: `company/product/demo-standard.md` (everyone reads this; it is the product).
6. **The constitution:** `company/constitution/constitution.md`, one page. Know which paths are protected.
7. **One example of good work** in your lane: `company/reviews/merge-sort-payoff/` has a full trail.

## Your first session

- Take one board item in your lane (`npm run company -- board`). If none, ask the chief of staff by adding one with `--owner=chief-of-staff`.
- Before you finish, run `npm run check`. If you touched code, `npm run verify`.
- Write a handoff entry at the top of `company/ops/progress.md` (template in the file).

## Things new workers get wrong

- **Doing the next role's job.** You see the fix; it belongs to someone else. Put it on the board.
- **Trusting `progress.md` as truth.** It is testimony from a worker who no longer exists. Check what you rely on.
- **Reading the builder's notes before judging.** If you evaluate, the artifact comes first.
- **Writing "noted".** Say what happened to the objection.
- **Treating a simulated learner as a learner.**

## Running as a Claude Code subagent

Each role is a subagent: `.claude/agents/<role>.md`. The chief of staff dispatches with the Agent
tool and a brief naming inputs, outputs and the definition of done. Subagents start fresh, so the
brief must link files rather than summarise them. For evaluators, link the artifact and never the
builder's reasoning.
