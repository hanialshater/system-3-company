# Project Review 1: founder agenda

prepared by: portfolio-manager (Odette), secretary · for: founder (chair) · date prepared: 2026-10-14 · hold by: 2026-10-16 23:59 UTC (the in-flight grace period ends then)
template: company/rituals/templates/project-review.md · system: company/ops/token-budget.md · register: company/ops/projects.json

The figures below come from `node tools/ledger.mjs report` on 2026-10-14. Tokens are harness
`subagent_tokens`. Spend per project is **measured tokens, attributed by inference** (no run was tagged
before today), and runs after 15:20 UTC are not in the log yet. The budgets are **my proposals, from measured unit costs**. I
wrote them, so I cannot approve them: each owner confirms or replaces theirs in a one-page proposal
before the session (board items below).

**Quorum:** you, plus 4 of vp-rnd, vp-marketing (if the role exists by then), chief-of-staff,
chief-of-staff-ceo-office, principal-engineer, principal-engineer-ops and principal-pm-verticals, with at
least one VP, one chief and one PE. Written positions count.

## Item 0: rules of the forum (you decide)

- **0a. Delegation.** May the forum approve a **tranche of 3M tokens or less** that creates no org and changes no kit, contract or deploy path, with no open objection, without you in session, with 24 h for you to veto? My recommendation is yes after two reviews, so that the forum does not become the new bottleneck. The objection from principal-pm-verticals (review capacity) applies.
- **0b. The unit.** Budgets are in `subagent_tokens`. Whether that is the billed unit, and how it relates to the plan's usage limit, is not established. The coordinator's own spend (961M cache-read tokens in its transcript) is outside every budget. Accept "internal unit, not a bill" for now, or ask principal-engineer-ops to establish the unit first?
- **0c. Thresholds.** Major means over 5M tokens or 20 runs, a new category or org, a change to the kit, contract, deploy path or an engine used by more than 10 lessons, or more than 7 days (token-budget.md section 6). Confirm or change.

## Items 1 to 5: open major projects (in flight or proposed, no budget)

| # | Project | Owner | Spent so far (measured, attributed) | Proposed tranche | Return measure | Proposed kill criterion | Known objections and preconditions |
|---|---|---|---|---|---|---|---|
| 1 | **history**: History through data and maps | principal-pm-verticals (to cm-history) | ~0 in the log; sizing ran after 15:20 | 2.0M: org, charter, curriculum, Wave K pilot of 10 | published History lessons; held-claim rate in the pilot | stop after the pilot if more than 40% of claims are held or fewer than 5 of 10 reach launch | "one new vertical, not three" (principal-pm-verticals); fits only by moving 44 subject slots (W-688); sensitive-history route waits on W-626; no data beyond Natural Earth (W-700) |
| 2 | **marketing**: Marketing floor and VP | chief-of-staff-ceo-office | ~0 in the log | 1.0M: org design and a first plan, nothing external | to be defined with analytics-steward | pause if there is no accepted return measure within 7 days | analytics-steward: no learner data to cite (EXP-002 has not run); principal-pm-verticals: adds coordination load, not capacity; anything public needs you |
| 3 | **books-decks**: Books under the deck format | cm-books | ~0 in the log | 1.5M: the pilot deck (Thinking, Fast and Slow) plus reviews | published Books lessons; nothing can publish before F1/F2 | pause if the pilot deck is done and F1/F2 are still open; kill the format if the pilot fails learner review twice | 60 slots buy about 12 books, not 30; F1 (book source) and F2 (legal read) are yours (W-615, W-541) |
| 4 | **lifehacks-engine-v2**: engines v2 and migration | cm-lifehacks | 0 tagged; Life Hacks 200 on v1: 2.0M of our own runs, 0 of 200 publishable | 3.0M: engines plus batch D (14) migrated and reviewed | Life Hacks lessons that reach launch on v2 | stop if fewer than 7 of 14 in batch D reach launch, or if 3M is spent before batch D is reviewed | W-608 says start only after the a11y items W-557 to W-561; v2 code is already in the working tree, uncommitted |
| 5 | **scale-stage-1**: EDD-003 stage 1 runtime bundles | principal-engineer | 0 (stage 0: 661k) | 3.0M, checkpoint at 1.5M | build time, QA time, shared lesson JS against the EDD-003 triggers | abandon if build or QA time has not fallen by a third at the checkpoint | a bundler needs your decision record; no migration until W-085, W-086, the W-087 amendment and your question 6 |

**Also in flight: Wave J** (owner chief-of-staff). 1.4M spent on briefs so far. Proposed: 15M for 144
slugs at the measured 101k per published lesson. Kill criterion: pause if fewer than 15 of the first 30
drafts reach launch after one review round, or if the cost passes 200k per published lesson. Its returns
cannot be counted until W-585 records the slug list. I recommend taking it as item 6, because it is the largest open spend.

## Second review (grace until 2026-10-21)

big-ideas (cm-big-ideas), multi-card-sequence (design-engineer; the EDD-006 engineering review
stands), ncm-course (cm-course-ncm; W-555 already stops briefing after Wave J).

## For the record: major work done today without approval

Life Hacks 200 (2.0M of our own runs, 0 publishable), EDD-003 stage 0 and SPIKE-001 (661k), R&D
knots and EDD-004 (1.7M), NCM (2.3M), and the Books, Big Ideas, Courses, History and Marketing orgs.
The catalog line spent 49.7M for 608 published lessons, which is 82k each and the best-measured return in
the company.

## What you decide

Item 0a, 0b and 0c. Then for each item: approved, approved with changes, returned or killed, with its budget, return measure and kill criterion.
