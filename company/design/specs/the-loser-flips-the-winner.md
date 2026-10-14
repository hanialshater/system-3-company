# Spec: the-loser-flips-the-winner

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/math.discrete.md`, "## Course: NCM (2026-10-14)" #2 · wireframe: `the-loser-flips-the-winner.svg`

**Format: Before / after toggle.** There is one change, taking C off the ballot, and it has a visible effect: the winner flips from B to A. The cause has to be on the stage, not only in a sentence. Every ballot gets an **A-vs-B gap chip**. With C on the ballot, voters 4 and 5 (B > C > A) give B a lead of +2, because C sits between B and A. Voters 1–3 give A only +1. Take C off and every gap becomes 1. The order of A and B on each ballot never moves, so the learner sees that nobody changed their mind and the points still changed. The "after" (C removed, A 3–2) stays on screen into the reveal, with a log line that keeps the "before" score.

## Brief check (re-run in node, 2026-10-14)
Ballots: 3 × A > B > C, 2 × B > C > A.
- With C (2/1/0): **A 6, B 7, C 2**. B wins 7–6 and C is last. Matches the brief.
- Without C (1/0): **A 3, B 2**. A wins. Matches the brief.
- A-minus-B gap per ballot: with C `[+1, +1, +1, −2, −2]` (sum −1); without C `[+1, +1, +1, −1, −1]` (sum +1). The only thing that changes is the size of B's lead on ballots 4–5 (2 → 1).
- Pairwise majorities: A beats B 3–2 and B beats C 5–0. A beats C 3–2, so C is a Condorcet loser. This supports the brief's "nobody ranks first", since no voter ranks C first.
- **The prediction survives design.** Its numbers are exactly the stage's numbers. One caution: a fast learner can compute the recount in their head. That is fine, because the surprise is in the predict step, and the gap chips are the "why", which mental arithmetic does not give.

## Stage at 390×844 (~300 px at predict, ~470 px in explore)
1. **Rule line** (muted): "Borda: 2 points for 1st, 1 for 2nd, 0 for 3rd." (10 words). After the toggle it reads "C removed: 1 point for 1st, 0 for 2nd." A small "voters 1–5" label sits at its right.
2. **Ballots**: five cards, 60 × 128 px with an 8 px gap (332 px), numbered 1–5. Each card has three name tiles (26 × 22 px) in rank order. Cards 1–3 read A, B, C; cards 4–5 read B, C, A. After a count, each tile shows its points to its right. When C is removed, its tile becomes a dashed ghost **in place**. The other tiles do not slide up, so A stays visibly below B on cards 4–5. The point numbers re-label (B 1, A 0).
3. **Gap chips** (after control 3): one chip under each card, "+1 A" on cards 1–3 and "+2 B" on cards 4–5. Cards 4–5 have a small "C between" note under the chip. After the removal the chips on 4–5 read "+1 B" with "was +2" under them. Shape and text carry the meaning: B chips have a `--bad` outline and a light fill, A chips a `--fg` outline.
4. **Score bars**: three horizontal bars A, B, C, 36 px per point, with the total at the end. The winner gets a "wins" tag in `--good`. Before any count the bars are dashed outlines with "?". After the removal C's row reads "removed".
5. **Log** (two lines max): "With C: B wins 7–6 (C 2)." and, once recounted, "Without C: A wins 3–2." Each line is written the first time that state is counted and stays.
6. Controls, below.

Stage words at the busiest moment (reveal state): rule line 9 + "voters" 1 + "wins" 1 + log 9 + "was" ×2 + "removed" 1 = 23 (numbers and single-letter names not counted).

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Count points" | puts the points on every tile and fills the bars for the current ballot (with C: A 6, B 7, C 2, "B wins"). Writes the log line for that state. Disabled after use, because counting is then live: every later change recounts at once |
| 2 | Control toggle (`aria-pressed`) | "C on the ballot" ⇄ "C removed" | C's tiles turn to ghosts (or come back), the rule line changes, and the points re-label. If a count has run, the bars recount at once (A 3, B 2, "A wins") and the "Without C" log line is added. If gap chips are showing, they update ("+2 B" → "+1 B", "was +2"). If no count has run yet, the tiles change and the bars stay "?" |
| 3 | Control | "A vs B on each ballot" | shows the gap chips for the current state. On the C-removed state it also shows "was +2" on cards 4–5, so the before value is on screen. Disabled after use (the chips stay and update with the toggle) |

All 3 controls render at first paint, are disabled while `locked`, and use `.tap` (44 px). Count and the toggle sit side by side (~166 px each); the gap control is full width. There is no reset: the toggle is the before/after switch, and nothing empties the stage.

QA path (each control once, in DOM order): Count points (B wins 7–6: milestone `count-with-c`) · toggle (C removed, A 3–2, second log line: milestone `count-without-c`) · A vs B on each ballot (chips "+1 A ×3, +1 B ×2, was +2": milestone `gaps`). Every number in the question and the reveal is on the stage at the end of the path.

## States
- **Predict:** the five ballots without points, bars "?", log empty. Nothing shows a score or a winner. The question itself says "B wins; C is last", so the stage does not need to show it.
- **On unlock:** nothing moves until a press. Exploration hint: "Count, then remove C and watch the A–B gap on each ballot."
- **Counted, with C:** B 7, A 6, C 2; "B wins".
- **C removed:** the ghost C tiles leave A where it was (3rd) on cards 4–5. A 3, B 2, "A wins". Log: both lines.
- **Gaps shown:** cards 1–3 "+1 A"; cards 4–5 "+1 B", "was +2". Toggling back to "C on the ballot" turns them back to "+2 B", "C between". The learner can flip and watch only those two chips change.
- **Reveal:** the stage stays as left (C removed, both log lines, chips). The reveal is written from what is on the stage: "Nobody changed their mind about A versus B: voters 1–3 put A above B, voters 4–5 put B above A, before and after. With C on the ballot, C sat between B and A on ballots 4 and 5, so each of those gave B a 2-point lead; A's three voters gave A only 1 each. 4 beats 3: B won 7–6. Take C away and every lead is 1 point: A wins 3–2. An option that came last decided the winner." Then claim 3 in one sentence (positional voting can break independence of irrelevant alternatives).

Milestones (`minInteractions=3`): `count-with-c`, `count-without-c`, `gaps`. The gate needs the after state counted (A 3–2) and the gap chips, which are what the reveal explains. A learner who toggles first and counts second reaches the same milestones: `count-with-c` needs a count while C is on the ballot, which the toggle allows at any time.

## Shown, not told
The learner removes C and sees A and B keep their places on every ballot, while the "+2 B" chips shrink to "+1 B". The reveal's cause, C wedged between B and A doubling B's lead, is two chips the learner watched change.

## Colour and access
Name tiles `--fg` text on `--bg-2`; a ghost C is a dashed outline in `--muted` with the letter kept (no colour-only state). The "wins" tag is text plus `--good`. B gap chips have a `--bad` outline plus the letter B; A gap chips a `--fg` outline plus the letter A. `aria-live` on the log. Stage `aria-label` at the end: "C removed: A 3, B 2. Ballots 4 and 5: B's lead over A fell from 2 to 1."

## Claims this spec adds
None beyond the brief. The gap-chip numbers (+1, +2) follow from claims 1–2. The builder may record "Voters 4 and 5 gave B a 2-point lead over A with C on the ballot, 1 point without" as a derivation under claim 1.

## Notes for others
- **Builder:** compute scores from the ballots; do not hard-code them. Keep C's tile slot as a ghost so that the tiles do not reflow.
- **Brief owner (cm-math-discrete):** brief unchanged.
- **Visual designer:** the chip pair "+2 B → +1 B" is the picture. Keep it larger than the score bars if space is short.
- No illustration needed.
