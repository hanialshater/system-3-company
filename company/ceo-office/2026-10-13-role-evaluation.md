# Role evaluation: 2026-10-13 (first pass)

owner: chief-of-staff-ceo-office (Leonie) · for: founder · status: findings (proposals are in `2026-10-13-proposals.md`)
answer required from: chief-of-staff (Ada), in writing, on each finding in section 3 (role authority: "require the operating chief of staff to answer each health finding in writing")

## Sources (read before writing)

- `npm run metrics` and `npm run metrics -- --md` (Agents section), run 2026-10-13
- `company/ops/events.jsonl` (947 events), `company/ops/board.json` (113 items), `company/ops/progress.md`
- `tools/org/roles.mjs` (72 roles), `company/roles/*.md`, `company/org-chart.md`, `company/ops/operating-loop.md`, `company/ops/chief-of-staff-checklist.md`
- Decision records (all 2026-10-13 ones in full), ritual records (launch review, WBR, retro-2, COE, founder digest), `company/reviews/` (counted by record type), `tools/events.mjs`, `tools/company.mjs`

**Caveat on the numbers.** "Runs" are dispatches in the event log, counted by `tools/metrics.mjs`. The operator (chief-of-staff) is excluded from that roster. Actor names on *commit* events are not evidence that a role worked: `tools/events.mjs` `classifyCommit()` assigns the actor from keywords in the commit message. For example, "publish" becomes release-manager, "qa" becomes qa-tester, and "crit" becomes pattern-librarian: the commit "Upgrade to Next 16.4 / React 19.2 (critical advisory)" is logged as a pattern-librarian `meeting-crit` ritual. Only `dispatch`, `report` and `usage` events show that an agent really ran.

## 1. Headline

**The company is healthy at the edges and unhealthy in the middle.** The two independent checks that were wired in on day one are real: 2,141 of 2,141 verified claims were checked by the fact-checker, and there have been 17 learner-evaluator runs. Everything between brief and build (design, pedagogy, research, mockups) and everything between review and the learner (exploratory QA, accessibility, pairwise judgement, launch chairing, publishing, metrics) is done by the operator or by nobody. **54 of 70 agent roles have never been dispatched.** 61% of all events have the operator as actor (569 of 947). Ada publishes, files the QA records, chairs the launch review "acting for head-of-product", writes the analytics predictions "acting" for the analytics steward, and wrote the design docs that carry other roles' names. Ada's own role says Ada may not "Mark anything verified or published".

## 2. Counts by verdict (74 roles)

| Verdict | Count | Roles |
|---|---|---|
| keep | 16 | founder, chief-of-staff-ceo-office, demo-builder, fact-checker, learner-evaluator, principal-engineer, platform-engineer, pattern-librarian, 8 category leads (math, cs, probability, physics, ai, economics, life, chemistry) |
| activate | 14 | learning-designer, researcher, design-lead, interaction-designer, mockup-artist, evaluation-steward, pedagogy-critic, qa-tester, accessibility-reviewer, release-manager, privacy-reviewer, analytics-steward, cm-geography, cm-lifehacks |
| re-scope | 4 | chief-of-staff, head-of-product, tools-lead, lifehacks-safety-reviewer |
| merge | 2 | domain-scout → principal-pm-verticals; hq-engineer → tools-lead |
| retire | 0 | (none yet; the 27 sub-area managers get a sunset date instead, see 2b) |
| wait | 38 | principal-pm-verticals, visual-designer, illustrator, design-engineer, backend-engineer, growth-designer, personalization-lead, learner-model-engineer, localization-lead, localizer, cultural-reviewer, 27 sub-area managers |

Half the roster (38 of 74 roles) has no work it can do today. That is the clearest sign of the failure mode in my own role doc: "adding roles to fix problems that are really about process". Five of the newest role changes have **no decision record**: the 27 sub-area managers and principal-pm-verticals (commit d2b09ae), this office (c6638e3), the illustrator (136e889) and the design engineer (63e7923). The last two were added while this evaluation was being written. The header of `tools/org/roles.mjs` asks for one ("record the change in company/decisions/").

