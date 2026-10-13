# Org-change proposals: 2026-10-13

owner: chief-of-staff-ceo-office (Leonie) · decides: founder · status: proposed (I may not approve my own proposals)
rests on: `2026-10-13-role-evaluation.md`, `handoff-map.md`

Ranked by impact on company health. Most proposals **change a handoff, not the headcount**: the roster already has the roles. The problem is that the loop routes around them. Three proposals reduce the roster.

| Rank | Proposal | Needs the founder? | Implements | Cost |
|---|---|---|---|---|
| P1 | The operator stops publishing and QA-recording; release manager and QA tester take their steps | **yes** (role authority change) | chief-of-staff (checklist, loop), tools-lead | ~2 sonnet runs per launch batch |
| P2 | Meet the accessibility launch condition, or waive it in writing | **yes if waived** (gate override); otherwise no | chief-of-staff (dispatch), head-of-product | ~6 sonnet runs (76 lessons in batches of ≤15) |
| P3 | Instruments the operator cannot bend: attribution from dispatches only, honest record labels, metrics owned by the analytics steward | **yes** (tools-lead line; amendment for `company.mjs`) | tools-lead, evaluation-steward, analytics-steward | 1 tools run + 1 amendment |
| P4 | Wire the design and pedagogy handoffs that exist on paper | no (head-of-product approves W-096) | category leads, chief-of-staff | ~15–30k tokens per non-default lesson (design-org estimate) |
| P5 | Unblock the evaluation steward; ratify AMD-001(d) so the gate, not the holds file, decides | **yes** (ratify) | evaluation-steward | 1–2 opus runs |
| P6 | Judges report to the evaluation steward, not to the owner of the work | **yes** | chief-of-staff (roles.mjs) | none |
| P7 | Reporting lines that match the work; a span of control under 10 | **yes** | chief-of-staff (roles.mjs) | none |
| P8 | Roster hygiene: missing decision records, two merges, a sunset for sub-area managers | **yes** | chief-of-staff, CEO office (offboarding) | none |
| P9 | Fix the written contradictions (operating loop, org chart, checklist) | no | chief-of-staff | none |

---

## P1. The operator stops publishing and QA-recording

**Draft decision record** (`company/decisions/2026-10-1x-operator-does-not-publish.md`)

> # Decision: the operator does not publish, chair launches or file QA records
> owner: founder · drafted by: chief-of-staff-ceo-office · status: proposed
>
> ## Finding
> All 76 publishes and the one unpublish were done by the chief of staff via `publish-ready.mjs --publish`. Checklist step 9 says to do this, and the role says the chief of staff may not ("Mark anything verified or published"; "only release-manager publishes"). Both publish incidents on 2026-10-13 (friends-have-more-friends, eratosthenes-shadow) were the operator's (retro-2). Every launch-review record is chaired "acting: chief-of-staff". `company qa-record`, run by the operator, stamps "recorded by: qa-tester". The QA tester has never run, and exploratory QA has never happened.
>
> ## Decision
> - After each review batch has reported, the chief of staff **dispatches the release manager** (sonnet) with the batch's slugs. The release manager runs `publish-ready.mjs` and decides holds. It writes the holds file and the launch-review batch entry, publishes, and adds the release record. The chief of staff keeps merge and integration.
> - The launch review is chaired by the head of product. If the head of product is unavailable, the chair is a named delegate who is not the operator: the principal PM, or the release manager for routine batches whose gates all pass.
> - The **QA tester** runs `company qa-record` on the integrated build and does an exploratory pass on a sample (every new format, every lesson with a layout finding, and 10% of each batch). It owns W-052 and W-082.
> - Checklist steps 4 and 9 change from "do" to "dispatch".
>
> ## Objections that travel
> - **Cost and latency:** two more dispatches per batch. About 2 × 60k tokens against the ~200k a builder spends. Accepted.
> - **The release manager's judgement on holds may be weaker than the operator's.** The holds so far came from facts in review records (screenshots not seen, a contradicted stage), which the release manager can read. When it is unsure, it holds and puts the question on the board.
> - **Emergency unpublish** (interrupt tier) stays open to anyone, logged as an incident.

## P2. Accessibility: meet the launch condition, or waive it in writing

**Draft decision record**

