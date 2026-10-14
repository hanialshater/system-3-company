# Spec: karatsuba-three-not-four

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review, unblocked: W-179 resolved 2026-10-14, brief #53 now uses 11111111 × 11111111 (see Brief check) · brief: `company/domains/briefs/cs.algorithms.md` #53 · wireframe: `karatsuba-three-not-four.svg`

**Format: Side-by-side comparison** (as briefed). Two columns share one control: schoolbook on the left (each product splits into 4 half-size products), Karatsuba on the right (3). Each press splits every product one level down in **both** columns, so the learner watches 4 against 3 compound into 16 against 9 and then 64 against 27. Products are drawn as boxes that carry their numbers while they fit, and as dots at the 1-digit level.

## Brief check (re-run in node, 2026-10-14): the prediction survives only with different numbers
- The size model is right: 8 digits → 3 levels → **3³ = 27** vs **4³ = 64**; 1,024 digits → 59,049 vs 1,048,576.
- **But for 12345678 × 87654321 the 27 is not the number of single-digit multiplications.** At the first split a + b = 1234 + 5678 = 6,912, but c + d = 8765 + 4321 = 13,086 (5 digits). Sums carry at every level, so 9 of the 27 level-3 products are 2-digit and need one more split. A plain BigInt Karatsuba (split at half the longer length, base case when either factor is < 10) multiplies correctly using **33** single-digit products, some with a 2-digit factor. The brief says 27; I could not reproduce that. If the stage drew the real numbers it would contradict the question. If it hid them, the question's numbers would not match the stage (`earn-the-reveal`).
- **Proposed fix (needs the brief owner's yes): use 11111111 × 11111111 = 123,456,787,654,321.** No sum ever carries (1111 + 1111 = 2222, 11 + 11 = 22, 2 + 2 = 4), so a plain implementation uses exactly **27** single-digit products, all truly 1-digit. Schoolbook uses 64. The product is easy to check by eye. (21102011 × 10211012 also gives 27, all 1-digit, but it is less legible.) The question, options and answer are unchanged apart from the two numbers.
- Fallback, if the brief owner keeps 12345678 × 87654321: reword the question to count "products of 1-digit-size pieces in the size model". Disclose in claim 1 that carries make the real count 33, and do not draw numbers below level 1. I recommend against it, because the stage would be showing a model rather than the multiplication.

The spec below uses the proposed numbers.

## Stage at 390×844 (~380 px at predict, ~520 px in explore)
1. Rule line (muted, 14 words): "Split each number into halves: a b and c d. Multiply the halves."
2. **Top box** (full width): "11111111 × 11111111".
3. **Two columns** (~172 px each), headed "Schoolbook: 4 per split" and "Karatsuba: 3 per split".
   - Level 1, left: 4 boxes "a·c" "a·d" "b·c" "b·d", each "1111×1111". Right: 3 boxes "a·c" "b·d" "(a+b)(c+d)", the last "2222×2222".
   - Level 2: 16 / 9 small boxes labelled with digits ("11×11", "22×22", "44×44" in the right column).
   - Level 3: 64 dots in an 8×8 block / 27 dots in three 3×3 blocks (12 px pitch). These are single-digit multiplications.
4. **Count table** (readouts), one row per level: "4-digit products 4 | 3", "2-digit 16 | 9", "1-digit 64 | 27". Cells read "?" until reached.
5. **Middle check line** (after #3): "a·d + b·c = 2,468,642 = (a+b)(c+d) − a·c − b·d". Both sides are computed live from the level-1 numbers.
6. **Answer line** at the bottom of both columns once at level 3: "= 123,456,787,654,321" in each (same product).
7. Controls, see below.

Stage words at the busiest moment: rule line 14 + column heads 8 + table labels 3 = 25. The middle check line replaces the rule line while it shows.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Split one level" | splits every current product in both columns one level down. Boxes grow out of their parent (200 ms), and that level's count row fills. Disabled at the 1-digit level |
| 2 | Control | "Split down to 1 digit" | replays every remaining level in order (120 ms per level, ≤ 360 ms), filling each count row in turn. Disabled at the 1-digit level |
| 3 | Control toggle | "Check the middle: off" / "on" (`aria-pressed`) | shows or hides the middle check line and outlines the (a+b)(c+d) box. It never empties the trees |

All 3 render at first paint, disabled while `locked`, class `.tap`.

**Not a jump to the answer.** #2 plays every level in turn, so 16 against 9 is on screen before 64 against 27.

QA path (each control once, DOM order): Split one level (4 | 3 boxes with numbers) · Split down to 1 digit (16 | 9, then 64 | 27 dots; milestone `one-digit-leaves`) · Check the middle: on (the identity line, with the (a+b)(c+d) box outlined).

## States
- **Predict:** top box only, column heads, count table all "?". No dots are pre-drawn, so nothing on the stage hints at 27.
- **On unlock:** exploration hint: "Split both ways and count the smallest products."
- **Level 1:** the left column has four boxes, the right three. The odd one out, "2222×2222", is the trick.
- **Level 3:** 64 dots against 27. The blocks make 27 = 3·3·3 visible as three groups of nine.
- **Reveal:** stage as left (both trees at level 3, the middle check on if QA left it on). Reveal quotes the table: "Schoolbook needed 64 one-digit products; Karatsuba 27. One product fewer at each split: 4·4·4 against 3·3·3." Then the brief's payoff ((a+b)(c+d) − ac − bd gives the cross terms; n^1.58, claim 3). The 1,024-digit numbers go in the reveal only.

Milestones (`minInteractions=1`): `one-digit-leaves` (both columns at level 3).

## Shown, not told
The learner presses once and sees 4 boxes against 3. Then they watch the gap compound level by level into two blocks of dots of very different size. The reveal only names the ratio they watched grow.

## Colour and access
Schoolbook boxes `--bg-2`. Karatsuba boxes `--domain` tint, with the (a+b)(c+d) branch marked by a "+" glyph. Dots 8 px, `--fg`. Column heads carry the "4 per split" / "3 per split" text, so colour is never the only cue. Columns `aria-label`: "Karatsuba: 27 one-digit products".

## Notes for others
- **Brief owner (cm-cs-algorithms):** please accept 11111111 × 11111111 in place of 12345678 × 87654321, or choose the fallback. The brief's check line ("a BigInt implementation multiplies 12345678 x 87654321 correctly with 27 digit products") did not reproduce: I get 33. My script uses the stated base case and split rule.
- **Builder:** count real base-case calls of a real implementation and assert 27 in a test. Do not hard-code the dot counts.
- **Fact-checker:** claim 1 changes with the numbers.
- No illustration (CS).
