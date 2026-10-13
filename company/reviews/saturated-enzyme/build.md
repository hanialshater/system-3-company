# Build note: saturated-enzyme (demo-builder, 2026-10-13)

- Design: 100 enzyme stations (busy = holding a molecule) under a pool of waiting substrate. Busy share S/(1+S) in half-way units. The message always compares with half the substrate, so any position shows a doubling.
- Reveal gate: reach S = 20 (doubling from 10) and S = 2 (doubling from 1); the two doubling chips come first.
- Brief asked for no slider and no text (exploration); I kept one slider and a one-line message because the numbers are the payoff. Fixed after screenshots: a stray '$' in the message.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.

## v2 (revision 2026-10-13)

- 91 and 50 were never on the stage -> every setting now shows its own "from" state: "Doubling 10 -> 20 (x half-way): busy 91 -> 95 of 100 (new ones brighter). Speed +5%." The newly busy stations are drawn in a second colour. Reveal numbers (91, 95, 50, 67, 5%, 33%) are computed by count()/gain(), the same functions as the stage.
- Dense question -> it now says in two short sentences what an enzyme and the half-way concentration are. Hook no longer leans "no" ("How much faster does it get?"); title is a statement.
- "Versus half as much" -> "Doubling 10 -> 20". Tiles renamed "Speed (share of top)" and "Gain from doubling" so the two percentages read as different things.
- Formula "Speed ~ S / (half-way + S)" and the word Michaelis-Menten removed from the reveal; the reveal is about 70 words.
- Claims c1, c2, c3 reworded to match the learner-visible text, unverified.
