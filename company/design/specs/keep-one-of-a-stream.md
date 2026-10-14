# Spec: keep-one-of-a-stream

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #77 · wireframe: `keep-one-of-a-stream.svg`

**Format: Simulation run.** One row of four stream items. Each item has a bar showing its **exact** chance of being the kept one right now. The bars do the teaching: they level out at every step. One seeded stream plays the rule for real, so the learner sees a draw decide, and a seeded run of 1,000 streams puts tallies on the bars at the end. The exact bars are what the question asks about. The simulation is the evidence that a real run behaves that way.

## Brief check (re-run in node, 2026-10-14)
Keep item 1; item i replaces the kept item with probability 1/i.
- Exact chances after each arrival: after 1: [1]; after 2: [1/2, 1/2]; after 3: [1/3, 1/3, 1/3]; after 4: **[1/4, 1/4, 1/4, 1/4]**. Item 1 survives 1/2 × 2/3 × 3/4 = **1/4**. **The brief is right.**
- The single seeded stream and the 1,000-stream tallies come from mulberry32 with a fixed seed. The builder picks the seed and discloses it (`disclose-chosen-seeds`). The seed must not be chosen to make the tallies look flatter than a typical run. Expected tallies are about 250 each, give or take about 14 (one standard deviation).

## Stage at 390×844 (~360 px at predict, ~480 px in explore)
1. Rule line (muted, 12 words): "Keep item 1. Item i replaces the kept one with chance 1/i."
2. **Stream row**: four item cards, 76 px wide with a 12 px gap, labelled 1–4. Arrived cards are solid and waiting cards dashed. The kept card has a thick outline and a "kept" tag above it.
3. **Exact bars** under the cards, one per item, 0–1 scale, up to 120 px tall, with the fraction printed on top ("1/3"). A bar for an item that has not arrived is empty. Under item 1's bar its survival chain builds up as items arrive: "1 × 1/2 × 2/3 × 3/4".
4. **Draw line** for the latest arrival (seeded stream): "Item 3: draw 0.71, needs under 1/3: keep item 2" (11 words, numbers included). Seed shown small at the right: "seed 7" (placeholder, the builder's seed).
5. **Tallies** (after "Run 1,000 streams"): a short tick on each bar at its share of the 1,000 runs, and the count above it ("251").
6. Controls, below.

Stage words at the busiest moment: rule line 12 + draw line 9 (words only) + "kept" 1 + "seed" 1 = 23.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Next item" | the next item arrives. The seeded draw decides whether it replaces the kept one, and the draw line says so. Every exact bar updates to 1/i, and item 1's chain gains a factor. Disabled after item 4 |
| 2 | Control | "Rest of the stream" | plays the remaining arrivals one at a time, about 120 ms each (≤ 400 ms; instant under reduced motion). Every bar and draw line is shown in turn, and the last stays |
| 3 | Control | "Run 1,000 streams" | runs 1,000 seeded streams of 4 synchronously and draws the tallies on the bars. The exact bars stay under the tallies. Disabled after |

All 3 controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset: the end of the stream is the reveal's picture. No "New seed": one disclosed seed keeps QA screenshots fixed, and the 1,000 runs already show the spread.

QA path (each control once, DOM order): Next item (item 2 arrives: bars 1/2, 1/2) · Rest of the stream (items 3 and 4: all bars at 1/4, chain "1 × 1/2 × 2/3 × 3/4": milestone `stream-end`) · Run 1,000 streams (tallies near 250 each: milestone `thousand`).

## States
- **Predict:** card 1 solid and kept, cards 2–4 dashed, item 1's bar full at "1", the others empty. No 1/4 anywhere: the chain under item 1 reads just "1".
- **On unlock:** nothing moves until a press. Exploration hint: "Bring in the items one by one and watch item 1's bar."
- **Item 2:** two bars at 1/2. Chain "1 × 1/2". The draw line says whether 2 replaced 1.
- **Item 3:** three bars at 1/3. Chain "1 × 1/2 × 2/3". The new item got only a 1/3 chance to get in, and the older items' bars dropped to match it.
- **Item 4:** four equal bars at 1/4. Chain complete.
- **1,000 streams:** a tick on each bar near the 1/4 line, counts like 246, 251, 257, 246 (the builder's seeded numbers).
- **Reveal:** the stage stays as left. The reveal quotes the stage's tallies: "Item 1 had to survive three draws: 1/2, then 2/3, then 3/4. Multiply them: 1/4. Each later item had a smaller chance to get in, but fewer draws left to survive, and every bar ended at 1/4. Your 1,000 streams kept the four items [n1], [n2], [n3] and [n4] times. The rule held one item in memory and never needed to know the stream would stop at 4."

Milestones (`minInteractions=2`): `stream-end`, `thousand`.

## Shown, not told
The learner watches the bars level out after every arrival. Item 1's chain makes "the product cancels" a line of fractions they built themselves. The tallies show that a real seeded run agrees.

## Colour and access
Bars `--domain` with the fraction printed; the kept card has a thick outline plus a "kept" tag (shape and text). Tally ticks `--fg`. Stage `aria-label`: "After item 4: each item kept with chance 1/4".

## Notes for others
- **Builder:** the exact bars are computed, not simulated. The draw is `rand() < 1/i`. Quote the tallies the stage shows in the reveal; do not hard-code them.
- **Brief owner (cm-cs-algorithms):** unchanged, apart from adding "Rest of the stream" and "Run 1,000 streams" so that the QA path reaches item 4.
- No illustration (CS).