> # Decision: accessibility review of the 76 published lessons
> owner: head-of-product · status: proposed
>
> ## Finding
> The first launch review (2026-10-13) went "with conditions: a review within the next cycle, and any lesson that fails it is unpublished". Today there are 0 accessibility records and 71 more publishes, and no waiver is on record. 49 learner reviews mention contrast, screen-reader labels or tap size. Board W-010, W-015, W-057 and W-102 are all unworked.
>
> ## Decision
> - Dispatch the accessibility reviewer (sonnet) on the 76 published lessons, in batches of ≤15, from built app plus walkthrough artifacts. Start with W-015's merge-sort-payoff and the 5 lessons of the original condition.
> - A lesson that fails is unpublished by the release manager (P1) until it is fixed, as the condition says.
> - From now on an accessibility record is launch evidence alongside the learner review. Making it a gate is an amendment (evaluation steward). Until then the launch-review checklist line stays and the box is ticked by the reviewer's record, not by hand.
> - If the founder prefers not to unpublish, the waiver is a decision record with its reasons. "Noted" is not an answer.
>
> ## Objections that travel
> - **Unpublishing shrinks the live catalogue before the first deploy.** Nobody is learning from it yet (no deploy), so this is the cheapest moment to do it.
> - **Kit-level problems** (contrast tokens, focus order) should be fixed once in the kit, not 76 times. The reviewer files them as one platform-engineer item with the visual designer.

## P3. Instruments the operator cannot bend

**Draft decision record**

> # Decision: who-did-what comes from dispatches, not from commit messages
> owner: founder · status: proposed
>
> ## Finding
> `tools/events.mjs` `classifyCommit()` sets the actor from keywords in the commit message. "publish" becomes release-manager, "qa" becomes qa-tester, "crit" becomes pattern-librarian ("Upgrade to Next 16.4 (critical advisory)" is logged as a pattern-librarian meeting), and HQ file paths become tools-lead. So HQ shows the release manager and QA tester working when they never ran. `company.mjs` writes "recorded by: qa-tester" for whoever runs it. The WBR metrics are "analytics-steward (acting: chief-of-staff)". EXP-003, which judges the operator's model choice for builders, is owned by the operator. The tools-lead, who owns these instruments, reports to the operator.
>
> ## Decision
> - A commit's actor is the dispatched agent whose worktree or report produced it, and `chief-of-staff` otherwise. A keyword sets the room, never the actor. (tools-lead, `tools/events.mjs`, not protected)
> - `company qa-record` writes `recorded by: <runner>` from an argument, `--by=<role>`. (evaluation steward drafts the amendment, because `tools/company.mjs` is protected)
> - The **analytics steward** owns the WBR metrics and the analysis of EXP-003. The chief of staff stays the experiment's proposer, not its judge.
> - The **tools-lead reports to the principal engineer**, not the chief of staff. The CEO office reads the instruments. The operator may request changes but not approve them.
> - A COE is not closed until its named reviewers sign it.
>
> ## Objections that travel
> - **Backfilled history would change.** The log is append-only, so do not rewrite it. Add `attribution: "keyword"` to old events and compute agent metrics only from dispatch, report and usage events (metrics already do).
> - **One more reporting line for the principal engineer.** It has 2 reports today and gains 3 with P7. Still under 10.

## P4. Wire the design and pedagogy handoffs that exist on paper

No founder decision needed. The design-org decision already accepted this. The head of product approves the catalogue (W-096), and this is the routing that makes it real.

**Draft decision record**

> # Decision: briefs carry a format; first runs for the design and pedagogy roles
> owner: head-of-product · status: proposed
>
> ## Finding
> 0 of 495 briefs name a format, so pipeline step 3 never triggers. 0 design notes, 0 specs, 0 mockups, 0 research notes, 0 pairwise records, 0 design reviews. 104 of 289 learner reviews say "told, not shown" and 71 mention clipped or crowded stages. Demo-crit (W-003) has been overdue since 2026-10-12.
>
> ## Decision
> 1. `claim.mjs` refuses a brief with no `format:` line (tools-lead), and category leads add formats to the unbuilt briefs (one sonnet run per lead).
> 2. First runs: design-lead W-100 (20 contact sheets, catalogue v1); learning-designer + interaction-designer + mockup-artist on the 5 Life Hacks briefs and the 10 worst "told, not shown" revisions (W-101, W-027).
> 3. Demo-crit runs now on v1/v2 pairs. Pedagogy critic gets A/B without authorship.
> 4. One mockup source: the interaction designer requests mockups, and the learning designer's input changes from "Mockups" to "Interaction spec". (roles.mjs, chief-of-staff)
> 5. The researcher is called only on a trigger: a design question with no settled answer, or a disputed claim whose source the builder picked.
>
> ## Objections that travel
> - **Cost per lesson rises** for non-default formats (15–30k tokens). Default formats skip it, and the review sample is 10%.
> - **The builders' launch rate (37% on first review) may not move.** The analytics steward commits a prediction before the first designed batch: designed lessons launch on first review at ≥ 50%. It would be wrong if they launch at < 40% across ≥ 15 lessons.

