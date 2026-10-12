# The feed is honest at cold start: round-robin, not "for you"

owner: head-of-product
date: 2026-10-12
status: decided · revisit when ≥ 50 lessons are published

## Context
Most visitors arrive with no history. Personalisation language without signal is a lie with good typography.

## Decision
Order lessons by subject round-robin, published first. Label the first card "Fresh picks" and
say plainly that the feed is not personalised. Due revisits come before new lessons.

## Rests on
System 3, Ch. 11 ("The Honest Cold Start"). Surface Value v1.

## Revisit if
Real-learner sessions show people leave because the order feels random.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| Round-robin may put a stretch lesson second for a beginner | cm-math | evidence | accepted: prerequisite-aware ordering is on the roadmap (Later: paths) |
