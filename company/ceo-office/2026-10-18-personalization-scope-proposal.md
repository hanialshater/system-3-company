# Proposal: Personalization takes the feed, the learner profile, gamification and progressive learning (scope moves, one card each)

owner: chief-of-staff-ceo-office (Leonie) · date: 2026-10-18 · status: **proposed, for the founder's decision, one card at a time.** Nothing here exists until the founder approves the card. No edit to tools/org/roles.mjs, tools/org/people.mjs, .claude/agents/, company/roles/, the POC map, the handoff map, HQ or the board has been made.
board: W-1668 · record: company/decisions/2026-10-18-founder-personalization-vs-evaluation-scope.md (this file is the "how" that record leaves to Leonie)
process: company/ceo-office/org-change-process.md (pipeline steps 1-3; step 4 is the founder's; step 5 only after it)
earlier design this extends: company/ceo-office/2026-10-16-personalization-org-proposal.md (cards V, N1-N6, E1-E3, approved and generated 2026-10-16; L1 deferred)

## The founder's words this design answers (verbatim, from the record)

> "Evaluation and personalization are different, personalization own feed and customer profile and gamification and progressive learning features"  (founder, conversation, 2026-10-18)

Earlier founder words that still bind (company/decisions/2026-10-16-founder-personalization-org.md):
- "Mateo is VP he should be independent instead of taping onto others in the compay, leoni to help with he org experience but not levergae other teams for his internal scope"
- "Approve V, N1–N6, E1–E3; 7 directs fine for now; progress/recall stay with backend."

The founder has decided the **whether**: two orgs; Personalization owns the feed (ordering and surface), the customer (learner) profile, gamification (badges, points, challenges, mastery and today's-revisits state) and progressive learning (what the learner has learned, learning paths, the next lesson to learn more in a category). This proposal answers the **how**: which existing scopes move, to which role, what stays a company-wide gate, and what the founder still has to choose. It does not reopen the founder's decision.

**What ownership does not change (the chief of staff's objection, answered in the record):** owning the feed is not a licence to change its order. AMD-013 and the G record (company/decisions/2026-10-17-vp-personalization-readout-3b-g.md: reachable-v2 NO-GO, the website part of M1 closed, the flag stays off) still govern what is live. Every card below changes who decides future work, not what learners see today.

Inputs read: the four records named in W-1668; role docs for platform-engineer, growth-designer, backend-engineer, learner-model-engineer, learner-data-engineer, personalization-engineer, personalization-eval, vp-personalization, chief-product-officer, head-of-product, analytics-steward (company/roles/); AMD-008 (proposed, not ratified), AMD-012, AMD-013 (ratified) and company/product/surface-value.md v1 as amended; company/personalization/policies/default-order-rule.md; company/engineering/data-inventory.md (D1, D12, D13); EDD-008 §6, EDD-009 header; PRD-001, PRD-003, PRD-004 headers; src/components/Feed.tsx, src/lib/feed-index.ts, src/app/page.tsx, src/app/hq/HqTop.tsx, src/app/hq/personalization/evaluation/; POC map lanes 4, 5, 14; handoff map row "Personalization"; the board; agent metrics (`npm run metrics -- --md`, 2026-10-18).

## 0. Is it a process problem? (pipeline step 1)

Mostly yes, and that shapes the answer: **no new role is proposed.** Every move below is a scope line moving between roles that already exist, plus one reporting-line move (growth-designer). The reasons:
- The four areas already have builders: the feed surface has platform-engineer's code (24 dispatches), gamification has growth-designer (3 dispatches) and learner-model-engineer's mastery state (EDD-009), progressive learning has the VP's learning paths and learner-model-engineer's engine, the learner profile has learner-data-engineer (`settings`, 0 dispatches so far) and backend-engineer (`progress`, `recall`). What the founder changed is **who owns them**, not how much capacity exists.
- The one place a new role was waiting, head-of-feed (card L1, 2026-10-16), is re-examined in card S9. Its own trigger has not fired; the span trigger has. The recommendation is to keep it deferred and accept one more direct for now (objection 2), because a manager over two roles with 3 and 4 runs is staffing ahead of work.
- Self-containment (the founder's second message) means the moved work is staffed inside the org. It does not mean the org stops passing company-wide gates (§1).

## 1. The shape after the moves

```
founder
├── chief-product-officer (Margot)      Evaluation org + product org (lessons): NOT the feed, profile, gamification, progressive learning (card S10)
│   └── head-of-product (Priya)         keeps the default order as the baseline (option 1, card S1/S11), PRDs for lessons and catalogue
│       └── platform-engineer (Noor)    keeps the kit, lesson pages, the app shell, the performance budget; reviews the feed (card S2)
└── vp-personalization (Mateo)          owns the feed, the learner profile, gamification, progressive learning (card S1)
    ├── Science      applied-scientist-personalization, learning-scientist-personalization   (unchanged)
    ├── Learner Model learner-model-engineer (+ progressive-learning engine, card S5), lesson-dims-owner (unchanged)
    ├── Feed         personalization-engineer (+ feed surface code owner, card S3); head-of-feed deferred (card S9)
    ├── Gamification growth-designer (moves in, card S4)
    ├── Eval         personalization-eval (+ gamification experiments, card S8)
    └── Customer Data learner-data-engineer (+ the profile's stored part; reading A or B, cards S6/S7)
```

VP direct reports: 7 today (N1-N6, learner-model-engineer) → **8** with growth-designer (objection 2).

### Company-wide gates that stay (the interfaces; not borrowing)

| Gate | Owner (unchanged) | The org's side after the moves |
|---|---|---|
| Privacy review of learner data, every schema diff, every query on real data, every learner-visible profile view | privacy-reviewer (lane 10); she owns company/engineering/data-inventory.md | Unchanged. New: under either reading of "customer profile" (cards S6/S7), D1 (`s3c:progress:v1`, "no owner on record") gets an owner, and privacy-reviewer writes it into the inventory. Nothing derived is stored (D20; privacy N1-N3, §4) |
| Founder approval of every deploy; AMD-013 Part B withdrawal | founder, through release-manager | Unchanged. The feed's new owner never deploys and never writes `[deploy]`. The flag stays off (G record). The pre-approved flag-off withdrawal stays release-manager's alone |
| Protected paths and the constitution: surface-value.md (the feed rules, the trade-off owners), tests/qa/** (feed.spec.ts, the AMD-FL-B specs), src/kit/Lesson.tsx, tools/company.mjs | evaluation-steward, by amendment; the founder ratifies | Unchanged. The org proposes amendments and never edits a protected path. Owning Feed.tsx does not give the org the feed's QA spec: evaluation-steward keeps it, so the feed is judged by a test its owner cannot edit |
| The platform owner's review of shared kit and app code | platform-engineer (src/kit/**, src/app/layout.tsx, globals.css, src/app/d/**, the catalogue shell, DemoCard/DemoHost); principal-engineer tier 2; hq-engineer for src/app/hq/** | The feed files become the org's (card S2); a change that touches the kit, the lesson host or the app shell is still reviewed by platform-engineer before merge. A kit API change is a kit change request, as today |
| The performance budget (first lesson interactive < 2 s on a mid phone) | platform-engineer measures and holds it | The feed is the path to the first lesson. The org's feed changes must meet the budget; platform-engineer's measurement is the check, not the org's own |
| The claims rule | builders record; fact-checker verifies (lane 10) | Every learner-visible reason line, mastery message (AMD-008 M7), badge or challenge string is a claim; the org never marks its own copy verified |
| Engineering review tiers, operational readiness | principal-engineer; principal-engineer-ops (readiness records) | Owning a production surface means incidents in it: personalization-engineer takes readiness and incident duties for the feed (card S3, needs `OPS_ENGINEERS`; principal-engineer-ops consults) |
| Event semantics and company metric meaning, the WBR metrics section | analytics-steward | Unchanged. Gamification experiments move to the org's eval (card S8); what an event means stays the steward's |
| Budget | portfolio-manager | The moved work carries the `personalization` tag (W-1511), except First Light work already tagged `first-light`, which keeps its tag until First Light closes |

## 2. The cards (approve one by one)

Every card: the role's checker is never itself; the sunset check (no dispatch in 14 days after approval gets a WBR verdict) applies; the generate step runs only after the founder's "approve" line for that card is in the record.

### Card S1: vp-personalization (scope edit) · approve now

- **What moves in:**
  - *The feed:* product ownership of the feed surface (intro card copy, chip behaviour, the revisit card, feed PRDs from now on) and of the personalised ordering (the composer interface, move threshold, reason per moved card, served-order log contract). PRD-001 (feed MVP, head-of-product, approved 2026-10-12) stays as historical record; the next feed PRD is the VP's.
  - *The learner profile:* the definition of what the company keeps and computes about a learner for personalization: stated choices (`settings`), the computed state (mastery, "learned", needs; computed on demand, never stored, D20), and any future learner-visible "what we know about you" view (each after a privacy read).
  - *Gamification:* approving growth-designer's PRDs and feature specs (badges, points, challenges, mastery map, today's revisits), in place of head-of-product's approval for those PRDs. PRD-003 and PRD-004 keep their routes for First Light release 1 (head-of-product still rules on release-1 scope inside First Light; see S4).
  - *Progressive learning:* the definition of "learned" per category (phase C), learning paths (already in scope), and the "next lesson to learn more in this category" recommendation as a product rule.
- **What leaves the out-of-scope list:** "Badges and points (growth-designer)" is replaced by "Designing badges, points and challenges (growth-designer, who reports to the VP)": the VP decides, the designer designs.
- **The default order (founder's choice, Q1):**
  - *Option 1 (recommended):* the default order stays **head-of-product's** as the product baseline: what a fresh device sees, what every chip shows, what the flag-off build shows, and what any personalised order is compared against. The VP owns every order that departs from it. Reason: default-order-rule.md uses head-of-product's ownership as an independence anchor ("The default order is head-of-product's. This file transcribes it and decides nothing about it"), and AMD-008 P5 compares every rule against a default-order holdout. If the VP owned both the candidate and the baseline it is measured against, the org would control its own comparison. surface-value.md's trade-off table already names head-of-product as owner of the two cold-start trade-offs; option 1 needs no amendment.
  - *Option 2:* the VP owns the default order too (the literal reading of "own feed ordering"). Then (a) a change to the default order is a VP decision record with head-of-product's written consult and personalization-eval's statement of which frozen criteria it invalidates, and (b) the owner column of surface-value.md's two cold-start trade-offs changes from head-of-product to vp-personalization, which is an amendment (evaluation-steward drafts, founder ratifies; protected path).
- **Stays company-wide:** §1 table. Adds may-not: "change the live order except as AMD-013 and a G record allow"; "approve a gamification PRD it wrote".
- **Overlaps resolved:** with head-of-product (default order: option 1 or 2; gamification PRDs: the VP's from now on; release-1 scope inside First Light: hers until First Light closes); with chief-product-officer (S10).
- **Checker:** the founder (phase and product decisions); personalization-eval's readouts are the evidence.
- **Founder:** approve S1 with option 1 / approve S1 with option 2 / change: ____

### Card S2: platform-engineer (scope edit) · approve now

- **What moves out (to personalization-engineer, card S3):** the feed surface code: `src/components/Feed.tsx` (feed list, prefetch, IntroCard, RevisitCard, the revisit loop), `src/lib/feed-index.ts` (`feedOrder`, `interleave`, `feedPage`), `src/lib/feed-types.ts`, `src/app/api/feed/**`, and `src/app/page.tsx` (the home route that renders the feed). Open backlog items on those files move with them after approval: W-171 (reveal fit in the feed), W-672 (feedOrder prefix test), W-1576 (M1 review of the Feed.tsx change; now a review **by** platform-engineer of the org's change only if it touches the kit), W-1614 (EDD-010 build sign-off: P1 and P3 move, the throttled bench and built-output checks stay platform-engineer's as the performance and build gate). W-748 splits: the claim count in feed-index.ts moves, the trust sheet in DemoCard.tsx stays. W-076 (in review) and W-955 (domains.json passed whole) stay.
- **What stays:** `src/kit/**` (including `progress.ts`, the store and event API every lesson calls; `Lesson.tsx` is protected), `src/components/DemoCard.tsx` and `DemoHost.tsx` (the lesson host on the feed and on `/d/<slug>`; the host's invariant list, W-533), `src/app/d/**`, `src/app/catalog` (the page shell; the mastery layer on it is the org's, S4/S5), `src/app/layout.tsx`, `globals.css`, `src/lib/catalog.ts`, `tools/` (except gates), the performance budget, kit change requests.
- **What it gains:** a review duty: "review the personalization org's feed changes where they touch the kit, the lesson host, the app shell or the performance budget; the review is a gate, not the work".
- **Invariants that travel with the files (written into S3's card so they are not lost):** drafts never come back as revisits (Feed.tsx revisit loop, AMD-012); due revisits come first (surface-value "For the feed"); the intro's cold-start sentence (`tests/qa/feed.spec.ts`, protected); the slim index and pagination (EDD-001); no automatic retry loop against the CDN (review 2026-10-14 finding 1).
- **Overlaps resolved:** the 2026-10-16 T1 line ("platform-engineer keeps Feed.tsx, rendering, the kit and the performance budget") is superseded for Feed.tsx only; rendering of lessons, the kit and the budget stay.
- **Reporting line:** unchanged (head-of-product). Lane: unchanged (lane 4 for First Light; its own engineering lane).
- **Checker:** principal-engineer (tier 2), as today.
- **Founder:** approve S2 / change: ____

### Card S3: personalization-engineer (scope edit) · approve with S2

- **What moves in:** code owner of the feed surface (the files in S2) and of the org's gamification and profile UI (the mastery layer on `/catalog`, the challenge pages of PRD-004 once built, a future profile view); the serving glue it already has for phase B. Writes `company/ops/changelog.md` lines for feed changes, as platform-engineer did.
- **Out of scope (new lines):** the kit, the lesson host, the app shell, the performance budget (platform-engineer, review); the feed's QA spec (evaluation-steward, protected); the order itself (composer numbers: Science; policy: learner-model-engineer; decisions: the VP).
- **May not (new):** merge a change that touches the kit, the lesson host or the app shell without platform-engineer's review; switch the order flag or deploy; ship a tier-2 change without an approved readiness record; approve its own readiness record.
- **Operational duties:** joins `OPS_ENGINEERS` in tools/org/roles.mjs (readiness records, risk entries, incidents in the feed). This answers, for this one engineer, objection 11 of the evaluation-org port; principal-engineer-ops consults (it is their list).
- **Load:** today 4 dispatches, 2 reported. The feed brings 4-5 open items (S2) on top of the HQ lab. The trigger for a second engineer (the deferred feed-engineer) is restated in S9.
- **Checker:** platform-engineer (shared-surface review), hq-engineer (src/app/hq/**), qa-tester and the protected feed spec, principal-engineer (tier 2). Never personalization-eval for its own feed code.
- **Founder:** approve S3 / change: ____

### Card S4: growth-designer (reporting-line move + scope edit) · approve now

- **What moves:** reports to **vp-personalization** (was head-of-product), team `personalization`, sub-team Gamification. Scope lines unchanged in substance: today's revisits done as today's state (AMD-008 M2, card E2), mastery on the curriculum map, challenge-a-friend prediction links, badges and points after phase C on the org's definition of "learned". "Experiment designs with the analytics steward" becomes "experiment designs, registered and read out by personalization-eval (card S8); event semantics stay analytics-steward's". In-flight EXP-005 (W-1409, challenges holdout) stays with analytics-steward until it closes.
- **What does not move with it (residue, founder's choice Q3):** three duties are not gamification: social sharing and the prediction swap (PRD-003), the age-screen copy (First Light privacy gate P2.1), and house-ad copy (P5.5). *Recommended:* they travel with the role through First Light release 1 (the core team is set in company/initiatives/first-light/charter.md and changing it mid-initiative is Beatriz's consult), and the role's first WBR after release 1 decides whether social stays (it shares the challenge mechanics) or returns to head-of-product's line. *Alternative:* social and copy stay with head-of-product now, which needs a second role (none exists), so I do not recommend it.
- **Lanes:** stays in lane 4 for First Light work (its roles cell names growth-designer; Beatriz dispatches in dependency order), and joins lane 14 for everything else. Two lanes for one role is how backend-engineer already works (lanes 4 and 7).
- **Overlaps resolved:** with platform-engineer (PRD-004 named platform-engineer as builder; after S2/S3 the builder of challenge pages is personalization-engineer, platform-engineer reviews kit use); with learner-model-engineer (mastery state is computed by the engine, S5; growth-designer designs how it shows); with head-of-product (PRD approval moves to the VP, S1).
- **Checker:** pedagogy-critic, qa-tester, accessibility-reviewer and learner-evaluator for built features (unchanged, company-wide); privacy-reviewer for social; evaluation-steward's AMD-FL-B specs for M1-M8; personalization-eval for experiment readouts.
- **Founder:** approve S4 with residue travelling until release 1 / change: ____

### Card S5: learner-model-engineer (scope edit) · approve now

- **What moves in (progressive learning, engine side):** the per-category "learned" state as a computed definition (phase C; EDD-009's mastery table is the start), learning-path code (from the VP's paths over course and vertical maps), and the "next lesson to learn more in this category" recommender. All computed on demand from the permitted inputs (AMD-008 P2, M1), none stored as a column (D20). `src/lib/learner/**` loses "(once approved)": it exists (dims-index.generated.ts) and is the org's path, tier 2 for principal-engineer.
- **What does not move:** chip order and the default order (S1 option 1, surface-value "Every subject chip shows it"): a recommender may suggest a next lesson only on a surface the founder has ratified for it; reordering a chip is an amendment.
- **Overlaps resolved:** with category managers and courses-lead (concepts, prerequisite edges and course order are read-only inputs; a change is a request, as T6); with growth-designer (the engine computes the state; the designer decides how it is shown).
- **Checker:** personalization-eval (behaviour), principal-engineer (tier 2), pedagogy reviewers for any learner-facing state wording (as EDD-009 had).
- **Founder:** approve S5 / change: ____

### Cards S6 and S7: the customer profile, two readings of `progress` and `recall` (founder's choice, Q2)

`progress` (D12) and `recall` (D13) are every account's cross-device copy of the local store `s3c:progress:v1` (D1). The founder kept them with backend-engineer on 2026-10-16. "Customer profile" on 2026-10-18 can be read two ways. The founder picks one; each reading has its own pair of cards.

**Reading A (recommended): the profile is personalization's layer over the learning record; the record stays with backend.**
- *S6-A backend-engineer:* no scope change except one clarifying line: "`progress` and `recall` are the learning record every surface reads; the personalization org reads them read-only, and its profile (stated choices, computed state) is learner-data-engineer's". Mission unchanged ("Make a learner's progress survive devices and sessions").
- *S7-A learner-data-engineer:* in-scope line renamed "the stored part of the learner profile for personalization: `settings`, and later the served-order log, experiment counters, "learned" state and earned badges, each after its own privacy read". Nothing else.
- *D1 (`s3c:progress:v1`, "no owner on record"):* data owner backend-engineer (it is the same data as D12/D13 and EDD-008 makes it sync), code in the kit (platform-engineer). privacy-reviewer writes the owner into the inventory.
- *Why recommended:* (1) it keeps the founder's explicit 2026-10-16 ruling; (2) `recall` is the data of Surface Value #4, first spaced-revisit recall, the measure every personalization rule is kept or killed on (AMD-008 P5). If the org that is judged on recall also owns the table it is measured from, the judge's data sits with the judged; keeping it with backend keeps it independent; (3) EDD-008 (tier 2, accounts, First Light critical path) is mid-review and changing the owner of two of its tables now moves a release-1 risk.
- *Cost:* a change to a `progress` column that the profile needs (for example a "learned" input) is a request across orgs, which is the "leverage other teams" the founder disliked. It is one request per schema change, reviewed by backend-engineer.

**Reading B: the whole learner record is the profile, and moves.**
- *S6-B backend-engineer:* out-of-scope adds `progress`, `recall` and D1's data ownership; mission rewritten (it would no longer own "a learner's progress"); keeps auth, sessions, account deletion and export as code owner, the runner, migration order review, EDD-008 as document owner, W-706, the merge route `POST /api/account/merge` as code with the data shape owned by the org.
- *S7-B learner-data-engineer:* in-scope adds `progress` and `recall` (schema, migrations as next free numbers, merge semantics, export block, inventory rows D1, D12, D13), plus a may-not: "write a recall row from anything but a learner's answer; change how recall is computed or stored without analytics-steward's semantics note and personalization-eval's statement of which frozen criteria it affects". EDD-008 §6 owner rows change (backend-engineer's edit to her own EDD).
- *Cost:* the independence concern in reading A's (2) becomes a written rule instead of a structure; EDD-008's table owners change mid-review; backend-engineer's mission is rewritten. Consults: backend-engineer, privacy-reviewer, principal-engineer, head-of-strategic-initiatives (critical path).

- **Checker (both readings):** privacy-reviewer (data), principal-engineer (schema, tier 2), backend-engineer (order review and shared code); analytics-steward (meaning of `recall` for the metric).
- **Founder:** approve reading A (S6-A, S7-A) / approve reading B (S6-B, S7-B) / change: ____

### Card S8: personalization-eval (scope edit) and analytics-steward (catch-up line) · approve with S4

- **personalization-eval in-scope adds:** registrations (EXP format), pass criteria and readouts for **gamification** experiments (challenges, badges, mastery display) as well as personalization, frozen before data, under the org's independence rule (eval never builds what it grades: it does not design badges or challenges). In-flight EXP-005 stays with analytics-steward until it closes.
- **analytics-steward out-of-scope adds** (it was never written in after T2 on 2026-10-16): "registration, criteria and readouts of personalization and gamification experiments (personalization-eval); the EXP format and the experiments index stay the steward's, as do event semantics and the WBR metrics section".
- **Overlaps resolved:** T2 of 2026-10-16 is now in both role texts, not only in the proposal.
- **Checker:** unchanged (learning-scientist for simulator fidelity, learner-model-engineer for reproduction, evaluation-steward's independence audit).
- **Founder:** approve S8 / change: ____

### Card S9: head-of-feed (deferred card L1 of 2026-10-16): does it now trigger?

- **Its own trigger: no.** L1 waits for "the founder approves phase B start" (phase A exit criterion passed, accounts milestone, W-706, F-19). None of these has happened, and the website part of M1 closed NO-GO on 2026-10-17. The work L1 was written for (the personalised ordering contract and its rollout) has no live queue.
- **What the founder's move adds:** code ownership of the feed surface, which is engineering maintenance (bugs, tests, the revisit loop, pagination), not a head's job. Card S3 gives it to personalization-engineer.
- **The span trigger: yes.** §4 of the 2026-10-16 proposal: "the VP has more than 6 direct reports". It was 7 and accepted "for now"; S4 makes it 8 (objection 2).
- **Recommendation:** keep L1 deferred. Restate its trigger as the first of: (a) the founder approves phase B start (as before); (b) the Feed and Gamification sub-teams together have 3 or more agents (today 2: personalization-engineer, growth-designer); (c) the VP's span reaches 9. Restate the deferred **feed-engineer** trigger as: the feed surface or gamification build queue for personalization-engineer has an item older than 7 days, or PRD-004's challenge build starts while feed items are open.
- **Alternative (if the founder prefers span 7 to 8):** activate L1 now as "Head of Feed and Gamification", leading personalization-engineer and growth-designer; the VP's directs return to 7. Cost: a manager over 7 runs in total, before phase B. I do not recommend it.
- **Founder:** keep L1 deferred with the restated triggers / activate L1 now as head of feed and gamification / change: ____

### Card S10: chief-product-officer (scope edit; objection 8 of the evaluation-org port, as decided)

- **Objection 8 (company/decisions/2026-10-14-evaluation-org.md, port section) is closed by the founder's 2026-10-18 decision:** the CPO's "product outcomes across lessons" does not cover feed ordering. It also does not cover the learner profile, gamification or progressive learning. The CPO reads the leaderboard and lesson quality; the VP reads personalization's readouts.
- **The edit:** out-of-scope adds "the feed (its order and surface), the learner profile, gamification and progressive learning (vp-personalization; founder decision 2026-10-18)". In-scope "Directing the head of product (vision, roadmap, PRDs, slots)" is unchanged; head-of-product's PRDs for those four areas move to the VP (S1, S11).
- **Where the two meet:** a trade-off that crosses lessons and personalization (for example, whether a lesson's quality rank should be an input a recommender may read) goes to the founder with both directs' written positions. Neither org judges the other's work (objection 9 of the port).
- **Founder:** approve S10 / change: ____

### Card S11: head-of-product (scope edit) · approve with S1

- **The edit:** out-of-scope adds "PRDs and product decisions for the feed's personalised order and surface, the learner profile, gamification and progressive learning (vp-personalization)". Under S1 option 1 she keeps, and her role text says so: "the default order: the baseline every fresh device, chip and flag-off build shows, and every personalised order is compared against", and she keeps the two cold-start trade-offs she owns in surface-value.md. Under option 2 that line is dropped and the trade-off owners change by amendment.
- **Inside First Light:** her release-1 scope rulings on PRD-003/004 stay hers until First Light closes (S4).
- **Lane 5:** unchanged. Her span drops by one (growth-designer, 24 → 23 directs).
- **Founder:** approve S11 / change: ____

## 3. AMD-008 and the protected texts (routed to evaluation-steward; not role cards)

AMD-008 is **proposed, not ratified** (its decision table is empty; F-19 open). Its text is evaluation-steward's draft, not a protected path; it becomes protected only when ratified into surface-value.md. Nothing below is mine to write; each line is a request to the steward, filed after the founder chooses.

| Rule | What it says today | What the moves imply | Who, how |
|---|---|---|---|
| P1 owner | "owner: personalization-lead; each rule added or changed by a head-of-product decision record" | owner → vp-personalization (already W-1525). Rule changes: by a vp-personalization decision record on personalization-eval's readout; head-of-product consulted only where a rule changes the default order (option 1) | evaluation-steward edits the draft before ratification |
| P5 holdout | a default-order holdout | under option 1 the holdout is head-of-product's order, which keeps the comparison independent; under option 2 the steward should add that the default order may not change while a rule's experiment is running | evaluation-steward |
| M1 | "until the learner-model engineer publishes a definition table" | no change: learner-model-engineer is already in the org (S5) | none |
| M1-M8 tests (AMD-FL-B) | the steward writes the specs | unchanged and important: gamification's constitutional checks stay with an owner outside the org that builds gamification | none |
| Ratification seats | "growth-designer (M), personalization-lead (P)" | rename to vp-personalization; note that the M seats now sit in one org, so head-of-product keeps her M seat as the outside product voice | evaluation-steward |
| AMD-013 | ratified; governs the flag, its cold start and the withdrawal | no change. Ownership of the feed moves no flag and no withdrawal right | none |
| surface-value.md trade-off owners (protected) | head-of-product owns the two cold-start rows | option 1: no change. Option 2: a narrow amendment for the owner column, drafted by the steward and ratified by the founder | evaluation-steward, by amendment, only under option 2 |

## 4. HQ (routed to hq-engineer; no tab change)

- **Tabs are already separate:** src/app/hq/HqTop.tsx lists "Personalization" (/hq/personalization) and "Evaluation" (/hq/evaluation, the Bradley-Terry leaderboard). No new tab is needed for the founder's "different orgs".
- **One label still collides:** the page /hq/personalization/evaluation has the heading `<h1>Evaluation</h1>` (subtitle "Personalization: evaluation record"), and the Personalization page links to it as "Evaluation record". Proposed: heading "Personalization eval", link "Personalization eval record", as objection 9 of the port proposed. This is a wording fix inside existing scope, not a new room. Owner: personalization-engineer (it built the page) with hq-engineer's review.
- **Seats:** under S4 growth-designer's HQ seat moves from the product floor's growth seat to the personalization room (pipeline step 6, hq-engineer; the personalization room's seats are already short, W-1524). The CEO office writes no HQ code.

## 5. Wiring after approval (pipeline step 7, this office)

- POC map lane 14: roles cell adds growth-designer; status line names this record. Lane 4 unchanged (growth-designer and platform-engineer stay listed for First Light). Lane 5: the overload count drops by one.
- Handoff map, Personalization row: inputs gain "the feed surface (from platform-engineer, S2)" and "gamification (growth-designer, S4)"; "backend attempts data (read-only: `progress`, `recall` stay backend-engineer's)" stays under reading A and changes under B; out-of-org handoffs: platform-engineer becomes a reviewer, not a builder.
- Board re-owning (JSON edit with a dated note per item, after generate): the S2 list to personalization-engineer; W-1500, W-1296, W-1409 stay growth-designer's (the role moves, the items do not).
- The `org-change` event is the chief of staff's to write.

## 6. Consulted (pipeline step 3; to be filed by the chief of staff)

The founder decided the whether; consultation answers how. Not yet asked. Each answers here in writing.

| Who | Why | Answer |
|---|---|---|
| vp-personalization (Mateo) | the org receives four areas and one role; S1 options; S9 | pending |
| chief-product-officer (Margot) | S10; S11 is in her org | pending |
| head-of-product (Priya) | the default order (S1 option 1 or 2), gamification PRDs and growth-designer leave her | pending |
| principal-engineer (Kenji) | feed code changes owner (S2/S3); src/lib/learner/** tier 2 (S5); reading B's schema owners | pending |
| evaluation-steward (Hilde) | §3 (AMD-008 draft edits, option 2's amendment); the feed spec stays hers | pending |
| head-of-strategic-initiatives (Beatriz) | First Light core team: growth-designer's line, platform-engineer's feed items, reading B on the critical path | pending |
| chief-of-staff (Ada) | lane 14 widens; growth-designer in two lanes | pending |
| platform-engineer (Noor), backend-engineer (Amara), growth-designer (Jonah), learner-data-engineer (Solenne) | their own scope lines | pending |
| privacy-reviewer (Elif) | D1's owner; reading B | pending |
| principal-engineer-ops | personalization-engineer joins `OPS_ENGINEERS` (S3) | pending |

## 7. Objections and answers

| # | From | Objection | Answer |
|---|---|---|---|
| 1 | chief-of-staff (record) | The founder kept `progress`/`recall` with backend on 2026-10-16; "customer profile" may or may not include them | Both readings are written as cards S6/S7 (A and B); the founder chooses. I recommend A, for the independence of the recall measure and the EDD-008 critical path |
| 2 | Leonie | The VP's span goes from 7 to 8, two over the 2026-10-16 trigger, and the founder accepted 7 only "for now" | Open, the founder's call (S9). Recommendation: accept 8 until phase B start or until the restated L1 trigger fires; do not add a manager to an org whose Feed and Gamification sub-teams have 7 runs between them |
| 3 | Leonie | One owner for the order and for its baseline would let the org control its own comparison | Answered by S1 option 1 (the default order stays head-of-product's). If the founder picks option 2, §3's P5 line is the mitigation, and the residual risk is written into the VP's record |
| 4 | Leonie | Gamification's builder, its experiments and its product owner now sit in one org | The org's two-way independence rule covers it (eval never builds what it grades; S8), and the constitutional checks (AMD-FL-B M1-M8 specs, the QA contract, pedagogy-critic, learner-evaluator) stay outside the org |
| 5 | Leonie | personalization-engineer has 2 reported runs and would own the main production surface | S3 gives it readiness and incident duties and keeps platform-engineer's review and the protected feed spec as checks; S9 restates the feed-engineer trigger so the queue is visible at 7 days |
| 6 | Leonie | Moving the feed mid-initiative can drop First Light items between owners | §5 lists each item and where it goes; First Light items keep lane 4 and their `first-light` tag; Beatriz is consulted |
| 7 | chief-of-staff (record) | Owning the feed is not a licence to change its order | Stated at the top and written into S1's may-not; AMD-013 and the G record govern what is live |

## 8. What happens after the founder approves a card

The founder's words go into company/decisions/2026-10-18-founder-personalization-vs-evaluation-scope.md, verbatim and dated, per card (and the options chosen in S1, S6/S7, S9). Then this office edits tools/org/roles.mjs (and `OPS_ENGINEERS` for S3), runs `node tools/org/generate.mjs`, commits one change per approved card linking this file and the record, and wires §5. hq-engineer moves the seat (§4). The chief of staff writes the `org-change` event and files the §3 requests to evaluation-steward.
