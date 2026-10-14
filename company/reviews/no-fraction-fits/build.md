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

## Pre-flight v5 (demo-builder, 2026-10-14, wave G, r7 adult-beginner)

Fix: (top) "2s" is glossed on the stage. After the commit a row under the number line splits both numbers on the line into their 2s: "2s = how many 2s multiply into it: 50 = 2 × 25; 49 = 49 (no 2s)." (at q = 1: "2 = 2; 1 = 1 (no 2s)"; at q = 2: "8 = 2 × 2 × 2; 9 = 9 (no 2s)"). It updates with q, so the learner can check "2s: 1 (odd)" against 50 = 2 × 25. New claim c8. Not changed: the hook's "surely" (r7 called it mild; it voices the misconception) and the empty lower half on a phone (the gloss row uses some of it).
1. Title and hook: "Does any fraction hit √2?" / "With big enough numbers, surely some fraction hits √2 exactly?" Questions; no answer stated.
2. Options: "Yes, with big enough numbers" · "No, never" · "Yes: 99,999 / 70,710". The only exact number is a wrong option.
3. Locked stage: rule line, number line with 1² = 1 and 2² = 4, "Make a prediction to start.", readouts "?". No 2-counts, no gloss row, no Tried row.
4. Reveal values: unchanged from v4: q list (a) seen, in the Tried row; closest call 50 / 49 / off 1 (a) closest(seen), in the Tried row and on the line after the jump; "7² had 0", "50 had 1" (a) the same call, on the line labels and now spelled out in the gloss row ("50 = 2 × 25; 49 = 49 (no 2s)").
5. QA path: slider two presses (q = 2, 3; three-q), Next close call (q = 5; close-call). Gloss row at reveal: "50 = 2 × 25; 49 = 49 (no 2s)".
6. Reset: no Reset; seen only grows. Reveal text as in Pre-flight v4 (unchanged).
- meta.json 4 -> 5; new claim c8 (unverified). Not run: build, QA, walkthrough, tsc.

## v6 (demo-builder, 2026-10-14, answering 2026-10-14-learner-adult-beginner-r8.md, board W-306)
- Reveal ~106 -> 87 words (tool 111 -> 92 with the 5-word verdict line). Cut the "No, never." opener (the verdict line already says it) and "Close calls keep coming, so closeness cannot settle it. The 2s can." -> "The 2s settle it.", and "Look at the count of 2s under each number." Every quoted value (q list, 50 / 49 / off 1, "7² had 0", "50 had 1") is kept. cm-math may still choose a different cut; no claim's meaning changed, so no claim was reopened (the cut sentences were not recorded claims).
- Stage compaction: the caption is now "Nearest square 7² = 49: off by 1." (the 2s counts it repeated are on the number-line labels, which are now drawn at full scale, 10-12 px); the readout row fits on one line (labels "Nearest p/q", "(p/q)² vs 2"; padding tightened in styles.module.css).
- W-287: at the reveal the number line is no longer shrunk (picture 100 px at scale 1), so "2s: 0 (even)" / "2s: 6 (even)" are 10 px, as drawn.

## Pre-flight v6
1-5. Unchanged from v5.
6. Reveal after the QA path: "For your q = 1, 2, 3, 5 (the Tried row), 2 × q² never landed on a perfect square. Your closest call: 2 × 5² = 50 next to 7² = 49, off by 1. The 2s settle it. / A square p² has each 2 of p twice, so its count is even: 7² had 0. 2 × q² has q's 2s twice plus one, so its count is odd: 50 had 1. Even never equals odd, so no whole p and q give p² = 2 × q². No fraction is √2."
7. Phone fit (`node tools/reveal-fit.mjs --url http://localhost:3530 no-fraction-fits`, dev server, 2026-10-14): before crop 74 px, 111 words; after crop 0 px, hiddenBelow 0, namedHidden 0, 92 words (87 without the verdict). Stage 341 px (picture 100 at scale 1, controls 92, text 103), reveal 205 px, window 618 px (about 40 px spare). The rule line, the number line with its 2s labels, the Tried row and the reveal's last line are all on screen.
