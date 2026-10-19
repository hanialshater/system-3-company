# The default order, as a written rule a candidate can derive from `dims` (order rule v1)

owner: vp-personalization (Mateo) · run: vp-replan-1017 · date: 2026-10-17 · for: the `reachable-v2` builder (C2), S1, D2, personalization-eval (K6)
status: written before reachable-v2 exists; frozen with it (any change to this rule is a new candidate, batch 5 §4 G6)
why it exists: criterion 3b §4.3 K-a (personalization-eval, K5 report 20261017T184136494Z-personalization-eval-0a5bb567): the key order of `dims` is **not** the default order (first difference at position 1); F5 (company/personalization/evidence/2026-10-17-reachable-v1-fidelity.md §3 choice 1, N20) made that blocking for `reachable-v1`. Decision: batch 5 §11.1.

**Whose order this is.** The default order is head-of-product's. This file transcribes it and decides nothing about it. If head-of-product changes the default order, this rule no longer describes it, and a candidate built from it is a new candidate.

**Where the rule is written in product code** (a builder may read this; it is the product, not the judge): `src/lib/feed-index.ts`, function `interleave` and its doc comment ("Round-robin across domains so the feed alternates subjects; published lessons first"). In prose: `company/product/surface-value.md` line 23 ("Order is subject round-robin, published first"). The candidate builder reads neither the eval's harness nor any simulator to get this rule; this file and `src/lib/feed-index.ts` are enough.

## The rule

Input: `dims`, a `Record<slug, entry>`. Each entry has `slug`, `domain` and, where the catalogue carries it, `status` (a lesson's meta.json status). The rule never reads key order, insertion order or any field other than `slug`, `domain` and `status`.

1. **Rank.** rank(entry) = 0 if `entry.status === "published"`, else 1. An entry with no `status` field ranks 0 (as published).
2. **Sort** every entry of `dims` by rank ascending, then by `slug` ascending in plain UTF-16 code-unit order (`a < b`). No locale, no `localeCompare` (the candidate must not depend on the runtime's locale data). Slugs are unique, so the sort is total.
3. **Group** the sorted list by `domain`. Domains are taken in the order in which each first appears in the sorted list. Inside a domain, the lessons keep their sorted order.
4. **Round-robin.** Repeat until every group is empty: for each domain in that order, if its group is not empty, take its first lesson and append it to the output.
5. The output is the default order over the whole of `dims`. **The tie order** for a candidate is that output with completed (and any otherwise ineligible) lessons removed, keeping the relative order of the rest. Derive the full order first, then remove; never remove first.

No constant is needed: the rule has no number in it. A1's parameter sheet (company/personalization/policies/reachable-v1-params.md) is unchanged.

## Facts about it, checked 2026-10-17 on this tree (vp-replan-1017, from `src/demos/*/*/meta.json` only)

- On the pilot domains (probability, cs; statuses published and review, as `src/lib/visibility.ts` serves them; the one draft is out) the rule gives **230 lessons**, starting `a-birthday-like-mine, a-star-heads-for-goal, armour-where-no-holes, alias-wave-wagon-wheel, at-least-one-boy, any-start-same-tree`. The 8 review lessons sit at positions 152 and 223-229 (0-based). sha256 of the 230 slugs joined by "\n": `04bf48f41a703b88be6973717e209b4e39a3a0abaa283879725a5cfd16233853`. This vector is for tests; statuses can change, the rule does not.
- Code-unit order and `String.prototype.localeCompare` (what feed-index.ts uses) sort today's slugs identically: 231 pilot slugs and all 974 product slugs, every slug matching `^[a-z0-9-]+$`. A new slug outside that pattern could make them differ; S1 asserts the equality on the shipped index (test), and a difference goes to head-of-product, not into the candidate.
- Restricting the product's all-domain round-robin to two domains keeps their relative order (each domain's queue is the same, and their order of first appearance is the same), so this rule over pilot-only `dims` equals `feedOrder("all")` with non-pilot lessons removed. S1 asserts this too.

## What is checked, by whom

- C2 (builder): unit tests on hand-made `dims` (two or three domains, a review lesson, an entry with no `status`, insertion order shuffled) that the derived order follows steps 1-5 and does not change when key order changes.
- personalization-eval (K6, judge side, report-only as criterion 3b §4.3 already provides): the tie-order probe says how many tied adjacent picks follow the reference arm's default order. The eval answers whether this rule reproduces the reference arm's order on 3b's `dims`; the builder is not told how the judge builds its order.
- S1: the two assertions above on the product index (D2).
