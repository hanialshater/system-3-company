*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): newton-doubles-the-digits
lesson version: v3
boundary: adult-beginner (knows decimals in a computer are approximations; has never seen the average-with-2/g rule or Newton's method)
Screenshots seen: yes (artifacts/walkthroughs/newton-doubles-the-digits/sheet.png)
Verdict: launch

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "4"; Update g; Update until it stops changing; slider "Look at update" back to 4; opened reveal.

1. **The idea is on the stage.** Each update adds a row with the correct digits in bold and a green bar with the count: 1, 1, 3, 6, 12, 15, then "no change". The bar roughly doubles from row to row, so "the digits double" can be seen without the reveal. I checked the digits against √2 = 1.41421356237309...: 3, 6 and 12 are right.
2. **The why is shown.** The zoomed number line under the table puts g and 2 ÷ g on opposite sides of √2, about the same distance away, with the average landing near the √2 ring. At #1 (zoom ×6) the symmetry is easy to see. That is the stand-in for the reveal's "too big, too small by about the same amount". "Error squared" is told, but the doubling bars stand for its effect.
3. **The reveal quotes what was seen.** "1, 3, 6, then 12 correct digits", "fifth update reached 15", "sixth changed nothing" all match rows still on the stage when the reveal opens (rows #4 to #6 are visible; the earlier rows are scrolled up but not removed). The reveal skips the "1" at #1 (the digits went 1, 1, 3, 6, 12). That reads fine, because #1 is still 1 digit.
4. **No answer before the commit: passes.** Title "Averaging your way to √2" and hook "How fast do the right digits pile up?" are neutral. The options 4 / 8 / 12 are all bare numbers, and 12 is a fair trap (one digit per update). The locked stage shows only #0.
5. **Minor:** at #6 (zoom ×4.5 × 10¹⁵) the number line shows floating-point noise: g and the average sit together at the far left and the √2 ring sits in the middle. A beginner could think the average has missed √2. It only shows if the learner leaves the slider on #6. The QA path moved it back to #4, so the reveal frame is clean.
6. **Minor:** "divided by 2.8" in the reveal is an unexplained constant. It is harmless, but it is a number with no stage counterpart.

## After reading the brief and the r6 review

r6 (v2) findings:
1. Title "Twelve digits of √2 in four steps" gave the answer: **fixed** (now "Averaging your way to √2").
2. Zoom labels (×4.5 × 10¹⁵) hard for this boundary and unused by the reveal: **not fixed**, minor.
3. #0 and #1 both 1 digit: unchanged, minor; the reveal's "roughly double" covers it.
4. Trust link 3/5 claims checked: now 4/5 (fact-checker item, not a learner finding).

Verdict reason: the doubling and the "opposite sides of √2" reason are both on the stage, and the reveal quotes visible rows. The remaining items are minor.