## P5. Unblock the evaluation steward; let the gate decide

**Draft decision record**

> # Decision: AMD-001 to the founder this week; the steward's queue is dispatched
> owner: founder · status: proposed
>
> ## Finding
> The evaluation steward has 13 open board items (the most of any role except demo-builder) and has run once. 130+ lessons show "ready to publish" in `status` because the gate does not read learner verdicts or versions (AMD-001d, unratified). So publishing depends on the holds file, which is the operator's judgement. W-021 (an independence breach) has been open since day one. EXP-001 (planted false claim, the test of the fact-checker) has not run.
>
> ## Decision
> - The founder rules on AMD-001 (a–d) at the overdue constitutional review.
> - The chief of staff dispatches the evaluation steward on W-021, W-073 (screenshots seen/not seen), W-063 and EXP-001 in one run.
> - The steward drafts the gate amendments for safety review (Life Hacks), per-locale cultural review and accessibility evidence together, so the constitution changes once and not three times.
>
> ## Objections that travel
> - **Amendments are slow on purpose.** Yes. That is why the queue should be batched now, not trickled.

## P6. Judges report to the evaluation steward

**Draft decision record**

> # Decision: every judge reports to the evaluation steward
> owner: founder · status: proposed
>
> ## Finding
> The cultural reviewer reports to the localization lead, whose locales it judges. Its rule "may not review a variant they localized" covers the individual, not the line. The Life Hacks safety reviewer reports to the evaluation steward but has `team: categories`, and HQ seats it on the Life Hacks floor.
>
> ## Decision
> - `cultural-reviewer`: reports to evaluation-steward, `team: quality`. The localization lead supplies the locale standard as an input.
> - `lifehacks-safety-reviewer`: `team: quality`. Its HQ seat moves to the quality rooms.
>
> ## Objections that travel
> - **The localization lead loses control of review pace.** Accepted. That is the point of the change.
> - **The evaluation steward goes to 7 reports**, all narrow checkers. Fine.

## P7. Reporting lines that match the work

**Draft decision record**

> # Decision: engineering roles report to the principal engineer; the head of product's span drops from 20
> owner: founder · status: proposed
>
> ## Finding
> The head of product has 20 direct reports and has run once. Every launch review was chaired by the operator "acting". The org chart draws Engineering under the principal engineer, but `platform-engineer` and `release-manager` report to the head of product.
>
> ## Decision
> - `platform-engineer`, `release-manager` and `tools-lead` (P3) report to `principal-engineer`.
> - The 10 category leads report to `principal-pm-verticals` **once the founder's verticals brief exists**. Until then they stay with the head of product. Head-of-product span: 20 → 17 now, 7 later.
>
> ## Objections that travel
> - **Category leads under a PM with no strategy yet** would make the line ceremonial. Hence the condition.
> - **The release manager under engineering** separates "what ships" (head of product, at launch review) from "how it ships" (release). Each publish still needs the launch-review go.

## P8. Roster hygiene

**Draft decision record**

> # Decision: records for unrecorded roles; two merges; a sunset
> owner: founder · status: proposed
>
> ## Finding
> Commits d2b09ae (27 sub-area managers, principal-pm-verticals), c6638e3 (the CEO office), 136e889 (illustrator) and 63e7923 (design engineer) have no decision records. 38 of 74 roles have no work they can do today. 7 of 10 curricula are at or within one concept of their cap, and the strand brief files are 3-line stubs.
>
> ## Decision
> - Retroactive decision records for d2b09ae, c6638e3, 136e889 and 63e7923, with their objections (the chief of staff writes them; the CEO office reviews them).
> - **Merge** `domain-scout` into `principal-pm-verticals` (the Domain Launch Review becomes one of its tools), and `hq-engineer` into `tools-lead`.
> - **Sub-area managers: sunset at the next op-planning.** If no strand has a ranked queue of at least 5 briefs by then, they retire through offboarding and their strands become sections of the domain brief file. `claim.mjs` keeps reading strand files either way.
> - `visual-designer` waits until the first design review produces token or style findings. The `illustrator` waits with it, and its image check gets named first (fact-checker for depicted facts, safety reviewer for Life Hacks).
- **New rule:** a role change without a decision record fails `npm run check` (tools-lead adds a check comparing `roles.mjs` ids against decision records). The roster grew by two more unrecorded roles while this evaluation was being written.
>
> ## Objections that travel
> - **"A reorg every week."** These changes are reversible (regenerate from roles.mjs). The merges remove unused roles; they do not move working ones.
> - **The founder may want the strands for the planned growth past 500.** Then the OP opens the curricula, and the managers are activated with work, not before.