## 2a. Every role except the sub-area managers

Runs = dispatched (stopped). "—" = 0.

| Role | Team → reports to | Runs | Overlaps | Missing connections | Verdict | Owner of change | Why |
|---|---|---|---|---|---|---|---|
| founder | leadership → — | human | — | Blocks 7 open items: AMD-001, usage budget, backend choices (auth, DB, under-13), Personalization brief, W-007 learners, W-048/049 source checks | keep | founder | Decisions are queued, not missing. The usage budget is the binding constraint (COE 2026-10-13) and still has no owner's answer. |
| chief-of-staff (Ada) | leadership → founder | not counted; 569/947 events | **release-manager, qa-tester, analytics-steward, head-of-product (launch chair), design-lead (authored formats.md), tools-lead (built HQ, serve.sh), cm-geography (via general-purpose)** | Hands nothing to the release manager, QA tester, a11y reviewer or designers. Nobody reviews Ada's merges, publishes, retros or metrics. | **re-scope** | founder (decision), CEO office (draft) | Own checklist step 9 says "Publish every lesson whose gates pass". The role doc says Ada may not. Retro-2: "Two publishes went wrong, both by me." Remove publish, QA recording, acting chair and acting analytics from Ada's scope. |
| chief-of-staff-ceo-office (Leonie) | leadership → founder | — (this is the first run) | evaluation-steward (independence audits) | No decision record. Needs a seat in the WBR template. | keep | founder | New. Watch the failure mode "second operator". |
| head-of-product | product → founder | 1 | principal-pm-verticals (roadmap vs verticals), chief-of-staff (launch chair) | **20 direct reports**, 1 run. Every launch review was chaired "acting: chief-of-staff". W-096 (approve design catalogue) still in backlog. | **re-scope** | founder | A span of 20 at one run means no management happens. Move platform and release to the principal engineer. Have a delegate actually chair the launch review. |
| domain-scout | product → head-of-product | — | **principal-pm-verticals** ("or a new subject") | W-008 (astronomy, music, linguistics) has sat in backlog since 10-12 | **merge** into principal-pm-verticals | founder | Adding domains while 420 lessons wait in review raises load. Two roles own "what new subject". |
| principal-pm-verticals | product → head-of-product | — | domain-scout, head-of-product (roadmap), category leads (portfolio) | No decision record, no founder direction on verticals, no recall data | **wait** | founder | Wait for the founder's verticals brief. Its inputs (learner and recall data) need a deploy. |
| learning-designer | studio → head-of-product | — | demo-builder (builders designed every lesson) | demo-builder and researcher report to it, so the builder's manager has never run. 0 `design.md` records. W-027, W-101 open. | **activate** | chief-of-staff (dispatch) | 104 of 289 learner reviews say "told, not shown", the exact problem this role exists to prevent. |
| researcher | studio → learning-designer | — | demo-builder (research went into `build.md`), fact-checker (sources) | 0 `research.md` records. No trigger is defined for when to call it. | **activate** (on trigger) | learning-designer | Trigger: a design question with no settled answer, or a disputed claim whose source the builder chose. |
| demo-builder | studio → learning-designer | 61 (16 stopped, 26%) | learning-designer, researcher, mockup-artist (all done implicitly) | Inputs "Design note; Mockups" were never supplied for 500 lessons. The manager it reports to is inactive. | keep | — | Works. The stop rate is from the usage limit, not the role. |
| design-lead (Ines) | design → head-of-product | — | visual-designer (`system.md`), chief-of-staff (wrote `formats.md` as "owner: design-lead") | 0 design reviews. W-100 in backlog. No brief names a format (0 of 495), so the design step has no input. | **activate** | chief-of-staff (dispatch W-100) | The pipeline step exists on paper only, and the docs carry Ines's name without Ines. |
| interaction-designer (Rafael) | design → design-lead | — | mockup-artist (both "draw before build"), learning-designer | Two sources request mockups (learning-designer's inputs list "Mockups"; interaction-designer outputs "a mockup request"). Pick one. | **activate** (after briefs name formats) | design-lead | Needed for non-default formats and the "told, not shown" revisions. |
| visual-designer (Kiri) | design → design-lead | — | design-lead (design system), accessibility-reviewer (contrast) | Shares `system.md` with the a11y reviewer, which neither has opened | **wait** | design-lead | Activate when the first design review produces token or style findings. Until then design-lead covers it. Reversible. |
| mockup-artist | design → design-lead | — | interaction-designer | 0 mockups. Input "Design note" (from learning-designer) conflicts with the design-org flow (from interaction-designer). | **activate** | design-lead | Cheapest step in the pipeline (sonnet, SVG), and never used. |
| evaluation-steward | quality → founder | 1 | CEO office (independence audits) | **13 open board items**, more than any role except demo-builder. Named COE reviewer, did not review. Every gate fix (AMD-001, W-028, W-044, W-054, W-063, W-073, W-087, W-099) waits on it. | **activate** | chief-of-staff (dispatch), founder (ratify AMD-001) | The judge's keeper is the bottleneck. The operator works around gate gaps by hand (the holds file) instead of routing them. |
| fact-checker | quality → evaluation-steward | 16 (0 stopped) | — | EXP-001 (planted false claim) never run, so its catch rate is unknown | keep | evaluation-steward (EXP-001) | Healthiest role: 2,141 of 2,141 verified claims have `checkedBy: fact-checker`. 415 claims are still open. |
| learner-evaluator | quality → evaluation-steward | 17 (5 stopped) | pedagogy-critic (unused, so single-artifact verdicts carry all the weight) | Image failures: 8 "launch" verdicts written without screenshots (publish-holds.json). W-021 independence breach (meta.json seen early) still open. | keep | evaluation-steward (W-021, W-073) | Works, but it is the only pedagogy witness. |
| pedagogy-critic | quality → evaluation-steward | — | learner-evaluator | 0 pairwise records. Demo Crit (W-003) open since 10-12 and overdue. The distillation said it needs two versions, and 70 lessons now have v2+. | **activate** | chief-of-staff (convene demo-crit) | The precondition named in the distillation is now met. |
| qa-tester | quality → evaluation-steward | — | **chief-of-staff** (runs the harness and `qa-record`) | `tools/company.mjs:620` writes "recorded by: qa-tester" whoever runs it. 486 QA records, all scripted contract runs. 0 exploratory sessions. W-052 and W-082 sit unworked. | **activate** | evaluation-steward (amendment for the label), chief-of-staff (dispatch) | The mission ("click controls in the wrong order, resize") has never been done. The record names a tester who was not there. |
| accessibility-reviewer | quality → evaluation-steward | — | visual-designer | **0 a11y records, 76 lessons published.** Launch condition of 2026-10-13 ("an accessibility review of all 5 within the next cycle … any lesson that fails it is unpublished") not met. 71 more were published since. 4 board items (W-010, 015, 057, 102). | **activate (urgent)** | chief-of-staff (dispatch), head-of-product (enforce the condition) | 49 learner reviews mention contrast, screen-reader or tap-size problems. A written launch condition was broken without a record. |
| lifehacks-safety-reviewer (Sana) | **categories** → evaluation-steward | — | cultural-reviewer (region notes) | Team label says categories, and HQ seats it on the Life Hacks floor, yet it reports to the evaluation steward. Safety verdicts are not wired into the gates (needs amendment, decision item 4). | **re-scope** (team: quality) | founder (decision), evaluation-steward (gate amendment) | Independence is built, not assumed: the judge should not sit on the floor of the people who want lessons shipped. Wait for briefs before dispatching. |
| principal-engineer | platform → founder | 1 | release-manager (deploy review) | Vercel deploy eng review: "owner: implementation author (Codex) · independent review pending PR". EDD-003 review open. | keep | chief-of-staff (dispatch for the pending reviews) | Tier-2 work (deploy pipeline) has been merged with its independent review still pending. |
| platform-engineer | platform → **head-of-product** | 1 (SPIKE-001) | chief-of-staff (kit changes such as `<Milestones>`, mulberry32 and the reveal layout fix went in during merges) | The org chart says Engineering → principal engineer, but the data says head-of-product | keep (fix the reporting line) | founder | The work is real. The line is wrong. |
| release-manager | platform → head-of-product | — | **chief-of-staff** (all 76 publishes, 1 unpublish) | Every "release-manager" event is a commit classified by keyword (`events.mjs:80–81`). The deploy command was written by an outside Codex session under this label. Never dispatched. | **activate** | founder (decision), chief-of-staff (stop publishing) | The single clearest self-check: the operator who merges also publishes, and made both bad publishes. |
| backend-engineer | backend → principal-engineer | — | — | Blocked on founder: auth provider, DB host, under-13 | **wait** | founder | Nothing reversible to do yet. |
| privacy-reviewer | backend → principal-engineer | — | — | W-086 (separate lesson domain, CSP header for SPIKE-001) is ready now | **activate** (W-086 only) | principal-engineer | Real work exists. Otherwise wait for backend. |
| growth-designer | growth → head-of-product | — | personalization-lead (both "what to show next") | Needs deploy, backend and real learners | **wait** | founder | Its own decision orders it third, after backend. |
| tools-lead | company-tools → **chief-of-staff** | — | chief-of-staff (built HQ, serve.sh, metrics; W-072 marked done "tools-lead") | The instruments that measure the operator (events, attribution, metrics) are owned by the operator's report and were written by the operator. The work-queue objection (shared lock store) names it as owner. | **re-scope** (report to principal-engineer; event attribution from dispatch records only) | founder (decision), principal-engineer | The auditor's evidence has to be harder to change than the thing it audits. |
| hq-engineer | company-tools → tools-lead | — | tools-lead | — | **merge** into tools-lead | founder | Two roles for one HQ, both unused. Split again when HQ has a queue of work. |
| analytics-steward | insight → head-of-product | — | **chief-of-staff** (WBR "metrics: analytics-steward (acting: chief-of-staff)"; launch-review predictions; EXP-003 owned by chief-of-staff) | COE action (cumulative tokens) assigned to it and not done by it. EXP-002 analysis owner. | **activate** | chief-of-staff (dispatch), head-of-product | EXP-003 tests the operator's own dispatch policy (sonnet builders) and is owned by the operator. That is a self-check. |
| pattern-librarian | insight → chief-of-staff | 1 | — | 6 "pattern-librarian" ritual events are keyword misattributions | keep | — | Ran once, did its rituals, 13 patterns on file. |
| cm-math, cm-cs, cm-probability, cm-physics, cm-ai, cm-economics, cm-life, cm-chemistry | categories → head-of-product | 2 each (3–6 min) | their 3 sub-area managers each | Briefs must name a format (design-org decision); in practice 0 of 495 do. W-111/W-112-style notices are in backlog. | keep | each cm (format field), chief-of-staff (dispatch) | They work. 7 of 10 domains are at or within one concept of their curriculum cap. |
| cm-geography | categories → head-of-product | — (as itself) | **general-purpose** did its work: 3 runs on 10-12 (23:28, 23:34, 23:45) wrote the geography curriculum and briefs, after the roster existed (23:03) | W-093, W-111 open | **activate** | chief-of-staff | Its work was done under no role, so no role's rules applied to it. |
| cm-lifehacks (Tess) | categories → head-of-product | — | — | W-090 (first 5 briefs with safety class) is the gate to the whole incubating domain | **activate** | chief-of-staff | Life Hacks cannot start until it runs. Pair with the safety reviewer on the refuse list. |
| personalization-lead (Mateo) | personalization → head-of-product | — | growth-designer, principal-pm-verticals ("paths through a vertical") | Founder brief pending (W-091) | **wait** | founder | Its decision says so. Questions only. |
| learner-model-engineer (Ifeoma) | personalization → personalization-lead | — | backend-engineer (data) | Needs attempts data | **wait** | founder | Its data does not exist yet. |
| localization-lead (Yuki) | international → head-of-product | — | principal-pm-verticals (verticals × locales) | W-092 in backlog. Variants-as-data (ADR-008) is still a draft. | **wait** | founder (pick locales) | A plan could start now, but locales multiply the review queue that is already the constraint. |
| localizer (pool) | international → localization-lead | — | — | — | **wait** | localization-lead | No locale chosen. |
| cultural-reviewer (Amira, pool) | international → localization-lead | — | lifehacks-safety-reviewer (region notes) | A per-locale gate is not wired (amendment) | **wait** | localization-lead, evaluation-steward | No locale chosen. Like the safety reviewer, it judges work owned by its own lead: see proposal P6. |

## 2b. Sub-area managers (27), grouped

All 27 were created in commit d2b09ae (2026-10-13 22:55) with **no decision record**. None has been dispatched (0 runs each). Each strand's brief file in `company/domains/briefs/<domain>.<strand>.md` is a 3-line stub. `claim.mjs` reads them, but they hold no briefs.

| Domain lead | Strands | Domain coverage | Overlap | Verdict |
|---|---|---|---|---|
| cm-math | algebra, geometry, discrete | 55/56 | with the lead, which wrote all 56 briefs | wait |
| cm-cs | algorithms, systems, security | 47/53 | with the lead | wait |
| cm-probability | chance, statistics, data-literacy | 51/56 | with the lead; statistics vs data-literacy boundary | wait |
| cm-physics | mechanics, waves, electricity | 57/57 | with the lead | wait |
| cm-ai | ml-basics, neural-language, ai-society | 57/57 | with the lead | wait |
| cm-economics | personal-finance, markets, macro | 57/57 | with the lead; personal-finance vs cm-lifehacks (refuse list: financial advice) | wait |
| cm-life | genetics-evolution, health-epidemiology, ecology-body | 46/55 | with the lead; health vs lifehacks refuse list (medical) | wait |
| cm-chemistry | matter-reactions, solutions-acids, energy-rates | 54/55 | with the lead; vs lifehacks refuse list (chemical mixing) | wait |
| cm-geography | maps-projections, earth-climate, people-places | 51/55 | with the lead, which is itself inactive | wait |

**Verdict: wait, with a sunset.** The strands have no work because every curriculum is at or near its cap and no OP has opened growth. Owner: founder (a decision record is missing) and head-of-product (OP). If no strand has a brief queue by the next op-planning, the CEO office will propose retiring them through offboarding, and the category leads keep the strands as sections of their files. Risk if they are kept active: 27 more agents competing for a usage budget that has already stopped the company three times.

## 2c. Roles added during this evaluation (2026-10-13, after 23:00)

| Role | Team → reports to | Runs | Overlaps | Missing connections | Verdict | Owner of change | Why |
|---|---|---|---|---|---|---|---|
| illustrator (external) | design → **visual-designer** | — | mockup-artist (pictures before build), visual-designer (style) | Reports to a role that has never run. Who checks an image for "false or unsafe"? The fact-checker reads claims, not pictures, and the safety reviewer covers Life Hacks only. The asset-budget question (15 KB lesson budget, CDN policy) from the three-more-orgs decision has no answer on record. | **wait** | founder (decision record), design-lead | Wait until the visual designer is active and an image check is named (fact-checker for depicted facts; safety reviewer for Life Hacks). Otherwise the illustrator delivers into an inbox no active role reads. |
| design-engineer | design → design-lead | — | **platform-engineer** (kit components; the design-org decision gave `<Compare>` and `<Timeline>` to platform and principal engineer) | The kit boundary between design tooling and the shared kit is unwritten. "Change design tooling with a passing typecheck" puts a tier-1 kit change outside the principal engineer's tiering. | **wait** (define the boundary first) | principal-engineer | The 4th engineering-shaped role in Design and Platform, while the platform engineer has run once. Activate when the first format component has a spec. |

## 3. Where the operator checks Ada's own work (findings Ada must answer in writing)

1. **Publishing.** All 13 publish/unpublish events and all 76 published lessons came from Ada's commits through `publish-ready.mjs --publish`. Ada's role: "may not … Mark anything verified or published" and "Publishing (only release-manager publishes)". Checklist step 9 tells Ada to do it anyway. Retro-2 owns two bad publishes ("both by me"). The fix Ada chose was a rule for Ada, not a handoff.
2. **Launch review.** "chair: head-of-product (acting: chief-of-staff) · executes: release-manager · attests: qa-tester, fact-checker, learner-evaluator, analytics-steward". Of the six roles named, only the fact-checker and learner-evaluator took part. The head of product has run once, to draft the OP, and never for a launch. Ada signed it "acting for head-of-product".
3. **QA records.** `company qa-record` (run by Ada, checklist step 4) stamps "recorded by: qa-tester". It is a harness result and honest about the browser, but it attributes the work to a role that never existed in the loop. The exploratory QA the role exists for has never happened.
4. **Holds file is the de facto gate.** `publish-holds.json`: "held from publishing by the chief of staff despite passing gates". 130+ lessons show as "Ready to publish" in `status` because the gate does not read verdicts (AMD-001d is unratified). The operator's judgement is the gate.
5. **Metrics and experiments.** WBR "metrics: analytics-steward (acting: chief-of-staff)". EXP-003 (are sonnet builders as good as opus?) is owned by the operator whose dispatch policy it evaluates. The COE on Ada's capacity planning was written by Ada, and its named reviewers (evaluation-steward, principal-engineer) did not review it.
6. **Docs in other roles' names.** `design/formats.md` "owner: design-lead (Ines)", `design/system.md` "owner: visual-designer (Kiri)", and `international/README.md`, `personalization/README.md` were written by Ada at creation. Their owners have never opened them.
7. **The instruments.** Ada wrote `tools/events.mjs` and the metrics Agents section, and the tools-lead reports to Ada. The classifier makes the operator's commits look like other roles' work (release-manager, qa-tester, pattern-librarian, tools-lead), which hides finding 1 in HQ.
8. **Accessibility launch condition broken.** "Go with conditions: a review within the next cycle, and any lesson that fails it is unpublished." Today there are 0 a11y reviews and 71 further publishes, with no record of the condition being waived.

None of this was hidden. Ada wrote most of it down. The pattern is convenience under a usage budget: dispatching a role costs tokens, and doing the step yourself does not show up in the agent metrics. The fix belongs to the process (proposals P1–P3), not to Ada's character.

## 4. Work done by someone other than its role (summary)

| Role (never dispatched) | Who did the work | Evidence |
|---|---|---|
| qa-tester | chief-of-staff (harness + qa-record) | company.mjs:620, checklist step 4, 486 records |
| release-manager | chief-of-staff (publish); Codex session (deploy tooling) | 13 publish events from commits; progress entries "platform-engineer / release-manager (Codex implementation)" |
| accessibility-reviewer | nobody | 0 a11y records |
| learning-designer | demo-builder (implicitly) | 0 design.md; 104/289 reviews "told, not shown" |
| mockup-artist | nobody | 0 mockups |
| pedagogy-critic | nobody | 0 pairwise; W-003 overdue |
| researcher | demo-builder (in build.md) | 0 research.md |
| analytics-steward | chief-of-staff | WBR and launch-review headers, EXP-003 owner |
| domain-scout | nobody | W-008 backlog |
| tools-lead / hq-engineer | chief-of-staff | W-072 "done tools-lead"; HQ commits attributed by file path (`events.mjs`) |
| cm-geography | general-purpose (3 runs) | events 2026-10-12 23:28–23:45 |
| design-lead / visual-designer | chief-of-staff (docs) | formats.md, system.md headers |
