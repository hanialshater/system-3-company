# Spec: last-digit-first

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #14 · wireframe: `last-digit-first.svg`

**Format: Storyboard / scrub** (as briefed), with the timeline as three pass buttons instead of a slider. The process has three named frames (after pass 1, 2, 3), and the payoff is at the last one: the list snaps into order only at pass 3. A slider would get two arrow presses on the QA path and could not show the deal itself. Each pass button is one frame, enabled only after the frame before it, so the learner walks the timeline in order and no button skips ahead.

## Brief check (designer's node run, 2026-10-14)
Stable bucket passes on 329 457 657 839 436 720 355 (CLRS Figure 8.3's input):
- last digit → 720 355 436 457 657 329 839; middle → 720 329 436 839 355 457 657; first → **329 355 436 457 657 720 839** (sorted). The brief is right.
- First digit first: 329 355 457 436 657 720 839 → 329 720 436 839 355 457 657 → **720 355 436 457 657 329 839**, sorted by last digit only. The brief is right. This is the same list as pass 1 of the last-digit-first run, which the stage can show side by side: the last pass decides.

## Change from the brief's interaction (routed note)
The brief asks the learner to "tap each card to drop it in its digit bucket", which is 21 card taps plus 3 collects. QA presses each control once, so card taps cannot reach the key state, and 24 taps do not fit 60 seconds. Each pass button deals the seven cards one by one, in list order (~50 ms apart, ≤ 400 ms, instant under reduced motion), so the learner still *watches* ties stack in arrival order. Then it collects 0 → 9. What is taught is unchanged.

## Stage at 390×844 (~330 px at predict, ~520 px in explore)
1. Model line (muted): "Deal into buckets 0–9 by one digit, collect 0 to 9. Ties keep order." (14 words)
2. **List row:** seven cards (44 × 26 px), the digit used by the *next* pass underlined in bold. After pass 1, a small order mark sits between neighbours: "<" (`--good` text) or ">" (`--bad` text). The marks are shown, not a "Sorted?" readout. While locked there are no marks.
3. **Ten buckets**, 32 px wide × 110 px, labelled 0–9 below. They show the current pass's deal: cards stacked top-down in arrival order, so 720 sits above 329 in bucket 2 on pass 2.
4. "Passes done: 2 of 3" plus earlier frames as one muted line each ("After pass 1: 720 355 436 457 657 329 839").
5. After a flip of order: a **pinned row** at the top, outlined: "Last digit first ended: 329 355 436 457 657 720 839".

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Pass 1: last digit" | deals by that digit, collects, adds the frame line. Enabled at pass 0 |
| 2 | Control | "Pass 2: middle digit" | enabled only after pass 1 |
| 3 | Control | "Pass 3: first digit" | enabled only after pass 2. Disabled after use |
| 4 | Control toggle | "Order: last digit first" / "first digit first" (`aria-pressed`) | pins the finished run's last list (if any) as the top row, resets the working list to the start, and relabels 1–3 in the other order ("Pass 1: first digit" …) |

Labels follow the current order. No button lands on the answer: pass 3 cannot be pressed before passes 1 and 2.

QA path: Pass 1 (milestone `pass-1`) · Pass 2 (`pass-2`) · Pass 3 (all "<": milestone `pass-3`) · Order (the sorted list is pinned at the top, and the start list is ready to run first digit first). All 4 controls render at first paint, disabled while `locked`.

## States
- **Predict:** the start list, empty buckets, "Passes done: 0 of 3". Nothing is sorted on screen, and the title does not say it works.
- **Pass 1:** bucket 0: 720; 5: 355; 6: 436; 7: 457, 657; 9: 329, 839. The collected row is sorted by its last digit. The marks show several ">".
- **Pass 2:** bucket 2 holds 720 above 329, because 720 came first after pass 1. Fewer ">".
- **Pass 3:** bucket 3 holds 329 above 355, and bucket 4 holds 436 above 457: ties on the first digit keep the order the earlier passes made. Every mark is "<".
- **First digit first (optional):** the same three presses end on 720 355 436 457 657 329 839, under the pinned sorted row, with ">" marks. That is pass 1's list again.
- **Reveal:** the stage keeps its state. The pinned row (or the pass 3 row if never flipped) is outlined. The reveal quotes only what was reached: "Your last-digit-first run ended 329 … 839, every neighbour in order. In pass 3, 436 and 457 shared bucket 4 and kept the order pass 2 gave them." Add the first-digit-first sentence only if the learner ran it: "Your first-digit-first run ended 720 … 839: sorted by the last digit only, because the last pass has the last word." Close on the idea: three passes for any count of three-digit numbers, O(d(n + k)), as claims.

Milestones (`minInteractions=3`): `pass-1`, `pass-2`, `pass-3`, counted in last-digit-first order only. The hint says: "Run all three passes, last digit first."

## Shown, not told
Stability is shown in the bucket stacks, where the tie on top is the one that arrived first, and the payoff in the order marks turning all "<" at pass 3 only. The flipped run puts the losing order next to the winning one, built by the learner's own presses.

## Colour and access
Cards `--bg-2` with `--fg` text; the active digit is bold and underlined, not just coloured. Order marks are glyphs ("<" / ">") in text-safe `--good`/`--bad`. Pinned row has a 1.5 px `--fg` outline. Controls `.tap` (44 px), full width. Buckets `aria-label` per pass: "Pass 3, first digit: bucket 4 holds 436 then 457".