## P9. Fix the written contradictions (no founder needed)

- `ops/operating-loop.md` §11: "The chief of staff alone writes the board, the progress log, the event log and the WBR". This contradicts CLAUDE.md (every role writes its progress handoff) and practice (fact-checker and platform-engineer entries). Proposed: "the chief of staff alone writes the board and the event log; every role adds its progress handoff; the CEO office writes the WBR company-health section."
- `org-chart.md` is stale. It shows 26 roles, the mockup artist in Studio, and no Design, Backend, Growth, Tools, Life Hacks, Personalization, International, sub-area or CEO office. Regenerate it from `roles.mjs`, as `roles/README.md` already is.
- `ops/chief-of-staff-checklist.md` steps 4 and 9 (see P1).
- The operator's role `handoffs` is the only populated `handoffs` field in `roles.mjs`. Proposed: populate `handoffs` for every role from section 1 of `handoff-map.md` (chief-of-staff edits roles.mjs; CEO office supplies the table).

---

## Company-health metrics for the WBR (what I will report weekly)

| # | Metric | Definition | Today | Source | Status |
|---|---|---|---|---|---|
| H1 | **Role use** | active-verdict roles (keep / activate / re-scope) dispatched ≥ 1 time this week ÷ active-verdict roles | 16 of 34 ever dispatched: keep 14 of 16 (the founder is human and the CEO office is new), activate 1 of 14 (the evaluation steward, once), re-scope 1 of 4 (the head of product, once; the operator is not counted) | `metrics.mjs` `neverDispatched`, `agentRows` | computed; needs a per-week window and the verdict list |
| H2 | **Operator self-checks** | count of steps the operator did that belong to a checking or executing role: publishes not by release-manager, QA records not run by qa-tester, ritual records with "acting: chief-of-staff", docs authored in another role's name | publishes 76/76, QA records 486/486, "acting" in 3 record kinds | publish events, qa-record `--by` (P3), grep of `rituals/records/` | new (≈20 lines in metrics.mjs) |
| H3 | **Independent evidence per published lesson** | % of published lessons with fact-check + learner review (screenshots seen, current version) + QA pass + a11y record | a11y 0%, so full coverage 0 of 76 | `reviewVerdicts()` + an a11y file check | mostly computed; add a11y and "screenshots seen" |
| H4 | **Stop rate** | agents stopped at least once ÷ dispatched; usage-limit stops per week | 17% (21/124); 3 limit stops on 2026-10-13 | `metrics.mjs` (`stopRate`), `stopped` events | computed |
| H5 | **Rework and first-review launch** | lessons at v2+ ÷ live; first learner verdict = launch, by builder model | rework 14% (70/496); opus 37% (82/219), sonnet — | `metrics.mjs` (`reworked`, `byModel`) | computed |
| H6 | **Ritual and condition adherence** | overdue rituals, plus launch conditions or COE actions past due with no record | overdue: demo-crit, constitutional-review; open: a11y launch condition, COE reviewer sign-off | `company rituals`, launch-review and COE records | partly computed (rituals); conditions by hand until a field exists |
| H7 | **Work waiting on unused roles** | open board items owned by roles with 0 dispatches, and the oldest one's age | 16 items: accessibility 4, qa-tester 2, learning-designer 2, cm-lifehacks 2, cm-geography 2, design-lead 1, domain-scout 1, privacy-reviewer 1, localization-lead 1, plus the evaluation steward's 13 behind 1 run | board.json × `neverDispatched` | new (≈10 lines) |
| H8 | **Org-change hygiene** | role changes this week with and without a decision record; roles created vs first dispatched within 7 days | 46 created on 2026-10-13, 0 dispatched; 4 of 7 role changes with no record (2 more added during this evaluation) | git log on `tools/org/roles.mjs` × `company/decisions/` | new |

These are evidence about the company, not about learning. Like every metric in `metrics.mjs`, none of them says anyone learned anything. H2 and H7 are the ones to watch. If they fall while H4 stays flat, the roster is being used instead of routed around.
