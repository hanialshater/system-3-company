# Build note: merge-sort-payoff

## v2 (revision)

demo-builder · 2026-10-13 · inputs: 2026-10-12-fact-check.md (F1–F4), 2026-10-12-learner-sorted-lists.md (findings 1–8), 2026-10-12-qa.md.

Key state: the merge is complete (8/8 placed, comparison count on screen), and the learner has seen at least one split round (8 single cards, 0 comparisons). Gate: `useMilestones(["saw-split", "merged"])`, `minInteractions={2}`.

| Finding | What I did |
|---|---|
| Learner 1 (reveal reachable at 1/8 placed) | Gated on "merged". Added "Finish for me", which plays the rest of the merge one card at a time (same rule, counter ticks), so the QA path (each control once) completes a merge. Trade-off: a learner can let it play instead of tapping; they still watch every comparison land. |
| Learner 2 (splitting and rounds only told) | New "Where did the piles come from?" stepper above the piles: unsorted deck → 8 single cards ("0 comparisons") → pairs (computed comparisons) → 4s ("These are piles A and B"). Gated on opening it ("saw-split"). Counts come from the same `merge()` the stage uses. |
| Learner 3 / fact-check F4 (hook argues a belief the learner can't hold; "isn't extra work" vs "no comparisons") | Hook now "Merge Sort first splits the deck into single cards. Why would that help?" — no claim about work. |
| Learner 4 / fact-check F1 (10,000 untraceable; reveal named bottom-up schedule, source was top-down) | Reveal now gives the reason: each round places every card once so costs fewer comparisons than cards; halving 1,000 down to singles takes 10 rounds. New claim c9 (unverified). Uses halving, matching c2's top-down derivation. |
| Learner 5 (5 or 6 next to "at most 7") | Done message adds "Piles that interleave to the end need 7." when the count is under 7; reveal opens with "Your merge took N" and the interleaving sentence. Covered by c4. |
| Learner 6 (wrong taps uncounted) | Wrong-tap message now says "That one is bigger, so it stays. Only a card placed counts as a comparison." Kept the counting rule: the merge makes one comparison per placement. |
| Learner 7 (merged row unlabelled in reading order) | Row is now `role="group"` with a visible "Merged row" label. |
| Learner 8 (trust sheet unverified) | Not mine; fact-checker owns status. |
| 499,500 straw man | Reveal ties it to the predict option: "Checking every pair (28 for 8 cards) would take 499,500." New claim c10 (unverified). |
| F2 (review c4–c8 wording) | Wording still matches what the lesson asserts; unchanged. c7's source still quotes the old hook; its claim text (no comparisons in splitting) still holds and is now said directly in the reveal. |
| F3 (Knuth section pin) | Not changed: I cannot open the book; verdicts rest on derivation. Left for whoever holds the citation. |

Also: once merged, the empty piles collapse so the merged row stays visible when the reveal shrinks the stage. Deck order is a fixed scramble of each pile so the deck never looks sorted.

Claims touched: c9, c10 added (unverified). No existing claim text changed.
QA: contract passes phone + desktop (local, 2026-10-13).
