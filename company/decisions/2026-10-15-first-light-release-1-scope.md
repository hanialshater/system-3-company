# Decision: First Light release 1 scope. The ad slot moves to release 2, social is share-a-lesson only, the ad-slot rules for release 2 are set, and the surfaces have named owners

owner: head-of-product (Priya). Product scope inside the initiative is head-of-product's (founder decision 2026-10-15-founder-first-light, item 2). Dates, dependencies and cadence stay with head-of-strategic-initiatives.
date: 2026-10-15
status: decided (scope cut, social, owners). The ad-slot rules (W-891) are decided **for release 2, if the founder proceeds on F-17**. Nothing here ratifies AMD-008 or changes Surface Value, which stay the founder's.
class: product
route: principal-engineer (re-estimate, W-908) → privacy-reviewer (privacy gate §5, E6) → head-of-product (this record) → head-of-strategic-initiatives (dates, dependencies.md, status.json) → evaluation-steward (quality bar "Cut surfaces") → portfolio-manager (re-base T2) → chief-of-staff (board)
recorded by: head-of-product
board: W-1009 (cut scope), W-1002 (social), W-891 (ad-slot rules), W-967 (owners)
inputs: `company/engineering/notes/2026-10-15-first-light-reestimate.md` (Kenji); `company/initiatives/first-light/privacy-gate.md` §4-§5, P2.3, P4; `company/initiatives/first-light/quality-bar.md` ("Cut surfaces", Q1.6, Q1.7); `company/initiatives/first-light/dependencies.md` §3; `company/initiatives/first-light/status.json`; `company/marketing/2026-10-15-monetization-ads-proposal.md`; founder decision `2026-10-15-founder-first-light.md`.

## What the founder said, and what is left to the owners

> "Ads may slip to release 2." (founder decision 2026-10-15, item 4). Scope item 5 lists "light social" and "ads (on the terms in company/marketing/2026-10-15-monetization-ads-proposal.md)".

- **Decided by the founder (whether):** First Light ships, on 2026-11-23 (go/no-go) and 2026-11-30 (launch), re-estimated in week 1. Its scope includes light social. Ads may slip to release 2.
- **Left to the owners (how):** what "light" social means and whether a surface is cut to release 2 (head-of-product: quality bar "Cut surfaces"; privacy gate §5.1); dates (head-of-strategic-initiatives); budget (portfolio-manager).

## Ruling 1 (W-1009): the ad slot moves to release 2, now

The ad slot (stage 0 preconditions and stage 1 house cards) is **not in release 1**. In the release build it is absent. Its quality rows become one check, "the surface is absent or switched off in the release build" (quality bar "Cut surfaces"). This is a scope cut, not a waiver.

Why now and not at the 11-09 stop rule:
- The founder allowed exactly this slip.
- It earns $0 at launch. Stage 1 carries house cards only (ads proposal, stages table).
- It brings four founder decisions (F-17 to F-20), W-891, a privacy ruling and about 0.53M engineering plus about 1.4M quality runs into a four-week window whose critical path runs through decisions and reviews, not code (re-estimate §2-§3).
- On the tech lead's figures the dates hold at **about 60%** with this cut and share-link social, against **about 25%** at full scope. That gap is the largest any single product choice in this window buys.

What does not move: F-18 (Vercel Pro) still has to be read and decided before launch. The re-estimate §4 says cutting the slot does not settle whether the release counts as commercial use. AMD-008 can still be ratified as written. Its ad-slot clauses would then govern release 2, and ratifying the amendment is the founder's call, not mine.

## Ruling 2 (W-1002 and W-1009): social in release 1 is "share a lesson" only

**Release 1 social is privacy gate row P4.2 and nothing else:** a link to a lesson, or the device share sheet. There is no tracking parameter, no learner id, no name and no progress in the link, and opening it creates no server record. There is one static OG image (no per-lesson images; re-estimate §2). Anything that stores or shows one learner's data to another, or accepts text, images or names from a learner (friends, follows, reactions, leaderboards, comments, profiles), is **cut to release 2**.

**W-1002 is answered: cut (beyond share-a-lesson), not "keep with the 5.3 minimums".** Reasons:
1. **There is no named human moderator.** 5.3 item 8 and P4.3 need one who can act within 24 hours, plus a second as cover. The company is agents, and no record names such a person. A report button that nobody reads is worse than no social (privacy gate §5.1, reason 1).
2. **Time.** Stored social data is tier 2 with its own EDD and "does not fit 11-30" (re-estimate §2). It also costs about 9 quality runs and 3 more privacy runs (privacy gate §5.1 and the run plan: 13 runs with social cut, 16 with it kept).
3. **It is not what makes release 1 work.** The founder's word is "light". A share link covers a learner telling a friend. AMD-008 already bars leaderboards and comparison.

