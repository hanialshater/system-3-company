*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: four-queens-pruning
lesson version: v1
boundary: an adult beginner who knows chess queens attack along rows, columns and diagonals; has never heard of backtracking.
Screenshots seen: yes (sheet.png, 10 frames, phone viewport)

## 1. From the artifact

- Where understanding first broke: the title. The card is titled "Four queens, sixteen moves" and the hook says "You only need to try a handful". The question then asks "how many placements ... 16 / 64 / 256?" The title states the answer. I chose 16 and "Your prediction held", but I did not predict anything; I read it.
- The question itself is dense for a beginner: one-per-row, 256 boards, safe squares, backing up and "finding every solution" in one sentence.
- Explore: "Run the search" finishes instantly ("Search done: 16 placements (first solution at 8)") and shows the two solution thumbnails. I never watched the search prune; I only got a number. The "Step" button would show it, but the walked path reaches the answer without it.
- By hand: the pink × marks for attacked squares are clear, and "Row 3 has no safe square. Back up." in red is the one moment the pruning idea is felt. Good.
- Counter problem: tapping row 1 columns 1, 2, 3, 4 in turn moves the single queen, but "Placements" climbs 1, 2, 3, 4. With one queen on the board the counter reads 4. That makes the headline count feel arbitrary to a beginner ("16 of what?").
- Reveal: "16 safe placements", "first comes after 8" and 256 were on screen. The 8-queens figures (16,777,216 boards, 2,056 placements, 92 solutions) are told and never visited; acceptable as a closing extension, but they are the most striking numbers and I have no way to see them.
- Phone: reveal text fully visible. On the reveal frame the stage is scrolled so row 1 of the board is cut off at the top; minor. Badge says 75S.
- Reveal earned: "a clash noticed early skips every board that starts that way" is told; I saw one dead end by hand, not the skipping of many boards.

Fixes (owner: builder):
1. Retitle so it does not state the answer (e.g. "Four queens, how many tries?").
2. Make "Run the search" animate (or step through) so the learner sees placements and backing up accumulate to 16.
3. Count a hand placement only when a queen is added to an empty row, or label the counter "queens placed so far".

## 2. After reading the brief

- Objective: 16 placements vs 256 boards, because a clash cuts off every board that starts that way. The title leaks the 16; the "because" is told, with one hand-made dead end as its only evidence on the walked path. The recall asks for the "because", which is the told part.
- Duration 75 s: flag for the category manager against the demo standard.
- 5 claims verified by others; I cannot vouch for them.

Verdict: revise
