# Fact-check: below-critical-mass, 2026-10-14

## Pass NCM-1

Checker: fact-checker (did not write c1-c6; recorded c7-c8, so I may not verify those). Method: read Demo.tsx and the walkthrough transcript, then re-ran `next()` and `run()` exactly as written (price 0.16, stop when a round moves < 0.005 or hits 0) for every whole-percent start 0-100.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 next share = 1 - 0.16/s (0 if s <= 0.16) | verified | Person x joins iff (1-x)s > 0.16 iff x < 1 - 0.16/s; with x uniform on [0,1] the share is 1 - 0.16/s for s > 0.16, else 0. Matches `next()`. |
| c2 fixed points 0, 20%, 80% | verified | z^2 - z + 0.16 = 0: (1 ± 0.6)/2 = 0.8, 0.2; 0 maps to 0. |
| c3 18% -> 11% -> 0; 25% -> 36, 56, 71, 78, 79, 80 in six rounds | verified | 0.18 -> 0.1111 -> 0 (2 rounds); 0.25 -> 0.3600, 0.5556, 0.7120, 0.7753, 0.7936, 0.7984 (stop, change 0.0048 < 0.005): 6 rounds. Stage line "Round 6: 25 → 36 → 56 → 71 → 78 → 79 → 80% Settles near 80%." in the transcript. Starts 1-19 all die; 21-100 all end within 1 point of 80%. |
| c4 tipping point / critical mass; 19% and 21% runs | verified | 0.19 -> 0.1579 -> 0; 0.21 -> 0.2381, 0.3280, 0.5122, 0.6876, 0.7673, 0.7915, 0.7978, 0.7995. The concept matches the E&K ch. 17 model (value r(x)f(z) with r(x) = 1 - x, f(z) = z; non-zero equilibria where (1 - z)z = p, here p = 0.16; recalled from the book, not opened). E&K sections: a search-index read of the Cambridge TOC lists "17.2 The Economy with Network Effects" (p. 453) and 17.3 (p. 456, stability / tipping points) with 17.4 in the same chapter; not opened directly, so `section_unconfirmed` stays. |
| c5 20% unstable, 0% and 80% stable | verified | Slope 0.16/s^2 = 4 at 0.2, 0.25 at 0.8; 0 absorbs any start <= 16%. Start 100 runs down to 80 (100, 84, 81, 80, 80), so 80 attracts from above too. |
| c6 made-up numbers | verified | Stage "Toy model", reveal caveat; no product named. |
| c7 (new) "Below this critical mass, even a product worth buying fails." | unverified (recorded) | Learner-visible reveal sentence with no claim. "Worth buying" is undefined in the model. At an 18% share the product beats its price for only 11% of people; at full use it would for 84%. |
| c8 (new) recall why: "...loses users each round, because the product is worth less to later people." | unverified (recorded) | Learner-visible recall sentence with no claim. The first half is c4/c5. The "because" clause does not match the model: below the tipping point the product is worth less **to everyone** because few use it, so fewer people value it above the price next round. "Later people" has no meaning in the model. |

Also checked: the stage verdict "Holds at 20%." for a start of exactly 20 (0.2 -> 0.2000000000000001, stops after 1 round) is correct for an exact fixed point. Reveal for the transcript's 27% start, "climbed to 80% in 6", matches (27, 41, 61, 74, 78, 80, 80).

**Fixes the builder needs (claim text and Lesson copy; the builder owns both):**
- c7: either reword the reveal sentence, e.g. "Below this critical mass, a product that most people would buy if others used it still fails.", and source it to c1 (at full use, 84% value it above $0.16), or delete the sentence. Then record support and source and leave it unverified for the next pass.
- c8: reword the recall "why", e.g. "With network effects, a launch below the tipping point loses users each round: with few users, the product is worth less than its price to most people, so even fewer join." Then record support and source.
- Non-blocking: the recall question asks "What usually happens?" but the answer says "It can shrink"; outside the toy model "usually" is not supported. Consider "What can happen?" (pedagogy call for the CM; flagged, not judged).

Result: 6 verified, 0 disputed, 0 withdrawn; 2 new claims recorded as unverified (c7, c8). The lesson cannot publish until c7 and c8 are reworded or sourced and checked by someone other than me.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | At full use (share 1) person x values it (1-x) > 0.16 for x < 0.84: 84% of people (own numeric check 0.840). Demo run(): 19 -> 16 -> 0, 18 -> 11 -> 0; so 'most people would buy if others used it' and 'still fails' both hold. |
| c8 | verified | For 0 < s < 0.2, next(s) = 1 - 0.16/s < s (equivalently (s-0.2)(s-0.8) > 0); numeric scan of s in (0, 0.2) with Demo next(): always smaller. Share valuing it above price is 1 - 0.16/s < 0.2, so most (over 80%) value it below price. Matches. |
| c9 | verified | Matches next() in Demo.tsx: value (1-x)*s rises with s for every x < 1, and the round joins exactly those with value > 0.16. Predict question wording matches the claim. |

**Reveal check:** Reveal quotes the finished runs closest to 20% on each side; milestones force 19 and 21, so it prints 19% died in 2 rounds and 21% climbed to 80% in 8 (Demo run()). No unbacked sentence.

**Result:** 3 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.
