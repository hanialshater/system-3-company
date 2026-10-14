# Build note: running-median-two-heaps

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #64 (single card).

- Brief numbers held in node: medians 5, 10, 5, 4. Stage uses real array heaps (push/pop with sift); rule: lower half gets x if empty or x <= its top; rebalance so lower has equal or one more. Final halves 1, 3 | 5, 15.
- With only 4 numbers each heap holds at most 2 items, so the trees are tiny; the tops are filled in the domain colour and the median sits between them.
- Controls: "Next number (x)", "Feed the rest", "Start over". Milestones `first-number`, `all-fed`.
- Reveal's "19 levels for a million" = floor(log2 500000) + 1 (each half holds 500,000). Fact-checker should confirm the wording "levels".
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 5 claims `unverified`.
