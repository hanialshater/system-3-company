# First Light: the fastest credible path to the release milestone (F-43)

owner: head-of-strategic-initiatives (Beatriz) · date: 2026-10-16 (evening) · board: W-1469 (this), W-1122 (date and cut-order proposal, answered here), W-1165 (go-live conditions, planned here) · slot: hsi-f43-fast-path · budget: `[project:first-light]`, tranche 1
status: **proposal**. Every cut below is proposed to head-of-product, who decides scope in a record, and to the founder, who restored the ad slot and richer social on 10-15 and so has to say the word to move them. Every date move is proposed to the founder. Nothing here is decided, dispatched, verified or deployed.
inputs: [F-43](../../decisions/2026-10-16-founder-first-light-t1-topup-2.md), [charter](charter.md), [status.json](status.json) (not edited; changes proposed in section 8), [dependencies.md](dependencies.md), [the tech lead's full-scope re-estimate](../../engineering/notes/2026-10-16-first-light-reestimate-full-scope.md) (W-1121, "the full-scope note") and [the 10-15 re-estimate](../../engineering/notes/2026-10-15-first-light-reestimate.md) §2 (unit costs), [release-1 scope record](../../decisions/2026-10-15-first-light-release-1-scope.md), [founder: ads and social back](../../decisions/2026-10-15-founder-first-light-ads-social-back.md), [privacy review of EDD-008](../../reviews/_privacy/2026-10-16-edd-008-accounts.md) (M1 to M6, G1 to G6), [privacy-gate.md](privacy-gate.md) P7, [quality-bar.md](quality-bar.md) §2.1 to §2.5, [round 3](dispatch/2026-10-16-round-3.md), [portfolio r6](../../ops/dispatch-requests/2026-10-16-r6-portfolio.md) §P2, `node tools/ledger.mjs report --project=first-light` (10-16), board.json and founder-inbox.json as read on 10-16.

This file is a builders' account. It never goes into an evaluator's brief (company/reviews/README.md), and it marks no quality row met, waived or out of scope.

**What the founder asked for.** "I want to reach milestone deploy so I can start personalization or ads" (F-43). I read **the release milestone** as: *the first production deploy with accounts switched on for real learners*: sign-up that keeps anonymous history, progress that follows the learner, the legal basics, and the gates passed. Production already exists for the anonymous feed (release log entry 2026.10.15.1), so this is not the first deploy. It is the first one with `ACCOUNTS_ENABLED` on. The founder's sentence puts personalization and ads **after** that deploy. The charter puts them **inside** release 1. That gap is the main proposal of this file (section 1), and the founder has to close it.

## Short answer

1. **Release-critical (keep):** accounts with history kept, server-side progress, legal basics, infra and readiness (`fra1`, the production database, the kill switch, the deploy guard), the domain, the launch catalog, share links, and mastery state. **After the milestone (proposed cuts):** the prediction swap, the ad slot, challenges, and rule-based personalization.
2. **Milestone date: launch 2026-11-30, go/no-go 2026-11-23, unchanged.** The cuts buy odds, not days. On the tech lead's figures, cutting the swap and the ad slot now puts the 11-23 go/no-go at **about 65%**, up from about 50%. He has not estimated the further cuts or the launch at this scope, so I add nothing for them. My own confidence that accounts are live in production on 11-30 is **medium**. No earlier date is credible today, because the long poles are counsel, review and the quality plan, not code (section 2).
3. **Spend:** tranche 1 (6.59M) reaches the **10-23 checkpoint** only if First Light spends **about 0.37M a day** from 10-17, against about 1.9M a day today. That means holding all build scope except the accounts merge chain. Past 10-23, the milestone scope needs **about 13.2M in tranche 2** (14.6M with the tech lead's run-count error), against the 8.17M approved. That is **about 5.0M more (up to 6.4M)**. The founder decides it at the 10-23 checkpoint (F-34, the stop-rule re-base), and it is drawn from about **11-09** (section 3).
4. **Can start now, in parallel, off the path:** a draft of the personalization brief for the founder to correct (F-08), a house-cards-only ads policy draft with the F-17 packet, the W-706 events-storage design and readiness record (no build before the accounts merge), the launch and stage-0 baseline metrics, and the domain shortlist (section 4).
5. **Founder decisions on the critical path:** the milestone-scope decision (new, to be filed), the `fra1` deploy-config and preview approval (new id needed, by **10-22**), **F-34** (10-23), the bar and gate acceptance at the 10-23 review, **F-25** (counsel, 10-30), **F-23** (domain, 10-30), **F-18** (Vercel Pro, before RC1 11-13), then the 11-23 go/no-go and the 11-30 deploy approval (section 5).

## 1. The minimum set for the milestone deploy

**Test applied to each workstream:** does the first accounts-on production deploy fail, or fail a gate, without it? If yes, it is release-critical. If it only adds a surface, it can follow.

### 1.1 Release-critical

| Workstream | Why it cannot follow | Board | Tech lead's date and odds (not mine) |
|---|---|---|---|
| **Accounts, anonymous-first, history kept** (EDD-008) | It is the milestone | W-1008, W-964, W-1164, W-1165, W-966 | EDD-008 approved **10-28, about 75%** if the merge-chain runs get slots by 10-22 (full-scope note §7). Feature-complete on a preview **11-06** (10-15 note §3) |
| **Server-side progress** | "Progress that follows the learner" is what an account is for. Q1.4 and Q1.5 test it | as above | as above |
| **Legal basics**: policy, terms, the age gate with teen mode (F-01, F-24) | Privacy gate P7.2 needs a lawyer-reviewed policy at RC1. G1 (DPAs) and G5 (data inventory) must hold before a real learner's email is taken | W-1166, W-1167, W-1123, W-932 | Not an engineering date. Counsel is F-25 |
| **Infra and readiness**: `fra1` for the account routes (G3), a separate production database (W-1142), the kill switch runbook (W-1150), telemetry unset (G4), A1 (on main, 0d76ae1) | EDD-007: a tier-2 path ships only with an approved readiness record. Without `fra1`, §10 of EDD-008 is not true | W-1149, W-1150, W-1142, W-966 | `fra1` latest start **10-22**, and it needs the founder (full-scope note §6) |
| **Deploy guard**: production waits for green CI, drafts 404 (W-480, W-884, W-945) | R-003: launch day is a deploy. Q1.3 checks that the catalog holds | W-480, W-884, W-945 (all in review) | No date given. Asked in section 6 |
| **Domain and brand** (F-23) | Production sign-in mail needs a sending domain (Resend's shared sender reaches only the account owner), and G2's tracking-off evidence is a setting on that domain. The policy names it | W-905, W-916 | Not engineering. Bought and pointed by about 11-06 (10-15 note §3) |
| **Launch catalog**, frozen 11-13 | Q1.1, Q1.3 and Q3 run over it | W-931 | head-of-product's |
| **Share links** (P4.2) | Not strictly needed for accounts, but kept: in flight now (round 3 B1), no stored data, tier 1, the release's social in every case (scope Ruling 2) | W-1211 | about 85% |
| **Mastery state** (EDD-009 part 1) | Not strictly needed for accounts either. Kept because the tech lead lists it as never cut, part 1 is approved with conditions (2ba7398), and it rides on the progress shape EDD-008 is already building | W-1132 | part 1 approved **10-30, about 65%** |

### 1.2 After the milestone (proposed cuts, each with its risk)

Head-of-product decides each cut in a record. Where the founder overruled her on 10-15 (the ad slot, the swap), the founder has to say it first. A cut turns that surface's quality rows into the bar's single "absent or switched off in the release build" check. That is a scope cut, not a waiver (quality-bar.md, "Cut surfaces").

| # | Cut | What it frees (tech lead's figures) | Risk of the cut | Risk of not cutting |
|---|---|---|---|---|
| C1 | **Prediction swap (PRD-003) → release 2** | 1.27M engineering, about 9 quality runs (about 1.4M), 3 privacy runs, 2 PE reviews, 5 builder runs in the 10-28 week; F-26 and the "light social" question leave the path | Reverses part of the founder's 10-15 restore. Social at the milestone is share links only. PRD-003 and its conformance work wait. Sunk cost is small, because W-1131 has not started | About 7% that it ships at all (full-scope note §4). It is built on accounts and competes with them for the same week, builder and reviewers |
| C2 | **Ad slot (house cards) → after the milestone** | 0.53M engineering, about 1.4M quality, W-892's ruling, W-893, W-894 and F-17, F-19 and F-20 leave the path | Reverses the founder's 10-15 restore. The slot's experiment starts later, which is mitigated by the analytics steward's stage-0 baseline measured from launch (scope Ruling 3, objection 4). The cost moves, it is not removed: the slot later needs its own quality pass (Q1.9, Q2, Q4) and a founder-approved deploy | About 30%. It earns $0 at launch either way |
| C3 | **Challenges (PRD-004) → after the milestone** | About 0.40M engineering, 4 builder runs, part of the Q1.7 pairwise review, and the 10-31 experiment registration leaves the path | Half of the charter's "mastery and challenges" line is missing at launch. Low technical risk. **Alternative:** keep them under the pre-declared 11-06 line, which already ruled this cut in advance | About 45%. It takes builder slots in the week the tech lead says does not fit |
| C4 | **Rule-based personalization → after the milestone** | 0.85M engineering, EDD-009 part 2, the personalization PE code review, the Q1.6 surface spec and the feed.spec rewrite inside AMD-FL-B. F-08 and F-19 leave the path | The charter goal names it, so the goal line changes (founder). The tech lead's rule "personalization is never cut by hand" is about a mid-build cut. This is a scope decision before the build, so it is a different act, but I have put it to him as an objection (below). Later it comes back through F-19, EDD-009 part 2 and its own quality rows. **Gain:** the rules get written against real learner data (W-706), and the founder's own sentence already puts personalization after the milestone | About 50%, and it switches itself off if F-19 misses 10-30 (quality-bar §4) |

**Further cuts I do not propose:** mastery state, because it is on the tech lead's never-cut list, and share links, which are cheap and in flight. If mastery is not feature-complete on a preview by 11-06, that becomes head-of-product's call on the day, not mine.

**What the cuts do to the binding constraint** (full-scope note §3, the fortnight 10-26 to 11-09). Builder runs fall from about 33 to about 16 to 17 (auth and progress UI about 10, mastery about 3 to 4, share links 3). PE reviews fall from about 11 to about 6. Privacy runs fall from about 9 to about 5, all of them on or beside the accounts path. After the cuts, the path runs through **review, counsel and founder decisions**, not builder slots. That is why the date holds but does not move earlier.

**What it does to the charter.** If the founder accepts C2 and C4, the goal line in charter.md changes to the milestone scope, and end condition (a), the launch deploy, becomes the accounts milestone. I propose that **personalization and ads then become their own chartered initiatives** (owners personalization-lead and vp-marketing, each with a budget from the portfolio-manager and an end), rather than keeping First Light open after its deploy. I draft the charter change only after the founder's word. The evaluation steward is consulted before either new charter, because each carries a gate.

## 2. The milestone date, against go/no-go 11-23 and launch 11-30

| | Date | Whose date | Confidence |
|---|---|---|---|
| EDD-008 approved (slip-rule date) | 10-28 | tech lead | about 75% (full-scope note §7) |
| Accounts and progress feature-complete on a preview | 11-06 | tech lead | not given separately |
| Privacy rulings; surfaces without one are absent | 11-09 | privacy gate / bar §2.1 | not mine |
| RC1 and catalog freeze; lawyer-reviewed policy read (P7.2) | 11-13 | bar §2.1 / privacy gate | depends on F-25 |
| T-7 dry run | 11-16 | bar §2.1 | not mine |
| **Go/no-go and quality verdict** | **11-23** | charter; bar §2.1 | **about 65%** if C1 and C2 are taken now (tech lead, §4 "swap and the ad slot cut now"). C3 and C4 are not in his estimate, and I add nothing for them |
| **Milestone: founder-approved accounts-on production deploy** | **11-30** | charter | **Medium.** The tech lead has not estimated launch at this scope (at full scope he put launch about 5 points under go/no-go). My own reading, not an engineering figure, is that the founder-side items (F-25 counsel, F-23 domain, F-18 Pro, the `fra1` approval) carry as much risk as the code |

**Slip rule (unchanged, tech lead's).** If EDD-008 is not approved by 10-28, go/no-go moves by the same number of days. The verdict moves with it, the dry run stays at T-7 and the freeze stays before the build (bar §2.1). I bring any move to the founder in writing on the day it triggers.

**Why not earlier.** The founder wants speed, so I tested a pull-in. A go/no-go about a week earlier would need all three of these, and none is on disk:
- (a) the tech lead re-estimating feature-complete at the milestone scope to well before 11-06 (he has not been asked; section 6, ask 1);
- (b) the evaluation steward saying her plan still fits: AMD-FL-B and AMD-FL-C ratified, round 1, RC1 and the T-7 dry run all a week earlier, with no review shortened. Her dates are hers, and I do not ask for a shorter review;
- (c) counsel engaged now and the policy read by an earlier RC1. F-25 is not engaged.

I do not publish that date. If (a) and (b) come back yes by the 10-23 review, I bring it then as a proposal, with (c) as the founder's condition.

## 3. Spend plan

### 3.1 Tranche 1 (6.59M, to the 10-23 checkpoint)

**Position.** About 3.03M was spent to 14:03Z on 10-16 (portfolio r6 §P2; the ledger shows 3.0M to 14:23Z). That leaves **about 3.56M**. Runs after 14:23Z are not in the ledger. Round 3 (B1 to B4, about 0.54M budgeted) and round 2's beacon run are in flight, so I hold **about 0.7M as already committed** (my estimate). That leaves **about 2.86M for 10-17 to 10-23**, or about 0.41M a day. At today's 1.9M a day, tranche 1 is gone on about 10-18.

**Plan: about 0.37M a day (2.62M over 7 days), release-critical only** (unit costs from the 10-15 note §2; run counts are my plan, the tokens are estimates):

| Work, 10-17 to 10-23 | Runs | Tokens |
|---|---|---|
| Accounts merge chain: A-13 rebase and verify (chief of staff), privacy read of A-6, readiness approval for merge (with A-17 test 31), the PE merge pass and EDD-008 approval, one backend fix run if needed | 6 | 0.50M |
| `fra1` (round 3 B5) after the founder's approval, the proof preview (release-manager), W-1150 runbook text, privacy G3 read | 4 | 0.22M |
| EDD-009 part 1: M-1 to M-4 (learner-model-engineer), privacy §5 confirmation, pedagogy-critic Q1 and Q3 | 3 | 0.24M |
| Legal: data inventory (W-1166), policy and terms draft ready for counsel | 2 | 0.23M |
| Deploy guard reads (W-480, W-884, W-945) | 2 | 0.15M |
| Quality: what the evaluation steward needs for the 10-23 freeze (her runs, her sizing) | 2 | 0.20M |
| Tech lead's milestone-scope re-estimate (section 6, ask 1); portfolio-manager's T2 re-base and the 80% forecast | 2 | 0.17M |
| Jour fixe (stand-ups 10-19 and 10-22, founder review 10-23) and lane rounds | 6 | 0.50M |
| Parallel starts, docs only (section 4) | 5 | 0.41M |
| **Total** | **32** | **about 2.62M** |
| Reserve | | **about 0.24M** |

**Held to tranche 2, or dropped if the cuts are taken:** the W-1131 swap EDD (0.37M), W-893 and W-894 ad-slot work, the challenges build, EDD-009 part 2, and every accounts UI build run (these start after EDD-008 approval on 10-28 anyway). **If the reserve goes,** the parallel starts are dropped first, then the deploy-guard reads move to 10-26. The merge chain is never dropped.

**Verdict:** tranche 1 stays inside 6.59M to 10-23 **on this throttle**. No further top-up is needed for tranche 1. Confidence: medium, because of the ±0.7M of in-flight spend nobody has measured. `node tools/events.mjs backfill` plus `ledger.mjs import` (chief of staff) settles it before 10-19.

### 3.2 Tranche 2 (10-23 to 11-30) at the milestone scope

| Line | Full scope (tech lead) | Milestone scope (C1 to C4) | Source |
|---|---|---|---|
| Auth and progress | 2.46M | 2.46M | full-scope note §2 |
| Infra and readiness (incl. `fra1`) | 1.54M | 1.54M | same |
| Legal basics | 0.29M | 0.29M | 10-15 note §2 |
| Mastery state (without challenges) | 1.04M with challenges | 0.64M | 10-15 note §2 |
| Share links | 0.50M | 0.50M | same |
| Personalization | 0.85M | 0 (after the milestone) | same |
| Ad slot | 0.53M | 0 | same |
| Prediction swap | 1.27M | 0 | full-scope note §2 |
| **Engineering** | **about 8.5M** | **about 5.43M** (6.8M with the 1.25x error) | |
| Cadence line | 1.49M | 1.49M | 10-15 note §2 |
| Quality line | about 9.2M | **about 6.3M**, the steward's own minimum (about 9.2M less 1.4M for the swap and 1.4M for the slot). **The steward sizes it, not me** | W-929; full-scope note §2 |
| **Tranche 2** | **about 19.2M** | **about 13.2M** (14.6M with the error) | |

**The shortfall.** 13.2M against the 8.17M approved is **about 5.0M more** (6.4M at the high end). The program total becomes about **19.8M** (6.59M plus 13.2M), against the 11.76M stop rule. Against full scope, the cuts save about 6M.

**When it is needed.** The decision is needed at the **10-23 checkpoint** (F-34), because the stop rule trips that day on any of these figures, and tranche 2 is not released without a re-base. The money is drawn later. The 8.17M covers the build window (10-23 to about 11-09: about 4.5M engineering, 0.7M cadence and about 1.5M of quality preparation, AMD-FL-A, B and C), and it runs out at about **11-09 to 11-11**, just as round 1 starts. The extra 5.0M pays for round 1, the dry run, the verdict and launch week. Spend after the milestone (personalization, ads, the swap) is not in this figure. Each one comes as its own proposal.

**80% forecast (token-budget.md §4), for the portfolio-manager's record.** First Light passed 80% of its original tranche 1 on 10-16. Return so far: F-01 decided, SPIKE-002's local part, the EDD-008 privacy review and its M1 to M6 re-read (merge with accounts off: yes), A1 on main, EDD-009 part 1 reviewed, PRD-003 and PRD-004 written. Still needed to 10-23: about 2.62M plus about 0.24M in reserve. Recommendation: **continue, throttled** (3.1). No bridge from tranche 2 is needed before 10-23.

## 4. What can start in parallel now

None of these sits on the accounts path, none needs a builder slot, and none uses the privacy reviewer before the 11-09 rulings, except where marked. The chief of staff dispatches them. I do not.

| Start | Owner | What, exactly | Cost | Why now, and the guard |
|---|---|---|---|---|
| **Personalization brief, draft for the founder** | personalization-lead | From company/personalization/README.md's questions: a one-page draft of what rule-based personalization is for, for the founder to correct, so that F-08 becomes an edit rather than a blank page. EDD-009 part 2 stays queued behind it | about 0.05M | It is the first thing personalization needs after the milestone. It writes no code and makes no rule |
| **Ads policy draft, house cards only** | vp-marketing, with head-of-product on Ruling 3 | The stage-1 house-card policy (the Ruling 3 rules, teen mode house cards only, never on lesson pages, 1 in 6 as a ceiling), bundled with the F-17 to F-20 packet (W-1126) | about 0.1M | Ads can start the day after the milestone. W-892 (privacy) and W-893 (PE) wait until after RC1, so they do not touch the reviewers on the path |
| **W-706 events storage: design and readiness record** | backend-engineer | The EDD-007 readiness record and the design for persisting the allow-listed events (after W-999, in review). **No build before the accounts merge.** It is built only if a builder slot is free after 10-28 and the merge has landed | about 0.11M now (the build later is about 0.6M, my estimate, not the tech lead's) | It is the data personalization needs (R-011). Guard: backend-engineer is the critical-path builder, so this starts only after round 3 B2 and B4 have reported |
| **Launch metrics and stage-0 baseline** | analytics-steward | W-969 (accounts created, history kept at sign-up, 7-day return) and the stage-0 baseline metrics the ads experiment will need (scope Ruling 3, objection 4). If C1 and C3 are taken, W-1214 shrinks to nothing | about 0.1M | They have to exist before launch (charter). Most can be read from the server progress tables, with no new event |
| **Domain shortlist with priced quotes** | vp-marketing | W-916, for F-23 | about 0.05M | It is on the path (section 5). It has been in backlog since 10-15 |

## 5. Founder decisions on the critical path

In the order they are needed. Two items have no F-id yet, and the chief of staff files them.

| Decision | Needed by | What waits on it |
|---|---|---|
| **(new, to be filed) Milestone scope:** accept C1 to C4 (the swap, the ad slot, challenges and personalization after the milestone), with the charter goal and end condition changed to the accounts milestone | **10-19** is best (before W-1131's latest start, 10-27, and before tranche 2); **10-23** at the latest | head-of-product's record of the cuts; the evaluation steward's "absent" rows before the freeze; the 13.2M figure. If no: full scope at the tech lead's odds (go/no-go about 50%, launch about 45%) and T2 about 19.2M |
| **(new, from round 3 B5) `fra1`:** approve the `vercel.json` option C on branch `accounts`, plus one accounts-off proof preview | **10-22** (tech lead's latest start) | G3, the SPIKE-002 preview part, A-9's deletion check, A-10, and any accounts-on preview |
| **F-34:** the tranche-2 re-base and the stop rule | **10-23** | tranche 2 itself. The stop rule trips that day without it (section 3.2) |
| **Bar and gate acceptance** at the 10-23 review (W-937), and the P1.8 idle-notice amendment (W-1167) | **10-23** | the build. The freeze stays before the build. Either answer to P1.8 works, but the policy text needs one before counsel reads it |
| **F-25:** engage counsel | **10-30** | G1 (the three DPAs, so P1.7), P7.2 (lawyer-reviewed policy at RC1, 11-13), Art. 8 by 11-09. **This is the longest outside pole** |
| **F-23:** domain and brand name | **10-30**, bought and pointed by about 11-06 | production sign-in mail, G2 (the founder reads Resend tracking off on the sending domain), the policy text |
| **F-18:** Vercel Pro (Hobby is non-commercial; the terms are unread from this host) | before accounts reach production, so by **RC1 (11-13)** | the production database env (W-1142), and the founder's own Neon production project connected to Production only |
| **Go/no-go** (D-36) | **11-23** | the deploy. My recommendation will carry the quality verdict verbatim. I do not recommend go over a quality no-go |
| **Deploy approval** for the milestone, and for any RC preview the release-manager asks for | **11-30** | the milestone |

**Off the path at the milestone scope** (still the founder's, on their own dates): F-17, F-19, F-20 (ads), F-26 and the "light social" question (the swap), F-08 (personalization brief), F-22. If the founder declines C4, F-08 and F-19 (by 10-30) go back on the path. If he declines C2, F-17 (by 10-23) goes back on it. **Not founder:** F-43's co-approval by one PE is still owed (principal-engineer-ops, board). **Likely stale:** F-04 ("Deploy to Vercel: when, and connect your account") is open in the inbox, but production exists (r7, release 2026.10.15.1). The chief of staff closes it or restates it.

## 6. Asks (for the chief of staff to file and dispatch; I wrote no board item)

1. **principal-engineer:** re-estimate at the milestone scope (C1 to C4): the feature-complete date, the go/no-go and launch odds, and whether the deploy guard (W-480, W-884, W-945) is on time. By the **10-22** stand-up. Also: answer objection O3 below.
2. **head-of-product:** rule on C1 to C4 in a record after the founder's word on C1 and C2. C3 and C4 can be ruled directly, and I propose that she does.
3. **evaluation-steward (consulted):** whether the milestone scope changes any bar date or the quality line (I have used her 6.3M minimum as a placeholder), and the "absent" rows for whatever is cut, before the 10-23 freeze. Sent as artifacts only: the scope record, not this file.
4. **portfolio-manager:** the T2 re-base at about 13.2M (14.6M high) for F-34; record the 80% forecast in 3.2; and the throttle as lane 4's order through 10-23.
5. **chief-of-staff:** file the two new founder items in section 5; run `events.mjs backfill` and `ledger.mjs import` before 10-19; hold lane 4 to the section 3.1 list; dispatch the parallel starts in section 4 when slots allow; check F-04.
6. **vp-marketing:** W-916 now; the house-card policy draft with the W-1126 packet.
7. **personalization-lead:** the brief draft for F-08. **backend-engineer:** W-706's design and readiness record after round 3 B2 and B4. **analytics-steward:** W-969 and the stage-0 baseline.

## 7. Quality, as it stands

Quoted verbatim from company/initiatives/first-light/quality-bar.md (SHA c947d09), the evaluation steward's latest dated status line: "status: **proposed, 2026-10-15** (week-1 scoping, untagged). Open for objections until the freeze on **2026-10-23**. After that it changes only as described in section 2.4."

## 8. Proposed status.json changes (I did not edit status.json)

- `dates.note`: add "F-43 (10-16): tranche 1 is 6.59M. The fast path (this file) keeps go/no-go 11-23 and launch 11-30. If the swap and the ad slot are cut now, the tech lead puts go/no-go at about 65%. The milestone is the first accounts-on production deploy."
- `founder_decisions`: add F-43 (decided), F-34 (10-23, T2 re-base), and the two new items from section 5 once they have ids. Move F-17, F-19, F-26 and F-08 to "off the path if C1 to C4 are accepted".
- Workstreams `social`, `ads`, `mastery` (challenges half) and `personalization`: `next` gains "proposed after the milestone (fast-path C1 to C4); head-of-product's record and the founder's word pending". No override until those records exist.
- `budget.next`: "Tranche 1 throttled to about 0.37M a day to 10-23 (fast path §3.1). Tranche 2 at the milestone scope is about 13.2M against 8.17M approved."
- `risks`: re-score FL-02 at the Friday re-score. The cuts move the binding constraint from builders to review and counsel (FL-06, R-007, R-013).

## Objections

| # | Objection | Raised by | Answer / status |
|---|---|---|---|
| O1 | The founder restored the ad slot and richer social on 10-15 ("Yes i want these back"). Proposing to cut them again reverses his decision | head-of-strategic-initiatives, against this file (from company/decisions/2026-10-15-founder-first-light-ads-social-back.md) | **Open, the founder's.** Nothing is cut here. His 10-16 sentence puts ads after the milestone, and I read that as a new instruction. That reading is flagged for him to confirm or correct, in the new scope item (section 5) |
| O2 | Removing personalization and ads from release 1 changes the charter's goal, so this is a re-charter, not a cut | head-of-strategic-initiatives | **Open.** I draft the charter change only after the founder's word. I propose separate charters for personalization and ads, each with its own end, so that First Light still ends at its deploy |
| O3 | "Personalization is never cut by hand. It switches off if W-906 or F-19 misses" (full-scope note §5). C4 cuts it by hand | principal-engineer (his rule, applied to C4 by me) | **Open, to the tech lead (ask 1).** My reading is that his rule bars cutting it during the build to save the date. C4 is a scope decision before the build, made by head-of-product with the founder's word. If he reads it otherwise, C4 falls back to his rule, and personalization ships only if F-08 and F-19 land |
| O4 | The cuts do not bring the date earlier, so "fastest" is the existing date | founder's purpose (F-43) | **Accepted as the honest answer.** The cuts buy odds (about 50% to about 65% on go/no-go), not days. The only pull-in I can see needs the tech lead's re-estimate, the steward's confirmation and counsel, none of which exists yet (section 2). I will not publish a date the tech lead has not estimated |
| O5 | Deferring the ad slot and personalization defers their cost rather than removing it: each one later needs its own quality pass and its own founder-approved deploy | head-of-strategic-initiatives | **Accepted as a cost.** About 0.85M plus 0.53M of engineering, plus their quality rows, move into their own proposals. They are not in the 13.2M |
| O6 | A throttle to 0.35M a day starves work that is in flight | portfolio-manager (r6 §P2: throttle or bridge) | **Answered by the list.** The throttle holds build scope that is not on the path. The merge chain is first and is never dropped, and the parallel starts are dropped first if the reserve goes. No bridge before 10-23 |
| O7 | The tranche-1 position is uncertain by about ±0.7M. Runs after 14:23Z are unmeasured | portfolio-manager | **Open** until the chief of staff's backfill and import (ask 5). If the true figure is worse, the parallel starts are dropped before anything else |
| O8 | The 6.3M quality figure is the evaluation steward's minimum, not a figure sized for the milestone scope | head-of-strategic-initiatives | **Open, the steward's (ask 3).** It is a placeholder. The 5.0M shortfall moves by whatever she says |
| O9 | The W-706 design run uses backend-engineer, who is the critical-path builder | head-of-strategic-initiatives | **Guarded.** It starts only after round 3 B2 and B4 have reported, it is design only, and it is built only after the accounts merge, in a free slot |
| O10 | No PE has co-approved F-38 or F-43 (token-budget.md §4) | portfolio-manager (F-43 record) | **Open,** with principal-engineer-ops on the board. This plan spends only inside the 6.59M the founder named |
| O11 | Keeping mastery state and share links is not the strict minimum for "accounts work" | head-of-strategic-initiatives | **Held.** Mastery is on the tech lead's never-cut list, and its part 1 is nearly approved. Share links are in flight, tier 1 and cheap. Either one can still be cut by head-of-product on 11-06 if it is not feature-complete, without moving the date |

## What would make this file wrong

- The founder meant that the milestone *is* the full release with personalization and ads. Then C2 and C4 are dropped, F-08, F-19 and F-17 go back on the path, and tranche 2 returns toward 19.2M.
- EDD-008 misses 10-28. Then go/no-go moves day for day under the slip rule, and so does every quality date.
- Counsel (F-25) is not engaged by 10-30. Then P7.2 cannot pass at RC1, and the milestone moves by however long counsel takes. That is outside the company's control, and it is the most likely cause of a slip on this path.
