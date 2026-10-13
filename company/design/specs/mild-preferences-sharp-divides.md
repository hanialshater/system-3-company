# Spec: mild-preferences-sharp-divides

owner: interaction-designer (Rafael) · 2026-10-13 · status: draft, for design review · brief: `company/domains/briefs/economics.markets.md` #1 · wireframe: `mild-preferences-sharp-divides.svg`

**Changes requested (design lead, 2026-10-13):** rule line names the active threshold, not "T"; chart end labels must not overlap or clip (right gutter or legend); the reveal pin shows the 30% chip active; the accessibility reviewer checks shape and hollow cues at 7.2 px; count stage words against the 25-word budget. The ABM format is approved with rules (`company/design/formats.md`). Details in `company/design/reviews/2026-10-13-design-lead-decisions.md` §1 and §3.2.

**First lesson in the proposed Agent-based simulation format.** Not buildable until the design lead approves the format (`company/design/formats.md`). Decisions here are meant to become the format's defaults; the second lesson (schelling-on-new-york) should reuse them so the shared `src/kit/abm` engine can be lifted out.

**Why this format:** the payoff is emergence. No single agent wants a majority, yet the grid sorts into blocks. Independent trials (Simulation run) cannot show that; agents must react to each other's moves, tick by tick, on one visible world.

## The rule (disclosed on the card, identical in code, meta and fact-check)
40×40 grid, no wrap; 10% empty; the rest split equally into two groups, placed by a seeded shuffle (mulberry32, seed shown). Neighbours: the 8 surrounding cells. An agent is **unhappy** if fewer than T of its occupied neighbours are like it (an agent with no neighbours is happy). Each tick: list every unhappy agent at the start of the tick, shuffle that list (same RNG), and move each in turn to a uniformly random empty cell. Metric: **like neighbours** = mean over agents with ≥ 1 neighbour of (like ÷ occupied). A run *settles* when nobody is unhappy; cap 60 ticks.
Designer's node check of this exact rule (seeds 1–5): T=10%: 0.50 → 0.52, settles in 1–2 ticks. T=30%: 0.50 → 0.74–0.76, settles in 8–16 ticks. T=50%: → 0.87–0.89. T=70%: 0.96–0.99 at tick 60, 2–4% still unhappy. Builder re-runs and records the numbers as claims.

## Stage at 390×844 (~330 px at predict, ~490 px in explore)
1. Rule line (muted, ≤ 20 words): "Toy model. Moves if under T like neighbours (of 8), to a random empty home." Second small line: "40×40, 10% empty · seed 1" with the **New mix** button at its right end.
2. **Grid**, 288 × 288 px (7.2 px cells), centred. Group A = filled **square**; group B = filled **circle**; empty = blank. Unhappy agents are drawn **hollow** (outline only), so the learner sees who wants to move before anything moves.
3. **Metric chart**, full width × 64 px: y "Like neighbours" 0–100%, x "Ticks" 0–60. A dashed ghost line at 50% labelled "mixed start". The current run is a solid line; each finished run at another threshold stays as a thin line labelled at its end ("10%: 52%").
4. Controls (two rows), then readouts inline in the chart header: "Tick 13 · Happy 100% · Like 75%".

## Controls, in DOM order (7)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "New mix" | next seed, tick 0, fresh shuffle at the current T. First in DOM so the QA path cannot end on an emptied world |
| 2 | Control | "Step" | one tick. Disabled once settled or at tick 60 |
| 3 | Control | "Run" | computes ticks synchronously to settle (or 60), then replays them at ≤ 25 ms per tick, ≤ 400 ms total (frames may be skipped; instant under reduced motion). Milestones fire on press, from the computed result. Disabled once settled |
| 4–7 | Control chips | "10%" · "30%" · "50%" · "70%" (group "Moves if like neighbours under") | start: 30% active (disabled). Before a run: sets T at tick 0. **After a finished run:** shows the settled end of the *same starting mix* at the new T (the herd-immunity pattern), and adds that run's line to the chart |

Chips replace the brief's 0–80% slider: the reveal and question name exact thresholds, a slider moved two arrow presses lands on 32%, and the four chips are the brief's own check values. All 7 controls render at first paint, disabled while `locked`.

QA path: New mix (seed 2) · Step (tick 1, some agents move) · Run (settles near 75%: milestone 1) · 10% (end state ~52%: milestone 2) · 30% (enabled again, back to its settled end) · 50% · 70% (does not settle). The chart holds all four lines.

## States
- **Predict:** the seed-1 mix at tick 0, unhappy agents hollow (about 1 in 10 at 30%), chart with only the start point at 50% and "?" for the end. Readouts "Tick 0 · Happy ? · Like 50%".
- **Explore, Step:** hollow agents vanish from mixed spots and reappear elsewhere; small clusters start.
- **Run at 30%:** blocks form within about 15 ticks; the chart line climbs from 50% to about 75% and flattens; "Happy 100%".
- **10%:** almost nothing moves; a flat line at about 52%. **50%:** about 88%. **70%:** never settles; hollow agents remain at tick 60.
- **Reveal:** the grid **pins to the learner's settled 30% run** (label "Your 30% run, tick 13") if one exists, otherwise it keeps the current state; the 30% chart line is drawn thick. The reveal quotes it: "Your 30% run went from 50% to 75% like neighbours, and everyone was happy. At 10% it barely moved." Then the model caveat: what can happen, not what causes any real city.

Milestones (`minInteractions=2`): `settled-30` (a run at 30% with nobody unhappy), `other-threshold` (a finished run at any other T).

## Shown, not told
The question's number (75%) is read off the learner's own chart line, and the blocks are in their grid. The rule line says each agent accepts a 70% other-group street; the reveal only points at the gap between that and what they see.

## Colour and access
Group A `--domain` (teal) squares, group B `--warn` (amber) circles: shape carries the group, hue is a second cue. Hollow = unhappy, in both groups. Chart lines `--fg` (current), `--muted` (earlier runs), ghost `--line` dashed. Controls 44 px high; chips ~70 px wide. Percentages are integers. `aria-label` on the grid: "Tick 13: 75% like neighbours, everyone happy".

## Format notes for the design lead
Defaults proposed for the ABM format: world first in DOM after "New mix"; Run computes then replays within the 450 ms QA wait; parameter changes after a finished run show the same mix's end; the reveal pins the run it quotes. No illustration (economics).
