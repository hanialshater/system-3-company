# First Light: dependency map

owner: head-of-strategic-initiatives (Beatriz) · as of: 2026-10-15 (week 1, untagged scoping, W-915) · re-read: every stand-up (Mon, Thu)
sources: charter.md, status.json, quality-bar.md (section 2.1 dates), company/decisions/2026-10-15-founder-first-light.md (with Amendment 1), the budget pack (company/ceo-office/2026-10-14-project-review-1-agenda.md, Addendum 2026-10-15), the pre-mortem (company/ceo-office/2026-10-14-project-review-1-premortems.md), board.json and founder-inbox.json as of 2026-10-15

**How to read it.** Each row is one thing a workstream waits on: a decision, a review, an EDD, an amendment, a freeze. "Due" is the date in the record named in "Source". **No engineering date in this file is an estimate**: the tech lead has not estimated anything yet (W-908, due 10-23). Dates from the quality bar and the budget pack's stop rule are commitments those owners made; build durations are unknown until W-908. Every dependency is a board item that the chief of staff files; rows marked **no board item** are asked for under "Board asks".

This file is a builders' account. It is not pasted into an evaluator's brief (company/reviews/README.md), and it never marks a quality row met.

## 1. The dependencies

### Gate 0: money and the forum (this week)

| # | Waits on | Kind | Owner | Due | Source | Board | Blocks |
|---|---|---|---|---|---|---|---|
| D-01 | **Project Review 1**: tranche 1 (3.59M) approved | founder decision (F-15) | founder (chair); portfolio-manager records | **2026-10-16** | agenda Addendum, item 7 | W-730, W-905 | every `[project:first-light]` dispatch (the ledger gate refuses tagged work while the project is `proposed`) |
| D-02 | The quality line in the budget (T1 ~0.4M, T2 ~9.2M, minimum ~6.3M) | budget | portfolio-manager | 2026-10-16 | quality-bar.md §3 | W-929 | every quality run (bar, AMD-FL-A/B/C, dry run, verdict); the pack has no quality line today |

### Gate 1: the tranche-1 checkpoint (2026-10-23)

The stop rule releases tranche 2 only if W-908 keeps it at or under 10.2M **and** F-01 is decided by 10-23. The quality bar freezes the same day, before the build.

| # | Waits on | Kind | Owner | Due | Source | Board | Blocks |
|---|---|---|---|---|---|---|---|
| D-03 | **F-01**: auth provider, database host, age floor (under 13 or not) | founder decision | founder | **2026-10-23** (open since 10-13) | stop rule; pre-mortem row 1 | W-908 (F-01 in the inbox) | auth and progress (EDD, data model), the age gate (legal), Q4.1's newcomer age, account-keyed personalization, social |
| D-04 | **W-908**: week-1 re-estimate of every workstream; Vercel Pro need | engineering estimate (tech lead; owner co-signs the dates) | principal-engineer | **2026-10-23** | decision item 4; stop rule | W-908 | tranche 2; every date after 10-23; the go/no-go date itself |
| D-05 | **Q5 / A1 (W-930)**: are Q5.1-Q5.4 reachable for 11-23 (feed ≤250 KB, first-load JS ≤500 KB gz from 2.32 MB, usable ≤3.0 s from 16.7 s)? If yes, the all-metas fix (EDD-001 option 4 / EDD-003 A1) joins the critical path | feasibility answer | principal-engineer | **2026-10-22** | quality-bar.md Q5 and §5 objection 1 | W-930 (related: W-946, the 5.3 MB client chunk) | the freeze of Q5; whether A1 (which needs AMD-001 (c2), F-03 open) must land before RC1 |
| D-06 | Privacy gate criteria published, and which Q1.8/Q1.9 measurements privacy will cite | gate criteria | privacy-reviewer | **2026-10-22** | quality-bar.md §2.1 | W-932 | the freeze (no row may repeat a privacy question, §2.6) |
| D-07 | Launch-catalog **plan** (not the freeze) | scope | head-of-product, through principal-pm-verticals' portfolio view | 2026-10-22 | quality-bar.md §2.1 | W-931 | Q3 sampling plan at the freeze |
| D-08 | **Evaluation steward's freeze on 10-23**: the bar frozen at the founder review, before tranche 2 is released | gate (evaluation-steward; founder accepts) | evaluation-steward | **2026-10-23** | quality-bar.md §2.1, §2.4 | W-919 (review), W-937 (on the 10-23 agenda) | tranche 2 (the build); AMD-FL-B and AMD-FL-C are written against it. After it, the bar only tightens (steward, after a SEV) or is waived per row (founder) |

