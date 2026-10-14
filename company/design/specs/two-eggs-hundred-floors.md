# Spec: two-eggs-hundred-floors

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #26 · wireframe: `two-eggs-hundred-floors.svg`

**Format: Side-by-side comparison.** Two buildings, two plans, one shared control: *where egg 1 breaks*. "Always works" means the worst case over every hidden floor. That is best shown by the learner playing the adversary: they pick the break, and the two plans pay side by side. Plan A's cost swings from 50 down to 7. Plan B's stays flat at 14. The flat line is the idea.

**Changes to the brief's interaction (the idea is unchanged):**
- "Tap a floor to drop" needs 100 tap targets on a 230 px building (2.2 px per floor) and up to 50 presses for the halving worst case. QA presses each control once, and a finger cannot hit a floor. So this spec uses five chips at the named break points instead.
- The brief's toggle "start at 50 / start at 14" puts the answer, 14, on the locked stage. Plan B's floors are hidden until the prediction is committed, and its label is "B: shrinking gaps" (no number).
- The brief's adversary becomes the learner. The machine adversary would always break egg 1 on drop 1, so the learner would see one case of each plan and never the flat 14.

## Answer check (designer node run, 2026-10-14)
DP over 2 eggs and 100 floors: **14**. 13 drops cover 13·14/2 = 91 floors; 14 cover 105. Plan A (drop at 50, then the ceiling midpoint of what is left): 50, 75, 88, 94, 97, 99, 100. Plan B (gaps 14, 13, 12 …): 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100. If egg 1 breaks on drop k, egg 2 climbs every floor in the gap below, one at a time. The cost is k + (gap − 1):

| Egg 1 breaks on drop | 1st | 2nd | 3rd | 4th | Never |
|---|---|---|---|---|---|
| A (halve) | 50 (egg 2: 1–49) | 26 (51–74) | 15 (76–87) | 9 (89–93) | 7 |
| B (shrinking gaps) | 14 (1–13) | 14 (15–26) | 14 (28–38) | 14 (40–49) | 12 |

B costs 14 on 11 of its 12 possible breaks, 12 if egg 1 breaks only at floor 100, and 12 if it never breaks. Its worst case is 14. Halving's worst case is 1 + 49 = 50. **The brief is right.**

## Stage at 390×844 (~500 px)
1. Rule line (muted, 9 words): "100 floors, 2 eggs; a broken egg is gone."
2. Chip label "You pick: egg 1 breaks on drop" (7 words) and five chips (64 × 44): **1st · 2nd · 3rd · 4th · Never**.
3. Two building panels, each 170 × 330. Each has a label ("A: start at 50, halve" / "B: shrinking gaps"), a tower drawn 0–100 (labels at 0 and 100 only), and a tick on the right for each of the plan's egg-1 floors (no tick labels: at the top they would overlap). During a run, each egg-1 drop that survives becomes a dot at its tick. The break shows "✕ 75" in `--bad` with an ✕ shape. Egg 2's climb is a filled bar up the tower from the last safe floor, labelled "egg 2: 51–74". Readouts: "Drops this run: 26" (bold) and "Worst so far: 50".
4. **Your tries** table, two rows (A, B), one column under each chip. A column fills when its chip has been pressed. This is the evidence the reveal quotes.

Stage words ≈ 24 (rule, chip label, two plan labels), not counting readouts.

## Controls, in DOM order (5)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–5 | Control chips, group "You pick: egg 1 breaks on drop" | "1st" · "2nd" · "3rd" · "4th" · "Never" | both buildings replay that case: egg-1 drops climb the ticks, then egg 2 climbs floor by floor. The counters tick each drop. The whole replay is ≤ 400 ms (instant under reduced motion). The pressed chip becomes active, the table column fills, and "Worst so far" updates |

No chip is active at first render. All five exist and are disabled while `locked`. There is no "try every floor" button: it would land on the answer. A pressed chip stays enabled, and re-pressing it replays the run (the stage changes during the replay, and the active state stays).

QA path: 1st (A 50, B 14; milestone 1) · 2nd (26 / 14) · 3rd (15 / 14; milestone 2) · 4th (9 / 14) · Never (7 / 12). The full table is visible at the end.

## States
- **Predict:** both towers are drawn. Plan A shows its ticks (50 is a distractor, not the answer). Plan B is a blank tower with "?" and the label "Plan B: shown after you predict". Readouts are "?" and the table is empty ("your tries appear here"). Chips are disabled. The hook ("Two eggs, a hundred floors" / "Halving finds anything fast. Does it with 2 eggs?") names no answer.
- **On unlock:** Plan B's ticks and label appear.
- **1st:** A's egg breaks at 50, and egg 2 climbs 1–49: **50**. B's breaks at 14, and egg 2 climbs 1–13: **14**.
- **2nd to 4th:** A drops to 26, 15, 9. B stays at 14 each time, while its egg-2 bar shortens by one floor each time (13, 12, 11, 10 floors). The shrinking gap is visible as a shorter green bar higher up.
- **Never:** A 7, B 12. Halving's best case is the "7" option, now seen as a best case, not a guarantee.
- **Reveal:** the buildings **pin to the 1st-drop run** (chip "1st" shown active, label "Your 1st-drop run"), because that is the run quoted. The table stays full. The reveal quotes the table:
  > When egg 1 broke on drop 1, halving cost 50: egg 2 had to climb floors 1 to 49 one at a time. Plan B cost 14 on every break you tried. Each drop of egg 1 uses up one drop, so the next gap is one floor shorter: 14, 13, 12 … Fourteen drops cover 105 floors; thirteen cover only 91. With one egg left, you cannot halve. (≈ 62 words; the "every break you tried" values come from the table)

Milestones (`minInteractions=2`): `halving-worst` (chip 1st pressed: A shows 50), `flat-b` (B has shown the same total on three different chips).

## Shown, not told
The learner breaks the egg themselves and watches one column swing (50, 26, 15, 9) while the other does not move (14, 14, 14, 14). The egg-2 bar visibly shortens by a floor as egg 1 rises. That is "each drop leaves one fewer floor", seen before the reveal says it.

## Colour and access
Break: `--bad` text plus an ✕ shape. Survived: filled `--fg` dot (2 px radius; the dots touch at 94–100, and the readouts carry the count). Egg 2 bar: `--domain` fill with an `--fg` outline. Chips are 64 × 44, using `.tap`. The tower has `aria-label` "Plan A: egg 1 broke at 50 on drop 1; egg 2 climbed 1 to 49; 50 drops". No illustration.

## Claims this spec adds
The table above (simulation: the builder re-runs and records). Plan A's rule "ceiling of the midpoint of what is left" is a modelling choice the claim must state. Its worst case of 50 does not depend on it. The 91/105 sums are brief claim 1.
