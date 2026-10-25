# F-54: no layer of one, one learner-experience team, and flat categories on purpose

owner: chief-of-staff-ceo-office (Leonie) · decides: founder · date: 2026-10-25 · status: **proposed, nothing applied** (no edit to tools/org/roles.mjs, company/company.json `owns`, gates, protected paths or the board's owners)

founder asks (2026-10-25, verbatim, relayed by the coordinating session):
1. "I see managers with one direct, is that also the intended behavior?"
2. "For tracking likes, saves, and personalization of the feed from serving, also the onboarding guide and auth, who would be the responsible?"
3. "Also the category teams are flat, is that intentional?"

short answers:
1. **No.** Three managers have exactly one direct report, and two paths are 3 levels deep. A manager with one report is a layer, not a team. See system3-meta `PRINCIPLES.md` "Units of scale, few layers": "Few layers. Units report to one lead or to product, never through managers of managers". Meta's onboarding applies the same rule in code, in system3-meta `src/onboard.mjs`: "a manager with a single direct report is a layer, not a team; its report moves up". Sections 1-3.
2. **Today, five roles under two managers, and the stored likes and saves have no owner on record.** After F-54, one **learner-experience team** owns it end to end. Its lead is personalization-engineer. Every path has one owner, and the independent checks stay outside the team. Section 4.
3. **Yes, flat is intended.** The category is the unit of scale. An owner's "team" is the makers it will dispatch per item once self-dispatch is on. The checkers stay central for independence. Area leads only if the spans demand it, and today they do not. Section 5.

rests on:
- the F-53 proposal, section 3 (`company/ceo-office/2026-10-25-f53-categories-and-agents.md`);
- the F-53 decision (`company/decisions/2026-10-25-founder-f53.md`);
- the F-50 decision (`company/decisions/2026-10-25-founder-restructuring.md`), head-of-product objection 5: "CPO un-parks above 8";
- the F-52 parks (`company/decisions/2026-10-25-founder-f52.md`; `tools/org/roles.mjs` `SCHEDULED_PARK`);
- `company/company.json` `owns`;
- `company/engineering/data-inventory.md`.

founder inbox: F-54, to be filed by chief-of-staff, the only inbox writer (board items in section 9).

## 0. The recommendation in six lines

1. **The tree is three levels: the founder, nine leads, then the people who do the work.** Depth below the founder falls from 3 to 2, and no manager has exactly one direct.
2. **Thirteen reporting-line changes and a handful of path owners.** No role is added, parked or retired. Missions, gates and checks are unchanged (section 6).
3. **Engineering** (principal-engineer, 6 directs): tools-lead and hq-engineer become peers, with platform-engineer, privacy-reviewer, principal-engineer-ops and rnd-lead.
4. **Learner experience** (a new central team, personalization-engineer as lead, reporting to the founder): backend-engineer and growth-designer. It owns feed and serving, likes, saves and progress tracking, first-run onboarding, and auth and accounts. privacy-reviewer and personalization-eval check it from outside.
5. **Content types** (design-lead, reporting to the founder): interaction-designer and demo-builder. **Product and portfolio** (head-of-product): portfolio-manager, pattern-librarian, analytics-steward, research-scientist and the two dated roles. The operator and this office become desks with no reports.
6. **The 14 category owners stay flat under the category lead** (F-53 L1). Area leads come only on a stated trigger (section 5).

## 1. The tree today (2026-10-25, from `tools/org/roles.mjs` `roles`: 47 roles incl. the founder)

| Manager | Directs | Who |
|---|---|---|
| founder | 8 | chief-of-staff, chief-of-staff-ceo-office, head-of-product, evaluation-steward, principal-engineer, principal-pm-verticals (category lead), head-of-strategic-initiatives, vp-marketing |
| principal-pm-verticals (category lead) | **15** | 14 category owners (cm-*), demo-builder |
| head-of-product | 7 | platform-engineer, release-manager, growth-designer, analytics-steward, personalization-engineer, research-scientist, design-lead |
| evaluation-steward | 7 | fact-checker, learner-evaluator, pedagogy-critic, qa-tester, accessibility-reviewer, personalization-eval, route-reviewer |
| principal-engineer | 4 | backend-engineer, privacy-reviewer, rnd-lead, principal-engineer-ops |
| chief-of-staff (operator) | 2 | tools-lead, pattern-librarian |
| **tools-lead** | **1** | hq-engineer |
| **chief-of-staff-ceo-office** | **1** | portfolio-manager |
| **design-lead** | **1** | interaction-designer |

- **Depth below the founder is 3** on two paths: founder → chief-of-staff → tools-lead → hq-engineer, and founder → head-of-product → design-lead → interaction-designer.
- **Managers (excluding the founder): 8.**
- **Managers with one direct: 3.**
- **Managers of managers below the founder: 2** (chief-of-staff over tools-lead; head-of-product over design-lead).
- **Spans:** 15, 7, 7, 4, 2, 1, 1, 1; the founder has 8.

## 2. The tree after F-54

| Lead (central team) | Reports to | Directs | Who |
|---|---|---|---|
| principal-pm-verticals (**categories**: the category lead) | founder | **14** | the 14 category owners (unchanged from F-53 L1) |
| evaluation-steward (**quality**) | founder | 7 | fact-checker, learner-evaluator, pedagogy-critic, qa-tester, accessibility-reviewer (both on the `tester` agent), personalization-eval, route-reviewer (unchanged) |
| principal-engineer (**engineering**) | founder | 6 | principal-engineer-ops, platform-engineer, privacy-reviewer, tools-lead, hq-engineer, rnd-lead |
| head-of-product (**product and portfolio**) | founder | 6 | portfolio-manager, analytics-steward, pattern-librarian, research-scientist, head-of-strategic-initiatives, vp-marketing |
| personalization-engineer (**learner experience**, lead and engineer) | founder | 2 | backend-engineer, growth-designer |
| design-lead (**content types**: lane M, formats, the builders) | founder | 2 | interaction-designer, demo-builder |
| release-manager (**release**) | founder | 0 | the only deploy path |
| chief-of-staff (operator; the quality desk) | founder | 0 | |
| chief-of-staff-ceo-office (auditor) | founder | 0 | |

- **Depth below the founder is 2** everywhere.
- **Managers (excluding the founder): 6.**
- **Managers with one direct: 0.**
- **Managers of managers below the founder: 0.**
- **The founder's span is 9:** the six central teams (categories, quality, engineering, product and portfolio, learner experience, content types), release, the operator and the auditor. Every one of them is a team lead or a desk.
- **Spans:** 14, 7, 6, 6, 2, 2, then three desks with 0.
- **After the dated parks:** on 2026-11-23 head-of-strategic-initiatives parks into portfolio-manager and vp-marketing into head-of-product, and rnd-lead parks into principal-engineer if F-49 is declined. Then head-of-product has 4 and principal-engineer 5 or 6. No park leaves a manager with one direct.

The tree was counted by a script over `roles.mjs` `roles` with the moves applied in memory; roles.mjs is unchanged.

### Spans outside "about 3 to 10", with their reasons

- **Category lead, 14.** F-53 decided this (L1), and section 5 gives the reasons. F-54 lowers the span from 15 to 14 by moving demo-builder out.
- **Content types, 2, and learner experience, 2.** Neither is a layer of one. Each lead is a working member:
  - design-lead manages lane M and runs the first-3 design reviews.
  - personalization-engineer owns the feed code.
  - Each lead has two different roles under it. demo-builder is a pool of up to 3 sessions.

  I did not pad these teams. Moving a role in only to reach 3 would be adding lines to fix a number, which my failure-mode list warns against.

## 3. The single-report fixes and the central teams: each move and its reason

| # | Role | From | To | Reason |
|---|---|---|---|---|
| 1 | hq-engineer | tools-lead | principal-engineer | Removes a layer of one. The HQ pages are code like the rest of `src/app`. F-52 G3 already split ownership by path (src/app/hq/** is hq-engineer's; the tools and adapters are tools-lead's). They are peers on adjacent paths, not lead and report. |
| 2 | tools-lead | chief-of-staff | principal-engineer | The company tools are engineering: dispatch-check, slots, ledger, events and the HQ adapters. F-53 row 2's B2 and B4 are its items. Today the tools that meter and gate the operator's dispatches are built by the operator's own report. Under engineering, principal-engineer's tiers review them. The owner of B2 and B4 does not change. |
| 3 | platform-engineer | head-of-product | principal-engineer | The kit, the host and the probe tools are code (F-53 section 3). This move also keeps head-of-product at or under 8 directs, so F-50's CPO un-park rule ("above 8") does not fire. |
| 4 | release-manager | head-of-product | founder | Release is one of the decided central teams (F-53 section 3). The founder already approves every deploy (CLAUDE.md), so the line goes where the approval goes. A release lead with no reports is a desk, not a layer. |
| 5 | demo-builder | principal-pm-verticals | design-lead | The builder is the makers' home for both content types (lane S single cards and lane M sequences). design-lead owns the format standards the builder builds to (`formats.md`, `system.md`). The category lead owns what to teach, not how a format is built. Lane S still asks demo-builder for builds through mailbox requests, and those read lanes, not lines: neither tools/lib/mailbox.mjs nor tools/dispatch-check.mjs reads `reportsTo`. The category lead's span drops from 15 to 14. |
| 6 | design-lead | head-of-product | founder | Content types is a central team, and after move 5 design-lead leads one. Under head-of-product, the builders and interaction-designer would be 3 levels deep. head-of-product keeps priority across lanes (its L1 scope line). |
| 7 | portfolio-manager | chief-of-staff-ceo-office | head-of-product | Removes my own layer of one. Intake, triage, priority and lane budgets are product and portfolio work, not org health (F-53 section 3 note). The move also ends an independence problem: this office audits the ledger, the stop rate and the lane budgets in the WBR health section, so it should not manage the role that sets them. head-of-product already sets cross-lane priority "with the portfolio-manager" (its scope). The title drops "CEO Office", and the team label becomes `product`. |
| 8 | pattern-librarian | chief-of-staff | head-of-product | Patterns are claims about evidence that can turn out wrong, the same kind of record work as analytics-steward's (F-53's "insight" grouping). Today the role that writes what the reviews teach reports to the role that runs the loop those reviews judge. With moves 2 and 8 the operator has no reports, which matches operating-loop section 0: the operator dispatches and does not produce. |
| 9 | head-of-strategic-initiatives | founder | head-of-product | It is neither a central team nor the category lead. It parks into portfolio-manager on 2026-11-23, so its line goes now where its work goes then, and the park becomes a no-op on the tree. It keeps its charter and jour fixe, and still reports First Light to the founder at the Friday review. |
| 10 | vp-marketing | founder | head-of-product | The same reason: it parks into head-of-product on 2026-11-23, unless the go decision needs it. |
| - | interaction-designer | design-lead | design-lead (no move) | It stays. demo-builder joins it, so its lead is no longer a layer of one. |

Moves 11-13 are the learner-experience team (section 4).

Not moved, on purpose:
- the 14 category owners (F-53 L1);
- the quality team and the `tester` agent (F-53 row 3);
- privacy-reviewer, which stays in engineering, so that after section 4 it shares a lead with no maker of learner data;
- principal-engineer-ops and rnd-lead, which are already in engineering.

## 4. The learner experience: who is responsible (founder ask 2)

### 4a. Today: five roles, two managers, one gap

| Function | Owner today (path or scope line) | Manager today |
|---|---|---|
| Feed surface, ordering, pagination, revisits | personalization-engineer (`src/components/Feed.tsx`, `src/lib/feed-index.ts`, `src/lib/feed-types.ts`, `src/app/api/feed/**`, `src/app/page.tsx`) | head-of-product |
| Personalization from serving (composer, learner model, serving glue behind the off switch) | personalization-engineer (`src/lib/learner/**`; "phase B: serving glue") | head-of-product |
| First-run onboarding (the IntroCard, its cold-start sentence) | personalization-engineer (IntroCard in Feed.tsx; the sentence is pinned by `tests/qa/feed.spec.ts`, protected) | head-of-product |
| Onboarding copy for First Light (age screen, house ads) | growth-designer (until First Light release 1) | head-of-product |
| Auth, sessions, account deletion and export | backend-engineer (`src/lib/server/auth.ts`, `src/app/api/account/{auth,start,me,delete,export,merge}/**`) | principal-engineer |
| Accounts database and migrations (`db/migrations/001`-`004`) | backend-engineer ("the migration sequence and runner for the shared accounts database") | principal-engineer |
| Likes and saves, server side (`src/app/api/account/likes/**`, `saves/**`, `src/app/api/likes/counts`) | backend-engineer, by its `src/app/api/**` path | principal-engineer |
| **Likes and saves, stored data** (`lesson_like`, `lesson_save`, migration 002; data inventory 3.9) | **no owner on record.** Inventory 3.9 names none. The settings table (3.6a, line 119) still names **learner-data-engineer**, parked by F-52 G2 into backend-engineer. | none |
| Likes, saves and account screens, client side (`src/components/SocialActions.tsx`, `LibraryView.tsx`, `src/components/account/**`, `src/app/{login,account,preferences,profile,library}/**`) | platform-engineer, only through its catch-all line ("the rest of src/app, src/components and src/lib that no other role owns"). No role names them. | head-of-product |
| Progress tracking, client (`src/kit/progress.ts`: the store and event API every lesson calls) | platform-engineer (`src/kit/**`). backend-engineer's scope says it moves progress.ts to sync with the server, so two roles name one file. | head-of-product |
| Progress tracking, server (`src/lib/server/progress-store.ts`, `src/app/api/account/progress/**`, `src/app/api/events/**`) | backend-engineer | principal-engineer |
| Event semantics (what an event means) | analytics-steward ("semantics, not code") | head-of-product |
| Gamification and social (mastery, challenges, badges, sharing) | growth-designer (design and PRDs); personalization-engineer (the gamification and profile UI) | head-of-product |
| Checks: privacy, consent, the data inventory | privacy-reviewer | principal-engineer |
| Checks: personalization experiments and readouts | personalization-eval | evaluation-steward |

So today no single role can answer for "a learner likes a lesson, it is stored, and the feed respects it". The answer runs through three makers, two managers and a table with no owner.

### 4b. After: one team, one lead, one owner per path

**The learner-experience team.**
- **Lead:** personalization-engineer, re-titled "Learner Experience Lead (Personalization Engineer)", reporting to the founder.
- **Members:** backend-engineer and growth-designer.
- **What the team answers for, end to end:** what the learner sees and keeps outside a lesson. That is the feed and its serving, first-run onboarding, likes, saves and progress, gamification, and the account that holds them.
- **Why this lead:** personalization-engineer already owns the surface where all of these meet (the feed and the IntroCard). The lead is a working member, not a manager role.
- **Why no new lead role:** un-parking vp-personalization would add a manager, not a maker. F-52 parked that role for having no step in a flow.

| # | Move | From | To | Reason |
|---|---|---|---|---|
| 11 | personalization-engineer | head-of-product | founder, as learner-experience lead | The learner experience becomes a central team, so its lead reports to the founder (depth 2). |
| 12 | backend-engineer | principal-engineer | personalization-engineer | Auth, accounts, the database and every learner write route are the learner's account. With backend-engineer in the team, one lead answers for a like from tap to table. backend-engineer keeps its migration-order review and its export and delete review, now inside the team. principal-engineer's readiness tiers still approve tier-2 changes (anything touching auth or learner data), from outside the team. |
| 13 | growth-designer | head-of-product | personalization-engineer | Gamification and social are learner-experience features, and the gamification UI is already personalization-engineer's code. Its experiments stay registered and read out by personalization-eval (the steward's team). |

**Path owners after F-54** (one owner each; these become `company/company.json` `owns` lines when applied):

| Function | Owner after | Paths | Change |
|---|---|---|---|
| Feed, ordering, revisits | personalization-engineer | `src/components/Feed.tsx`, `src/lib/feed-index.ts`, `src/lib/feed-types.ts`, `src/app/api/feed/**`, `src/app/page.tsx` | owner unchanged; team changes |
| Personalization from serving | personalization-engineer | `src/lib/learner/**`, the serving glue (behind the off switch) | unchanged |
| First-run onboarding | personalization-engineer | IntroCard in Feed.tsx; the first-run and sign-in screens `src/app/login/**` | **login moves from platform-engineer's catch-all** |
| Onboarding and social copy | growth-designer | the copy items in its scope (age screen, house ads, sharing) | unchanged; it writes copy and PRDs, not code |
| Auth, sessions, deletion, export | backend-engineer | `src/lib/server/**`, `src/app/api/account/**` (auth, start, me, delete, export, merge, progress, settings, feed) | unchanged |
| Accounts database | backend-engineer | `db/migrations/**` | named in `owns` for the first time |
| **Likes and saves, stored and served** | backend-engineer | `lesson_like`, `lesson_save` (migration 002), `src/app/api/account/likes/**`, `src/app/api/account/saves/**`, `src/app/api/likes/**` | **the gap closes:** privacy-reviewer writes the owner into inventory 3.9, and replaces learner-data-engineer with backend-engineer in 3.6a (line 119) (F-52 already moved that work) |
| Likes, saves, library and account screens | personalization-engineer | `src/components/SocialActions.tsx`, `src/components/LibraryView.tsx`, `src/components/account/**`, `src/app/{account,preferences,profile,library}/**` | **move from platform-engineer's catch-all** to a named owner |
| Progress tracking, end to end | backend-engineer | `src/kit/progress.ts`, `src/lib/server/progress-store.ts`, `src/app/api/events/**` | **progress.ts moves from platform-engineer**, which ends two roles naming one file. platform-engineer's review stays a gate wherever progress.ts touches the lesson contract (as it already reviews feed changes that touch the kit). `src/kit/Lesson.tsx` stays protected and platform-engineer's. |
| Gamification and social | growth-designer (design, PRDs); personalization-engineer (UI code) | as today | unchanged |
| Event semantics | **analytics-steward (stays in product and portfolio)** | event definitions (semantics) | unchanged, on purpose: the team that ships the feed should not define the events it is judged by |
| Privacy, consent, the inventory | **privacy-reviewer (stays in engineering, outside the team)** | `company/engineering/data-inventory.md` | unchanged. Its reviewers' line no longer holds any maker of learner data, which was the point of F53-9's option P. F-54 does not decide option P. |
| Personalization experiments and readouts | **personalization-eval (stays with the steward)** | registrations, pass criteria, readouts | unchanged |
| Lesson host, kit, app shell, performance | platform-engineer (engineering) | `src/kit/**` except progress.ts, `src/components/DemoCard.tsx`, `DemoHost.tsx`, `src/app/d/**`, the shell | the catch-all narrows by the paths above |

**The answer to "who would be the responsible?":** personalization-engineer, as the learner-experience lead, for all of it. backend-engineer owns auth, accounts, likes, saves and progress, and growth-designer owns the game and social design. They are checked from outside the team by privacy-reviewer (engineering) and personalization-eval (quality).

**Lead options for the founder (F54-3):**
- **X1, recommended:** personalization-engineer leads.
- **X2:** backend-engineer leads. It owns the riskier half (auth and learner data), but is further from the surface.
- **X3:** the team sits under head-of-product. That puts head-of-product back as a manager of managers (depth 3), so I do not recommend it.

## 5. The flat category teams (founder ask 3)

**Flat is intended.** Today the category lead has 14 category owners. Each owner is a single logical role running on the one shared `category-owner` agent, and none has a team of its own. That is the design for three reasons:

- **The category is the unit of scale** (PRINCIPLES.md; F-53 row 1). To grow, the company adds a category, meaning one owner and its data (charter, rulings, map, briefs, memory). Nothing else grows. A team per category would make growth cost headcount, which is "breadth bought with headcount" (PRINCIPLES.md, the losing designs; B13).
- **An owner's team is the makers it dispatches, per item, not standing reports.** Once F-53 row 2 is cleared (B1-B4), an owner runs as a top-level session. For each item it dispatches one warm demo-builder, plus interaction-designer and research-scientist when needed. Those makers are a shared central pool in content types and product, so 14 categories never hold 14 idle builders. Until row 2 is cleared, the operator dispatches for them. Subcategories (strands) are logical units inside the owner's data, not people (F-53 decision).
- **The checkers stay central for independence.** An owner never dispatches or requests a checker of its own items (its `mayNot`; F-53 P3). The checks come from the quality team on the steward's standing orders, through the operator's desk. A category team holding its own checkers would be a team checking its own work.

**Area leads (STEM, humanities, life skills): the trade-off.** Under one lead, the 14 owners would split roughly STEM 7 (math, cs, probability, physics, ai, chemistry, life), humanities 4 (history, geography, books, big-ideas) and life skills 3 (economics, behavioral, lifehacks).

| | Flat (today, recommended) | 3 area leads |
|---|---|---|
| Depth | 2 | 3 if they sit under the category lead (a manager of managers, against PRINCIPLES.md "never through managers of managers"); 2 if they replace it, but then the founder's span grows from 9 to 11 |
| Spans | 14 under one lead | 7, 4 and 3 |
| What it buys | one cross-category portfolio, and one clearing meter by count | judgment shared within an area (notation across STEM, sensitive routes across humanities); a lead who could read its owners' briefs |
| What it costs | the category lead's attention is thin per category | 3 new manager roles (or 3 re-scopes) with no step in a flow; a lead run per batch per area; the "brief-approval round" F-53 objection 9 warned against; 14 → 17 logical roles |
| Why the span is not a problem today | the 14 run on one agent definition, at most 2 sessions at once, do not meet, and the lead approves no brief one by one. Its load is the meter, not 14 one-on-ones | |

**Triggers for area leads, written so the next audit can check them:**
- the category lead runs more than once per category batch (F-53's revisit rule for objection 9);
- more than 20 categories;
- route findings that cluster in one area above 1 in 5 over 10 briefs, a sign that an area needs shared judgment rather than a manager.

On any one of these, propose area leads as **replacing** the category lead, not stacked under it, so the depth stays 2.

## 6. What applying it touches (after a founder yes; none of it before)

- **`tools/org/roles.mjs`:** one dated block, "no layer of one and the learner-experience team (F-54)".
  - Set `reportsTo` for the 13 roles in sections 3 and 4.
  - Remove the F-50 edit that sets demo-builder's `reportsTo` to principal-pm-verticals.
  - Titles: portfolio-manager drops "CEO Office" and its team becomes `product`. personalization-engineer becomes "Learner Experience Lead (Personalization Engineer)", and it, backend-engineer and growth-designer take team `learner`.
  - Scope lines that name a path or a line:
    - personalization-engineer gains the learner-experience lead line and the client paths in 4b.
    - backend-engineer gains `db/migrations/**`, `progress.ts` and the likes and saves tables.
    - platform-engineer loses those paths from its catch-all, and gains a gate review of `progress.ts` changes that touch the lesson contract.
    - design-lead gains "line for interaction-designer and demo-builder (both lanes); lane S still asks demo-builder through mailbox requests".
  - No mission, gate, `mayNot` or handoff changes.
  - Then run `node tools/org/generate.mjs`.
- **`company/company.json` `owns`:** the lines in 4b.
- **`company/engineering/data-inventory.md`:** the owners in 3.6a and 3.9, written by privacy-reviewer, the inventory's owner, not by me.
- **Tests:** `tools/hq/org.test.mjs` checks only that every `reportsTo` exists and cm-history's line, and both still hold. Run test:hq, test:mailbox and test:dispatch.
- **Not touched:** gates, `tools/company.mjs`, `tests/qa/**` (including the IntroCard sentence in feed.spec), `src/kit/Lesson.tsx`, `company/product/surface-value.md` (it names no role that moves), the board's owners and memories.
- **Cost estimate** (the meter is off): about 150-200k tokens in one commit. Undo is a revert of that commit plus a regenerate.

## 7. Check against F-53 (it must not undo F-53)

| F-53 decision | F-54 | Holds? |
|---|---|---|
| Row 1: the 14 category owners on one `category-owner` agent, reporting to the category lead | The owners are untouched. Only demo-builder leaves the category lead's line. Section 5 confirms flat. | yes |
| L1: principal-pm-verticals re-scoped as category lead, reporting to the founder | Unchanged. Lane S stays in its scope. | yes |
| Row 2 (gated): owners dispatch makers, never a checker | The makers sit in content types and product. Dispatch reads the allow-list (B2), not lines, so nothing in the gate changes. No owner's dispatch reaches into its own lead's team. | yes |
| Row 3: qa-tester and accessibility-reviewer on the `tester` agent, two records | Untouched; both stay the steward's. | yes |
| Q1: the operator runs the quality desk from the steward's standing orders | The operator keeps the desk and loses its two reports. | yes |
| Row 4: one shared build per commit (platform-engineer, W-2076) | The item and its owner are unchanged. | yes |
| F53-6 and F53-9 not decided | F-54 decides only the line moves F53-9 listed (portfolio-manager, demo-builder, the HQ line), plus the moves the layer rule and the learner team need. F53-9's **physical groupings** (design, eng-review, hq-tools, learner-data, planning, insight) and **option P** stay open in F53-9. If the founder later takes F53-9's "learner-data" grouping (backend-engineer and personalization-engineer on one agent), F-54's team is its natural home. | yes; chief-of-staff narrows F53-9 in the inbox when filing F-54 |

## 8. Predictions (committed 2026-10-25, before any step runs)

| # | Prediction | Measured by | Wrong if |
|---|---|---|---|
| P1 | After the apply, the org the HQ reads shows 0 managers with exactly one direct and a depth of 2 below the founder | `tools/hq/org-from-roles.mjs` output (the org the city HQ shows), counted as in this record's method note | any manager with one direct, or any path 3 deep |
| P2 | No handoff breaks: in the 2 cycles after the apply, no dispatch-check or mailbox refusal and no new test failure is caused by a line or owner change | dispatch-check log, mailbox records, and test:hq, test:mailbox and test:dispatch against a clean worktree at the commit before | one such refusal or a new test failure |
| P3 | No lane S item waits on design-lead because demo-builder's line moved | `tools/hq/lifecycle.mjs` `waitingOn` for lane S items over the 2 cycles after | one lane S item whose `waitingOn` names design-lead |
| P4 | head-of-product stays at or under 8 directs through 2026-11-23, so F-50's CPO un-park rule does not fire | roles.mjs `roles` | it reaches 9 |
| P5 | Every learner-experience path in 4b has exactly one owner in `company.json` `owns`, and no data-inventory row names a parked role | `owns`; grep of the inventory for the parked ids in roles.mjs `parked` | any path with 0 or 2 owners, or a parked owner left in the inventory after privacy-reviewer's pass |
| P6 | The next likes, saves or progress change is taken from brief to "ready for check" inside the learner team, with no hand-off to a role outside it except the checks (privacy-reviewer, personalization-eval) and principal-engineer's tier-2 approval | that change's board item and records | it needs a maker outside the team |
| P7 | No park or un-park in the 4 weeks after leaves a manager with one direct unless the same change fixes it | each org-change commit, counted as in P1 | one such change |
| P8 | Applying it costs at most 200k tokens in one commit and touches no protected path | the apply run's handoff; the protected check | above 400k, or a protected path needed |

## 9. Objections (invited)

None of these roles could be consulted in this session. I **represent** each one from its records, and each stays open until the role answers in writing.

| # | From | Objection (represented) | Answer or status |
|---|---|---|---|
| 1 | tools-lead (source: its scope; B2/B4 W-2074/W-2034) | "Losing hq-engineer as my report means HQ adapter and page changes no longer go through one lead." | **Answered in part.** F-52 G3 already gave src/app/hq/** to hq-engineer. A change across both paths is a mailbox request between peers, and principal-engineer's tiers review both. **Open.** |
| 2 | hq-engineer (source: F-52 G3) | "Who reviews my HQ page diffs?" | **Open, for principal-engineer.** F-53's condition (platform-engineer reviews others' HQ page changes) belongs to the hq-tools physical grouping, which is not proposed here. Until F53-9 is decided, review follows principal-engineer's tiers. |
| 3 | privacy-reviewer (source: its scope; F-53 option P) | "If the learner team grows its own reviewers, I become a formality." | **Answered.** privacy-reviewer stays outside the team, in engineering, and no maker of learner data shares its lead after F-54. Tier-2 changes still need its review and principal-engineer's approval. Option P stays the founder's under F53-9. **Open.** |
| 4 | backend-engineer (source: its scope; migration-order and export/delete review) | "I review every migration and the export and delete code, including other teams'. Reporting to the feed's owner puts my review under the maker I review." | **Standing in part.** These are peer engineering reviews, not the independent checks. The independent checks of learner data are privacy-reviewer's and principal-engineer's tier-2 approval, both outside the team. If the founder sees that review as a check, X2 makes backend-engineer the lead. |
| 5 | platform-engineer (source: its scope; `src/kit/**`, performance budget) | "`progress.ts` is the event API every lesson calls. Changing it outside the kit owner breaks builders." | **Answered in part.** platform-engineer's review stays a gate wherever progress.ts touches the lesson contract, as it already gates feed changes that touch the kit. The file gets one owner where today two scopes name it. **Open.** |
| 6 | personalization-engineer (source: its scope) | "I am an engineer with a full queue, not a manager." | **Answered in part.** The lead line adds no approvals. It is one answer to the founder's question and the say over the team's paths. **Open.** |
| 7 | design-lead (source: F-53 objection 4) | "Content-types lead, lane M manager, first-3 design reviewer, and now the builders' line: too much in one seat." | **Answered in part.** The line adds no meetings or approvals. Lane S's queue, priority and briefs stay with the category lead and head-of-product. **Standing:** the load. Revisit if design-lead runs more than once per lane S batch. |
| 8 | interaction-designer (source: F-52 lane M interaction review) | "My lane M review is a check, and the maker I check now shares my lead." | **Answered.** That was already true in lane M, and the gate checks stay with the quality team (P6). Whether the interaction review must come from outside the maker's team is evaluation-steward's call. **Open.** |
| 9 | principal-pm-verticals, the category lead (source: lane S scope) | "Lane S is mine. With demo-builder under design-lead, a lane S build competes with lane M inside one lead's team. And flat leaves me 14 owners." | **Answered in part.** Priority across lanes is head-of-product's, with portfolio-manager, not the line manager's. P3 measures the build competition. On span, see section 5 and its triggers. **Open.** |
| 10 | head-of-product (source: F-50 objection 5) | "I lose design, release, the feed and two engineers. Am I still the product lead?" | **Answered.** head-of-product keeps priority across content types and lanes and signs the batch launch records. It has 6 directs, 4 after 11-23, under the CPO rule. **Open.** |
| 11 | portfolio-manager (source: its title, "CEO Office") | "The budget holder under the product lead whose lanes spend the budget." | **Answered in part.** The lanes' managers are the category lead and design-lead, not head-of-product, and this office keeps auditing the budgets without managing their holder. **Open.** |
| 12 | chief-of-staff (the operator) | "I lose tools-lead and pattern-librarian. Who do I ask for tool fixes?" | **Answered.** The same roles, by mailbox or board, as for every other team. |
| 13 | chief-of-staff-ceo-office (Leonie, against my own draft) | "A reorg every week": F-50, F-52, F-53 and now F-54, all on one day. | **Standing, by my own failure-mode list.** F-54 moves lines and names owners for unowned or doubly-owned paths. No role, lane, budget, gate or board-item owner changes, and the founder asked all three questions. |

## 10. Owners and steps (after a founder yes; none run before it)

| # | Step | Owner |
|---|---|---|
| 1 | File F-54 in the founder inbox with choices F54-1..F54-4, and narrow F53-9 to the physical groupings and option P | chief-of-staff (board item) |
| 2 | Written consults with the roles in section 9; answers go to company/ceo-office/consultations/2026-10-25-f54/ | chief-of-staff dispatches |
| 3 | Decision record with the founder's words, the objections and what happened to each | chief-of-staff-ceo-office |
| 4 | The roles.mjs F-54 block, `owns`, generate, tests (section 6); the P1 count | chief-of-staff-ceo-office |
| 5 | Data inventory owners in 3.6a and 3.9 | privacy-reviewer |
| 6 | The org-change event (org-change-process step 5) | chief-of-staff |

**Founder choices:**

| # | Choice | Recommendation |
|---|---|---|
| F54-1 | Moves 1-8: the layer rule and the decided central teams | yes |
| F54-2 | Moves 9-10 now, or leave the two dated roles on the founder's line until they park on 2026-11-23 | now |
| F54-3 | The learner-experience team (moves 11-13 and the path owners in 4b), with lead X1, X2 or X3 | yes, X1 |
| F54-4 | Categories stay flat, with area leads only on a section 5 trigger, and then replacing the category lead rather than stacked under it | yes |

Undo: revert the F-54 commit and run `node tools/org/generate.mjs`. No board item, memory or gate moves with it.

<!-- Method and sources, 2026-10-25: the before and after counts come from a script over tools/org/roles.mjs `roles` (reportsTo per role, 47 incl. the founder) with the 13 moves applied in memory; scratch only, roles.mjs unchanged. reportsTo readers (grep): tools/org/generate.mjs, tools/hq/org-from-roles.mjs, tools/hq/org.test.mjs, src/lib/hq.ts, src/app/hq/PeoplePanel.tsx; no dispatch or mailbox code reads it. Ownership: company/company.json `owns`; the inScope lines of personalization-engineer, backend-engineer, platform-engineer, analytics-steward, growth-designer, privacy-reviewer, personalization-eval, and parked learner-data-engineer; data-inventory.md 3.6a (line 119) and 3.9; ls of src/app/api/account, db/migrations, src/components/account; Feed.tsx IntroCard (line 340). Protected paths: company/constitution/protected-paths.txt (progress.ts is not on it). -->
