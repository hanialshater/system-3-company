# Category onboarding playbook: how a new category enters the company

owner: principal-pm-verticals (Selin) · date: 2026-10-15 · status: **proposed**. head-of-product accepts it as the order of work. The CEO office owns the org steps, and the founder decides the category, its budget and its org.
replaces: nothing. It joins up the routing row in `company/ops/operating-loop.md` ("New category, vertical or course"), `company/rituals/templates/domain-launch.md`, `company/ceo-office/org-change-process.md` and `company/ops/token-budget.md` §6 (a new category is a **major project**, rule 2).

## Did a mechanism exist? Partly. This is what History actually did (git + records)

| When (2026-10-14/15) | Step | Record |
|---|---|---|
| 18:11 | Founder decides History exists | `decisions/2026-10-14-founder-history-category.md` (b1bb3d0) |
| 18:21 | Sizing (60, pilot 10), written **while the org was already being built** | `verticals/2026-10-14-history-and-next-categories.md` (fb34060) |
| 18:25 | Routing rule added to the operating loop, **after** the work had started | 99573b8 |
| 18:46 | Founder raises the target to 100 | `founder-history-100.md` (637f872) |
| 18:52 | CEO office, in one commit: roles.mjs, people.mjs, generate, 4 roles, `domains.json` (incubating), **DomainId** in `src/kit/types.ts`, **HQ floor 6**, the charter, a 113-concept curriculum, 12 briefs, data pins and check script, brief-skips | 99987ca, `decisions/2026-10-14-history-category.md` |
| 19:21 | cm-history re-checks the briefs the CEO office drafted | 8e6e47a (W-742) |
| 19:40 | Vertical Review re-plans to 100 in two tranches, sends F-16 to the founder | b200339 |
| 10-15 08:40 | Founder: sensitive route (W-764) and tranches (F-16 a) | 6a31579 |
| open | Project budget (W-723, W-802; Project Review 1 by 10-16) | `ceo-office/2026-10-14-project-review-1-agenda.md` |

**Gaps this exposed.** (1) No DLR proposal was written: the domain scout was skipped ("the founder decided", objection 6). (2) The sizing arrived after the org. (3) No budget existed before spend, so the work ran on the grace period. (4) The CEO office wrote the content (charter, curriculum, briefs) and edited the kit and HQ itself. Those belong to the CM, platform-engineer and hq-engineer (objections 4, 7, 8). (5) The directs were consulted "through written records", with live answers still owed. (6) Three strand managers were idle until the briefs were re-checked. (7) No ritual was told to pick the category up. (8) The retirement and pause rule lived only in my sizing doc, not in the charter. The template's "incubate = ≤ 2 lessons" did not match History's pilot of 10.

## The checklist

A **founder decision skips no step.** It answers *whether*. The steps answer *how big, when, by whom, checked how*. Every step writes its artifact before the next step that depends on it starts.

