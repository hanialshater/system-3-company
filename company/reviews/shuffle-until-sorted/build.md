# Build note: shuffle-until-sorted

builder: algo2-sb · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/shuffle-until-sorted.md` (+ svg) and brief #44 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (builder's own node script, same code path as Demo.tsx)
mulberry32 + Fisher-Yates of 1..n, every shuffle from scratch. Single-run stream seed 42 + n: one run 3 cards 12, 4 cards 43, 5 cards 183. 100-run stream seed 4200 + n: averages 6.64, 22.08, 112.76; 5-card runs from 2 to 695. Same as the spec's numbers. Across 200 other seeds the 5-card average of 100 ranged 89 to 160 (the spec said about 95 to 145), so the prediction (about 120, not 25) is robust. 5! = 120, 10! = 3,628,800. Seeds follow the spec's scheme and were not picked for the result; disclosed in claim c1. (With seed 2026 my shuffle gives a 5-card run of 182, not the spec's 26: a different shuffle implementation. Not used.)

## Built as specced
Rule line, cards row (56x72, ticks under cards in their place, `--good` outline + "Sorted after N shuffles"), large tally, strip of 100 bars with dashed mean line and "average N" label, 3x2 table of "?" cells. 6 controls in DOM order: Shuffle, Shuffle until sorted, Average of 100 runs, 3 cards, 4 cards, 5 cards (5 active and disabled at start). Hand shuffles and "until sorted" share one stream per n, so the run length is independent of press order. Run capped at 5,000 ("Stopped at 5,000"). Replay pattern on chips: if the previous n had both cells filled and the new n has none, its run and its 100 runs replay (180 ms + 180 ms). Milestones `sorted-once` (5-card run sorted, or 30 hand shuffles at 5) and `average-of-100` (at 5); minInteractions 2.

## Choices and deviations
- Strip scale is per n: 48 / n! px per shuffle, so the true mean sits near 48 px and the 120 px clip is at 2.5 n! shuffles (300 for 5 cards). Linear, not log, as specced; the spec did not give a scale.
- "Average of 100 runs" is disabled once that n's average exists (pressing again would change nothing, which QA rule 3 forbids).
- Switching back to an n that already has results shows them without replaying (the QA path ends on 5 cards with its stored results, as specced).
- The table shows averages rounded to whole shuffles (7, 22, 113); claim c1 gives the decimals.
- The reveal quotes the learner's 5-card run (or the hand count if they took the 30-shuffle path), the 5-card average with its range, and the 3- and 4-card averages next to 3! and 4! when the chips were used.
- `.tap` min-height 44px set in the lesson's module (as in a-star-heads-for-goal).
- Claim c6 cites Gruber, Holzer and Ruepp (FUN 2007) from memory; marked "check before citing".

## Problems found in the brief or spec
None blocking. The spec's 2026-seed example (26) does not reproduce with my shuffle; harmless.

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.
