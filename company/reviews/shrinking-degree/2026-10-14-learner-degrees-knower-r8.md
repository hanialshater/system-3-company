*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): shrinking-degree
lesson version: v3 (meta.json version 3; the walkthrough shows the v3 caption "A globe, treated as a sphere of radius 6,371 km")
boundary: degrees-knower (knows latitude and longitude are measured in degrees; does not know a degree of longitude covers less ground away from the equator). Same tag as r6.
Screenshots seen: yes (artifacts/walkthroughs/shrinking-degree/sheet.png, 6 frames; 06-reveal.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- No answer before the commit: pass. Title "How wide is a degree?", hook "Carry one degree of longitude from the equator up to Oslo. How wide is it there?". Options 111 km / 56 km / 28 km, same precision. The locked readouts show the equator values (111.2 km, 1,112 km), which match the misconception option 111, not the answer.
- The why is on the stage during explore: the 10° box slides up the globe, narrows against the dashed equator box, and the meridians visibly converge toward the pole. Readouts 55.6 km at 60°N and 19.3 km at 80°N; 1° of latitude stays 111 km. The Seen line keeps "1° of longitude at 60°N = 55.6 km · 1° of longitude at 80°N = 19.3 km".
- **Main finding (The reveal fits with its picture): the globe's top is off screen when the reveal opens.** In 06-reveal.png only the bottom strip of the globe (north Africa, the dashed equator box) is visible; the box at 80°N, Oslo/Helsinki and the pole are above the visible top. The reveal points at them: "The box narrowed as it went north" and "The thin lines running up the globe … all meet at the poles". Neither the narrowed box nor the meeting lines are on screen. Stage-top crop is well above 0. Reveal ~95 words (whitespace, excluding the verdict line), also over 90 on a new version.
- Quote rule: pass. 55.6, 111.2, 19.3 and 111 are all in the readouts or Seen line at the reveal.
- Lesson label finding (not kit): the "Oslo" and "Helsinki" labels on the globe are about 4 px even during explore (frames 04, 05), so the city the hook names is not readable on the picture.
- Minor: the 2°N slider step (first QA press) reads "Seen: nothing yet"; fine.

## 2. Earlier findings (r6, v1), read after section 1

- r6 blocking items (pointer before the commit; quoted state not visible) were answered in v2; on this walkthrough the locked stage leaks nothing and the Seen line holds the values: FIXED.
- The fit rule (2026-10-14) is newer than r6; the crop is a new blocking finding.

## 3. After reading build.md (Pre-flight v3)

- v3 only names the sphere model (W-243); "Not run: build, QA, walkthrough." No Pre-flight item 7.
- Verdict: revise (stage-top crop while the reveal points at the box and the converging lines; ~95 words). No FATAL.
