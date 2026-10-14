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

## Revision v3
Learner review v2 (2026-10-13) findings:
- Hook asked "why split?" while the question asked about the worst-case merge. Retitled "How cheap is merging?"; hook now asks the merge-cost question the prediction asks.
- The wrong-tap message ("Only a card placed counts as a comparison") contradicted the learner's picture. Now: "The other top card is smaller, so it goes first. Each card placed while both piles have cards is one comparison."
- "Your merge took 7" was sometimes Finish-for-me's merge: reveal says "The merge on screen took N".
- Rounds and the payoff were only told: the last round label on the stage now shows the worst case for all 8 cards (4 + 6 + 7 = 17) against 28 for every pair (new claim c11, unverified). The 1,000-card figures remain in the reveal as the "big numbers".
- Still open by design: Finish for me remains the one-press QA path; round button reaches round 1 on first press.

## Revision v4 (wave D r5, 2026-10-14)

'Where did the piles come from?' now opens all three rounds stacked (singles 0, pairs 4, piles A and B 6) with a running total; after the final merge the line reads 'Whole sort: 0 + 4 + 6 + 7 = 17, against 28 for every pair'. Reveal quotes those numbers. Round button hidden in the reveal. Reopened c9; added c12.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.

## Pre-flight v5

Revision for r6 learner review (adult-beginner, revise): with the rounds open, the merge prompt and the wrong-tap line were clipped off the bottom of the phone stage; the reveal was about 131 words; "Your stacked rounds" oversold rounds the learner did not do.
Changes: the merge message is now the first line of the stage, so it is never below the fold. The rounds stack is compact (32 px rows), and the piles drop their min-height while the rounds are open. When the merge finishes, the sort is recorded (rounds plus merge) and shown in a line "Your sort: 0 + 4 + 6 + 7 = 17, against 28." that New piles does not clear, and the reveal quotes that record. The reveal is trimmed to about 110 words and says "The rounds before the last merge cost ...". The title changes from "How cheap is merging?" (which hints at the small option) to "What does one merge cost?". c9 and c12 are set unverified. c8 ("a single card is already a sorted pile") is dropped, because the sentence is gone.

1. **Title and hook.** "What does one merge cost?" / "Two sorted piles must become one sorted row. How many comparisons can that cost?" No: neither says cheap or dear.
2. **Options.** "7", "16", "28": all bare numbers.
3. **Locked stage.** "Make a prediction to start.", the "Where did the piles come from?" button, piles A and B (4 sorted cards each), an empty 8-slot row, Comparisons 0, Placed 0/8. No 7 and no 28 is drawn.
4. **Reveal values.** "took 7": (b) recorded when the `merged` milestone fires and shown in the "Your sort" line. 4 and 6: (b) recorded with it (the rounds are opened by the `saw-split` milestone and the costs are in the "Your sort" line). 17: the sum of the record. 28, 1,000/10 rounds/10,000/499,500: told context (c10, c9, c3), not said to be seen. "at most 7": the claim c4, the answer.
5. **QA path.** Where did the piles come from? (`saw-split`) -> pile A top -> pile B top (one is the smaller; a wrong tap shows the feedback at the top) -> Finish for me (plays the rest at 160 ms per card, `merged`) -> New piles. Both milestones are reached, and the "Your sort" line is visible after New piles.
6. **Reset.** After New piles the row is empty, but "Your sort: 0 + 4 + 6 + 7 = 17, against 28." stays. Reveal: "The merge on screen took 7. Each comparison looks at only the two top cards, and the smaller one goes into the row for good. Eight cards, so at most 7; once a pile empties, the rest slides over free. Piles that interleave to the end need all 7. / That is why Merge Sort splits: splitting compares nothing. The rounds before the last merge cost 4 and 6; with the last merge's 7, the whole sort took 17, against 28 for checking every pair. Halving 1,000 cards takes 10 rounds, each under 1,000 comparisons: fewer than 10,000, against 499,500 for every pair. / The splitting is setup. The merge is the payoff."
