*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): odds-three-to-one
lesson version: v1
boundary: an adult who has heard betting odds on TV; reads "3 to 1" as "1 in 3".
Screenshots seen: yes (artifacts/walkthroughs/odds-three-to-one/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "Three to one against", with the hook "The bookie says 3 to 1 against. What chance of winning does that actually mean?" It is neutral. 33% (reading "3 to 1" as "1 in 3") is the classic slip, and the walkthrough learner chose it. The locked stage shows 4 blocks in Lose, "4 to 0", "0 of 4 = 0%", which doesn't give away the 3-to-1 case.
- Explore: tapping a block moves it to Win. One tap gives "3 to 1" and "1 of 4 = 25%", with a 4-segment bar, one segment green. The picture makes "1 win out of 4 blocks in all" impossible to miss. 2 and 2 gives "2 to 2" and 50%. Further taps give "1 to 3", 75%, and "0 to 4", 100%.
- Reveal: "3 blocks in Lose and 1 in Win... 1 block out of all 4: 25%, not 1 in 3." Seen. "2 to 2, the same as 1 to 1 ('evens'), and the chance was 50%": seen, with "evens" told. "Odds compare wins with losses; a chance compares wins with everything" is told, and the two readouts side by side support it exactly.
- Small things: the label "ODDS AGAINST" reading "1 to 3" and "0 to 4" is unusual phrasing (people say "3 to 1 on"). "4 to 0 against" at the start is a degenerate case. With exactly 4 blocks the learner can't build the 2-to-1 case that 33% actually corresponds to. That would close the loop on the wrong answer.

## 2. Earlier findings (2026-10-14 review, v1, verdict launch)

1. "Odds against 1 to 3 / 0 to 4" past the midpoint: **not fixed**, minor (my new finding 2).
2. The reveal sits over the last state (0 to 4, 100%), not 3 to 1: **not fixed**, minor. I see the same in the reveal frame.
3. Empty top band: **not fixed**, cosmetic.

The version is still v1, and I see no learner-visible change since the earlier review. The "33% can't be built with 4 blocks" observation is new.

## 3. New findings

1. Minor: there is no way to see what 33% would be (2 to 1, from 3 blocks). An "add/remove a block" control, or a second row with 3 blocks, would let a 33%-chooser find where their number lives.
2. Minor: "ODDS AGAINST: 1 to 3 / 0 to 4" is odd wording past the even point. One option is to show "odds on" once wins exceed losses, or to stop the label at evens.
3. Minor: the reveal frame has a large empty band below the text. Cosmetic.
4. No FATAL. The core idea (odds count wins against losses, chance counts wins against all) comes from the stage.
