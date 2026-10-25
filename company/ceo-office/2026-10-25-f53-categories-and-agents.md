# F-53: the category as the unit of scale, broad central teams, and physical agents

owner: chief-of-staff-ceo-office (Leonie) · decides: founder · date: 2026-10-25 · status: **proposed, nothing applied** (no edit to tools/org/roles.mjs, gates or protected paths)
founder asks (2026-10-25, verbatim):
- after F-52: "We lost category management, which is the broad scaling function. Also some functions like testing can be grouped in one agent physically even if logically multiple."
- direction for this draft: "Let's have a scalable and efficient org: less agent hierarchy, broader functions, and probably category management to scale. The category is the unit of scale. A central team can work on content types, engineering, etc. Also remember one agent can spin subagents by itself."

rests on: system3-meta `PRINCIPLES.md` "Logical roles and physical agents" (P7 counts physical agents; group same work on the same artifact; never group independent witnesses) · F-50 `company/ceo-office/2026-10-25-restructuring-proposal.md` and `company/decisions/2026-10-25-founder-restructuring.md` · F-52 `company/decisions/2026-10-25-founder-f52.md` · `company/decisions/2026-10-16-proposal-managers-dispatch-own-teams.md` (the three preconditions) · `company/decisions/2026-10-16-founder-mailbox-dispatch.md` (F-42) · `company/decisions/2026-10-18-founder-category-scale-out-plan.md` (proposed, never decided) · system3-meta `docs/runs/M6-RUN.md` · `company/company.json`
founder inbox: F-53 (to be filed by chief-of-staff, the only inbox writer; board item below)

## 0. The recommendation in six lines

