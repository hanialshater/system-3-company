*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): karatsuba-three-not-four
lesson version: v4
boundary: cs-learner. Knows splitting a problem and combining (merge-sort-payoff) and long multiplication from school; has never seen Karatsuba or the (a+b)(c+d) trick (meta.json learner field, same tag as r7).
Screenshots seen: yes (artifacts/walkthroughs/karatsuba-three-not-four/sheet.png, 5 frames, recorded 2026-10-14T11:11Z, build 5 walkthrough; 02-step-1.png and 05-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- **No answer before the commit: pass.** Options 16 / 27 / 48 are all bare numbers. The title restates the premise, not the count. The stem gives 4 per split → 64 and 3 per split, so 27 is reachable by arithmetic. That is fair, and 16 and 48 are real traps. The locked table is all "?". Minor: the locked frame is mostly empty grey, and the "Schoolbook / Karatsuba" table header is cut at the stage bottom (carried from r7).
- **The r7 top finding is fixed.** The example is now 11141313 × 13111224, so a, b, c, d differ. The check lines read "Schoolbook's a·d + b·c: 1,363,536 + 1,721,343 = 3,084,879" and "Karatsuba's (a+b)(c+d) − a·c − b·d: 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879", and the new line "(a+b)(c+d) = a·c + a·d + b·c + b·d" gives the why. The subtraction now visibly recovers the two cross terms. Show the why: pass.
- **Explore frames look broken on the phone.** After "Split one level", the stage shows only the bottom edge of the box row ("×1311 ×1224 …"). The tops of the boxes (a·c, 1114) are cut off at the stage's top edge, and below them is a large empty grey area. After "Split down to 1 digit" the 4-digit box labels are still cut at the top. I cannot read which box is a·d. (This may be the walkthrough's scroll position, but it is what the frames show.)
- Labels: the 2-digit product boxes ("11×13", "25×24") are about 6 px on a phone in the explore frames. That is the lesson's own size, not the reveal kit shrink. Minor, carried from r7.
- **Reveal quotes what you saw: mostly pass.** 64, 27, and all six check-line numbers are on stage at the reveal.
- **The reveal fits with its picture: fail (revise).** At 390×844 the reveal frame shows only the table (top row cut), the check lines and the buttons. The boxes and dot squares are off screen. The reveal opens its second paragraph with "The trick is the third box", and that box, (a+b)(c+d) 2427 × 2535, is not on screen. The reveal body is about 101 words (106 with the verdict line), over 90.

## 2. Earlier findings (r7, v3)

1. All-1111 example could not show the cross terms: **fixed**.
2. Box text ~6 px: **not fixed** (minor).
3. Locked table header cut: **not fixed** (minor).
4. "Ideal no-carry count" unexplained: **fixed** ("if no half-sum like a+b gains a digit").

## 3. New findings

1. **Revise:** the reveal names "the third box", which is off screen when the reveal opens (stage-top crop: the box row and dot squares are above the screen). The reveal body is about 101 words (> 90). Either point at the check lines only, or cut to ≤ 90 words and get stage-top crop 0. The 1,024-digit sentence is told context and the obvious candidate; the category manager decides.
2. Should fix: in the explore frames the box row is clipped at the stage top (labels a·c / 1114 cut) above a large empty area.
3. Minor: 2-digit box text about 6 px; locked table header cut.
- No FATAL.

## 4. After reading build.md

Pre-flight v4 item 5 says "table and check lines visible when the reveal opens". That is true, but the reveal also names the third box, which is not visible. There is no item 7 (phone fit). Findings unchanged.
