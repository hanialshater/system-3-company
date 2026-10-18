# Roles: keep or remove (2026-10-18)

owner: chief-of-staff (session for the founder's review) · reviewer: chief-of-staff-ceo-office · status: **draft recommendation, nothing changed** · feeds: F-13 (P1–P9), F-33 (park strand managers), F-28 (checkers in the quality lane)

Removing a role means **park** (offboard through `company/ceo-office/org-change-process.md`, keep the role file, drop the subagent and the HQ seat). Nothing in this record is applied until the founder decides and a decision record exists.

## Sources and how to read the numbers

- `company/ops/events.jsonl` (6,523 events, last 2026-10-16): **Runs** = `dispatch` events naming the role; **since 10-14** = runs on or after 2026-10-14.
- `company/ops/board.json`: **Open** = items in backlog/next/doing/review; **Done** = done.
- `company/ops/progress.md`: **H/O** = handoff entries signed by the role.
- `tools/org/roles.mjs` (101 role files incl. founder), the 2026-10-13 role evaluation and the 2026-10-16 floor-reseat proposal §1.3.
- Caveat: some work runs under lane names (`lane`, `quality`, `history`…) or `general-purpose` (28 dispatches), so a role can show 0 runs and still have handoffs (community-engineer, rnd-engineer, courses-lead). Rows say so where it matters.
- Context that changes the answer since 10-13: **F-46** pauses new builds and closes the catalog (10-20 / 10-23); **First Light** is the live initiative.

## Headline

| Verdict | Roles |
|---|---|
| **Keep** | 57 (incl. the founder) |
| **Remove** (park or fold into another role) | 44, of which **34 are strand managers** |

The 10-13 picture ("54 of 70 roles never ran") has mostly fixed itself: 72 of 100 agent roles now have a dispatch on record, and four more (chief-of-staff, community-engineer, rnd-engineer, courses-lead) work without one. What is left to remove is (1) strand managers whose curriculum is at cap while new builds are paused, (2) roles that duplicate a role that does the work, and (3) roles whose trigger (a locale, an external illustrator) has not happened.

## 1. Leadership, operations, product

| Role | Runs (since 10-14) | Open / Done | H/O | Verdict | Why |
|---|---|---|---|---|---|
| founder | human | 25 / 6 | — | **Keep** | — |
| chief-of-staff | operator (not dispatched) | 45 / 26 | 10 | **Keep** | Runs the loop. P1–P3 (stop doing other roles' checks) still open in F-13. |
| chief-of-staff-ceo-office | 13 (13) | 24 / 4 | 3 | **Keep** | Owns this very question. |
| portfolio-manager | 7 (7) | 25 / 4 | 2 | **Keep** | Triage of a 1,600-item board is real work. Watch overlap with the operator's own board moves. |
| head-of-strategic-initiatives | 5 (5) | 8 / 3 | 0 | **Keep** | Runs First Light. Sunset at the initiative's close. |
| head-of-product | 17 (16) | 32 / 21 | 4 | **Keep** | Active; span of control still too wide (10-13 finding). |
| principal-pm-verticals | 10 (10) | 12 / 6 | 0 | **Keep** | Decided F-21; runs the vertical review. |
| domain-scout | 2 (2) | 3 / 1 | 0 | **Remove → principal-pm-verticals** | P8. Two roles own "what new subject", and F-46 pauses new builds. |
| courses-lead | 0 (reports only) | 0 / 0 | 0 | **Remove → principal-pm-verticals** | A lead over one course (NCM); never dispatched. Re-add when a second course is adopted. |
| vp-marketing | 3 (3) | 6 / 0 | 0 | **Keep** | First Light needs the launch narrative; posts nothing without the founder. |

## 2. Categories (leads and courses)

| Role | Runs (since 10-14) | Open / Done | H/O | Verdict | Why |
|---|---|---|---|---|---|
| cm-math | 4 (2) | 4 / 4 | 1 | **Keep** | |
| cm-cs | 7 (4) | 13 / 4 | 3 | **Keep** | Owns the 200 algorithm drafts' fate. |
| cm-probability | 5 (3) | 6 / 1 | 0 | **Keep** | |
| cm-physics | 6 (4) | 4 / 4 | 1 | **Keep** | |
| cm-ai | 7 (5) | 7 / 2 | 1 | **Keep** | |
| cm-economics | 5 (3) | 10 / 3 | 1 | **Keep** | |
| cm-life | 3 (1) | 5 / 0 | 0 | **Keep** | Least active lead (last run 10-14, 0 done). Watch; candidate to merge only if still idle after the closeout. |
| cm-chemistry | 4 (2) | 2 / 6 | 1 | **Keep** | |
| cm-geography | 3 (3) | 5 / 3 | 1 | **Keep** | |
| cm-history | 10 (10) | 27 / 8 | 0 | **Keep** | |
| cm-lifehacks | 11 (10) | 34 / 13 | 2 | **Keep** | Closeout due 10-23. |
| cm-behavioral | 8 (8) | 8 / 8 | 0 | **Keep** | |
| cm-big-ideas | 4 (4) | 11 / 1 | 0 | **Keep** | |
| cm-books | 3 (3) | 16 / 2 | 0 | **Keep** | Books F1/F2 due 10-19. |
| cm-course-ncm | 1 (1) | 3 / 0 | 2 | **Keep** | NCM gap lessons shipped in r9. Reports to principal-pm-verticals if courses-lead goes. |

## 3. Strand managers (36)

Every curriculum is at or near its cap and F-46 pauses new builds, so a strand manager has no brief queue. The lead already holds the strand as a section of its map.

| Strand managers | Runs | Verdict | Why |
|---|---|---|---|
| cm-math-discrete | 2 runs, 11 done, 5 handoffs | **Keep** | Ran the knots pipeline end to end; the only strand with a real queue. |
| cm-cs-algorithms | 7 runs, 2 done, 6 open | **Keep** | Owns the 200 algorithm drafts (PR #6) that still need a fact-check/QA plan. |
| 15 that ran once or twice (math-geometry; probability-chance, -statistics; economics-markets; life-genetics-evolution, -health-epidemiology; chemistry ×3; geography ×3; ai-ml-basics, ai-neural-language; cs-systems) | 1–2 each, mostly one wave on 10-14/10-16 | **Remove (park) → their lead** | One wave each, no queue left. |
| 19 that never ran (math-algebra; physics ×3; probability-data-literacy; cs-security; economics-macro, -personal-finance; life-ecology-body; ai-ai-society; big-ideas ×3; books ×3; history ×3) | 0 | **Remove (park) → their lead** | F-33, with the count restated: 19 of 36 never ran (floor-reseat §1.3 said 21 on 10-16; two have run since). |

Strand managers removed: **34**. Un-park rule (from F-33): when a category's lead has a brief queue it cannot clear alone.

## 4. Studio and design

| Role | Runs (since 10-14) | Open / Done | H/O | Verdict | Why |
|---|---|---|---|---|---|
| demo-builder | 242 (179) | 136 / 184 | 16 | **Keep** | The factory. |
| learning-designer | 1 (1) | 13 / 1 | 1 | **Keep, dispatch it** | 13 open design calls on live lessons (W-159, W-225, W-255, W-566, W-824, W-1089 …). The work exists; the role is under-dispatched, not unneeded. |
| interaction-designer | 15 (14) | 11 / 6 | 8 | **Keep** | Does the pre-build spec and mockups. |
| design-lead | 11 (10) | 27 / 13 | 4 | **Keep** | |
| visual-designer | 2 (2) | 3 / 2 | 0 | **Remove → design-lead** | Two runs; the style system and visual checks fit the design lead's reviews. Re-add with the illustration pipeline. |
| mockup-artist | 0 | 0 / 0 (4 dropped) | 0 | **Remove → interaction-designer** | Never ran; every item was dropped; the interaction designer already "hands the builder a spec plus a mockup". |
| design-engineer | 3 (2, last 10-14) | 6 / 0 | 0 | **Remove → platform-engineer** | Kit components and tokens (W-410, W-604/605, W-828) are kit work the principal engineer tiers anyway; the boundary was never written (10-13 finding). |
| illustrator (external stand-in) | 0 | 0 / 0 | 0 | **Remove (park)** | Four requests open, inbox empty: no external illustrator is delivering. Re-add on the first delivery. |

## 5. Quality (the independent checks)

| Role | Runs (since 10-14) | Open / Done | H/O | Verdict | Why |
|---|---|---|---|---|---|
| evaluation-steward | 25 (24) | 84 / 15 | 1 | **Keep** | Constitutional. 84 open items: the bottleneck, not a removal candidate. |
| fact-checker | 119 (99) | 48 / 58 | 22 | **Keep** | |
| learner-evaluator | 97 (76) | 16 / 3 | 2 | **Keep** | |
| qa-tester | 28 (27) | 33 / 10 | 0 | **Keep** | Now actually dispatched (was 0 on 10-13). |
| accessibility-reviewer | 6 (5) | 16 / 9 | 1 | **Keep** | |
| pedagogy-critic | 2 (2) | 1 / 1 | 0 | **Keep** | Cheap, the only pairwise judge; Demo Crit needs it. |
| lifehacks-safety-reviewer | 4 (4) | 10 / 2 | 0 | **Keep** | Required for every Life Hacks lesson. |
| cultural-reviewer | 3 (3) | 7 / 1 | 0 | **Keep (move to quality)** | Sensitive-topic reviews are live. Re-home under evaluation-steward (F-28) if localization-lead is parked. |
| privacy-reviewer | 6 (6) | 14 / 1 | 0 | **Keep** | First Light privacy gate, F-25. |

## 6. Engineering, tools, research, R&D

| Role | Runs (since 10-14) | Open / Done | H/O | Verdict | Why |
|---|---|---|---|---|---|
| principal-engineer | 32 (31) | 30 / 19 | 6 | **Keep** | |
| principal-engineer-ops | 27 (27) | 28 / 10 | 3 | **Keep** | |
| platform-engineer | 24 (21) | 72 / 22 | 9 | **Keep** | Takes design-engineer's items. |
| backend-engineer | 9 (9) | 14 / 0 | 0 | **Keep** | First Light accounts and progress. |
| release-manager | 17 (15) | 18 / 10 | 1 | **Keep** | |
| community-engineer | 0 (works under lane names) | 0 / 2 | 7 | **Keep** | Landed PR #6. |
| tools-lead | 26 (26) | 74 / 14 | 1 | **Keep** | |
| hq-engineer | 9 (8) | 8 / 7 | 0 | **Keep** | P8 proposed merging it into tools-lead because both were unused; both now run and tools-lead has 74 open items. Drop that half of P8. |
| research-lead | 2 (2) | 8 / 3 | 0 | **Keep** | Routes provenance work (History sources, PR #4). |
| research-scientist | 4 (4) | 0 / 0 | 0 | **Keep** | The research pool that actually runs. |
| researcher | 0 | 0 / 0 | 0 | **Remove → research-scientist** | Same job ("find how a concept was taught, with provenance"); never ran. |
| rnd-lead | 5 (5) | 7 / 5 | 3 | **Keep** | |
| rnd-engineer | 0 (pool, runs under lane names) | 0 / 0 | 3 | **Keep** | |
| vp-rnd | 1 (1) | 1 / 1 | 0 | **Remove** | One run; a layer over two leads who each run more. rnd-lead and research-lead report to the principal engineer and head-of-product. |

## 7. Growth, insight, personalization, international

| Role | Runs (since 10-14) | Open / Done | H/O | Verdict | Why |
|---|---|---|---|---|---|
| analytics-steward | 6 (6) | 6 / 7 | 1 | **Keep** | Experiments EXP-007/008 need it. |
| pattern-librarian | 5 (4) | 6 / 0 | 0 | **Keep** | Cheap; six pattern reviews waiting. |
| growth-designer | 3 (3) | 5 / 2 | 0 | **Keep** | First Light PRD-003/004 items. |
| personalization-lead | 1 (1) | 3 / 0 | 0 | **Keep** | Manages learner-model-engineer's live EDD-009; learning-path items W-415, W-817, W-901. Founder brief W-091 still pending. |
| learner-model-engineer | 1 (1) | 3 / 1 | 0 | **Keep** | Three `next` items on EDD-009. |
| localization-lead | 0 | 4 / 0 | 0 | **Remove (park)** | No locale chosen; its open items are only consents about cultural-reviewer. |
| localizer | 0 | 0 / 0 | 0 | **Remove (park)** | Same trigger; nothing to adapt. |

## 8. Changes versus the 2026-10-13 evaluation

- **Now keep, were "activate" or "wait":** qa-tester, release-manager, accessibility-reviewer, evaluation-steward, analytics-steward, design-lead, interaction-designer, backend-engineer, privacy-reviewer, cm-geography, cm-lifehacks: all now run.
- **P8 half-withdrawn:** hq-engineer stays (it does the HQ work); domain-scout → principal-pm-verticals stands.
- **New removals:** mockup-artist, visual-designer, design-engineer (design org shrinks to lead + interaction designer), researcher, vp-rnd, courses-lead, localization-lead, localizer, illustrator.
- **F-33 restated:** park 34 of 36 strand managers, not "23 of 27".

## 9. Decisions this needs

1. Founder: accept, change or reject per row (or per group).
2. CEO office: run the offboarding pipeline for each accepted removal (role file kept and marked parked, `tools/org/roles.mjs`, subagent, HQ seat, re-route its open board items to the receiving role).
3. Objections: each receiving role (principal-pm-verticals, design-lead, interaction-designer, platform-engineer, research-scientist, the category leads) is consulted in writing before its row is applied.
