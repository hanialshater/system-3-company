# Spec: shuffle-until-sorted

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #44 · wireframe: `shuffle-until-sorted.svg`

**Format: Simulation run** (as briefed). The question asks for an **average**, and a single run cannot answer it: in my seeded check one 5-card run took 26 shuffles and another took 183. So the spec adds one control the brief did not have, "Average of 100 runs". It draws all 100 run lengths as a strip of bars with the mean marked. The learner's own run is still the first thing they see and the first thing the reveal quotes. The 100 bars show what that one run was an example of.

## Brief check (re-run in node, 2026-10-14)
- P(one shuffle is sorted) = 1/5! = 1/120, so the expected wait is 120 (geometric waiting time). 3! = 6, 4! = 24, 10! = 3,628,800. **The brief is right.**
- Seeded runs (mulberry32, my Fisher-Yates, one stream per card count, seeds 42+n for the single run and 4200+n for the 100 runs): single run 3 cards 12, 4 cards 43, 5 cards 183. Averages of 100: 6.64, 22.08, 112.76 (longest 5-card run 695). With seed 2026 the 5-card single run is 26 and the average 125.13. The spread is the reason for the 100-run control. The seed is for reproducible QA, not chosen for the result. The builder picks it, re-runs it with their own shuffle, and discloses it (pattern `disclose-chosen-seeds`).
- The prediction survives: averages of 100 runs land between about 95 and 145 (SD of the mean ≈ 12), far from 25.

## Stage at 390×844 (~300 px at predict, ~470 px in explore)
1. Rule line (muted, 10 words): "Shuffle at random. Stop when the cards are in order."
2. **Cards**: n cards (start 5) of 56×72 px, digits 1…n at 24 px, in one row. A card that is in its right place gets a small tick underneath, so "nearly sorted" is visible as ticks and does not count.
3. **Tally** (readout, large): "Shuffles: 37". On success: "Sorted after 183 shuffles", with the cards outlined `--good`.
4. **Strip of 100 runs** (empty until #3): 100 bars of 3 px across 330 px, height = run length (log scale is *not* used, so long runs look long), a dashed mean line labelled "average 113". Bars are clipped at 120 px with a "▲" on clipped bars.
5. **Table** (readouts), 3 rows × 2 columns: rows "3 cards" / "4 cards" / "5 cards", columns "One run" / "Average of 100". Every cell reads "?" until filled. There is no n! column on the stage: that is the reveal's sentence.
6. Controls (two rows of 44 px), see below.

Stage words at the busiest moment: rule line 10 + tally 4 + mean label 2 + table headers 7 = 23.

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Shuffle" | one seeded shuffle. Cards move to their new places (150 ms), tally +1. After a success, the next press starts a new run (tally resets to 1, and the table keeps the first run) |
| 2 | Control | "Shuffle until sorted" | shuffles until the cards are in order. Plays the tally climbing and the cards flickering over ≤ 400 ms (the frames shown are a sample, but the tally counts every shuffle), then shows the sorted row. Fills "One run" for this n |
| 3 | Control | "Average of 100 runs" | runs 100 full runs from this n's second stream and grows the bar strip left to right over ≤ 400 ms, then the mean line. Fills "Average of 100" |
| 4–6 | Control chips | "3 cards" · "4 cards" · "5 cards" (group "Cards") | start: **5 cards** active and disabled (the question's case). Switching sets n, deals 1…n in a seeded shuffled order, and shows that n's stored results. If the previous n had a filled row, the new n's run and average are **replayed** as #2 and #3 (the replay pattern from `a-star-heads-for-goal`), so the table fills one row per chip |

All 6 render at first paint, disabled while `locked`, class `.tap`. There is no reset button. The chips change n, and results are kept per n, never emptied.

QA path (each control once, DOM order): Shuffle (tally 1) · Shuffle until sorted (5 cards: sorted after N; milestone `sorted-once`) · Average of 100 runs (100 bars, mean ≈ 113; milestone `average-of-100`) · 3 cards (replay: one run, average ≈ 7) · 4 cards (≈ 22) · 5 cards (re-enabled; shows the stored 5-card results, unchanged). The QA path ends on 5 cards with all six table cells filled.

## States
- **Predict:** 5 cards in a shuffled order, tally "Shuffles: 0", empty strip area (no axis, no mean), table all "?". No hint of 120 anywhere.
- **On unlock:** nothing moves. Exploration hint: "Shuffle a few times, then let it run until sorted."
- **Shuffling by hand:** ticks come and go under single cards. Two or three ticks is common and means nothing; that is the trap the hand runs show.
- **Until sorted:** the tally climbs fast, then stops on a sorted row.
- **Average of 100:** the bars are ragged: many short runs, a few very long. The mean line sits near 120.
- **Chips filled:** table reads roughly 6 / 24 / 120 down the "Average" column, so each extra card multiplies the wait.
- **Reveal:** the stage stays as left. The reveal quotes the learner's run and the average from the stage: "Your run took 183 shuffles; 100 runs averaged 113. One shuffle in 120 is in order, so you wait about 120." If the chips were used: "3 cards: about 6. 4 cards: about 24." Then 10 cards: 3.6 million (claim 2).

Milestones (`minInteractions=2`): `sorted-once` (a 5-card run reaches sorted, or 30 hand shuffles at 5 cards, the brief's fallback), `average-of-100` (at 5 cards).

## Shown, not told
The learner shuffles by hand and sees almost-sorted rows come and go. Then they watch one run take hundreds of tries and 100 runs pile up around a mean. The reveal turns the mean they read off the strip into 5!.

## Colour and access
Bars `--domain`, mean line dashed `--fg` with a text label (not colour alone). Sorted outline `--good` plus the word "Sorted". Card ticks are glyphs, not tints. Strip `aria-label`: "100 runs, average 113 shuffles, longest 695".

## Notes for others
- **Builder:** one seeded stream per (n, single run) and per (n, 100 runs), so the table does not depend on press order. Cap a single run at 5,000 shuffles (P(more) at n = 5 is e^-41.7): if hit, say "stopped at 5,000". Disclose the seeds in claim 1's support.
- **Brief owner (cm-cs-algorithms):** "x10" is replaced by "Shuffle until sorted" and "Average of 100 runs". The gate now needs the average too, because the question is about an average. The teaching is unchanged.
- No illustration (CS).
