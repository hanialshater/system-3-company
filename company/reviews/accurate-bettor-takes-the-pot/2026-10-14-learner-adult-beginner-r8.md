*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): accurate-bettor-takes-the-pot
lesson version: v3
boundary: adult-beginner. Knows that betting odds are the wealth-weighted average belief and that repeated bets multiply money; does not know that repeated betting shifts wealth to the more accurate bettor, so prices drift toward the truth, though luck can lead for a long time (meta.json learner field, same tag as r7).
Screenshots seen: yes (artifacts/walkthroughs/accurate-bettor-takes-the-pot/sheet.png, 9 frames, recorded 2026-10-14T11:14Z, build 5 walkthrough; 08-step-7.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- **No answer before the commit: pass.** Three word options at the same precision. The locked chart is empty with a dashed 50% line and "?" readouts.
- Explore: "1 race" shows "loss, money ratio ×0.8" and 44.4%. "+50 races" shows "31 wins ×1.2, 19 losses ×0.8: ratio ×4.11". "Run to 500" shows five runs ending at 98.8% to over 99.9%. Run 2 and Run 5 carry circles at their lows ("Run 5: 50% bettor 94.2%, race 176"). POOL'S WIN ODDS goes 54.4% → 57.7% → 60.0%. Show the why: pass. The ×1.11 per five races is now in the Seen row, not just told.
- r7's overlap of the event line with a pill is gone. Per-run lines now say "Races 1–500", so the ratio matches MONEY RATIO.
- Labels: chart labels ("Five runs end at…", "Run 5: 50% bettor 94.2%, race 176", axis ticks) are small but readable at full size in explore (about 8 px). The Seen row is cut at the stage bottom in frames 05–08 ("…94.2% at" with the race missing). Minor.
- **The reveal fits with its picture: fail (revise).** At 390×844 the reveal frame starts at the Run buttons. The chart is off screen. The reveal says "in run 5 the 50% bettor held as much as 94.2% at race 176 (the circle, and the Seen line)". The Seen line is visible, but the circle is not. This is r7's top finding, still present. The reveal is about 109 words with the model caveat (116 with the verdict line), over 90.
- Reveal quotes what you saw: otherwise pass (98.8%, 94.2% at race 176, ×0.8, ×1.11, 60% all on stage).

## 2. Earlier findings (r7, v2)

1. Circle off screen at the reveal: **not fixed** (top finding again).
2. Event text overlapping the pill: **fixed**.
3. Per-run lines did not add up to MONEY RATIO: **fixed**.
4. ×1.11 told only: **fixed** (Seen row).
5. Small chart text: **partly fixed** (readable but small).

## 3. New findings

1. **Revise:** the reveal points at "the circle", which is above the screen when the reveal opens at 390×844 (chart cropped). Reveal about 109 words (> 90). Either drop "the circle" and quote only the Seen line, or cut to ≤ 90 words and get stage-top crop 0 with the chart visible. The category manager decides which sentence goes (the model caveat could move onto the stage caption).
2. Minor: the Seen row is cut at the stage bottom in the explore frames.
- No FATAL.

## 4. After reading build.md

Pre-flight v3 item 5 says the Seen row and readouts are "visible below the controls when the reveal opens". True, but item 4 also lists the labelled circle as a source the reveal names, and it is not visible. No item 7 (phone fit). Findings unchanged.
