# Build note: no-fraction-fits (demo-builder, 2026-10-13)

- Intent: q slider 1-70; number line zoomed to the two squares around 2q^2, nearest one marked with the gap; "Next close call" jumps to q = 1, 2, 5, 12, 29, 70 (miss by 1). Readouts: best p/q and (p/q)^2.
- Key state: three different q tried, and one close call. Reveal says the table does not prove it and gives the parity proof.
- After screenshots: readout labels were upper-cased (P/Q); turned off the transform for this stage.
- All numbers recomputed with node; all claims unverified, for the fact-checker.

## Revision v2

From the adult-beginner learner review. Stage states the squaring step (p/q = root 2 gives p^2 = 2q^2) and the question. Off-by-1 caption notes the square is odd and 2q^2 even (prepares the parity proof). Reveal lists the q values tried (or the count), and says near misses can look like closing in but close is not equal. End labels no longer clip. Readouts renamed. c5, c6 added.
All new or edited claims are unverified, for the fact-checker.

## Revision v3 (wave D r5, 2026-10-14)

The cause is on stage: each square is labelled with its count of factor 2s (always even) and 2 x q^2 with its count (always odd). The odd/even caption (a false lead) is gone (c5 removed). Reveal quotes the learner's own closest call and points at the 2s counts instead of the lowest-terms proof. Third option is now a concrete wrong fraction. Reopened c3, c4; added c7.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.

## v4 (demo-builder, 2026-10-14): r6 learner revise (2026-10-14-learner-adult-beginner-r6.md)
- Top finding (title "No fraction fits" answered the question): title now "Does any fraction hit √2?".
- Minor (the reveal listed q = 2, passed in one slider sweep): a "Tried q" row under the caption keeps every q visited with its miss ("Tried 4 q: 1 (off 1) · 2 (off 1) · 3 (off 2) · 5 (off 1)"; the last six when more). The reveal names that row.
- Reveal trimmed by two words to stay under 120.
- No claim text changed; status left as it was (review).

## Pre-flight v4
1. Title and hook: "Does any fraction hit √2?" / "With big enough numbers, surely some fraction hits √2 exactly?" Both are questions; the hook voices the misconception.
2. Options: "Yes, with big enough numbers" · "No, never" · "Yes: 99,999 / 70,710". The only exact number is in a wrong option (a trap), so the right option is not the precise one.
3. Locked stage: the rule line "If p/q = √2, squaring gives p² = 2 × q². So: is 2 × q² ever a perfect square?", a number line with 1² = 1 and 2² = 4 ticks, "Make a prediction to start.", readouts "?". No 2-counts, no mark, no Tried row.
4. Reveal values: "q = 1, 2, 3, 5" (current state: seen, shown in the Tried row); "2 × 5² = 50 next to 7² = 49, off by 1" (current state: closest(seen); its entry "5 (off 1)" is in the Tried row, and it is the stage's current q after the jump); "7² had 0", "50 had 1" (computed from the same closest call; the line's labels show them while q = 5 is on stage).
5. QA path: slider two right presses (q = 2, 3; three-q), Next close call (q = 5; close-call). Both milestones in three presses. The Tried row keeps q = 2 and 3.
6. Reset: no Reset control; seen only grows. Reveal after that path: "No, never. For your q = 1, 2, 3, 5 (the Tried row), 2 × q² never landed on a perfect square. Your closest call: 2 × 5² = 50 next to 7² = 49, off by 1. Close calls keep coming, so closeness cannot settle it. The 2s can. / Look at the count of 2s under each number. A square p² has each 2 of p twice, so its count is even: 7² had 0. 2 × q² has q's 2s twice plus one, so its count is odd: 50 had 1. Even never equals odd, so no whole p and q give p² = 2 × q². No fraction is √2."
