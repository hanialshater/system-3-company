*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): the-slowing-half-life
lesson version: v6
boundary: adult-beginner. Knows what a half-life is and reads mmol/L as a concentration; has never met reaction order (meta.json learner field, same tag as r7).
Screenshots seen: yes (artifacts/walkthroughs/the-slowing-half-life/sheet.png, 4 frames, recorded 2026-10-14T11:10Z, build 5 walkthrough; 04-reveal.png also opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- **No answer before the commit: pass.** Title "Does the next half take as long?" and hook do not lean either way. Options 5 / 10 / 20 min are all numbered. The locked axis (0, 20, 40, 60) marks nothing at 20. The locked readout row is still cut at the bottom of the stage (minor, carried from r6/r7).
- Explore: one slider move gives wait bars 10 and 20, "2ND-ORDER WAITS 10, 20 min" and "2ND-ORDER RATE VS START 1/4 → 1/16", with the why line "½ as much left to lose, at ¼ the rate → 2× the wait". Switching to 1st order fills "1ST-ORDER WAITS 10, 10 min" and "1/2 → 1/4" while the 2nd-order rows stay. Both orders side by side make the contrast with no reading of the reveal.
- **Reveal quotes what you saw: pass.** The r7 defect is gone. "Your 2nd-order waits row reads 10, 20 min" and "Your 1st-order waits row reads 10, 10 min" are both rows still on the stage when the reveal opens. 1/4, 1/16 and 1/2 → 1/4 are on the rate rows. "The line under it" is on screen.
- **Show the why: pass.** "Pairs must meet" is stood for by the squared rate row, and the reveal points at it.
- **The reveal fits with its picture: fail (revise).** In the 390×844 reveal frame the card has scrolled so the stage starts at the slider. The whole curve and the wait bars are above the screen (stage-top crop well over 0 px; I estimate 200+ px). Everything the reveal names (both waits rows, both rate rows, the why line) is visible, so nothing points at empty air. But the reveal body is about 107 words (113 with the verdict line), over the 90-word budget that binds a new version, and that excess is what pushes the picture off.
- Labels: the axis and bar labels are readable in the explore frames. At the reveal the picture is off screen rather than shrunk, so there is no label-size finding here.
- Small: "RATE VS START" now says what the fraction is relative to (r7 minor fixed).

## 2. Earlier findings (r7, v4)

1. Reveal's "10, 20 min" quoted bars no longer on stage: **fixed** (persistent waits rows).
2. Locked readout row cropped: **not fixed** (minor).
3. Rate fraction relative to what: **fixed** ("vs start").

## 3. New findings

1. **Revise:** reveal about 107 words (> 90) and the stage top is cropped at 390×844 (the curve and wait bars are off screen when the reveal opens). Cut to ≤ 90 words so stage-top crop is 0. Candidate: the rate sentence restates the why line ("As the line under it said, each halving leaves half as much to lose at a quarter of the rate"); which sentence goes is the category manager's call.
2. Minor: locked readout row cut at the stage bottom.
- No FATAL.

## 4. After reading build.md

Pre-flight v6 says the change was text only (radioactive-decay sentence cut) and that build, QA and walkthrough were not run. It has no item 7 (phone fit: word count and stage-top crop). That is the gap this review found. Nothing in build.md changes the findings above.
