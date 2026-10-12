# The operating loop: how to run the company efficiently

owner: chief-of-staff

The company runs as Claude Code sessions in this repository. A session is one turn of the loop:

```text
state of the company → choose a move → dispatch the narrowest role → observe → update the state
```

## 1. Read the state (2 minutes)

```sh
npm run company -- status     # lessons, gates, coverage, board, overdue rituals, last handoff
npm run company -- rituals    # what is due
```

## 2. Choose the move

The next move is chosen from the evidence. It is not fixed in advance. Typical moves, roughly by priority:

| Signal in `status` | Move | Role |
|---|---|---|
| Ritual overdue | Run it (`company ritual <name>`) | chief-of-staff / owner |
| Lesson in review with failing gates | Route the specific gate: claims → fact-checker, no QA → qa-tester, no learner review → learner-evaluator | quality roles |
| QA or review found a problem | Send the problem (not the fix) to the builder | demo-builder |
| Ready to publish | Launch review, then publish | head-of-product, release-manager |
| Board has briefs in `next` | Design → (mockup) → build | learning-designer, demo-builder |
| Unmet demand with no brief | Ask the category manager for briefs | cm-<domain> |
| Evaluators disagree | Different boundary, pairwise vs an alternative, or a real learner | quality / founder |
| Versions converge on one format | Strategic constraint branch (`remove-the-easy-path`) | learning-designer |
| Same correction made twice | Pattern or kit default | pattern-librarian / platform-engineer |

## 3. Dispatch

Use the Agent tool with `subagent_type: <role>`. A good brief:

- names the task, the input files and the output files, and the definition of done;
- for evaluators, links **artifacts only** (walkthrough), never `build.md` or the builder's reasoning;
- for parallel builders, uses `isolation: "worktree"`, and each runs build and QA with its own `NEXT_DIST_DIR`, `QA_PORT` and `QA_OUT`;
- asks for a short report and the next move.

Run independent work in parallel (one message, several Agent calls). Do not parallelise roles
that must see each other's output.

## 4. Observe and record

Merge results, then run `npm run check` (and `npm run verify` if code changed). Update the board,
and write the handoff at the top of `ops/progress.md`.

## Scaling: waves (see decisions/2026-10-12-scale-operations.md)

1. Category managers refresh `company/domains/briefs/<domain>.md` (ranked briefs).
2. Platform proves any new kit feature with one lesson first.
3. Wave: one builder per domain in a worktree, about 10 briefs each. Builders write only their lesson folders.
4. Integrate: merge each branch, run `npm run registry`, then `npm run verify` once.
5. Check: `npm run walkthrough -- --domain <d>`, then a fact-checker and a learner evaluator per domain, in parallel (sonnet).
6. Wave launch review: publish every lesson whose gates pass; send findings back as briefs.
7. The chief of staff alone writes the board, the progress log and the WBR.

## Attention tiers: what reaches the founder

| Tier | Examples | Founder involvement |
|---|---|---|
| Never wake | Registry regeneration, QA runs, routine publishes that passed gates, typo fixes | none |
| Batch in WBR | Coverage, metrics, new briefs, killed branches | reads weekly |
| Ask | Purpose disputes, gate overrides, amendments, budgets, anything public that is not a lesson | decides |
| Interrupt | A published claim found false, a learner-harming bug, a security issue | immediately |

## Cost discipline

- Narrow roles get cheaper models (see `model:` in `.claude/agents/*.md`). Judgement roles inherit the session model.
- Evaluate only lessons in `review`; do not re-review unchanged lessons.
- Kill branches that underperform for two generations unless they hold an exploration slot.
- `company check` is free; run it often. `verify` costs about two minutes; run it before you push.
