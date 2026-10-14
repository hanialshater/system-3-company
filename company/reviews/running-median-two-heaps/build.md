# Build note: running-median-two-heaps

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #64 (single card).

- Brief numbers held in node: medians 5, 10, 5, 4. Stage uses real array heaps (push/pop with sift); rule: lower half gets x if empty or x <= its top; rebalance so lower has equal or one more. Final halves 1, 3 | 5, 15.
- With only 4 numbers each heap holds at most 2 items, so the trees are tiny; the tops are filled in the domain colour and the median sits between them.
- Controls: "Next number (x)", "Feed the rest", "Start over". Milestones `first-number`, `all-fed`.
- Reveal's "19 levels for a million" = floor(log2 500000) + 1 (each half holds 500,000). Fact-checker should confirm the wording "levels".
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.

## Revision v2 (wave E, r6 learner review)

- r6 top (the prediction was "sort in your head"): the question now asks about the method. "Lower half: biggest on top. Upper half: smallest on top. Sizes kept equal (lower may hold one extra). After 5, 15, 1 the halves are 1 5 | 15. When 3 arrives, how many stored numbers must cross to the other half?" Options 0 / 1 / 2 / 3; answer computed from the trace (1: 5 crosses). 3 is the re-sort guess.
- r6 gate (Feed the rest skipped 15 and 1): a log under the heaps records every arrival ("15 → upper, nothing crosses · median 10", "3 → lower, 5 crosses · median 4"), so a jump still leaves each arrival on stage. Milestones unchanged (first-number, all-fed); all-fed is the question's case (3 arriving).
- r6 minor (Start over emptied the stage beside the reveal): the last full run is kept and the log shows it after Start over; the reveal reads that record.
- "Next number (5)" relabelled itself: now a fixed "Next number"; the stream chip shows which is next. The "Medians so far" readout became the log.
- Title "Keeping the middle of a stream", hook "Numbers keep arriving. How much work does each one cost to keep the middle?" (the old hook named the re-sort answer to rule out).
- c2 changed, c6 new; both unverified.

## Pre-flight v2

1. Title and hook: "Keeping the middle of a stream" / "Numbers keep arriving. How much work does each one cost to keep the middle?" No count of moves, no "never re-sorts".
2. Options: "0" / "1" / "2" / "3". All bare numbers.
3. Locked stage: the stream chips 5 15 1 3, two empty halves labelled "biggest on top" / "smallest on top", median "–", sizes 0 | 0, empty log. Nothing marks 5 or a crossing.
4. Reveal values: "When 3 arrived it went into the lower half … one number, 5, crossed: 1 move": the 4th entry of the recorded run, set at milestone all-fed (b). "The other 3 arrivals moved nothing across": counted from the same record (b). "Your medians, 5, 10, 5, 4": from the record (b). "about log n steps: around 19 levels for a million numbers": told context, claim c4, not presented as seen.
5. QA path: Next number (5 in the lower half) → Feed the rest (all four in: all-fed; log shows four rows) → Start over (heaps empty; log keeps the last full run). The quoted rows are on stage when the reveal opens.
6. Reset: Start over pressed last. Reveal from that run: "When 3 arrived it went into the lower half. That half was then too big, so one number, 5, crossed: 1 move. The other 3 arrivals moved nothing across. Your medians, 5, 10, 5, 4, were read off the tops; nothing was ever re-sorted. / Keep the smaller half in a heap with its biggest on top and the larger half in a heap with its smallest on top, equal in size. The median is one top or the mean of both. Each new number costs one heap insert and at most one move, about log n steps: around 19 levels for a million numbers."
