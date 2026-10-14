# Fact-check: penalty-kick-mix, 2026-10-14

## Pass NCM-1

Checker: fact-checker (did not write these claims). Method: read Demo.tsx and the walkthrough transcript (including the trust sheet, which shows claim text to learners), solved both indifference conditions by hand, and re-ran `mix()` in node for all six slider states (0.90 to 1.00, step 0.02).

Stage game (Demo.tsx): rows Kick left / Kick right, columns Dives left / Dives right. Kick left & Dives left 0.5; **Kick left & Dives right X** (0.90-1.00); Kick right & Dives left 0.9; Kick right & Dives right 0.5. No pure equilibrium (0.5 < 0.9, 0.5 < X), so the unique equilibrium is mixed.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 kicker left share 50.0% -> 44.4% | **disputed** | Numbers correct: keeper indifference p*0.5 + (1-p)*0.9 = p*X + (1-p)*0.5 gives p = 0.4/((X-0.5)+0.4): 0.5000, 0.4878, 0.4762, 0.4651, 0.4545, 0.4444. But the game description in the claim text is reversed under its natural reading: "0.9 if he dives the wrong way to the right, and 0.9 or 1.0 if he dives the wrong way to the left". On the stage the 0.9-1.0 cell is the keeper diving **right** (ball goes left), and the fixed 0.9 is the keeper diving **left** (ball goes right). Read as written, the improved payoff is on a left dive, which would make the kicker shoot left more, the opposite of the lesson. This text is shown to learners in "Why trust this?". |
| c2 keeper left share 50.0% -> 55.6% | verified | Kicker indifference q*0.5 + (1-q)*X = q*0.9 + (1-q)*0.5 gives q = (X-0.5)/((X-0.5)+0.4): 0.5000 ... 0.5556. Stage bar and reveal show 55.6%. "Same game" inherits c1's description; it is correct once c1 is fixed. |
| c3 scoring 0.700 -> 0.722 | verified | Both sides of the indifference agree (diff <= 1.1e-16): 0.7000, 0.7049, 0.7095, 0.7140, 0.7182, 0.7222. Transcript: "scoring 0.710" at 0.94 (0.7095 -> 0.710 at 3 dp) and 0.722 at 1.00. |
| c4 each side's mix leaves the other indifferent | verified | Standard indifference property of an interior mixed equilibrium in a 2x2 zero-sum game, and it is exactly how p and q are computed above. E&K ch. 6: a search-index read of the Cambridge TOC lists "6.7 Mixed Strategies" (p. 156) and "6.8 Mixed Strategies: Examples and Empirical Analysis"; not opened directly, so `section_unconfirmed` stays. |
| c5 made-up numbers | verified | Stage "Toy game", reveal "Toy numbers, not real penalty rates." The Palacios-Huerta empirical claim is correctly kept off the card. |

**Fix the builder needs (c1, claim text only, no code change):** describe the payoffs by kick and dive, e.g. "In the toy game (the kicker scores 0.5 when the keeper dives the way the ball goes, 0.9 on a kick to the right when the keeper dives left, and 0.9 or 1.0 on a kick to the left when the keeper dives right), the kicker's best mix shoots left 50.0% of the time at 0.90 and 44.4% at 1.00." Then set c1 back to unverified for re-check. The Demo.tsx header comment ("guesses wrong on the right side") has the same ambiguity; worth fixing in passing, but it is not learner-visible.

Unrecorded claims: none blocking. Reveal "Your own strength decides how much your opponent must guard it" is an interpretation of c1/c2. Recall "why" ("you use it less, yet you can score more overall") is the general form of c1-c3 ("can" is supported by this instance).

Result: 4 verified, 1 disputed, 0 withdrawn.
