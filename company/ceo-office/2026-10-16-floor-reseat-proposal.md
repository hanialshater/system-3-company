# Proposal: reseat HQ floors by org, cohesion and headcount fit

owner: chief-of-staff-ceo-office (Leonie) · date: 2026-10-16 · status: **proposed, for the founder's decision** (nothing is built until the founder approves)
ask: founder, 2026-10-16, recorded by chief-of-staff: "I want to reseat people in floors for better orientation." Asked what to organise it around: "By org and cohesion and headcount fit". Dispatch source: §4 founder ask (slot ceo-office-floor-reseat).
route: founder org rule (company/decisions/2026-10-16-founder-org-and-dispatch-rule.md, rule 1): floors and rooms are designed by the CEO office and approved by the founder. Then tools-lead and hq-engineer build it (company/ceo-office/org-change-process.md, pipeline step 6). This office writes no HQ code.
scope: seats only. **No reporting line, role, lane or POC changes here.** Wherever this plan seats someone by lane rather than by reporting line, it says so and names the open founder item it depends on.

## 0. Is it a process problem? (pipeline step 1)
Partly. Three of the orientation problems below come from HQ code, not from floor design: the two seat tables disagree (`HOME` in src/app/hq/people.ts and `ROOM_BY_ROLE` in tools/events.mjs), two roles have no seat, and three rooms in the event log are drawn on no floor. Those are fixed by the same implementation and need no founder decision. Everything else is a floor and room design, which is the founder's call.

