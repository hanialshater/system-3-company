# Fact-check: friends-of-friends-overlap (lesson version v3)

checker: fact-checker · date: 2026-10-22 · read first: artifacts/walkthroughs/friends-of-friends-overlap/ (transcript.md, sheet.png), then meta.json claims, Demo.tsx and brief math.discrete.md #10. Builder notes not read.

## Claims

| claim | status | how checked |
|---|---|---|
| math.friends-of-friends-overlap.c1 | verified | Independent node BFS on the 1,000-ring (5 each side): 10 / 10 / 10 people at steps 1–3, 31 within 3 counting you, farthest 100. Distance-k people are ±(5k−4)…±5k. Stage table (walkthrough steps 1–4), ring colouring from RING_DIST and the reveal ("10 new", "another 10", "31 within 3 steps, counting you") all match. Predict answer "10" (friends of friends who are not your friends = distance exactly 2) follows. |
| math.friends-of-friends-overlap.c2 | verified | 10; 10 × 9 = 90; 90 × 9 = 810; 1 + 10 + 90 + 810 = 911. Tree() draws 10 friends, 90 at step 2, 810 dots at step 3. Table column "no shared" and reveal quote 90 / 810 / 911. Condition "nobody reached twice" is the right one (stated precisely). |
| math.friends-of-friends-overlap.c3 | verified | Friend +3 knows −2…+8 except itself: you (0), your friends −2, −1, +1, +2, +4, +5 (6), new +6, +7, +8 (3); 1 + 6 = 7 "land on you or your own friends" as the reveal says. ringedLinks in Demo.tsx draws exactly these 10 arcs from the ringed node at +3. |
| math.friends-of-friends-overlap.c4 | verified | Source: Easley & Kleinberg, *Networks, Crowds, and Markets* (2010), ch. 20 "The Small-World Phenomenon", Fig. 20.1 ((a) pure exponential growth, (b) triadic closure reduces the growth rate); the text says the 10,000-within-two-steps estimate assumes each of your 100 friends links to 100 new people, and that many of your friends know each other, which limits reach. Confirmed through search extracts of the Cornell ch. 20 PDF (cs.cornell.edu/home/kleinber/networks-book/networks-book-ch20.pdf); direct fetch blocked by the proxy. Section number remains unconfirmed. Quantifier check: with exactly 10 friends each, if any two of your friends know each other, that friend brings at most 8 new people, so the step-2 count is strictly below 90; the general statement holds. |

## Unrecorded claims

None found. Every number and factual sentence on the stage, reveal and trust sheet maps to c1–c4. The hook and predict text are questions/setup.

## Notes (not defects)

- The brief planned the citation as E&K ch. 2 (§2.3); meta.json cites ch. 20 and sets curriculum.references to chapter 20. Ch. 20 is the chapter that carries the triadic-closure argument (Fig. 20.1), so the change is correct; cm-math may want the brief updated to match.

## Verdict

pass: all four claims verified.