Share-a-lesson is "not social" under privacy gate §5.2, so it is open to every age band that can see the feed, including teen mode (P2.3 bars "social surface" and user text, which a share link is not). The privacy reviewer reads P4.2 on the release SHA. If P4.2 fails, the share link is cut too and social is absent from release 1.

**For release 2, social beyond share links needs all of:** every 5.3 minimum evidenced; a named human moderator and cover, **named by the founder**; its own tier-2 EDD; a PRD from growth-designer with a committed prediction about learning, not about shares or return visits; and P2.3 (no social for ages 13 to 15) unchanged.

## Ruling 3 (W-891): the ad-slot rules, for release 2 if the founder proceeds on F-17

I accept the proposal's rules 1-8 (ads proposal, "The rules I propose") as product rules, with these changes:
- **Rule 6, the cap:** 1 ad card per 6 lessons is a **ceiling**, not a starting value. The registered experiment may lower it. Raising it needs a new head-of-product decision and a founder item. Revenue alone is never the reason.
- **Rule 6, lesson pages:** no ad card on `/l/<slug>` or `/d/<slug>` **at any stage**, not only in stage 1. A learner who opens a shared lesson link sees the lesson and nothing else.
- **New rule 9, ages:** in teen mode (13 to 15) only house cards ever appear (privacy gate P2.3). Stage 2 (paid cards) does not start until the privacy reviewer rules on anonymous sessions whose age is unknown.
- **New rule 10, the experiment decides whether the slot ships:** stage 1 does not ship until the analytics steward has registered the experiment with its predictions committed (ads proposal, "Experiment"). The no-card arm is allowed to win. If any `would_be_wrong_if` line fires (next-lesson completion −3 points or more, end-of-session after the card +5 points or more, revisit recall −3 points or more), the slot is switched off, and it comes back only through a new decision. A lower cap does not count as a fix unless it is itself a registered arm.

**Roadmap (also asked in W-891):**
- **School and B2B licences:** on the roadmap under "Later" as **discovery only** (no build, no dashboard). Owner vp-marketing. Head-of-product signs any product promise. The one product promise allowed now is the checkable one: "every claim checked, no ads, no tracking". There is no outcome claim before EXP-002.
- **A paid ad-free tier:** **not on the roadmap.** It gives the company a reason to make the free feed worse (a dark-pattern incentive), it needs payments (a new dependency, so a decision record) and accounts, and under-13s cannot pay. It reopens only through a new proposal after stage 2 has guardrail data.

## Ruling 4 (W-967): owners of mastery, personalization and social

status.json and the budget pack disagree (dependencies.md §3). These are the owners, one accountable role per surface:

| Surface (release 1) | Accountable owner | Builds or co-owns | Reads or gates | Note |
|---|---|---|---|---|
| **Personalization (rule-based)** | **personalization-lead** (rule set, reason copy recorded as claims, Q1.6) | learner-model-engineer (rule functions, EDD-009 co-author) | pedagogy-critic (Q1.6 record); privacy-reviewer (P3.1 inputs) | If W-906 is not ratified by 10-30, it ships switched off (quality bar §4). That is not a cut, and no one cuts it by hand (re-estimate cut order 4) |
| **Mastery (state)** | **learner-model-engineer** (mastery state derived only from recall and completion as W-906 defines it, EDD-009) | platform-engineer (UI integration) | pedagogy-critic (Q1.7 record); qa-tester (banned phrases) | Never cut: it rides on server-side progress |
| **Challenges** | **growth-designer** (spec: built from existing lessons and their recall questions, predict-before-reveal kept, no kit or `Lesson.tsx` change) | platform-engineer | pedagogy-critic, qa-tester (Q1.7) | **Pre-declared cut:** if challenges are not feature-complete on a preview by **2026-11-06**, they move to release 2 and mastery state stays (re-estimate cut order 3). Head-of-strategic-initiatives reports it, and this record is the ruling in advance |
| **Social (share a lesson)** | **growth-designer** | platform-engineer (2 code runs, re-estimate §2) | privacy-reviewer (P4.2) | Scope as Ruling 2 |
| **Ad slot** | none in release 1 | | | Release 2: vp-marketing (proposal owner) with head-of-product for the product rules above |

