# Spec: interpolation-guesses-the-page

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #13 · wireframe: `interpolation-guesses-the-page.svg`

**Format: Before / after toggle** (as briefed). One change, how the values are spread, with a visible effect: the same guessing rule lands in one look on the even list and crawls on the cubes. The "after" (the cubes run) persists into the reveal, and the even result stays in a tally line, so both are on the stage at the reveal.

## Brief check (designer's node run, 2026-10-14)
Guess position = lo + floor((x − a[lo]) × (hi − lo) / (a[hi] − a[lo])), 0-based; halving uses mid = floor((lo + hi) / 2).
- Even list, 730: one look, at 0-based index 72 = **position 73** of 1–100 (10 × 73 = 730). Every even target takes 1 look. Halving: 6 looks for 730, at most 7 for any value.
- Cubes 1³ … 100³: worst **21 looks** at 9,261 (21³); 8,000 takes 20, 1,000 takes 10, 729,000 takes 4, 1,000,000 takes 1. Mean 8.86 looks against 5.8 for halving; halving's worst is 7.
- **Brief nit (not wrong):** "position 72 holds 730" is 0-based. The stage counts positions 1–100, so learner-facing text and the claim should say "the 73rd value" or "position 73". The halving count (6) depends on the floor midpoint; the claim must state the convention.

## Stage at 390×844 (~330 px at predict, ~500 px in explore)
1. Model line (muted): "Each guess aims by value along the line between the range ends." (11 words)
2. Readout row: "Looks: ? · Halving: ? · Range 1–100" (numbers "?" while locked).
3. **Value plot**, ~320 × 200 px: x "Position 1–100", y "Value" (0–1000 even, 0–1,000,000 cubes; the axis top is the list's last value, never a count). 100 dots. A dashed horizontal target line labelled "find 730". Current search range shaded; values outside it greyed.
4. On each guess: a thin **aim line** from the range's low-end dot to its high-end dot; where it crosses the target line, a drop tick to the axis, labelled with the look number. Only the latest look is labelled ("look 21"); earlier ticks are unlabelled so labels never collide.
5. Controls, then a **tally**: one line per finished search ("Even · 730: 1 look (halving 6)"; "Cubes · 9,261: 21 looks (halving 7)").

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Guess" | one look at the current target: draws the aim line and the tick, narrows the range. Disabled once found |
| 2 | Control toggle | "Values: even" / "Values: cubes" (`aria-pressed`) | switches the list. Looks reset; the tally keeps earlier results. Even target is 730; cubes target is the active chip |
| 3–5 | Control chips | "729,000" · "1,000" · "9,261" (group "Find") | cubes list only (disabled on even). Start: 729,000 active (disabled, `className="active"`). Picking one resets looks for that target |
| 6 | Control | "Guess until found" | cubes list only: computes all looks, replays them ≤ 400 ms (instant under reduced motion), adds the tally line. Disabled on the even list, where one Guess always finds the value, and once found |

No control lands on the answer. The answer (1 look) appears only after the learner's own Guess. The only jump (control 6) is disabled on the even list.

QA path: Guess (730 found at position 73, 1 look, halving 6: milestone `even-found`) · Values: cubes (target 729,000, looks 0) · 1,000 (target 1,000) · 9,261 (target 9,261) · Guess until found (21 looks crawling up from position 1, halving 7: milestone `cubes-found`). The 729,000 chip is the active default, so QA skips it. All 6 controls render at first paint, disabled while `locked`.

## States
- **Predict:** the even list as a straight row of dots, the "find 730" line, "Looks: ?". No aim line is drawn, so the stage does not show where the guess will land.
- **Guess on even:** the aim line lies exactly on the dots and the tick lands on 730 at once. "Looks: 1 · Halving: 6 · found at position 73".
- **Cubes:** the dots bend into a flat-then-steep curve. **9,261:** each aim line from the low end to 1,000,000 crosses the target almost at the left edge, so each look moves one position: ticks march 1, 2, 3 … 21. **729,000:** 4 looks, beating halving, so the learner sees that aiming is not always worse.
- **Reveal:** the stage keeps the last search (on the QA path, 9,261 with 21 ticks) and both tally lines. The reveal quotes the tally: "You found 730 in 1 look; halving takes 6. On the cubes, 9,261 took 21 looks; halving never needs more than 7." Lines for targets the learner did not search are left out. The facts that interpolation averages O(log log n) on evenly spread data and is O(n) in the worst case go in the closing line, as claims.

Milestones (`minInteractions=2`): `even-found` (730 found on the even list), `cubes-found` (any cubes target found, by Guess or Guess until found).

## Shown, not told
The learner sees *why* it fails: the aim line is straight and the data is not, so on the cubes every aim falls short and the ticks crawl. The reveal names "aiming by value" and the dictionary analogy only after the learner has seen both.

## Colour and access
Dots `--fg`; target line `--warn` (text-safe) dashed with its label; aim line `--domain` 2 px, plus a dash pattern so it does not rely on hue; ticks `--fg`. Range shading `--bg-3`. All controls `.tap` (44 px); chips about 107 px wide. Numbers use thousands separators. Plot `aria-label`: "Cubes, find 9,261: found at position 21 after 21 looks".

## Claims this spec adds
"Position 73" (1-based) and the tally numbers come from the run; the builder re-runs and records them. No illustration (CS).
