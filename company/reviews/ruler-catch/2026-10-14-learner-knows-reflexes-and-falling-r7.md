*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): ruler-catch
lesson version: v2
boundary: knows-reflexes-and-falling (from meta.json learner field). Knows reflexes take some time and that things speed up as they fall; does not know how to turn a fall distance into a time with d = ½ g t².
Screenshots seen: yes (artifacts/walkthroughs/ruler-catch/sheet.png)
Verdict: revise

## 1. From the artifact (written before reading the earlier reviews or meta.json)

- **Predict, where it breaks: the locked stage gives the answer.** Before I commit, the stage shows the cm ruler with a "time scale" beside it, and its 0.20 s tick sits level with the 20 cm mark. The question asks for the reaction time at 20 cm. I can read "0.20 s" off the locked picture without any thinking. This fails "No answer before the commit" (a pre-drawn scale that points to the answer). The options (0.02 / 0.2 / 2 s) would otherwise be a fair order-of-magnitude guess.
- Explore: Drop once gives a red line at 16.4 cm and "LAST CATCH 16.4 cm = 0.18 s". Drop 5 times adds dots between about 13 and 27 cm. Clear empties everything (CATCHES 0, LAST CATCH ?). The uneven time ticks (0.10–0.15 close together, 0.25–0.30 far apart) are a nice picture of the square law.
- Show the why: weak for this boundary. The gap is "how to turn a fall distance into a time with d = ½ g t²". The stage gives a ready-made lookup scale, and the reveal says only "distance grows with the square of the time". Neither the formula nor any step from 20 cm to 0.20 s appears. I leave able to read a scale, not to do the conversion. The square law is shown by the tick spacing; the conversion the brief promises is neither shown nor told.
- Reveal: "Your 6 catches closed between 12.6 and 27.4 cm, … 0.16 to 0.24 s". After Clear the stage reads CATCHES 0 and LAST CATCH ?, so none of this is on screen. 27.4 was never printed even before Clear (only the last catch is labelled). This breaks "survives Reset" and "still visible on the stage". "Each extra centimetre is about 5 thousandths of a second" is told only.
- Would a first-time learner get the idea from the stage? They'd get "about 0.2 s", but from the pre-drawn scale, before predicting.

## 2. Earlier findings (r2, and the v1 review via r2)

1. FATAL Infinity/NaN after Clear (v1): **fixed** (still fixed).
2. 27.4 cm never shown as a number: **not fixed**.
3. After Clear the reveal's "your 6 catches" contradicts the 0 readout: **not fixed**.

## 3. New findings

- **Revise (top):** the locked stage's time scale puts 0.20 s next to 20 cm, which answers the question before the commit. Hide or blank the time scale until the prediction is locked.
- **Revise:** the brief's gap (d = ½ g t², distance to time) is neither on stage nor in the reveal. Something on stage should stand for the conversion (for example, the scale built from the formula as the learner drops), and the reveal should point at it.
- Should fix: Clear erases the catches the reveal quotes, and 27.4 cm was never labelled.
- No FATAL.
