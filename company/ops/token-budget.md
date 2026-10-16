# Token budget and investment tracking

owner: portfolio-manager (Odette, CEO office) · date: 2026-10-14 · status: in force for recording; budgets wait for the first project review
decision: [2026-10-14-founder-token-budget-and-project-approval.md](../decisions/2026-10-14-founder-token-budget-and-project-approval.md)
register: [projects.json](projects.json) · ledger: [ledger.jsonl](ledger.jsonl) · tool: `node tools/ledger.mjs` · forum: [project-review template](../rituals/templates/project-review.md)

Every unit of work spends tokens against a **project** (a major investment approved by the forum) or a
**line** (catalog, rituals, maintenance, leadership). Spend is recorded from real harness records,
never estimated. Each project has a return measure, so the question "what did this buy?" has an answer.

## 1. What token data exists today, and what is missing

| Source | What it holds | Measured? |
|---|---|---|
| `company/ops/events.jsonl`, `type: usage` (473 events) | `tokens` and `durationMs` per **finished** subagent run, copied by `tools/events.mjs backfill` from the harness's `<subagent_tokens>` and `<duration_ms>` in the session transcript | Yes: harness numbers |
| `events.jsonl`, `type: stopped` (32 events) | Runs that ended early (mostly usage limits) | **No tokens**: the harness reports none for stopped runs |
| `events.jsonl`, `type: dispatch` | Label, role, sometimes the model, and the brief | No spend |
| `npm run metrics`, Agents table | Runs, stops, tokens per run and median minutes per role, built from the events above | Same as the events |
| `company/ops/waves.json` | Build and check tokens for waves 0 to 4, recorded by hand from reports | Yes, but coarse and stopped after wave 4 |
| Coordinator transcript, per-message `usage` | The main session's own calls: 2,257 calls, 1.64M output, 5.9M cache-write, 961M cache-read, 5.4k uncached input (22:39 12 Oct to 18:21 14 Oct) | Yes, but a **different unit** from `subagent_tokens`, so it is not added to the ledger totals |

**Missing (each one is a board item or a forum question):**