1. **The category is the unit of scale.** 14 standing category owners (the 14 cm-* leads, un-parked as logical roles), each with its own role doc, memory, charter, rulings, curriculum map, coverage and queue. Adding a category adds one owner and its data; nothing else grows. The 36 strand roles stay parked: strands are sections of the category's brief files.
2. **One physical agent definition runs every category owner.** `category-owner` (today's category-curator agent) is launched *as* `cm-<domain>`: it reads that role's doc and memory and writes to that memory. 14 logical owners, 1 agent definition, at most 2 running at once.
3. **A category owner is a top-level session that dispatches its own makers** (one warm demo-builder per item, the interaction-designer, research). It never dispatches a checker. Checkers come from the quality team's standing orders. The operator stops being the hands for every dispatch.
4. **Five broad central teams shared by all categories**: content types, engineering, quality, product and portfolio, release. At most **2 layers below the founder** anywhere (today 3).
5. **Testing as one physical agent**: qa-tester and accessibility-reviewer run in one warm `tester` session, with the QA contract, sequence probe, reveal-fit and a11y scan on one build. The witnesses stay separate: fact-checker, learner-evaluator, pedagogy-critic, route-reviewer, and evaluation-steward as referee owner.
6. **Physical agents: 33 distinct today (each role its own) → 26 distinct agent definitions for 47 logical agent roles; at most 10 sessions at once** (8 typical), against P7's default of 8 roles. The size reason is stated in section 6.

## 1. Category management restored

### 1a. What the org had, and what F-50 changed

| | Before F-50 (to 2026-10-25) | After F-50 (today) | F-53 (proposed) |
|---|---|---|---|
| Logical roles | 51 cm-*: 15 leads (14 domains plus cm-course-ncm) and 36 strands (`parked` export, tools/org/roles.mjs) | 1 pooled `category-curator`; the 51 ids are parked but kept as data keys (`content/domains.json` categoryManager; `npm run company -- coverage` still prints "owner cm-math" etc.) | 14 category owners (the domain leads) plus 1 category lead; strands and cm-course-ncm stay parked |
| Reporting | 14 leads to head-of-product (the span the 10-13 evaluation called unmanageable), strands to their lead: founder → head-of-product → lead → strand | founder → head-of-product → principal-pm-verticals → category-curator | founder → category lead → category owner |
| Memory | one per role (`company/roles/memory/cm-*.md`, 116 KB in total) | the curator *reads* `cm-<d>.md` but *writes* to one pooled `category-curator.md` for all 14 categories; `tools/memory.mjs` refuses parked ids (`roleOf` looks only in `roles`), so the category memories have stopped growing | each owner writes its own `cm-<d>.md` again; nothing moves |
| Queue | open items per cm-* role | 172 items re-owned to category-curator with `domain` (173 open today) | re-owned back to `cm-<d>` using the `reowned.from` field already on each item |
| Who dispatches | the operator (1,280 of 1,281 dispatch events, F-50 §1a) | the operator, draining lane mailboxes | the category owner, for makers; the quality desk, for checkers |
| Cost | 9.83M tokens, 114 runs (9% of spend): leads 8.34M / 82 runs (~100k a run), strands 1.48M / 29 runs; 16 strands never ran | not measured (ledger off since 2026-10-16, W-2034) | section 7 |

### 1b. The evidence

- **Queue clearing per category.** cm-* roles closed about 80 items between 2026-10-13 and 2026-10-17 (done counts on board.json: cm-lifehacks 14, cm-history 9, cm-math-discrete 9, cm-behavioral 8, cm-chemistry 6, the rest 1-4; 25 closes carry no date). The latest dated close is **2026-10-17**. Since F-50 re-owned the queue, **0 of the 173 category items have closed**. The curator's only 3 closed items (W-2043, W-2048, W-2049) are the lane M cube lesson, all in math, with no `domain` set. The pooled curator has run 4 times, all for one category.
- **Route-reviewer findings.** route-reviewer has **0 runs and 0 records**: no event names it as an actor, and its memory has no entries. The doing item W-359 (Life Hacks safety second read) sits with it, untouched.
- **Coverage** (`npm run company -- coverage`, 2026-10-25). Nine categories are near their curriculum caps: math 75 published, cs 141, probability 76, physics 64, ai 62, economics 89, life 60, chemistry 63, geography 54. Five are incubating: lifehacks 6 published of 120 concepts with a lesson, books 0 of 106, history 4 of 141, big-ideas 2 of 6, behavioral 0 of 4. The growth is in the five incubating categories, and each has a route (safety, copyright, sensitive): the place where F-50 objection 1 said a pooled prompt has no standing judgment.
- **M6** (system3-meta `docs/runs/M6-RUN.md`, 2026-10-22). This was run on this company's work: 10 lessons in two category lanes (math, cs), with cm-math and cm-cs as the lane owners. Category ownership cost **$0.79 of $36.90 (2%)**. All 7 loops came from the fact-checker. Throughput was capped by check loops, not by builders (P6.2 wrong: 3 builders gave 1.03x). So a category owner per lane is cheap when it is a step in a flow and not a round of manager meetings. The 10-16 failure was the rounds: manager rounds were 35% of tokens, with 41 dispatch requests in one day (F-41).
- **The W-series history.** The 10-18 plan (`2026-10-18-founder-category-scale-out-plan.md`, still proposed) already carried the founder's ask for an independent Category Management org that borrows agents. F-50 answered it with a pool (option A over C, because C "multiplies the manager rounds"). F-53 keeps F-50's lanes and budgets and changes only who owns a category and who dispatches.

### 1c. What the un-park rule has shown so far

The F-50 rule says a category gets its lead back if its brief queue goes 2 cycles without clearing, or if its route-reviewer findings rise above 1 in 5. **So far it has shown nothing, and it cannot.**
- F-50 was applied today, and a cycle is two weeks, so 0 of the 2 cycles have passed.
- "Clearing" has no definition and no meter. No tool counts closes per category per cycle.
- The findings arm has no denominator: route-reviewer has never run.
- The stall it would detect began 8 days *before* F-50 (the last dated close is 2026-10-17). That stall comes from dispatch: the operator is the only hands. It does not come from the pool.

The case for restoring category owners therefore rests on the founder's direction and on objection 1 of F-50, not on the rule firing. To keep the rule honest from now on, F-53 defines clearing (item F53-6): **a category's queue clears in a cycle if it closes at least as many items as it opens, and at least 1.**

### 1d. The logical structure

Each **category owner** (`cm-<domain>`, 14 roles) owns:
- `company/domains/<d>.md` (charter, including the sensitive lines and the refuse list);
- the rulings in its memory and charter;
- `content/curriculum/<d>.json` (map, demand);
- `company/domains/briefs/<d>*.md` (strand sections);
- its coverage line;
- its open board items, as the owner of record.

Its job each cycle: keep the category's queue full of briefs worth building, in priority order. It also takes each item through **its** lane from brief to "ready for check", and answers findings about its lessons. Its mission is today's curator mission, with "the category is data you read, not a role you are" reversed: *the owner is the category.*

The **category lead** is one role: principal-pm-verticals, re-scoped and retitled.
- It holds the cross-category portfolio (which concepts the verticals need, in what order).
- It runs the per-category clearing meter and the un-park/park rule.
- It sets each category's cycle token line, under the portfolio-manager's register.
- It is the single report line for the 14 owners.
- It also keeps the lane S manager seat, because lane S *is* the catalogue.

It does not approve briefs one by one. That would rebuild the rounds.

**Option L (the founder picks):**
- **L1 (recommended).** Category owners report to the category lead, and the lead reports to the founder. Product and portfolio is a peer central team.
- **L2.** Category owners report straight to head-of-product, and principal-pm-verticals becomes a central planning seat. This removes one more seat but puts 14 directs back on head-of-product, which F-50 objection 5 said not to do.

Strands stay sections of the category files. **cm-course-ncm stays parked:** a course is an ordered path over existing items (F-50 §2a), so it has no queue of its own. Big-ideas and behavioral, with 6 and 4 concepts covered, are owners on a **dormant** footing: they run only when their lane asks for a batch from them.

### 1e. The physical side: one agent, run as a named owner

- **One agent definition, `category-owner`.** It is a rename of `.claude/agents/category-curator.md`, generated from roles.mjs. Each of the 14 roles carries `agent: "category-owner"` in roles.mjs and in `company.json` (`agents: { "cm-history": "category-owner", … }`, additive, as PRINCIPLES.md allows).
- **The launch names the owner.** The launcher passes `--as=cm-history`. The session's first steps are fixed in the agent file:
  1. read `company/roles/cm-history.md`;
  2. `node tools/memory.mjs read cm-history`;
  3. read the charter, `npm run company -- coverage history`, and the board filtered to `owner=cm-history`.
  
  It ends with `memory.mjs add cm-history`. Ownership and memory persist in the logical role. The session is disposable.
- **One category per session** (already a rule: curator outOfScope "Another category in the same run"). Mixing two categories' rulings in one context is the failure the pool has now: one memory file for 14 categories, compacting at 50 KB.
- **At most 2 category owners at once.** That holds the host: 4 CPUs, 4.4 GB of disk free today, and each build is 0.7-1.0 GB. It also holds the builder cap: 3, shared.
- **What must change in code (non-protected; owners in section 8):**
  - un-park the 14 lead ids and give them `agent`;
  - generate.mjs emits one agent file per `agent` value, not one per role;
  - dispatch-check S2 accepts a role whose `agent` has an agent file;
  - re-own the 172 items back by their `reowned.from`;
  - HQ seats: one desk per category (test:hq).

### 1f. One agent spins its own subagents: which mechanism, and what it needs

**The records' constraint is true, but only inside one Claude Code session.** "Subagents cannot start subagents" (F-30, carried into F-42 and F-50 §3) describes the Agent tool: a subagent dispatched with it has no Agent tool of its own. This session is an example. It is not true of a **top-level session**, which has the Agent tool. F-53 relies on top-level sessions, by one of two launch paths:
- **(a) Meta's launcher.** The Agent SDK `sdkSession` in system3-meta `src/crew-run.mjs`. It ran M6's 26 sessions at `--max-parallel=8`, with a ledger whose charged total matched exactly. It has a per-run budget stop (K13), which worked live in M6.
- **(b) The remote-session path.** The `create_session` tool that the operator's environment exposes.

**Recommended: (a).** It has a measured record, a budget stop and a ledger, and it runs on this host. (b) is a fallback when the host is full, but it has no ledger line today.

What has to be **built or approved** before the first category session:

| # | What | Status today | Owner |
|---|---|---|---|
| B1 | A spike: one top-level category session dispatches one builder through the Agent tool, under dispatch-check, and its load is measured. This is precondition A of the 10-16 proposal, which never ran in this company. M6's sessions were stages; none of them dispatched. | not run | principal-engineer (spike), tools-lead |
| B2 | Caps across dispatchers: the slot ledger (`tools/lib/slots.mjs`, O_EXCL, 6 h stale) is precondition B, **met**. A per-caller allow-list is still needed: a `cm-*` caller may dispatch only demo-builder, interaction-designer and research-scientist, and dispatch-check FAILs a checker. Mailbox M1's lane rule is the base. | half built | tools-lead |
| B3 | Deploy guard in CI (W-1051 release-manager, W-1052 evaluation-steward: both backlog). This is precondition C: no new top-level session may push until it holds. | **not met** | release-manager, evaluation-steward |
| B4 | The meter: ledger import resumes, and each top-level session writes a ledger line with its lane and category (W-2034). Without it the stop rule cannot fire, and P4 below cannot be judged. | not met | tools-lead |
| B5 | The single writer is unchanged. Category sessions report board moves, events and handoffs in their final message, or in their batch file. chief-of-staff copies them, as AMD-005 and F-42 require. Slots release on the hook spool, not on events.jsonl. | rule stands | chief-of-staff |
| B6 | Founder approval of the capability: the Agent tool for `category-owner` (a `tools:` change in roles.mjs), and a host-load budget for at most 2 category sessions | founder | founder |

**Independence.** A category owner never dispatches a checker of its own items, as F-50 S4 and the 10-16 rule 3 already require. When an item is ready, the owner moves it to review with its lane tag. The **quality desk** drains the review queue on standing orders: tester, fact-checker, learner-evaluator, route-reviewer, and pedagogy-critic where the lane says. Who runs the desk is option Q:
- **Q1 (recommended).** The chief of staff's top-level session drains the review queue mechanically, as it drains mailboxes today. The checkers are dispatched by someone who did not make the item, and the referee owner stays out of dispatch.
- **Q2.** evaluation-steward runs the desk. This is closer to the team, but it puts the referee owner in charge of the checks it audits (objection 5).

## 2. Testing as one physical agent

Today's checking roles, and the grouping:

| Role (logical, kept) | What it checks | Physical agent |
|---|---|---|
| qa-tester | the Playwright QA contract (tests/qa, protected), `company qa-record`, hand runs at phone and desktop | **tester** |
| accessibility-reviewer | keyboard path, aria, contrast light/dark, `tools/a11y-scan.mjs` | **tester** |
| (runs of tools) sequence probe `tools/sequence-probe.mjs`, `tools/reveal-fit.mjs` | lane M sequence, reveal fit; tool owner platform-engineer (F-52) | **tester** (runs them); platform-engineer keeps the tools |
| fact-checker | claims, sources, derivations | own agent (witness) |
| learner-evaluator | the learner walk, artifact first | own agent (witness) |
| pedagogy-critic | pairwise | own agent (witness) |
| route-reviewer | safety, sensitive, copyright | own agent (witness) |
| evaluation-steward | owns the referee (gates, QA contract, amendments) | own agent (referee owner) |
| interaction-designer, design-lead (design review) | spec and built stage | **design** (section 3) |
| privacy-reviewer, personalization-eval | learner data; personalization policies | own agents (witnesses of engineering's makers) |

**Why the tester grouping is allowed.** It is the same kind of work, mechanical checks of the rendered page, on the same artifact: one build of one lesson version. None of these roles is a witness against another. The tester is still a checker of the maker, so it is **never** the demo-builder's session, even though F-52 G1 has the builder run the same tools in its own loop. Each logical role keeps its own record: `<date>-qa.md` and `<date>-a11y.md`, signed by role. accessibility-reviewer keeps its judgement items (contrast in both themes, meaning by colour) as a checklist the tester must complete. It does not shrink into "the scan passed" (objection 3).

**What it saves (cube lesson, 2026-10-25).**
- math/flatten-the-cube-to-a-dot had **at least 7 separate production builds** across its sessions: `.next-w2056` (builder), `.next-fc2055` and `.next-fc2064` (fact-checker), `.next-le-cube` (730 MB) and `.next-le-v2` (960 MB, still on disk; learner), `.next-qa-v2` (qa-tester), and `dist-pe-w2047` (874 MB, still on disk; the platform-engineer's probe fix).
- The fact-checker's and qa-tester's builds were both of **the same commit, 3e365688e**.
- At 0.7-1.0 GB each (up to 1.8 GB with a second build dir), that is about 5-7 GB of churn for one lesson, on a host with 4.4 GB free (89%). The builder's handoff records an ENOTEMPTY incident on the shared `.next`.
- **T1 (the grouping):** qa, a11y, probe and fit run in one tester session, with 1 build per checked version instead of 2-3. On the cube it would have saved the separate probe re-run build.
- **T2 (larger, an engineering option):** one read-only build per commit, made once and served to every checker. Witnesses may share the *artifact*; what they must not share is a judgement or a source. On the cube that is 7 builds to about 3: the maker's loop, plus one per checked version. Owners: platform-engineer, with tools-lead. It needs no gate change; the QA contract still runs against a release build.

## 3. The rest of the org: central teams and physical agents

Group only where the work is the same kind on the same artifact, and never across a maker/checker, fact/learner, or referee/judged pair.

| Central team (lead) | Logical roles | Physical agents | Grouping reason |
|---|---|---|---|
| **Categories** (category lead) | category lead (principal-pm-verticals), 14 category owners | **2**: category-lead, category-owner (runs as any cm-*) | the same kind of work on the same kind of artifact (a category's map and queue); one category per session |
| **Content types** (design-lead): lane S, lane M, future formats, `formats.md`, `system.md`, the kit's format standards | design-lead, interaction-designer, demo-builder (pool) | **2**: design (design-lead + interaction-designer), demo-builder | design-lead's and interaction-designer's reviews look at the same spec and the same built stage. Today they count as two reviews, but they are **one witness**. Grouping says so honestly (objection 4). The builder is a maker and stays alone. |
| **Engineering** (principal-engineer) | principal-engineer, principal-engineer-ops, platform-engineer, backend-engineer, personalization-engineer, tools-lead, hq-engineer, rnd-lead | **5**: eng-review (PE + PE-ops: tiers, reviews, readiness approvals); platform-engineer (kit, host, the probe tools); hq-tools (tools-lead + hq-engineer: the HQ, its adapters and pages); learner-data (backend + personalization-engineer: server code under src/app/api, src/lib/server and src/lib/learner); rnd-lead | same kind of code on the same artifact. Condition: hq-engineer's review of others' HQ page changes moves to platform-engineer, so the grouped HQ agent never reviews its own diff. |
| **Quality** (evaluation-steward) | evaluation-steward, qa-tester, accessibility-reviewer, fact-checker, learner-evaluator, pedagogy-critic, route-reviewer, personalization-eval, privacy-reviewer* | **8**: steward, tester, fact, learner, pedagogy, route, personalization-eval, privacy | only qa and a11y are grouped; every witness keeps its own agent. *Option P: privacy-reviewer moves from principal-engineer's line to the steward's, so the reviewer of learner data does not report to the makers' lead (principal-engineer may object). |
| **Product and portfolio** (head-of-product) | head-of-product, portfolio-manager, head-of-strategic-initiatives (to 11-23), analytics-steward, pattern-librarian, research-scientist (pool), growth-designer, vp-marketing (to 11-23) | **6**: head-of-product; planning (portfolio-manager + head-of-strategic-initiatives: registers, budgets, dates); insight (analytics-steward + pattern-librarian: claims about evidence that can lose); research-scientist; growth-designer; vp-marketing | same kind of record work on the same registers |
| **Release** (release-manager) | release-manager | **1** | publishes; the only deploy path |
| **Operator and auditor** | chief-of-staff, chief-of-staff-ceo-office | **2** | the auditor watches the operator, so they are never grouped |

Note: portfolio-manager reports to me today. Under F-53 it moves to head-of-product's team, because portfolio work is not org health.

### Layers below the founder

| Path | Today | F-53 (L1) |
|---|---|---|
| category work | founder → head-of-product → principal-pm-verticals → category-curator (3) | founder → category lead → category owner (2) |
| builders | founder → head-of-product → principal-pm-verticals → demo-builder (3) | founder → design-lead → demo-builder (2) |
| lane M design | founder → head-of-product → design-lead → interaction-designer (3) | founder → design-lead → interaction-designer (2) |
| HQ | founder → chief-of-staff → tools-lead → hq-engineer (3) | founder → principal-engineer → tools-lead / hq-engineer (2) |
| engineering ops | founder → principal-engineer → principal-engineer-ops (2) | same (2) |
| quality | founder → evaluation-steward → checkers (2) | same (2) |
| **deepest** | **3** | **2** |

The team leads (head-of-product, design-lead, principal-engineer, evaluation-steward, release-manager, category lead) report to the founder: six leads plus the operator and the auditor. head-of-product's directs become portfolio, insight, research, growth and marketing. It no longer manages the categories or the builders.

## 4. Counts against P7

| | Today | F-53 | F-53 after the dated parks (2026-11-23; rnd-lead if F-49 is declined) |
|---|---|---|---|
| Logical agent roles (excl. founder) | 33 | 47 (33 + 14 category owners) | 44 |
| Distinct physical agent definitions (what the P7 audit counts) | 33 (no role carries `agent`) | **26** | **24** |
| Sessions at once, typical (one category's lane S batch: operator, 1 owner, 2 builders, quality desk work through 3 checkers) | not measured; caps 14 sessions, 3 builders (`2026-10-16-founder-agent-cap-14.md`) | **8** | 8 |
| Sessions at once, peak (2 owners, 3 builders, 3 checkers, operator, 1 engineering) | up to 14 by cap | **10** (proposed cap; builds limited by disk) | 10 |
| Agent-hierarchy depth | 3 | 2 | 2 |

**P7 default: 8 roles for a corporate design.** At once, F-53 runs at 8 typical and 10 peak. The distinct count of 26 still needs `sizeReason`:
- 12 of them are the two flows' steps plus the referee: category-owner, builder, design, tester, fact, learner, pedagogy, route, release, steward, operator, category-lead.
- 7 are engineering and stewards of a live product with learner accounts and a privacy gate.
- 5 are planning, research and insight.
- 2 are dated: vp-marketing and head-of-strategic-initiatives, inside the planning agent.

Most of them are idle in any one cycle. `company.json` would gain `agents` and a new `sizeReason`; I write that only after a founder yes.

## 5. Choices for the founder (row by row)

| # | Choice | Recommendation |
|---|---|---|
| F53-1 | Restore 14 category owners as logical roles (un-park the domain leads; strands and cm-course-ncm stay parked); re-own the 172 items back | yes |
| F53-2 | One physical `category-owner` agent run as a named owner (`--as=cm-<d>`), one category per session, at most 2 at once | yes |
| F53-3 | Category owners as top-level sessions that dispatch their own makers, via Meta's SDK launcher, after B1-B4 (B3 and B4 are not met today) | yes, gated on B1-B4; one-category pilot first (history: sensitive route, 28 open items) |
| F53-4 | Quality desk on standing orders: Q1 the operator drains it (recommended), Q2 evaluation-steward | Q1 |
| F53-5 | Report line: L1 category lead (recommended) or L2 straight to head-of-product | L1 |
| F53-6 | The un-park/park rule metered per category (clearing = closes ≥ opens and ≥ 1 per cycle); a category that does not clear in 2 cycles goes dormant (runs only on a lane request), and does not lose its owner | yes |
| F53-7 | Tester agent (qa-tester + accessibility-reviewer; probe, fit and scan), two records | yes |
| F53-8 | T2 shared read-only build per commit for all checkers | yes, as an engineering item |
| F53-9 | The other groupings of section 3 (design, eng-review, hq-tools, learner-data, planning, insight) and the moves of portfolio-manager, demo-builder and HQ lines; option P (privacy to the steward) | yes; P is the founder's call after principal-engineer's answer |

Nothing here changes a gate, `tools/company.mjs`, `tests/qa/**` or any protected path. The QA contract still runs as written. The only change is who runs it in which session.

## 6. Predictions (committed 2026-10-25, before any step runs)

| # | Prediction | Measured by | Wrong if |
|---|---|---|---|
| P1 | In the first cycle after F53-1/F53-2, at least 10 of the 14 categories close at least 1 queue item, and the open category queue (173 today) falls at least 30% within 2 cycles | board.json closes by `owner=cm-*`, the F53-6 meter | fewer than 8 categories close an item in cycle 1, or the queue falls less than 15% in 2 cycles |
| P2 | Once F53-3 runs, the operator's share of dispatches falls from 1,280 of 1,281 to at most 50% in the pilot category's cycle | dispatch events and slot `chooser` | above 80% |
| P3 | No category session dispatches a checker | dispatch-check log, slots | ≥ 1 checker dispatched by a `cm-*` caller (then F53-3 stops) |
| P4 | Category ownership, including a session's own orchestration, costs at most 20k tokens per published lesson, and lane S stays at or below 150k all-in | ledger lines per category (B4) | above 40k, or unmeasured at the end of cycle 1 (counts as wrong) |
| P5 | With F53-7 and F53-8, the next 3 lane M items average at most 3 production builds per lesson version (the cube had 7 or more), with no mechanical defect first found by fact-checker or learner-evaluator that the tester's run covers | build dirs named in handoffs and records | above 4 builds per version, or one such escaped defect |
| P6 | Route findings on briefs from history, lifehacks and books owners stay at or below 1 in 5 | route-reviewer brief records | above 1 in 5 over the first 10 such briefs |
| P7 | No session exceeds 10 at once, and disk free never falls under the 10 GB host floor because of checker builds | slots list, host guard | a cap breach, or an ENOSPC traced to parallel checker builds |

## 7. Cost

- **Applying it** (estimate; the meter is off): about 1.0-1.5M tokens.
  - roles.mjs: un-park and `agent` fields, generate, the S2 change, the allow-list (about 0.5M);
  - re-owning 172 items and re-seating the HQ (about 0.2M);
  - the B1 spike (about 0.3M);
  - written consults (about 0.2M).
  
  Of these, B3 and B4 are already on the board (W-1051, W-1052, W-2034) and are not new cost.
- **Running it.** A category session that dispatches holds its context while its makers work: an estimated 150-300k per batch of 10-20 items, or 10-20k per published lesson. That is the size of the 2% M6 measured, and well under the pre-F-50 rounds (8.34M for 82 lead runs). If the operator's dispatch work falls as P2 predicts, the coordination share should fall too, but the operator has never been measured (F-50 P1).
- **Disk.** T2 frees about 3-4 GB per lane M lesson at today's build sizes.

## 8. Owners and steps (after a founder yes; none run before it)

| # | Step | Owner |
|---|---|---|
| 1 | Decision record, with the objections and their answers | chief-of-staff-ceo-office |
| 2 | Written consults: the roles in section 9 plus principal-engineer, principal-pm-verticals, head-of-product, chief-of-staff | chief-of-staff-ceo-office |
| 3 | roles.mjs: un-park 14, `agent` field, generate.mjs one file per agent, S2, HQ seats | chief-of-staff-ceo-office, hq-engineer |
| 4 | Re-own 172 items by `reowned.from`; the F53-6 meter | chief-of-staff (board writer), tools-lead |
| 5 | B2 allow-list, B4 meter | tools-lead |
| 6 | B3 deploy guard | release-manager (W-1051), evaluation-steward (W-1052) |
| 7 | B1 spike, then the one-category pilot (history) | principal-engineer, then the category lead |
| 8 | Tester agent and records (F53-7); T2 shared build | evaluation-steward (records), platform-engineer and tools-lead (T2) |
| 9 | `company.json`: `agents`, `sizeReason`; poc-map and operating loop | chief-of-staff-ceo-office, chief-of-staff |

Undo: revert the roles commit and regenerate (F-50's parked definitions are untouched), and re-own the items by their `reowned` notes.

## 9. Objections (invited; none of the roles could be consulted in this session, so each is **represented** by me, from its records, and stays open until it answers in writing)

| # | From | Objection (represented) | Answer or status |
|---|---|---|---|
| 1 | category-curator (represented; source: its 4 runs on W-2037..W-2049, company/roles/memory/category-curator/) | "The pool works. It took the cube brief through 4 runs in a day. Renaming it adds a launch flag, not judgment." | **Answered in part.** The 4 runs were all math, and 0 of 173 category items moved. The change keeps the agent and gives it back the owner's memory, which `memory.mjs` cannot write today. **Open** until it answers. |
| 2 | qa-tester (represented; source: its 2026-10-25 handoffs) | "My contract record is evidence for the gate. If a11y judgement items land in my session, a missed contrast check becomes my miss." | **Answered:** two records signed by role, with the a11y checklist completed item by item. **Open.** |
| 3 | accessibility-reviewer (represented; source: its role doc's in-scope list) | "My scope is keyboard path, contrast in light and dark, meaning never by colour alone. Grouping me with scanners turns judgment into a scan. The cube's light theme was never seen." | **Standing in part.** The checklist is binding, and the light-theme gap goes in the tester's brief. Whether one session holds both kinds of attention is what P5 measures. **Open.** |
| 4 | design-lead (represented; source: lane M manager seat, F-52) | "Content-types lead, lane M manager and design reviewer in one seat is too much. Grouping me with interaction-designer leaves lane M one design review short." | **Answered in part:** the two reviews already read the same spec and stage, so they are one witness (P6). The builder moves under design-lead, while the category lead takes the category queues. **Standing:** span. |
| 5 | evaluation-steward (represented; source: referee owner, F-41 item 9 never run) | "If the quality desk is mine (Q2), I dispatch the checks I audit. And a tester agent changes who runs tests/qa without an amendment." | **Answered:** Q1 keeps the desk with the operator. tests/qa is unchanged, and only the session that runs it changes. You decide whether the record format needs an amendment. **Open.** |
| 6 | principal-engineer (represented) | "B1 is my precondition A from 10-16, and it never ran. The host has 4 CPUs and 4.4 GB free." | **Agreed:** F53-3 is gated on B1, with a cap of 2 category sessions. |
| 7 | chief-of-staff-ceo-office (Leonie, against my own draft) | "A reorg every week": F-50, F-52 and F-53 are three org changes on one day. | **Standing, by my own failure-mode list.** F-53 keeps F-50's lanes, budgets and gates. It changes ownership and who dispatches, and it is applied one category at a time. |

<!-- Sources checked 2026-10-25: tools/org/roles.mjs (roles 34, parked 77, PARK block), tools/memory.mjs roleOf, tools/lib/slots.mjs header, tools/dispatch-check.mjs S2, company/ops/board.json (owner and state counts), npm run company -- coverage, company/ops/events.jsonl (route-reviewer: 0 actor events), company/company.json, company/ops/progress.md 2026-10-25 entries (cube builds), du of .next-le-v2 / dist-pe-w2047, df (4.4 GB free), system3-meta PRINCIPLES.md, docs/runs/M6-RUN.md, src/crew-run.mjs sdkSession. -->
