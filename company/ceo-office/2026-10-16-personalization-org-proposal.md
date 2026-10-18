# Proposal: the personalization org (VP of Personalization, self-contained, staged by phase)

owner: chief-of-staff-ceo-office (Leonie) · date: 2026-10-16 · status: **proposed, for the founder's decision, one card at a time.** Nothing here exists until the founder approves the card. No edit to tools/org/roles.mjs, .claude/agents/ or company/roles/ has been made.
board: W-1671 · slot: company/ops/slots/chief-of-staff-ceo-office-4-founder-ratified-w-1492.json · record: company/decisions/2026-10-16-founder-personalization-org.md (this is step 2 of its route)
process: company/ceo-office/org-change-process.md (pipeline steps 1-3; step 4 is the founder's)
update 2026-10-16: the founder approved V, N1-N6, E1-E3 (record, "Founder approval"); generated the same day (record, "Generated"). The status line above is as of the proposal.

## The founder's words this design answers (verbatim, from the record)

1. "Mateo will create his team, with eval, applied scientes, head of feed, etc, this org should scale"
2. "Mateo is VP he should be independent instead of taping onto others in the compay, leoni to help with he org experience but not levergae other teams for his internal scope"
3. (founder brief §7) "I also want simulation in HQ to select persona and debug/inspect"
4. (founder brief §6, ratifying Mateo's §6a) "Ok approve but for curves maybe in code instead of json". Phase A starts now (offline simulator, probability + cs pilot, curves in code, hand-tuned); phase B (live) only after the accounts milestone and W-706; badges and points only after phase C defines "learned"; engagement is a guardrail only.

5. (third message, on the `settings` table) "Ues do it, but through a new team for customer data under the vp of personalization". Answered by §3a and card N6.

The founder has decided the **whether**: an org, led by Mateo as VP, self-contained, able to scale. This proposal answers the **how**: which roles, in what order, with what boundaries, and what each borrowed scope gives back or keeps. It does not reopen the founder's decision.

Inputs read: Mateo's proposal (company/personalization/2026-10-16-brief-response.md §3, §4, §7), the founder brief (§6, §7), the role data for personalization-lead, learner-model-engineer, platform-engineer, analytics-steward, evaluation-steward, growth-designer, hq-engineer, research-scientist, vp-rnd (tools/org/roles.mjs), AMD-008 M2/M4 and its objection 3 (company/constitution/amendments/AMD-008-first-light-surface-value.md), lane 14 of company/ceo-office/poc-map.md, board W-1671..W-1683, agent metrics (`npm run metrics -- --md`, 2026-10-16), company/ops/projects.json.

## 0. Is it a process problem? (pipeline step 1)

Partly, and the partial answer shapes the staging.

- **What is real:** phase A has six concrete items waiting (W-1672 to W-1677, plus W-1682/W-1683 for the HQ lab), and the founder has ruled that four of them (W-1675 criterion, W-1676 evidence, W-1677 location, W-1682 HQ lab) are the org's own work, not other teams'. Today the org has two roles. Those items have no in-org owner, so they wait.
- **What is process, not roles:** the biggest risk in phase A is not missing capacity, it is **circularity**: the reference `evaluate()` scores policies on the needs the policy optimises (Mateo's O2), and Mateo's own plan had the same person writing the curves *and* the simulated personas' latent truth (W-1672), and the same engineer porting the policy *and* building the simulated learner that grades it (W-1673). That is fixed by a rule (§2, the independence rule) and by **moving two pieces of work** between items, not by adding people. The rule comes first; the roles carry it.
- **What is staffing ahead of work:** the existing team has had one run each (personalization-lead 1, learner-model-engineer 1, metrics 2026-10-16). Roles whose work starts only in phase B or later are deferred with a named trigger (§4), not approved now.

## 1. The shape: one VP, four sub-teams, three company-wide interfaces

```
founder
└── vp-personalization (Mateo)          VP of Personalization (CEO Office)
    ├── Science
    │   ├── applied-scientist-personalization   (pool)      curves, weights: the numbers
    │   └── learning-scientist-personalization  (pool)      evidence and simulator parameter ranges
    ├── Learner Model (engineering)
    │   ├── learner-model-engineer (Ifeoma, exists)          engine, composer code, trace; the org's tech owner
    │   ├── personalization-engineer                         HQ Personalization Lab; later serving glue
    │   └── lesson-dims-owner                                dims schema, index, misconceptionStrength
    ├── Eval
    │   └── personalization-eval (pool)                      simulated learner, harness, criteria, readouts
    ├── Customer Data            (founder's third message)
    │   └── learner-data-engineer                            personalization's stored learner data: tables, migrations, retention
    └── Feed                    (phase B)
        └── head-of-feed                                     the personalised ordering contract
```

**Phase A (approve now): 6 new roles (N1-N5, plus N6 for the founder's customer-data team) + 2 edits to existing roles + the VP change.** Phase B adds head-of-feed. Everything else is a trigger (§4).

**Company-wide interfaces (gates every org passes; not borrowing, per the founder's second message):**

| Gate | Owner (unchanged) | The org's side of the interface |
|---|---|---|
| Privacy review of learner data and of any input the model reads | privacy-reviewer (lane 10) | The org requests the review (W-1674 stands as is); no input is used live, and no field is stored, before a written pass. Personas are simulation fixtures only. Every schema diff from the Customer Data team gets its read before it is built (gate E7); the team never marks its own inventory rows approved |
| The shared accounts database: one migration order, one runner | backend-engineer (db/migrations/, tools/db-migrate.mjs, EDD-008); principal-engineer (tier-2 review of every learner-data schema change) | §3a: the org owns its tables and their migrations; backend-engineer owns the sequence and the runner and reviews order, not content |
| Founder approval of every deploy | founder, through release-manager | The org never deploys and never writes `[deploy]`; phase B ships only through the release path |
| Protected paths and the constitution (AMD-008 P1/X1/M, gates, tests/qa) | evaluation-steward, by amendment | The org proposes amendments, never edits a protected path. W-1678 (F-19: is a hand-set GAM a "rule" under P1) stays with evaluation-steward. evaluation-steward's standing audit of evaluator independence covers the org's eval like any other evaluator |
| The claims rule (anything a learner reads) | builders record; fact-checker verifies (lane 10) | Every learner-visible "why this card" reason is a claim in a recorded copy file; the org never marks its own reason copy verified |
| The platform owner's review where personalization touches shared code | platform-engineer (feed, kit, src/app, src/components); principal-engineer for tier-2 paths (src/lib/learner/**, W-1220); hq-engineer for src/app/hq/** | The org writes the code; the owner of the shared surface reviews the change before merge. Review is a gate, not the work |
| Budget | portfolio-manager (lane 17) | The org gets its own project tag (proposed `personalization`); First Light's `personalization` workstream (projects.json) stays First Light's rule-based scope and is not phase A's budget |
| Company metrics and event meaning | analytics-steward | New events in src/kit/progress.ts (shared kit) get the steward's semantics note and the platform owner's review. The org's readouts appear in the WBR as written by the org's eval, unedited |

## 2. The independence rule (written into the org, and into each card's "may not")

The founder chose an in-org eval. Independence therefore has to be built inside the org (onboarding working agreement 3). Two directions:

1. **Eval roles never build what they grade.** personalization-eval does not write, port or tune any policy, curve, weight, composer code, lesson dim it scores, or reason copy.
2. **Builders never build or tune the judge.** No one who writes policies, curves, weights or composer code edits the simulated learner, the persona latent parameters, a pass criterion, or a readout. The simulated learner's parameters come from learning-scientist-personalization's published ranges, not from the curve tuner.
3. **Criteria are frozen before runs.** A pass criterion is committed (hash in the readout) before the run it judges. Changing it after a run is a new criterion, says so in the readout, and the old result stands.
4. **The VP decides keep or kill on the readout, and may not override a fail silently.** Overriding a failed criterion is written as an objection in the phase's decision record and goes to the founder.
5. **Who checks the eval:** learning-scientist-personalization reviews the simulated learner against its own evidence ranges; learner-model-engineer reproduces a readout from its seed and commit (determinism only, not judgement); evaluation-steward audits the rule (company-wide, row 3 above).

**Consequence for the board (proposed, applied by the item owners after approval):** the persona latent ground truth moves from W-1672 (Mateo) to personalization-eval; the independent simulated learner and the scoring harness move from W-1673 (learner-model-engineer) to personalization-eval. W-1673 keeps the engine port and the policies; W-1683 (trace) stays with learner-model-engineer.

## 3. Overlaps T1-T8: resolved by giving the scope to the org

Each line says what the org takes, and what (if anything) moves out of the other role's scope.

| # | Overlap | Resolution | Moves out of the other role |
|---|---|---|---|
| T1 | head-of-feed vs platform-engineer (and head-of-product) | The **personalised ordering** is the org's: the composer, its interface (queue, move threshold, due-revisits-first, off switch), the reason per moved card, the served-order log for replay. Owner head-of-feed (phase B); in phase A it exists only in the simulator. platform-engineer keeps Feed.tsx, rendering, the kit and the performance budget, and reviews any change to them. head-of-product keeps the **default order** (what non-personalised learners and the holdout arm see) | From platform-engineer: `src/lib/learner/**` is named the org's path (it was inside platform-engineer's broad `src/lib`; learner-model-engineer already lists it "once approved"). Nothing else |
| T2 | personalization-eval vs analytics-steward | Personalization pass criteria, MDE/power estimates, experiment registrations and readouts are the org's eval (W-1675 moves in). Registrations still use company/experiments/EXP-*.md format | From analytics-steward: authorship of **personalization** EXP files and W-1675. Kept by the steward: event semantics in src/kit/progress.ts, company metric meaning, the WBR metrics section |
| T3 | personalization-eval vs evaluation-steward | Eval reports **inside the org** (to the VP), per the founder. Independence comes from §2, and evaluation-steward's company-wide independence audit and amendment power stay as gates | Nothing. Mateo's draft line "reports to evaluation-steward" is dropped |
| T4 | applied scientist vs learner-model-engineer | Scientist owns the **numbers** (the curve module's shapes, composer weights) and the reason for each change; engineer owns the **code** (engine, composer, determinism, tests, trace). Persona latent truth goes to neither: it is the eval's (§2) | Nothing (both in-org) |
| T5 | applied scientist vs research-lead / research-scientist | The org gets its own **learning-scientist-personalization** for its evidence questions (W-1676 moves in) and the simulator's parameter ranges. The applied scientist still does no literature review | From research-lead: W-1676 and future personalization questions (no longer routed to lane 12). research-lead's scope text is unchanged |
| T6 | lesson-dims-owner vs category managers and principal-engineer | The org owns the dims schema, the derived index and the misconceptionStrength ratings (rated in-org, second-rated blind on a 20% sample by personalization-eval, agreement reported). Where dims and code live is decided in-org by learner-model-engineer as tech owner (W-1677 moves in). Recommended: a derived index **outside meta.json**, so no shared schema changes. CMs' concepts and prerequisite edges are read-only inputs; an edge change is a request to the CM | From principal-engineer: W-1677 (location decision). Kept by PE: meta.json schema and EDD-003 (any change to them is the shared-surface review), tier-2 review if code enters src/lib/learner/**. Nothing moves out of the CMs |
| T7 | growth-designer's "Recall-based streaks" vs AMD-008 M2 and the founder's Q5 ("no streaks") | Scope edit (card E2): the line becomes "Today's revisits done, shown as today's state and never counted across days". Badges and points stay growth-designer's (a product feature), built in phase C/D on the "learned" definition the org publishes: an interface, not a loan | From growth-designer: "recall-based streaks". Nothing moves into the org |
| T8 | Reporting line, span and lane | VP reports to the founder (card V). Lane 14 on the POC map: POC vp-personalization, roles cell lists every approved org role, **including the eval** (it is dispatched in the org's own lane, not lane 10). Privacy and claims checks are still requested from lane 10 | From head-of-product: Mateo and learner-model-engineer leave her line (25 directs → 24). Lane 5 unchanged |

## 3a. T9: the Customer Data team vs backend-engineer (one shared database, one migration order)

The founder's third message puts personalization's stored learner data in the org, under the VP. backend-engineer (Amara) owns the accounts database today: EDD-008, migration `001_accounts` on the `accounts` branch, the runner `tools/db-migrate.mjs`, `src/app/api/**` and `src/lib/server/**`. The org gets its data; the database stays one database with one owner of its order.

| Moves to the org (learner-data-engineer) | Stays with backend-engineer | Stays company-wide |
|---|---|---|
| Schema, `up`/`down` migrations, preview fake data, retention and purge jobs for **personalization tables**: `settings` now; later the 30-day served-order log, experiment counter tables, lesson-aggregate tables, per-category "learned" state and earned-badge storage (each only after its own privacy read) | The auth tables (`auth_user`, `auth_session`, `auth_account`, `auth_verification`), `signup_intent`, `deleted_account`, `schema_migrations` | privacy-reviewer reads every diff before it is built (E7) and owns the data inventory |
| The column confirmation for those tables' data-inventory rows (the job backend-engineer does for D1-D14, per the inventory's header) | `progress` and `recall`: the product's cross-device sync for every learner, not personalization's. The org reads them read-only; a change is a request to backend-engineer | principal-engineer: tier-2 review of every learner-data schema change (EDD-008 practice); principal-engineer-ops approves the readiness record |
| The tables' part of deletion and export: FK `ON DELETE CASCADE` to `auth_user.id`, and the `settings` block in the `s3c-export-v1` file, written by the org as a patch to the export and delete code and reviewed by backend-engineer | `tools/db-migrate.mjs`, the `db/migrations/` sequence, the Neon project, branches, env, backups, the restore drill and tombstone replay, the account-deletion transaction and `GET /api/account/export` as code owner, the 24-month inactivity purge (which reaches `settings` through the cascade) | Applying a migration to production: by hand, accounts off, only with the founder's deploy approval through release-manager (EDD-008 rollout). Neither team applies it alone |
| The org's API routes and server code (proposed `src/app/api/settings/**`, `src/lib/server/personalization/**`), reviewed by backend-engineer as owner of those trees | EDD-008 and the `accounts` branch; W-706 (the event store itself) | analytics-steward: event semantics; counters derived from W-706 are the org's tables, their meaning is the steward's note |
| Aggregate query text for personalization (N5 counters, AG1-AG3), sent to privacy-reviewer before it runs on real data | | |

**The migration-order rule (the one thing the founder's independence cannot split):**
1. One sequence in `db/migrations/`, one runner. The org writes its migration as the next free number on a branch cut from the current migration head (today the `accounts` branch tip). backend-engineer confirms the number and runner compatibility before merge: an **order review, not a content review**. If two migrations race, the one merged second renumbers.
2. No migration alters another team's table. The org's FK to `auth_user.id` is declared in the org's migration; backend-engineer consults the org before any change to `auth_user.id`.
3. Every `down` is tested on the preview branch (EDD-008 rollback), schema-only, fake data.
4. Nothing derived is ever a column (D20, privacy read N1 and §4): fingerprints, need scores, composer terms, ability or mastery state stay computed on demand. A request to store one is a new privacy read and, for ability state, an AMD-008 P1 amendment, not a migration.

**What moves out of backend-engineer's scope:** "the `settings` schema diff" (privacy read §8 item 3, now W-1700), and future personalization tables. Its role text needs one added out-of-scope line ("personalization tables, their migrations and retention: learner-data-engineer; backend-engineer keeps the sequence, the runner and the order review") and one added review duty. That is card E3 below. EDD-008 §6.1's `settings` row names "personalization-lead" as owner; on approval it becomes learner-data-engineer (backend-engineer's edit to its own EDD).

## 4. Staging: approve now, approve later, and the trigger for each later role

### Approve now (phase A, each with work waiting)

| Card | Role | Work waiting (first dispatch) |
|---|---|---|
| V | vp-personalization (Mateo; replaces personalization-lead) | objective and constraints half of W-1672 |
| N1 | personalization-eval | simulated learner + harness (from W-1673), persona latent truth (from W-1672), pass criterion and MDE (W-1675), all before any run |
| N2 | applied-scientist-personalization | needs-v0 curves and composer weights in the code module (curve half of W-1672) |
| N3 | learning-scientist-personalization | W-1676 evidence memo and simulator parameter ranges (feeds N1) |
| N4 | lesson-dims-owner | the pilot index (probability 78 + cs 153) and misconceptionStrength ratings; W-1677's dims half |
| N5 | personalization-engineer | W-1682 HQ Personalization Lab, starting against W-1683's trace schema (fixture first, live data when W-1673 runs) |
| N6 | learner-data-engineer (Customer Data team, founder's third message) | W-1700: the `settings` schema diff for privacy-reviewer's read. Starts the day the card is approved |
| E1 | learner-model-engineer (scope edit) | W-1673 port, W-1683 trace, W-1677 location decision |
| E2 | growth-designer (scope edit, T7) | none new; aligns the role with the founder's Q5 ruling |
| E3 | backend-engineer (scope edit, T9) | none new; the order review of N6's first migration |

### Deferred (approve when the trigger fires; each comes back as its own short record)

| Role / split | Trigger (first of) | Why not now |
|---|---|---|
| head-of-feed (card L1) | The founder approves phase B start, which needs: phase A exit criterion passed in an eval readout, accounts milestone, W-706, and the F-19 ruling (W-1678) | No feed is touched in phase A; the composer runs only in the simulator |
| feed-engineer (serving path) | Phase B is live and composer serving work for personalization-engineer has a queue older than 7 days, or the composer must meet the latency budget on the server | personalization-engineer covers the glue until then |
| learner-model-engineer, second instance or per-category-cluster id | Phase C starts (per-category knowledge state), or W-1673-type work has a queue older than 7 days | One engineer is enough for one offline engine |
| applied scientist split by need family (repair/build vs breadth/novelty/surprise) | Two curve families each have their own iteration queue for 7+ days | Scale by instances of the pool role first; a new id only when the scopes differ |
| applied scientist split by category cluster (dense vs sparse graphs) | Phase C per-category models | Same |
| eval split offline (simulator) vs online (experiments) | Two personalization experiments run at once, or the first live experiment while offline ablations continue | One evaluator can do both in sequence |
| learner-data-steward (Customer Data split) | Phase C starts (the per-category "learned" state gets its privacy ruling), or two personalization stores are in review at once | One engineer can write a diff, its inventory rows and its retention. When stored state starts carrying meaning (what "learned" means, badge eligibility), the person who defines and audits the data should not be the person who builds its tables |
| learner-data-engineer, second instance | W-1700-type work has a queue older than 7 days | Scale by instance first |
| customer-data lead | The Customer Data team reaches 3 agents | No manager for one or two roles |
| sub-team leads (manager layer) | A sub-team has 3 or more agents, or the VP has more than 6 direct reports | Phase A: VP has 7 directs (N1-N6, learner-model-engineer): N6 puts the span one over this trigger at approval (objection 9). Phase B adds head-of-feed (8): then personalization-engineer moves under head-of-feed (Feed sub-team) and the span is 7; the trigger is decided at phase B start, not by adding a manager to a phase-A org |

**Scaling rule:** scale by **instances** of a pool role first (applied scientist, learning scientist and eval go into `MANY` in tools/org/people.mjs); create a **new role id** only when the scope differs (need family, category cluster, offline vs online); add a **manager** only at the span trigger above. Each new id and each lead is its own record and founder approval. **Sunset check (every card):** no dispatch within 14 days of approval, or 14 days idle after its first item, gets a verdict at the WBR (activate, re-scope, merge or retire).

## 5. Mateo's title and reporting line

**Recommendation: change both, as the founder said.** id `personalization-lead` becomes `vp-personalization`, title "VP of Personalization (CEO Office)", reports to the founder. Reasons:
- The founder named the title and asked for independence; a VP under head-of-product would leave the org reporting through a product line it is now meant to stand beside.
- It matches the company's convention: vp-rnd and vp-marketing report to the founder and run multi-team orgs.
- It takes the org's line off head-of-product, who carries 25 directs (poc-map.md, overload table).
- Before my redesign I would have kept the line under head-of-product until phase B (the org had 3 agents and personalization changes what the product shows). The founder's second message settles that; the product boundary is kept instead by T1 (head-of-product keeps the default order) and by phase B's launch going through the same release path as everything else.

**Cost, stated:** the founder goes from 8 to 9 directs, and every future org change gains one more consult (the open span objection, company/decisions/2026-10-15-head-of-strategic-initiatives.md objection 2, grows). **Why rename the id, not just the title:** a VP with a `-lead` id reads as a team lead in mailbox lanes, metrics and the POC map. The rename is mechanical but touches state, so the generate step must also: re-own the open board items owned by personalization-lead (4 today) via `company board`, carry the memory file `company/roles/memory/personalization-lead.md` to the new id (tools-lead confirms tools/memory.mjs handles a rename, or the old file is linked from the new one), rewrite lane 14 of the POC map, update people.mjs ("Mateo"), and note the old id in the org-change event. **Fallback if the founder prefers no churn:** keep the id, change the title and line only.

## 6. Role cards (approve one by one)

Every card: team `personalization`, HQ placement Floor 2 (Product), the personalization room (names only; tools-lead and hq-engineer place it), budget tag `personalization` (pending portfolio-manager), lane 14. A role's checker is never itself.

### Card V: vp-personalization (replaces personalization-lead) · approve now
- **Title:** VP of Personalization (CEO Office) · **Person:** Mateo · **Reports to:** founder
- **Mission:** Each learner gets the next lesson that helps them most, for reasons we can explain and measure, without trapping them in a bubble.
- **In scope:** the objective and its constraints; the needs vocabulary; phases and their exit criteria; priorities for the org; the published curve and rule list and its decision records; keep/kill per term on the eval's readout; the org's lane 14 batches; reason-copy drafts.
- **Out of scope:** writing curves, the simulator, criteria or readouts (§2); deploying; the default order (head-of-product); badges and points (growth-designer); amending AMD-008 (proposes only).
- **May not:** override a failed criterion without an objection to the founder; ship anything live without a registered experiment, a privacy pass and the founder's deploy approval; create roles (this pipeline).
- **Handoffs:** objective → applied scientist, eval; phase decisions → founder; reason copy → fact-checker (lane 10).
- **Checker:** the founder (phase decisions); the eval's readout is the evidence. **Phase:** now. **First dispatch:** W-1672 objective and constraints.

### Card N1: personalization-eval · approve now · pool role
- **Title:** Personalization Evaluator · **Reports to:** vp-personalization
- **Mission:** A personalization policy is judged against an independent learner and a criterion frozen before the run, never against its own assumptions.
- **In scope:** the simulated learner and its persona latent parameters (from learning-scientist ranges); the scoring harness (recall over all lessons, breadth, sensitivity ±50%, replay and forbidden-input tests); pass criteria and MDE estimates written before runs; personalization experiment registrations (EXP format) and readouts in phase B; blind second rating of 20% of dims; the readout section for the WBR.
- **Out of scope:** policies, curves, weights, composer code, dims it scores, reason copy (§2.1); gates, the QA contract and amendments (evaluation-steward); event semantics (analytics-steward).
- **May not:** build or tune anything it grades; change a frozen criterion without saying so in the readout; decide keep or kill.
- **Handoffs:** readouts → vp-personalization and WBR; harness parameter questions → learning-scientist; reproduction requests → learner-model-engineer.
- **Checker:** learning-scientist (simulator fidelity), learner-model-engineer (reproduction), evaluation-steward (independence audit). **Phase:** A. **First dispatch:** simulated learner + harness + W-1675 criterion, before any run.

### Card N2: applied-scientist-personalization · approve now · pool role
- **Title:** Applied Scientist, Personalization · **Reports to:** vp-personalization (Science)
- **Mission:** The curves say what the evidence says, and every change to them has a reason someone can check.
- **In scope:** the curve module's numbers (need shape curves, composer weights), one written reason per change (commit message plus a decision-record line, founder Q3), curve sensitivity notes; from phase C, fitting only if an amendment to P1 allows it.
- **Out of scope:** engine code; the simulator, personas, criteria; literature reviews (learning-scientist); any stored per-learner output.
- **May not:** edit the simulated learner, criteria or readouts; ship curves live.
- **Handoffs:** versioned curves → learner-model-engineer and eval; evidence questions → learning-scientist.
- **Checker:** personalization-eval (readout). **Phase:** A. **First dispatch:** curve half of W-1672.

### Card N3: learning-scientist-personalization · approve now · pool role
- **Title:** Learning Scientist, Personalization · **Reports to:** vp-personalization (Science)
- **Mission:** The org's questions about learning get sourced answers, and the simulated learner behaves the way the evidence says learners do.
- **In scope:** evidence memos for the org (surprise/hypercorrection, novelty, readiness, forgetting); parameter ranges for the simulated learner; review of the simulator against those ranges.
- **Out of scope:** curves and weights (applied scientist); the simulator code (eval); company research outside personalization (research-lead).
- **May not:** set curve values; mark its own memo's findings as verified learner-facing claims.
- **Handoffs:** ranges → eval; findings → applied scientist and VP.
- **Checker:** the eval and the applied scientist read the memo independently; any learner-facing sentence goes through the claims rule. **Phase:** A. **First dispatch:** W-1676 (moves from research-lead).

### Card N4: lesson-dims-owner · approve now
- **Title:** Lesson Features Owner · **Reports to:** vp-personalization (Learner Model)
- **Mission:** Every lesson exposes the features the composer needs, consistently, from data we already have wherever possible.
- **In scope:** the dims schema (brief-response §2.4); the derived index from meta.json and content/curriculum (read-only); the misconceptionStrength rating protocol and the pilot ratings (probability 78 + cs 153); coverage reports (e.g. Life Hacks' 15 edges).
- **Out of scope:** concepts and prerequisite edges (CMs; requests only); meta.json schema and EDD-003 (principal-engineer); the demo standard; fact-checking.
- **May not:** write to meta.json or content/curriculum; score its own ratings' agreement.
- **Handoffs:** index → learner-model-engineer, eval; edge requests → the CM.
- **Checker:** personalization-eval (blind 20% second rating). **Phase:** A, grows in B. **First dispatch:** pilot index and ratings, once W-1677 names the location.

### Card N5: personalization-engineer · approve now
- **Title:** Personalization Engineer · **Reports to:** vp-personalization (Learner Model; moves under head-of-feed in phase B)
- **Mission:** The org's work is visible and inspectable: anyone can pick a persona and see why each card was chosen.
- **In scope:** the HQ Personalization Lab (W-1682: persona picker, fingerprint, curves with the persona's point, per-slot score terms and rejected candidates, policy comparison), read-only; in phase B, serving glue between the composer and the feed, behind the off switch.
- **Out of scope:** engine and curves; the simulator; HQ code outside the lab page; Feed.tsx and the kit (platform-engineer).
- **May not:** merge into src/app/hq/** without hq-engineer's review, or into the feed or kit without platform-engineer's; add dependencies without a decision record.
- **Handoffs:** lab → founder, VP, eval; HQ review → hq-engineer.
- **Checker:** hq-engineer (shared-surface review), qa-tester for the page. **Phase:** A. **First dispatch:** W-1682 against W-1683's trace schema.

### Card E1: learner-model-engineer (edit) · approve now
- **Change:** reports to vp-personalization (unchanged person, new id of the manager); adds "the org's tech owner: where model, dims and engine code live (W-1677)", "the engine port and the policies under test (W-1673)", "the per-step trace (W-1683)"; removes "Offline evaluation against logged attempts" (moves to the eval, §2); adds may-not "build or tune the simulated learner, personas or criteria".
- **Checker:** personalization-eval (behaviour); principal-engineer only if code enters src/lib/learner/** (tier 2).

### Card E2: growth-designer (edit, T7) · approve now
- **Change:** "Recall-based streaks (today's revisits done)" becomes "Today's revisits done, shown as today's state and never counted across days (AMD-008 M2)". Reporting line unchanged (head-of-product). Badges and points stay its scope, after phase C, reading the org's published definition of "learned".

### Card N6: learner-data-engineer · approve now · Customer Data team (founder's third message)
- **Title:** Learner Data Engineer (Customer Data) · **Reports to:** vp-personalization · **Team:** personalization, sub-team Customer Data
- **Mission:** Every piece of learner data personalization reads or keeps is stated, minimal, privacy-read before it exists, and leaves with the account.
- **In scope:** schema, migrations (`up`/`down`), retention and purge for personalization tables, starting with `settings` (`personalization_on`, `subjects[]`, `less_of[]`); their data-inventory rows (column confirmation); their deletion (cascade) and export (`s3c-export-v1` block) behaviour; the org's settings API and server code; aggregate query text for N5 counters and AG1-AG3. Later, each after its own privacy read: the 30-day served-order log (contract from head-of-feed), experiment counters from the W-706 store, lesson aggregates (cells under 20 suppressed), per-category "learned" state and earned badges (phase C/D).
- **Out of scope:** auth tables, `progress`, `recall`, `deleted_account`, the runner `tools/db-migrate.mjs`, the migration sequence, Neon, backups, EDD-008 (backend-engineer, §3a); event semantics (analytics-steward); what to personalise, curves, policies (Science, Learner Model); badge design (growth-designer); privacy rulings (privacy-reviewer).
- **May not:** store any derived value (fingerprint, need score, composer term, ability or mastery state; D20); write a choice from behaviour (SS3); build a table or run a query on real data before privacy-reviewer's written pass; alter another team's table; apply a migration to production (founder's deploy approval, release-manager); approve its own diff or inventory rows.
- **Handoffs:** schema diff + inventory rows → privacy-reviewer (read), principal-engineer (tier 2), backend-engineer (migration order, export/delete patch review); readiness record → principal-engineer-ops; settings read path → learner-model-engineer; counters → personalization-eval.
- **Checker:** privacy-reviewer (data), principal-engineer (schema), backend-engineer (order and shared code). Never personalization-eval for its own counters' correctness alone; the eval reads them, it does not certify them. **Phase:** A (diff only; nothing is built for real learners before phase B's conditions). **First dispatch:** W-1700 the day the card is approved: a draft migration `00N_settings.up.sql`/`.down.sql` on a branch from the `accounts` tip plus a short design note carrying SS1 (closed vocabulary: domain ids, concept ids, slugs; no free text), SS2 (`subjects[]` at most the domain count, `less_of[]` cap proposed 50, unknown keys dropped on write), SS3 (stated only, never inferred), SS4 (stored with the account, cascade delete, exported, anonymous stays local, off switch overrides), SS5 (never in the beacon, `exp` or any aggregate under k=20), the proposed inventory rows, the retention line (with the account; 24-month inactivity purge via cascade), and a line that D20 values get no column. `personalization_on`'s default is not the engineer's call: the note lists it as a question for the VP and privacy-reviewer (AMD-008 P4).
- **Trigger for the split:** learner-data-steward at phase C start (§4).

### Card E3: backend-engineer (edit, T9) · approve with N6
- **Change:** adds out-of-scope "personalization tables, their migrations and retention (learner-data-engineer)"; adds in-scope "the migration sequence and runner for the shared accounts database: order review of every migration, including other teams'; review of other teams' patches to the export and delete code". Keeps the auth tables, `progress`, `recall`, EDD-008, W-706 and the `accounts` branch. Reporting line unchanged.
- **Checker:** principal-engineer (as today).

### Card L1: head-of-feed · deferred (trigger in §4)
- **Title:** Head of Feed (Personalization) · **Reports to:** vp-personalization · leads the Feed sub-team (personalization-engineer moves under it)
- **Mission:** Personalised learners see the right card next, fast, with a true reason and a working off switch.
- **In scope:** the personalised ordering contract (composer interface, queue, move threshold, due-revisits-first, off switch), the latency budget for composing, the served-order log for replay (P1), the phase B rollout plan.
- **Out of scope:** curves and objective; Feed.tsx, rendering and the kit (platform-engineer); the default order (head-of-product).
- **May not:** change the default order; merge into shared feed or kit code without platform-engineer's review; deploy.
- **Checker:** personalization-eval (online readout), platform-engineer (shared review), privacy-reviewer (served-order log).
- **Note (T9):** head-of-feed writes the served-order log's **contract** (slug, rule id, reason; N4); learner-data-engineer owns the table, its 30-day retention and deletion.
- **2026-10-18 (card S9, approved under company/decisions/2026-10-18-founder-delegated-decisions.md): stays deferred, triggers restated.** L1 activates on the first of: (a) the founder approves phase B start (as before); (b) the Feed and Gamification sub-teams together have 3 or more agents (2 on 2026-10-18: personalization-engineer, growth-designer); (c) the VP's span reaches 9 (8 accepted on 2026-10-18). The deferred **feed-engineer** trigger becomes: the feed surface or gamification build queue for personalization-engineer has an item older than 7 days, or PRD-004's challenge build starts while feed items are open. Feed.tsx is no longer platform-engineer's (card S2): if L1 activates, its out-of-scope line reads "the kit, the lesson host and the app shell (platform-engineer, review)". Source: company/ceo-office/2026-10-18-personalization-scope-proposal.md S9.

## 7. Consulted (pipeline step 3)

The founder decided the whether; consultation answers how. Each direct answers here in writing. Board items filed 2026-10-16: W-1686 head-of-product, W-1687 evaluation-steward, W-1688 principal-engineer, W-1689 vp-rnd, W-1690 chief-of-staff, W-1691 personalization-lead; budget tag W-1692 portfolio-manager. Added with the Customer Data revision (founder's third message): W-1701 backend-engineer, W-1702 privacy-reviewer; first task W-1700.

| Direct | Why | Answer |
|---|---|---|
| head-of-product (Priya) | Mateo and learner-model-engineer leave her line; default order kept by her (T1); growth-designer edit (E2) | pending |
| evaluation-steward (Hilde) | in-org eval and the independence rule (§2); W-1678 stays hers | pending |
| principal-engineer (Kenji) | src/lib/learner/** named the org's path; W-1677 moves to the org's tech owner; tier-2 review interface, including every Customer Data schema diff (T9) | pending |
| vp-rnd (Vera) | the org gets its own learning-science capacity; W-1676 leaves lane 12 | pending |
| chief-of-staff (Ada) | lane 14 widens; the eval is dispatched in lane 14, not lane 10 | pending |
| personalization-lead (Mateo) | the two work moves in §2 (personas, simulated learner to the eval); N6 reports to him; `personalization_on` default question | **agree with changes** (2026-10-16, Mateo as vp-personalization, run vp-lane14-batch-1-1016, W-1691). (1) **Both moves agreed.** The persona `latent` block in `company/personalization/model/personas.ts` and the simulated learner and scorer (`sim/learner.ts`, `sim/score.ts`) pass to personalization-eval (W-1685). Until eval adopts or replaces them, they stay PROVISIONAL and every sim number stays UNSCORED. I will not edit `latent` again; the fingerprint means stay mine, because they describe what the composer sees. Change: eval adopts or replaces a **copy** inside its own files rather than editing personas.ts, so the model's change rule and eval's criterion hash never share a file. (2) **N6 reporting to me: agree**, for the reason in objection 9 (stored learner data should not sit under the builder of the policies that read it). (3) **`personalization_on` default, my position for privacy-reviewer:** the column stores only an explicit learner choice and is nullable. `null` means no choice was made, and the served order then follows the registered experiment's arm (holdout = default order, F1). It is never written from behaviour (as SS3), and an explicit off always wins (P4). The final call is privacy-reviewer's with me, in the W-1700 note. Batch: company/personalization/batches/2026-10-16-batch-1.md |
| backend-engineer (Amara) | T9 (§3a) and card E3: personalization tables leave her scope; she keeps the sequence, runner and order review | pending (filed with this revision; not a precondition for the founder's approval of N6, which the founder has already decided in substance) |
| privacy-reviewer (Elif) | the read of W-1700 moves from backend-engineer's diff to learner-data-engineer's; inventory rows for personalization tables get their column confirmation from the org | pending |

## 8. Objections and answers

| # | From | Objection | Answer |
|---|---|---|---|
| 1 | chief-of-staff (record) | An in-org eval loses independence | Answered by §2: two-way rule, frozen criteria, a reproduction check, and evaluation-steward's company-wide audit still applies. Residual risk stays open: an eval whose manager owns the policy can feel pressure. The readout is reported unedited in the WBR so pressure is visible |
| 2 | chief-of-staff (record) | Self-contained duplicates capabilities other teams have | Accepted as the founder's choice. Kept small by pool roles and triggers, and by keeping every gate company-wide (§1 table). No new experiment, research or engineering gate is created inside the org |
| 3 | chief-of-staff (record) | Staffing ahead of work | Each approve-now card has a named first dispatch from W-1672..W-1683; head-of-feed and every split wait on triggers; 14-day sunset check on every card |
| 4 | Leonie (this design) | Mateo's own plan was circular in two places (personas with the curve tuner; simulated learner with the policy porter) | Moved to the eval (§2). Mateo is asked to answer in §7 |
| 5 | Leonie | The founder's span goes to 9 | Open; the founder's call (§5). Not a reason to override the founder's "Mateo is VP" |
| 6 | Leonie | 5 new roles at once against two roles with one run each | The founder asked for an org now and the work exists; the sunset check is the safeguard. If the founder prefers fewer, the order to cut is N5 (give W-1682 to learner-model-engineer after W-1683) then N3 |
| 7 | Leonie | Renaming the role id touches board, memory and lanes | Listed mechanics in §5; fallback keeps the id |
| 8 | Leonie (T9) | Two owners in one database: an independent team's migration can break the shared order or the auth tables | Answered by §3a: one sequence, one runner, backend-engineer's order review, no migration alters another team's table, every diff read by privacy-reviewer and reviewed tier 2 by principal-engineer. Residual: the export and delete code stay backend-engineer's, so a `settings` change needs her review; that is the price of one database |
| 9 | Leonie | N6 takes the VP to 7 directs, one over the §4 span trigger, in an org where most roles have not run yet | Open, the founder's call. Recommendation: accept 7 for phase A rather than add a manager; decide at phase B start. Alternative if the founder prefers: N6 reports to learner-model-engineer as the org's tech owner, which I do not recommend because it puts stored learner data under the person who builds the policies that read it |
| 10 | Leonie | The founder's "learner data personalization reads and writes" could be read to include `progress` and `recall` | Not moved: they are every learner's cross-device sync (backend-engineer's mission), and personalization only reads them. If the founder means them too, say so and §3a moves them with a migration-order note |

## 9. What happens after the founder approves a card

Pipeline steps 5-9 (company/ceo-office/org-change-process.md): the CEO office edits roles.mjs and people.mjs and runs generate (one commit per approved card, linking this file and the record); tools-lead and hq-engineer place the seats; the CEO office writes lane 14 on the POC map and the handoff map; the chief of staff writes the org-change event; the VP asks for the first dispatch within 7 days. The open board items move owners only then: W-1675 to personalization-eval, W-1676 to learning-scientist-personalization, W-1677 to learner-model-engineer, W-1682 to personalization-engineer, W-1700 to learner-data-engineer (dispatched the same day: its first task needs nothing else).
