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

## Scaling: the work queue (see decisions/2026-10-13-work-queue.md; it replaces the 2026-10-12 waves)

Work is pulled, not assigned. Any number of builders can work in one domain, because each brief is handed out once.

1. **Briefs.** Category managers keep `company/domains/briefs/<domain>.md` ranked. Briefs known to be wrong go in `ops/brief-skips.json` with a reason, and are never handed out until fixed.
2. **Claim.** A builder asks for work with `node tools/claim.mjs next <domain> --agent=<label>`. It gets the next unbuilt brief under an exclusive lock (`ops/claims/`, main checkout, created with O_EXCL so a race has exactly one winner), or `NONE` when the domain is done. An abandoned brief goes back with `claim.mjs release <slug>`. Locks older than 6 h are stale and can be taken again. After a restart, run `claim.mjs seed-worktrees`.
3. **Design (new, 2026-10-13).** Every brief names a format from `company/design/formats.md`.
   - **Default formats** (single card, simulation run, map explorer) go straight to a builder.
   - **Other formats, new formats, and briefs flagged hard** go first to the learning designer (the pedagogy note) and the interaction designer (spec plus a mockup from the mockup artist). The spec goes in `company/design/specs/<slug>.md` and the builder follows it.
   - **Design review** looks at the contact sheet: for every new format, for every lesson with a layout or "told, not shown" finding, and for a 10% sample of each batch. It runs after the learner review.
4. **Build.** Each builder works in its own worktree, with its own `NEXT_DIST_DIR`, `QA_PORT` and `QA_OUT`. It commits every 2 lessons, looks at every phone screenshot, and writes only its lesson folders.
5. **Integrate.** The chief of staff merges each branch as it reports, regenerates the registry, runs `check` and `tsc`, pushes, and removes the worktree.
6. **QA.** Before any QA or walkthrough run, confirm the build has every lesson page (`tools/serve.sh` warns otherwise). Run QA for every lesson without a QA record, then `company qa-record`.
7. **Check.** Fact-checkers (sonnet) take `claims --open`. Learner evaluators (sonnet) review from `transcript.md` plus `sheet.png`, the whole walkthrough in one image. No image seen means no "launch".
8. **Publish.** After a review batch has fully reported, run `node tools/publish-ready.mjs --publish`. It publishes only lessons whose latest review says launch for the current version, and it respects `ops/publish-holds.json`. Append the batch to the day's launch-review record.
9. **Revise.** Findings go to revision builders (sonnet). A revision bumps the version, so the lesson goes back through fact-check and review.
10. **Rituals fire on events** (`rituals/triggers.json`, `node tools/rituals-due.mjs`): a retro every 5 merges or after an incident, a WBR every 10 merges or daily, a launch review after each check batch, and a founder digest every 12 h. HQ's Lobby shows what is due.
11. **The chief of staff alone writes** the board, the progress log, the event log and the WBR.

**Concurrency.** The limit is the usage budget, not the org. Hitting it stops every agent for hours.
- Default: at most 3 Opus builders and about 8 agents in total.
- Sonnet for checks, reviews and revisions, and for new lessons if EXP-003 holds.
- Split long reviews into batches of 15 lessons or fewer, so a stop loses less work.
- Servers start and stop through `tools/serve.sh`, never `pkill -f`.

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

## Intake and triage (2026-10-13)
All new work, including GitHub issues, enters through `company/ops/triage.md`. The portfolio manager (CEO office) sets priorities and approves items into "next". Dispatch from the top of "next" by priority (`node tools/triage.mjs list`), not by board order. When 10 or more open items are untriaged, or a P1 arrives, dispatch the portfolio manager.

## Concurrency (2026-10-14, plan upgraded to 20×)
Up to 30 agents at once, 10 on the inherited model (company/decisions/2026-10-14-usage-upgrade.md). Builders default to Sonnet.