The launch-review record for First Light (dependencies.md D-34) is head-of-product's, since I chair launch review. I write it for the go/no-go on 2026-11-23 against the quality bar, with the quality verdict as the steward gives it. Filed as a board ask below.

## Objections

- **privacy-reviewer (privacy gate, objections list): "social is in the founder's scope", so cutting it may overreach.** **Answer:** accepted as the limit of this ruling. I cut to share-a-lesson, which still delivers the founder's "light social". The founder can keep richer social only with the 5.3 minimums and a moderator the founder names (P4.3). I have recorded that path in Ruling 2 rather than closing it. *Status: closed for release 1 unless the founder names a moderator and keeps social, in which case Ruling 2 is reopened on that record.*
- **principal-engineer (re-estimate §3): cut the ad slot "now, not at 11-09", and social "down to share links only, or cut entirely".** **Answer:** both taken. Ruling 1 cuts the slot now. Ruling 2 keeps share links rather than cutting social entirely, because P4.2 adds no stored data and costs about 0.5M and 6 runs off the critical path. *Status: closed.*
- **growth-designer (anticipated): share links alone will not bring anyone back.** **Answer:** declined as a reason to add social. Return visits are not the success criterion (Surface Value). Revisits that come back when due are the retention mechanism we can defend. Richer social is the release 2 path in Ruling 2, with a PRD and a prediction about learning. *Status: held to a release 2 PRD.*
- **vp-marketing (anticipated, ads proposal): moving the slot to release 2 loses the baseline period the experiment needs.** **Answer:** partly accepted. Stage 0's baseline metrics (lesson views, sessions, prediction-to-reveal completion, first-revisit recall) do not need the slot, so the analytics steward can define them for release 1, and release 2 starts with a baseline already in hand. *Status: routed to analytics-steward (board ask 6).*
- **Founder's record, Objection "the dates are a guess".** **Answer:** this record buys the dates' best odds on the tech lead's figures (about 60%), and it does not claim more. The slip rule and any date move belong to head-of-strategic-initiatives. *Status: held to the 10-23 and 10-28 checkpoints in the re-estimate §3.*
- **portfolio-manager (re-estimate §2): T2 is 8.23M without the slot but 14.5M-17.4M once the quality line is added, over the 10.2M stop rule.** **Answer:** the cut removes about 0.53M engineering and about 1.4M quality runs, but it does not close the gap. Re-basing the stop rule is the portfolio-manager's and the founder's call, not mine. *Status: routed to portfolio-manager (board ask 5).*

## What would make this record wrong

- The founder names a moderator and wants richer social in release 1. Then Ruling 2 is reopened, with the 5.3 list and a tier-2 EDD, and the dates are re-estimated.
- Vercel's terms, once read (F-18), count share links or the house card as commercial on Hobby. That does not change this scope, but it does change F-18's urgency.
- P4.2 fails on the release SHA, for example because a share link leaks a parameter. Then social is absent from release 1.

## Board (asks for the caller; I did not edit board.json)

1. **head-of-strategic-initiatives:** apply Rulings 1, 2 and 4 to `status.json` (owners, the ad slot absent) and `dependencies.md` (D-22's social and ad-slot rows are answered in advance by this record; the 11-06 challenges checkpoint).
2. **evaluation-steward:** mark the ad-slot and social-beyond-P4.2 rows "absent in the release build" in the quality bar.
3. **growth-designer:** a share-a-lesson spec (P4.2), and a challenges spec, with owner as in Ruling 4. New items: the first board items for social and challenges (dependencies.md D-23 has none).
4. **learner-model-engineer:** a mastery-state item under EDD-009. **personalization-lead:** confirm ownership of the rule set and reason copy.
5. **portfolio-manager:** re-base T2 without the ad slot (−0.53M engineering, about −1.4M quality), with privacy at 13 runs plus 2 contingency (social cut).
6. **analytics-steward:** written definitions of the stage 0 baseline metrics, measured from release 1.
7. **privacy-reviewer:** read P4.2 on the release SHA. Its §5.3 and P4.3 are not needed for release 1.
8. **head-of-product:** the First Light launch-review record, for 2026-11-23 (D-34). Roadmap updated in `company/product/roadmap.md`.
9. W-1009, W-1002, W-891 and W-967: done against this record.