| # | Step | Owner | Artifact | Gate (must hold before the next dependent step) |
|---|---|---|---|---|
| 0 | Intake: the ask is routed, not acted on | chief-of-staff | founder decision record (if the founder asked) + board item to principal-pm-verticals | Nobody touches roles.mjs, HQ or the kit yet |
| 1 | **Strategy and sizing**: audience, job, target inside plan-to-2000 and where the slots come from, overlaps and the split rule, the form (category, strand or course), pilot size, kill rule | principal-pm-verticals | `company/product/verticals/<date>-<slug>.md`; founder-inbox item for the target and the form | head-of-product has read it. The founder has an inbox item for the budget and the form |
| 2 | **DLR proposal**: 8-12 concepts with demand (marked estimates), 3 candidate lessons, checkability, CM (new or an incubating neighbour), overlap | domain-scout | `company/rituals/records/<date>-domain-launch-<slug>.md` from the template, plus a draft curriculum | Checkability names a route per claim type. "Nothing checkable" stops here |
| 3 | **Decision and slots**: enter / incubate / wait, the slot line per wave, boundary rulings | head-of-product | `company/decisions/<date>-<slug>-category.md` and the DLR record's decision section; plan-to-2000 row | Founder ratifies the target and form if they change the 2,000 or add an org |
| 4 | **Project budget**: tranche 1 = pilot only, priced at the measured cost per published lesson (101k today) | portfolio-manager; founder's Project Review forum | `company/ops/projects.json` entry and a Project Review record | `node tools/ledger.mjs gate --project=<id>` passes. No tagged dispatch before this |
| 5 | **Org**: category manager now; **strand managers only after the DLR five pass** (or when tranche 2 is released) | chief-of-staff-ceo-office | decision record with `## Consulted` (Leonie, head-of-product, and Kenji if the kit is touched, Hilde if gates are touched); `tools/org/roles.mjs` (`cm(...)`, `SUBAREAS`, `DOMAIN_NAMES`, `STRAND_RULES`), `tools/org/people.mjs`; `node tools/org/generate.mjs`; an `org-change` event | Every consulted direct has answered in writing. Objections carry a status |
| 6 | **HQ placement**: floor and room, seating, colour, `tools/events.mjs` role-to-room map, `tests/hq/floors.test.mjs` | tools-lead (owner), hq-engineer (build) | `src/lib/hq.ts`, `src/lib/hq-floors.ts`, `src/lib/hq-colors.ts`, `src/app/hq/people.ts` | `npm run test:hq` passes, checked at 390 and 1280 px |
| 7 | **Charter and curriculum map** | the new CM (or the incubating CM) | `company/domains/<id>.md` (audience, checking rule, refuse list, boundary table, **retirement rule**); `content/curriculum/<id>.json` (demand as estimates, prerequisites, `subarea`) | The boundary table is signed by each neighbouring CM in writing, or the dispute goes to head-of-product |
| 8 | **Catalog wiring**: `DomainId`, `content/domains.json` (status `incubating`), theme colour, feed and map | platform-engineer; principal-engineer review if `src/kit/**` changes | `src/kit/types.ts`, `content/domains.json` | `npm run verify`. Never the CEO office editing the kit |
| 9 | **Checkability**: how each claim type is verified (derivation, simulation, the learner's own screen, pinned data, sources plus a replication status) | the CM drafts it; fact-checker agrees in writing | the charter's checking section; `company/domains/briefs/checks/<id>-*.mjs` where numbers are computed | fact-checker has said "I can verify these" for the pilot's claim types |
| 10 | **Research notes**: sources, replication status, sensitive classes | research-lead (researcher) | `company/research/notes/<id>-*.md`, named in the charter | Every pilot brief cites a note line or a derivation |
| 11 | **First briefs and pilot**: 2-5 lessons, which **are** the DLR five | CM / strand managers write; demo-builder builds | `company/domains/briefs/<id>.md`; brief-skips cleared by the CM's own re-check | The W-556 queue gate applies unless the founder exempts it in a record. Pilot lessons pass every normal gate |
| 12 | **Rituals pick it up** | chief-of-staff (WBR, Demo Crit, cycle-planning), head-of-product (Launch Review), principal-pm-verticals (Vertical Review), domain-scout (DLR) | category rows in each record | See below |
| 13 | **Launch or retire**: DLR five → `active`, otherwise pause or retire | domain-scout runs it, head-of-product decides | DLR record; `content/domains.json` status; retirement review | The rule written in steps 1 and 7 is applied as written, not renegotiated |

**Rituals.** The **Vertical Review** (trigger: founder event, 100 published or 14 days) adds the category to §1 and checks its slot line. The **WBR** adds a row for the category: published, in review, held-claim rate, spend against tranche. **Demo Crit** takes its review lessons with no exemption. A **Launch Review** runs per lesson. The **DLR** reconvenes when 5 lessons have been through launch review: that is the "launch-review five". **Cycle Planning** turns the slot line into board items. The **Retirement Review** sweep includes the category quarterly.

**Retirement criterion (default; step 1 may tighten it).** Pause if 3 of the DLR five are rejected as duplicates of a neighbour, or if the held-claim rate goes over 40%. Retire to a strand of its nearest category 60 days after deploy if 7-day recall is more than 10 points below the feed median **and** commit rate is below the median. Lessons keep their files and records (`status: retired`).

## What may run in parallel, and what must wait

- **In parallel after step 1:** step 2 (DLR), step 10 (research notes), and the step 6 design sketch (no code).
- **After step 3:** steps 4, 5 and 7 together. Step 7 can be drafted by the domain scout (its scope: "drafting a curriculum file and charter for an approved domain"), then adopted by the CM.
- **After step 5:** steps 6 and 8, because HQ seats and `DomainId` need the role ids.
- **Must wait:** strand managers wait for the DLR five. Builders wait for steps 4, 8, 9 and 11. Tranche 2 waits for the DLR five, a held-claim rate of 25% or lower, and a Project Review.
- **Never parallel:** the role that writes the briefs does not review its own re-check (History objection 4).

## Would be wrong if

- the steps add more than a day to a founder decision with no change in what gets built. Then merge steps 1-3 into one Vertical Review session;
- the DLR five keeps passing on the first try. Then step 2 can shrink to the template's checkability line.
