# Spec: rolling-hash-window

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #35 · wireframe: `rolling-hash-window.svg`

**Format: Storyboard / scrub** (as briefed), with a step button as the scrubber. The process is a window moving through time. The payoff sits at two named moments, the false flag (BA) and the true one (AB), and a history row of window sums is the timeline the learner fills in.

## Brief check (designer's node run, 2026-10-14)
CBADAB, A = 1 … D = 4, window 2, pattern AB = 3. Window sums by start (0-based): CB 5, **BA 3**, AD 5, DA 5, **AB 3**. Flags at 1 (false) and 4 (true), as briefed. Every slide is exactly one subtraction and one addition.

## Brief problem (route to cm-cs-algorithms, with learning-designer)
**With a 2-letter window the payoff cannot be seen.** Re-adding the whole window costs 2 letter reads, and "subtract one, add one" also costs 2. So option A and option B do the same work on this stage, and the payoff "each slide costs the same however long the pattern is" has nothing to show. The prediction is still true as stated (B is the right rule), but the stage cannot *show* why it matters. Options for the brief owner:
(a) keep CBADAB/AB for the false flag and add a longer pattern (4+ letters) on a second text, behind one chip "Pattern: 2 letters / 5 letters", with a work counter "Letters read: rolling N · re-adding M";
(b) change the example to one longer pattern. My quick search over A–D texts with 4-letter patterns gives 3–4 false flags per text, so it needs a wider alphabet. Choosing it is the brief owner's call.
This spec is written for the brief as it stands, with a work counter already in the layout, so (a) costs one chip and no new layout. Not buildable until the brief owner answers.

## Stage at 390×844 (~330 px at predict, ~480 px in explore)
1. Model line (muted): "Toy hash: A=1 B=2 C=3 D=4. Window hash = sum. Pattern AB = 3." (13 words)
2. **Text strip:** six 48 px letter tiles, value under each. A heavy outline frames the 2-tile window.
3. **Update chips** above the strip on each slide: the leaving tile gets "−C 3" (`--bad` text), the arriving tile "+A 1" (`--good` text). The equation line: "5 − 3 + 1 = 3 · flag".
4. **Flag row** under each window start: "flag: check?" when the sum equals 3; after a check, "B≠A false flag" or "A=A B=B match".
5. **History row:** "Window sums: 5 3 · · ·", filled as the window moves (the storyboard frames).
6. Readouts: "Window hash", "Pattern 3", "Letters read" (counter: +2 per slide, +1 per letter checked).

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Slide" | one step right: update chips, new sum, flag if 3. Disabled at the last window |
| 2 | Control | "Check letters" | enabled only on an unchecked flagged window: compares letter by letter (≤ 300 ms), stops at the first mismatch |
| 3 | Control | "Slide to end" | replays the remaining slides one by one (≤ 100 ms each, ≤ 400 ms total), each with its chips, and stops on the last window. Disabled at the end |

"Slide to end" lands on the true match (AB), not on the answer. The answer is the update rule, which the learner sees first on their own Slide.

QA path: Slide (BA, sum 3, flag) · Check letters (B≠A: milestone `false-flag-checked`) · Slide to end (AD 5, DA 5, AB 3 flag: milestone `second-flag`). At the reveal the stage shows both flags, with AB waiting for "Check letters", which is enabled again. All 3 controls render at first paint, disabled while `locked`.

## States
- **Predict:** window on CB, "Window hash 5 · pattern 3", history "5 · · · ·". No update chips or equation, so the rule is not shown.
- **Slide:** C's tile drops "−3" and A's tile gains "+1". The sum ticks 5 → 3 and the flag appears. Only two tiles changed.
- **Check:** B vs A turns red: "false flag". The sum was fooled because it ignores order.
- **Slide to end:** three more slides, each "−x +y". AB flags.
- **Reveal:** stage as left. Quotes only what was reached: "Each slide you touched two letters: one out, one in. BA summed to 3 too: your check caught it. AB flagged at the end." Add "and checked out" if the learner checked AB. Close: a hash weighted by position (Karp–Rabin) makes false flags rare, but equal hashes always need a check.

Milestones (`minInteractions=2`): `false-flag-checked`, `second-flag` (window reaches AB).

## Shown, not told
The "−C +A" chips are the answer, and the learner's own Slide makes them. The false flag is found by the learner's own Check, and the sum cannot tell AB from BA.

## Colour and access
Tiles `--bg-2`/`--fg`; window outline 3 px `--fg`. Chips use the signs "−"/"+" plus text-safe `--bad`/`--good`, so the sign carries the meaning. Mismatch is "≠" plus red. Controls `.tap`, full width. Strip `aria-label`: "Window BA, sum 3, false flag".
