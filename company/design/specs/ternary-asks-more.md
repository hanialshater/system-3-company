# Spec: ternary-asks-more

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #46 · wireframe: `ternary-asks-more.svg`

**Format: Side-by-side comparison, as two stacked lanes driven by one button.** The unit of the comparison is **one question**, not one round. Every press asks one question in each lane, so after two presses the learner sees halving with a quarter left and thirds with a third left. That is the whole payoff, and it is visible only if the lanes step together per question. Each lane is a full-width number line (1–1,000 needs the width), stacked one above the other.

## Brief check (re-run in node, 2026-10-14)
Sorted list 1 … 1,000. A question is one comparison of the target with one list number (equal, less or more counts as one question). Ternary as the brief states it: each round reads both probes, at lo + ⌊(hi − lo)/3⌋ and hi − ⌊(hi − lo)/3⌋.
- Every target: worst case **binary 10, ternary 13**; averages **8.99 and 11.19**. 100 numbers: 7 vs 9. **The brief is right.**
- Robustness (for the fact-checker): a smarter ternary that skips the second probe when the first already says "less" still has worst case 13 (average 9.63). The answer does not depend on the variant, but the stage and the averages use the brief's variant.
- **Target chosen for the stage: 721**, one of 131 targets that are a worst case for both methods (binary 10, ternary 13). This choice must be disclosed in the claim (pattern `disclose-chosen-seeds`).
- Numbers left after each question, target 721. Binary: 500, 249, 124, 62, 31, 15, 7, 3, 1, found at question 10. Ternary: 666, 333, 110, **110**, 73, 36, 24, 12, 8, 4, 1, **1**, found at question 13. The two bold repeats are second probes that cut nothing, because the first probe of the round already settled it. The stage shows them as they are.

## Stage at 390×844 (~300 px at predict, ~430 px in explore)
1. Rule line (muted, 14 words): "Find 721 in 1 to 1,000. Each question compares 721 with one number."
2. **Lane "Halves"**: a number line 1–1,000, 336 px wide. The numbers still possible are a thick `--domain` band, and the rest of the line is thin `--line`. Each question leaves a small tick at the number asked. Only the latest tick is labelled ("750?"). The band ends are labelled ("501–749"). The band has a minimum width of 4 px. **Shared zoom:** once both lanes have fewer than 40 numbers left, both lines zoom once to the same window, the smallest run of tens holding both bands (for 721 that happens after question 6: **701–740**), and stay there, with the window ends labelled and a small "zoomed" mark at the left. The two lanes always share one scale, so their bands stay comparable. Without the zoom the last six ticks pile into 2 px (seen in the wireframe check). Readouts on the right: "Questions: 0" and "Left: 1,000".
3. **Lane "Thirds"**: the same line and readouts. A round's two probes are joined by a small bracket. A question that cut nothing leaves its tick hollow, and "Left" does not change.
4. **Results table**, three columns × two rows (readouts): "721" · "worst of 1,000" · "average", rows Halves and Thirds. Every cell reads "?" until it is filled.
5. Controls, below.

Stage words at the busiest moment: rule line 14 + lane titles 2 + readout labels 4 + table headers 5 = 25 ("zoomed" appears only after the 6th question, when the rule line is shortened to "Find 721." to keep the budget).

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Ask one question" | asks the next question in each lane that has not found 721: the tick appears, the band shrinks, "Left" updates. A lane that has found 721 shows "found in 10" and stays still. Disabled when both have found it |
| 2 | Control | "Ask until found" | replays the remaining questions one at a time, both lanes together, about 25 ms each (≤ 400 ms; instant under reduced motion). Every intermediate band is drawn |
| 3 | Control | "Try all 1,000 targets" | runs both methods on every target synchronously and fills the "worst of 1,000" and "average" cells (10 · 8.99 and 13 · 11.19, average shown to one decimal: 9.0 and 11.2). Under each lane a one-line strip appears: how many targets needed each number of questions, as a row of small bars. Disabled after |

All 3 controls render at first paint, disabled while `locked`, class `.tap` (44 px). #3 does not need #1 or #2 first.

QA path (each control once, DOM order): Ask one question (Halves: 500 left; Thirds: 666 left) · Ask until found (both found, 10 and 13: milestone `both-found`) · Try all 1,000 targets (worst 10 and 13: milestone `all-targets`).

## States
- **Predict:** both lines full (1,000 left), no ticks, "Questions: 0", table "?". The target 721 is in the rule line. No counter has a maximum, and no "13" appears anywhere.
- **On unlock:** nothing moves until a press. Exploration hint: "Ask one question at a time and watch what is left."
- **After 2 questions:** Halves "Left: 249" (501–749); Thirds "Left: 333" (668–1,000). The difference between a quarter and a third is on the stage.
- **After 4 questions:** Halves 62 left; Thirds 110 left, with the 4th tick hollow.
- **Question 10:** Halves "found in 10"; Thirds still has 4 left.
- **Question 13:** Thirds "found in 13". Table: 721 → 10 / 13.
- **All targets:** table full. Halves' strip peaks at 10 (489 targets); Thirds' strip peaks at 13 (272 targets).
- **Reveal:** the stage stays as left. The reveal: "On 721, halving needed 10 questions; thirds needed 13. Over all 1,000 targets the worst cases were 10 and 13 (averages about 9.0 and 11.2). Look at 'left' after two questions: halving had 249 numbers left, thirds 333. A third sounds smaller than a half, but it costs two questions, and two halvings leave a quarter. Per question, halving wins. Ternary search earns its place elsewhere: finding the top of a smooth hill."

Milestones (`minInteractions=2`): `both-found`, `all-targets`.

## Shown, not told
The learner steps both searches with the same button, one question each. They watch the thirds lane fall behind on "left" from the second question on, and they see a hollow tick where a question bought nothing. "Fewer rounds, more questions" is read off two counters that advanced together.

## Colour and access
Bands `--domain` on `--line`; ticks `--fg`, hollow ticks for questions that cut nothing (shape, not colour). Lane `aria-label`: "Thirds: 7 questions, 24 numbers left, 717 to 740".

## Notes for others
- **Builder:** count one question per comparison with a list number, three-way. Use the brief's variant (both probes every round), or the averages will not be 11.19. The target 721 is fixed and disclosed.
- **Brief owner (cm-cs-algorithms):** the brief's "target chip" is replaced by one fixed target plus "Try all 1,000 targets". The prediction is about the worst case, and a single chip target cannot show a worst case. Teaching unchanged.
- No illustration (CS).
