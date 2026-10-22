# Accept: B-faster-link-same-wait

Verdict: accept

## Why
- Prediction makes the learner commit. The three options are real positions: halve it (255), only the send time shrinks (505), and a tempting 60 ms. The learner has to lock one in before the controls work.
- Exploring changes their mind. "Double speed" barely moves the bar (510 to 505), and the two batching buttons cut it to 110 and then 60. A learner who said 255 sees their idea fail, and sees what does work.
- The reveal lands and the numbers are right. 10x(1+50)=510, 10x(0.5+50)=505, 2x(5+50)=110, 10+50=60, and 510/60=8.5, so "more than eight times faster" holds. Latency set by distance and signal speed, which bandwidth cannot remove, is correct for this toy model.
- It fits a phone. Each screen fits a 1082x2202 viewport with no clipping or horizontal overflow, the tap targets are large, and the reveal text is readable next to the side rail.

## Minor defects
- During explore, the question text disappears and leaves a large empty band above the stage. The 510 ms setup is only implied by "Totals".
- It is unclear whether the speed doubling stays on when a batching button is pressed. The 110 and 60 totals assume the original 1 ms link. The reveal says so ("on the original link"), but the buttons do not.
- The reveal shows the reset 510 ms timeline, not the 60 ms batch the text praises. Showing the winning state would land harder.
- "Faster link" is used to mean more bandwidth. Some learners read "faster" as lower latency, and one clause could fix that ("a higher-bandwidth link").
- Trust sheet: the latency claim (c4) is a physical fact labelled as resting on a derivation with no outside source. The addresses skip c5. Claim c6 (2 ms / 80 ms) is not shown anywhere a learner sees.
- Before the learner commits, the stage controls are greyed but still visible, which may invite taps that do nothing.

## Blocking defects
- None.
