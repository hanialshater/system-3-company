*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): route-explosion
lesson version: v3
boundary: adult who knows that a trip visits places in some order, and can multiply; has never programmed and has never heard "factorial".
Screenshots seen: yes (artifacts/walkthroughs/route-explosion/sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact

- Predict: "visit 9 other cities once each ... How many different orders?" Options 81 / 362,880 / 3,628,800. 81 (9 × 9) is the natural wrong guess, and it is the one I made. 3,628,800 is a fair trap about counting home. The locked stage (3 cities + home, ORDERS ?) leaks nothing.
- Explore:
  - "All routes" draws six thumbnails with "That is every order: 3 × 2 × 1 = 6". I can count them, and this is the anchor.
  - "Add a city" gives "4 cities: 6 × 4 = 24" and starts a chain under the map: "6 ×4 24".
  - "Add up to 9" fills the chain out to "×9 362,880" and shows "9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 = 362,880". The reveal stayed locked until this point (frames 02–04 say "Try it first"), so the question's own case is on the required path.
  - "Try 19 cities" draws a ring of 19 with "1.2 × 10¹⁷" and "about 3.9 years at a billion checks a second". The jump from 362,880 to 10¹⁷ lands.
- What the prediction felt like: honest. 81 felt right until the chain started multiplying instead of adding.
- Reveal: every number it quotes (6, 362,880, the chain, 40,320 × 9, 3.9 years) was on stage. "Look at the chain under the map" points at the thing I watched. The "pick the first city (9 choices), then 8 left" argument is told, but the six drawn routes for 3 cities show it at a size I can count.
- Minor findings:
  - In frame 02 a lone "6" floats under the first thumbnail with no label. I took it to mean "of 6", but it is unexplained.
  - After "Start over" (frame 07) the stage is back at 3 cities with ORDERS "?", but the chain still reads "6 ×4 24 ... ×9 362,880". That is stale state, though it does no harm to the idea.
  - The reveal frame scrolls the stage, so the top cities are cropped.
  - The thumbnails do not say whether a route returns home. It does not change the count.

## 2. Earlier findings (r5, v2)

1. The question's 9-city case was never on stage on the gated path: **fixed** (the gate needs "Add up to 9", and both the chain and 9 × 8 × … × 1 are on stage).
2. "×4" was shown only once: **fixed** (the chain shows ×4 through ×9).
3. Whether a route returns home is unclear: **not fixed**, minor.
4. Trust link 3/5 checked: now 4/6 (fact-checker gate, not mine).
5. No FATAL then, none now.

## 3. After reading the brief

- doesNotKnow "the number of orders is a factorial" is shown: the 3 × 2 × 1 thumbnails and the 9 × … × 1 line. "How fast it grows with each added city" is shown by the multiplying chain and the 19-city jump. The objective's "each added city multiplies the count" is stood for by the chain, and the reveal points at it. Show-the-why rule: met.
- No FATAL.
