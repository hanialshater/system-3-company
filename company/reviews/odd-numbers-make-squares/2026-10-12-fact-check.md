# Fact-check: odd-numbers-make-squares

date: 2026-10-12 · reviewer: fact-checker · inputs: meta.json claims, `artifacts/walkthroughs/odd-numbers-make-squares/transcript.md`, Demo.tsx (read only to list visible sentences)
working: `artifacts/scratch/fc-odd-numbers.mjs`

## Claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 sum of first n odd numbers = n x n | **verified** | Re-ran the sum for n = 1..100: every partial sum equals n^2 (n = 10: 100, n = 100: 10,000). Inductive step (n+1)^2 - n^2 = 2n+1 holds for n = 1..99. Nicomachus credit is the classical attribution and Nelsen includes the picture; I could not confirm the page number "p. 71" online. The result does not rest on the pin. |
| c2 wrapping an n-by-n square adds 2n+1 dots | **verified** | Counted dots by layer max(row, col) on a 10x10 grid: layer sizes 1, 3, 5, ..., 19. Each is n + n + 1 for the square it wraps. |
| c3 first ten odd numbers = 100; first 100 = 10,000 | **verified** | Direct sum: 100 at n = 10 (last term 19) and 10,000 at n = 100 (last term 199). |

## Unrecorded claims found (added to meta.json as `unverified`; I wrote them, so I do not verify them)

- c4: "The first 15 odd numbers, 1 + 3 + ... + 29, add up to 225." (recall question; my script gives 225 but a second checker must confirm)
- c5: "Wrapping a 3 x 3 square needs 3 + 3 + 1 = 7 dots ... A 9 x 9 square needs 19." (reveal sentence, see problem below)

Also seen and covered by recorded claims: the predict-stem sums 1+3 = 4 = 2x2 and 1+3+5 = 9 = 3x3 (c1), the live captions "The 2n-1 new dots wrap (n-1)x(n-1) into nxn" (c2; the walkthrough shows "The 3 new dots wrap 1 x 1 into 2 x 2" which is right).

## Fixes routed to demo-builder (phrased as problems)

1. Reveal: "Wrapping a 3 x 3 square needs 3 + 3 + 1 = 7 dots ... A 9 x 9 square needs 19." The two sentences use different senses. The first is about the L that wraps a 3x3 square (makes 4x4); the second reads as "building a 9x9 square needs 19", which is false (81 dots). A learner can leave believing a 9x9 square costs 19 dots. The true statement is that wrapping a 9x9 square takes 19 dots and makes 10x10.
2. Hook: "1 + 3 + 5 + 7 ... Add one more" is fine as written (16, then 25), noted only so nobody changes it by mistake.
3. c1/c2 source pin "p. 71" of Nelsen is not checked; whoever owns the claim text should confirm the page against the printed book.

Status after this check: no claim disputed. c4 and c5 await an independent checker.