### Gate 2: the rules the surfaces are built to (10-21 to 11-06)

| # | Waits on | Kind | Owner | Due | Source | Board | Blocks |
|---|---|---|---|---|---|---|---|
| D-09 | **W-906**: Surface Value amendment drafted (personalization, mastery, the ad slot) | amendment draft | evaluation-steward | **2026-10-21** | quality-bar.md §4 | W-906 | F-19 |
| D-10 | **W-906 ratified** (F-19) | founder ratification | founder | **2026-10-30 at the latest** | quality-bar.md §4.4 | W-906 (F-19) | if it slips: personalization and the ad slot ship **switched off**, and mastery ships only under today's "no streaks and no guilt" (a consequence of the constitution, not a quality call). AMD-FL-B encodes it |
| D-11 | F-17: whether to pursue ads, on these terms | founder decision | founder | before W-891 (no date set; proposed 10-23) | ads override note in status.json | W-891 (F-17) | the ads workstream; W-891 |
| D-12 | W-891: the ad-slot rules (1 per 6, never first, never next to a revisit) | product ruling | head-of-product | before **2026-10-30** | quality-bar.md board ask 4 | W-891, W-931 | W-906's ad text, AMD-FL-B's ad tests, Q1.9 |
| D-13 | F-08 personalization brief from the founder | founder brief | founder | none set (proposed 10-23, so the rule set can start) | W-091 | W-091 (F-08) | the personalization rule set |
| D-14 | AMD-FL-A (release-build QA, harness stamp W-783, `QA_SET=launch`) ratified | amendment | evaluation-steward; constitutional review | 2026-10-30 | quality-bar.md §1.7 | **no board item** (drafted after the budget) | Q1.1, Q1.3 evidence |
| D-15 | AMD-FL-B (surface contract) and AMD-FL-C (budgets, surface access) ratified, tests merged | amendment | evaluation-steward; constitutional review | **2026-11-06** | quality-bar.md §1.7 | **no board item** | Q1.4-Q1.9, Q5, the automated half of Q2. Needs D-10, D-12, the privacy rulings and agreed `data-testid`s |

### Gate 3: tier-2 design and readiness, before any account code

EDD-007: a tier-2 path (auth, the database, the event API, the deploy) ships only with a readiness record approved by principal-engineer-ops, and the engineer writes the record **before coding**. The budget pack puts an EDD, a PE review, a privacy data-model review and a readiness record for auth in tranche 1.

| # | Waits on | Kind | Owner | Due | Source | Board | Blocks |
|---|---|---|---|---|---|---|---|
| D-16 | **Auth and server-side progress EDD** (anonymous-first, history kept at sign-up) | EDD (tier 2) | backend-engineer; principal-engineer reviews | not estimated (tranche 1, so before 10-23 by the pack) | budget pack item 7 | **no board item** | all auth and progress code; mastery; account-keyed personalization; social |
| D-17 | **Privacy data-model review** of D-16 (which fields, consent, deletion, export) | privacy review | privacy-reviewer | before any table or event holding a learner id merges | pre-mortem row 3 | **no board item** | D-18; auth code |
| D-18 | **EDD-007 readiness records**, approved, for each tier-2 path: auth, database, event API (W-706), deploy | readiness | engineers write; principal-engineer-ops approves | before coding each path (EDD-007 proposal 3) | EDD-007 | W-706 (event API only); **no item for auth, DB or the production DB env** | every tier-2 merge; the readiness gate at go/no-go |
| D-19 | W-480 (G1): production deploys wait for green CI; drafts unreachable | engineering + founder (deploy-path half) | platform-engineer; founder | a go/no-go item (pre-mortem row 4) | R-003 | W-480 (review), W-884, W-945 (review) | launch day is a deploy; the readiness gate is advisory until it lands |
| D-20 | F-18: Vercel Pro (Hobby is non-commercial) | founder decision (money) | founder | before accounts or the ad slot reach production; the tech lead dates it in W-908 | FL-05 | W-893, W-908 (F-18) | the production database env; the ad slot |
| D-21 | EDD-003 stage 1 pilot (scale-stage-1) stays **off** the critical path | cross-org dependency (tracked, not owned) | principal-engineer | ongoing; its stop rule stops stage-1 work that blocks a go/no-go item | founder objection 1; FL-01 | W-727 | collides with D-05 if A1 becomes required: A1 is in scale-stage-1's tranche 1 |

