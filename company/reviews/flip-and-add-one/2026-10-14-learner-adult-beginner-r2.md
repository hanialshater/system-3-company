*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review r2: flip-and-add-one
lesson version: 2
boundary: adult who uses a phone daily, has never programmed or seen binary
Screenshots seen: yes (sheet.png, all 14 frames)
Verdict: launch

## Fresh pass (artifact first)
- Predict: "bit" defined, flip defined. Binary +1 with carries is still a guess for me, but the three options are honest.
- Explore: Flip -> 11111010 "= -128 + 122 = -6"; +1 -> 11111011 "= -5"; Add 5 -> 00000000 "Carry 1 falls off the 8th bit"; Add 9 -> 4. The -128 caption explains the red column. Then the walkthrough toggled every bit, leaving the stage at 4 + 9 = 13 when the reveal opened.
- Reveal: the chain it quotes (incl. -128 + 123 and 9 -> 4) was on the stage. Subtraction-by-adding is now shown via "Add 9". "10000101 reads -123 here, and adding it to 5 does not give 0" was never on the stage on this path.

## Earlier findings (v1 review)
1. Binary never taught: partly fixed (bit defined, place values labelled).
2. -128 place value unexplained: fixed (caption).
3. Leftover toggle state contradicts the reveal: NOT fixed (stage shows 4 / 13 beside the reveal).
4. Subtraction payoff told: fixed ("Add 9 to it" -> 4). Sign-bit counterexample told: NOT fixed (known pattern; option 3 is never tested on the stage).
5. "123" not on the default path: fixed.

## New findings
- Suggest a "Try the minus-sign bit: 10000101" button so option 3 is tested on the stage, and reset or freeze the bit row when the reveal opens.
- Trust link reads "2/5 claims checked" (route to fact-checker).