1. **The event log is behind.** Usage events end at 2026-10-14 15:20 UTC. The transcript holds 537 distinct `subagent_tokens` values against 473 usage events, so about 64 finished runs (the History, Books-deck, Marketing and late Wave J work) are on disk but not yet in the log or the ledger. Fix: the chief of staff runs `node tools/events.mjs backfill`, then `node tools/ledger.mjs import`.
2. **No run was ever tagged with a project.** Of the 61.2M measured tokens, 50.5M (82%) are attributed by **role default** (a builder's run counts to the catalog) and 10.7M (18%) by **label rule** (a pattern in the agent description). 0 are tagged. Per-project figures for today are therefore inferred attributions of measured spend, and the report shows the split on every line.
3. **Stopped runs have no token figure.** 32 runs (5%) spent tokens that no record holds.
4. **The coordinator's own spend** is not per project. It is the biggest single consumer and cannot be split by project from the transcript.
5. **What `subagent_tokens` counts** (all context tokens? including cache reads?) is not established, so the ledger is a consistent internal unit and not a bill. It should not be compared with the plan's usage limit until someone confirms the unit (forum question).
6. **The model per run** is recorded only when the dispatch named one.
7. **Wave J has no slug list** (W-585), so its returns cannot be counted yet.
8. **Life Hacks 200 was built outside these transcripts** (PR #2). I believe the 2.0M on that line covers only the company's own integration, safety and fix runs, not the build. Medium confidence.

## 2. The ledger: one line per finished agent run

`company/ops/ledger.jsonl`, append-only (corrections are new lines, as in the event log):

```json
{"id":"L-tx-…","ts":"…","project":"wave-j","role":"demo-builder","agent":"Build physics Wave J [project:wave-j] ·ab12",
 "model":"sonnet","tokens":149000,"durationMs":1140000,"outcome":"done","measured":"tokens+duration (harness subagent_tokens)",
 "attribution":"tagged","source":"events:tx-…"}
```

`attribution` is `tagged` (the run carried `[project:<id>]`), `label-rule`, `role-default` or `none`.
`tokens: null` means not measured, and is never filled in by hand.

**The smallest durable way to record spend is a tag, not a form.** The chief of staff puts
`[project:<id>]` in the agent description (or the first line of the brief) of any work for a major project.
The harness already reports tokens and duration for every finished run, the backfill already copies them
into the event log, and the import picks up the tag:

```bash
node tools/ledger.mjs gate --project=history --tokens=600000   # dispatch preflight: exit 1 = do not dispatch
# ... dispatch with "[project:history]" in the description ...
node tools/events.mjs backfill && node tools/ledger.mjs import  # once per operating loop
node tools/ledger.mjs report [--project=history]                # spend against budget and returns
node tools/ledger.mjs check                                     # rules; exit 1 on a violation
```

Fallback when no transcript is available: `node tools/ledger.mjs add --project=<id> --role=<role> --agent="<label>" --tokens=<harness number> --duration-ms=<n> --outcome=done`.
The import skips a usage event already written by hand, matching on label and tokens.

## 3. Budget lines and how a budget is set

| Line | Kind | Who sets the budget | Today |
|---|---|---|---|
| wave-j, lifehacks-engine-v2, books-decks, history, marketing, scale-stage-1 | major projects | the project-review forum, from a one-page proposal | in flight or proposed, **no approved budget** |
| big-ideas, multi-card-sequence, ncm-course | major projects | the forum (second agenda) | in flight, no budget |
| lifehacks-200, scale-stage-0, rnd-knots | major projects, already done | none (legacy, recorded for the record) | spend recorded |
| catalog | line: build, check, review, QA, publish in the 9 active subjects | op-planning, per cycle | 49.7M spent, no budget |
| rituals | line | op-planning | 87k (most rituals run inside the coordinator, so this undercounts) |
| maintenance | line: platform, engineering review, design system, tools, HQ, accessibility | op-planning | 2.9M |
| leadership | line: product rulings, org design, portfolio, strategy | op-planning | 593k |

**How a budget is set.** The owner proposes a token figure computed from a **measured unit cost** times
planned units, and names the measurement. Today's measured unit costs are 101k tokens per published lesson
(all recorded subagent spend, 61.2M, divided by 608 published; re-measured on 2026-10-15 as 122k: 77.4M over 588 runs, including 115 runs after the log's 15:20 cut-off read from the transcript, / 635 published), 82k on the catalog line alone, and per
run: builder 149k, fact-checker 131k, learner-evaluator 179k, platform-engineer 136k. Big projects are
funded in **tranches**: tranche 1 buys the pilot that tests the riskiest assumption, and the next
tranche is approved on the pilot's result. A budget counts spend from `budget.countFrom` (the approval
date), so earlier spend is history and is not charged against the new budget. The portfolio-manager's
proposed figures are in `projects.json` under `proposal`. They are proposals: I wrote them, so I cannot approve them.

## 4. At 80% and at 100%

- **80%**: `gate` passes with a warning. The owner writes a forecast in the approval record, under `## Forecast at 80%`: spend so far, the return so far, tokens still needed, and one of continue, ask for a top-up, or stop. The portfolio-manager lists the project in the WBR's portfolio section.
- **100%**: `gate` **fails** for new dispatches tagged to the project (exit 1). Runs already working finish; nothing is killed mid-run. To continue, the founder and one PE approve a top-up in the approval record (an async fast path, so no full forum is needed). The top-up goes into `budget.topUps` with its record. Otherwise the project stops or is killed against its kill criteria.
- **Lines** (catalog, rituals, maintenance, leadership) never block. At 80% and 100% they warn and are raised at the next op-planning, because small work must not wait (the founder's constraint).

## 5. Return measures

| Measure | How it is counted (`tools/lib/ledger.mjs` `returnsFor`) |
|---|---|
| **Cost per published lesson** (the headline) | all spend on the line ÷ published lessons in its scope |
| Lessons published | `meta.json` status `published` within the project's scope (domains, slugs, or a wave's slug list in waves.json) |
| Claims verified | claims with status `verified` in scope |
| Findings fixed | board items listed in the project's `board`, or whose text contains `#<project-id>`, in state `done` |

Projects that do not return lessons (marketing, scale-stage-1, multi-card) name their own measure in the
proposal. The report prints "not measured" with the reason, never a zero.

## 6. What "major" means, and the gate

A project is **major** if any one of these holds:

1. its planned spend is over **5M tokens** (about 50 published lessons at today's cost), or it plans more than **20 agent runs**;
2. it creates a **new category, course, vertical or org** (a floor, a VP or a team);
3. it changes the **kit, the lesson contract, an engine or template used by more than 10 lessons, the deploy path, or a protected path** (the forum adds a budget; it does not replace engineering review or an amendment);
4. it is expected to take **more than 7 days** or span more than one wave.

**Not major**: fixes, routine checks, publishes, single-lesson revisions, rituals, and any work inside an
approved project's budget. Untagged work is treated as small and is never gated.

**The bite** is a mechanism, not a reminder:

- `node tools/ledger.mjs gate --project=<id>` exits 1 for a major project that is proposed, returned, paused, killed, legacy, past its grace period, or at 100% of budget. The dispatch preflight being built by chief-of-staff-ceo-office calls it (board item; I did not edit her files).
- `node tools/ledger.mjs check` exits 1 if any **tagged** ledger line after `enforceFrom` (2026-10-14 19:00 UTC) went to a project the gate refused at that moment; if an approved major project has no approval record on disk, no budget, or was approved by its own proposer; or if its approval record has no `## Objections` section or answers an objection with "noted". Wiring `check` into `npm run check` needs a change to `tools/company.mjs`, which is protected. That is routed for an amendment and not done here.
- **Grace period.** Projects started before the forum existed are `in-flight` and pass with a warning until 2026-10-16 23:59 UTC (wave J, Life Hacks v2, Books decks, History, Marketing), or until 2026-10-21 (Big Ideas, multi-card, NCM). After that the gate fails until the forum rules.

## 7. Today's backfill (labelled)

`node tools/ledger.mjs import` on 2026-10-14 wrote 505 lines from the event log: 473 measured runs
(61.2M tokens) and 32 stopped runs (not measured). By line: catalog 49.7M (396 runs, 82k per published
lesson), maintenance 2.9M, ncm-course 2.3M, lifehacks-200 2.0M, rnd-knots 1.7M, wave-j 1.4M (brief
writing only), scale-stage-0 661k, leadership 593k, rituals 87k. Measured: the token and duration figures.
**Inferred:** which line each run belongs to (82% by role default, 18% by label rule). **Not in the
ledger:** about 64 runs after 15:20 (missing item 1), the 32 stopped runs, and the coordinator.

## 8. Today's projects that would have counted as major

| Project | Why major | Status | Approved? |
|---|---|---|---|
| Life Hacks 200 (PR #2) | new category, > 5M | 0 of 200 publishable (engine bug) | no |
| Books and Big Ideas categories | new categories and orgs | Books: pilot exemption builds; Big Ideas: drafts | category by founder decision; no budget |
| Books decks (deck format) | new format, ~10 books | 60 slots buy about 12 books, not 30 | founder decision on format; no budget |
| Courses org and NCM course | new vertical and org | section briefing stops after Wave J (W-555) | org by decision; no budget |
| History through data and maps | new category and org | sized; the org is not yet created | founder decision; no budget |
| Marketing floor and VP | new org | being designed by chief-of-staff-ceo-office | founder decision; no budget |
| Wave J (144 briefs) | > 5M, > 20 runs | building | W-556 gate; no budget |
| Life Hacks engines v2 | engine for 200 lessons | code in the working tree (uncommitted) | no |
| EDD-003 stage 0 and SPIKE-001 | deploy path | done, deployed with founder approval | engineering review; no budget |
| EDD-003 stage 1 | kit and deploy path, a new bundler | trigger fired; waits on the bundler decision | no |
| EDD-004 knots kit | kit | approved with conditions | engineering review; no budget |
| EDD-006 multi-card sequence | kit | on a branch, awaiting review | engineering review; no budget |

## 9. Initiative proposals carry the budget line first (added 2026-10-15, W-905)

**Why.** First Light, the first public release, reached the founder with no token budget and no money line, and the portfolio manager had not seen it (founder correction in company/decisions/2026-10-15-founder-first-light.md). The founder decided the program and left its spend "pending Project Review 1". A decision without a cost is a decision on half the facts.

**The rule.** Any **initiative proposal** that reaches the founder carries a portfolio-manager **budget line** before it does. That covers a founder-inbox item, a decision ask in a conversation, or a proposal document. An initiative is anything that would be a major project under section 6, or that asks for money. This applies to every proposer, not only the chief of staff. The budget line holds:

1. **tokens per tranche**, from measured per-run or per-lesson unit costs, naming the measurement, and saying which units are proxies or extrapolations;
2. **money** where there is real spend, each line marked verified (a quote or a price page opened) or unverified;
3. a **return measure**, and a **stop rule** for each tranche;
4. **what it displaces**: review capacity, named roles, founder decisions and lesson-equivalents at the current cost per published lesson;
5. a **register entry**: the project in projects.json as `proposed`, with its `premortem`.

**How it runs.**
- The proposer asks the portfolio manager for the line. A board item to portfolio-manager is enough. The portfolio manager writes it within one operating loop, into projects.json and the proposal (a "Budget line (portfolio-manager)" section), or says in writing why the item is not an initiative.
- The chief of staff and the CEO office, who write the founder inbox, do not file an initiative item without a link to the budget line (the `budget` field on the inbox item, pointing at the projects.json id). An item without one goes back to its proposer, not to the founder.
- If the founder decides before a line exists (as with First Light), the decision record says "budget pending", the project is registered as `proposed`, and the gate refuses tagged dispatch until the forum or the founder sets the budget.
- The portfolio manager writes the line but does not approve it (the authority rule). The forum or the founder approves it.

**Mechanism, not only a rule.** This text is a rule until a tool checks it. The proposed check is for `node tools/ledger.mjs check` to warn on an open founder-inbox item in category `decision` that links a file under `company/initiatives/` or a major projects.json id and has no `budget` field. It is routed as a board item to the chief of staff and the tools lead (founder-inbox.json has one writer). Until it lands, the CEO office checks by hand at each founder digest.

**Would be wrong if:** within two weeks, more than one initiative reaches the founder without a line, or the line delays founder decisions by more than one operating loop (median, measured from the board item to the line).

## 10. First Light tranche 2 re-based on the full-scope estimate (2026-10-16, W-1191, W-1219)

portfolio-manager (secretary of Project Review 1), 2026-10-16. **A proposal for the forum and the founder, not a decision**: I wrote the First Light budget line, so I may not approve its re-base. Lane 18 (chief-of-staff-ceo-office) checks this section.

**Source.** principal-engineer's full-scope re-estimate, [company/engineering/notes/2026-10-16-first-light-reestimate-full-scope.md](../engineering/notes/2026-10-16-first-light-reestimate-full-scope.md), short answer 6 and section 2 (Kenji's estimate, not a measurement; run counts carry his 1.25x to 1.5x error), and his PR1 position item 7 ([2026-10-16-project-review-positions-principal-engineer.md](../rituals/records/2026-10-16-project-review-positions-principal-engineer.md)).

| | Tokens | From |
|---|---|---|
| T2 as registered and approved | 8.17M | projects.json `first-light` workstreams' t2, summed: 1,729k + 1,144k + 1,221k + 823k + 530k + 287k + 950k + 0 + 1,485k = 8,169k |
| T2 stop rule (release ceiling) | 10.2M | 1.25 x 8.17M, projects.json `first-light.kill` |
| Engineering T2, full scope | about 8.5M (8.2M to 8.6M) | Kenji, note section 2 |
| + cadence | 1.49M | Kenji; the register's war-room line is 1,485k, so cadence is already in the 8.17M |
| + quality line (evaluation steward, quality-bar section 3) | about 9.2M at full scope, 6.3M minimum | Kenji; **not** in the 8.17M (the register has no T2 quality workstream; surface-value-amendment t2 is 0) |
| **T2 re-based** | **about 19.2M** (16.3M at the quality minimum) | 8.5 + 1.49 + 9.2 = 19.19; 8.5 + 1.49 + 6.3 = 16.29 |

**What it means.** Both figures are over the 10.2M ceiling (19.2M is 1.9x it; 16.3M is 1.6x). **On these figures the stop rule trips at the 10-23 checkpoint whatever week 1 shows.** Kenji's "would be wrong if the 8.17M already contains the quality line" does not hold: it contains cadence but not quality, so the gap stands as he stated it. Taking the cut order does not get under 10.2M either (my arithmetic on his figures, not his): without the swap, about 7.2 + 1.49 + 7.8 = 16.5M; without the swap and the ad slot, about 6.7 + 1.49 + 6.4 = 14.6M.

**Proposed for the 10-23 checkpoint (the forum, with the founder: T2 is over 3M and touches the deploy path, so the 0a delegation does not cover it).** First Light comes back to the forum on 10-23 with one of: (a) T2 re-based to 19.2M with the ceiling at 1.25x (24.0M; 20.4M if the quality line is set at its minimum), program about 22.8M (3.59M + 19.2M) against 11.76M today; or (b) cuts in the note's section 5 order, each priced with the figures above. The W-908 week-1 re-estimate replaces these numbers if it differs. Tranche 1 (3.59M) is not contested and keeps running. Tokens still do not bind: review capacity and the privacy reviewer do (PR1 0d), so whichever option is taken states its review draw.

**Would be wrong if:** the W-908 re-estimate on 10-23 puts T2 at or under 10.2M, or the forum records that the quality line is funded outside First Light (then T2 is about 10.0M and the rule may pass).

## Objections

| Objection | Raised by | Kind | Status |
|---|---|---|---|
| Attributing 82% of spend by role default could mislead: a builder fixing a Life Hacks lesson counts to the catalog | portfolio-manager (self-check) | evidence | accepted: every report shows the attribution split, and tagging from today replaces inference |
| A forum adds a wait to work that is already slow because review is the bottleneck | principal-pm-verticals (stated against new orgs in plan-to-2000 §4; applied here by me) | purpose | accepted in part: only major work is gated, and small work and lines never block; open for the forum to test after 2 weeks (kill criterion for the forum itself: if the median approval wait is over 24 h, add the delegation in agenda item 0) |
| `subagent_tokens` may not be the billed unit, so budgets in it may not track the plan's usage limit | portfolio-manager | evidence | open, routed: forum question 1 in the first agenda |
| An initiative reached the founder without a budget (First Light, 2026-10-15) | founder | purpose | accepted: section 9 (budget line first); mechanism routed (ledger check on the founder inbox) |
| Unit costs for roles that have never run (backend coding, learner-model-engineer, personalization-lead, growth-designer, privacy-reviewer) are proxies, so a First Light budget built on them may be wrong | portfolio-manager (self-check) | evidence | accepted: tranche 1 buys a spike per workstream and tranche 2 is re-priced at the week-1 re-estimate, with a 1.25x ceiling before cuts |