### Gate 4: build, privacy rulings, freezes (11-09 to 11-20)

| # | Waits on | Kind | Owner | Due | Source | Board | Blocks |
|---|---|---|---|---|---|---|---|
| D-22 | **Privacy rulings by 11-09**: light social may ship; the ad slot (W-892: own-served card, consent, age signals); age-gate rules | privacy rulings | privacy-reviewer | **2026-11-09** | stop rule (tranche 2); quality-bar.md §2.1 | W-892; **no item for social or the age gate** | without a ruling, head-of-product cuts social and the ad slot to release 2 (their rows become "absent") |
| D-23 | Surfaces feature-complete on previews (auth, progress, personalization, mastery, social, ad slot) | build | the workstream owners | **2026-11-09** (implied by round 1 on 11-10; **not an estimate**) | quality-bar.md §2.1 | **no items** for mastery and social at all | round 1 reviews |
| D-24 | Reserved review slots: qa-tester, accessibility-reviewer, learner-evaluator, weeks of 11-09 and 11-16 | capacity (priority) | portfolio-manager | before 11-09 | quality-bar.md §3 | W-929 | round 1 (11-10 to 11-12) and the T-7 dry run; competes one for one with Wave J |
| D-25 | Surface walkthrough tool (borrowed minds see screens before any account) | tool | tools-lead (after the budget) | before 11-10 | quality-bar.md §3 need 4 | W-935 | Q4.1 independence (the qa-tester's screenshots stand in until then) |
| D-26 | **Launch catalog frozen** | scope | head-of-product | **2026-11-13** | quality-bar.md §1, §2.1 | W-931 | Q1.1, Q3; lessons published after it do not join |
| D-27 | **RC1 SHA** cut | release | release-manager | **2026-11-13** | quality-bar.md §2.1 | W-933 | the T-7 dry run |
| D-28 | No-build host window (or CI/preview runner) and the open SEV1/SEV2 list | ops | principal-engineer-ops | **11-16 and 11-23** | quality-bar.md board ask 7 | W-934 | full catalog QA runs (~1.2 h each); Q6.1 |
| D-29 | **T-7 dry run** on RC1; record by 11-17 | quality | evaluation-steward + team | **2026-11-16** | quality-bar.md §2.1 | W-919 | fixes before the final SHA |
| D-30 | Final release SHA | release | release-manager | **2026-11-20** | quality-bar.md §2.1 | W-933 | the verdict; fixes after it restart the rows they touch |
| D-31 | Domain: F-23 name, W-916 quotes, purchase after D-01 | founder decision + spend | vp-marketing; founder | proposed: decided by 10-30, bought and pointed before RC1 (11-13) | decision item 8 | W-916 (F-23) | the launch URL; legal pages and the narrative name it |
| D-32 | Launch metrics defined; events persist | analytics | analytics-steward; backend-engineer | before launch | charter; R-011 | W-706; **no item for the metrics** | the return measure in the budget pack |

### Gate 5: the go/no-go and the launch

| # | Waits on | Kind | Owner | Due | Source | Board | Blocks |
|---|---|---|---|---|---|---|---|
| D-33 | **Quality verdict** on the final SHA (go only if every row passes or is waived per row by the founder) | gate (key 1) | evaluation-steward | **2026-11-23** | Amendment 1; quality-bar.md §2.2 | W-919 | the go/no-go; a quality no-go stops the launch |
| D-34 | Launch-review record | review | head-of-product | before 2026-11-23 | role data | **no board item** | the recommendation |
| D-35 | Readiness gate (every tier-2 path approved) and privacy gate, as they stand | gates | principal-engineer-ops; privacy-reviewer | 2026-11-23 | quality-bar.md §2.6 | D-18, D-22 | the recommendation |
| D-36 | **Go/no-go recommendation** (scope, schedule, readiness, with the quality verdict verbatim) → **founder decides** | founder decision (key 2 is the founder's) | head-of-strategic-initiatives recommends; founder decides | **2026-11-23** | Amendment 1 | **no board item** | the launch |
| D-37 | Founder approval of the launch deploy; deployed SHA = verdict SHA | deploy | release-manager; founder | **2026-11-30** | CLAUDE.md (deploys); quality-bar.md §2.1 | **no board item** | launch; a new SEV1/SEV2 turns the verdict to no-go |

If the go/no-go moves at W-908, **the quality dates move with it**: the verdict moves to the new go/no-go, the dry run stays at T-7, and the freeze stays before the build (quality-bar.md §2.1). I propose such a move to the founder. The quality dates follow it, and I never ask for a verdict on a date that shortens the review the bar plans for.

## 2. The critical path

```
D-01 Project Review 1 (10-16)
  └─▶ D-03 F-01 + D-04 W-908 + D-08 bar freeze  ── all on 10-23 (tranche 2 released only if all three hold)
        └─▶ D-16 auth/progress EDD ─▶ PE review ─▶ D-17 privacy data-model review ─▶ D-18 EDD-007 readiness approved
              └─▶ auth + server-side progress build (pack: 8 code, 3 fix, 3 PE, 2 privacy, 1 readiness, 3 QA runs)
                    └─▶ mastery and account-keyed personalization build on server-side progress
                          └─▶ D-23 surfaces feature-complete on previews (11-09)
                                └─▶ round 1 reviews 11-10..12 (needs D-24 slots)
                                      └─▶ D-26 catalog freeze + D-27 RC1 (11-13)
                                            └─▶ D-29 T-7 dry run (11-16) ─▶ fixes ─▶ D-30 final SHA (11-20)
                                                  └─▶ D-33 quality verdict + D-36 go/no-go (11-23)
                                                        └─▶ D-37 founder-approved launch deploy (11-30)
```

**The binding segment is 10-23 → 11-09**: 17 calendar days for an EDD, three sequential reviews (PE, privacy, readiness) and the account build. Its duration is unknown until W-908. The work in it is cheap in tokens (the pack's whole auth line is 2.2M); what limits it is review: each review waits on the artifact before it, a rework round restarts the chain, and the reviewers in it (privacy-reviewer, principal-engineer-ops) have 0 and 3 measured runs. That is the first risk (risk-rescore.md, FL-06).

**Near-critical (about one week of slack each, if nothing slips):**
- D-09 → D-10 → D-15: W-906 drafted 10-21, ratified by 10-30, AMD-FL-B and -C merged 11-06. If W-906 slips past 10-30, personalization and the ad slot ship switched off.
- D-22 privacy rulings by 11-09: no ruling means social and the ad slot are cut. The privacy reviewer also sits on the main path (D-17), so the two compete for the same role.

**Conditional (decided on 10-22):** D-05. If the tech lead answers W-930 "yes, but only with A1", the all-metas fix becomes a second critical path: A1 needs AMD-001 (c2) (F-03, open since 10-12) and must merge before RC1 on 11-13. It also pulls EDD-003 stage-1 work onto the path the founder kept it off (D-21). If he answers "not reachable", the founder must lower Q5 **before the freeze**, in writing, or accept a quality no-go on Q5.

**Founder decisions on the path:** F-15 (10-16), F-01 (10-23), F-19 (10-30), and the go/no-go and deploy. F-17, F-18, F-23 and F-08 are off the path only if they are made by the proposed dates above.

## 3. What has no owner or no board item yet (asked under "Board asks" in the stand-up of 2026-10-15)

- The auth and progress EDD (D-16), the privacy data-model review (D-17), and readiness records for auth, the database and the production DB env (D-18).
- Any board item for mastery or light social. Their owners also differ between status.json (mastery: learner-model-engineer; social: growth-designer) and the budget pack (mastery: growth-designer and platform-engineer; personalization: learner-model-engineer and personalization-lead). Head-of-product names the owners; I do not.
- Privacy rulings on social and the age gate (D-22), AMD-FL-A/B/C (D-14, D-15), launch metrics (D-32), the launch-review record (D-34), the go/no-go recommendation (D-36) and the launch deploy (D-37).
