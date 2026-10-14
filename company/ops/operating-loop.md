# The operating loop: how to run the company efficiently

owner: chief-of-staff

The company runs as Claude Code sessions in this repository. A session is one turn of the loop:

```text
state of the company → choose a move → dispatch the narrowest role → observe → update the state
```

## 1. Read the state (2 minutes)

```sh
npm run company -- status     # lessons, gates, coverage, board, last handoff
node tools/rituals-due.mjs    # what is due (status's "all on cadence" reads only the calendar table until AMD-005)
node tools/dispatch-check.mjs --kind=<kind> --running=<n> --builders=<n> [--worktree=<path>]   # before EVERY Agent call
```

`dispatch-check` exit 1 means do not dispatch. It is proposed 2026-10-14, founder to ratify; see "Operating rules" below.

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
11. **The chief of staff alone writes** the board, the progress log, the event log and the WBR (enforced by AMD-005 (b) once ratified; until then every brief must say it, see Operating rules C4).

**Concurrency.** The limit is the host (4 CPUs, one disk) as well as the usage budget; see "Operating rules" below (proposed 2026-10-14), which replaces the two caps that used to sit here.
- Proposed: at most 8 agents and 3 builders in flight, enforced by `tools/dispatch-check.mjs`.
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

## Concurrency (2026-10-14, plan upgraded to 20×), superseded on ratification
~~Up to 30 agents at once, 10 on the inherited model (company/decisions/2026-10-14-usage-upgrade.md).~~ Builders default to Sonnet (still true).
The 30/10 cap was set from the token plan; the same day the host ran at load 24-60 on 4 CPUs and three SEV2s followed. Proposed replacement: "Operating rules" below (company/decisions/2026-10-14-operating-caps-and-intake.md). Until the founder rules, the chief of staff's own retro (company/rituals/records/2026-10-14-retro.md) has already adopted 8 agents and 3 builders, and the preflight checks that number.

## Operating rules (proposed 2026-10-14, founder to ratify)

Source: company/reviews/org/2026-10-14-operating-audit.md (CEO office). Every rule here has a mechanism; a rule with no mechanism is a wish.

### A. Founder-request intake
Every founder ask, before any dispatch:
1. **Classify:** product · category-or-vertical · format · org · engineering · ops · gates · deploy · budget · status-question.
2. **Route** to the first owner in the table. The founder decides *whether*; owners decide *how*, each in writing (agree / agree with changes / object).
3. **Record** from `company/decisions/_template-founder-intake.md`: verbatim words, `class:`, `route:`, answers, and an `Answer:` for every objection ("carried forward" is not one).
4. **Board:** one item per owner step, added by the chief of staff; the portfolio manager prioritises.

Status questions are answered from `company status` with no record. A deploy approval is recorded verbatim; it covers that deploy only.
Mechanism: `dispatch-check` rule I1 blocks a wave while a founder record dated 2026-10-15 or later lacks class, route or objections; AMD-005 (d) moves the lint into `check`.

**Routing table (proposed 2026-10-14, founder to ratify)**

| Kind of ask | First owner | Then | Org part | Founder decides |
|---|---|---|---|---|
| New category, vertical or course | principal-pm-verticals | domain-scout (DLR proposal) → head-of-product (DLR, slots) → courses-lead for a course | chief-of-staff-ceo-office, after head-of-product accepts | the vertical, budget, org |
| Lesson content in an existing category | cm-&lt;domain&gt; | head-of-product if slots change | none | no |
| Format, look, multi-card, layout | design-lead | learning-designer, interaction-designer; principal-engineer for kit work | none | only if Surface Value changes |
| Product direction, targets, cross-category priorities | head-of-product | portfolio-manager; principal-pm-verticals for targets | none | targets, budgets |
| Org: role, floor, retirement, reporting line | chief-of-staff-ceo-office | affected directs (company/ceo-office/org-change-process.md) | itself | always |
| Ops: "spin N agents", dispatch, rituals, capacity | chief-of-staff | answers with the caps and the preflight; CEO office audits | none | caps change by decision record only |
| Engineering: feature, infra, scale, HQ | principal-engineer (tier) | platform-engineer, tools-lead, hq-engineer, backend-engineer; principal-engineer-ops for incidents | none | tier-2 cost |
| Gates, QA contract, protected paths | evaluation-steward (amendment) | constitutional review board | none | ratifies |
| Deploy | release-manager | chief-of-staff records the approval | none | every deploy |
| Budget, usage plan | chief-of-staff with principal-engineer-ops | head-of-product for the split | none | yes |
| External PRs | community-engineer | principal-engineer | none | merge go-ahead |
| Safety or sensitive content | lifehacks-safety-reviewer, cultural-reviewer | the category manager | none | scope refusals |
| Marketing, public copy, channels | vp-marketing | analytics-steward (outcome numbers), fact-checker (factual lines), head-of-product (product promises) | none | anything public, every time |

### B. Daily rhythm
- **Every turn:** status → rituals-due → dispatch-check before each Agent call.
- **Order when several are due:** open SEV1/SEV2 → COE → founder digest (12 h) → retro (5 merges or incident) → WBR (24 h or 10 merges) → launch review (after each check batch) → design review, demo crit → vertical review (before work on a new founder direction) → ops review → R&D review.
- **Open:** founder digest, WBR, then the day's dispatch plan inside the caps. **Through the day:** launch review per check batch, retro per 5 merges. **Close:** retro, founder digest, the chief of staff's handoff.
- **Blocks new dispatch** (`dispatch-check` exit 1): a wave/build while the WBR, retro or founder digest is due (R1) or a SEV1/SEV2 has no COE (R2); any dispatch at 8 in flight (C1); a build at 3 builders (C2), without a worktree (C3), or on the host guard (C4); a wave while a founder record lacks its route (I1).
- **Never blocked:** finishing in-flight agents, merges, rituals, incident fixes, an approved deploy.
- A ritual record written after the work it should have gated does not count as gating it.

### C. Concurrency
1. At most **8 agents** and **3 builders** in flight, any model. Raising it needs a decision record that names host capacity, not only the usage plan.
2. **Host guard:** no new build above load 2 × CPUs or under 10 GB free.
3. **Builders only in worktrees** (own `NEXT_DIST_DIR`, `QA_PORT`, `QA_OUT`). The main tree runs one built server for evaluators and the chief of staff's merges; no builder runs `next dev` there.
4. **One writer** for board.json, progress.md, events.jsonl, founder-inbox.json and the WBR: the chief of staff. Every brief says: "do not edit the board or progress.md; put board items and your handoff in your final report." (CLAUDE.md and working agreement item 9 still say otherwise; the change is proposed in the audit, section 5.)
5. **Log every dispatch and report** (`node tools/events.mjs add`). The preflight warns when nothing has been logged for 3 h.
6. **"Spin many agents"** is answered with the caps and the preflight output; it is not a licence to pass them.
- **Check:** before, `dispatch-check`; after, the CEO office rebuilds the day's peaks from events.jsonl and progress.md for the WBR health section.

### D. Amendment or not
- **Needs an amendment:** anything in `tools/company.mjs` (honest ritual status, one board writer, the id allocator, the intake lint: AMD-005, drafted), and `ci.yml`/the hook (AMD-003).
- **No amendment:** this file, `tools/dispatch-check.mjs`, `tools/rituals-due.mjs`, `tools/ops-health.mjs`, the intake template. CLAUDE.md and tools/org/roles.mjs are not protected but are every session's rules, so the founder ratifies their text first.
