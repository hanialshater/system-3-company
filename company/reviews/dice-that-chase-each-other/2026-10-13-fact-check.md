# Fact-check: dice-that-chase-each-other (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Faces match Efron's dice as given by Gardner, 'Mathematical Games: The paradox of the nontransitive dice', Scientific American 223 (December 1970) 110-114 (MathWorld 'Efron's Dice' cites the same). Citation fix for the builder: December 1970 is issue 6, not 5. node: no ties in any of the 4 pairings. |
| c2 | verified | node enumeration: AB, BC, CD, DA each 24 wins, 0 ties of 36. |
| c3 | verified | node means 2.667, 3.000, 3.333, 3.000; reveal prints toFixed(2). |
| c4 | verified | node with own mulberry32 copy and seed pair*1000+batch+1: batch 0 = 74 64 75 73, batch 1 = 69 69 72 57, batch 2 = 60 65 68 64; binomial sd 4.71. |
| c5 | verified | The cycle A>B>C>D>A (c2) admits no consistent ranking. |
