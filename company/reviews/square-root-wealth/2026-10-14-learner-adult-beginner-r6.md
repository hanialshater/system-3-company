*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): square-root-wealth
lesson version: v3
boundary: adult with school-level maths; knows what an average is; can take a square root; has never met "felt value" or attitudes to risk.
Screenshots seen: yes (artifacts/walkthroughs/square-root-wealth/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Predict: $50 / $25 / $75, and $50 is the average trap. The locked stage shows the curve with no coin line, both felt values "?", and the slider at $50. Nothing leaks.
- Explore: "Sure $10" drew the coin line (dashed, "coin: 5"), put the dot below it (3.16) and said "Worse than the coin". It also derived the coin's value on stage ("half of √0 plus half of √100 = 0 + 5 = 5"). "Sure $50" gave 7.07, "Better than the coin", and **unlocked "Show me why"**. "Sure $75" gave 8.66 and the slider went to $85 (9.22). All of these are "better".
- **I never found $25.** The gate opened after one point below and one above the line, and nothing made me look for the crossing. The panel asks me to "slide to where the height meets it", but the reveal doesn't wait for it. The walkthrough's slider went the other way, to $85. The dashed line crosses the curve somewhere left of $50, with no tick there, so I can't read off $25 myself.
- Reveal: "The curve reaches 5 at $25, so a sure $25 feels as good" quotes a state I never visited, and that state is the lesson's answer. "Half of 0 plus half of 10" doesn't match the stage's "√0 … √100" wording (10 is √100, but the reveal doesn't say so). "When each extra dollar matters less and less" is the doesNotKnow cause. The bending curve stands for it on stage, but the reveal doesn't point at the bend (for example "see how the curve flattens: $50 → $100 adds only 2.93").

## 2. Earlier findings (r2, same v3 label)

1. N1 (blocking) "Slide to the coin's line" jumped straight to $25: **fixed in form, regressed in effect**. The jump button is gone, but now the reveal unlocks without the learner ever reaching the crossing.
2. N2 (minor) reveal chart cropped: **not fixed** (the reveal frame shows only the top of the curve, without the $25 crossing).
3. (v1 items) coin value derived on stage, 7.07 shown, axis labels, footnote: **still fixed**.
4. New: the lesson changed since r2 (buttons now $10/$50/$75) but meta.json version is still 3. Route to demo-builder to bump.

## 3. New findings

- **Revise (earn the reveal):** make "dot on the coin line (felt value 5.00, $25)" the milestone. Sliding to it should be required, and the reveal should unlock only then. Keep $10/$50 as the under/over probes. The reveal can then say "you found it at $25".
- **Revise (show the why you promised):** have the reveal point at the curve's flattening, which is already on stage. One way is to annotate the gain from $0→$25 versus $50→$100 on the existing curve.
- Minor: reveal says "half of 10", which should be "half of √100 = 10" to match the stage.
- Minor: reveal frame crops the chart.
- No FATAL.