## Sources (read for this run)
- HQ: src/lib/hq-floors.ts, src/lib/hq.ts (ROOMS), src/lib/hq-press.ts, src/app/hq/people.ts (HOME), src/app/hq/Office.tsx (seat geometry), src/app/hq/library/Library.tsx, tools/events.mjs (`ROOM_BY_ROLE`, `roomFor`), company/ops/events.md (rooms table), company/rituals/triggers.json, tests/hq/*.test.mjs.
- Org: tools/org/roles.mjs (99 roles, 36 strand managers in `SUBAREAS`), tools/org/people.mjs (`MANY` = pool roles).
- Event log (read-only): company/ops/events.jsonl, 6,000 events: who works in which room, and report-then-next-dispatch pairs for cohesion.
- My own records (founder correction, relayed by the coordinator mid-run: "build the proposal on them"):
  - company/ceo-office/poc-map.md (the lanes and POCs I own),
  - handoff-map.md,
  - org-change-process.md,
  - 2026-10-13-role-evaluation.md,
  - 2026-10-13-proposals.md (P3, P6, P7, P8),
  - company/rituals/records/2026-10-16-retro-delegation.md (D-5 and the Meta notes).
  - Also company/decisions/2026-10-16-founder-system3-meta-sibling.md and the open items in company/ops/founder-inbox.json (F-27, F-28, F-33).

### Earlier findings this plan uses
| Finding (where) | How it shapes the seats |
|---|---|
| **POC map rule 3**: checkers are dispatched from the Quality lane, even when their reporting line sits in the builder's org (poc-map.md; open as **F-28**) | privacy-reviewer and cultural-reviewer sit on the Quality floor. This is **conditional on F-28** (see §2.4). |
| **P6** (2026-10-13-proposals.md) and the role evaluation, lifehacks-safety-reviewer row: "the judge should not sit on the floor of the people who want lessons shipped" | The Life Hacks safety desk moves from the Life Hacks floor to Quality. Its reporting line is already evaluation-steward, so this follows the org rule as well. |
| **POC map lanes 2, 6, 7, 9, 12, 13**: lane POCs | A lead sits with the roles they dispatch: domain-scout with principal-pm-verticals (lane 2), principal-engineer with his lane-7 team, vp-rnd with her labs, hq-engineer with tools-lead (lane 9). |
| **POC map lane 1 flag**: demo-builder's line manager is learning-designer, but the CMs dispatch it | The build floor sits between learning-designer's studio and the design studio (the L4 to L7 chain), on the floor next to the category floors. |
| **Handoff map §1**: the lesson line (builder, then fact-check, learner review, QA, then launch) is the busiest flow | The checkers keep their rooms together on one floor, and stairs link the build floor to it directly. |
| **Retro D-5 / F-33**: park the strand managers that never ran, and take them off HQ desks | The plan does not depend on F-33. Category offices keep their 9 desks either way. A **correction to my own number** is in §1.3. |
| **P7** (proposed, undecided): platform-engineer and release-manager report to principal-engineer | Not assumed. platform-engineer is already seated with engineering by lane. release-manager stays with the launch room under head-of-product. If P7 is adopted, release-manager moves to `deploy` on floor 5 (one line). |
| **P3** (proposed, undecided): tools-lead reports to principal-engineer, so the operator does not own the instruments that audit her | Not assumed. Seating is not independence. Company tools stays on floor 1. |
| **P8** (proposed, undecided): merge domain-scout into principal-pm-verticals, and hq-engineer into tools-lead | These seats already put each pair in one room. A merge would change no seat. |
| **Retro, notes for System 3 Meta**: "scale the org to what is measured" | Seat capacity is computed from the drawn geometry, not estimated (§2.3). |

## 1. Today's map

Seats are taken from `HOME` (people.ts) for resident roles, and from `roomFor` (tools/events.mjs) for pool roles, which appear only while they are running. Headcount counts **roles** (99), not agents. One pool role can show as many avatars.

### 1.1 Floors, rooms, who sits there
| Floor (today's name) | Rooms | Who sits there | Roles |
|---|---|---|---|
| 1 · Lessons & company | product, studio, build-floor, fact-check, learner-review, qa-lab, launch-room, constitution, chief-of-staff, ceo-office, growth, tools, lobby; meetings wbr, retro, crit, planning, incident, first-light; stairs to 2, 3 ("3 & 6"), 5, 7, 8 | founder; chief-of-staff; head-of-product; domain-scout, learning-designer, pattern-librarian (studio); demo-builder; fact-checker; learner-evaluator, pedagogy-critic; qa-tester, accessibility-reviewer; evaluation-steward (constitution); release-manager (launch-room); growth-designer, analytics-steward (growth); tools-lead, hq-engineer (tools); **ceo-office: Leonie, portfolio-manager, principal-engineer, principal-engineer-ops, vp-rnd, head-of-strategic-initiatives**; illustrator (no seat, so it falls into the chief-of-staff room) | **25** (from 9 orgs) |
| 2 · Design, Personalization, International | personalization, model-lab, international, locale-desks, culture-review, design-studio | design-lead, interaction-designer, visual-designer, mockup-artist, design-engineer; personalization-lead, learner-model-engineer; localization-lead, localizer, cultural-reviewer | **10** (3 orgs) |
| 3 · Categories · subjects | cm-math, cs, probability, physics, ai, economics, life, chemistry, geography; stairs to 6; strategy, courses, portfolio-review | 9 CMs + 27 strand managers; principal-pm-verticals; courses-lead, cm-course-ncm | **39** |
| 4 · R&D, Research | rnd-lab, research-lab, rnd-office, research-office, seminar | rnd-lead, rnd-engineer, research-lead, research-scientist, researcher | **5** (their VP sits on floor 1) |
| 5 · Engineering | app-team, backend ("Data & privacy"), engineering, deploy | platform-engineer, community-engineer, backend-engineer (app-team); privacy-reviewer (backend) | **4** (their lead sits on floor 1) |
| 6 · Books, Big Ideas, History, Life Hacks, Behavioral | cm-books, big-ideas, history, lifehacks, behavioral; lifehacks-safety; stairs to 3 | 5 CMs + 9 strand managers; lifehacks-safety-reviewer | **15** |
| 7 · Marketing | marketing, marketing-room, marketing-floor, stairs | vp-marketing | **1** |
| 8 · System 3 Press (sibling) | press-* (from the snapshot) | 21 Press roles (not in our 99) | n/a |

### 1.2 Orientation problems
1. **Categories are split across floors 3 and 6, which are not adjacent.** Floor 6 can be reached only through floor 3. The floor 1 stairs say "Floors 3 & 6", and floor 6 has no way back to the lobby. The rule behind the split (school subject or not) leaves economics and behavioral economics, whose boundary is the one that was argued over (company/decisions/2026-10-15-behavioral-economics-org.md), three floors apart. It does the same to geography and history (maps and borders).
2. **Floor 2 holds three orgs** (Design, Personalization, International) and none of the roles they hand work to. Design's spec goes to the builder, who is on floor 1. A stale comment in hq.ts still says floor 2 is "Life Hacks, Personalization, International".
3. **Floor 1 holds 25 roles from 9 orgs**: product, studio, quality, platform, growth, insight, company tools, leadership and the CEO office. It is the lesson line, the operator, the gates and the C-suite on one floor, so "where is team X" has no answer there.
4. **Leads seated away from the roles they dispatch and review** (POC map): principal-engineer (lane 7) is on floor 1 while his team is on floor 5, and 79 of his events are in the floor-5 `engineering` room. vp-rnd is on floor 1 while her labs are on floor 4. principal-pm-verticals (lane 2) is on floor 3 while domain-scout, whom she dispatches, is in the floor-1 studio.
5. **Judges seated with the work they judge:** the Life Hacks safety desk is beside cm-lifehacks (P6), privacy-reviewer is on the engineering floor, and cultural-reviewer is on the International floor (POC rule 3, F-28).
6. **Over-full and under-full rooms** (seats = drawn standing grid `floor((w−10)/52) × floor((h−28)/46)`, and 9 desks in a category office):
   - `ceo-office` (270×76) has **5 seats for 6 residents**, so one is always hidden as "+1".
   - `tools` (2 seats, 2 residents), `growth` (2/2) and `studio` (3/3) are full with no room for a running agent.
   - Floor 4 has 5 roles in two 470×330 labs. Floor 5 has 4. Floor 7 has 1 (the founder chose that, 2026-10-14). The `personalization` office is 300×370 for one person.
7. **The two seat tables disagree** (HOME vs ROOM_BY_ROLE), so an avatar jumps rooms when its role starts running:
   - domain-scout, learning-designer and researcher idle in their rooms but run in the **chief-of-staff** room (the `roomFor` default).
   - pattern-librarian idles in `studio` and runs in `meeting-crit`.
   - illustrator has no seat at all.
   - head-of-strategic-initiatives has no HOME, so she is not drawn when idle.

   The default-to-chief-of-staff behaviour also makes the operator's room look busier than it is, which is the P3 attribution problem in seat form.
8. **Rooms in the event log that no floor draws:** `review-room` (37 events), `ops-room` (28), `research-room` (5), and `boardroom`. `boardroom` is the project-review ritual's room in triggers.json, and tools/ledger.mjs writes proposals there. Those events do not appear on any floor plan.

### 1.3 A correction to my own record
Retro D-5 (and founder item **F-33**) says "23 of 27 strand managers never ran". That figure was for the retro's 48-hour window, when there were 27 strands. **All-time, in events.jsonl, 15 of 36 strand managers have run and 21 never have.** The 21 include all 9 Books, Big Ideas and History strands. F-33's count should be restated before the founder decides it. This plan does not depend on F-33.

## 2. The proposed plan

### 2.1 Rules
1. **One floor per org.** An org is a founder direct's reporting tree. Two exceptions, each stated:
   - **Small orgs are grouped, and the floor is named for all of them.** Floor 1 holds the founder, the chief of staff's org (4 roles) and the CEO office (Leonie, portfolio-manager, head-of-strategic-initiatives). Floor 5 holds Engineering (5) and R&D (6).
   - **An org too big for one floor splits along its own sub-lead lines, never between a lead and their reports.** Head of Product's org is 72 roles, which becomes floor 2 (everything that is not a category) plus two category floors. A category lead and all their strand managers always share one office.
2. **Cohesion: a lead sits with the roles they dispatch and review.** Where the POC map and the reporting line disagree, the seat follows the **lane** (the POC map). This applies to platform-engineer (lane 7) and to privacy-reviewer and cultural-reviewer (lane 10, which depends on F-28). Frequent handoff pairs sit in the same room, in adjacent rooms, or on floors that a stairs room links directly. The evidence is the report-then-next-dispatch pairs in events.jsonl (each pair is a report by one role followed within 2 hours by a dispatch of the other). It is operator-ordered, so read it as testimony about sequencing:

   | Pair | Count | Seat in this plan |
   |---|---|---|
   | demo-builder ↔ fact-checker | 176 | build floor (2) ↔ fact-check (6), with direct stairs both ways |
   | demo-builder ↔ learner-evaluator | 57 | same |
   | fact-checker ↔ learner-evaluator | 25 | adjacent rooms, floor 6 |
   | principal-engineer ↔ platform-engineer | 13 | same floor (5): `engineering` beside `app-team` |
   | principal-engineer-ops ↔ tools-lead | 12 | floors 5 and 1 (Rhea's lane is ops; her line is Kenji) |
   | design-lead ↔ interaction-designer; demo-builder ↔ interaction-designer | 4; 9 | design studio beside the build floor (2) |
   | CMs ↔ demo-builder | 4 to 8 each | category floors 3 and 4 sit next to floor 2 |
   | qa-tester ↔ release-manager | 8 | floors 6 and 2, linked by the same stairs |
3. **Headcount fit.** The plan is 1000×660. A full floor holds at most **10 category offices** (186×236, 9 desks each, 5 across × 2 rows), or about **25 rooms** of the floor-1 size. Targets:
   - **at most 30 resident roles per floor**, and **no room with more residents than drawn seats**. Every room also needs at least one free seat for a running agent, except single-person offices.
   - A floor under 6 roles is grouped with the org it hands off to most, unless the founder chose it (Marketing, floor 7).
   - An org over 30 roles, or over 10 category offices, splits along rule 1.
   The layout in §2.3 was checked against this with a script: room ids are unique, every room is inside the plan, no rooms overlap, and no room has more residents than seats. These are the same constraints as tests/hq/floors.test.mjs.
4. **Room ids stay stable.** No room id that appears in events.jsonl, triggers.json, a whiteboard folder, Library.tsx or a test is renamed or removed (§3). Rooms move floor, change size or get a new display name. Their ids do not change.

### 2.2 Floors and names (for `FLOOR_NAMES`)
| # | Name | Org(s) | Roles today → proposed |
|---|---|---|---|
| 1 | **Floor 1 · Lobby, leadership & operations** | founder; chief of staff (Ada) + company tools + patterns; CEO office (Leonie, portfolio, strategic initiatives); First Light war room; ritual rooms | 25 → **8** |
| 2 | **Floor 2 · Product: studio, design, launch, personalization, international** | head-of-product's org, except categories | 10 → **20** |
| 3 | **Floor 3 · Categories: science & technology** | math, probability, cs, ai, physics, life, chemistry | 39 → **28** |
| 4 | **Floor 4 · Categories: society, money & ideas** | economics, behavioral, geography, history, books, big ideas, life hacks | 5 → **22** |
| 5 | **Floor 5 · Engineering & R&D** | principal-engineer's org + platform-engineer (lane 7); vp-rnd's org | 4 → **11** |
| 6 | **Floor 6 · Quality: gates & reviews** | evaluation-steward's org + privacy and cultural reviewers (lane 10) | 15 → **9** |
| 7 | Floor 7 · Marketing (unchanged) | vp-marketing | 1 → 1 |
| 8 | Floor 8 · System 3 Press (sibling company) (unchanged) | the Press | (21 Press roles) |
| (9) | **Reserved: System 3 Meta.** Note only. Not designed, not added to `FLOORS`, no room or stairs. It is designed after First Light under the Meta record (company/decisions/2026-10-16-founder-system3-meta-sibling.md, parked). `stairsTo` already accepts a single digit, so 9 needs no regex change. | – | – |

The numbering keeps the floors that change least: the science and technology categories stay on 3, Engineering stays on 5, Marketing on 7 and the Press on 8. That cut the moves from 81 (in the first draft, which numbered floors in lesson-flow order) to 52.

**Why categories split 7/7 by neighbourhood, not 9/5 by "school subject":** both splits fit. The neighbourhood split puts each argued boundary on one floor, with the offices side by side:
- economics beside behavioral (the 2026-10-15 boundary),
- geography beside history (maps and borders),
- life hacks beside economics (personal finance, a boundary the handoff map says to watch),
- life beside chemistry, and cs beside ai.

It also makes the two category floors adjacent, with stairs both ways. The cost is 8 more moves (economics and geography). The 9/5 split is the alternative in §6.

### 2.3 Layout (SVG units; x, y, w, h; seats are residents/drawn seats)
**Floor 1**:
- Stairs row (y16, h84): to-floor-2, to-floor-3 ("Categories 3–4"), to-floor-5, to-floor-6, to-floor-7, to-floor-8, each 150 wide (to-floor-8 is 170).
- Row 2 (y116):
  - `chief-of-staff` 20,116,300,230 (1/20: the room where dispatched general-purpose agents gather)
  - `tools` "Company tools & patterns" 330,116,250,110 (3/4)
  - `boardroom` (meeting, **newly drawn**) 330,236,250,110
  - `ceo-office` 590,116,390,110 (3/7, fixes the 6-in-5 overflow)
  - `first-light` 590,236,390,110 (still beside the CEO office)
- Ritual row (y356, h110): meeting-wbr, meeting-retro, meeting-crit, meeting-planning.
- Bottom row (y476, h168): `lobby` 20,476,470,168 (founder) and `incident` 500,476,480,168.

**Floor 2**:
- Row 1 (y16, h150): `product` 20 (1/8), `strategy` "Strategy · Verticals" 258 (2/8: principal-pm-verticals, domain-scout), `courses` 496 (2/8), `growth` "Growth & insight" 734 (2/8). Each is 230 wide (growth is 246).
- Row 2 (y176, h230): `studio` "Learning studio" 20,176,180 (1/12), `build-floor` 208,176,400,230 (same size, so Office.tsx's 18 desks still fit), `design-studio` 616,176,364 (6/24).
- Row 3 (y416, h110): `launch-room` 20,300 wide (release-manager), then `personalization`, `model-lab`, `international` and `locale-desks`, each 150 to 160 wide (1/2 each).
- Bottom row (y536): `to-floor-1-from-2` and `to-floor-6-from-2` ("↑ Floor 6 · Quality: where your build is checked").

**Floor 3**:
- Offices row 1 (y16): cm-probability 20, cm-math 214, cm-cs 408, cm-ai 602, cm-physics 796.
- Row 2 (y262): `to-floor-4` 20 (186×236), `portfolio-review` 214,262,380,236, cm-life 602, cm-chemistry 796.
- Bottom row (y508): `to-floor-1-from-3`.

**Floor 4**:
- Offices row 1 (y16): cm-lifehacks 20, cm-economics 214, cm-behavioral 408, cm-geography 602, cm-history 796.
- Row 2 (y262): `to-floor-3-from-4` 20, cm-books 602, cm-big-ideas 796. The space 214 to 594 is free for a next category.
- Bottom row (y508): `to-floor-1-from-4`.

**Floor 5**:
- Row 1 (y16, h230): `app-team` 20,470 wide (2/32), `backend` "Backend · data" 498,230 (1/16), `engineering` 736,244 (1/16: principal-engineer chairs it, and his events already go there).
- Row 2 (y256, h150): `ops-room` "Ops & readiness" (**newly drawn**; 28 events already use it) 20, `deploy` 258, `rnd-office` "R&D leads · VP of R&D" 496 (2/8), `research-office` 734.
- Row 3 (y416, h110): `rnd-lab` 20,470 wide, `research-lab` 498,482 wide (2/9).
- Bottom row (y536): `seminar` 20,580 wide (the R&D review ritual room) and `to-floor-1-from-5`.

**Floor 6**:
- Row 1 (y16, h230): `fact-check` 20,310 (1/20), `learner-review` 338,310 (2/20), `qa-lab` 656,324 (2/24).
- Row 2 (y256, h150): `constitution` 20,310 (evaluation-steward), `review-room` (**newly drawn**; 37 events already use it) 338,310, `lifehacks-safety` 656,160 (1/4), `privacy-review` (**new id**) 824,156 (1/4).
- Row 3 (y416): `culture-review` 20,310.
- Bottom row (y536): `to-floor-1-from-6` and `to-floor-2-from-6` ("↓ Floor 2 · the build floor").

**Floor 7** is unchanged. **Floor 8** is unchanged.

Every floor from 2 to 6 gets a "↓ Floor 1 · Lobby" stairs room. Today only 7 and 8 have one.

### 2.4 Conditional seats
- **F-28 (open):** if the founder does *not* route privacy and cultural review through the Quality lane, privacy-reviewer goes back to `backend` (floor 5) and cultural-reviewer goes back to `culture-review` on floor 2. Floor 6 then has 7 roles. Nothing else changes.
- **F-33 (open):** if the strand managers are parked, they leave their desks. Category floors show 7 leads each, and the offices and floors stay the same.
- **P7 (proposed):** if release-manager moves under principal-engineer, its seat moves from `launch-room` (2) to `deploy` (5).

### 2.5 Every role: current → proposed
"floor" = the role changes floor (or its floor becomes a different floor). "room" = it changes room on the same floor. "–" = it stays.

| Role | Team → reports to | Today (floor · room) | Proposed (floor · room) | Move |
|---|---|---|---|---|
| founder | leadership → nobody | 1 · lobby | 1 · lobby | – |
| chief-of-staff | leadership → founder | 1 · chief-of-staff | 1 · chief-of-staff | – |
| head-of-product | product → founder | 1 · product | 2 · product | floor |
| domain-scout | product → head-of-product | 1 · studio | 2 · strategy | floor |
| learning-designer | studio → head-of-product | 1 · studio | 2 · studio | floor |
| mockup-artist | design → design-lead | 2 · design-studio | 2 · design-studio | – (floor 2 renamed) |
| researcher | research → research-lead | 4 · research-lab | 5 · research-lab | floor |
| demo-builder | studio → learning-designer (pool) | 1 · build-floor | 2 · build-floor | floor |
| fact-checker | quality → evaluation-steward (pool) | 1 · fact-check | 6 · fact-check | floor |
| learner-evaluator | quality → evaluation-steward (pool) | 1 · learner-review | 6 · learner-review | floor |
| pedagogy-critic | quality → evaluation-steward (pool) | 1 · learner-review | 6 · learner-review | floor |
| qa-tester | quality → evaluation-steward (pool) | 1 · qa-lab | 6 · qa-lab | floor |
| accessibility-reviewer | quality → evaluation-steward | 1 · qa-lab | 6 · qa-lab | floor |
| evaluation-steward | quality → founder | 1 · constitution | 6 · constitution | floor |
| principal-engineer | leadership → founder | 1 · ceo-office | 5 · engineering | floor |
| platform-engineer | platform → head-of-product | 5 · app-team | 5 · app-team | – |
| release-manager | platform → head-of-product | 1 · launch-room | 2 · launch-room | floor |
| backend-engineer | backend → principal-engineer | 5 · app-team | 5 · backend | room |
| privacy-reviewer | backend → principal-engineer | 5 · backend | 6 · privacy-review | floor |
| growth-designer | growth → head-of-product | 1 · growth | 2 · growth | floor |
| tools-lead | company-tools → chief-of-staff | 1 · tools | 1 · tools | – |
| hq-engineer | company-tools → tools-lead | 1 · tools | 1 · tools | – |
| analytics-steward | insight → head-of-product | 1 · growth | 2 · growth | floor |
| pattern-librarian | insight → chief-of-staff | 1 · studio | 1 · tools | room |
| cm-math | categories → head-of-product | 3 · cm-math | 3 · cm-math | – |
| cm-cs | categories → head-of-product | 3 · cm-cs | 3 · cm-cs | – |
| cm-probability | categories → head-of-product | 3 · cm-probability | 3 · cm-probability | – |
| cm-physics | categories → head-of-product | 3 · cm-physics | 3 · cm-physics | – |
| cm-ai | categories → head-of-product | 3 · cm-ai | 3 · cm-ai | – |
| cm-economics | categories → head-of-product | 3 · cm-economics | 4 · cm-economics | floor |
| cm-life | categories → head-of-product | 3 · cm-life | 3 · cm-life | – |
| cm-geography | categories → head-of-product | 3 · cm-geography | 4 · cm-geography | floor |
| cm-lifehacks | categories → head-of-product | 6 · cm-lifehacks | 4 · cm-lifehacks | floor |
| cm-chemistry | categories → head-of-product | 3 · cm-chemistry | 3 · cm-chemistry | – |
| cm-books | categories → head-of-product | 6 · cm-books | 4 · cm-books | floor |
| cm-big-ideas | categories → head-of-product | 6 · cm-big-ideas | 4 · cm-big-ideas | floor |
| cm-history | categories → head-of-product | 6 · cm-history | 4 · cm-history | floor |
| cm-behavioral | categories → head-of-product | 6 · cm-behavioral | 4 · cm-behavioral | floor |
| lifehacks-safety-reviewer | categories → evaluation-steward | 6 · lifehacks-safety | 6 · lifehacks-safety | floor (floor 6 becomes Quality) |
| personalization-lead | personalization → head-of-product | 2 · personalization | 2 · personalization | – (floor 2 renamed) |
| learner-model-engineer | personalization → personalization-lead | 2 · model-lab | 2 · model-lab | – (floor 2 renamed) |
| localization-lead | international → head-of-product | 2 · international | 2 · international | – (floor 2 renamed) |
| localizer | international → localization-lead (pool) | 2 · locale-desks | 2 · locale-desks | – (floor 2 renamed) |
| cultural-reviewer | international → localization-lead (pool) | 2 · culture-review | 6 · culture-review | floor |
| chief-of-staff-ceo-office | leadership → founder | 1 · ceo-office | 1 · ceo-office | – |
| head-of-strategic-initiatives | leadership → founder | 1 · ceo-office | 1 · ceo-office | – |
| community-engineer | platform → principal-engineer | 5 · app-team | 5 · app-team | – |
| vp-rnd | leadership → founder | 1 · ceo-office | 5 · rnd-office | floor |
| rnd-lead | rnd → vp-rnd | 4 · rnd-office | 5 · rnd-office | floor |
| rnd-engineer | rnd → rnd-lead (pool) | 4 · rnd-lab | 5 · rnd-lab | floor |
| research-lead | research → vp-rnd | 4 · research-office | 5 · research-office | floor |
| research-scientist | research → research-lead (pool) | 4 · research-lab | 5 · research-lab | floor |
| principal-engineer-ops | leadership → principal-engineer | 1 · ceo-office | 5 · ops-room | floor |
| portfolio-manager | leadership → chief-of-staff-ceo-office | 1 · ceo-office | 1 · ceo-office | – |
| design-lead | design → head-of-product | 2 · design-studio | 2 · design-studio | – (floor 2 renamed) |
| interaction-designer | design → design-lead | 2 · design-studio | 2 · design-studio | – (floor 2 renamed) |
| illustrator | design → visual-designer | 1 · chief-of-staff | 2 · design-studio | floor |
| design-engineer | design → design-lead | 2 · design-studio | 2 · design-studio | – (floor 2 renamed) |
| visual-designer | design → design-lead | 2 · design-studio | 2 · design-studio | – (floor 2 renamed) |
| cm-math-algebra | categories → cm-math | 3 · cm-math | 3 · cm-math | – |
| cm-math-geometry | categories → cm-math | 3 · cm-math | 3 · cm-math | – |
| cm-math-discrete | categories → cm-math | 3 · cm-math | 3 · cm-math | – |
| cm-cs-algorithms | categories → cm-cs | 3 · cm-cs | 3 · cm-cs | – |
| cm-cs-systems | categories → cm-cs | 3 · cm-cs | 3 · cm-cs | – |
| cm-cs-security | categories → cm-cs | 3 · cm-cs | 3 · cm-cs | – |
| cm-probability-chance | categories → cm-probability | 3 · cm-probability | 3 · cm-probability | – |
| cm-probability-statistics | categories → cm-probability | 3 · cm-probability | 3 · cm-probability | – |
| cm-probability-data-literacy | categories → cm-probability | 3 · cm-probability | 3 · cm-probability | – |
| cm-physics-mechanics | categories → cm-physics | 3 · cm-physics | 3 · cm-physics | – |
| cm-physics-waves | categories → cm-physics | 3 · cm-physics | 3 · cm-physics | – |
| cm-physics-electricity | categories → cm-physics | 3 · cm-physics | 3 · cm-physics | – |
| cm-ai-ml-basics | categories → cm-ai | 3 · cm-ai | 3 · cm-ai | – |
| cm-ai-neural-language | categories → cm-ai | 3 · cm-ai | 3 · cm-ai | – |
| cm-ai-ai-society | categories → cm-ai | 3 · cm-ai | 3 · cm-ai | – |
| cm-economics-personal-finance | categories → cm-economics | 3 · cm-economics | 4 · cm-economics | floor |
| cm-economics-markets | categories → cm-economics | 3 · cm-economics | 4 · cm-economics | floor |
| cm-economics-macro | categories → cm-economics | 3 · cm-economics | 4 · cm-economics | floor |
| cm-life-genetics-evolution | categories → cm-life | 3 · cm-life | 3 · cm-life | – |
| cm-life-health-epidemiology | categories → cm-life | 3 · cm-life | 3 · cm-life | – |
| cm-life-ecology-body | categories → cm-life | 3 · cm-life | 3 · cm-life | – |
| cm-chemistry-matter-reactions | categories → cm-chemistry | 3 · cm-chemistry | 3 · cm-chemistry | – |
| cm-chemistry-solutions-acids | categories → cm-chemistry | 3 · cm-chemistry | 3 · cm-chemistry | – |
| cm-chemistry-energy-rates | categories → cm-chemistry | 3 · cm-chemistry | 3 · cm-chemistry | – |
| cm-geography-maps-projections | categories → cm-geography | 3 · cm-geography | 4 · cm-geography | floor |
| cm-geography-earth-climate | categories → cm-geography | 3 · cm-geography | 4 · cm-geography | floor |
| cm-geography-people-places | categories → cm-geography | 3 · cm-geography | 4 · cm-geography | floor |
| cm-books-business | categories → cm-books | 6 · cm-books | 4 · cm-books | floor |
| cm-books-psychology | categories → cm-books | 6 · cm-books | 4 · cm-books | floor |
| cm-books-science-history | categories → cm-books | 6 · cm-books | 4 · cm-books | floor |
| cm-big-ideas-science | categories → cm-big-ideas | 6 · cm-big-ideas | 4 · cm-big-ideas | floor |
| cm-big-ideas-society | categories → cm-big-ideas | 6 · cm-big-ideas | 4 · cm-big-ideas | floor |
| cm-big-ideas-mind | categories → cm-big-ideas | 6 · cm-big-ideas | 4 · cm-big-ideas | floor |
| cm-history-population-economy | categories → cm-history | 6 · cm-history | 4 · cm-history | floor |
| cm-history-maps-borders | categories → cm-history | 6 · cm-history | 4 · cm-history | floor |
| cm-history-events-data | categories → cm-history | 6 · cm-history | 4 · cm-history | floor |
| principal-pm-verticals | product → head-of-product | 3 · strategy | 2 · strategy | floor |
| courses-lead | courses → head-of-product | 3 · courses | 2 · courses | floor |
| cm-course-ncm | courses → courses-lead | 3 · courses | 2 · courses | floor |
| vp-marketing | marketing → founder | 7 · marketing | 7 · marketing | – |

## 3. Moves, and what breaks

### 3.1 Moves
**52 of 99 roles move** (50 change floor, 2 change room only). 47 stay, and 9 of those stay on floor 2 when the floor is renamed.
- 17 leave floor 1:
  - head-of-product, domain-scout, learning-designer, demo-builder, growth-designer, analytics-steward, release-manager and illustrator go to 2;
  - fact-checker, learner-evaluator, pedagogy-critic, qa-tester, accessibility-reviewer and evaluation-steward go to 6;
  - principal-engineer, principal-engineer-ops and vp-rnd go to 5.
- 22 category roles change floor:
  - economics and geography (8) go from 3 to 4;
  - books, big ideas, history (12), cm-lifehacks and cm-behavioral go from 6 to 4.
- Strategy and courses (3) go from 3 to 2.
- R&D and Research (5) go from 4 to 5.
- 3 judges go to Quality: lifehacks-safety-reviewer (floor 6 becomes Quality), privacy-reviewer (from 5) and cultural-reviewer (from 2).
- Room only: backend-engineer moves from `app-team` to `backend`. pattern-librarian moves from `studio` to `tools`.

Headcount before → after (roles): F1 25→8 · F2 10→20 · F3 39→28 · F4 5→22 · F5 4→11 · F6 15→9 · F7 1→1. The largest floor goes from 39 to 28, and the smallest company floor other than Marketing goes from 4 to 8.

Note for the founder: most event traffic (the build floor, fact-check, learner review) moves off floor 1, which is the floor HQ opens on. Floor 1 becomes the lobby and leadership view, and the floor tabs' "here" counts show where the work is.

### 3.2 Room ids: what must stay stable, what is new, what is retired
I grepped tests/ and src/ for room ids (company.mjs, the protected CLI, references none, so **no amendment is needed**).
- **Must stay stable** (and do, in this plan):
  - **every id used in company/ops/events.jsonl** (45 ids; history replays by `e.room`);
  - the ritual rooms in company/rituals/triggers.json (boardroom, design-studio, incident, launch-room, lobby, meeting-crit, meeting-retro, meeting-wbr, seminar, strategy);
  - whiteboard boards: company/meetings/whiteboards/meeting-wbr/, and `/hq/whiteboard/<id>` for every meeting room;
  - Library.tsx: meeting-wbr, meeting-retro, meeting-planning, launch-room, engineering, product, strategy, constitution, courses;
  - HQ.tsx, Office.tsx, HqTop.tsx, FirstLight.tsx: lobby, first-light, build-floor (build-floor keeps 400×230 for its fixed desk grid);
  - kudos.mjs (lobby), ledger.mjs (boardroom);
  - the tests listed below.
- **Newly drawn, with ids already in the log** (this fixes orphan events, and no alias is needed): `boardroom` (F1), `review-room` (F6), `ops-room` (F5).
- **New ids:** `privacy-review` (F6). Stairs: `to-floor-4` (on F3), `to-floor-3-from-4`, `to-floor-1-from-2` to `to-floor-1-from-6`, `to-floor-6-from-2`, `to-floor-2-from-6`.
- **Relocated stairs (same id, same target):** `to-floor-6` moves from F3 to F1 and now leads to Quality. `to-floor-3` and `to-floor-5` stay on F1 with new labels. Stairs have 0 events.
- **Retired:** `to-floor-3-from-6` (0 events; referenced only in tests/hq/floors.test.mjs).
- **Alias, recommended:** `research-room` → `research-lab` (5 events), mapped at read time in `loadEvents`. Without it they stay invisible, as they are today.
- **Deep links:** `?room=` links keep working. `?floor=2`, `?floor=4` and `?floor=6` links open a different floor than before.

### 3.3 Tests that change (tests/hq is not protected; tests/qa is untouched)
- tests/hq/floors.test.mjs:
  - The category-floor assertion (lines 40–41) changes from "5 named domains on 6, the rest on 3" to the 7/7 lists in §2.2.
  - The stairs test (44–48) changes from "3 ↔ 6" to "3 ↔ 4", plus "every floor 2–7 has a stairs room to 1".
  - The home-room test still holds (the cm-* ids are unchanged).
  - The Marketing test is unchanged.
- tests/hq/tooling.test.mjs (head-of-strategic-initiatives → ceo-office; first-light drawn): unchanged and still passes.
- tests/hq/firstlight.test.mjs (war room on the CEO-office floor): still passes, since both are on F1.
- tests/hq/press.test.mjs (to-floor-8 on F1; floor 8 holds only press-* plus its stairs): unchanged.
- **Add:** one test asserting that `HOME` and `ROOM_BY_ROLE` agree for every resident role, and that every room id in events.jsonl is drawn or aliased. That stops problems 7 and 8 from coming back.

## 4. Implementation note (for tools-lead / hq-engineer, after the founder approves)
Lane 9 (POC: tools-lead). Files:
1. **src/lib/hq-floors.ts**: `FLOOR_NAMES` 1–6 per §2.2. `FLOORS` stays 1–8, and 9 is not added.
2. **src/lib/hq.ts**: re-lay `ROOMS` per §2.3:
   - new x/y/w/h and `floor` values;
   - new names for tools, growth, studio, backend, rnd-office and the stairs;
   - add boardroom, review-room, ops-room, privacy-review and the new stairs, and drop `to-floor-3-from-6`;
   - split `DOMAINS`/`NEW_CATEGORIES` into the two 7-office lists;
   - fix the stale `Room.floor` doc comment;
   - add the `research-room` alias in `loadEvents`.
3. **src/app/hq/people.ts** `HOME`:
   - principal-engineer → engineering, principal-engineer-ops → ops-room, vp-rnd → rnd-office;
   - backend-engineer → backend, privacy-reviewer → privacy-review;
   - pattern-librarian → tools, domain-scout → strategy;
   - add illustrator → design-studio and head-of-strategic-initiatives → ceo-office.
4. **tools/events.mjs** `ROOM_BY_ROLE`: the same values. Also add domain-scout → strategy, learning-designer → studio, researcher → research-lab and illustrator → design-studio, so that no resident falls to the `chief-of-staff` default. Old events keep their stored rooms; only new events change.
5. **company/ops/events.md** rooms table: the ceo-office row (it no longer lists the principal engineers or VP R&D), plus rows for review-room, ops-room and privacy-review.
6. **tests/hq/floors.test.mjs**: per §3.3, plus the new agreement test.
7. Not touched: Office.tsx (seat rules are by id prefix and kind, and both still hold), hq-press.ts, the Press snapshot, roles.mjs (no org change), company.mjs.

**Size:** about 150–220 changed lines across 6 files, most of it the ROOMS table. That is one hq-engineer run plus one review, and `npm run verify` includes the computer-use QA of /hq. **Tier:** HQ-only, no learner surface. **Deploy:** none needed. HQ is off in production (`hqEnabled`). Any deploy still needs the founder's approval in conversation.

## Consulted (org-change-process step 3; none has answered yet)
A floor change touches the directs whose people move. Each should answer in writing here (agree, agree with changes, or object) before the founder decides. If the founder decides first, the open consultations go with the decision as objections.

| Direct | Why | Answer |
|---|---|---|
| head-of-product (Priya) | 72 of her roles are re-seated, and her org spans floors 2–4 | not asked yet |
| evaluation-steward (Hilde) | gets a floor; three judges join it | not asked yet |
| principal-engineer (Kenji) | leaves the CEO office for floor 5; Engineering shares the floor with R&D | not asked yet |
| vp-rnd (Vera) | leaves the CEO office; R&D loses its own floor | not asked yet |
| chief-of-staff (Ada) | floor 1 changes; integration is now on a different floor from the build floor | not asked yet |
| head-of-strategic-initiatives (Beatriz) | the war room stays beside the CEO office; FYI | not asked yet |
| vp-marketing (Celeste) | no change; FYI | not asked yet |

## Objections
| # | Objection | Raised by | Status / answer |
|---|---|---|---|
| 1 | Principal-engineer, principal-engineer-ops and vp-rnd have "CEO Office" in their titles, and the founder moved the principal engineer into the CEO office on 2026-10-13. Seating them with their teams reads as undoing that. | Leonie (anticipating Kenji and Vera) | **Carried to the founder** as alternative A2 in §6. Seats are not reporting lines, and their titles and lines are unchanged. If the founder keeps them in the CEO office, that room grows to 6 residents with 7 seats (390 wide), and floor 1 goes from 8 to 11. |
| 2 | Merging Engineering and R&D on one floor puts two founder directs' orgs together, against "one floor per org". | Leonie | **Carried** as alternative A3. Each org has under 6 roles, so rule 3 groups them. R&D's lab work goes into the kit, which principal-engineer reviews. Research's handoffs go to learning-designer (floor 2) and are not served by this. |
| 3 | Seating privacy-reviewer and cultural-reviewer by lane pre-empts F-28, which is still open. | Leonie | **Conditional** (§2.4). Their seat follows the founder's F-28 answer, and it is one line in HOME/ROOM_BY_ROLE either way. |
| 4 | Splitting the categories 7/7 costs 8 more moves than keeping the 9/5 "subject or not" rule, and the subject rule is easy to explain. | Leonie | **Carried** as alternative B in §6. I recommend 7/7 because the founder asked for cohesion, and the economics and behavioral boundary is the one that cost a decision record. |
| 5 | Moving the lesson line off floor 1 makes the floor HQ opens on quiet. The founder may like seeing work happen in the default view. | Leonie | **Open, for the founder.** Mitigations: the floor tabs already show "here" counts, and hq-engineer could open HQ on the busiest floor. That last one is a new behaviour, so it is not proposed here. |
| 6 | 52 moves for an orientation fix risks "a reorg every week" (my own failure mode). | Leonie (against my own plan) | **Answered:** no role, reporting line or lane changes. Seats regenerate from two tables, and every room id stays stable, so it can be reverted in one commit. A second reseat inside 30 days would be a finding. |
| 7 | The cohesion counts come from operator-ordered dispatch sequences. They show what the chief of staff ran next, not necessarily what one role handed to another. | Leonie (against my own evidence) | **Carried.** The top pairs agree with the designed lesson line (handoff map §1), so the plan does not rest on the noisy tail. Re-check from `batch=` data after D7's first audit (WBR 2026-10-19). |
| 8 | tools-lead (who owns the instruments that audit the operator) stays on the operator's floor. | Leonie (P3) | **Not a seating matter.** P3 is a reporting-line proposal and stays with the founder. Seats change nothing about who can edit events.mjs. |

**What would make this plan wrong:** if people look for others by *what is happening* (the lesson line, a launch) rather than by *who they belong to*, an org-first plan makes HQ harder to read than today's lesson-line floor 1. The test after it ships: does the founder find a given role in one click more often than now? If he does not, revert to the current floor 1 with only the fixes that need no decision (seat tables, orphan rooms, ceo-office overflow).

## 6. The founder's decision
**Approve the reseat in §2: seven org floors, the categories split 7/7 by neighbourhood on floors 3 and 4, Quality on floor 6, Engineering and R&D sharing floor 5, and floor 9 reserved for System 3 Meta as a note only?**
- **B (fewer moves):** the same plan, but keep the categories split by "school subject or not" (9 on floor 3, 5 on floor 4). That is 44 moves instead of 52, but floor 3 would hold 36 roles, over the 30-per-floor target.
- **A2 (keep the CEO-office titles together):** the same plan, but principal-engineer, principal-engineer-ops and vp-rnd stay in the CEO office on floor 1. That is 49 moves, and floor 1 has 11 roles.

(A3, giving R&D its own floor, would need a ninth company floor. That would move Meta's slot to 10 and widen `stairsTo` to two digits. I do not recommend it now.)

## Next
- On approval: the chief of staff files the build in lane 9 (tools-lead POC → hq-engineer), citing this file. Leonie then checks the result against §2.5 at the next WBR.
- Before the founder decides: the chief of staff sends this to the directs in "Consulted". Separately, F-33's count needs restating (§1.3).
- Fixable without a decision (lane 9, if the founder prefers not to reseat): HOME/ROOM_BY_ROLE agreement, seats for illustrator and head-of-strategic-initiatives, and drawing review-room, ops-room and boardroom. Drawing those three adds rooms, so it still needs the founder's approval under rule 1. Making the two tables agree does not.
