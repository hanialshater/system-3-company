*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7, wave F): karatsuba-three-not-four
lesson version: v3
boundary: cs-learner. Knows splitting a problem and combining (merge-sort-payoff) and long multiplication from school; has never seen Karatsuba or the (a+b)(c+d) trick (meta.json learner field, same tag as r6).
Screenshots seen: yes (artifacts/walkthroughs/karatsuba-three-not-four/sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact (written before reading r6 or the brief)

- Predict: stem is shorter and readable. 64 is given and "3 per split" is stated, so 27 = 3·3·3 is reachable by arithmetic; 16 and 48 ("a quarter fewer") are fair traps. Options all numbered. Title "Three products where four seemed needed" restates the question's premise, not the answer. Locked stage: empty boxes area and a table of "?"; nothing marks 27. No leak.
- Explore: "Split one level" shows four boxes against three, table 4 / 3. "Split down to 1 digit" shows an 8×8 dot square against three 3×3 squares and fills 16 / 9, 64 / 27; both sides end "= 123,456,787,654,321". The dot picture carries the count without reading.
- "Check the middle" is now on the path ("Show me why" lit only after it, frame 04) and its two lines sit under the table, visible in the reveal frame. The reveal points at them ("Your check line showed it").
- **Where it loses me (top finding):** every half is 1111, so the four schoolbook boxes are the same product, 1111·1111. The check line reads "a·d + b·c: 1111·1111 + 1111·1111 = 2,468,642" and "4,937,284 − 1,234,321 − 1,234,321 = 2,468,642". Here a·d, b·c, a·c and b·d are all 1,234,321, so what I see is "(2·1111)² − 2·1111² = 2·1111²". Nothing on the stage tells the cross terms apart from the products Karatsuba already has. A careful learner can read it as "Karatsuba gets away with it because all the pieces are equal", which is the opposite of the idea. The objective's "explain that (a+b)(c+d) − ac − bd gives the cross terms" rests on one degenerate instance plus the told sentence "One product of the sums, minus two products Karatsuba already has, gives both cross terms". Under "Show the why you promised", the stand-in exists but cannot carry the cause in this example. Fix direction (builder's call): a case where a, b, c, d differ at least for the check, or a stage element that shows (a+b)(c+d) splitting into ac + ad + bc + bd.
- Minor: box text in the top rows ("1111 ×1111", "11×11") is about 6 px on a phone.
- Minor: the locked frame cuts the table header at the stage's bottom edge.
- Minor: reveal ends on reveal-scale numbers (59,049 vs 1,048,576; n^1.58), which is fine, but the "ideal no-carry count" phrase arrives unexplained.

## 2. Earlier findings (r6, v2)

1. "Check the middle" not on the required path: **fixed** (reveal now gated on it).
2. The check line rendered above the visible stage: **fixed** (it is under the table and visible at reveal).
3. Reveal told the trick without pointing at the stage: **fixed in form** (it points at the check line), **not fixed in substance** because of the all-1111 example (top finding).
4. Stem dense, "no half-sum carries" disclaimer before commit: **fixed** (stem rewritten; the carry note moved to the reveal).
5. Box text tiny / running past box edges: **not fixed** (tiny; overrun no longer visible).
6. Locked table header cut off: **not fixed**.
7. Trust sheet 0/7: **mostly fixed** (6/7 checked).

## 3. Verdict

revise. The count (27 vs 64, compounding) is shown well. The trick the objective asks the learner to explain is checked only on an example where every piece is equal, so the stage cannot show that the subtraction recovers the cross terms. No FATAL.
