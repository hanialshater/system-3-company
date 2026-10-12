# PRD-001: Feed MVP

owner: head-of-product · status: approved 2026-10-12 · builders: platform-engineer · QA: qa-tester

## Problem
People have a minute and a phone. Most short-form learning is passive video: it feels like
learning and is mostly forgotten by Friday. Interactive lessons (Brilliant, Distill) teach better
but ask for a sit-down session.

## Users
Curious adults with a phone, no account, no history (the honest cold start is the main case).

## Non-goals
Accounts, personalisation, social features, video, streaks, notifications.

## Requirements
1. Vertical full-screen cards with scroll-snap; swipe, scroll, ↑/↓ or j/k to move. *(done)*
2. Every lesson follows predict → explore → reveal via the kit; QA enforces it. *(done)*
3. Subject chips filter the feed; default is a round-robin across subjects. *(done)*
4. Intro card states plainly that the feed is not personalised. *(done)*
5. Spaced revisits (1, 3, 7, 21 days) appear between new lessons; progress is stored only on the device. *(done)*
6. "Why trust this?" sheet on every card: claims, support, status, who checked, evidence counts. *(done)*
7. `/d/<slug>` standalone lesson pages; `/catalog` map with taught and untaught concepts. *(done)*
8. Anonymous event beacon to `/api/events` (no identifiers). *(done)*
9. Only cards adjacent to the viewport mount their lesson. *(done)*

## Committed predictions (to be checked in EXP-002 with real learners)
| Metric | Prediction | would_be_wrong_if |
|---|---|---|
| Prediction commit rate | ≥ 60% of lesson views | < 40% |
| First-revisit recall | ≥ 60% correct | ≤ chance + 10 points |

## Rollout
Local → Vercel preview (lessons in review visible, tagged) → production with `SHOW_REVIEW=off` once ≥ 8 lessons are published.
